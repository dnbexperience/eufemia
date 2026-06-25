import * as z from 'zod'
import { FormError } from './FormError'

export type ZodSchema = z.ZodTypeAny

// Re-export Zod so consumers can `import { z } from '@dnb/eufemia/extensions/forms'`
export { z }

// The built-in English locale error map, used as a last-resort fallback when
// no global error map is configured.
const enLocaleError = z.locales.en().localeError

// Representative inputs used to reproduce `invalid_type` default messages. Their
// text embeds the received type, derived from `issue.input` — a field Zod omits
// from finalized issues — so we retry the error map with these to match it.
const receivedSamples: unknown[] = [
  '',
  0,
  false,
  undefined,
  null,
  [],
  {},
  NaN,
  BigInt(0),
  Symbol('sample'),
]

function runZodErrorMap(
  errorMap: z.core.$ZodErrorMap | undefined,
  rawIssue: z.core.$ZodRawIssue
): string | undefined {
  if (!errorMap) {
    return undefined
  }
  try {
    const result = errorMap(rawIssue)
    return typeof result === 'string' ? result : result?.message
  } catch {
    return undefined // Ignore and let the caller try the next error map
  }
}

/**
 * Determine whether `issue.message` is a built-in Zod default, as opposed to a
 * user-provided custom message, by recomputing what Zod's active error-map
 * chain would produce for the issue and comparing it with the actual message.
 *
 * Check/schema-level custom messages (e.g. `z.string().min(2, 'My message')`)
 * are applied *after* this chain, so a recomputed default that differs from
 * `issue.message` reveals a custom message. This mirrors Zod's `finalizeIssue`
 * precedence (global `customError`, then `localeError`) and is locale-aware: a
 * localized default (e.g. via `z.config(z.locales.no())`) is still recognized
 * as a default instead of being misclassified as custom.
 */
function isZodDefaultMessage(issue: z.core.$ZodIssue): boolean {
  const { message: _message, ...rest } = issue
  const rawIssue = rest as z.core.$ZodRawIssue
  const config = z.core.config()
  const errorMaps = [config.customError, config.localeError, enLocaleError]

  for (const errorMap of errorMaps) {
    if (runZodErrorMap(errorMap, rawIssue) === issue.message) {
      return true
    }
  }

  // `invalid_type` messages embed the received type (from the dropped
  // `issue.input`), so retry with representative inputs to reproduce them.
  if (issue.code === 'invalid_type') {
    for (const errorMap of errorMaps) {
      for (const input of receivedSamples) {
        const sampleIssue = { ...rawIssue, input } as z.core.$ZodRawIssue
        if (runZodErrorMap(errorMap, sampleIssue) === issue.message) {
          return true
        }
      }
    }
  }

  return false
}

/**
 * Detect whether a Zod issue carries a user-provided custom message. Custom
 * messages are preserved as-is; built-in defaults are normalized/localized to
 * our own translation keys.
 */
function isLikelyCustomZodMessage(issue: z.core.$ZodIssue): boolean {
  const msg = issue?.message ?? ''
  if (typeof msg !== 'string' || msg.length === 0) {
    return false
  }

  return !isZodDefaultMessage(issue)
}

function normalizeZodIssueMessage(
  issue: z.core.$ZodIssue
): string | undefined {
  // Map common Zod issues to our translation keys, based on the structured
  // issue fields rather than the (potentially localized) message text.
  if (issue?.code === 'invalid_type' && issue.expected === 'int') {
    return 'NumberField.errorInteger'
  }

  // Non-finite numbers (NaN, Infinity, -Infinity) fail Zod's `z.number()`
  // type check with a confusing default message ("expected number, received
  // number"). Map these to a clear, translated message. Genuine wrong types
  // (string, boolean, etc.) don't set `received` to a number-like value, so
  // they keep Zod's regular type-error message.
  if (issue?.code === 'invalid_type' && issue.expected === 'number') {
    const received = (issue as { received?: unknown }).received
    if (
      received === 'NaN' ||
      received === 'Infinity' ||
      received === '-Infinity'
    ) {
      return 'NumberField.errorInvalidNumber'
    }
  }

  if (
    issue?.code === 'too_small' &&
    issue.origin === 'number' &&
    issue.inclusive === false
  ) {
    return 'NumberField.errorExclusiveMinimum'
  }
  if (
    issue?.code === 'too_big' &&
    issue.origin === 'number' &&
    issue.inclusive === false
  ) {
    return 'NumberField.errorExclusiveMaximum'
  }

  if (
    issue?.code === 'too_small' &&
    issue.origin === 'array' &&
    typeof issue.minimum === 'number'
  ) {
    return 'IterateArray.errorMinItems'
  }
  if (
    issue?.code === 'too_big' &&
    issue.origin === 'array' &&
    typeof issue.maximum === 'number'
  ) {
    return 'IterateArray.errorMaxItems'
  }

  if (typeof issue?.message === 'string') {
    if (issue.code === 'too_small' && typeof issue.minimum === 'number') {
      if (issue.origin === 'number') {
        return 'NumberField.errorMinimum'
      }
      if (issue.origin === 'string') {
        return 'StringField.errorMinLength'
      }
    }
    if (issue.code === 'too_big' && typeof issue.maximum === 'number') {
      if (issue.origin === 'number') {
        return 'NumberField.errorMaximum'
      }
      if (issue.origin === 'string') {
        return 'StringField.errorMaxLength'
      }
    }
  }

  if (issue?.code === 'not_multiple_of') {
    return 'NumberField.errorMultipleOf'
  }

  if (issue?.code === 'invalid_format' && issue.format === 'regex') {
    return 'Field.errorPattern'
  }

  return issue?.message
}

/**
 * Checks if a schema is a Zod schema by checking if it has the Zod-specific properties
 */
export function isZodSchema(schema: unknown): schema is ZodSchema {
  // Zod schemas have safeParse and parse functions
  return (
    !!schema &&
    (typeof (schema as ZodSchema)?.safeParse === 'function' ||
      typeof (schema as ZodSchema)?.parse === 'function')
  )
}

/**
 * Safely extracts message values from a Zod issue using proper type checking
 */
function getMessageValuesFromZodIssue(
  issue: z.core.$ZodIssue
): FormError['messageValues'] {
  // Prefer explicit message parameters provided by field validation
  // (e.g., pre-formatted and locale-aware values)
  const explicitParams = issue?.['messageValues']
  if (explicitParams && typeof explicitParams === 'object') {
    const messages = Object.fromEntries(
      Object.entries(explicitParams).map(([k, v]) => [k, String(v)])
    )
    return messages
  }

  // Provide sensible defaults for well-known issues
  const code = issue?.code
  if (!code) {
    return undefined // Stop here
  }
  const type = issue?.['origin']

  if (type === 'string') {
    if (code === 'too_small') {
      const min = issue.minimum
      if (typeof min === 'number') {
        return { minLength: String(min) }
      }
    }
    if (code === 'too_big') {
      const max = issue.maximum
      if (typeof max === 'number') {
        return { maxLength: String(max) }
      }
    }
    if (code === 'invalid_format' && issue.format === 'regex') {
      const pattern = issue.pattern
      if (typeof pattern === 'string') {
        return { pattern }
      }
    }
  }

  if (type === 'number') {
    if (code === 'too_small' && type === 'number') {
      const min = issue.minimum
      if (typeof min === 'number') {
        return { minimum: String(min) }
      }
    }
    if (code === 'too_big' && type === 'number') {
      const max = issue.maximum
      if (typeof max === 'number') {
        return { maximum: String(max) }
      }
    }
    if (code === 'not_multiple_of') {
      // Type guard: Zod's not_multiple_of issue may have multipleOf or multiple property
      const issueWithMultiple = issue as z.core.$ZodIssue & {
        multipleOf?: number
        multiple?: number
      }
      const multipleOf =
        issueWithMultiple.multipleOf ?? issueWithMultiple.multiple
      if (typeof multipleOf === 'number') {
        return { multipleOf: String(multipleOf) }
      }
      const fallbackMsg = String(issue?.message ?? '')
      const m = fallbackMsg.match(/multiple\s*of\s*([0-9]+(?:\.[0-9]+)?)/i)
      if (m && m[1]) {
        return { multipleOf: m[1] }
      }
    }
  }

  if (type === 'array') {
    if (code === 'too_small') {
      const min = issue.minimum
      if (typeof min === 'number') {
        return { minItems: String(min) }
      }
    }
    if (code === 'too_big') {
      const max = issue.maximum
      if (typeof max === 'number') {
        return { maxItems: String(max) }
      }
    }
  }

  return undefined
}

/**
 * Converts a ZodError to a single FormError
 */
export function zodErrorToFormError(zodError: z.ZodError): FormError {
  const issues = zodError.issues || []
  if (issues.length === 1) {
    const issue = issues[0]
    const normalizedMessage = normalizeZodIssueMessage(issue)
    const isCustom = isLikelyCustomZodMessage(issue)
    const messageValues = getMessageValuesFromZodIssue(issue)

    if (isCustom) {
      // Use the original custom message directly
      return new FormError(issue.message, {
        messageValues,
      })
    }

    // Use normalized translation key for defaults; fall back to original message
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      {
        messageValues,
      }
    )
  }

  // Multiple errors - create individual FormError objects for each issue
  // This matches the AJV pattern for handling multiple errors
  const errors = issues.map((issue) => {
    const normalizedMessage = normalizeZodIssueMessage(issue)
    const isCustom = isLikelyCustomZodMessage(issue)
    const messageValues = getMessageValuesFromZodIssue(issue)

    if (isCustom) {
      // Use the original custom message directly
      return new FormError(issue.message, { messageValues })
    }

    // Use normalized translation key for defaults; fall back to original message
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      { messageValues }
    )
  })

  return new FormError('Multiple errors', {
    errors,
  })
}

/**
 * Converts an array of Zod issues to a single FormError
 */
export function zodErrorsToOneFormError(
  zodIssues: z.core.$ZodIssue[]
): FormError {
  if (zodIssues.length === 1) {
    const issue = zodIssues[0]
    const normalizedMessage = normalizeZodIssueMessage(issue)
    const isCustom = isLikelyCustomZodMessage(issue)
    const messageValues = getMessageValuesFromZodIssue(issue)

    if (isCustom) {
      // Use the original custom message directly
      return new FormError(issue.message, { messageValues })
    }

    // Use normalized translation key for defaults; fall back to original message
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      { messageValues }
    )
  }

  // Multiple errors - create individual FormError objects for each issue
  // This matches the AJV pattern for handling multiple errors
  const errors = zodIssues.map((issue) => {
    const normalizedMessage = normalizeZodIssueMessage(issue)
    const isCustom = isLikelyCustomZodMessage(issue)
    const messageValues = getMessageValuesFromZodIssue(issue)

    if (isCustom) {
      // Use the custom message directly without error message injection
      return new FormError(issue.message, { messageValues })
    }

    // Use normalized translation key for defaults; fall back to original message
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      { messageValues }
    )
  })

  return new FormError('Multiple errors', {
    errors,
  })
}

/**
 * Converts an array of Zod issues to a record of path-mapped FormErrors
 */
export const zodErrorsToFormErrors = (
  issues?: z.core.$ZodIssue[] | null
): Record<string, FormError> => {
  return (issues ?? []).reduce(
    (acc, issue) => {
      const path = issue.path.length > 0 ? `/${issue.path.join('/')}` : '/'
      const normalizedMessage = normalizeZodIssueMessage(issue)
      const isCustom = isLikelyCustomZodMessage(issue)
      const messageValues = getMessageValuesFromZodIssue(issue)

      if (isCustom) {
        // Preserve custom message
        acc[path] = new FormError(issue.message, { messageValues })
      } else {
        // Use normalized translation key for defaults; fall back to original message
        acc[path] = new FormError(
          normalizedMessage ?? issue.message ?? 'Validation error',
          { messageValues, ajvKeyword: normalizedMessage ?? issue.message }
        )
      }

      return acc
    },
    {} as Record<string, FormError>
  )
}

/**
 * Creates a Zod validator function compatible with useFieldProps
 */
export function createZodValidator(schema: ZodSchema) {
  return (value: unknown): true | z.ZodError => {
    const result = schema.safeParse(value)
    if (result.success) {
      return true
    }
    return result.error
  }
}
