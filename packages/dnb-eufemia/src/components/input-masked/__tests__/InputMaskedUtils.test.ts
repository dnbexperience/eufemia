import {
  correctCaretPosition,
  correctNumberValue,
  getSoftKeyboardAttributes,
  handleCurrencyMask,
  handleDecimalSeparator,
  handleNumberMask,
  handlePercentMask,
  handleThousandsSeparator,
  invisibleSpace,
  isRequestingLocaleSupport,
  isRequestingNumberMask,
} from '../InputMaskedUtils'
import * as helpers from '../../../shared/helpers'

describe('correctNumberValue', () => {
  it('should return the same value if it is not a number', () => {
    const result = correctNumberValue({
      props: { value: 'abc' },
      maskParams: {},
    })
    expect(result).toBe('abc')
  })

  it('should limit the number of integers if integerLimit is set', () => {
    const result = correctNumberValue({
      props: { value: '1234567890' },
      maskParams: { integerLimit: 5 },
    })
    expect(result).toBe('12345')
  })

  it('should remove decimals if shouldHaveDecimals is false', () => {
    const result = correctNumberValue({
      props: { value: '123.45' },
      maskParams: { allowDecimal: false },
    })
    expect(result).toBe('123')
  })

  it('should format the value according to number_format options', () => {
    const result = correctNumberValue({
      props: { value: '1234.5678', number_format: { locale: 'en-US' } },
      maskParams: { decimalSymbol: '.', decimalLimit: 2 },
    })
    expect(result).toBe('1,234.57')
  })

  it('should replace decimal symbol with the specified decimalSymbol', () => {
    const result = correctNumberValue({
      props: { value: '123.45' },
      maskParams: { decimalSymbol: ',', allowDecimal: true },
    })
    expect(result).toBe('123,45')
  })

  it('should keep decimal if localeValue has an ending decimal sign', () => {
    const result = correctNumberValue({
      localValue: '20,',
      props: { value: '20.999' },
      maskParams: { decimalSymbol: ',' },
    })
    expect(result).toBe('20,')
  })

  it('should keep decimal and zero if localeValue has an ending decimal sign and zero', () => {
    const result = correctNumberValue({
      localValue: '20,0',
      props: { value: '20.999' },
      maskParams: { decimalSymbol: ',' },
    })
    expect(result).toBe('20,0')
  })

  it('should use localValue in leading zero cases', () => {
    const result = correctNumberValue({
      localValue: '012',
      props: { value: '12' },
      maskParams: {},
    })
    expect(result).toBe('012')
  })

  it('should handle cases with negative values', () => {
    const result = correctNumberValue({
      localValue: '-0',
      props: { value: '0' },
      maskParams: { decimalSymbol: ',' },
    })
    expect(result).toBe('-0')
  })

  it('should handle empty values', () => {
    const result = correctNumberValue({
      localValue: '',
      props: { value: '0' },
      maskParams: { decimalSymbol: ',' },
    })
    expect(result).toBe('')
  })
})

describe('isRequestingLocaleSupport', () => {
  it('should return false when no props are provided', () => {
    const result = isRequestingLocaleSupport({})
    expect(result).toBe(false)
  })

  it('should return false when props do not include any enableNumberMaskWhen keys', () => {
    const props = {
      as_something: true,
    }
    const result = isRequestingLocaleSupport(props)
    expect(result).toBe(false)
  })

  it('should return true when props include at least one enableNumberMaskWhen key', () => {
    expect(isRequestingLocaleSupport({ as_number: true })).toBe(true)
    expect(isRequestingLocaleSupport({ as_percent: true })).toBe(true)
    expect(isRequestingLocaleSupport({ as_currency: true })).toBe(true)
    expect(isRequestingLocaleSupport({ number_mask: true })).toBe(false)
    expect(isRequestingLocaleSupport({ currency_mask: true })).toBe(false)
  })
})

describe('isRequestingNumberMask', () => {
  it('should return false when no props are provided', () => {
    const result = isRequestingNumberMask({})
    expect(result).toBe(false)
  })

  it('should return false when props do not include any enableNumberMaskWhen keys', () => {
    const props = {
      as_something: true,
    }
    const result = isRequestingNumberMask(props)
    expect(result).toBe(false)
  })

  it('should return true when props include at least one enableNumberMaskWhen key', () => {
    expect(isRequestingNumberMask({ as_number: true })).toBe(true)
    expect(isRequestingNumberMask({ as_percent: true })).toBe(true)
    expect(isRequestingNumberMask({ as_currency: true })).toBe(true)
    expect(isRequestingNumberMask({ number_mask: true })).toBe(true)
    expect(isRequestingNumberMask({ currency_mask: true })).toBe(true)
  })
})

describe('correctCaretPosition', () => {
  let element: HTMLInputElement

  beforeEach(() => {
    window.requestAnimationFrame = jest.fn((callback) => {
      callback(1)
      return 1
    })
    element = document.createElement('input')
  })

  afterEach(() => {
    element = null
  })

  it('should not change caret position if start and end are not equal', () => {
    element.selectionStart = 2
    element.selectionEnd = 5
    element.setSelectionRange = jest.fn()

    correctCaretPosition(element, {}, {})

    expect(element.selectionStart).toBe(0)
    expect(element.selectionEnd).toBe(0)
    expect(element.setSelectionRange).not.toHaveBeenCalled()
  })

  it('should correctly handle suffix and prefix', () => {
    element.value = '1234suffixprefix5678'
    element.selectionStart = 10
    element.selectionEnd = 10
    element.setSelectionRange = jest.fn()

    const maskParams = {
      suffix: 'suffix',
      prefix: 'prefix',
      placeholderChar: '_',
    }

    correctCaretPosition(element, maskParams, {})

    expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
    expect(element.setSelectionRange).toHaveBeenCalledWith(4, 4)
  })

  it('should handle placeholderChar when clicking after the suffix', () => {
    element.value = 'suffixprefix_'
    element.selectionStart = 12
    element.selectionEnd = 12
    element.setSelectionRange = jest.fn()

    const maskParams = {
      suffix: 'suffix',
      prefix: 'prefix',
      placeholderChar: '_',
    }

    correctCaretPosition(element, maskParams, {})

    expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
    expect(element.setSelectionRange).toHaveBeenCalledWith(12, 12)
  })

  it('should correctly handle prefix', () => {
    element.value = 'prefix1234suffix'
    element.selectionStart = 6
    element.selectionEnd = 6
    element.setSelectionRange = jest.fn()

    const maskParams = {
      suffix: 'suffix',
      prefix: 'prefix',
      placeholderChar: '_',
    }

    correctCaretPosition(element, maskParams, {})

    expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
    expect(element.setSelectionRange).toHaveBeenCalledWith(6, 6)
  })

  it('should handle invisibleSpace character', () => {
    element.value = `1234${invisibleSpace}suffix`
    element.selectionStart = 6
    element.selectionEnd = 6
    element.setSelectionRange = jest.fn()

    const maskParams = {
      suffix: 'suffix',
      prefix: '',
      placeholderChar: '_',
    }

    correctCaretPosition(element, maskParams, {})

    expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
    expect(element.setSelectionRange).toHaveBeenCalledWith(4, 4)
  })

  it('should handle mask when element value length is equal to end', () => {
    element.value = '1234_'
    element.selectionStart = 4
    element.selectionEnd = 4
    element.setSelectionRange = jest.fn()

    const props = {
      mask: [/\d/, /\d/, /\d/, /\d/],
    }

    correctCaretPosition(element, {}, props)

    expect(element.setSelectionRange).not.toHaveBeenCalled()
  })

  it('should handle mask when element value length is greater than end', () => {
    element.value = '123_'
    element.setSelectionRange = jest.fn()

    const props = {
      mask: [/\d/, /\d/, /\d/, /\d/],
    }

    correctCaretPosition(element, {}, props)

    expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
    expect(element.setSelectionRange).toHaveBeenCalledWith(3, 3)
  })

  it('should handle mask when element value length is less than end', () => {
    element.value = '1234_'
    element.selectionStart = 4
    element.selectionEnd = 4
    element.setSelectionRange = jest.fn()

    const props = {
      mask: [/\d/, /\d/, /\d/, /\d/],
    }

    correctCaretPosition(element, {}, props)

    expect(element.setSelectionRange).not.toHaveBeenCalled()
  })
})

describe('handlePercentMask', () => {
  it('should handle percent mask with default locale', () => {
    const props = { value: 0.5 }
    const maskParams = {}

    const result = handlePercentMask({ props, maskParams })

    expect(result.suffix).toBe(' %')
  })

  it('should correctly handle percent mask with valid value', () => {
    const props = { value: 0.5 }
    const locale = 'en-US'
    const maskParams = {}

    const result = handlePercentMask({ props, locale, maskParams })

    expect(result.suffix).toBe('%')
  })

  it('should handle percent mask with zero value', () => {
    const props = { value: 0 }
    const locale = 'en-US'
    const maskParams = {}

    const result = handlePercentMask({ props, locale, maskParams })

    expect(result.suffix).toBe('%')
  })

  it('should handle percent mask with negative value', () => {
    const props = { value: -0.5 }
    const locale = 'en-US'
    const maskParams = {}

    const result = handlePercentMask({ props, locale, maskParams })

    expect(result.suffix).toBe('%')
  })

  it('should handle percent mask with non-numeric value', () => {
    const props = { value: 'abc' }
    const locale = 'en-US'
    const maskParams = {}

    const result = handlePercentMask({ props, locale, maskParams })

    expect(result.suffix).toBe('%')
  })

  it('should handle percent mask with empty value', () => {
    const props = { value: '' }
    const locale = 'en-US'
    const maskParams = {}

    const result = handlePercentMask({ props, locale, maskParams })

    expect(result.suffix).toBe('%')
  })
})

describe('handleCurrencyMask', () => {
  it('should return the default maskParams when no options are provided', () => {
    const result = handleCurrencyMask({})
    expect(result).toEqual({
      showMask: true,
      placeholderChar: null,
      allowDecimal: true,
      decimalLimit: 2,
      decimalSymbol: ',',
      suffix: ' kr',
    })
  })

  it('should override the default maskParams with provided options', () => {
    const result = handleCurrencyMask({
      mask_options: {
        showMask: false,
        decimalLimit: 3,
      },
      currency_mask: {
        currency: 'USD',
      },
    })
    expect(result).toEqual({
      showMask: false,
      placeholderChar: null,
      allowDecimal: true,
      decimalLimit: 3,
      decimalSymbol: ',',
      currency: 'USD',
      suffix: ' USD',
    })
  })

  it('should use the provided currency_mask string as the suffix', () => {
    const result = handleCurrencyMask({
      currency_mask: '€',
    })
    expect(result).toEqual({
      '0': '€',
      showMask: true,
      placeholderChar: null,
      allowDecimal: true,
      decimalLimit: 2,
      decimalSymbol: ',',
      suffix: ' €',
    })
  })

  it('should use "kr" as the default suffix when no currency_mask is provided', () => {
    const result = handleCurrencyMask({})
    expect(result).toEqual({
      showMask: true,
      placeholderChar: null,
      allowDecimal: true,
      decimalLimit: 2,
      decimalSymbol: ',',
      suffix: ' kr',
    })
  })
})

describe('handleNumberMask', () => {
  it('should return the correct maskParams object', () => {
    const mask_options = {
      prefix: '$',
      suffix: ' USD',
      decimalLimit: 2,
    }
    const number_mask = {
      allowDecimal: true,
    }

    const expected = {
      decimalSymbol: ',',
      prefix: '$',
      suffix: ' USD',
      decimalLimit: 2,
      allowDecimal: true,
    }

    const result = handleNumberMask({ mask_options, number_mask })

    expect(result).toEqual(expected)
  })

  it('should set allowDecimal to true if decimalLimit is greater than 0 and allowDecimal is not defined', () => {
    const mask_options = {
      decimalLimit: 2,
    }
    const number_mask = {}

    const expected = {
      decimalSymbol: ',',
      decimalLimit: 2,
      allowDecimal: true,
    }

    const result = handleNumberMask({ mask_options, number_mask })

    expect(result).toEqual(expected)
  })

  it('should set allowDecimal to false if decimalLimit is 0 and allowDecimal is not defined', () => {
    const mask_options = {
      decimalLimit: 0,
    }
    const number_mask = {}

    const expected = {
      decimalSymbol: ',',
      decimalLimit: 0,
      allowDecimal: false,
    }

    const result = handleNumberMask({ mask_options, number_mask })

    expect(result).toEqual(expected)
  })
})

describe('getSoftKeyboardAttributes', () => {
  beforeEach(() => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: false,
    })
  })

  it('should return undefined if mask is not an instance of createNumberMask', () => {
    const mask = () => null
    mask.instanceOf = 'someOtherMask'

    const result = getSoftKeyboardAttributes(mask)
    expect(result).toBeUndefined()
  })

  it('should return undefined if IS_IOS is true and allowNegative is not explicitly set to false', () => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: true,
    })

    const mask = () => null
    mask.instanceOf = 'createNumberMask'
    mask.maskParams = { allowNegative: true }

    const result = getSoftKeyboardAttributes(mask)
    expect(result).toBeUndefined()
  })

  it('should return inputMode as "decimal" if allowDecimal is true and decimalLimit is not 0', () => {
    const mask = () => null
    mask.instanceOf = 'createNumberMask'
    mask.maskParams = { allowDecimal: true, decimalLimit: 2 }

    const result = getSoftKeyboardAttributes(mask)
    expect(result).toEqual({ inputMode: 'decimal' })
  })

  it('should return inputMode as "numeric" if allowDecimal is false or decimalLimit is 0', () => {
    const mask1 = () => null
    mask1.instanceOf = 'createNumberMask'
    mask1.maskParams = { allowDecimal: false, decimalLimit: 2 }

    const mask2 = () => null
    mask2.maskParams = { allowDecimal: true, decimalLimit: 0 }
    mask2.instanceOf = 'createNumberMask'

    const result1 = getSoftKeyboardAttributes(mask1)
    const result2 = getSoftKeyboardAttributes(mask2)
    expect(result1).toEqual({ inputMode: 'numeric' })
    expect(result2).toEqual({ inputMode: 'numeric' })
  })
})

describe('handleThousandsSeparator', () => {
  it('should handle default locale', () => {
    const locale = ''
    const result = handleThousandsSeparator(locale)
    expect(result).toBe(' ')
  })

  it('should replace non-breaking space with a regular space', () => {
    const locale = 'nb-NO'
    const result = handleThousandsSeparator(locale)
    expect(result).toBe(' ')
  })

  it('should handle different locales', () => {
    const locales = ['en-US', 'de-DE', 'nb-NO']
    const expectedResults = [',', '.', ' ']

    locales.forEach((locale, index) => {
      const result = handleThousandsSeparator(locale)
      expect(result).toBe(expectedResults[index])
    })
  })
})

describe('handleDecimalSeparator', () => {
  it('should handle default locale', () => {
    const locale = ''
    const result = handleDecimalSeparator(locale)
    expect(result).toBe(',')
  })

  it('should handle different locales', () => {
    const locales = ['en-US', 'de-DE', 'nb-NO']
    const expectedResults = ['.', ',', ',']

    locales.forEach((locale, index) => {
      const result = handleDecimalSeparator(locale)
      expect(result).toBe(expectedResults[index])
    })
  })
})
