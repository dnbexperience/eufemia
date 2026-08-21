/**
 * Anonymous page-view tracking for the docs portal.
 *
 * Only the pathname is sent (no query, hash, identifiers, cookies or device
 * storage). Events are buffered in memory and flushed with `sendBeacon` when
 * the page is hidden or unloaded, or eagerly once the buffer reaches the
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

/** Record a single anonymous page view for the given pathname. */
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
