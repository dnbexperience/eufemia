import { FormError } from './FormError'
import { DefaultErrorMessages } from '../types'
import type { FormsTranslation } from '../hooks/useTranslation'

/**
 * Translation table for Ajv error keywords.
 * It represents the mapping between Ajv error keywords and their corresponding translation keys.
 */
const ajvErrorKeywordsTranslationTable = [
  { ajvKey: 'required', translationKey: 'Field.errorRequired' },
  { ajvKey: 'pattern', translationKey: 'Field.errorPattern' },
  {
    ajvKey: 'minLength',
    translationKey: 'StringField.errorMinLength',
  },
  {
    ajvKey: 'maxLength',
    translationKey: 'StringField.errorMaxLength',
  },
  { ajvKey: 'minimum', translationKey: 'NumberField.errorMinimum' },
  { ajvKey: 'maximum', translationKey: 'NumberField.errorMaximum' },
  { ajvKey: 'minItems', translationKey: 'IterateArray.errorMinItems' },
  { ajvKey: 'maxItems', translationKey: 'IterateArray.errorMaxItems' },
  {
    ajvKey: 'exclusiveMinimum',
    translationKey: 'NumberField.errorExclusiveMinimum',
  },
  {
    ajvKey: 'exclusiveMaximum',
    translationKey: 'NumberField.errorExclusiveMaximum',
  },
  {
    ajvKey: 'multipleOf',
    translationKey: 'NumberField.errorMultipleOf',
  },
]

/**
 * Extend the error messages with relevant translation messages.
 */
export function extendErrorMessagesWithTranslationMessages(
  messages: DefaultErrorMessages,
  translation: FormsTranslation
) {
  messages = { ...messages }

  ajvErrorKeywordsTranslationTable.forEach(
    ({ ajvKey, translationKey }) => {
      if (!messages[ajvKey]) {
        const keys = translationKey.split('.')

        /**
         * For backward compatibility.
         * Because we removed ajv keys in the fields, we now always set all the messages here instead.
         *
         * @deprecated – can be removed in v11
         */
        messages[ajvKey] =
          messages[translationKey] ?? translation[keys[0]]?.[keys[1]]

        messages[translationKey] =
          messages[translationKey] ?? translation[keys[0]]?.[keys[1]]
      }
    }
  )

  return messages
}

/**
 * Get the translation key from the Ajv validation rule
 */
export function getTranslationKeyFromValidationRule(
  validationRule: string
) {
  const item = ajvErrorKeywordsTranslationTable.find(
    ({ ajvKey }) => ajvKey === validationRule
  )
  return item?.translationKey
}

export function errorChanged(
  error1?: FormError,
  error2?: FormError
): boolean {
  if (
    (error1 === undefined && error2 instanceof Error) ||
    (error1 instanceof Error && error2 === undefined)
  ) {
    return true
  }
  if (error1 && error2) {
    if (error1.message !== error2.message) {
      return true
    }

    const errors1 = error1.errors
    const errors2 = error2.errors
    if (Array.isArray(errors1)) {
      if (errors1.length !== errors2?.length) {
        return true
      }

      if (
        errors1.length &&
        errors1.some(({ message }, i) => {
          return errors2?.[i].message !== message
        })
      ) {
        return true
      }
    }
  }
  return false
}
