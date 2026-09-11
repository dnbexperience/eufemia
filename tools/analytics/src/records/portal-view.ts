/**
 * Portal page-view record: the anonymous "someone viewed this docs page" event.
 *
 * Single source of truth for the portal-view shape. The HTTP ingest handler
 * validates an untrusted request body with {@link validatePortalViews}; any
 * first-party producer that writes portal views builds the stored object with
 * {@link buildPortalViewRecord}. Each analytics data type gets its own sibling
 * module under `src/records/`, so its shape and validation live in one place.
 */

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

/** The component language the page was viewed in. */
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

/** The theme (brand) the page was viewed in. */
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

/** A single anonymous portal page view sent by the docs portal. */
export type PortalViewInput = {
  path: string
  timestamp?: string
  env?: string
  status?: PortalViewStatus
  locale?: PortalViewLocale
  theme?: PortalViewTheme
  colorScheme?: PortalViewColorScheme
}

/** The stored portal-view record (one row in the portal_views Glue table). */
export type PortalViewRecord = {
  path: string
  env: string
  timestamp: string
  status: PortalViewStatus
  locale: string
  theme: string
  colorScheme: string
  createdat: string
}

type ValidationFailure = { ok: false; errors: string[] }

export type PortalViewValidationResult =
  | { ok: true; value: PortalViewInput[] }
  | ValidationFailure

const MAX_BATCH = 50
const MAX_PATH_LENGTH = 2048

/** A short lowercase environment token, e.g. `prod`, `dev`. */
const ENV_PATTERN = /^[a-z][a-z0-9-]{0,31}$/

// Query params worth keeping because they change how the portal renders. Flags
// are stored key-only; value params only for a safe token. Everything else is
// dropped, so a docs search term can never be persisted.
const TRACKED_FLAG_PARAMS = new Set(['fullscreen', 'focusmode'])
const TRACKED_VALUE_PARAMS = new Set(['eufemia-theme'])
// Same shape as ENV_PATTERN by coincidence, not shared intent — keep separate.
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
 * True only for a canonical ISO 8601 UTC timestamp (the form produced by
 * `Date.prototype.toISOString`), rejecting the looser inputs `Date.parse`
 * would otherwise accept, such as `"2026"` or `"March 5"`.
 */
function isIsoTimestamp(value: string): boolean {
  const date = new Date(value)
  return !Number.isNaN(date.getTime()) && date.toISOString() === value
}

/**
 * Validate an untrusted ingest payload into a batch of portal views.
 *
 * Accepts either a single event object or an array of them. Portal views carry
 * no identifiers or personal data — only a `path` and an optional timestamp,
 * environment label, status, locale, theme and color scheme. Only the
 * allow-listed keys are
 * returned here,
 * and the path is minimised to a safe shape when the record is built (see
 * {@link buildPortalViewRecord} and {@link normalizeTrackedPath}), so nothing
 * incidental in the request can reach storage.
 */
export function validatePortalViews(
  input: unknown
): PortalViewValidationResult {
  const events = Array.isArray(input) ? input : [input]

  if (events.length === 0) {
    return { ok: false, errors: ['Body must contain at least one event'] }
  }

  if (events.length > MAX_BATCH) {
    return {
      ok: false,
      errors: [`A batch may contain at most ${MAX_BATCH} events`],
    }
  }

  const errors: string[] = []
  const value: PortalViewInput[] = []

  events.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const { path, timestamp, env, status, locale, theme, colorScheme } =
      event as Record<string, unknown>
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

    if (env !== undefined) {
      if (typeof env !== 'string' || !ENV_PATTERN.test(env)) {
        errors.push(
          `Event ${index}: "env" must be a short lowercase token`
        )
        valid = false
      }
    }

    if (status !== undefined) {
      if (
        typeof status !== 'string' ||
        !PORTAL_VIEW_STATUSES.includes(status as PortalViewStatus)
      ) {
        errors.push(
          `Event ${index}: "status" must be one of ${PORTAL_VIEW_STATUSES.join(
            ', '
          )}`
        )
        valid = false
      }
    }

    if (locale !== undefined) {
      if (
        typeof locale !== 'string' ||
        !PORTAL_VIEW_LOCALES.includes(locale as PortalViewLocale)
      ) {
        errors.push(
          `Event ${index}: "locale" must be one of ${PORTAL_VIEW_LOCALES.join(
            ', '
          )}`
        )
        valid = false
      }
    }

    if (theme !== undefined) {
      if (
        typeof theme !== 'string' ||
        !PORTAL_VIEW_THEMES.includes(theme as PortalViewTheme)
      ) {
        errors.push(
          `Event ${index}: "theme" must be one of ${PORTAL_VIEW_THEMES.join(
            ', '
          )}`
        )
        valid = false
      }
    }

    if (colorScheme !== undefined) {
      if (
        typeof colorScheme !== 'string' ||
        !PORTAL_VIEW_COLOR_SCHEMES.includes(
          colorScheme as PortalViewColorScheme
        )
      ) {
        errors.push(
          `Event ${index}: "colorScheme" must be one of ${PORTAL_VIEW_COLOR_SCHEMES.join(
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
        ...(typeof env === 'string' ? { env } : {}),
        ...(typeof status === 'string'
          ? { status: status as PortalViewStatus }
          : {}),
        ...(typeof locale === 'string'
          ? { locale: locale as PortalViewLocale }
          : {}),
        ...(typeof theme === 'string'
          ? { theme: theme as PortalViewTheme }
          : {}),
        ...(typeof colorScheme === 'string'
          ? { colorScheme: colorScheme as PortalViewColorScheme }
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
    colorScheme: input.colorScheme ?? 'unknown',
    createdat: createdAt,
  }
}
