import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { trackPageView } from '../client/track-page-view'

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
