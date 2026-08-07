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
