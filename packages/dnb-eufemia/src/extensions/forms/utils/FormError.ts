import { ErrorObject } from 'ajv/dist/2020.js'
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
   * What validation rule did the error occur based on? (i.e: minLength, required or maximum).
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorRequired)
   */
  validationRule?: ValidationRule

  /**
   * Replacement values relevant for this error.
   * @example { minLength: 3 } to be able to replace values in a message like "Minimum {minLength} characters"
   */
  messageValues?: Record<string, string>

  /**
   * The AJV keyword that caused the error.
   */
  ajvKeyword?: ErrorObject['keyword']

  /**
   * An array of errors that should be rendered in the same error message.
   */
  errors?: Array<Error | FormError>

  /**
   * For internal use only.
   * A formatted (JSX) message to be used internally later on.
   */
  formattedMessage?: string | React.ReactElement
}

/**
 * Standard error object for Eufemia Forms, extending the built-in error with additional information for data handling
 */
export class FormError extends Error {
  /**
   * @deprecated – can be removed in v11
   */
  validationRule?: FormErrorOptions['validationRule']

  messageValues?: FormErrorOptions['messageValues']
  ajvKeyword?: FormErrorOptions['ajvKeyword']
  errors?: FormErrorOptions['errors']
  formattedMessage?: FormErrorOptions['formattedMessage']

  constructor(
    message: FormsTranslationFlat | string | React.ReactElement,
    options?: FormErrorOptions
  ) {
    super(message as string)

    if (options) {
      for (const key in options) {
        this[key] = options[key]
      }
    }
  }
}
