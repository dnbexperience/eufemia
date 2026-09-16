import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { buildTrackedPath } from '../client/track-page-view'

function setBeacon(fn: unknown) {
  Object.defineProperty(navigator, 'sendBeacon', {
    value: fn,
    configurable: true,
    writable: true,
  })
}

function flush() {
  window.dispatchEvent(new Event('pagehide'))
}

function setReferrer(value: string) {
  Object.defineProperty(document, 'referrer', {
    value,
    configurable: true,
  })
}

describe('trackPageView', () => {
  let beacon: ReturnType<typeof vi.fn>
  let trackPageView: typeof import('../client/track-page-view').trackPageView
  let markNextViewFromSearch: typeof import('../client/track-page-view').markNextViewFromSearch

  beforeEach(async () => {
    // Re-import so the module-level dedup and buffer start fresh each test.
    vi.resetModules()
    ;({ trackPageView, markNextViewFromSearch } =
      await import('../client/track-page-view'))
    beacon = vi.fn().mockReturnValue(true)
    setBeacon(beacon)
    vi.stubEnv('VITE_ANALYTICS_ENDPOINT', '/collect')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    flush()
    vi.restoreAllMocks()
    window.localStorage.clear()
    delete (window as { matchMedia?: unknown }).matchMedia
    setReferrer('')
  })

  it('sends nothing when the endpoint is empty', () => {
    vi.stubEnv('VITE_ANALYTICS_ENDPOINT', '')

    trackPageView('/uilib/components/button')
    flush()

    expect(beacon).not.toHaveBeenCalled()
  })

  it('ships dark by default when no endpoint is configured', () => {
    vi.unstubAllEnvs()

    trackPageView('/dark')
    flush()

    expect(beacon).not.toHaveBeenCalled()
  })

  it('buffers and sends the pathname', async () => {
    trackPageView('/uilib/components/button')
    flush()

    expect(beacon).toHaveBeenCalledTimes(1)

    const [url, blob] = beacon.mock.calls[0]
    expect(url).toBe('/collect')
    expect((blob as Blob).type).toBe('text/plain')

    const payload = JSON.parse(await (blob as Blob).text())
    expect(payload).toHaveLength(1)
    expect(payload[0].path).toBe('/uilib/components/button')
    expect(payload[0]).toHaveProperty('timestamp')
    expect(payload[0].env).toBe('unknown')
    expect(payload[0].status).toBe('ok')
    expect(payload[0]).not.toHaveProperty('id')
  })

  it('labels events with VITE_ANALYTICS_ENV', async () => {
    vi.stubEnv('VITE_ANALYTICS_ENV', 'prod')

    trackPageView('/env-check')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].env).toBe('prod')
  })

  it('records the active locale and theme, defaulting to the portal defaults', async () => {
    trackPageView('/defaults')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].locale).toBe('nb-NO')
    expect(payload[0].theme).toBe('ui')
    expect(payload[0].color_scheme).toBe('light')
    expect(payload[0].referrer).toBe('direct')
    expect(payload[0].via_search).toBe('no')
  })

  it('records the selected locale and theme', async () => {
    window.localStorage.setItem('locale', 'sv-SE')
    window.localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'sbanken' })
    )

    trackPageView('/selected')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].locale).toBe('sv-SE')
    expect(payload[0].theme).toBe('sbanken')
  })

  it('falls back to the default locale when the stored value is malformed', async () => {
    window.localStorage.setItem('locale', 'garbage')

    trackPageView('/bad-locale')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].locale).toBe('nb-NO')
  })

  it('falls back to the default locale when the stored value is unsupported', async () => {
    window.localStorage.setItem('locale', 'de-DE')

    trackPageView('/unsupported-locale')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].locale).toBe('nb-NO')
  })

  it('records the selected color scheme', async () => {
    window.localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
    )

    trackPageView('/dark-scheme')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].color_scheme).toBe('dark')
  })

  it('resolves an "auto" color scheme via the system setting', async () => {
    window.localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'auto' })
    )
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: true }),
      configurable: true,
      writable: true,
    })

    trackPageView('/auto-scheme')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].color_scheme).toBe('dark')
  })

  it('categorises an empty referrer as "direct"', async () => {
    setReferrer('')

    trackPageView('/direct')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].referrer).toBe('direct')
  })

  it('categorises a same-origin referrer as "internal"', async () => {
    setReferrer(`${window.location.origin}/uilib/components/button`)

    trackPageView('/internal')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].referrer).toBe('internal')
  })

  it('categorises a search-engine referrer as "search"', async () => {
    for (const origin of [
      'https://www.google.com',
      'https://duckduckgo.com',
      'https://search.yahoo.com',
    ]) {
      vi.resetModules()
      ;({ trackPageView } = await import('../client/track-page-view'))
      beacon = vi.fn().mockReturnValue(true)
      setBeacon(beacon)
      setReferrer(`${origin}/`)

      trackPageView('/from-search')
      flush()

      const payload = JSON.parse(
        await (beacon.mock.calls[0][1] as Blob).text()
      )
      expect(payload[0].referrer).toBe('search')
    }
  })

  it('categorises any other cross-origin referrer as "external"', async () => {
    setReferrer('https://example.com/some/article')

    trackPageView('/from-external')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].referrer).toBe('external')
  })

  it('does not treat non-search engine subdomains as "search"', async () => {
    setReferrer('https://mail.google.com/mail/u/0/')

    trackPageView('/from-gmail')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].referrer).toBe('external')
  })

  it('attributes the referrer to the arrival only, then "internal"', async () => {
    setReferrer('https://www.google.com/')

    trackPageView('/from-search')
    trackPageView('/second-page')
    trackPageView('/third-page')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(
      payload.map((event: { referrer: string }) => event.referrer)
    ).toEqual(['search', 'internal', 'internal'])
  })

  it('marks a view reached via the search box as via_search "yes"', async () => {
    markNextViewFromSearch()
    trackPageView('/search-result')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload[0].via_search).toBe('yes')
  })

  it('only attributes the search marker to the next recorded view', async () => {
    markNextViewFromSearch()
    trackPageView('/search-result')
    trackPageView('/next-page')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(
      payload.map((event: { via_search: string }) => event.via_search)
    ).toEqual(['yes', 'no'])
  })

  it('does not leak the search marker past a deduped view', async () => {
    trackPageView('/a')
    markNextViewFromSearch()
    trackPageView('/a')
    trackPageView('/b')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(
      payload.map(
        (event: { path: string; via_search: string }) =>
          `${event.path} ${event.via_search}`
      )
    ).toEqual(['/a no', '/b no'])
  })

  it('flushes multiple buffered views in a single beacon', async () => {
    trackPageView('/a')
    trackPageView('/b')
    flush()

    expect(beacon).toHaveBeenCalledTimes(1)

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload.map((event: { path: string }) => event.path)).toEqual([
      '/a',
      '/b',
    ])
  })

  it('records an immediate repeat of the same path only once', async () => {
    trackPageView('/dup')
    trackPageView('/dup')
    flush()

    expect(beacon).toHaveBeenCalledTimes(1)

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload.map((event: { path: string }) => event.path)).toEqual([
      '/dup',
    ])
  })

  it('records a path again when a different path came in between', async () => {
    trackPageView('/x')
    trackPageView('/y')
    trackPageView('/x')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(payload.map((event: { path: string }) => event.path)).toEqual([
      '/x',
      '/y',
      '/x',
    ])
  })

  it('records the status of a view', async () => {
    trackPageView('/missing', 'not_found')
    trackPageView('/boom', 'error')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(
      payload.map(
        (event: { path: string; status: string }) =>
          `${event.status} ${event.path}`
      )
    ).toEqual(['not_found /missing', 'error /boom'])
  })

  it('records the same path again when only the status changes', async () => {
    trackPageView('/page', 'ok')
    trackPageView('/page', 'error')
    flush()

    const payload = JSON.parse(
      await (beacon.mock.calls[0][1] as Blob).text()
    )
    expect(
      payload.map((event: { status: string }) => event.status)
    ).toEqual(['ok', 'error'])
  })

  it('does not throw when sendBeacon is unavailable', () => {
    setBeacon(undefined)

    expect(() => trackPageView('/a')).not.toThrow()
  })

  it('flushes eagerly once the buffer reaches the batch limit', () => {
    for (let i = 0; i < 50; i++) {
      trackPageView(`/page-${i}`)
    }

    expect(beacon).toHaveBeenCalledTimes(1)

    trackPageView('/after')
    flush()

    expect(beacon).toHaveBeenCalledTimes(2)
  })
})

describe('buildTrackedPath', () => {
  const location = (pathname: string, search = '', hash = '') => ({
    pathname,
    search,
    hash,
  })

  it('returns the full in-app path (pathname, query and hash)', () => {
    expect(
      buildTrackedPath(
        location('/uilib/components/button', '?fullscreen', '#events')
      )
    ).toBe('/uilib/components/button?fullscreen#events')
  })

  it('sends the raw query as-is; the collector minimises it on ingest', () => {
    expect(
      buildTrackedPath(location('/uilib', '?q=some+search+term'))
    ).toBe('/uilib?q=some+search+term')
  })
})
