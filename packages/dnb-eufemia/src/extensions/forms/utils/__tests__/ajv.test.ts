import Ajv, { ErrorObject } from 'ajv/dist/2020'
import {
  makeAjvInstance,
  getInstancePath,
  getValidationRule,
  getMessageValues,
  ajvErrorToFormError,
  ajvErrorsToOneFormError,
  ajvErrorsToFormErrors,
} from '../ajv'
import { FormError } from '../../types'

describe('makeAjvInstance', () => {
  it('should return a new Ajv instance', () => {
    const ajv = new Ajv({
      allErrors: true,
    })

    const ajvInstance = makeAjvInstance(ajv)

    expect(ajvInstance).toBeDefined()
    expect(ajvInstance).toBeInstanceOf(Ajv)
  })

  it('should return a new Ajv instance with default options if no instance is provided', () => {
    const ajvInstance = makeAjvInstance()

    expect(ajvInstance).toBeDefined()
    expect(ajvInstance).toBeInstanceOf(Ajv)
  })
})

describe('getInstancePath', () => {
  it('should return the correct instance path', () => {
    const ajvError = {
      instancePath: '/name',
    } as ErrorObject
    const path = getInstancePath(ajvError)
    expect(path).toBe('/name')
  })

  it('should return undefined if the instance path is not defined', () => {
    const ajvError = {} as ErrorObject
    const path = getInstancePath(ajvError)
    expect(path).toBe(undefined)
  })

  it('should return the instance path for a required error', () => {
    const error: ErrorObject = {
      schemaPath: '#',
      keyword: 'required',
      instancePath: '/path',
      params: { missingProperty: 'property' },
    }
    expect(getInstancePath(error)).toBe('/path/property')
  })

  it('should return the instance path for an errorMessage error', () => {
    const innerError: ErrorObject = {
      schemaPath: '#',
      keyword: 'minLength',
      instancePath: '/innerPath',
      params: { limit: 5 },
    }
    const error: ErrorObject = {
      schemaPath: '#',
      keyword: 'errorMessage',
      instancePath: '/path',
      params: { errors: [innerError] },
    }
    expect(getInstancePath(error)).toBe('/innerPath')
  })

  it('should return the original instance path for other errors', () => {
    const error: ErrorObject = {
      schemaPath: '#',
      keyword: 'minLength',
      instancePath: '/path',
      params: { limit: 5 },
    }
    expect(getInstancePath(error)).toBe('/path')
  })
})

describe('getValidationRule', () => {
  it('should return the correct validation rule', () => {
    const ajvError = { keyword: 'type' } as ErrorObject
    const rule = getValidationRule(ajvError)
    expect(rule).toBe('type')
  })

  it('should return the validation rule from the original error if the keyword is errorMessage', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      keyword: 'errorMessage',
      instancePath: '/path',
      params: { errors: [{ keyword: 'required' }] },
    }
    const rule = getValidationRule(ajvError)
    expect(rule).toBe('required')
  })

  it('should return undefined if the keyword is not defined', () => {
    const ajvError = {} as ErrorObject
    const rule = getValidationRule(ajvError)
    expect(rule).toBe(undefined)
  })
})

describe('getMessageValues', () => {
  it('should return the correct message values for minLength, maxLength, minimum, maximum, exclusiveMinimum, exclusiveMaximum', () => {
    const rules = [
      'minLength',
      'maxLength',
      'minimum',
      'maximum',
      'exclusiveMinimum',
      'exclusiveMaximum',
    ]
    for (const rule of rules) {
      const ajvError: ErrorObject = {
        schemaPath: '#',
        instancePath: '/path',
        keyword: rule,
        params: { limit: 5 },
      }
      const messageValues = getMessageValues(ajvError)
      expect(messageValues).toEqual({ [rule]: 5 })
    }
  })

  it('should return the correct message values for multipleOf', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'multipleOf',
      params: { multipleOf: 3 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ multipleOf: 3 })
  })

  it('should return the correct message values for pattern', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'pattern',
      params: { pattern: 'abc' },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ pattern: 'abc' })
  })

  it('should return undefined for unsupported rules', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'unsupported',
      params: { unsupported: 'abc' },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toBeUndefined()
  })

  it('should return the correct message values for minLength validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'minLength',
      params: { limit: 5 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ minLength: 5 })
  })

  it('should return the correct message values for maxLength validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'maxLength',
      params: { limit: 10 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ maxLength: 10 })
  })

  it('should return the correct message values for minimum validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'minimum',
      params: { limit: 0 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ minimum: 0 })
  })

  it('should return the correct message values for maximum validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'maximum',
      params: { limit: 100 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ maximum: 100 })
  })

  it('should return the correct message values for exclusiveMinimum validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'exclusiveMinimum',
      params: { limit: 0 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ exclusiveMinimum: 0 })
  })

  it('should return the correct message values for exclusiveMaximum validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'exclusiveMaximum',
      params: { limit: 100 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ exclusiveMaximum: 100 })
  })

  it('should return the correct message values for multipleOf validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'multipleOf',
      params: { multipleOf: 5 },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ multipleOf: 5 })
  })

  it('should return the correct message values for pattern validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'pattern',
      params: { pattern: '[A-Za-z]+' },
    }
    const messageValues = getMessageValues(ajvError)
    expect(messageValues).toEqual({ pattern: '[A-Za-z]+' })
  })
})

describe('ajvErrorToFormError', () => {
  it('should return a FormError with the correct message and validation rule', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'minLength',
      params: { limit: 5 },
      message: 'Should not be shorter than 5 characters',
    }
    const formError = ajvErrorToFormError(ajvError)
    expect(formError.message).toBe(
      'Should not be shorter than 5 characters'
    )
  })

  it('should return a FormError with "Unknown error" message if no message is provided', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'minLength',
      params: { limit: 5 },
    }
    const formError = ajvErrorToFormError(ajvError)
    expect(formError.message).toBe('Unknown error')
  })
})

describe('ajvErrorsToOneFormError', () => {
  it('should return undefined if no errors are provided', () => {
    const formError = ajvErrorsToOneFormError()
    expect(formError).toBeUndefined()
  })

  it('should return undefined if an empty array is provided', () => {
    const formError = ajvErrorsToOneFormError([])
    expect(formError).toBeUndefined()
  })

  it('should return a FormError for a single error', () => {
    const ajvError: ErrorObject = {
      schemaPath: '#',
      instancePath: '/path',
      keyword: 'minLength',
      params: { limit: 5 },
      message: 'Should not be shorter than 5 characters',
    }
    const formError = ajvErrorsToOneFormError([ajvError])
    expect(formError).toBeInstanceOf(FormError)
    expect(formError.message).toBe(
      'Should not be shorter than 5 characters'
    )
  })

  it('should return a FormError with multiple messages for multiple errors', () => {
    const ajvErrors: ErrorObject[] = [
      {
        schemaPath: '#',
        instancePath: '/path1',
        keyword: 'minLength',
        params: { limit: 5 },
        message: 'Should not be shorter than 5 characters',
      },
      {
        schemaPath: '#',
        instancePath: '/path2',
        keyword: 'maxLength',
        params: { limit: 10 },
        message: 'Should not be longer than 10 characters',
      },
    ]
    const formError = ajvErrorsToOneFormError(ajvErrors)
    expect(formError).toBeInstanceOf(FormError)
    expect(formError.message).toBe(
      'Should not be shorter than 5 characters | Should not be longer than 10 characters'
    )
  })
})

describe('ajvErrorsToFormErrors', () => {
  it('should return an empty object if no errors are provided', () => {
    const formErrors = ajvErrorsToFormErrors()
    expect(formErrors).toEqual({})
  })

  it('should return an empty object if null is provided', () => {
    const formErrors = ajvErrorsToFormErrors(null)
    expect(formErrors).toEqual({})
  })

  it('should return a record of FormErrors', () => {
    const ajvErrors: ErrorObject[] = [
      {
        schemaPath: '#',
        instancePath: '/path1',
        keyword: 'minLength',
        params: { limit: 5 },
        message: 'Should not be shorter than 5 characters',
      },
      {
        schemaPath: '#',
        instancePath: '/path2',
        keyword: 'maxLength',
        params: { limit: 10 },
        message: 'Should not be longer than 10 characters',
      },
    ]
    const formErrors = ajvErrorsToFormErrors(ajvErrors)
    expect(formErrors).toEqual({
      '/path1': new Error('Should not be shorter than 5 characters'),
      '/path2': new Error('Should not be longer than 10 characters'),
    })
  })
})
