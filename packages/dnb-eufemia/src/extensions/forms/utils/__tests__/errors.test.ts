import { FormsTranslation } from '../../hooks/useTranslation'
import { AdditionalReturnUtils } from '../../../../shared/useTranslation'
import {
  getTranslationKeyFromValidationRule,
  extendErrorMessagesWithTranslationMessages,
} from '../errors'

describe('getTranslationKeyFromValidationRule', () => {
  it('should return the correct translation key for pattern', () => {
    const key = getTranslationKeyFromValidationRule('pattern')
    expect(key).toBe('Field.errorPattern')
  })

  it('should return the correct translation key for required', () => {
    const key = getTranslationKeyFromValidationRule('required')
    expect(key).toBe('Field.errorRequired')
  })

  it('should return the correct translation key for minLength', () => {
    const key = getTranslationKeyFromValidationRule('minLength')
    expect(key).toBe('StringField.errorMinLength')
  })

  it('should return the correct translation key for maxLength', () => {
    const key = getTranslationKeyFromValidationRule('maxLength')
    expect(key).toBe('StringField.errorMaxLength')
  })

  it('should return the correct translation key for minimum', () => {
    const key = getTranslationKeyFromValidationRule('minimum')
    expect(key).toBe('NumberField.errorMinimum')
  })

  it('should return the correct translation key for maximum', () => {
    const key = getTranslationKeyFromValidationRule('maximum')
    expect(key).toBe('NumberField.errorMaximum')
  })

  it('should return the correct translation key for minItems', () => {
    const key = getTranslationKeyFromValidationRule('minItems')
    expect(key).toBe('IterateArray.errorMinItems')
  })

  it('should return the correct translation key for maxItems', () => {
    const key = getTranslationKeyFromValidationRule('maxItems')
    expect(key).toBe('IterateArray.errorMaxItems')
  })

  it('should return the correct translation key for exclusiveMinimum', () => {
    const key = getTranslationKeyFromValidationRule('exclusiveMinimum')
    expect(key).toBe('NumberField.errorExclusiveMinimum')
  })

  it('should return the correct translation key for exclusiveMaximum', () => {
    const key = getTranslationKeyFromValidationRule('exclusiveMaximum')
    expect(key).toBe('NumberField.errorExclusiveMaximum')
  })

  it('should return the correct translation key for multipleOf', () => {
    const key = getTranslationKeyFromValidationRule('multipleOf')
    expect(key).toBe('NumberField.errorMultipleOf')
  })

  it('should return undefined for unsupported validation rules', () => {
    const key = getTranslationKeyFromValidationRule('unsupported')
    expect(key).toBeUndefined()
  })
})

describe('extendErrorMessagesWithTranslationMessages', () => {
  const mockTranslation = {
    Field: {
      errorRequired: 'Field is required',
      errorPattern: 'Pattern is incorrect',
    },
    StringField: {
      errorMinLength: 'Too short',
      errorMaxLength: 'Too long',
    },
    NumberField: {
      errorMinimum: 'Below minimum',
      errorMaximum: 'Above maximum',
      errorExclusiveMinimum: 'Below exclusive minimum',
      errorExclusiveMaximum: 'Above exclusive maximum',
      errorMultipleOf: 'Not a multiple of',
    },
  } as FormsTranslation & AdditionalReturnUtils

  it('should extend messages with default translations if messages are undefined', () => {
    const mockMessages = {}

    const messages = extendErrorMessagesWithTranslationMessages(
      mockMessages,
      mockTranslation
    )

    expect(messages).toEqual({
      'Field.errorRequired': 'Field is required',
      'Field.errorPattern': 'Pattern is incorrect',
      'StringField.errorMinLength': 'Too short',
      'StringField.errorMaxLength': 'Too long',
      'NumberField.errorMinimum': 'Below minimum',
      'NumberField.errorMaximum': 'Above maximum',
      'NumberField.errorExclusiveMinimum': 'Below exclusive minimum',
      'NumberField.errorExclusiveMaximum': 'Above exclusive maximum',
      'NumberField.errorMultipleOf': 'Not a multiple of',

      /** @deprecated – can be removed in v11 */
      required: 'Field is required',
      pattern: 'Pattern is incorrect',
      minLength: 'Too short',
      maxLength: 'Too long',
      minimum: 'Below minimum',
      maximum: 'Above maximum',
      exclusiveMinimum: 'Below exclusive minimum',
      exclusiveMaximum: 'Above exclusive maximum',
      multipleOf: 'Not a multiple of',
    })

    expect(mockMessages).toEqual({})
  })

  it('should not overwrite existing messages', () => {
    const customMessages = {
      required: 'Custom required message',
    }
    const messages = extendErrorMessagesWithTranslationMessages(
      customMessages,
      mockTranslation
    )

    expect(messages.required).toBe('Custom required message') // should not be overwritten
    expect(messages.pattern).toBe('Pattern is incorrect') // default translation
  })

  it('should add translation messages for missing fields', () => {
    const messages = {
      'Field.errorRequired': 'Already exists',
    }
    const result = extendErrorMessagesWithTranslationMessages(
      messages,
      mockTranslation
    )

    expect(result['Field.errorRequired']).toBe('Already exists')
    expect(result.required).toBe('Already exists')
  })
})
