/**
 * Anonymous page-view tracking for the docs portal.
 *
 * The in-app path (pathname, query and hash) is sent; the collector minimises
 * it to a safe shape — dropping docs search terms and other incidental query
 * values — before storing, so nothing incidental is persisted. Each view also
 * carries its dimensions: the source environment, status, the active component
 * language (locale) and theme (brand), the resolved color scheme (light or
 * dark), how the visit arrived (referrer category on the first view, then
 * `internal` for later in-app navigations), and whether the view was reached
 * via the in-app search box. No identifiers or
 * cookies are used; the locale, theme and color scheme are read from the
 * portal's existing preferences, never written, so tracking creates no device
 * storage of its own. Only a coarse referrer category is derived — never the
 * referrer URL or host — so no browsing history is stored. Events are
 * buffered in memory and flushed with `sendBeacon` when the page is hidden or
 * unloaded, or eagerly once the buffer reaches the collector's batch limit, so
 * navigation is never blocked and nothing is retried across reloads.
 * Consecutive views of the same path (e.g. a re-mount) are recorded once.
 */

import { getTheme } from './shims/theme-handler'
import { supportedTranslationsKey } from '../../src/core/portalRuntimeUtils'

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
//
// locale/theme/color_scheme are emitted from the portal's own supported values.
// The collector coerces any unrecognised value to `unknown` (it no longer
// rejects the batch), so a drift between the two sides costs one dimension at
// most — but keep them in sync so real values aren't silently bucketed.

function analyticsLocale(): string {
  try {
    const stored = window.localStorage.getItem('locale')
    if (stored && supportedTranslationsKey.includes(stored)) {
      return stored
    }
  } catch {
    // stop here
  }
  return 'nb-NO'
}

function analyticsTheme(): string {
  return getTheme().brand
}

// The resolved color scheme the page was viewed in. `auto` and an unset
// preference are resolved through the system setting, matching how the theme
// handler applies the scheme, so the stored value is what the user actually saw.
function analyticsColorScheme(): ColorScheme {
  const scheme = getTheme().colorScheme
  if (scheme === 'light' || scheme === 'dark') {
    return scheme
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

// Exact referrer hosts (apex or `www.`) for the web-search engines we bucket as
// `search`. Matched exactly rather than by suffix so non-search subdomains
// (e.g. mail/docs/translate.google.com) are not miscounted as search. A
// cross-origin referrer is origin-only under the default Referrer-Policy, so
// only the host is ever inspected — never the path or query.
const SEARCH_ENGINE_HOSTS = [
  'google.com',
  'bing.com',
  'duckduckgo.com',
  'search.yahoo.com',
  'ecosia.org',
  'startpage.com',
  'search.brave.com',
]

function isSearchEngineHost(host: string): boolean {
  return SEARCH_ENGINE_HOSTS.some(
    (engine) => host === engine || host === `www.${engine}`
  )
}

// The category of the referrer that led to this document — a coarse label only,
// never the referrer URL or host. `direct` (no referrer), `internal` (same
// origin), `search` (a known search engine) or `external` (any other origin).
function analyticsReferrerCategory(): ReferrerCategory {
  const referrer = document.referrer
  if (!referrer) {
    return 'direct'
  }
  try {
    const url = new URL(referrer)
    if (url.origin === window.location.origin) {
      return 'internal'
    }
    return isSearchEngineHost(url.hostname) ? 'search' : 'external'
  } catch {
    return 'external'
  }
}

// `document.referrer` describes how the document was loaded, not each in-app
// navigation, so it stays fixed for the tab's life. Attribute it to the arrival
// view only; every later client-side navigation is `internal` by definition, so
// the category counts where a visit started rather than how much was read.
let arrivalReferrerRecorded = false

function referrerForView(): ReferrerCategory {
  if (arrivalReferrerRecorded) {
    return 'internal'
  }
  arrivalReferrerRecorded = true
  return analyticsReferrerCategory()
}

// Whether the next recorded view is being navigated to from the in-app search
// box, so it can be attributed to search rather than ordinary browsing. The
// search box sets this just before it navigates; the following view consumes it
// once. A fresh document load can never be reached this way, so the arrival
// view is always `no`.
let nextViewFromSearch = false

/** Mark the next recorded page view as reached via the in-app search box. */
export function markNextViewFromSearch(): void {
  nextViewFromSearch = true
}

function viaSearchForView(): ViaSearch {
  const fromSearch = nextViewFromSearch
  nextViewFromSearch = false
  return fromSearch ? 'yes' : 'no'
}

// How the portal classified the view: a normal page, an unknown path that fell
// through to the 404 page, or a render error caught by the error boundary.
export type PageViewStatus = 'ok' | 'not_found' | 'error'

type ColorScheme = 'light' | 'dark'

type ReferrerCategory = 'search' | 'internal' | 'direct' | 'external'

type ViaSearch = 'yes' | 'no'

type PageViewEvent = {
  path: string
  timestamp: string
  env: string
  status: PageViewStatus
  locale: string
  theme: string
  color_scheme: ColorScheme
  referrer: ReferrerCategory
  via_search: ViaSearch
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

  // Consume the search-navigation marker before the dedup check so it can never
  // leak onto a later, unrelated view (e.g. searching to the current path is
  // deduped and simply drops the signal with the skipped view).
  const viaSearch = viaSearchForView()

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
      color_scheme: analyticsColorScheme(),
      referrer: referrerForView(),
      via_search: viaSearch,
    })

    if (buffer.length >= MAX_BUFFER) {
      flush()
    }
  } catch {
    // stop here
  }
}
