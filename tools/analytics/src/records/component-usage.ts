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

import {
  isIsoTimestamp,
  isValidEnv,
  type ValidationResult,
} from './shared.js'

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

const MAX_BATCH = 5000
const MAX_FIELD_LENGTH = 256

function isNonEmptyBoundedString(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.length <= MAX_FIELD_LENGTH
  )
}

/**
 * Canonical component name for stable rollups. Mirrors the docs resolver's
 * lowercase convention (see the MCP usage track, #9344) and reduces a deep-path
 * import to its final segment, so different import spellings — `Button` vs the
 * deep path `@dnb/eufemia/components/Button` — collapse to one row when Athena
 * groups by component instead of fragmenting.
 */
export function normalizeComponentName(name: string): string {
  const segment = name.trim().split('/').filter(Boolean).pop() ?? ''

  return segment.toLowerCase()
}

/**
 * Validate a batch of component-usage facts from the trusted CI producer.
 *
 * Unlike the browser-facing portal-view ingest, this has no public endpoint, so
 * the check exists mainly as a shared runtime guard for the producer and its
 * tests.
 */
export function validateComponentUsage(
  body: unknown
): ValidationResult<ComponentUsageInput> {
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

    for (const field of ['app', 'component', 'version'] as const) {
      if (!isNonEmptyBoundedString(record[field])) {
        errors.push(
          `record ${index}: ${field} must be a non-empty string of at most ${MAX_FIELD_LENGTH} characters`
        )
      }
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
 * canonicalised; an unrecognised `env` degrades to `unknown` and a `timestamp`
 * that isn't in canonical ISO form degrades to the write time, so a drifted
 * producer value costs one dimension, not the row.
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
    timestamp: isIsoTimestamp(input.timestamp)
      ? input.timestamp
      : createdAt,
    created_at: createdAt,
  }
}
