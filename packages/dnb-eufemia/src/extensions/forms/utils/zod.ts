import * as z from 'zod'
import { FormError } from './FormError'

export type ZodSchema = z.ZodTypeAny

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
  switch (issue.code) {
    case 'too_small': {
      // For too_small errors, we can safely access minimum and origin
      const minimum = (issue as z.core.$ZodIssueTooSmall<unknown>).minimum
      const origin = (issue as z.core.$ZodIssueTooSmall<unknown>).origin

      // Check if this is an exclusive minimum validation
      const exclusiveMinimum = (issue as any).exclusiveMinimum
      if (exclusiveMinimum !== undefined) {
        return { exclusiveMinimum: String(exclusiveMinimum) }
      }

      switch (origin) {
        case 'string': {
          return { minLength: String(minimum) }
        }
        case 'number': {
          return { minimum: String(minimum) }
        }
        case 'array': {
          return { minItems: String(minimum) }
        }
      }
      break
    }
    case 'too_big': {
      // For too_big errors, we can safely access maximum and origin
      const maximum = (issue as z.core.$ZodIssueTooBig<unknown>).maximum
      const origin = (issue as z.core.$ZodIssueTooBig<unknown>).origin

      // Check if this is an exclusive maximum validation
      const exclusiveMaximum = (issue as any).exclusiveMaximum
      if (exclusiveMaximum !== undefined) {
        return { exclusiveMaximum: String(exclusiveMaximum) }
      }

      switch (origin) {
        case 'string': {
          return { maxLength: String(maximum) }
        }
        case 'number': {
          return { maximum: String(maximum) }
        }
        case 'array': {
          return { maxItems: String(maximum) }
        }
      }
      break
    }
    case 'invalid_format': {
      // For invalid_format errors, we can safely access validation
      const validation = (issue as any).validation
      return { validation }
    }
    case 'custom': {
      // Handle custom validation errors
      // Check for multipleOf validation
      const multipleOf = (issue as any).multipleOf
      if (multipleOf !== undefined) {
        return { multipleOf: String(multipleOf) }
      }
      break
    }
  }

  // For other cases, try to provide generic context
  // Only access received if it exists on the specific issue type
  if (issue.code === 'invalid_type') {
    const received = (issue as any).received
    if (received !== undefined) {
      return { received: String(received) }
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

    // Check if this is a custom message that should be preserved
    // Custom messages are user-provided messages that don't match error message keys
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
    // The error message injection system will then process the message and messageValues
    return new FormError(issue.message ?? 'Validation error', {
      ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
      messageValues: getMessageValuesFromZodIssue(issue),
    })
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
  zodIssues: z.core.$ZodIssue[],
  value: unknown
): FormError {
  if (zodIssues.length === 1) {
    const issue = zodIssues[0]

    // Check if this is a custom message that should be preserved
    // Custom messages are user-provided messages that don't match error message keys
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
    // The error message injection system will then process the message and messageValues
    return new FormError(issue.message ?? 'Validation error', {
      ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
      messageValues: getMessageValuesFromZodIssue(issue),
    })
  }

  // Multiple errors - create individual FormError objects for each issue
  // This matches the AJV pattern for handling multiple errors
  const errors = zodIssues.map((issue) => {
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
 * Converts an array of Zod issues to a record of path-mapped FormErrors
 */
export const zodErrorsToFormErrors = (
  issues?: z.core.$ZodIssue[] | null
): Record<string, FormError> => {
  return (issues ?? []).reduce(
    (acc, issue) => {
      const path = issue.path.length > 0 ? `/${issue.path.join('/')}` : '/'

      // Check if this is a custom message that should be preserved
      // Custom messages are user-provided messages that don't match error message keys
      const hasCustomMessage =
        issue.message &&
        !issue.message.startsWith('StringField.error') &&
        !issue.message.startsWith('Field.error') &&
        !issue.message.startsWith('nb.') &&
        issue.message !== 'Validation error'

      if (hasCustomMessage) {
        // Use the custom message directly without error message injection
        acc[path] = new FormError(issue.message, {
          messageValues: getMessageValuesFromZodIssue(issue),
        })
      } else {
        // This is an error message key - set it as ajvKeyword so the system can find it in combinedErrorMessages
        // The error message injection system will then process the message and messageValues
        acc[path] = new FormError(issue.message ?? 'Validation error', {
          ajvKeyword: issue.message, // Use the error message key as ajvKeyword for lookup
          messageValues: getMessageValuesFromZodIssue(issue),
        })
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
