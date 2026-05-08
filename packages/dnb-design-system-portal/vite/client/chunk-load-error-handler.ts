/**
 * Recover from stale dynamic imports after a deploy.
 *
 * When the production build is updated, returning users may still have
 * the previous app shell in memory (or restored from Firefox's bfcache
 * on a soft reload). Their cached JS will then try to `import()` a
 * chunk URL that no longer exists, throwing `ChunkLoadError` or
 * `Failed to fetch dynamically imported module`.
 *
 * To rescue these users we listen for those specific errors and force
 * a single hard reload. A sessionStorage flag prevents reload loops in
 * the unlikely case the error keeps reproducing on the fresh page.
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
  reload?: () => void
  onReload?: () => void
}

export function isChunkLoadError(reason: unknown): boolean {
  if (!reason) {
    return false
  }

  const errorName =
    typeof reason === 'object' && reason !== null && 'name' in reason
      ? String((reason as { name?: unknown }).name ?? '')
      : ''

  if (errorName === 'ChunkLoadError') {
    return true
  }

  const message =
    typeof reason === 'string'
      ? reason
      : typeof reason === 'object' &&
          reason !== null &&
          'message' in reason
        ? String((reason as { message?: unknown }).message ?? '')
        : ''

  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(message))
}

export function setupChunkLoadErrorHandler({
  storage = typeof sessionStorage !== 'undefined' ? sessionStorage : null,
  reload = () => window.location.reload(),
  onReload,
}: ChunkLoadErrorHandlerOptions = {}) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const safeGet = (key: string) => {
    try {
      return storage?.getItem(key) ?? null
    } catch {
      return null
    }
  }

  const safeSet = (key: string, value: string) => {
    try {
      storage?.setItem(key, value)
    } catch {
      // Ignore storage write errors (private mode, quota, etc.)
    }
  }

  const safeRemove = (key: string) => {
    try {
      storage?.removeItem(key)
    } catch {
      // Ignore
    }
  }

  // Clear the flag once the new page has booted successfully so a
  // future stale-cache event can recover again.
  safeRemove(RELOAD_FLAG)

  const handleReason = (reason: unknown) => {
    if (!isChunkLoadError(reason)) {
      return
    }

    if (safeGet(RELOAD_FLAG)) {
      // Already reloaded once for this kind of error in this session —
      // do not loop. Let the user see the actual error.
      return
    }

    safeSet(RELOAD_FLAG, '1')
    onReload?.()
    reload()
  }

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    handleReason(event.reason)
  }

  const onError = (event: ErrorEvent) => {
    handleReason(event.error ?? event.message)
  }

  window.addEventListener('unhandledrejection', onUnhandledRejection)
  window.addEventListener('error', onError)

  return () => {
    window.removeEventListener('unhandledrejection', onUnhandledRejection)
    window.removeEventListener('error', onError)
  }
}
