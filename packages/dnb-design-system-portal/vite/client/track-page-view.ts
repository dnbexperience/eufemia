/**
 * Anonymous page-view tracking for the docs portal.
 *
 * The in-app path (pathname, query and hash) is sent; the collector minimises
 * it to a safe shape — dropping docs search terms and other incidental query
 * values — before storing, so nothing incidental is persisted. Each view also
 * carries its dimensions: the source environment, status, and the active
 * component language (locale) and theme (brand). No identifiers or cookies are
 * used; the locale and theme are read from the portal's existing preferences,
 * never written, so tracking creates no device storage of its own. Events are
 * buffered in memory and flushed with `sendBeacon` when the page is hidden or
 * unloaded, or eagerly once the buffer reaches the collector's batch limit, so
 * navigation is never blocked and nothing is retried across reloads.
 * Consecutive views of the same path (e.g. a re-mount) are recorded once.
 */

import { getTheme } from './shims/theme-handler'

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

// The active component language and theme (brand) when the page was viewed —
// dimensions of the view, read fresh per call from the portal's existing
// preferences (never written) so the stored value matches what the user saw.
function analyticsLocale(): string {
  try {
    return window.localStorage.getItem('locale') || 'nb-NO'
  } catch {
    return 'nb-NO'
  }
}

function analyticsTheme(): string {
  return getTheme().brand
}

// How the portal classified the view: a normal page, an unknown path that fell
// through to the 404 page, or a render error caught by the error boundary.
export type PageViewStatus = 'ok' | 'not_found' | 'error'

type PageViewEvent = {
  path: string
  timestamp: string
  env: string
  status: PageViewStatus
  locale: string
  theme: string
}

/**
 * The in-app path to record for a location: its pathname, query and hash.
 *
 * Sent raw on purpose: minimisation is centralised in the collector's
 * `normalizeTrackedPath`, which drops search terms and other incidental query
 * values at ingest. Do not strip here — that would only duplicate, and risk
 * drifting from, the authoritative server-side allow-list.
 */
export function buildTrackedPath(location: {
  pathname: string
  search: string
  hash: string
}): string {
  return location.pathname + location.search + location.hash
}

// Flush once the buffer reaches the collector's batch limit, so a long session
// cannot grow the buffer unbounded or exceed the sendBeacon payload cap.
const MAX_BUFFER = 50

const buffer: PageViewEvent[] = []
let flushRegistered = false
let lastTrackedKey: string | null = null

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
export function trackPageView(
  path: string,
  status: PageViewStatus = 'ok'
): void {
  if (!canTrack()) {
    return
  }

  // Skip an immediate repeat of the same path and status (a re-mount or dev
  // StrictMode double-invoke); a genuine navigation back to it later still
  // counts, and a status change on the current path (e.g. a render error) is
  // always recorded.
  const key = `${status} ${path}`
  if (key === lastTrackedKey) {
    return
  }

  try {
    registerFlush()
    lastTrackedKey = key
    buffer.push({
      path,
      timestamp: new Date().toISOString(),
      env: analyticsEnv(),
      status,
      locale: analyticsLocale(),
      theme: analyticsTheme(),
    })

    if (buffer.length >= MAX_BUFFER) {
      flush()
    }
  } catch {
    // stop here
  }
}
