/**
 * Utility functions to convert AJV errors to FormError objects.
 *
 * NB: Do not include these functions in the main ajv file.
 * Else ajv will be included in the main bundle even if it is not used.
 */
import type { ErrorObject } from 'ajv/dist/2020.js'
import type { JsonObject } from './json-pointer'
import pointer from './json-pointer'
import type { Path } from '../types'
import { FormError } from './FormError'
import { getTranslationKeyFromValidationRule } from './errors'

/**
 * Returns the instance path of the given Ajv error.
 * If the error is of type 'required', it is considered an object error and the missing property is shown under the relevant field.
 * If the error is of type 'errorMessage', it is a wrapped error and the instance path is found from the original error to avoid issues like required-errors pointing at the parent object.
 * @param ajvError - The Ajv error object.
 * @returns The instance path of the error.
 */
export function getInstancePath(ajvError: ErrorObject): Path {
  switch (ajvError.keyword) {
    case 'required': {
      // Required-errors are considered object errors by ajv, so they don't have instancePaths. We want to
      // show them under the relevant field
      return `${ajvError.instancePath}/${ajvError.params.missingProperty}`
    }
    case 'errorMessage': {
      // errorMessage structures (from ajv-errors) wrap the original error. Find instance path from original
      // to avoid issues like required-errors pointing at parent object.
      if (ajvError.params.errors[0]) {
        return getInstancePath(ajvError.params.errors[0])
      }
    }
  }
  return ajvError.instancePath
}

/**
 * Retrieves the validation rule from an AJV error object.
 * If the error object has an 'errorMessage' keyword, it unwraps the original error
 * to avoid issues like required-errors pointing at the parent object.
 * @param ajvError - The AJV error object.
 * @returns The validation rule.
 */
export function getValidationRule(ajvError: ErrorObject): string {
  if (ajvError.keyword === 'errorMessage' && ajvError.params.errors[0]) {
    // errorMessage structures (from ajv-errors) wrap the original error. Find keyword from original
    // to avoid issues like required-errors pointing at parent object.
    return getValidationRule(ajvError.params.errors[0])
  }
  return ajvError.keyword
}

/**
 * Retrieves the message values from an AJV error object.
 * @param ajvError The AJV error object.
 * @returns The message values extracted from the error object.
 */
export function getMessageValues(
  ajvError: ErrorObject
): FormError['messageValues'] {
  const validationRule = getValidationRule(ajvError)

  switch (validationRule) {
    case 'minLength':
    case 'maxLength':
    case 'minimum':
    case 'maximum':
    case 'minItems':
    case 'maxItems':
    case 'exclusiveMinimum':
    case 'exclusiveMaximum':
      return {
        [validationRule]: ajvError.params?.limit,
      }
    case 'multipleOf':
      return {
        [validationRule]: ajvError.params?.multipleOf,
      }
    case 'pattern':
      return {
        [validationRule]: ajvError.params?.pattern,
      }
  }
}

/**
 * Converts an AJV error object to a FormError object.
 *
 * @param ajvError - The AJV error object to convert.
 * @returns The converted FormError object.
 */
export function ajvErrorToFormError(ajvError: ErrorObject): FormError {
  if (ajvError.keyword === 'errorMessage') {
    return new Error(ajvError.message ?? 'Unknown error')
  }

  return new FormError(
    getTranslationKeyFromValidationRule(getValidationRule(ajvError)) ??
      ajvError.message ??
      'Unknown error',
    {
      // Keep the message values in the error object instead of injecting them into the message
      // at once, since an error might be validated one place, and then get a new message before it is displayed.
      messageValues: getMessageValues(ajvError),
      ajvKeyword: ajvError.keyword,
    }
  )
}

/**
 * Converts an array of Ajv errors to a single FormError.
 * @param errors - An array of Ajv errors.
 * @returns A single FormError or undefined if there are no errors.
 */
export function ajvErrorsToOneFormError(
  errors?: ErrorObject[] | null,
  value?: unknown
): FormError | undefined {
  if (!errors || errors.length === 0) {
    return
  }
  if (errors.length === 1) {
    const error = ajvErrorsTransformation(errors[0], value)
    if (!error) {
      return undefined
    }

    return ajvErrorToFormError(error)
  }

  return new FormError('Multiple errors', {
    errors: errors?.map((error) => ajvErrorToFormError(error)),
  })
}

/**
 * Converts AJV validation errors to form errors.
 *
 * @param errors - The array of AJV validation errors.
 * @param data - The data object being validated.
 * @returns The converted form errors as a record of path and form error pairs.
 */
export const ajvErrorsToFormErrors = (
  errors?: ErrorObject[] | null,
  data?: JsonObject
): Record<string, FormError> => {
  return (errors ?? []).reduce((errors, ajvError) => {
    const path = getInstancePath(ajvError)
    const error = ajvErrorsTransformation(ajvError, data, path)

    if (error) {
      errors[path] = ajvErrorToFormError(error)
    }

    return errors
  }, {})
}

/**
 * Transforms AJV errors based on specific conditions.
 *
 * @param ajvError - The AJV error object.
 * @param data - The data object or value being validated.
 * @param path - The path to the data object property being validated.
 * @returns The transformed AJV error object or undefined if the error should be removed.
 */
function ajvErrorsTransformation(
  ajvError: ErrorObject,
  data?: Record<Path, unknown> | unknown,
  path?: Path
) {
  if (ajvError.keyword === 'type') {
    const value =
      data && typeof data === 'object' && path
        ? pointer.get(data, path)
        : data

    // Remove the error if the value is empty-like (including undefined)
    if (value === '' || value === null || typeof value === 'undefined') {
      return undefined
    } else {
      // Provide a human-friendly message for integer-only fields when a decimal is given
      // Ajv sets params.type for type errors
      const expectedType = ajvError?.params?.type

      if (expectedType === 'integer') {
        // Use a translation key; actual text is resolved by prepareError
        ajvError.message = 'NumberField.errorInteger'
      } else {
        // Extend the very limited default message with the value and the path
        const field = path ? `field at path="${path}"` : 'field'
        ajvError.message = `The ${field} value (${value}) type ${ajvError.message}`
      }

      // Warn about the issue
      console.error(ajvError.message)
    }
  }

  return ajvError
}
