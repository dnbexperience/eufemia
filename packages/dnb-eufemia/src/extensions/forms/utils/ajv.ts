import ajvInstance, { ErrorObject } from 'ajv/dist/2020'
import ajvErrors from 'ajv-errors'
import { FormError } from '../types'
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
export function getInstancePath(ajvError: ErrorObject): string {
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
  // console.log('validationRule', validationRule)

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
  const error = new FormError(ajvError.message ?? 'Unknown error', {
    validationRule: getValidationRule(ajvError),
    // Keep the message values in the error object instead of injecting them into the message
    // at once, since an error might be validated one place, and then get a new message before it is displayed.
    messageValues: getMessageValues(ajvError),
  })
  return error
}

/**
 * Converts an array of Ajv errors to a single FormError.
 * @param errors - An array of Ajv errors.
 * @returns A single FormError or undefined if there are no errors.
 */
export function ajvErrorsToOneFormError(
  errors?: ErrorObject[] | null
): FormError | undefined {
  if (!errors || errors.length === 0) {
    return
  }
  if (errors.length === 1) {
    return ajvErrorToFormError(errors[0])
  }

  const errorMessages = errors?.map((error) => error.message)
  return new FormError(errorMessages.join(' | '), {
    validationRule: errors.map(getValidationRule),
  })
}

/**
 * Transform errors from ajv-validation into a record of errors (path as key, error as value)
 * @param errors
 * @returns
 */
export const ajvErrorsToFormErrors = (
  errors?: ErrorObject[] | null
): Record<string, FormError> => {
  return (errors ?? []).reduce((errors, ajvError) => {
    return {
      ...errors,
      [getInstancePath(ajvError)]: ajvErrorToFormError(ajvError),
    }
  }, {})
}
