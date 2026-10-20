/**
 * Portal page-view record: the anonymous "someone viewed this docs page" event.
 *
 * Single source of truth for the portal-view shape. The HTTP ingest handler
 * validates an untrusted request body with {@link validatePortalViews}; any
 * first-party producer that writes portal views builds the stored object with
 * {@link buildPortalViewRecord}. Each analytics data type gets its own sibling
 * module under `src/records/`, so its shape and validation live in one place.
 */

import {
  isIsoTimestamp,
  isValidEnv,
  parseIngestBatch,
  type ValidationResult,
} from './shared.js'

/**
 * How the portal classified the view: a normal page, an unknown path that fell
 * through to the 404 page, or a render error caught by the error boundary.
 */
export type PortalViewStatus = 'ok' | 'not_found' | 'error'

const PORTAL_VIEW_STATUSES: readonly PortalViewStatus[] = [
  'ok',
  'not_found',
  'error',
]

/**
 * The component language the page was viewed in.
 *
 * Keep in sync with the portal's supported locales (`supportedTranslationsKey`
 * in packages/dnb-design-system-portal/src/core/portalRuntimeUtils.ts), which
 * gates what the client sends. If that set grows without this one, the new
 * value is stored as `unknown` here rather than dropping the batch, so a
 * drift costs only this one dimension.
 */
export type PortalViewLocale =
  | 'nb-NO'
  | 'en-GB'
  | 'sv-SE'
  | 'da-DK'
  | 'en-US'

const PORTAL_VIEW_LOCALES: readonly PortalViewLocale[] = [
  'nb-NO',
  'en-GB',
  'sv-SE',
  'da-DK',
  'en-US',
]

/**
 * The theme (brand) the page was viewed in.
 *
 * Keep in sync with the portal's theme brands (`availableThemes` in
 * packages/dnb-design-system-portal/vite/client/shims/theme-handler.ts). A brand
 * this list omits is stored as `unknown` rather than rejected, so a drift costs
 * only this one dimension, not the batch.
 */
export type PortalViewTheme = 'ui' | 'sbanken' | 'eiendom' | 'carnegie'

const PORTAL_VIEW_THEMES: readonly PortalViewTheme[] = [
  'ui',
  'sbanken',
  'eiendom',
  'carnegie',
]

/** The resolved color scheme the page was viewed in. */
export type PortalViewColorScheme = 'light' | 'dark'

const PORTAL_VIEW_COLOR_SCHEMES: readonly PortalViewColorScheme[] = [
  'light',
  'dark',
]

/** The category of referrer that led to the view — a coarse label, not a URL. */
export type PortalViewReferrer =
  | 'search'
  | 'internal'
  | 'direct'
  | 'external'

const PORTAL_VIEW_REFERRERS: readonly PortalViewReferrer[] = [
  'search',
  'internal',
  'direct',
  'external',
]

/** Whether the view was reached via the in-app search box. */
export type PortalViewViaSearch = 'yes' | 'no'

const PORTAL_VIEW_VIA_SEARCH: readonly PortalViewViaSearch[] = [
  'yes',
  'no',
]

/** A single anonymous portal page view sent by the docs portal. */
export type PortalViewInput = {
  path: string
  timestamp?: string
  env?: string
  status?: PortalViewStatus
  locale?: PortalViewLocale
  theme?: PortalViewTheme
  color_scheme?: PortalViewColorScheme
  referrer?: PortalViewReferrer
  via_search?: PortalViewViaSearch
}

/** The stored portal-view record (one row in the portal_views Glue table). */
export type PortalViewRecord = {
  path: string
  env: string
  timestamp: string
  status: PortalViewStatus
  locale: string
  theme: string
  color_scheme: string
  referrer: string
  via_search: string
  created_at: string
}

const MAX_PATH_LENGTH = 2048

function isOneOf<T extends string>(
  values: readonly T[],
  value: unknown
): value is T {
  return typeof value === 'string' && values.includes(value as T)
}

// Query params worth keeping because they change how the portal renders. Flags
// are stored key-only; value params only for a safe token. Everything else is
// dropped, so a docs search term can never be persisted.
const TRACKED_FLAG_PARAMS = new Set(['fullscreen', 'focusmode'])
const TRACKED_VALUE_PARAMS = new Set(['eufemia-theme'])
// Same shape as the env pattern in shared.ts by coincidence; keep separate.
const SAFE_PARAM_VALUE = /^[a-z][a-z0-9-]{0,31}$/
// An anchor fragment is a slug, e.g. `#events`; anything else is dropped.
const SAFE_FRAGMENT = /^#[\w-]+$/

/**
 * Reduce a raw in-app path to a safe shape for storage: the pathname, an
 * allow-list of render params (flags key-only, theme only for a safe token, in
 * canonical order) and an anchor-shaped fragment. Everything else — notably a
 * docs search term — is dropped, so no free text can be persisted even if a
 * caller sends it straight to the edge-locked route.
 */
export function normalizeTrackedPath(path: string): string {
  const hashAt = path.indexOf('#')
  const fragment = hashAt >= 0 ? path.slice(hashAt) : ''
  const beforeHash = hashAt >= 0 ? path.slice(0, hashAt) : path

  const queryAt = beforeHash.indexOf('?')
  const pathname = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash
  const search = queryAt >= 0 ? beforeHash.slice(queryAt + 1) : ''

  const kept: string[] = []
  new URLSearchParams(search).forEach((value, key) => {
    if (TRACKED_FLAG_PARAMS.has(key)) {
      kept.push(key)
    } else if (
      TRACKED_VALUE_PARAMS.has(key) &&
      SAFE_PARAM_VALUE.test(value)
    ) {
      kept.push(`${key}=${value}`)
    }
  })
  kept.sort()

  const query = kept.length > 0 ? '?' + kept.join('&') : ''
  const safeFragment = SAFE_FRAGMENT.test(fragment) ? fragment : ''

  return pathname + query + safeFragment
}

/**
 * Validate an untrusted ingest payload (one event or an array) into a batch of
 * portal views. Only allow-listed keys are returned, so nothing incidental in
 * the request can reach storage.
 */
export function validatePortalViews(
  input: unknown
): ValidationResult<PortalViewInput> {
  const batch = parseIngestBatch(input)
  if (!batch.ok) {
    return batch
  }

  const errors: string[] = []
  const value: PortalViewInput[] = []

  batch.value.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const {
      path,
      timestamp,
      env,
      status,
      locale,
      theme,
      color_scheme: colorScheme,
      referrer,
      via_search: viaSearch,
    } = event as Record<string, unknown>
    let valid = true

    if (typeof path !== 'string' || !path.startsWith('/')) {
      errors.push(
        `Event ${index}: "path" must be a string starting with "/"`
      )
      valid = false
    } else if (path.length > MAX_PATH_LENGTH) {
      errors.push(
        `Event ${index}: "path" must be at most ${MAX_PATH_LENGTH} characters`
      )
      valid = false
    }

    if (timestamp !== undefined) {
      if (typeof timestamp !== 'string' || !isIsoTimestamp(timestamp)) {
        errors.push(
          `Event ${index}: "timestamp" must be an ISO date string`
        )
        valid = false
      }
    }

    if (status !== undefined) {
      if (!isOneOf(PORTAL_VIEW_STATUSES, status)) {
        errors.push(
          `Event ${index}: "status" must be one of ${PORTAL_VIEW_STATUSES.join(
            ', '
          )}`
        )
        valid = false
      }
    }

    if (valid) {
      value.push({
        path: path as string,
        ...(typeof timestamp === 'string' ? { timestamp } : {}),
        ...(isValidEnv(env) ? { env } : {}),
        ...(typeof status === 'string'
          ? { status: status as PortalViewStatus }
          : {}),
        // An unrecognised dimension is dropped here (built as `unknown`), so a
        // stale or drifted value costs one dimension, not the view.
        ...(isOneOf(PORTAL_VIEW_LOCALES, locale) ? { locale } : {}),
        ...(isOneOf(PORTAL_VIEW_THEMES, theme) ? { theme } : {}),
        ...(isOneOf(PORTAL_VIEW_COLOR_SCHEMES, colorScheme)
          ? { color_scheme: colorScheme }
          : {}),
        ...(isOneOf(PORTAL_VIEW_REFERRERS, referrer) ? { referrer } : {}),
        ...(isOneOf(PORTAL_VIEW_VIA_SEARCH, viaSearch)
          ? { via_search: viaSearch }
          : {}),
      })
    }
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, value }
}

/**
 * Build the stored record from a validated input. Used by every producer so the
 * on-disk shape is identical regardless of how the event was ingested. The
 * `type` is implied by the portal_views table, so it is not stored.
 */
export function buildPortalViewRecord(
  input: PortalViewInput,
  createdAt: string
): PortalViewRecord {
  return {
    path: normalizeTrackedPath(input.path),
    env: input.env ?? 'unknown',
    timestamp: input.timestamp ?? createdAt,
    status: input.status ?? 'ok',
    locale: input.locale ?? 'unknown',
    theme: input.theme ?? 'unknown',
    color_scheme: input.color_scheme ?? 'unknown',
    referrer: input.referrer ?? 'unknown',
    via_search: input.via_search ?? 'unknown',
    created_at: createdAt,
  }
}
