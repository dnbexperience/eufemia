/**
 * Component-usage record: an anonymous "app X bundles Eufemia component Y at
 * version Z" fact, emitted at build time by the Nucleus bundler plugin.
 *
 * Single source of truth for the component-usage shape. There is no HTTP ingest
 * for this type — a trusted first-party CI producer writes rows to S3 directly
 * via an OIDC-scoped role, and calls {@link buildComponentUsageRecord} right
 * before PutObject so the stored shape stays in one place. Each analytics data
 * type gets its own sibling module under `src/records/`.
 *
 * SCAFFOLD: the exact dimensions are not finalised (tracked in EDS-843); this is
 * the minimal viable shape (app + component + version + env). It is safe to
 * evolve while there is no producer and no stored data.
 */

/** A single anonymous component-usage fact emitted by the bundler plugin. */
export type ComponentUsageInput = {
  /** The consuming application name, e.g. `sbanken-nettbank`. */
  app: string
  /** The Eufemia component that was bundled, e.g. `Button`. */
  component: string
  /** The resolved `@dnb/eufemia` version the app bundled, e.g. `10.72.0`. */
  version: string
  env?: string
  timestamp?: string
}

/** The stored component-usage record (one row in the component_usage table). */
export type ComponentUsageRecord = {
  app: string
  component: string
  version: string
  env: string
  timestamp: string
  created_at: string
}

type ValidationFailure = { ok: false; errors: string[] }

export type ComponentUsageValidationResult =
  | { ok: true; value: ComponentUsageInput[] }
  | ValidationFailure

const MAX_BATCH = 5000
const MAX_FIELD_LENGTH = 256

/** A short lowercase environment token, e.g. `prod`, `dev`. */
const ENV_PATTERN = /^[a-z][a-z0-9-]{0,31}$/

function isNonEmptyString(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.length <= MAX_FIELD_LENGTH
  )
}

function isValidEnv(value: unknown): value is string {
  return typeof value === 'string' && ENV_PATTERN.test(value)
}

// A clean ISO-8601 instant, e.g. `2026-09-16T12:00:00.000Z`. Validated with a
// parse plus a tiny date-time shape check (no unbounded quantifiers) so the
// stored `timestamp` column stays queryable rather than holding a free-form
// string, and to reject values Date.parse would loosely accept (e.g. a bare
// `2026-09-16` or `yesterday`).
function isValidTimestamp(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /\dT\d\d:\d\d:\d\d/.test(value) &&
    !Number.isNaN(Date.parse(value))
  )
}

/**
 * Canonical component name for stable rollups. Mirrors the docs resolver's
 * lowercase convention (see the MCP usage track, #9344) so different import
 * spellings — `Button` vs the deep path `@dnb/eufemia/components/Button` — never
 * fragment into separate rows when Athena groups by component.
 */
export function normalizeComponentName(name: string): string {
  return name.trim().toLowerCase()
}

/**
 * Validate a batch of component-usage facts from the trusted CI producer.
 *
 * Unlike the browser-facing portal-view ingest, this has no public endpoint, so
 * the check exists mainly as a shared runtime guard for the producer and its
 * tests. Structural problems (missing app/component/version) reject the row; an
 * unrecognised optional `env` is dropped by {@link buildComponentUsageRecord}
 * rather than failing the batch.
 */
export function validateComponentUsage(
  body: unknown
): ComponentUsageValidationResult {
  if (!Array.isArray(body)) {
    return { ok: false, errors: ['body must be an array of records'] }
  }

  if (body.length === 0) {
    return { ok: false, errors: ['body must contain at least one record'] }
  }

  if (body.length > MAX_BATCH) {
    return {
      ok: false,
      errors: [`body must not exceed ${MAX_BATCH} records`],
    }
  }

  const errors: string[] = []
  const value: ComponentUsageInput[] = []

  body.forEach((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      errors.push(`record ${index} must be an object`)

      return
    }

    const record = entry as Record<string, unknown>

    if (!isNonEmptyString(record.app)) {
      errors.push(`record ${index}: app must be a non-empty string`)
    }

    if (!isNonEmptyString(record.component)) {
      errors.push(`record ${index}: component must be a non-empty string`)
    }

    if (!isNonEmptyString(record.version)) {
      errors.push(`record ${index}: version must be a non-empty string`)
    }

    if (errors.length > 0) {
      return
    }

    value.push({
      app: record.app as string,
      component: record.component as string,
      version: record.version as string,
      env: isValidEnv(record.env) ? record.env : undefined,
      timestamp:
        typeof record.timestamp === 'string'
          ? record.timestamp
          : undefined,
    })
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, value }
}

/**
 * Build the stored record from one validated fact. Component names are
 * canonicalised; an unrecognised `env` degrades to `unknown` and a non-ISO
 * `timestamp` degrades to the write time, so a drifted producer value costs one
 * dimension, not the row.
 */
export function buildComponentUsageRecord(
  input: ComponentUsageInput,
  now: Date = new Date()
): ComponentUsageRecord {
  const createdAt = now.toISOString()

  return {
    app: input.app.trim(),
    component: normalizeComponentName(input.component),
    version: input.version.trim(),
    env: isValidEnv(input.env) ? input.env : 'unknown',
    timestamp: isValidTimestamp(input.timestamp)
      ? input.timestamp
      : createdAt,
    created_at: createdAt,
  }
}
