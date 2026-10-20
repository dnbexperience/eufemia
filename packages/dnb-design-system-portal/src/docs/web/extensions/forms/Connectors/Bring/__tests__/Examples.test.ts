import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockFetch, resetMockFetch } from '../Examples'

describe('Connector.Bring example mock', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    vi.useRealTimers()
    resetMockFetch()
    globalThis.fetch = originalFetch
  })

  it('keeps the latest mocked response while requests overlap', async () => {
    vi.useFakeTimers()
    const fallbackFetch = vi.fn(async () => {
      return new Response('Not mocked')
    })
    globalThis.fetch = fallbackFetch

    const firstRequest = mockFetch('/first', { value: 'first' })
    await vi.advanceTimersByTimeAsync(1000)
    await firstRequest

    await vi.advanceTimersByTimeAsync(500)

    const secondData = { value: 'second' }
    const secondRequest = mockFetch('/second', secondData)

    await vi.advanceTimersByTimeAsync(1000)
    await secondRequest

    const response = await globalThis.fetch('/second')

    expect(await response.json()).toEqual(secondData)

    const fallbackResponse = await globalThis.fetch('/not-mocked', {
      headers: { Accept: 'application/json' },
    })

    expect(await fallbackResponse.text()).toBe('Not mocked')
    expect(fallbackFetch).toHaveBeenCalledWith('/not-mocked', {
      headers: { Accept: 'application/json' },
    })

    resetMockFetch()
    expect(globalThis.fetch).toBe(fallbackFetch)
  })
})
