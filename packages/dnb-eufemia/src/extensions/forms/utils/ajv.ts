import Ajv, { ErrorObject } from 'ajv'
import ajvErrors from 'ajv-errors'
import { FormError } from '../types'

const ajv = new Ajv({
  // If allErrors is off, ajv only give you the first error it finds
  allErrors: true,
})

ajvErrors(ajv)

/**
 * Returns the instance path of the given Ajv error.
 * If the error is of type 'required', it is considered an object error and the missing property is shown under the relevant field.
 * If the error is of type 'errorMessage', it is a wrapped error and the instance path is found from the original error to avoid issues like required-errors pointing at the parent object.
 * @param ajvError - The Ajv error object.
 * @returns The instance path of the error.
 */
function getInstancePath(ajvError: ErrorObject): string {
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
function getValidationRule(ajvError: ErrorObject): string {
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
function getMessageValues(
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
function ajvErrorToFormError(ajvError: ErrorObject): FormError {
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
): Record<string, FormError> =>
  (errors ?? []).reduce((errors, ajvError) => {
    return {
      ...errors,
      [getInstancePath(ajvError)]: ajvErrorToFormError(ajvError),
    }
  }, {})

export default ajv

/**
 * Replaces undefined values with an empty string in an object.
 *
 * @template Data - The type of the object.
 * @param {Data} obj - The object to process.
 * @returns {Data} - The processed object with undefined values replaced by empty strings.
 */
export function replaceUndefinedWithEmptyString<Data>(obj: Data): Data {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  obj = Object.assign({}, obj)
  const keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = obj[key]

    obj[key] =
      value === undefined ? '' : replaceUndefinedWithEmptyString(value)
  }

  return obj
}
