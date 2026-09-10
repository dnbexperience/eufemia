/**
 * Portal page-view record: the anonymous "someone viewed this docs page" event.
 *
 * Single source of truth for the portal-view shape. The HTTP ingest handler
 * validates an untrusted request body with {@link validatePortalViews}; any
 * first-party producer that writes portal views builds the stored object with
 * {@link buildPortalViewRecord}. Each analytics data type gets its own sibling
 * module under `src/records/`, so its shape and validation live in one place.
 */

/** A single anonymous portal page view sent by the docs portal. */
export type PortalViewInput = {
  path: string
  timestamp?: string
  env?: string
}

/** The stored portal-view record (one row in the portal_views Glue table). */
export type PortalViewRecord = {
  path: string
  env: string
  timestamp: string
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

/**
 * True only for a canonical ISO 8601 UTC timestamp (the form produced by
 * `Date.prototype.toISOString`), rejecting the looser inputs `Date.parse`
 * would otherwise accept, such as `"2026"` or `"March 5"`.
 */
function isIsoTimestamp(value: string): boolean {
  const date = new Date(value)
  return !Number.isNaN(date.getTime()) && date.toISOString() === value
}

/** Drop the query string and fragment so no incidental data is stored. */
export function normalizePath(path: string): string {
  return path.split(/[?#]/)[0]
}

/**
 * Validate an untrusted ingest payload into a batch of portal views.
 *
 * Accepts either a single event object or an array of them. Portal views carry
 * no identifiers or personal data — only a `path` and an optional timestamp and
 * environment label. Only the allow-listed keys are returned, so nothing
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

    const { path, timestamp, env } = event as Record<string, unknown>
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

    if (valid) {
      value.push({
        path: path as string,
        ...(typeof timestamp === 'string' ? { timestamp } : {}),
        ...(typeof env === 'string' ? { env } : {}),
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
    path: normalizePath(input.path),
    env: input.env ?? 'unknown',
    timestamp: input.timestamp ?? createdAt,
    createdat: createdAt,
  }
}
