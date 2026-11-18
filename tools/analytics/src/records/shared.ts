export type ValidationResult<T> =
  | { ok: true; value: T[] }
  | { ok: false; errors: string[] }

// Largest batch the HTTP ingest routes accept in one request.
const MAX_INGEST_BATCH = 50

export function parseIngestBatch(
  input: unknown
): ValidationResult<unknown> {
  const events = Array.isArray(input) ? input : [input]

  if (events.length === 0) {
    return { ok: false, errors: ['Body must contain at least one event'] }
  }

  if (events.length > MAX_INGEST_BATCH) {
    return {
      ok: false,
      errors: [`A batch may contain at most ${MAX_INGEST_BATCH} events`],
    }
  }

  return { ok: true, value: events }
}

// Public ingest would store any label for good; smoke labels mark manual test rows.
const KNOWN_ENVS: ReadonlySet<string> = new Set([
  'prod',
  'smoketest',
  'localsmoke',
])

export function isKnownEnv(value: unknown): value is string {
  return typeof value === 'string' && KNOWN_ENVS.has(value)
}

/**
 * True only for a canonical ISO 8601 UTC timestamp (the form produced by
 * `Date.prototype.toISOString`), rejecting the looser inputs `Date.parse`
 * would otherwise accept, such as `"2026"` or `"March 5"`.
 */
export function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false
  }

  const date = new Date(value)
  return !Number.isNaN(date.getTime()) && date.toISOString() === value
}
