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

// Public ingest would keep any label in the never-expired rollups; smoketest marks test rows.
const KNOWN_ENVS: ReadonlySet<string> = new Set(['prod', 'smoketest'])

export function isKnownEnv(value: unknown): value is string {
  return typeof value === 'string' && KNOWN_ENVS.has(value)
}

const MAX_VERSION_LENGTH = 64

// Checks the shape, not that the release exists, so free text can't be stored
// in the version field.
const SEMVER_CORE = /^\d+\.\d+\.\d+$/
const SEMVER_IDENTIFIER = /^[0-9A-Za-z-]+$/

/**
 * True only for a semver-shaped string of at most 64 characters:
 * `major.minor.patch`, each a plain number, with optional dot-separated
 * pre-release (after `-`) and build (after `+`) identifiers. Splits on the
 * separators instead of using one regex with several optional quantified
 * groups, which would be ReDoS-prone.
 */
export function isSemver(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > MAX_VERSION_LENGTH) {
    return false
  }

  const buildSplit = value.split('+')
  if (buildSplit.length > 2) {
    return false
  }
  const [withoutBuild, build] = buildSplit
  if (
    build !== undefined &&
    !build.split('.').every((id) => SEMVER_IDENTIFIER.test(id))
  ) {
    return false
  }

  const preSplit = (withoutBuild ?? '').split('-')
  const core = preSplit[0] ?? ''
  const pre = preSplit.slice(1).join('-')

  if (!SEMVER_CORE.test(core)) {
    return false
  }

  return (
    pre === '' || pre.split('.').every((id) => SEMVER_IDENTIFIER.test(id))
  )
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
