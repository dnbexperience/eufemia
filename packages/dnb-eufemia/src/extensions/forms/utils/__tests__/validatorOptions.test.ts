// @vitest-environment node

import {
  getValidatorOptions,
  hasAsyncValidatorBehavior,
  setAsyncValidatorBehavior,
  withValidatorOptions,
} from '../validatorOptions'

describe('validatorOptions', () => {
  it('detects declared and marked async validators', () => {
    const unmarkedValidator = () => undefined
    const asyncValidator = async () => undefined
    const markedValidator = setAsyncValidatorBehavior(() => undefined)

    expect(hasAsyncValidatorBehavior(unmarkedValidator)).toBe(false)
    expect(hasAsyncValidatorBehavior(asyncValidator)).toBe(true)
    expect(hasAsyncValidatorBehavior(markedValidator)).toBe(true)
    expect(hasAsyncValidatorBehavior(undefined)).toBe(false)
  })

  it('preserves async behavior when adding submit options', () => {
    const validator = setAsyncValidatorBehavior(() => undefined)
    const configured = withValidatorOptions(validator, {
      runOnSubmit: 'when-changed',
    })

    expect(hasAsyncValidatorBehavior(configured)).toBe(true)
    expect(getValidatorOptions(configured)).toEqual({
      hasAsyncBehavior: true,
      runOnSubmit: 'when-changed',
    })
  })

  it('preserves submit options when marking async behavior', () => {
    const validator = withValidatorOptions(() => undefined, {
      runOnSubmit: 'never',
    })
    const marked = setAsyncValidatorBehavior(validator)

    expect(hasAsyncValidatorBehavior(marked)).toBe(true)
    expect(getValidatorOptions(marked)).toEqual({
      hasAsyncBehavior: true,
      runOnSubmit: 'never',
    })
  })
})
