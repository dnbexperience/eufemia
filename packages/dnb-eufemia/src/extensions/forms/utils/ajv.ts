import Ajv, { ErrorObject } from 'ajv'
import ajvErrors from 'ajv-errors'
import { FormError } from '../types'

const ajv = new Ajv({
  // If allErrors is off, ajv only give you the first error it finds
  allErrors: true,
})

ajvErrors(ajv)

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

function getValidationRule(ajvError: ErrorObject): string {
  if (ajvError.keyword === 'errorMessage' && ajvError.params.errors[0]) {
    // errorMessage structures (from ajv-errors) wrap the original error. Find keyword from original
    // to avoid issues like required-errors pointing at parent object.
    return getValidationRule(ajvError.params.errors[0])
  }
  return ajvError.keyword
}

function ajvErrorToFormError(ajvError: ErrorObject): FormError {
  const error = new FormError(ajvError.message ?? 'Unknown error', {
    validationRule: getValidationRule(ajvError),
  })
  return error
}

/**
 * Transform errors from ajv-validation into one error object (i.e for validating a flat value)
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
 *
 * @param errors Transform errors from ajv-validation into a record of errors (path as key, error as value)
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
