/**
 * Recover once from failed Portal modules, including entry dependencies.
 * Inlined in the head so recovery works before the entry can execute.
 */

const RELOAD_FLAG = 'eufemia-portal:chunk-error-reloaded'

const CHUNK_ERROR_PATTERNS = [
  /Loading chunk [^\s]+ failed/i,
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
  /Unable to preload CSS/i,
]

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

type ChunkLoadErrorHandlerOptions = {
  storage?: StorageLike | null
  reload?: (resourceUrl?: string) => void
  onReload?: () => void
}

export async function reloadAfterResourceRetry(
  resourceUrl?: string,
  reload = () => window.location.reload()
) {
  if (resourceUrl) {
    // WebKit can retain a failed module preload across a reload.
    // Refresh that resource first, with a timeout for an unavailable host.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    try {
      const response = await fetch(resourceUrl, {
        cache: 'reload',
        signal: controller.signal,
      })
      await response.arrayBuffer()
    } catch {
      // The guarded reload also handles failed retries.
    } finally {
      clearTimeout(timeout)
    }
  }

  reload()
}

export function isChunkLoadError(reason: unknown): boolean {
  if (!reason) {
    return false
  }

  const errorName =
    typeof reason === 'object' && 'name' in reason
      ? String((reason as { name?: unknown }).name ?? '')
      : ''

  if (errorName === 'ChunkLoadError') {
    return true
  }

  const message =
    typeof reason === 'string'
      ? reason
      : typeof reason === 'object' && 'message' in reason
        ? String((reason as { message?: unknown }).message ?? '')
        : ''

  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(message))
}

export function setupChunkLoadErrorHandler({
  storage,
  reload = reloadAfterResourceRetry,
  onReload,
}: ChunkLoadErrorHandlerOptions = {}) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  let reloading = false

  const onReady = () => {
    if (reloading) {
      return
    }

    try {
      const reloadStorage =
        storage === undefined ? window.sessionStorage : storage
      reloadStorage?.removeItem(RELOAD_FLAG)
    } catch {
      // Storage may be unavailable.
    }
  }

  const reloadOnce = (resourceUrl?: string) => {
    if (reloading) {
      return
    }

    try {
      const reloadStorage =
        storage === undefined ? window.sessionStorage : storage
      if (!reloadStorage || reloadStorage.getItem(RELOAD_FLAG)) {
        return
      }
      reloadStorage.setItem(RELOAD_FLAG, '1')
    } catch {
      // Reload only when the guard can be persisted across page loads.
      return
    }

    reloading = true
    onReload?.()
    reload(resourceUrl)
  }

  const handleReason = (reason: unknown) => {
    if (isChunkLoadError(reason)) {
      reloadOnce()
    }
  }

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    handleReason(event.reason)
  }

  const onError = (event: ErrorEvent) => {
    const target = event.target
    const resourceUrl =
      target instanceof HTMLScriptElement && target.type === 'module'
        ? target.src
        : target instanceof HTMLLinkElement &&
            target.relList.contains('modulepreload')
          ? target.href
          : ''

    if (
      resourceUrl &&
      new URL(resourceUrl).origin === window.location.origin
    ) {
      reloadOnce(resourceUrl)
      return
    }

    handleReason(event.error ?? event.message)
  }

  const onPreloadError = (event: Event & { payload?: unknown }) => {
    handleReason(event.payload)
  }

  window.addEventListener('portal:ready', onReady)
  window.addEventListener('unhandledrejection', onUnhandledRejection)
  window.addEventListener('error', onError, true)
  window.addEventListener('vite:preloadError', onPreloadError)

  return () => {
    window.removeEventListener('portal:ready', onReady)
    window.removeEventListener('unhandledrejection', onUnhandledRejection)
    window.removeEventListener('error', onError, true)
    window.removeEventListener('vite:preloadError', onPreloadError)
  }
}
