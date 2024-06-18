import ajvInstance, { ErrorObject } from 'ajv/dist/2020'
import ajvErrors from 'ajv-errors'
import pointer from 'json-pointer'
import { FormError, Path } from '../../../types'
import type Ajv from 'ajv/dist/2020'

export type AjvInstance = typeof ajvInstance
export { ajvInstance, Ajv }

/**
 * Creates an instance of Ajv (Another JSON Schema Validator) with optional custom instance.
 * If no instance is provided, a new instance of Ajv is created with the specified options.
 * The created Ajv instance is enhanced with custom error handling.
 *
 * @param instance - Optional custom instance of Ajv.
 * @returns The created or provided instance of Ajv.
 */
export function makeAjvInstance(instance?: Ajv) {
  const ajv =
    instance ||
    new ajvInstance({
      // If allErrors is off, Ajv only give you the first error it finds
      allErrors: true,
    })

  if (!ajv['__ajvErrors__']) {
    ajvErrors(ajv)
    ajv['__ajvErrors__'] = true
  }

  return ajv
}

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

  return new FormError(ajvError.message ?? 'Unknown error', {
    validationRule: getValidationRule(ajvError),
    // Keep the message values in the error object instead of injecting them into the message
    // at once, since an error might be validated one place, and then get a new message before it is displayed.
    messageValues: getMessageValues(ajvError),
  })
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

  const errorMessages = errors?.map((error) => error.message)
  return new FormError(errorMessages.join(' and '))
}

/**
 * Converts AJV validation errors to form errors.
 *
 * @param errors - The array of AJV validation errors.
 * @param data - The data object being validated.
 * @returns The converted form errors as a record of path and form error pairs.
 */
export function ajvErrorsToFormErrors<Data = Record<Path, unknown>>(
  errors?: ErrorObject[] | null,
  data?: Data
): Record<string, FormError> {
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
      data && typeof data === 'object' ? pointer.get(data, path) : data

    // Remove the error if the value is empty
    if (value === '' || value === null) {
      return undefined
    } else {
      // This extend the very limited error message with the value and the path
      const field = path ? `field at path="${path}"` : 'field'
      ajvError.message = `The ${field} value (${value}) type ${ajvError.message}`

      // Warn about the issue
      console.error(ajvError.message)
    }
  }

  return ajvError
}
