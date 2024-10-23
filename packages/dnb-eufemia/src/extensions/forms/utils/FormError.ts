import { ErrorObject } from 'ajv/dist/2020'
import { FormsTranslationFlat } from '../hooks/useTranslation'

type ValidationRule =
  | string
  | 'type'
  /**
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorRequired)
   */
  | 'pattern'
  /**
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorRequired)
   */
  | 'required'

type FormErrorOptions = {
  /**
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorRequired)
   */
  validationRule?: ValidationRule
  messageValues?: Record<string, string>
  ajvKeyword?: ErrorObject['keyword']
}

/**
 * Standard error object for Eufemia Forms, extending the built-in error with additional information for data handling
 */
export class FormError extends Error {
  /**
   * What validation rule did the error occur based on? (i.e: minLength, required or maximum)
   * @deprecated – can be removed in v11
   */
  validationRule?: FormErrorOptions['validationRule']

  /**
   * Replacement values relevant for this error.
   * @example { minLength: 3 } to be able to replace values in a message like "Minimum {minLength} characters"
   */
  messageValues?: FormErrorOptions['messageValues']

  /**
   * The AJV keyword that caused the error.
   */
  ajvKeyword?: FormErrorOptions['ajvKeyword']

  constructor(
    message: FormsTranslationFlat | string,
    options?: FormErrorOptions
  ) {
    super(message)

    if (options) {
      for (const key in options) {
        this[key] = options[key]
      }
    }
  }
}
