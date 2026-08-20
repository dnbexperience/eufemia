/**
 * A generic, minimal analytics record.
 *
 * `createdAt` is set by the API when a record is stored, so callers only
 * need to provide `id`, `name` and `value`.
 */
export type AnalyticsRecord = {
  id: string
  name: string
  value: number
  createdAt: string
}

/** The client-provided part of an {@link AnalyticsRecord} (without `createdAt`). */
export type AnalyticsRecordInput = Omit<AnalyticsRecord, 'createdAt'>

export type ValidationSuccess = {
  ok: true
  value: AnalyticsRecordInput
}

export type ValidationFailure = {
  ok: false
  errors: string[]
}

export type ValidationResult = ValidationSuccess | ValidationFailure

/**
 * Validate an untrusted payload and narrow it to a {@link AnalyticsRecordInput}.
 *
 * Validation happens at the system boundary (the HTTP handler), so all
 * shapes are treated as untrusted here.
 */
export function validateRecordInput(input: unknown): ValidationResult {
  const errors: string[] = []

  if (
    typeof input !== 'object' ||
    input === null ||
    Array.isArray(input)
  ) {
    return { ok: false, errors: ['Body must be a JSON object'] }
  }

  const record = input as Record<string, unknown>

  const { id, name, value } = record

  if (typeof id !== 'string' || id.trim() === '') {
    errors.push('"id" must be a non-empty string')
  } else if (!/^(?=.*[A-Za-z0-9])[A-Za-z0-9._-]{1,128}$/.test(id)) {
    errors.push(
      '"id" must contain a letter or number and use only letters, numbers, ".", "_" and "-" (max 128 chars)'
    )
  }

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('"name" must be a non-empty string')
  } else if (name.length > 256) {
    errors.push('"name" must be at most 256 characters')
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    errors.push('"value" must be a finite number')
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      id: id as string,
      name: name as string,
      value: value as number,
    },
  }
}

/**
 * A single anonymous page-view event sent by the portal.
 *
 * `timestamp` is the client-side view time; it is optional so the simplest
 * caller can send just a `path` and let the API stamp the time on receipt.
 */
export type PageViewInput = {
  path: string
  timestamp?: string
}

export type PageViewValidationResult =
  | { ok: true; value: PageViewInput[] }
  | ValidationFailure

const MAX_PAGE_VIEW_BATCH = 50
const MAX_PATH_LENGTH = 2048

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
 * Validate an untrusted `/collect` payload into a batch of page views.
 *
 * Accepts either a single event object or an array of them. Page views carry
 * no identifiers or personal data — only a `path` and an optional timestamp.
 */
export function validatePageViewBatch(
  input: unknown
): PageViewValidationResult {
  const events = Array.isArray(input) ? input : [input]

  if (events.length === 0) {
    return { ok: false, errors: ['Body must contain at least one event'] }
  }

  if (events.length > MAX_PAGE_VIEW_BATCH) {
    return {
      ok: false,
      errors: [
        `A batch may contain at most ${MAX_PAGE_VIEW_BATCH} events`,
      ],
    }
  }

  const errors: string[] = []
  const value: PageViewInput[] = []

  events.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const { path, timestamp } = event as Record<string, unknown>
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

    if (valid) {
      value.push({
        path: path as string,
        ...(typeof timestamp === 'string' ? { timestamp } : {}),
      })
    }
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, value }
}
