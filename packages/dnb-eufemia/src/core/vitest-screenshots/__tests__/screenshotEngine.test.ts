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

import { _testing } from '../commands/screenshotEngine'

const {
  buildUrl,
  sessions,
  browserSlots,
  sessionToSlot,
  getBrowserSlot,
  cleanupBrowserPool,
  resetPoolCleanedUp,
} = _testing

// ── helpers ──────────────────────────────────────────────────────────

const makeMockPage = (closed = false) => ({
  isClosed: vi.fn(() => closed),
  close: vi.fn(async () => undefined),
  addInitScript: vi.fn(async () => undefined),
  evaluate: vi.fn(async () => undefined),
  addStyleTag: vi.fn(async () => undefined),
})

const makeMockBrowser = () => ({
  close: vi.fn(async () => undefined),
})

const makeMockContext = () => ({
  newPage: vi.fn(async () => makeMockPage()),
})

// ── tests ────────────────────────────────────────────────────────────

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
