/**
 * Anonymous page-view tracking for the docs portal.
 *
 * The pathname and hash are sent, plus a short allow-list of query params that
 * drive portal rendering (see {@link buildTrackedPath}); any other query value,
 * such as a docs search term, is dropped. No identifiers, cookies or device
 * storage are used. Events are buffered in memory and flushed with `sendBeacon`
 * when the page is hidden or unloaded, or eagerly once the buffer reaches the
 * collector's batch limit, so navigation is never blocked and nothing is
 * retried across reloads. Consecutive views of the same path (e.g. a re-mount)
 * are recorded once.
 */

// The collector URL and the single on/off switch: tracking is OFF unless a
// build sets VITE_ANALYTICS_ENDPOINT. Prod sets the collector URL; locally use
// a .env.local to point at the dev logger (/collect) or the real collector on
// demand. Read per call so the environment is the only gate.
function endpoint(): string {
  return (
    (import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined) ?? ''
  )
}

// Labels the source environment (e.g. prod, dev) so a shared collector can
// keep environments apart. Read per call so it can be stubbed in tests.
function analyticsEnv(): string {
  return (
    (import.meta.env.VITE_ANALYTICS_ENV as string | undefined) ?? 'unknown'
  )
}

type PageViewEvent = { path: string; timestamp: string; env: string }

// Valueless portal flags that change how a page renders (fullscreen view, code
// focus mode). Only the key is kept, so a crafted value cannot smuggle free
// text into analytics.
const TRACKED_FLAG_PARAMS = new Set(['fullscreen', 'focusmode'])

// Portal params with a meaningful value (the active theme). Kept only when the
// value is a short lowercase token, so anything else is dropped.
const TRACKED_VALUE_PARAMS = new Set(['eufemia-theme'])
const SAFE_PARAM_VALUE = /^[a-z][a-z0-9-]{0,31}$/

/**
 * Build the path to record: the pathname, a short allow-list of portal query
 * params, and the hash. Flags are reduced to their key and value params are
 * kept only for a safe token; every other query param (e.g. a docs search
 * term) is dropped so no incidental data is stored.
 */
export function buildTrackedPath(location: {
  pathname: string
  search: string
  hash: string
}): string {
  const kept: string[] = []

  new URLSearchParams(location.search).forEach((value, key) => {
    if (TRACKED_FLAG_PARAMS.has(key)) {
      kept.push(key)
    } else if (
      TRACKED_VALUE_PARAMS.has(key) &&
      SAFE_PARAM_VALUE.test(value)
    ) {
      kept.push(`${key}=${value}`)
    }
  })

  const query = kept.length > 0 ? '?' + kept.join('&') : ''

  return location.pathname + query + location.hash
}

// Flush once the buffer reaches the collector's batch limit, so a long session
// cannot grow the buffer unbounded or exceed the sendBeacon payload cap.
const MAX_BUFFER = 50

const buffer: PageViewEvent[] = []
let flushRegistered = false
let lastTrackedPath: string | null = null

function canTrack(): boolean {
  return (
    endpoint() !== '' &&
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    typeof navigator.sendBeacon === 'function'
  )
}

function flush(): void {
  if (buffer.length === 0) {
    return
  }

  const events = buffer.splice(0, buffer.length)

  try {
    // text/plain keeps a cross-origin beacon a CORS simple request, so it is
    // delivered without a preflight (which sendBeacon cannot satisfy). The
    // collector parses the body as JSON regardless of content type.
    const blob = new Blob([JSON.stringify(events)], {
      type: 'text/plain',
    })
    navigator.sendBeacon(endpoint(), blob)
  } catch {
    // stop here
  }
}

function registerFlush(): void {
  if (flushRegistered) {
    return
  }
  flushRegistered = true

  // pagehide covers navigation and tab close; visibilitychange catches the
  // "switch away and never return" case, common on mobile.
  window.addEventListener('pagehide', flush)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flush()
    }
  })
}

/** Record a single anonymous page view for the given in-app path. */
export function trackPageView(path: string): void {
  if (!canTrack()) {
    return
  }

  // Skip an immediate repeat of the same path (a re-mount or dev StrictMode
  // double-invoke); a genuine navigation back to it later still counts.
  if (path === lastTrackedPath) {
    return
  }

  try {
    registerFlush()
    lastTrackedPath = path
    buffer.push({
      path,
      timestamp: new Date().toISOString(),
      env: analyticsEnv(),
    })

    if (buffer.length >= MAX_BUFFER) {
      flush()
    }
  } catch {
    // stop here
  }
}
