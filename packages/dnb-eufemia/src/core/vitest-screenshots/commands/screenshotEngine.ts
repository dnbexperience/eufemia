/**
 * Server-side screenshot engine.
 *
 * Runs as a Vitest BrowserCommand. Per-session state is keyed by
 * `ctx.sessionId`.
 *
 * Each logical worker slot gets its OWN Firefox process (launched via
 * a browser pool) so that rendering is fully deterministic — no shared
 * compositor, no font-metric variance under parallel load.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { defineBrowserCommand } from '@vitest/browser-playwright'
import blazediff from '@blazediff/core'
import { PNG } from 'pngjs'
import type { Browser, BrowserContext, Page } from 'playwright'

import {
  getPageResetStrategyFromMutation,
  type PageMutationKind,
} from '../pageResetStrategy'
import { clearBrowserStorages } from '../storageReset'
import { recordFailure, recordNavigation } from '../failures'

// ── shared types ─────────────────────────────────────────────────────

type ActionName = 'click' | 'hover' | 'focus' | 'focusclick' | 'active'
type Action = {
  action?: ActionName
  selector?: string
  keypress?: string
}
type Simulate = Action | ActionName | (Action | ActionName)[]

export type MakeScreenshotPayload = {
  selector: string
  url?: string | null
  themeName?: string | null
  fullscreen?: boolean
  pageViewport?: { width?: number; height?: number } | null
  headers?: Record<string, string> | null
  style?: Record<string, string> | null
  rootClassName?: string | string[] | null
  withWrapper?: boolean | null
  // Functions are sent as their `.toString()` source and re-evaluated
  // server-side.
  executeBeforeSimulateSrc?: string | null
  simulate?: Simulate | null
  simulateAfter?: Simulate | null
  screenshotSelector?: string | null
  styleSelector?: string | null
  simulateSelector?: string | null
  wrapperStyle?: Record<string, string> | null
  recalculateHeightAfterSimulate?: boolean
  retry: number

  // Test identity (used by the reporter to group failures).
  testFilePath: string
  fullName: string

  // Snapshot pipeline parameters.
  snapshotPath: string
  diffPath: string
  actualPath: string
  htmlDumpPath: string
  allowedMismatchedPixelRatio: number
  update: boolean
}

export type MakeScreenshotResult =
  | { status: 'created'; snapshotPath: string }
  | { status: 'updated'; snapshotPath: string }
  | { status: 'match' }
  | {
      status: 'mismatch'
      diffPixels: number
      ratio: number
      width: number
      height: number
      diffPath: string
      actualPath: string
    }
  | {
      status: 'size-mismatch'
      reference: { width: number; height: number }
      actual: { width: number; height: number }
      actualPath: string
    }

// ── per-session state ────────────────────────────────────────────────

type SessionState = {
  page: Page
  vitestPage: Page
  navigatedUrl: string | null
  mutationKind: PageMutationKind
  currentRootClassName: string | string[] | null
}

// One Vitest worker == one forked Node process == its own module graph,
// so this map is implicitly per-worker. Vitest assigns a fresh
// sessionId per test file even when it reuses the same fork, so we
// recycle older sessions on the way in and keep an invariant of one
// live session per worker. The invariant is asserted by `ensureSession`
// below so a future change to `pool` / `isolate` cannot silently give
// us multiple sessions sharing the same Page state.
const sessions = new Map<string, SessionState>()

const config = {
  host: 'localhost',
  port: Number(process.env.PORT || process.env.port) || 8000,
  pageViewport: { width: 1280, height: 2048 },
  timeout: 30_000,
  waitUntil: 'load' as const,
}

// ── browser pool ─────────────────────────────────────────────────────
//
// Vitest browser-mode launches ONE Firefox process and creates pages
// within it for all workers. Under parallel load the shared compositor
// introduces font-metric variance (±2-4 px) that causes flaky diffs.
//
// To eliminate this we launch a SEPARATE Firefox process per logical
// worker slot. Each slot has its own Browser + BrowserContext so the
// rendering engine is fully isolated and deterministic.
//
// Slots are lazily created when a new session arrives, and recycled
// when the vitest-managed page for the previous session closes
// (signalling that the worker moved to the next test file).

type BrowserSlot = {
  browser: Browser
  context: BrowserContext
  currentSessionId: string | null
  busy: boolean
}

const browserSlots: BrowserSlot[] = []
const sessionToSlot = new Map<string, BrowserSlot>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let playwrightModule: any = null
let poolCleanedUp = false

const getPlaywright = async () => {
  if (!playwrightModule) {
    playwrightModule = await import('playwright')
  }
  return playwrightModule
}

const getBrowserSlot = async (sessionId: string): Promise<BrowserSlot> => {
  // Already assigned?
  const existing = sessionToSlot.get(sessionId)
  if (existing) {
    return existing
  }

  // Find a free slot by checking if the previous session's vitest
  // page is closed (meaning the worker moved to a new test file).
  for (const slot of browserSlots) {
    if (!slot.currentSessionId) {
      slot.busy = true
      slot.currentSessionId = sessionId
      sessionToSlot.set(sessionId, slot)
      slot.busy = false
      return slot
    }

    const prevSession = sessions.get(slot.currentSessionId)
    if (prevSession && prevSession.vitestPage.isClosed()) {
      // Mark slot as busy so the cleanup interval does not tear
      // down the browser while we are recycling it.
      slot.busy = true

      // Previous session ended — clean up and reuse slot
      if (!prevSession.page.isClosed()) {
        await prevSession.page.close().catch(() => undefined)
      }
      resetPageBootstrapMemo(prevSession.page)
      sessions.delete(slot.currentSessionId)
      sessionToSlot.delete(slot.currentSessionId)

      slot.currentSessionId = sessionId
      sessionToSlot.set(sessionId, slot)
      slot.busy = false
      return slot
    }

    if (!prevSession) {
      slot.busy = true
      sessionToSlot.delete(slot.currentSessionId)
      slot.currentSessionId = sessionId
      sessionToSlot.set(sessionId, slot)
      slot.busy = false
      return slot
    }
  }

  // No free slot — launch a new Firefox process
  const pw = await getPlaywright()
  const browser = await pw.firefox.launch({ headless: true })
  const context = await browser.newContext({
    viewport: config.pageViewport,
    ignoreHTTPSErrors: true,
  })
  const slot: BrowserSlot = {
    browser,
    context,
    currentSessionId: sessionId,
    busy: false,
  }
  browserSlots.push(slot)
  sessionToSlot.set(sessionId, slot)
  return slot
}

const cleanupBrowserPool = async () => {
  if (poolCleanedUp) {
    return
  }
  poolCleanedUp = true
  await Promise.allSettled(
    browserSlots.map((slot) => slot.browser.close().catch(() => undefined))
  )
  browserSlots.length = 0
  sessionToSlot.clear()
  sessions.clear()
}

// Poll for test-run completion: once every vitest-managed page in
// the pool is closed (all workers are done), tear down the Firefox
// processes so the main process can exit.  The timer is unref'd so
// it never prevents exit on its own.
//
// A slot that is busy (being recycled for a new session) or whose
// currentSessionId has no matching session entry yet (session is
// being set up in ensureSession) must NOT be treated as "done".
// We also debounce: cleanup only fires after two consecutive
// "all done" ticks to avoid racing with session hand-offs.
let poolIdleTicks = 0
const POOL_IDLE_THRESHOLD = 2

const poolCleanupInterval = setInterval(async () => {
  if (browserSlots.length === 0 || poolCleanedUp) {
    return
  }
  const allDone = browserSlots.every((slot) => {
    if (slot.busy) {
      return false
    }
    if (!slot.currentSessionId) {
      return true
    }
    const session = sessions.get(slot.currentSessionId)
    // If no session exists for this slot, it is being set up — not done.
    if (!session) {
      return false
    }
    return session.vitestPage.isClosed()
  })
  if (allDone) {
    poolIdleTicks++
    if (poolIdleTicks >= POOL_IDLE_THRESHOLD) {
      clearInterval(poolCleanupInterval)
      await cleanupBrowserPool()
    }
  } else {
    poolIdleTicks = 0
  }
}, 2000)
poolCleanupInterval.unref()

process.on('SIGTERM', () => {
  cleanupBrowserPool().catch(() => undefined)
})
process.on('SIGINT', () => {
  cleanupBrowserPool().catch(() => undefined)
})

const stylesheetCache = (() => {
  let cached: Promise<string> | null = null
  return () => {
    if (!cached) {
      cached = fs.readFile(
        path.resolve(__dirname, '../screenshotTestStyles.css'),
        'utf-8'
      )
    }
    return cached
  }
})()

// ── helpers: filesystem ──────────────────────────────────────────────

const writeFile = async (filePath: string, bytes: Uint8Array | Buffer) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, new Uint8Array(bytes))
}

const readFileIfExists = async (filePath: string) => {
  try {
    return await fs.readFile(filePath)
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    throw e
  }
}

const removeIfExists = async (filePath: string) => {
  try {
    await fs.rm(filePath)
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw e
    }
  }
}

// ── helpers: URL & state ─────────────────────────────────────────────

const buildUrl = (
  url: string,
  fullscreen: boolean,
  themeName?: string | null
) => {
  const u = new URL(url, `http://${config.host}:${config.port}`)
  u.searchParams.set('data-visual-test', 'true')

  if (themeName) {
    u.searchParams.set('eufemia-theme', themeName)
  }

  if (fullscreen) {
    u.searchParams.set('fullscreen', 'true')
  }

  return u.toString()
}

const ensureSession = async (
  sessionId: string,
  vitestPage: Page
): Promise<SessionState> => {
  let state = sessions.get(sessionId)

  if (state && state.page.isClosed()) {
    sessions.delete(sessionId)
    state = undefined
  }

  if (state) {
    return state
  }

  // Vitest may reuse a fork for several test files, issuing a fresh
  // sessionId each time. Evict sessions whose vitest pages are
  // closed (the worker moved on) or whose screenshot pages died.
  const staleIds: string[] = []
  sessions.forEach((s, id) => {
    if (s.vitestPage.isClosed() || s.page.isClosed()) {
      staleIds.push(id)
    }
  })
  for (const id of staleIds) {
    const s = sessions.get(id)
    if (s && !s.page.isClosed()) {
      await s.page.close().catch(() => undefined)
    }
    sessions.delete(id)
  }

  // Get a dedicated Firefox browser slot for this session
  const slot = await getBrowserSlot(sessionId)

  // Guard: if the browser was closed (e.g. by a late cleanup tick),
  // replace it with a fresh one so the session can proceed.
  if (!slot.browser.isConnected()) {
    const pw = await getPlaywright()
    slot.browser = await pw.firefox.launch({ headless: true })
    slot.context = await slot.browser.newContext({
      viewport: config.pageViewport,
      ignoreHTTPSErrors: true,
    })
  }

  const page = await slot.context.newPage()

  // Match the original setup: set IS_TEST before any page script
  // runs so VisibleWhenVisualTest renders its children on the
  // initial React render.
  await page.addInitScript(() => {
    ;(globalThis as Record<string, unknown>).IS_TEST = true
  })

  state = {
    page,
    vitestPage,
    navigatedUrl: null,
    mutationKind: 'none' as PageMutationKind,
    currentRootClassName: null,
  }
  sessions.set(sessionId, state)
  return state
}

// ── helpers: page bootstrap ──────────────────────────────────────────

// Track per-Page bootstrap state. `applyTestConfiguration` and
// `addTestStylesheet` only need to run once per fresh page load.
// Re-running them on every test (which the engine used to do) added
// ~200ms of protocol roundtrips per screenshot under Firefox; that
// compounds badly across thousands of tests.
const initialisedPages = new WeakSet<Page>()
const stylesheetTaggedPages = new WeakSet<Page>()
const fontsReadyPages = new WeakSet<Page>()

const resetPageBootstrapMemo = (page: Page) => {
  initialisedPages.delete(page)
  stylesheetTaggedPages.delete(page)
  fontsReadyPages.delete(page)
}

const applyTestConfiguration = async (page: Page) => {
  if (initialisedPages.has(page)) {
    return
  }
  await page.evaluate(() => {
    try {
      ;(window as unknown as Record<string, unknown>)['IS_TEST'] = true
      document.documentElement.setAttribute('data-visual-test', 'true')
    } catch {
      // stop here
    }
  })
  initialisedPages.add(page)
}

const addTestStylesheet = async (page: Page) => {
  if (stylesheetTaggedPages.has(page)) {
    return
  }
  await page.addStyleTag({ content: await stylesheetCache() })
  stylesheetTaggedPages.add(page)
}

const clearBrowserStorage = async (page: Page) => {
  await page.evaluate(clearBrowserStorages)
}

const waitForFocusState = async (
  page: Page,
  selector: string,
  timeoutMs = 250
): Promise<void> => {
  await page
    .waitForFunction(
      (sel) => {
        const el = document.querySelector(sel)
        if (!el) {
          return false
        }
        const active = document.activeElement
        return Boolean(active && (active === el || el.contains(active)))
      },
      selector,
      { timeout: timeoutMs }
    )
    .catch(() => {
      // stop here
    })
}

/**
 * Emulate :hover via CSS rule injection.
 *
 * Real `:hover` (which is per-compositor) is inherently racy across
 * concurrent workers. Instead of calling `element.hover()` and fighting
 * focus contention, we:
 *
 *  1. Set a `data-simulate-hover` attribute on the element
 *  2. Clone every `:hover` rule from the page's stylesheets,
 *     replacing `:hover` with `[data-simulate-hover]`
 *  3. For JS-driven effects (Tooltip `mouseenter`), also dispatch
 *     a synthetic `mouseenter` event
 *
 * This is 100% deterministic — no real hover needed.
 *
 * Returns a cleanup function that removes the attribute and injected
 * styles.
 */
const emulatePseudoStateViaCSS = async (
  page: Page,
  element: Awaited<ReturnType<Page['$']>>,
  pseudoClasses: Array<':hover' | ':active'> = [':hover']
): Promise<() => Promise<void>> => {
  if (!element) {
    return async () => undefined
  }

  // Each pseudo-class gets its OWN data-attribute so that :active
  // rules can be given higher specificity than :hover rules.
  // Without this, both would map to the same attribute selector and
  // whichever CSS rule comes later in stylesheet order would "win",
  // which can flip between runs or break the cascade.
  const pseudoToAttr: Record<string, string> = {
    ':hover': 'data-simulate-hover',
    ':active': 'data-simulate-active',
  }

  const attrsToSet = pseudoClasses.map((p) => pseudoToAttr[p])

  // Set attributes on element + ancestors + descendants and dispatch
  // mouse events.  In real CSS, :hover activates on the element under
  // the pointer AND all its ancestors.  Since child elements (e.g.
  // `.dnb-radio__input`) often carry the :hover rules, we also mark
  // all descendants so the duplicated attribute selectors match them.
  await element.evaluate((el, attrs) => {
    for (const a of attrs) {
      el.setAttribute(a, '')
    }

    // Walk up ancestors
    let parent = el.parentElement
    while (parent && parent !== document.documentElement) {
      for (const a of attrs) {
        parent.setAttribute(a, '')
      }
      parent = parent.parentElement
    }

    // Walk down descendants
    el.querySelectorAll('*').forEach((child) => {
      for (const a of attrs) {
        child.setAttribute(a, '')
      }
    })

    // Dispatch mouseenter/mouseover for JS-driven effects (e.g. Tooltip)
    el.dispatchEvent(
      new MouseEvent('mouseenter', {
        bubbles: false,
        composed: true,
        view: window,
      })
    )
    el.dispatchEvent(
      new MouseEvent('mouseover', {
        bubbles: true,
        composed: true,
        view: window,
      })
    )
  }, attrsToSet)

  // Inject a <style> block that duplicates all rules using the
  // requested pseudo-classes, replacing each pseudo-class with its
  // own unique attribute selector.
  const styleTagHandle = await page.evaluateHandle(
    (mapping: Array<[string, string]>) => {
      const emulatedRules: string[] = []

      const replacePseudos = (selector: string): string | null => {
        const parts = selector.split(',')
        let changed = false
        const mapped = parts.map((sel) => {
          let trimmed = sel.trim()
          let modified = false
          for (const [pseudo, attr] of mapping) {
            if (trimmed.includes(pseudo)) {
              trimmed = trimmed.replaceAll(pseudo, `[${attr}]`)
              modified = true
            }
          }
          if (modified) {
            changed = true
          }
          return trimmed
        })
        return changed ? mapped.join(', ') : null
      }

      const processRule = (rule: CSSRule) => {
        if (rule instanceof CSSStyleRule) {
          const newSelector = replacePseudos(rule.selectorText)
          if (newSelector) {
            emulatedRules.push(`${newSelector} { ${rule.style.cssText} }`)
          }
        } else if (rule instanceof CSSMediaRule) {
          for (const inner of Array.from(rule.cssRules)) {
            if (inner instanceof CSSStyleRule) {
              const newSelector = replacePseudos(inner.selectorText)
              if (newSelector) {
                emulatedRules.push(
                  `@media ${rule.conditionText} { ${newSelector} { ${inner.style.cssText} } }`
                )
              }
            }
          }
        }
      }

      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            processRule(rule)
          }
        } catch {
          // Cross-origin stylesheet, skip
        }
      }

      const style = document.createElement('style')
      style.setAttribute('data-hover-emulation', '')
      style.textContent = emulatedRules.join('\n')
      document.head.appendChild(style)

      return style
    },
    pseudoClasses.map((p) => [p, pseudoToAttr[p]] as [string, string])
  )

  // Return cleanup that removes attributes and style tag
  return async () => {
    await page
      .evaluate((attrs: string[]) => {
        for (const a of attrs) {
          document
            .querySelectorAll(`[${a}]`)
            .forEach((el) => el.removeAttribute(a))
        }

        // Remove injected style
        document.querySelector('style[data-hover-emulation]')?.remove()
      }, attrsToSet)
      .catch(() => undefined)

    // Release the handle
    await styleTagHandle.dispose().catch(() => undefined)
  }
}

const waitForVisualStability = async (page: Page) => {
  const skipFonts = fontsReadyPages.has(page)
  await page.evaluate(async (skip: boolean) => {
    const waitForFrame = () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      )

    if (!skip) {
      try {
        if ('fonts' in document) {
          await document.fonts.ready
        }
      } catch {
        // stop here
      }
    }

    try {
      // eslint-disable-next-line compat/compat
      const animations = document.getAnimations().filter((a) => {
        const iterations = a.effect?.getTiming?.().iterations
        return iterations !== Infinity
      })
      await Promise.all(
        animations.map((a) =>
          Promise.race([
            a.finished.catch(() => undefined),
            new Promise((r) => setTimeout(r, 500)),
          ])
        )
      )
    } catch {
      // stop here
    }

    await waitForFrame()
    await waitForFrame()
  }, skipFonts)
  fontsReadyPages.add(page)
}

// Per-Page cache of the most recently applied viewport. `setViewportSize`
// looks synchronous from the test's perspective but actually
// round-trips to the browser, and on Firefox in particular costs
// 250-300ms right after a `page.reload()` because Playwright waits
// for the next layout flush. Skipping the call when nothing changed
// shaves that off every screenshot whose describe block sticks to
// the default viewport.
const lastAppliedViewport = new WeakMap<
  Page,
  { width: number; height: number }
>()

const applyPageSettings = async (
  page: Page,
  pageViewport?: { width?: number; height?: number } | null,
  headers?: Record<string, string> | null
) => {
  if (pageViewport || config.pageViewport) {
    let finalViewport: { width: number; height: number }
    if (pageViewport && config.pageViewport) {
      finalViewport = {
        ...config.pageViewport,
        ...pageViewport,
      } as { width: number; height: number }
    } else if (pageViewport) {
      finalViewport = pageViewport as { width: number; height: number }
    } else {
      finalViewport = config.pageViewport
    }

    const previous = lastAppliedViewport.get(page)
    if (
      !previous ||
      previous.width !== finalViewport.width ||
      previous.height !== finalViewport.height
    ) {
      await page.setViewportSize(finalViewport)
      lastAppliedViewport.set(page, { ...finalViewport })
    }
  }

  if (headers) {
    await page.setExtraHTTPHeaders(headers)
  }
}

const navigateToPage = async (
  page: Page,
  url: string,
  themeName: string | null | undefined,
  fullscreen: boolean,
  pageViewport: { width?: number; height?: number } | null | undefined,
  headers: Record<string, string> | null | undefined
) => {
  // `page.goto()` re-creates Firefox's content viewport even when the
  // outer browser-level viewport is sticky, so drop the cache before
  // applying the next set of settings.
  lastAppliedViewport.delete(page)
  await applyPageSettings(page, pageViewport, headers)

  const targetUrl = buildUrl(url, fullscreen, themeName)

  try {
    await page.goto(targetUrl, {
      waitUntil: config.waitUntil,
      timeout: config.timeout,
    })
  } catch (e) {
    if (String(e).includes('NS_BINDING_ABORTED')) {
      await page.goto(targetUrl, {
        waitUntil: config.waitUntil,
        timeout: config.timeout,
      })
    } else {
      throw e
    }
  }

  recordNavigation(targetUrl)
}

const navigateToFreshPage = async (
  state: SessionState,
  url: string,
  themeName: string | null | undefined,
  fullscreen: boolean,
  pageViewport: { width?: number; height?: number } | null | undefined,
  headers: Record<string, string> | null | undefined
) => {
  await clearBrowserStorage(state.page)
  await navigateToPage(
    state.page,
    url,
    themeName,
    fullscreen,
    pageViewport,
    headers
  )

  // Clear the bootstrap memo BEFORE re-injecting. Navigation
  // destroys the injected stylesheet and test configuration, so the
  // WeakSets must be cleared first — otherwise the bootstrap helpers
  // see a stale "already done" flag and return early.
  resetPageBootstrapMemo(state.page)

  await applyTestConfiguration(state.page)
  await addTestStylesheet(state.page)
  await waitForVisualStability(state.page)

  state.currentRootClassName = null
  state.mutationKind = 'none'
}

const hardResetPage = async (
  state: SessionState,
  pageViewport: { width?: number; height?: number } | null | undefined,
  headers: Record<string, string> | null | undefined
) => {
  await clearBrowserStorage(state.page)
  await state.page.reload({
    waitUntil: config.waitUntil,
    timeout: config.timeout,
  })
  await applyPageSettings(state.page, pageViewport, headers)

  // Clear the bootstrap memo BEFORE re-injecting. A reload destroys
  // the injected stylesheet and test configuration, so the WeakSets
  // must be cleared first — otherwise the bootstrap helpers see a
  // stale "already done" flag and return early.
  resetPageBootstrapMemo(state.page)

  await applyTestConfiguration(state.page)
  await addTestStylesheet(state.page)
  await waitForVisualStability(state.page)

  state.currentRootClassName = null
  state.mutationKind = 'none'
}

const makePageReady = async (
  state: SessionState,
  payload: MakeScreenshotPayload
) => {
  if (!payload.url) {
    // No URL provided (e.g. a describe block without setupPageScreenshot
    // that relies on the page staying at the previous URL). If the
    // previous test marked a structural mutation we must still reload the
    // page so the DOM is clean; use the already-navigated URL for that.
    if (
      state.mutationKind === 'structural' &&
      state.navigatedUrl &&
      !state.page.isClosed()
    ) {
      await hardResetPage(state, payload.pageViewport, payload.headers)
    }
    return
  }

  const targetUrl = buildUrl(
    payload.url,
    Boolean(payload.fullscreen),
    payload.themeName
  )

  const resetStrategy = getPageResetStrategyFromMutation({
    currentRetry: payload.retry,
    mutationKind: state.mutationKind,
    targetUrl,
    currentNavigatedUrl: state.navigatedUrl,
  })

  if (resetStrategy === 'reload') {
    await hardResetPage(state, payload.pageViewport, payload.headers)
    return
  }

  if (resetStrategy === 'navigate') {
    await navigateToFreshPage(
      state,
      payload.url,
      payload.themeName,
      Boolean(payload.fullscreen),
      payload.pageViewport,
      payload.headers
    )
    state.navigatedUrl = targetUrl
    return
  }

  // resetStrategy === 'none'
  if (targetUrl !== state.navigatedUrl) {
    // The previous navigation tagged the page as initialised /
    // stylesheet-applied, but `page.goto()` discards the test
    // stylesheet we injected with `addStyleTag`. Drop the per-Page
    // memo so the bootstrap actually re-runs after the navigation.
    resetPageBootstrapMemo(state.page)
    await navigateToPage(
      state.page,
      payload.url,
      payload.themeName,
      Boolean(payload.fullscreen),
      payload.pageViewport,
      payload.headers
    )
    state.navigatedUrl = targetUrl
    await applyTestConfiguration(state.page)
    await addTestStylesheet(state.page)
    await waitForVisualStability(state.page)
  } else {
    await applyPageSettings(
      state.page,
      payload.pageViewport,
      payload.headers
    )
  }
}

// ── helpers: element selection / styling ─────────────────────────────

const makeStyles = (style: Record<string, string>) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')

const makeUniqueWrapperId = (() => {
  let n = 0
  return () => `vis-wrap-${Date.now().toString(36)}-${n++}`
})()

const handleElement = async (
  state: SessionState,
  payload: MakeScreenshotPayload
) => {
  const { page } = state
  const { selector, style, styleSelector } = payload

  const count = await page.evaluate(
    ({ selector }) => {
      const main = selector.match(/(data-visual-test="([^"]*)")/)?.[0]
      try {
        return document.querySelectorAll(main ? `[${main}]` : selector)
          .length
      } catch {
        return undefined
      }
    },
    { selector }
  )

  if (typeof count === 'number' && count > 1) {
    throw new Error(
      `Ensure the selector '${selector}' exists only once! Found ${count}.`
    )
  }

  await page.waitForSelector(selector, { state: 'attached' })

  let styleCleanup: (() => Promise<void>) | null = null

  if (style) {
    const target = styleSelector || selector
    const originalStyle = await page.$eval(target, (node) =>
      node.getAttribute('style')
    )

    await page.$eval(
      target,
      (node, styleStr: string) => {
        const existing = node.getAttribute('style')
        const merged = existing
          ? `${existing.replace(/;?\s*$/, '')}; ${styleStr}`
          : styleStr
        node.setAttribute('style', merged)
      },
      makeStyles(style)
    )

    styleCleanup = async () => {
      await page.$eval(
        target,
        (node, original: string | null) => {
          if (original !== null) {
            node.setAttribute('style', original)
          } else {
            node.removeAttribute('style')
          }
        },
        originalStyle
      )
    }
  }

  if (payload.rootClassName || state.currentRootClassName) {
    await handleRootClassName(state, payload.rootClassName)
  }

  const element = await page.$(selector)
  return { element, styleCleanup }
}

const handleRootClassName = async (
  state: SessionState,
  rootClassName: string | string[] | null | undefined
) => {
  const { page } = state
  if (state.currentRootClassName) {
    await page.evaluate(
      ({ rootClassName }) => {
        const el = document.documentElement
        const classes = Array.isArray(rootClassName)
          ? rootClassName
          : [rootClassName]
        classes.forEach((c) => {
          if (el.classList.contains(c)) {
            el.classList.remove(c)
          }
        })
      },
      { rootClassName: state.currentRootClassName }
    )
    state.currentRootClassName = null
  }

  if (rootClassName) {
    await page.evaluate(
      ({ rootClassName }) => {
        const el = document.documentElement
        const classes = Array.isArray(rootClassName)
          ? rootClassName
          : [rootClassName]
        classes.forEach((c) => {
          if (!el.classList.contains(c)) {
            el.classList.add(c)
          }
        })
      },
      { rootClassName }
    )
    state.currentRootClassName = rootClassName
  }
}

// ── helpers: wrapper ─────────────────────────────────────────────────

const handleWrapper = async (
  page: Page,
  selector: string,
  wrapperStyle: Record<string, string> | null | undefined,
  withWrapper: boolean,
  element: Awaited<ReturnType<Page['$']>>
) => {
  if (!withWrapper) {
    return { element, screenshotTargetSelector: selector }
  }

  const wrapperId = makeUniqueWrapperId()

  const background = await page.evaluate(
    ({ selector }) => {
      const el = document.querySelector(selector)?.parentNode
      const bg = window
        .getComputedStyle(el as Element)
        ?.getPropertyValue('background-color')
      if (!el || bg === 'rgba(0, 0, 0, 0)') {
        return null
      }
      return bg
    },
    { selector }
  )

  // Measure height BEFORE width. `measureWrapperWidth` temporarily
  // moves the element to an off-screen probe, which can perturb
  // Firefox's sub-pixel layout by a fraction of a pixel. By
  // capturing the element box first, the wrapper height is based on
  // the undisturbed layout.
  const initialBox = await getElementBox(page, selector, element)

  const measuredWidth = await measureWrapperWidth(
    page,
    selector,
    wrapperStyle ?? null,
    background
  )
  const yDecimals = initialBox.y.toString().split('.')[1] || 0

  // Snap dimensions to an 8 px grid. Firefox's font shaping can
  // shift text metrics by a few sub-pixels between runs (even with
  // isolated browser processes), which makes `Math.ceil` land on
  // different integers. The grid absorbs that variance so the
  // wrapper size stays stable.
  const snappedHeight = Math.ceil(initialBox.height / 8) * 8

  const styleStr = makeStyles({
    display: 'inline-block',
    background: background ?? '',
    top: `0.${yDecimals}px`,
    'min-width': measuredWidth
      ? `${Math.ceil(measuredWidth / 8) * 8}px`
      : null,
    height: `${snappedHeight + 32}px`,
    ...(wrapperStyle ? wrapperStyle : {}),
  })

  await page.$eval(
    selector,
    (element, { id, style }: { id: string; style: string }) => {
      const attrValue = element.getAttribute('data-visual-test')
      const wrapperEl = document.createElement('div')
      wrapperEl.setAttribute('data-visual-test-id', id)
      wrapperEl.setAttribute('data-visual-test-wrapper', attrValue ?? '')

      element.parentNode!.insertBefore(wrapperEl, element)
      wrapperEl.appendChild(element)
      wrapperEl.setAttribute('style', style)

      const elRec = element.getBoundingClientRect()
      const wrRec = wrapperEl.getBoundingClientRect()

      if (wrRec.top - elRec.top > 0) {
        throw new Error(
          `Top of element is ${wrRec.top - elRec.top}px above the screenshot area.`
        )
      }

      const overflowBottom = Math.ceil(elRec.bottom - wrRec.bottom)
      if (overflowBottom > 0) {
        wrapperEl.style.height = `${
          wrapperEl.getBoundingClientRect().height + overflowBottom
        }px`
      }
    },
    { id: wrapperId, style: styleStr }
  )

  await page.waitForSelector(`[data-visual-test-id="${wrapperId}"]`)

  const screenshotElement = await page.$(
    `[data-visual-test-id="${wrapperId}"]`
  )

  return {
    element: screenshotElement,
    screenshotTargetSelector: `[data-visual-test-id="${wrapperId}"]`,
  }
}

const getElementBox = async (
  page: Page,
  selector: string,
  element: Awaited<ReturnType<Page['$']>>
) => {
  const box = await element?.boundingBox()
  if (box) {
    return box
  }
  return await page.$eval(selector, (el) => {
    const { height, y } = el.getBoundingClientRect()
    return { height, y, x: 0, width: 0 }
  })
}

const syncWrapperBounds = async (page: Page, selector: string) => {
  await page.evaluate(
    ({ selector }) => {
      const el = document.querySelector(selector)
      const wrapper = el?.closest(
        '[data-visual-test-wrapper]'
      ) as HTMLElement | null
      if (wrapper) {
        const elRect = el!.getBoundingClientRect()
        const wRect = wrapper.getBoundingClientRect()
        const overflow = Math.ceil(elRect.bottom - wRect.bottom)
        if (overflow > 0) {
          const current = parseFloat(wrapper.style.height || '0')
          wrapper.style.height = `${current + overflow}px`
        }
      }
    },
    { selector }
  )
}

const measureWrapperWidth = async (
  page: Page,
  selector: string,
  wrapperStyle: Record<string, string> | null,
  background: string | null
): Promise<number | null> => {
  if (wrapperStyle?.width || wrapperStyle?.['inline-size']) {
    return null
  }

  return await page.$eval(
    selector,
    (
      element,
      {
        background,
        wrapperStyle,
      }: {
        background: string | null
        wrapperStyle: Record<string, string> | null
      }
    ) => {
      // Measure the natural shrink-to-fit width of the screenshot
      // target via an off-screen probe wrapper. Reusing the page
      // between tests means the in-flow parent may have been forced
      // wide by an earlier test, so a direct
      // `wrapperEl.getBoundingClientRect()` call would over-report.
      // The probe is `display: inline-block`, so it sizes to its
      // content regardless of the surrounding layout.
      //
      // We deliberately move the real element into the probe (and
      // back) instead of cloning it. `cloneNode(true)` duplicates
      // <input name=…> elements, which the browser dedupes by
      // un-checking the originals -- silently breaking radio-group
      // screenshots that depend on the initial `checked` state.
      const parentWidth =
        element.parentElement?.getBoundingClientRect().width ?? Infinity

      const placeholder = document.createComment('vis-measure-anchor')
      element.parentNode!.insertBefore(placeholder, element)

      const probe = document.createElement('div')
      probe.setAttribute(
        'style',
        'position:absolute; left:-99999px; top:0; opacity:0; pointer-events:none; z-index:-1;'
      )

      const wrapperEl = document.createElement('div')
      wrapperEl.setAttribute(
        'style',
        [
          `background: ${background ?? '#fff'}`,
          'display: inline-block',
          'padding: 1rem',
          'margin: -1rem',
          'box-shadow: 0 0 0 1px #fff',
          wrapperStyle
            ? Object.entries(wrapperStyle)
                .filter(([key, value]) => key && value)
                .map(([key, value]) => `${key}: ${value}`)
                .join(';')
            : '',
        ]
          .filter(Boolean)
          .join(';')
      )

      wrapperEl.appendChild(element)
      probe.appendChild(wrapperEl)
      placeholder.parentNode!.insertBefore(probe, placeholder)

      const measured = wrapperEl.getBoundingClientRect().width

      // Move the element back to its original spot before the
      // anchor comment, then remove the anchor and the probe.
      placeholder.parentNode!.insertBefore(element, placeholder)
      placeholder.remove()
      probe.remove()

      return Math.min(measured, parentWidth)
    },
    { background, wrapperStyle }
  )
}

const wrapperCleanup = async (
  page: Page,
  selector: string,
  withWrapper: boolean
) => {
  if (!withWrapper) {
    return
  }
  await page.evaluate(
    ({ selector }) => {
      const el = document.querySelector(selector)
      const wrapper = el?.closest('[data-visual-test-wrapper]')
      if (wrapper) {
        wrapper.replaceWith(...Array.from(wrapper.childNodes))
      }
    },
    { selector }
  )
}

// ── helpers: simulation ──────────────────────────────────────────────

const handleSimulation = async (
  state: SessionState,
  element: Awaited<ReturnType<Page['$']>>,
  simulate: Simulate | null | undefined,
  simulateSelector: string | undefined,
  fallbackSelector: string,
  _isCI: boolean
) => {
  const { page } = state
  let target = element

  if (simulateSelector) {
    await page.waitForSelector(simulateSelector, {
      state: 'attached',
      timeout: 5000,
    })
    target = await page.$(simulateSelector)
  }

  let delaySimulation = 0
  let lastMouseAction: ActionName | undefined
  let hoverCleanup: (() => Promise<void>) | null = null

  if (!simulate) {
    return { delaySimulation, lastMouseAction, hoverCleanup }
  }

  const list = Array.isArray(simulate) ? simulate : [simulate]
  for (const item of list) {
    const sim: Action = typeof item === 'string' ? { action: item } : item

    let toSim = target

    if (sim.selector) {
      await page.waitForSelector(sim.selector, {
        state: 'attached',
        timeout: 5000,
      })
      toSim = await page.$(sim.selector)
      await page.mouse.move(0, 0, { steps: 1 })
    }

    if (!toSim) {
      throw new Error(
        `Could not find element to simulate using selector: ${
          sim.selector || simulateSelector || '[main selector]'
        }`
      )
    }

    if (sim.action) {
      lastMouseAction = sim.action
      switch (sim.action) {
        case 'hover': {
          hoverCleanup = await emulatePseudoStateViaCSS(page, toSim)
          break
        }
        case 'click': {
          try {
            await toSim.scrollIntoViewIfNeeded()
            const box = await toSim.boundingBox()
            if (box) {
              await page.mouse.click(
                box.x + box.width / 2,
                box.y + box.height / 2
              )
            } else {
              throw new Error('No bounding box')
            }
          } catch {
            await toSim.evaluate((el) => {
              ;(el as HTMLElement).dispatchEvent(
                new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  composed: true,
                  view: window,
                })
              )
            })
          }
          break
        }
        case 'focusclick': {
          delaySimulation = _isCI ? 200 : 100
          await toSim.click({ force: true })
          await page.keyboard.press('Tab')
          await toSim.focus()
          await waitForFocusState(
            page,
            sim.selector || simulateSelector || fallbackSelector
          )
          break
        }
        case 'active': {
          hoverCleanup = await emulatePseudoStateViaCSS(page, toSim, [
            ':hover',
            ':active',
          ])
          break
        }
        case 'focus': {
          await page.keyboard.press('Tab')
          await toSim.focus()
          await waitForFocusState(
            page,
            sim.selector || simulateSelector || fallbackSelector
          )
          break
        }
      }
    }

    if (sim.keypress) {
      await page.keyboard.press(sim.keypress)
    }
  }

  return { delaySimulation, lastMouseAction, hoverCleanup }
}

// ── helpers: take screenshot ─────────────────────────────────────────

const takeScreenshot = async (
  page: Page,
  screenshotElement: Awaited<ReturnType<Page['$']>>,
  screenshotTargetSelector: string,
  screenshotSelector: string | null | undefined,
  selector: string
): Promise<Buffer> => {
  const target = screenshotSelector || screenshotTargetSelector || selector
  if (target) {
    await page.waitForSelector(target, { state: 'visible' })
    return await page.locator(target).first().screenshot()
  }

  const isAttached = await screenshotElement
    ?.evaluate((el) => el.isConnected)
    .catch(() => false)

  if (!isAttached) {
    const wrapperSel = screenshotSelector || '[data-visual-test-wrapper]'
    await page
      .waitForSelector(wrapperSel, { state: 'attached', timeout: 5000 })
      .catch(() => null)
    const refetched = await page.$(wrapperSel)
    if (refetched) {
      screenshotElement = refetched
    }
  }

  return await screenshotElement!.screenshot()
}

// ── core orchestration ───────────────────────────────────────────────

const isCI =
  String(process.env.CI) === 'true' || String(process.env.CI) === '1'

async function performScreenshot(
  state: SessionState,
  payload: MakeScreenshotPayload
): Promise<Buffer> {
  const effectiveWithWrapper = payload.withWrapper ?? true

  // Match the original Playwright setup: any simulate, script
  // execution, or rootClassName triggers a page reload before the
  // next test. This avoids fragile cleanup logic and stale state.
  const shouldReloadAfter = Boolean(
    payload.simulate ||
    payload.simulateAfter ||
    payload.executeBeforeSimulateSrc ||
    payload.recalculateHeightAfterSimulate ||
    payload.rootClassName
  )

  let styleCleanup: (() => Promise<void>) | null = null
  let hoverCleanup: (() => Promise<void>) | null = null
  let lastMouseAction: ActionName | undefined
  let delaySimulation = 0
  let wrapperWasAdded = false
  const { page } = state

  try {
    await makePageReady(state, payload)

    const elementResult = await handleElement(state, payload)
    styleCleanup = elementResult.styleCleanup

    const wrapped = await handleWrapper(
      page,
      payload.selector,
      payload.wrapperStyle,
      effectiveWithWrapper,
      elementResult.element
    )
    const screenshotElement = wrapped.element
    const screenshotTargetSelector = wrapped.screenshotTargetSelector
    wrapperWasAdded = effectiveWithWrapper

    if (payload.executeBeforeSimulateSrc) {
      const fn = new Function(
        `return (${payload.executeBeforeSimulateSrc})`
      )()
      await page.evaluate(fn)
    }

    const simRes = await handleSimulation(
      state,
      elementResult.element,
      payload.simulate ?? null,
      payload.simulateSelector ?? undefined,
      payload.selector,
      isCI
    )
    delaySimulation = simRes.delaySimulation
    lastMouseAction = simRes.lastMouseAction
    hoverCleanup = simRes.hoverCleanup

    if (payload.recalculateHeightAfterSimulate) {
      await syncWrapperBounds(page, payload.selector)
    }

    await waitForVisualStability(page)

    if (wrapperWasAdded) {
      await syncWrapperBounds(page, payload.selector)
    }

    if (lastMouseAction === 'click' || lastMouseAction === 'focusclick') {
      await page.mouse.move(0, 0, { steps: 1 })
    }

    // Let the compositor settle all pending style recalculations
    // before capturing.
    await page.evaluate(
      () =>
        new Promise<void>((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => r()))
        )
    )

    const buffer = await takeScreenshot(
      page,
      screenshotElement,
      screenshotTargetSelector,
      payload.screenshotSelector,
      payload.selector
    )

    if (payload.simulateAfter) {
      const after = await handleSimulation(
        state,
        elementResult.element,
        payload.simulateAfter,
        undefined,
        payload.selector,
        isCI
      )
      lastMouseAction = after.lastMouseAction
      if (after.hoverCleanup) {
        hoverCleanup = after.hoverCleanup
      }
      await waitForVisualStability(page)
    }

    if (delaySimulation > 0) {
      await page.waitForTimeout(delaySimulation)
    }

    state.mutationKind = shouldReloadAfter ? 'structural' : 'none'

    return buffer
  } catch (error) {
    state.mutationKind = 'structural'
    throw error
  } finally {
    if (hoverCleanup) {
      await hoverCleanup().catch(() => {
        state.mutationKind = 'structural'
      })
    }

    if (wrapperWasAdded) {
      await wrapperCleanup(page, payload.selector, true).catch(() => {
        state.mutationKind = 'structural'
      })
    }

    await page.mouse.move(0, 0, { steps: 1 }).catch(() => {
      state.mutationKind = 'structural'
    })

    if (lastMouseAction === 'active') {
      await page.mouse.up().catch(() => {
        state.mutationKind = 'structural'
      })
    }

    if (styleCleanup) {
      await styleCleanup().catch(() => {
        state.mutationKind = 'structural'
      })
    }

    await page
      .evaluate(() => {
        const active = document.activeElement as HTMLElement | null
        if (active && active !== document.body) {
          active.blur()
        }
        window.scrollTo(0, 0)
      })
      .catch(() => {
        state.mutationKind = 'structural'
      })
  }
}

// ── snapshot pipeline ────────────────────────────────────────────────

async function diffAndPersist(
  payload: MakeScreenshotPayload,
  actualBytes: Buffer
): Promise<MakeScreenshotResult> {
  const reference = await readFileIfExists(payload.snapshotPath)

  if (!reference || payload.update) {
    await writeFile(payload.snapshotPath, actualBytes)
    await removeIfExists(payload.diffPath)
    await removeIfExists(payload.actualPath)
    return {
      status: reference ? 'updated' : 'created',
      snapshotPath: payload.snapshotPath,
    }
  }

  // Decode both PNGs in scoped variables so we can null them out as
  // soon as the diff finishes. Without this V8's old-space holds onto
  // the ~10 MiB raw pixel buffers across hundreds of awaits and the
  // process eventually OOMs on long screenshot runs.
  let referencePng: PNG | null = PNG.sync.read(reference)
  let actualPng: PNG | null = PNG.sync.read(actualBytes)
  const refWidth = referencePng.width
  const refHeight = referencePng.height
  const actWidth = actualPng.width
  const actHeight = actualPng.height

  if (refWidth !== actWidth || refHeight !== actHeight) {
    await writeFile(payload.actualPath, actualBytes)
    recordFailure({
      testFilePath: payload.testFilePath,
      fullName: payload.fullName,
      snapshotPath: payload.snapshotPath,
      diffPath: null,
      actualPath: payload.actualPath,
      message: `Screenshot dimensions differ: reference ${refWidth}x${refHeight}, actual ${actWidth}x${actHeight}.`,
      htmlDumpPath: payload.htmlDumpPath,
    })

    referencePng = null
    actualPng = null

    return {
      status: 'size-mismatch',
      reference: { width: refWidth, height: refHeight },
      actual: { width: actWidth, height: actHeight },
      actualPath: payload.actualPath,
    }
  }

  let diff: PNG | null = new PNG({ width: refWidth, height: refHeight })

  const diffPixels = blazediff(
    referencePng.data,
    actualPng.data,
    diff.data,
    refWidth,
    refHeight,
    { threshold: 0.01 } // 1% per-pixel color difference tolerance
  )

  const totalPixels = refWidth * refHeight
  const ratio = totalPixels === 0 ? 0 : diffPixels / totalPixels

  if (ratio > payload.allowedMismatchedPixelRatio) {
    await writeFile(payload.actualPath, actualBytes)
    await writeFile(payload.diffPath, PNG.sync.write(diff))
    recordFailure({
      testFilePath: payload.testFilePath,
      fullName: payload.fullName,
      snapshotPath: payload.snapshotPath,
      diffPath: payload.diffPath,
      actualPath: payload.actualPath,
      message: `Screenshot mismatch: ${diffPixels} px differ (${(ratio * 100).toFixed(3)}%).`,
      htmlDumpPath: payload.htmlDumpPath,
    })

    referencePng = null
    actualPng = null
    diff = null

    return {
      status: 'mismatch',
      diffPixels,
      ratio,
      width: refWidth,
      height: refHeight,
      diffPath: payload.diffPath,
      actualPath: payload.actualPath,
    }
  }

  referencePng = null
  actualPng = null
  diff = null

  await removeIfExists(payload.diffPath)
  await removeIfExists(payload.actualPath)
  return { status: 'match' }
}

// ── exported BrowserCommand ──────────────────────────────────────────

const captureSelectorHtml = async (
  page: Page,
  selector: string
): Promise<string | null> => {
  try {
    const html = await page.$eval(selector, (el) => el.outerHTML)
    return typeof html === 'string' ? html : null
  } catch {
    return null
  }
}

export const makeScreenshot = defineBrowserCommand<
  [MakeScreenshotPayload]
>(async (ctx, payload): Promise<MakeScreenshotResult> => {
  const state = await ensureSession(ctx.sessionId, ctx.page)

  // performScreenshot returns the raw PNG buffer; diffAndPersist owns
  // it from there. We deliberately drop the local reference between
  // the two awaits so the buffer can be reclaimed as soon as the
  // diff/encoder is done with it. Long runs (hundreds of tests in a
  // single Node process) accumulate enough Buffers to push V8 over its
  // default heap, so being explicit here pays off in practice.
  let buffer: Buffer | null = await performScreenshot(state, payload)
  let result: MakeScreenshotResult
  try {
    result = await diffAndPersist(payload, buffer)
  } finally {
    buffer = null
  }

  // On any failure, persist a tiny `outerHTML` dump of the screenshot
  // selector next to the diff PNGs. This makes triaging much easier:
  // contributors can tell at a glance whether a screenshot diff is a
  // real visual regression or an interaction-state regression
  // (focus ring missing, hover state didn't apply, etc.).
  if (result.status === 'mismatch' || result.status === 'size-mismatch') {
    const html = await captureSelectorHtml(state.page, payload.selector)
    if (html) {
      try {
        await writeFile(
          payload.htmlDumpPath,
          new TextEncoder().encode(html)
        )
      } catch {
        // stop here
      }
    }
  } else {
    await removeIfExists(payload.htmlDumpPath)
  }

  return result
})

// ── test-only exports ────────────────────────────────────────────────
// Exposed so unit tests can exercise internal logic without going
// through the full BrowserCommand surface.

export const _testing = {
  buildUrl,
  sessions,
  browserSlots,
  sessionToSlot,
  getBrowserSlot,
  cleanupBrowserPool,
  resetPoolCleanedUp: () => {
    poolCleanedUp = false
  },
}
