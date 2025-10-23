import * as z from 'zod/v4'
import { FormError } from './FormError'

export type ZodSchema = z.ZodTypeAny

// Common Zod default prefixes/messages we should NOT treat as custom
const defaultPatterns: RegExp[] = [
  /^Too small:/, // e.g. "Too small: expected number to be >= 5"
  /^Too big:/, // e.g. "Too big: expected number to be <= 5"
  /^Invalid input:/, // e.g. "Invalid input: expected int, received number"
  /^Invalid string:/, // e.g. "Invalid string: must match pattern ..."
  /^Invalid number: must be a multiple of/, // For .multipleOf()
]
/**
 * Zod doesn’t mark “custom vs default” on the issue; the only signal we have at runtime is the message text.
 *
 * Detect if a Zod issue.message is a user-provided custom message
 * versus Zod's built-in, English default messages. We preserve custom messages
 * and localize/normalize default ones to our translation keys.
 */
function isLikelyCustomZodMessage(issue: z.core.$ZodIssue): boolean {
  const msg = issue?.message ?? ''
  if (typeof msg !== 'string' || msg.length === 0) {
    return false
  }

  return !defaultPatterns.some((regex) => regex.test(msg))
}

function normalizeZodIssueMessage(
  issue: z.core.$ZodIssue
): string | undefined {
  // Map common Zod issue messages to our translation keys
  if (
    typeof issue?.message === 'string' &&
    /expected int/.test(issue.message)
  ) {
    return 'NumberField.errorInteger'
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
    return // Stop here
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
      const multipleOf =
        (issue as any)?.multipleOf ?? (issue as any)?.multiple
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
