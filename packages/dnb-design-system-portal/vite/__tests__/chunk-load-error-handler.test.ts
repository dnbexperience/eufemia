import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  isChunkLoadError,
  reloadAfterResourceRetry,
  setupChunkLoadErrorHandler,
} from '../client/chunk-load-error-handler'

describe('reloadAfterResourceRetry', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('refreshes a failed module resource before reloading', async () => {
    let resolveFetch: (response: Response) => void
    const fetchResource = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve
        })
    )
    vi.stubGlobal('fetch', fetchResource)
    const reload = vi.fn()

    const recovery = reloadAfterResourceRetry('/assets/layout.js', reload)

    expect(fetchResource).toHaveBeenCalledWith('/assets/layout.js', {
      cache: 'reload',
      signal: expect.any(AbortSignal),
    })
    expect(reload).not.toHaveBeenCalled()

    resolveFetch(new Response(''))
    await recovery

    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('reloads even when the resource retry fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const reload = vi.fn()

    await reloadAfterResourceRetry('/assets/layout.js', reload)

    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('bounds a stalled retry before reloading', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () =>
              reject(new Error('aborted'))
            )
          })
      )
    )
    const reload = vi.fn()

    const recovery = reloadAfterResourceRetry('/assets/layout.js', reload)
    await vi.advanceTimersByTimeAsync(3000)
    await recovery

    expect(reload).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('reloads directly when no resource URL is available', async () => {
    const fetchResource = vi.fn()
    vi.stubGlobal('fetch', fetchResource)
    const reload = vi.fn()

    await reloadAfterResourceRetry(undefined, reload)

    expect(fetchResource).not.toHaveBeenCalled()
    expect(reload).toHaveBeenCalledTimes(1)
  })
})

describe('isChunkLoadError', () => {
  it('matches errors with name ChunkLoadError', () => {
    const error = Object.assign(new Error('boom'), {
      name: 'ChunkLoadError',
    })
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('matches the webpack chunk load error message', () => {
    const error = new Error('Loading chunk 58333 failed.')
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('matches the Vite dynamic import error message', () => {
    const error = new Error(
      'Failed to fetch dynamically imported module: /assets/foo.js'
    )
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('matches the alternative Vite import error message', () => {
    const error = new Error('error loading dynamically imported module')
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('matches Safari "Importing a module script failed" wording', () => {
    const error = new Error('Importing a module script failed.')
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('matches "Unable to preload CSS" from Vite', () => {
    const error = new Error('Unable to preload CSS for /assets/foo.css')
    expect(isChunkLoadError(error)).toBe(true)
  })

  it('returns false for unrelated errors', () => {
    expect(isChunkLoadError(new Error('something else'))).toBe(false)
    expect(isChunkLoadError(null)).toBe(false)
    expect(isChunkLoadError(undefined)).toBe(false)
  })

  it('handles plain string reasons', () => {
    expect(isChunkLoadError('Loading chunk 1 failed')).toBe(true)
    expect(isChunkLoadError('totally fine')).toBe(false)
  })
})

describe('setupChunkLoadErrorHandler', () => {
  let storage: Map<string, string>
  let storageLike: {
    getItem: (key: string) => string | null
    setItem: (key: string, value: string) => void
    removeItem: (key: string) => void
  }
  let reload: () => void
  let cleanup: (() => void) | undefined

  beforeEach(() => {
    storage = new Map()
    storageLike = {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => {
        storage.set(key, value)
      },
      removeItem: (key) => {
        storage.delete(key)
      },
    }
    reload = vi.fn<() => void>()
  })

  afterEach(() => {
    cleanup?.()
    cleanup = undefined
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  function dispatchRejection(reason: unknown) {
    const event = new Event(
      'unhandledrejection'
    ) as unknown as PromiseRejectionEvent

    Object.defineProperty(event, 'reason', { value: reason })
    Object.defineProperty(event, 'promise', {
      value: Promise.resolve(),
    })
    window.dispatchEvent(event)
  }

  it('reloads the page when an unhandled rejection is a chunk load error', () => {
    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    dispatchRejection(new Error('Loading chunk 58333 failed.'))

    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('does not reload for unrelated errors', () => {
    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    dispatchRejection(new Error('totally unrelated'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('does not reload twice within the same session', () => {
    storage.set('eufemia-portal:chunk-error-reloaded', '1')

    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    dispatchRejection(new Error('Loading chunk 1 failed'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('clears the reload flag when the new page boots successfully', () => {
    storage.set('eufemia-portal:chunk-error-reloaded', '1')

    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    expect(storage.has('eufemia-portal:chunk-error-reloaded')).toBe(true)
    window.dispatchEvent(new Event('portal:ready'))

    expect(storage.has('eufemia-portal:chunk-error-reloaded')).toBe(false)
  })

  it('captures non-bubbling module script errors', () => {
    cleanup = setupChunkLoadErrorHandler({ storage: storageLike, reload })
    document.body.innerHTML =
      '<script type="module" src="/assets/entry.js"></script>'

    document.body.firstElementChild.dispatchEvent(new Event('error'))

    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('does not reload for a speculative preload error', () => {
    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })
    document.body.innerHTML =
      '<link rel="modulepreload" href="/assets/layout.js">'

    document.body.firstElementChild.dispatchEvent(new Event('error'))
    expect(reload).not.toHaveBeenCalled()
  })

  it('refreshes the failed preload when the entry module also fails', () => {
    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })
    document.body.innerHTML =
      '<link rel="modulepreload" href="/assets/layout.js">'

    document.body.firstElementChild.dispatchEvent(new Event('error'))
    const failedPreload = document.body
      .firstElementChild as HTMLLinkElement
    const script = document.createElement('script')
    script.type = 'module'
    script.src = '/assets/entry.js'
    document.body.appendChild(script)
    script.dispatchEvent(new Event('error'))

    expect(reload).toHaveBeenCalledTimes(1)
    expect(reload).toHaveBeenCalledWith(failedPreload.href)
  })

  it.each([
    '<img src="/missing.png">',
    '<script src="/analytics.js"></script>',
    '<script type="module" src="https://example.com/analytics.js"></script>',
    '<link rel="stylesheet" href="/missing.css">',
  ])('ignores unrelated resource errors for %s', (html) => {
    cleanup = setupChunkLoadErrorHandler({ storage: storageLike, reload })
    document.body.innerHTML = html

    document.body.firstElementChild.dispatchEvent(new Event('error'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('handles Vite preload errors even when the import rejection is caught', () => {
    cleanup = setupChunkLoadErrorHandler({ storage: storageLike, reload })
    const event = new Event('vite:preloadError', { cancelable: true })
    Object.defineProperty(event, 'payload', {
      value: new Error('Failed to fetch dynamically imported module'),
    })

    window.dispatchEvent(event)
    expect(reload).toHaveBeenCalledTimes(1)
    dispatchRejection(
      new Error('Failed to fetch dynamically imported module')
    )

    expect(reload).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(false)
  })

  it('does not treat unrelated Vite preload errors as network failures', () => {
    cleanup = setupChunkLoadErrorHandler({ storage: storageLike, reload })
    const event = new Event('vite:preloadError')
    Object.defineProperty(event, 'payload', {
      value: new Error('Render failed'),
    })

    window.dispatchEvent(event)

    expect(reload).not.toHaveBeenCalled()
  })

  it('reacts to window error events with a chunk load error', () => {
    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    const errorEvent = new ErrorEvent('error', {
      error: new Error('Failed to fetch dynamically imported module'),
      message: 'Failed to fetch dynamically imported module',
    })

    window.dispatchEvent(errorEvent)

    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('removes its listeners on cleanup', () => {
    const dispose = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    dispose()

    dispatchRejection(new Error('Loading chunk 1 failed'))
    const event = new Event('vite:preloadError')
    Object.defineProperty(event, 'payload', {
      value: new Error('Failed to fetch dynamically imported module'),
    })
    window.dispatchEvent(event)
    document.body.innerHTML =
      '<script type="module" src="/assets/entry.js"></script>'
    document.body.firstElementChild.dispatchEvent(new Event('error'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('survives storage that throws on access', () => {
    const throwingStorage = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
      removeItem: () => {
        throw new Error('blocked')
      },
    }

    cleanup = setupChunkLoadErrorHandler({
      storage: throwingStorage,
      reload,
    })

    expect(() =>
      dispatchRejection(new Error('Loading chunk 1 failed'))
    ).not.toThrow()

    expect(reload).not.toHaveBeenCalled()
  })

  it('survives a throwing sessionStorage getter without reloading', () => {
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
      throw new Error('blocked')
    })

    expect(() => {
      cleanup = setupChunkLoadErrorHandler({ reload })
    }).not.toThrow()
    dispatchRejection(new Error('Loading chunk 1 failed'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('does not clear the guard while a recovery reload is pending', () => {
    cleanup = setupChunkLoadErrorHandler({ storage: storageLike, reload })
    dispatchRejection(new Error('Loading chunk 1 failed'))

    window.dispatchEvent(new Event('portal:ready'))

    expect(storage.get('eufemia-portal:chunk-error-reloaded')).toBe('1')
  })

  it('does not reload without persistent storage', () => {
    cleanup = setupChunkLoadErrorHandler({ storage: null, reload })

    dispatchRejection(new Error('Loading chunk 1 failed'))

    expect(reload).not.toHaveBeenCalled()
  })
})
