// @vitest-environment node

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

// Mock external dependencies that aren't available outside browser mode
vi.mock('@vitest/browser-playwright', () => ({
  defineBrowserCommand: vi.fn(
    <T extends unknown[]>(fn: (...args: T) => unknown) => fn
  ),
}))

vi.mock('@blazediff/core', () => ({
  default: vi.fn(() => 0),
}))

vi.mock('pngjs', () => ({
  PNG: class MockPNG {
    static sync = {
      read: vi.fn(() => ({
        width: 100,
        height: 100,
        data: Buffer.alloc(0),
      })),
      write: vi.fn(() => Buffer.alloc(0)),
    }
    width = 0
    height = 0
    data = Buffer.alloc(0)
    constructor({ width, height }: { width: number; height: number }) {
      this.width = width
      this.height = height
      this.data = Buffer.alloc(width * height * 4)
    }
  },
}))

vi.mock('../failures', () => ({
  recordFailure: vi.fn(),
  recordNavigation: vi.fn(),
}))

import blazediff from '@blazediff/core'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { PNG, type PNGWithMetadata } from 'pngjs'
import { _testing } from '../commands/screenshotEngine'

const {
  buildUrl,
  applyScreenshotColorScheme,
  diffAndPersist,
  sessions,
  browserSlots,
  sessionToSlot,
  getBrowserSlot,
  cleanupBrowserPool,
  resetPoolCleanedUp,
  takeScreenshot,
  hardResetPage,
  ensureSession,
} = _testing

// ── helpers ──────────────────────────────────────────────────────────

const makeMockPage = (closed = false) => ({
  isClosed: vi.fn(() => closed),
  close: vi.fn(async () => undefined),
  addInitScript: vi.fn(async () => undefined),
  evaluate: vi.fn(async () => undefined),
  addStyleTag: vi.fn(async () => undefined),
  goto: vi.fn(async () => undefined),
  reload: vi.fn(async () => undefined),
  setViewportSize: vi.fn(async () => undefined),
  setExtraHTTPHeaders: vi.fn(async () => undefined),
})

const makeMockBrowser = () => ({
  close: vi.fn(async () => undefined),
  isConnected: vi.fn(() => true),
  newContext: vi.fn(async () => makeMockContext()),
})

const makeMockContext = () => ({
  newPage: vi.fn(async () => makeMockPage()),
  close: vi.fn(async () => undefined),
})

// ── tests ────────────────────────────────────────────────────────────

describe('ensureSession', () => {
  beforeEach(() => {
    resetPoolCleanedUp()
  })

  afterEach(() => {
    browserSlots.length = 0
    sessionToSlot.clear()
    sessions.clear()
  })

  it.each(['newPage', 'addInitScript'] as const)(
    'does not reassign a starting session during %s',
    async (phase) => {
      const context = makeMockContext()
      const page = makeMockPage()
      const startingSlot = {
        browser: makeMockBrowser(),
        context,
        currentSessionId: null,
        busy: false,
      }
      const freeSlot = {
        browser: makeMockBrowser(),
        context: makeMockContext(),
        currentSessionId: null,
        busy: false,
      }
      browserSlots.push(startingSlot as never, freeSlot as never)
      let releaseStartup: () => void
      let notifyStarting: () => void
      const startup = new Promise<void>((resolve) => {
        releaseStartup = resolve
      })
      const starting = new Promise<void>((resolve) => {
        notifyStarting = resolve
      })
      context.newPage.mockImplementationOnce(async () => {
        if (phase === 'newPage') {
          notifyStarting()
          await startup
        }
        return page
      })
      if (phase === 'addInitScript') {
        page.addInitScript.mockImplementationOnce(async () => {
          notifyStarting()
          await startup
        })
      }

      const firstSession = ensureSession(
        'starting-session',
        makeMockPage() as never
      )
      await starting
      try {
        await ensureSession('other-session', makeMockPage() as never)

        expect(sessionToSlot.get('starting-session')).toBe(startingSlot)
        expect(sessionToSlot.get('other-session')).toBe(freeSlot)
        expect(context.close).not.toHaveBeenCalled()
      } finally {
        releaseStartup()
        await firstSession
      }
      expect(sessions.get('starting-session')?.page).toBe(page)
    }
  )

  it.each(['newPage', 'addInitScript'] as const)(
    'releases the startup reservation when %s fails',
    async (phase) => {
      const context = makeMockContext()
      if (phase === 'newPage') {
        context.newPage.mockRejectedValueOnce(new Error('page failed'))
      } else {
        const page = makeMockPage()
        page.addInitScript.mockRejectedValueOnce(new Error('page failed'))
        context.newPage.mockResolvedValueOnce(page)
      }
      const slot = {
        browser: makeMockBrowser(),
        context,
        currentSessionId: null,
        busy: false,
      }
      browserSlots.push(slot as never)

      await expect(
        ensureSession('failed-session', makeMockPage() as never)
      ).rejects.toThrow('page failed')
      await ensureSession('other-session', makeMockPage() as never)

      expect(sessionToSlot.get('other-session')).toBe(slot)
      expect(sessionToSlot.has('failed-session')).toBe(false)
      expect(context.close).toHaveBeenCalledOnce()
    }
  )
})

describe('hardResetPage', () => {
  afterEach(() => {
    browserSlots.length = 0
    sessionToSlot.clear()
    sessions.clear()
  })

  it('periodically replaces pages to release resources from repeated reloads', async () => {
    const context = makeMockContext()
    const previousPage = {
      ...makeMockPage(),
      context: () => context,
      url: () => 'http://localhost:8000/demos/?eufemia-theme=sbanken',
    }
    const state = {
      page: previousPage,
      vitestPage: makeMockPage(),
      navigatedUrl: previousPage.url(),
      mutationKind: 'structural',
      currentRootClassName: 'previous-test',
    }

    for (let reset = 0; reset < 5; reset++) {
      await hardResetPage(
        state as never,
        { width: 400, height: 600 },
        { 'User-Agent': 'visual-test' }
      )
      expect(state.page).toBe(previousPage)
    }
    expect(previousPage.reload).toHaveBeenCalledTimes(5)

    await hardResetPage(
      state as never,
      { width: 400, height: 600 },
      { 'User-Agent': 'visual-test' }
    )

    const page = await context.newPage.mock.results[0]?.value
    expect(previousPage.close).toHaveBeenCalledOnce()
    expect(previousPage.reload).toHaveBeenCalledTimes(5)
    expect(state.page).toBe(page)
    expect(page.addInitScript).toHaveBeenCalledTimes(2)
    expect(page.goto).toHaveBeenCalledWith(previousPage.url(), {
      waitUntil: 'load',
      timeout: 30000,
    })
    expect(page.setViewportSize).toHaveBeenCalledWith({
      width: 400,
      height: 600,
    })
    expect(page.setExtraHTTPHeaders).toHaveBeenCalledWith({
      'User-Agent': 'visual-test',
    })
    expect(state.currentRootClassName).toBeNull()
    expect(state.mutationKind).toBe('none')
  })

  it('keeps the active session reserved while another worker starts a file', async () => {
    const context = makeMockContext()
    const previousPage = {
      ...makeMockPage(),
      context: () => context,
      url: () => 'http://localhost:8000/demos/',
    }
    let whileClosingPage = async () => undefined
    previousPage.close.mockImplementation(async () => {
      previousPage.isClosed.mockReturnValue(true)
      await whileClosingPage()
    })
    const state = {
      page: previousPage,
      vitestPage: makeMockPage(),
      navigatedUrl: previousPage.url(),
      mutationKind: 'structural',
      currentRootClassName: null,
    }
    const activeSlot = {
      browser: makeMockBrowser(),
      context,
      currentSessionId: 'active-session',
      busy: false,
    }
    const freeSlot = {
      browser: makeMockBrowser(),
      context: makeMockContext(),
      currentSessionId: null,
      busy: false,
    }
    sessions.set('active-session', state as never)
    browserSlots.push(activeSlot as never, freeSlot as never)
    sessionToSlot.set('active-session', activeSlot as never)

    for (let reset = 0; reset < 5; reset++) {
      await hardResetPage(state as never, null, null)
    }

    const replacementPage = makeMockPage()
    let finishCreatingPage: (page: typeof replacementPage) => void
    let markCreatingPage: () => void
    const creatingPage = new Promise<void>((resolve) => {
      markCreatingPage = resolve
    })
    context.newPage.mockImplementationOnce(() => {
      markCreatingPage()
      return new Promise((resolve) => {
        finishCreatingPage = resolve
      })
    })
    const reset = hardResetPage(state as never, null, null)
    await creatingPage
    whileClosingPage = async () => {
      await ensureSession('third-session', makeMockPage() as never)
      expect(sessions.get('active-session')).toBe(state)
      expect(context.close).not.toHaveBeenCalled()
    }
    browserSlots.push({
      browser: makeMockBrowser(),
      context: makeMockContext(),
      currentSessionId: null,
      busy: false,
    } as never)

    try {
      await ensureSession('other-session', makeMockPage() as never)

      expect(sessions.get('active-session')).toBe(state)
      expect(sessionToSlot.get('active-session')).toBe(activeSlot)
      expect(sessionToSlot.get('other-session')).toBe(freeSlot)
      expect(context.close).not.toHaveBeenCalled()
    } finally {
      finishCreatingPage(replacementPage)
      await reset
    }

    expect(state.page).toBe(replacementPage)
    expect(previousPage.close).toHaveBeenCalledOnce()
  })
})

describe('takeScreenshot', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('aligns fractional scroll offsets before capturing inset borders', async () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('window', { scrollX: 12.5, scrollY: 12333.5, scrollTo })
    vi.stubGlobal('requestAnimationFrame', (callback) => callback())
    const screenshot = vi.fn(async () => {
      expect(scrollTo).toHaveBeenCalledWith({
        left: 12,
        top: 12333,
        behavior: 'instant',
      })
      return Buffer.from('screenshot')
    })
    const locator = {
      scrollIntoViewIfNeeded: vi.fn(async () => undefined),
      screenshot,
    }
    const page = {
      waitForSelector: vi.fn(async () => undefined),
      locator: vi.fn(() => ({ first: () => locator })),
      evaluate: vi.fn(async (callback) => {
        expect(locator.scrollIntoViewIfNeeded).toHaveBeenCalled()
        return callback()
      }),
    }

    expect(
      await takeScreenshot(
        page as never,
        null,
        '.wrapper',
        null,
        '.target'
      )
    ).toEqual(Buffer.from('screenshot'))
  })
})

describe('buildUrl', () => {
  it('creates a URL with data-visual-test param', () => {
    const url = buildUrl('/uilib/components/button/demos/', false)
    expect(url).toContain('data-visual-test=true')
    expect(url).toContain('localhost:8000')
    expect(url).toContain('/uilib/components/button/demos/')
  })

  it('adds fullscreen param when requested', () => {
    const url = buildUrl('/uilib/components/button/demos/', true)
    expect(url).toContain('fullscreen=true')
  })

  it('does not add fullscreen param when not requested', () => {
    const url = buildUrl('/uilib/components/button/demos/', false)
    expect(url).not.toContain('fullscreen')
  })

  it('adds eufemia-theme param when theme is provided', () => {
    const url = buildUrl('/demos/', false, 'sbanken')
    expect(url).toContain('eufemia-theme=sbanken')
  })

  it('omits eufemia-theme when theme is null', () => {
    const url = buildUrl('/demos/', false, null)
    expect(url).not.toContain('eufemia-theme')
  })

  it('omits eufemia-theme when theme is undefined', () => {
    const url = buildUrl('/demos/', false, undefined)
    expect(url).not.toContain('eufemia-theme')
  })

  it('adds eufemia-color-scheme param when color scheme is provided', () => {
    const url = buildUrl('/demos/', false, 'ui', 'dark')
    expect(url).toContain('eufemia-color-scheme=dark')
  })

  it('omits eufemia-color-scheme when color scheme is undefined', () => {
    const url = buildUrl('/demos/', false, 'ui', undefined)
    expect(url).not.toContain('eufemia-color-scheme')
  })
})

describe('applyScreenshotColorScheme', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('stores the requested color scheme while preserving the theme', () => {
    const storage = new Map([
      ['eufemia-theme', JSON.stringify({ name: 'sbanken' })],
    ])
    vi.stubGlobal('location', {
      search: '?eufemia-color-scheme=dark',
    })
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    })

    applyScreenshotColorScheme()

    expect(JSON.parse(storage.get('eufemia-theme') || '{}')).toEqual({
      name: 'sbanken',
      colorScheme: 'dark',
    })
  })

  it('removes a previous color scheme when none is requested', () => {
    const storage = new Map([
      [
        'eufemia-theme',
        JSON.stringify({ name: 'sbanken', colorScheme: 'dark' }),
      ],
    ])
    vi.stubGlobal('location', { search: '' })
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    })

    applyScreenshotColorScheme()

    expect(JSON.parse(storage.get('eufemia-theme') || '{}')).toEqual({
      name: 'sbanken',
    })
  })
})

describe('getBrowserSlot', () => {
  beforeEach(() => {
    browserSlots.length = 0
    sessionToSlot.clear()
    sessions.clear()
    resetPoolCleanedUp()
  })

  afterEach(async () => {
    // Prevent lingering state between tests
    browserSlots.length = 0
    sessionToSlot.clear()
    sessions.clear()
  })

  it('returns a cached slot for the same sessionId', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: 'session-1',
    }
    browserSlots.push(slot as never)
    sessionToSlot.set('session-1', slot as never)

    const result = await getBrowserSlot('session-1')
    expect(result).toBe(slot)
  })

  it('reuses a slot when its previous session vitest page is closed', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: 'old-session',
    }
    browserSlots.push(slot as never)
    sessionToSlot.set('old-session', slot as never)

    // Simulate an old session whose vitest page closed
    sessions.set('old-session', {
      page: makeMockPage(false),
      vitestPage: makeMockPage(true), // closed
      navigatedUrl: null,
      mutationKind: 'none',
      currentRootClassName: null,
    } as never)

    const result = await getBrowserSlot('new-session')
    expect(result).toBe(slot)
    expect(result.currentSessionId).toBe('new-session')
    expect(sessionToSlot.get('new-session')).toBe(slot)
    expect(sessions.has('old-session')).toBe(false)
  })

  it('reuses a slot when its previous session is missing', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: 'orphan-session',
    }
    browserSlots.push(slot as never)
    sessionToSlot.set('orphan-session', slot as never)

    // No session entry for 'orphan-session' in sessions map
    const result = await getBrowserSlot('new-session')
    expect(result).toBe(slot)
    expect(result.currentSessionId).toBe('new-session')
  })

  it.each([true, false])(
    'releases the previous context when recycling a slot (session exists: %s)',
    async (sessionExists) => {
      const browser = makeMockBrowser()
      const context = makeMockContext()
      const slot = {
        browser,
        context,
        currentSessionId: 'old-session',
        busy: false,
      }
      browserSlots.push(slot as never)
      sessionToSlot.set('old-session', slot as never)
      if (sessionExists) {
        sessions.set('old-session', {
          page: makeMockPage(false),
          vitestPage: makeMockPage(true),
        } as never)
      }

      await getBrowserSlot('new-session')

      expect(context.close).toHaveBeenCalledTimes(1)
      expect(browser.newContext).toHaveBeenCalledWith({
        viewport: { width: 1280, height: 2048 },
        ignoreHTTPSErrors: true,
      })
      expect(slot.context).not.toBe(context)
      expect(sessionToSlot.has('old-session')).toBe(false)
      expect(slot.busy).toBe(false)
    }
  )

  it('does not reassign a slot while its context is being replaced', async () => {
    const recyclingSlot = {
      browser: makeMockBrowser(),
      context: makeMockContext(),
      currentSessionId: 'old-session',
      busy: true,
    }
    const freeSlot = {
      browser: makeMockBrowser(),
      context: makeMockContext(),
      currentSessionId: null,
      busy: false,
    }
    browserSlots.push(recyclingSlot as never, freeSlot as never)

    expect(await getBrowserSlot('new-session')).toBe(freeSlot)
    expect(recyclingSlot.context.close).not.toHaveBeenCalled()
    expect(recyclingSlot.currentSessionId).toBe('old-session')
  })

  it('does not assign a new session when context replacement fails', async () => {
    const browser = makeMockBrowser()
    browser.newContext.mockRejectedValueOnce(new Error('context failed'))
    const slot = {
      browser,
      context: makeMockContext(),
      currentSessionId: 'old-session',
      busy: false,
    }
    browserSlots.push(slot as never)

    await expect(getBrowserSlot('new-session')).rejects.toThrow(
      'context failed'
    )

    expect(slot.busy).toBe(false)
    expect(sessionToSlot.has('new-session')).toBe(false)
    expect(slot.currentSessionId).toBe('old-session')
  })

  it('reuses a slot with no currentSessionId', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: null,
    }
    browserSlots.push(slot as never)

    const result = await getBrowserSlot('new-session')
    expect(result).toBe(slot)
    expect(result.currentSessionId).toBe('new-session')
  })

  it('closes the old screenshot page when recycling a slot', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: 'old-session',
    }
    browserSlots.push(slot as never)
    sessionToSlot.set('old-session', slot as never)

    const oldPage = makeMockPage(false) // not closed
    sessions.set('old-session', {
      page: oldPage,
      vitestPage: makeMockPage(true), // vitest page closed
      navigatedUrl: null,
      mutationKind: 'none',
      currentRootClassName: null,
    } as never)

    await getBrowserSlot('new-session')
    expect(oldPage.close).toHaveBeenCalledTimes(1)
  })

  it('does not close an already-closed screenshot page', async () => {
    const mockBrowser = makeMockBrowser()
    const mockContext = makeMockContext()
    const slot = {
      browser: mockBrowser,
      context: mockContext,
      currentSessionId: 'old-session',
    }
    browserSlots.push(slot as never)
    sessionToSlot.set('old-session', slot as never)

    const oldPage = makeMockPage(true) // already closed
    sessions.set('old-session', {
      page: oldPage,
      vitestPage: makeMockPage(true),
      navigatedUrl: null,
      mutationKind: 'none',
      currentRootClassName: null,
    } as never)

    await getBrowserSlot('new-session')
    expect(oldPage.close).not.toHaveBeenCalled()
  })
})

describe('cleanupBrowserPool', () => {
  beforeEach(() => {
    browserSlots.length = 0
    sessionToSlot.clear()
    sessions.clear()
    resetPoolCleanedUp()
  })

  it('closes all browsers and clears state', async () => {
    const browser1 = makeMockBrowser()
    const browser2 = makeMockBrowser()
    browserSlots.push(
      {
        browser: browser1,
        context: makeMockContext(),
        currentSessionId: 'a',
      } as never,
      {
        browser: browser2,
        context: makeMockContext(),
        currentSessionId: 'b',
      } as never
    )
    sessionToSlot.set('a', browserSlots[0])
    sessionToSlot.set('b', browserSlots[1])

    await cleanupBrowserPool()

    expect(browser1.close).toHaveBeenCalledTimes(1)
    expect(browser2.close).toHaveBeenCalledTimes(1)
    expect(browserSlots).toHaveLength(0)
    expect(sessionToSlot.size).toBe(0)
    expect(sessions.size).toBe(0)
  })

  it('is idempotent — second call is a no-op', async () => {
    const browser = makeMockBrowser()
    browserSlots.push({
      browser,
      context: makeMockContext(),
      currentSessionId: 'a',
    } as never)

    await cleanupBrowserPool()
    expect(browser.close).toHaveBeenCalledTimes(1)

    // Reset the mock call count, call again
    browser.close.mockClear()
    await cleanupBrowserPool()
    expect(browser.close).not.toHaveBeenCalled()
  })

  it('handles browser.close() errors gracefully', async () => {
    const browser = makeMockBrowser()
    browser.close.mockRejectedValue(new Error('already closed'))
    browserSlots.push({
      browser,
      context: makeMockContext(),
      currentSessionId: 'a',
    } as never)

    await expect(cleanupBrowserPool()).resolves.toBeUndefined()
  })
})

describe('diffAndPersist in update mode', () => {
  const makePayload = (
    snapshotPath: string,
    update: boolean,
    allowedMismatchedPixelRatio = 0
  ) =>
    ({
      snapshotPath,
      diffPath: `${snapshotPath}.diff.png`,
      actualPath: `${snapshotPath}.actual.png`,
      htmlDumpPath: `${snapshotPath}.html`,
      testFilePath: 'Button.screenshot.test.ts',
      fullName: 'Button looks the same',
      allowedMismatchedPixelRatio,
      update,
    }) as never

  let directory: string

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'screenshot-engine-'))
    vi.mocked(blazediff).mockReturnValue(0)
  })

  afterEach(async () => {
    await rm(directory, { recursive: true, force: true })
  })

  it('leaves the snapshot untouched when no pixels differ and the allowance is zero', async () => {
    const snapshotPath = join(directory, 'button.snap.png')
    await writeFile(snapshotPath, Buffer.from('reference'))

    const result = await diffAndPersist(
      makePayload(snapshotPath, true),
      Buffer.from('actual')
    )

    expect(result).toEqual({ status: 'match' })
    expect(await readFile(snapshotPath, 'utf-8')).toBe('reference')
  })

  it('writes the snapshot when one pixel differs and the allowance is zero', async () => {
    const snapshotPath = join(directory, 'button.snap.png')
    await writeFile(snapshotPath, Buffer.from('reference'))
    vi.mocked(blazediff).mockReturnValue(1)

    const result = await diffAndPersist(
      makePayload(snapshotPath, true),
      Buffer.from('actual')
    )

    expect(result).toEqual({ status: 'updated', snapshotPath })
    expect(await readFile(snapshotPath, 'utf-8')).toBe('actual')
  })

  it.each([
    { width: 101, height: 100 },
    { width: 100, height: 101 },
  ])(
    'writes the snapshot when its dimensions change to $width x $height',
    async ({ width, height }) => {
      const snapshotPath = join(directory, 'button.snap.png')
      await writeFile(snapshotPath, Buffer.from('reference'))
      vi.mocked(PNG.sync.read)
        .mockReturnValueOnce({
          width: 100,
          height: 100,
          data: Buffer.alloc(0),
        } as PNGWithMetadata)
        .mockReturnValueOnce({
          width,
          height,
          data: Buffer.alloc(0),
        } as PNGWithMetadata)

      const result = await diffAndPersist(
        makePayload(snapshotPath, true),
        Buffer.from('actual')
      )

      expect(result).toEqual({ status: 'updated', snapshotPath })
      expect(await readFile(snapshotPath, 'utf-8')).toBe('actual')
    }
  )

  it('leaves the snapshot untouched when the difference is below the threshold', async () => {
    const snapshotPath = join(directory, 'button.snap.png')
    await writeFile(snapshotPath, Buffer.from('reference'))

    // 50 of 10 000 pixels differ, which is 0.5% and below the 1% threshold
    vi.mocked(blazediff).mockReturnValue(50)

    const result = await diffAndPersist(
      makePayload(snapshotPath, true, 0.01),
      Buffer.from('actual')
    )

    expect(result).toEqual({ status: 'match' })
    expect(await readFile(snapshotPath, 'utf-8')).toBe('reference')
  })

  it('writes the snapshot when the difference is above the threshold', async () => {
    const snapshotPath = join(directory, 'button.snap.png')
    await writeFile(snapshotPath, Buffer.from('reference'))

    // 500 of 10 000 pixels differ, which is 5% and above the 1% threshold
    vi.mocked(blazediff).mockReturnValue(500)

    const result = await diffAndPersist(
      makePayload(snapshotPath, true, 0.01),
      Buffer.from('actual')
    )

    expect(result).toEqual({ status: 'updated', snapshotPath })
    expect(await readFile(snapshotPath, 'utf-8')).toBe('actual')
  })

  it('creates a snapshot that does not exist yet', async () => {
    const snapshotPath = join(directory, 'missing.snap.png')

    const result = await diffAndPersist(
      makePayload(snapshotPath, true),
      Buffer.from('actual')
    )

    expect(result).toEqual({ status: 'created', snapshotPath })
    expect(await readFile(snapshotPath, 'utf-8')).toBe('actual')
  })
})
