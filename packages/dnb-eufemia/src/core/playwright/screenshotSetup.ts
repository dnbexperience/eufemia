/**
 * Playwright Setup for Screenshot testing
 *
 * All original makeScreenshot / setupPageScreenshot features are preserved.
 */

import path from 'path'
import fs from 'fs/promises'
import ora from 'ora'
import { isCI } from 'repo-utils'
import { makeUniqueId } from '../../shared/component-helper'
import { getPageResetStrategy } from './pageResetStrategy'
import { clearBrowserStorages } from './storageReset'
import {
  test as base,
  expect,
  type Page,
  type ElementHandle,
  type TestInfo,
} from '@playwright/test'

// Module-level reference to the current worker's shared page.
// Set automatically by the fixture so makeScreenshot can use it
// without requiring callers to pass it explicitly.
let sharedPage: Page | null = null
let currentRetry = 0
let needsHardReset = false

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const testWithSharedPage = base.extend<{}, { _sharedPage: Page }>({
  _sharedPage: [
    async ({ browser }, use) => {
      const page = await browser.newPage()
      sharedPage = page

      // Set IS_TEST before any page script runs so that
      // VisibleWhenVisualTest components render their children
      // during the initial React render.
      await page.addInitScript(() => {
        ;(globalThis as Record<string, unknown>).IS_TEST = true
      })

      await use(page)
      await page.close()
      sharedPage = null
    },
    { scope: 'worker', auto: true },
  ],
})

export const test = testWithSharedPage.extend<{ page: Page }>({
  page: async ({ _sharedPage }, use) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(_sharedPage)
  },
})

test.beforeEach(async ({ page }, testInfo: TestInfo) => {
  sharedPage = page
  currentRetry = testInfo.retry
})

export { expect }
export { onMain, runOnMain, selectThemes } from './themeSelection'
export { isCI }

export const loadImage = async (imagePath: string) =>
  await fs.readFile(path.resolve(imagePath))

const log = ora()

export const config = {
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort:
    Number(process.env.PORT || process.env.port) || 8000,
  pixelGrid: 8,
  pageViewport: {
    width: 1280,
    height: 2048,
  },
  timeout: 30e3,
  waitUntil: 'load' as
    | 'load'
    | 'domcontentloaded'
    | 'networkidle'
    | 'commit',
}

// Cache the test stylesheet content once at module load to avoid
// reading from disk on every single test.
const testStylesheetContent = fs.readFile(
  path.resolve(__dirname, './screenshotTestStyles.css'),
  'utf-8'
)

type ActionName = 'click' | 'hover' | 'focus' | 'focusclick' | 'active'
type Action = { action?: ActionName; selector?: string; keypress?: string }
type Simulate = Action | ActionName | (Action | ActionName)[]

type DescribeDefaults = {
  url: string | null
  themeName: string | null
  pageViewport: { width?: number; height?: number } | null
  headers: Record<string, string> | null
  fullscreen: boolean
  withWrapper: boolean | null
}

/**
 * Stores the defaults set by setupPageScreenshot for the current describe block.
 * Values are restored after the describe finishes so viewport and other page
 * settings do not leak into sibling describes or later files that reuse the
 * same worker-scoped page.
 */
let describeDefaults: DescribeDefaults = {
  url: null,
  themeName: null,
  pageViewport: null,
  headers: null,
  fullscreen: false,
  withWrapper: null,
}

// Tracks rootClassName across tests (for cleanup between consecutive tests)
let currentRootClassName: string | string[] | null = null

// Tracks the last navigated URL so we skip redundant page.goto() calls.
// With the worker-scoped shared page, tests in the same describe block
// reuse the already-navigated page — just like the old Jest setup.
let currentNavigatedUrl: string | null = null

// ── helpers ──────────────────────────────────────────────────────────

async function applyTestConfiguration(page: Page) {
  await page.evaluate(() => {
    try {
      window['IS_TEST'] = true
      document.documentElement.setAttribute('data-visual-test', 'true')
    } catch (e) {
      //
    }
  })
}

async function addTestStylesheet(page: Page) {
  await page.addStyleTag({ content: await testStylesheetContent })
}

async function clearBrowserStorage(page: Page) {
  await page.evaluate(clearBrowserStorages)
}

async function waitForVisualStability(page: Page) {
  await page.evaluate(async () => {
    const waitForFrame = () => {
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve())
      })
    }

    try {
      if ('fonts' in document) {
        await document.fonts.ready
      }
    } catch {
      // stop here
    }

    try {
      // eslint-disable-next-line compat/compat
      const animations = document.getAnimations().filter((animation) => {
        const iterations = animation.effect?.getTiming?.().iterations
        return iterations !== Infinity
      })

      await Promise.all(
        animations.map((animation) => {
          return Promise.race([
            animation.finished.catch(() => undefined),
            new Promise((resolve) => setTimeout(resolve, 500)),
          ])
        })
      )
    } catch {
      // stop here
    }

    await waitForFrame()
    await waitForFrame()
  })
}

async function hardResetPage({
  page,
  pageViewport,
  headers,
}: {
  page: Page
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
}) {
  await clearBrowserStorage(page)

  await page.reload({
    waitUntil: config.waitUntil,
    timeout: config.timeout,
  })

  await applyPageSettings(page, pageViewport, headers)
  await applyTestConfiguration(page)
  await addTestStylesheet(page)
  await waitForVisualStability(page)

  currentRootClassName = null
  needsHardReset = false
}

async function navigateToFreshPage({
  page,
  url,
  themeName,
  pageViewport,
  headers,
  fullscreen,
}: {
  page: Page
  url: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
}) {
  await clearBrowserStorage(page)

  await navigateToPage({
    page,
    url,
    themeName,
    pageViewport,
    headers,
    fullscreen,
  })

  await applyTestConfiguration(page)
  await addTestStylesheet(page)
  await waitForVisualStability(page)

  currentRootClassName = null
  needsHardReset = false
}

async function applyPageSettings(
  page: Page,
  pageViewport?: { width?: number; height?: number },
  headers?: Record<string, string>
) {
  if (pageViewport || config.pageViewport) {
    let finalViewport: { width: number; height: number }

    if (pageViewport && config.pageViewport) {
      finalViewport = { ...config.pageViewport, ...pageViewport } as {
        width: number
        height: number
      }
    } else if (pageViewport) {
      finalViewport = pageViewport as { width: number; height: number }
    } else {
      finalViewport = config.pageViewport as {
        width: number
        height: number
      }
    }

    await page.setViewportSize(finalViewport)
  }

  if (headers) {
    await page.setExtraHTTPHeaders(headers)
  }
}

async function navigateToPage({
  page,
  url,
  themeName,
  pageViewport,
  headers,
  fullscreen,
}: {
  page: Page
  url: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
}) {
  await applyPageSettings(page, pageViewport, headers)

  const targetUrl = createUrl(url, fullscreen, themeName)

  try {
    await page.goto(targetUrl, {
      waitUntil: config.waitUntil,
      timeout: config.timeout,
    })
  } catch (e) {
    // Retry on NS_BINDING_ABORTED — happens when a pending
    // client-side navigation from the previous test is still in flight.
    if (String(e).includes('NS_BINDING_ABORTED')) {
      await page.goto(targetUrl, {
        waitUntil: config.waitUntil,
        timeout: config.timeout,
      })
    } else {
      throw e
    }
  }

  // page.goto already waits for 'load', which is sufficient.
  // Avoid 'networkidle' as it can hang with Vite HMR websockets.
}

// ── public API ───────────────────────────────────────────────────────

/**
 * Registers the URL/theme/viewport for all tests inside the current
 * describe block. Each test will navigate to this URL automatically
 * via makeScreenshot when no explicit url is passed.
 */
export const setupPageScreenshot = ({
  url,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
  withWrapper = null,
}: {
  url?: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
  withWrapper?: boolean
  timeout?: number
}) => {
  let previousDescribeDefaults: DescribeDefaults

  test.beforeAll(() => {
    previousDescribeDefaults = { ...describeDefaults }

    describeDefaults = {
      url: url ?? describeDefaults.url,
      themeName: themeName ?? describeDefaults.themeName,
      pageViewport: pageViewport ?? describeDefaults.pageViewport,
      headers: headers ?? describeDefaults.headers,
      fullscreen: fullscreen || describeDefaults.fullscreen,
      withWrapper: withWrapper ?? describeDefaults.withWrapper,
    }
  })

  test.afterAll(() => {
    describeDefaults = previousDescribeDefaults
  })
}

export const makeScreenshot = async ({
  page = sharedPage,
  url = null,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
  selector,
  style = null,
  rootClassName = null,
  withWrapper = null,
  executeBeforeSimulate = null,
  simulate = null,
  simulateAfter = null,
  screenshotSelector = null,
  styleSelector = null,
  simulateSelector = null,
  wrapperStyle = null,
  recalculateHeightAfterSimulate = false,
}: {
  page?: Page
  url?: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
  selector: string
  style?: Record<string, string>
  rootClassName?: string | string[]
  withWrapper?: boolean
  executeBeforeSimulate?: () => void
  simulate?: Simulate
  simulateAfter?: Simulate
  screenshotSelector?: string
  styleSelector?: string
  simulateSelector?: string
  wrapperStyle?: Record<string, string>
  recalculateHeightAfterSimulate?: boolean
}) => {
  // Merge with describe-level defaults
  const effectiveUrl = url ?? describeDefaults.url
  const effectiveTheme = themeName ?? describeDefaults.themeName
  const effectiveViewport =
    pageViewport ?? describeDefaults.pageViewport ?? null
  const effectiveHeaders = headers ?? describeDefaults.headers
  const effectiveFullscreen = fullscreen || describeDefaults.fullscreen
  const effectiveWithWrapper =
    withWrapper ?? describeDefaults.withWrapper ?? true

  const shouldHardResetAfter = Boolean(
    simulate ||
    simulateAfter ||
    executeBeforeSimulate ||
    recalculateHeightAfterSimulate ||
    rootClassName
  )

  let styleCleanup: (() => Promise<void>) | null = null
  let lastMouseAction: ActionName = undefined
  let delaySimulation = 0
  let wrapperWasAdded = false

  try {
    await makePageReady({
      page,
      url: effectiveUrl,
      themeName: effectiveTheme,
      pageViewport: effectiveViewport,
      headers: effectiveHeaders,
      fullscreen: effectiveFullscreen,
    })

    const { element, styleCleanup: pendingStyleCleanup } =
      await handleElement({
        page,
        selector,
        style,
        styleSelector,
        rootClassName,
      })
    styleCleanup = pendingStyleCleanup

    const { element: screenshotElement, screenshotTargetSelector } =
      await handleWrapper({
        page,
        selector,
        wrapperStyle,
        withWrapper: effectiveWithWrapper,
        element,
      })
    wrapperWasAdded = effectiveWithWrapper

    if (executeBeforeSimulate) {
      await page.evaluate(executeBeforeSimulate)
    }

    const simulationValues = await handleSimulation({
      page,
      element,
      simulate,
      simulateSelector,
    })
    delaySimulation = simulationValues.delaySimulation
    lastMouseAction = simulationValues.lastMouseAction

    if (recalculateHeightAfterSimulate) {
      await syncWrapperBounds({ page, selector })
    }

    await waitForVisualStability(page)

    if (wrapperWasAdded) {
      await syncWrapperBounds({ page, selector })
    }

    if (lastMouseAction === 'click' || lastMouseAction === 'focusclick') {
      await page.mouse.move(0, 0)
    }

    const screenshot = await takeScreenshot({
      page,
      screenshotElement,
      screenshotTargetSelector,
      screenshotSelector,
      selector,
    })

    if (simulateAfter) {
      const { lastMouseAction: lastMouseActionAfter } =
        await handleSimulation({
          page,
          element,
          simulate: simulateAfter,
        })
      lastMouseAction = lastMouseActionAfter
      await waitForVisualStability(page)
    }

    if (delaySimulation > 0) {
      await page.waitForTimeout(delaySimulation)
    }

    needsHardReset = shouldHardResetAfter

    return screenshot
  } catch (error) {
    needsHardReset = true
    throw error
  } finally {
    if (wrapperWasAdded) {
      await wrapperCleanup({
        page,
        selector,
        withWrapper: effectiveWithWrapper,
      }).catch(() => {
        needsHardReset = true
      })
    }

    await page.mouse.move(0, 0).catch(() => {
      needsHardReset = true
    })

    if (lastMouseAction === 'active') {
      await page.mouse.up().catch(() => {
        needsHardReset = true
      })
    }

    if (styleCleanup) {
      await styleCleanup().catch(() => {
        needsHardReset = true
      })
    }

    await page
      .evaluate(() => {
        const active = document.activeElement as HTMLElement
        if (active && active !== document.body) {
          active.blur()
        }

        window.scrollTo(0, 0)
      })
      .catch(() => {
        needsHardReset = true
      })
  }
}

// ── internal functions ───────────────────────────────────────────────

async function makePageReady({
  page,
  url = null,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
}: {
  page: Page
  url?: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
}) {
  if (url) {
    const targetUrl = createUrl(url, fullscreen, themeName)

    const resetStrategy = getPageResetStrategy({
      currentRetry,
      needsHardReset,
      targetUrl,
      currentNavigatedUrl,
    })

    if (resetStrategy === 'reload') {
      await hardResetPage({
        page,
        pageViewport,
        headers,
      })
    }

    if (resetStrategy === 'navigate') {
      await navigateToFreshPage({
        page,
        url,
        themeName,
        pageViewport,
        headers,
        fullscreen,
      })

      currentNavigatedUrl = targetUrl
      return
    }

    if (targetUrl !== currentNavigatedUrl) {
      await navigateToPage({
        page,
        url,
        themeName,
        pageViewport,
        headers,
        fullscreen,
      })
      currentNavigatedUrl = targetUrl

      await applyTestConfiguration(page)
      await addTestStylesheet(page)
      await waitForVisualStability(page)
    } else {
      // Same URL — just ensure viewport/headers are up to date
      await applyPageSettings(page, pageViewport, headers)
    }
  }
}

async function handleElement({
  page,
  selector = null,
  style = null,
  rootClassName = null,
  styleSelector = null,
}: {
  page: Page
  selector?: string
  style?: Record<string, string>
  rootClassName?: string | string[]
  styleSelector?: string
}) {
  const countSelectorElements = await page.evaluate(
    ({ selector }) => {
      const mainSelector = selector.match(
        /(data-visual-test="([^"]*)")/
      )?.[0]

      try {
        return document.querySelectorAll(
          mainSelector ? `[${mainSelector}]` : selector
        ).length
      } catch (e) {
        console.error(e)
      }

      return undefined
    },
    { selector }
  )

  if (countSelectorElements > 1) {
    throw new Error(
      `Ensure the selector '${selector}' exists only once! Found ${countSelectorElements}.`
    )
  } else if (isNaN(parseFloat(String(countSelectorElements)))) {
    log.warn(`Count not extract main selector from '${selector}'!`)
  }

  if (selector) {
    await page.waitForSelector(selector, { state: 'attached' })
  }

  let styleCleanup: (() => Promise<void>) | null = null

  if (style) {
    // Save original style so we can restore it after the screenshot
    const originalStyle = await page.$eval(
      styleSelector || selector,
      (node: Element) => node.getAttribute('style')
    )

    await page.$eval(
      styleSelector || selector,
      (node: Element, style: string) => {
        const existing = node.getAttribute('style')
        const merged = existing
          ? `${existing.replace(/;?\s*$/, '')}; ${style}`
          : style
        node.setAttribute('style', merged)
        return node
      },
      makeStyles(style)
    )

    // Schedule style restoration
    styleCleanup = async () => {
      await page.$eval(
        styleSelector || selector,
        (node: Element, origStyle: string | null) => {
          if (origStyle !== null) {
            node.setAttribute('style', origStyle)
          } else {
            node.removeAttribute('style')
          }
        },
        originalStyle
      )
    }
  }

  if (rootClassName || currentRootClassName) {
    await handleRootClassName({ page, rootClassName })
  }

  const element = await page.$(selector)
  return { element, styleCleanup }
}

async function handleRootClassName({
  page,
  rootClassName,
}: {
  page: Page
  rootClassName?: string | string[]
}) {
  if (currentRootClassName) {
    await page.evaluate(
      ({ rootClassName }: { rootClassName: string | string[] }) => {
        const elem = document.documentElement
        const classes = Array.isArray(rootClassName)
          ? rootClassName
          : [rootClassName]
        classes.forEach((className) => {
          if (elem.classList.contains(className)) {
            elem.classList.remove(className)
          }
        })
      },
      { rootClassName: currentRootClassName }
    )
    currentRootClassName = null
  }

  if (rootClassName) {
    await page.evaluate(
      ({ rootClassName }: { rootClassName: string | string[] }) => {
        const elem = document.documentElement
        const classes = Array.isArray(rootClassName)
          ? rootClassName
          : [rootClassName]
        classes.forEach((className) => {
          if (!elem.classList.contains(className)) {
            elem.classList.add(className)
          }
        })
      },
      { rootClassName }
    )
    currentRootClassName = rootClassName
  }
}

async function takeScreenshot({
  page,
  screenshotElement,
  screenshotTargetSelector,
  screenshotSelector,
  selector,
}: {
  page: Page
  screenshotElement: ElementHandle<Element>
  screenshotTargetSelector?: string
  screenshotSelector?: string
  selector?: string
}) {
  const targetSelector =
    screenshotSelector || screenshotTargetSelector || selector

  if (targetSelector) {
    await page.waitForSelector(targetSelector, { state: 'visible' })

    return await page.locator(targetSelector).first().screenshot()
  }

  // If the element was detached (e.g., by a React re-render),
  // re-fetch it using the original selector or wrapper id.
  const isAttached = await screenshotElement
    .evaluate((el) => el.isConnected)
    .catch(() => false)

  if (!isAttached) {
    const wrapperSelector =
      screenshotSelector || '[data-visual-test-wrapper]'
    await page
      .waitForSelector(wrapperSelector, {
        state: 'attached',
        timeout: 5000,
      })
      .catch(() => null)
    const refetched = await page.$(wrapperSelector)
    if (refetched) {
      screenshotElement = refetched
    }
  }

  return await screenshotElement.screenshot()
}

async function handleSimulation({
  page,
  element,
  simulate,
  simulateSelector = undefined,
}: {
  page: Page
  element: ElementHandle<Element>
  simulate: Simulate
  simulateSelector?: string
}) {
  if (simulateSelector) {
    await page.waitForSelector(simulateSelector, {
      state: 'attached',
      timeout: 5000,
    })
    element = await page.$(simulateSelector)
  }

  let delaySimulation = 0
  let lastMouseAction: ActionName = undefined

  if (simulate) {
    const simulations = Array.isArray(simulate) ? simulate : [simulate]
    for await (const simulation of simulations) {
      const simulate =
        typeof simulation === 'string'
          ? { action: simulation }
          : simulation

      let elementToSimulate = element

      if (simulate.selector) {
        await page.waitForSelector(simulate.selector, {
          state: 'attached',
          timeout: 5000,
        })
        elementToSimulate = await page.$(simulate.selector)
        await page.mouse.move(0, 0)
      }

      if (!elementToSimulate) {
        throw new Error(
          `Could not find element to simulate using selector: ${
            simulate.selector || simulateSelector || '[main selector]'
          }`
        )
      }

      if (simulate.action) {
        lastMouseAction = simulate.action

        switch (simulate.action) {
          case 'hover': {
            // Use dispatchEvent as fallback when the element is not
            // visible (e.g. inside a collapsed breadcrumb)
            try {
              await elementToSimulate.hover({ force: true })
            } catch {
              await elementToSimulate.evaluate((el) => {
                el.dispatchEvent(
                  new MouseEvent('mouseover', {
                    bubbles: true,
                    composed: true,
                  })
                )
              })
            }
            break
          }

          case 'click': {
            // Use native mouse click at element center to trigger
            // the full event sequence (mousedown → focus → mouseup → click).
            // Fall back to dispatchEvent when the element is not visible
            // (e.g. inside a collapsed container).
            try {
              await elementToSimulate.scrollIntoViewIfNeeded()
              const box = await elementToSimulate.boundingBox()
              if (box) {
                await page.mouse.click(
                  box.x + box.width / 2,
                  box.y + box.height / 2
                )
              } else {
                throw new Error('No bounding box')
              }
            } catch {
              await elementToSimulate.evaluate((el) => {
                const htmlEl = el as HTMLElement
                htmlEl.dispatchEvent(
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
            delaySimulation = isCI ? 200 : 100
            await elementToSimulate.click({ force: true })
            await page.keyboard.press('Tab')
            await elementToSimulate.focus()
            break
          }

          case 'active': {
            try {
              await elementToSimulate.hover({ force: true })
            } catch {
              await elementToSimulate.evaluate((el) => {
                el.dispatchEvent(
                  new MouseEvent('mouseover', {
                    bubbles: true,
                    composed: true,
                  })
                )
              })
            }
            await page.mouse.down()
            break
          }

          case 'focus': {
            await page.keyboard.press('Tab')
            await elementToSimulate.focus()
            break
          }
        }
      }

      if (simulate.keypress) {
        await page.keyboard.press(simulate.keypress)
      }
    }
  }

  return { delaySimulation, lastMouseAction }
}

async function wrapperCleanup({
  page,
  selector,
  withWrapper,
}: {
  page: Page
  selector: string
  withWrapper: boolean
}) {
  if (withWrapper) {
    await page.evaluate(
      ({ selector }) => {
        const element = document.querySelector(selector)
        const wrapperElement = element.closest(
          '[data-visual-test-wrapper]'
        )

        if (wrapperElement) {
          wrapperElement.replaceWith(
            ...Array.from(wrapperElement.childNodes)
          )
        }

        return wrapperElement
      },
      { selector }
    )
  }
}

async function handleWrapper({
  page,
  selector,
  wrapperStyle,
  withWrapper,
  element,
}: {
  page: Page
  selector: string
  wrapperStyle?: Record<string, string>
  withWrapper: boolean
  element: ElementHandle<Element>
}) {
  let wrapperId
  if (withWrapper) {
    wrapperId = makeUniqueId()

    const background = await page.evaluate(
      ({ selector }) => {
        const element = document.querySelector(selector)?.parentNode
        const backgroundColor = window
          .getComputedStyle(element as Element)
          ?.getPropertyValue('background-color')

        if (!element || backgroundColor === 'rgba(0, 0, 0, 0)') {
          return null
        }

        return backgroundColor
      },
      { selector }
    )

    const measuredWidth = await measureWrapperWidth({
      page,
      selector,
      wrapperStyle,
      background,
    })

    const initialBox = await getElementBox({ page, selector, element })
    const yDecimals = initialBox.y.toString().split('.')[1] || 0

    const style = makeStyles({
      background,
      top: `0.${yDecimals}px`,
      'min-width': measuredWidth ? `${Math.ceil(measuredWidth)}px` : null,
      height: `${Math.ceil(initialBox.height) + 32}px`,
      ...(wrapperStyle ? wrapperStyle : {}),
    })

    await page.$eval(
      selector,
      (element: Element, { id, style }: { id: string; style: string }) => {
        const attrValue = element.getAttribute('data-visual-test')

        const wrapperElement = document.createElement('div')
        wrapperElement.setAttribute('data-visual-test-id', id)
        wrapperElement.setAttribute('data-visual-test-wrapper', attrValue)

        element.parentNode.insertBefore(wrapperElement, element)
        wrapperElement.appendChild(element)

        wrapperElement.setAttribute('style', style)

        const elRec = element.getBoundingClientRect()
        const wrRec = wrapperElement.getBoundingClientRect()

        if (wrRec.top - elRec.top > 0) {
          throw new Error(
            `Top of element is ${
              wrRec.top - elRec.top
            }px above the screenshot area.`
          )
        }

        const overflowBottom = Math.ceil(elRec.bottom - wrRec.bottom)

        if (overflowBottom > 0) {
          wrapperElement.style.height = `${
            wrapperElement.getBoundingClientRect().height + overflowBottom
          }px`
        }

        return element
      },
      { id: wrapperId, style }
    )

    await page.waitForSelector(`[data-visual-test-id="${wrapperId}"]`)

    return {
      element: await page.$(`[data-visual-test-id="${wrapperId}"]`),
      screenshotTargetSelector: `[data-visual-test-id="${wrapperId}"]`,
    }
  }

  return {
    element,
    screenshotTargetSelector: selector,
  }
}

async function getElementBox({
  page,
  selector,
  element,
}: {
  page: Page
  selector: string
  element: ElementHandle<Element>
}) {
  const boundingBox = await element.boundingBox()

  if (boundingBox) {
    return boundingBox
  }

  return await page.$eval(selector, (element: Element) => {
    const { height, y } = element.getBoundingClientRect()

    return { height, y }
  })
}

async function measureWrapperWidth({
  page,
  selector,
  wrapperStyle,
  background,
}: {
  page: Page
  selector: string
  wrapperStyle?: Record<string, string>
  background: string | null
}) {
  if (wrapperStyle?.width || wrapperStyle?.['inline-size']) {
    return null
  }

  return await page.$eval(
    selector,
    (
      element: Element,
      {
        background,
        wrapperStyle,
      }: {
        background: string | null
        wrapperStyle?: Record<string, string>
      }
    ) => {
      const parentWidth =
        element.parentElement?.getBoundingClientRect().width ?? Infinity

      const probe = document.createElement('div')
      probe.setAttribute(
        'style',
        'position:absolute; left:-99999px; top:0; opacity:0; pointer-events:none; z-index:-1;'
      )

      const wrapperElement = document.createElement('div')
      wrapperElement.setAttribute(
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

      const clone = element.cloneNode(true) as Element
      wrapperElement.appendChild(clone)
      probe.appendChild(wrapperElement)
      element.parentNode.insertBefore(probe, element.nextSibling)

      const measuredWidth = wrapperElement.getBoundingClientRect().width

      probe.remove()

      return Math.min(measuredWidth, parentWidth)
    },
    { background, wrapperStyle }
  )
}

async function syncWrapperBounds({
  page,
  selector,
}: {
  page: Page
  selector: string
}) {
  await page.evaluate(
    ({ selector }) => {
      const element = document.querySelector(selector)
      const wrapperElement = element.closest('[data-visual-test-wrapper]')

      if (wrapperElement) {
        const wrapper = wrapperElement as HTMLElement
        const elementRect = element.getBoundingClientRect()
        const wrapperRect = wrapper.getBoundingClientRect()
        const overflowBottom = Math.ceil(
          elementRect.bottom - wrapperRect.bottom
        )

        if (overflowBottom > 0) {
          const currentHeight = parseFloat(wrapper.style.height || '0')
          wrapper.style.height = `${currentHeight + overflowBottom}px`
        }
      }
      return wrapperElement
    },
    { selector }
  )
}

// ── utilities ────────────────────────────────────────────────────────

const createUrl = (
  url: string,
  fullscreen = true,
  themeName: string | null = null
) => {
  const newURL = new URL(
    url,
    `http://${config.testScreenshotOnHost}:${config.testScreenshotOnPort}`
  )

  newURL.searchParams.append('data-visual-test', 'true')

  if (themeName) {
    newURL.searchParams.append('eufemia-theme', themeName)
  }

  if (fullscreen) {
    newURL.searchParams.append('fullscreen', 'true')
  }

  return newURL.toString()
}

const makeStyles = (style: Record<string, string>) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
