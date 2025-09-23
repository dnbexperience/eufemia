import * as z from 'zod'
import { FormError } from './FormError'

export type ZodSchema = z.ZodTypeAny

function normalizeZodIssueMessage(
  issue: z.core.$ZodIssue
): string | undefined {
  const msg = issue.message
  if (typeof msg === 'string' && /expected\s*int/i.test(msg)) {
    // Use a translation key; actual text is resolved by prepareError
    return 'NumberField.errorInteger'
  }
  return msg
}

/**
 * Checks if a schema is a Zod schema by checking if it has the Zod-specific properties
 */
export function isZodSchema(schema: unknown): schema is ZodSchema {
  // Zod schemas have safeParse and parse functions
  return (
    !!schema &&
    (typeof (schema as any)?.safeParse === 'function' ||
      typeof (schema as any)?.parse === 'function')
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
  const explicitParams = (issue as any)?.messageValues
  if (explicitParams && typeof explicitParams === 'object') {
    const messages = Object.fromEntries(
      Object.entries(explicitParams).map(([k, v]) => [k, String(v)])
    )
    return messages
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

    // Check if this is a custom message that should be preserved
    // Custom messages are user-provided messages that don't match error message keys
    const hasCustomMessage =
      normalizedMessage &&
      !issue.message.startsWith('StringField.error') &&
      !issue.message.startsWith('Field.error') &&
      !issue.message.startsWith('nb.') &&
      issue.message !== 'Validation error'

    if (hasCustomMessage) {
      // Use the custom message directly without error message injection
      return new FormError(normalizedMessage, {
        messageValues: getMessageValuesFromZodIssue(issue),
      })
    }

    // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
    // The error message injection system will then process the message and messageValues
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      {
        ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
        messageValues: getMessageValuesFromZodIssue(issue),
      }
    )
  }

  // Multiple errors - create individual FormError objects for each issue
  // This matches the AJV pattern for handling multiple errors
  const errors = issues.map((issue) => {
    // Check if this is a custom message that should be preserved
    const hasCustomMessage =
      issue.message &&
      !issue.message.startsWith('StringField.error') &&
      !issue.message.startsWith('Field.error') &&
      !issue.message.startsWith('nb.') &&
      issue.message !== 'Validation error'

    if (hasCustomMessage) {
      // Use the custom message directly without error message injection
      return new FormError(issue.message, {
        messageValues: getMessageValuesFromZodIssue(issue),
      })
    }

    // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
    return new FormError(issue.message ?? 'Validation error', {
      ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
      messageValues: getMessageValuesFromZodIssue(issue),
    })
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

    // Check if this is a custom message that should be preserved
    // Custom messages are user-provided messages that don't match error message keys
    const hasCustomMessage =
      normalizedMessage &&
      !issue.message.startsWith('StringField.error') &&
      !issue.message.startsWith('Field.error') &&
      !issue.message.startsWith('nb.') &&
      issue.message !== 'Validation error'

    if (hasCustomMessage) {
      // Use the custom message directly without error message injection
      return new FormError(normalizedMessage, {
        messageValues: getMessageValuesFromZodIssue(issue),
      })
    }

    // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
    // The error message injection system will then process the message and messageValues
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      {
        ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
        messageValues: getMessageValuesFromZodIssue(issue),
      }
    )
  }

  // Multiple errors - create individual FormError objects for each issue
  // This matches the AJV pattern for handling multiple errors
  const errors = zodIssues.map((issue) => {
    const normalizedMessage = normalizeZodIssueMessage(issue)
    // Check if this is a custom message that should be preserved
    const hasCustomMessage =
      normalizedMessage &&
      !issue.message.startsWith('StringField.error') &&
      !issue.message.startsWith('Field.error') &&
      !issue.message.startsWith('nb.') &&
      issue.message !== 'Validation error'

    if (hasCustomMessage) {
      // Use the custom message directly without error message injection
      return new FormError(normalizedMessage, {
        messageValues: getMessageValuesFromZodIssue(issue),
      })
    }

    // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
    return new FormError(
      normalizedMessage ?? issue.message ?? 'Validation error',
      {
        ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
        messageValues: getMessageValuesFromZodIssue(issue),
      }
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

      // Check if this is a custom message that should be preserved
      // Custom messages are user-provided messages that don't match error message keys
      const hasCustomMessage =
        normalizedMessage &&
        !issue.message.startsWith('StringField.error') &&
        !issue.message.startsWith('Field.error') &&
        !issue.message.startsWith('nb.') &&
        issue.message !== 'Validation error'

      if (hasCustomMessage) {
        // Use the custom message directly without error message injection
        acc[path] = new FormError(normalizedMessage, {
          messageValues: getMessageValuesFromZodIssue(issue),
        })
      } else {
        // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
        // The error message injection system will then process the message and messageValues
        acc[path] = new FormError(
          normalizedMessage ?? issue.message ?? 'Validation error',
          {
            ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
            messageValues: getMessageValuesFromZodIssue(issue),
          }
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
