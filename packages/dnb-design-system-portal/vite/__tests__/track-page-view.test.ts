import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { trackPageView, buildTrackedPath } from '../client/track-page-view'

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

describe('trackPageView', () => {
  let beacon: ReturnType<typeof vi.fn>

  beforeEach(() => {
    beacon = vi.fn().mockReturnValue(true)
    setBeacon(beacon)
    vi.stubEnv('VITE_ANALYTICS_ENDPOINT', '/collect')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    flush()
    vi.restoreAllMocks()
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

  it('keeps the pathname and hash', () => {
    expect(
      buildTrackedPath(location('/uilib/components/button', '', '#events'))
    ).toBe('/uilib/components/button#events')
  })

  it('keeps allow-listed portal query params', () => {
    expect(
      buildTrackedPath(location('/uilib/components/button', '?fullscreen'))
    ).toBe('/uilib/components/button?fullscreen')

    expect(buildTrackedPath(location('/', '?eufemia-theme=sbanken'))).toBe(
      '/?eufemia-theme=sbanken'
    )
  })

  it('drops query params that are not allow-listed', () => {
    expect(
      buildTrackedPath(location('/uilib', '?q=some+search+term'))
    ).toBe('/uilib')
  })

  it('keeps only the allow-listed params from a mixed query', () => {
    expect(
      buildTrackedPath(
        location('/uilib', '?q=secret&fullscreen&page=2', '#top')
      )
    ).toBe('/uilib?fullscreen#top')
  })

  it('reduces a flag to its key, dropping any crafted value', () => {
    expect(
      buildTrackedPath(location('/uilib', '?fullscreen=personal+data'))
    ).toBe('/uilib?fullscreen')
  })

  it('drops a value param whose value is not a safe token', () => {
    expect(
      buildTrackedPath(location('/', '?eufemia-theme=personal+data'))
    ).toBe('/')
  })

  it('does not match a param that merely ends with an allow-listed key', () => {
    expect(
      buildTrackedPath(location('/', '?x-eufemia-theme=sbanken'))
    ).toBe('/')
  })
})
