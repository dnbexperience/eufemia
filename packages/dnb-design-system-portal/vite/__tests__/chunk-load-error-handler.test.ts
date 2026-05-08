import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  isChunkLoadError,
  setupChunkLoadErrorHandler,
} from '../client/chunk-load-error-handler'

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

    // The handler clears the flag on successful boot — simulate the
    // case where the second boot ALSO encounters a chunk error by
    // setting the flag again before dispatching.
    storage.set('eufemia-portal:chunk-error-reloaded', '1')

    dispatchRejection(new Error('Loading chunk 1 failed'))

    expect(reload).not.toHaveBeenCalled()
  })

  it('clears the reload flag when the new page boots successfully', () => {
    storage.set('eufemia-portal:chunk-error-reloaded', '1')

    cleanup = setupChunkLoadErrorHandler({
      storage: storageLike,
      reload,
    })

    expect(storage.has('eufemia-portal:chunk-error-reloaded')).toBe(false)
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

    expect(reload).toHaveBeenCalledTimes(1)
  })
})
