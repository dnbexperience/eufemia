/**
 * Component Test
 *
 */

import { mockClipboard } from '../../../core/jest/jestSetup'
import { InternalLocale } from '../../../shared/Context'
import { LOCALE } from '../../../shared/defaults'
import * as helpers from '../../../shared/helpers'
import {
  format,
  cleanNumber,
  copyWithEffect,
  getFallbackCurrencyDisplay,
  getDecimalSeparator,
  getThousandsSeparator,
  getCurrencySymbol,
  countDecimals,
  roundHalfEven,
  formatPhone,
} from '../NumberUtils'

const locale = LOCALE
const value = 12345678.9876

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-GB
let languageGetter, platformGetter

beforeAll(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get')
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')

  // simulate mac, has to run on the first render
  platformGetter.mockReturnValue('Mac')
  languageGetter.mockReturnValue(locale)

  helpers.isMac() // just to update the exported const: IS_MAC

  mockClipboard()
})

describe('Node', () => {
  it('has icu and full-icu support', () => {
    expect(typeof process.versions.icu).toBe('string')

    const intl = new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'NOK',
    })
    expect(intl.format(value)).toBe('12 345 678,99 kr') // Rounds
  })

  it('supports setting navigator.language (JSDOM)', () => {
    expect(navigator.language).toBe(LOCALE)
  })
})

describe('Decimals format', () => {
  const num = -12345.6789

  it('should return default formatted number', () => {
    expect(format(num)).toBe('-12 345,6789')
    expect(format(num, { returnAria: true })).toMatchObject({
      aria: '-12345,6789',
      cleanedValue: '-12345,6789',
      locale: 'nb-NO',
      number: '-12 345,6789',
      type: 'number',
      value: num,
    })
    expect(format(String(num), { returnAria: true })).toMatchObject({
      aria: '-12345,6789',
      cleanedValue: '-12345,6789',
      locale: 'nb-NO',
      number: '-12 345,6789',
      type: 'number',
      value: String(num),
    })
  })

  it('should handle unusual cases', () => {
    expect(format(num, { decimals: 0 })).toBe('-12 346')
    expect(format(num, { decimals: 1 })).toBe('-12 345,7')
    expect(format(num, { decimals: 2 })).toBe('-12 345,68')
    expect(format(num, { decimals: 3 })).toBe('-12 345,679')
    expect(format(num, { decimals: 4 })).toBe('-12 345,6789')
    expect(format(num, { decimals: 5 })).toBe('-12 345,67890')
    expect(format(num, { decimals: 6 })).toBe('-12 345,678900')

    expect(format(num, { currency: true, decimals: 0 })).toBe('-12 346 kr')
    expect(format(num, { currency: true, decimals: 1 })).toBe(
      '-12 345,7 kr'
    )
    expect(format(num, { currency: true, decimals: 2 })).toBe(
      '-12 345,68 kr'
    )
    expect(format(num, { currency: true, decimals: 3 })).toBe(
      '-12 345,679 kr'
    )
    expect(format(num, { currency: true, decimals: 4 })).toBe(
      '-12 345,6789 kr'
    )
    expect(format(String(num), { currency: true, decimals: 4 })).toBe(
      '-12 345,6789 kr'
    )
    expect(
      // more than 20 numbers
      format('-1.123456789123456789', {
        decimals: undefined,
      })
    ).toBe('-1,1234567891234568')
    expect(format(null, { currency: 'non-valid value' })).toBe('null')
    expect(format(undefined, { currency: 'non-valid value' })).toBe(
      'undefined'
    )
  })

  describe('rounding', () => {
    it('omit', () => {
      expect(
        format(num, { currency: true, decimals: 0, rounding: 'omit' })
      ).toBe('-12 345 kr')
      expect(
        format(num, { currency: true, decimals: 1, rounding: 'omit' })
      ).toBe('-12 345,6 kr')
      expect(
        format(num, { currency: true, decimals: 2, rounding: 'omit' })
      ).toBe('-12 345,67 kr')
      expect(
        format(num, { currency: true, decimals: 3, rounding: 'omit' })
      ).toBe('-12 345,678 kr')
      expect(
        format(num, { currency: true, decimals: 4, rounding: 'omit' })
      ).toBe('-12 345,6789 kr')
      expect(
        format(num, { currency: true, decimals: 5, rounding: 'omit' })
      ).toBe('-12 345,67890 kr')
      expect(
        format(num, { currency: true, decimals: 6, rounding: 'omit' })
      ).toBe('-12 345,678900 kr')
    })

    it('half-even', () => {
      expect(
        format(2.5, {
          decimals: 0,
          rounding: 'half-even',
        })
      ).toBe('2')

      expect(
        format(3.5, {
          decimals: 0,
          rounding: 'half-even',
        })
      ).toBe('4')

      expect(
        format(-1000.415, {
          decimals: 2,
          rounding: 'half-even',
        })
      ).toBe('-1 000,42')

      expect(
        format(-100.435, {
          currency: true,
          decimals: 2,
          rounding: 'half-even',
        })
      ).toBe('-100,44 kr')

      expect(
        format(-90.435, {
          percent: true,
          decimals: 2,
          rounding: 'half-even',
        })
      ).toBe('−90,44 %')
    })

    it('half-up (default)', () => {
      expect(
        format(2.5, {
          decimals: 0,
          rounding: 'half-up',
        })
      ).toBe('3')
      expect(
        format(-2.5, {
          decimals: 0,
          rounding: 'half-up',
        })
      ).toBe('-3')
      expect(
        format(2.434, {
          decimals: 2,
          rounding: 'half-up',
        })
      ).toBe('2,43')
      expect(
        format(2.476, {
          decimals: 2,
          rounding: 'half-up',
        })
      ).toBe('2,48')
      expect(
        format(2.476, {
          decimals: 2,
          rounding: undefined,
        })
      ).toBe('2,48')
    })
  })

  it('should handle omit currency sign', () => {
    expect(
      format(num, {
        currency: true,
        omit_currency_sign: true,
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        currency: true,
        currency_position: 'before',
        omit_currency_sign: true,
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        currency: true,
        currency_position: 'after',
        omit_currency_sign: true,
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        currency: true,
        currency_display: 'code',
        omit_currency_sign: true,
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        currency: true,
        currency_display: false,
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        currency: true,
        currency_display: '',
      })
    ).toBe('-12 345,68')
    expect(
      format(num, {
        locale: 'en',
        currency: true,
        omit_currency_sign: true,
      })
    ).toBe('-12 345.68')
    expect(
      format(num, {
        locale: 'en-US',
        currency: true,
        currency_position: 'after',
        currency_display: 'symbol',
        omit_currency_sign: true,
      })
    ).toBe('-12,345.68')
  })
})

describe('Currency format with dirty number', () => {
  it('should treat a dot as decimal', () => {
    expect(format(-12345.67, { clean: true, currency: true })).toBe(
      '-12 345,67 kr'
    )
    expect(
      format('prefix -123.45 suffix', { clean: true, currency: true })
    ).toBe('-123,45 kr')
  })

  it('should treat danish/german style', () => {
    expect(
      format('prefix -12.345 suffix', { clean: true, currency: true })
    ).toBe('-12 345,00 kr')
    expect(
      format('prefix -12.345,678 suffix', { clean: true, currency: true })
    ).toBe('-12 345,68 kr')
  })

  it('should treat usa style', () => {
    expect(
      format('prefix -1,234,567.891 suffix', {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('should treat Norwegian style (SI style (French version))', () => {
    expect(
      format('prefix -12 345,678 suffix', { clean: true, currency: true })
    ).toBe('-12 345,68 kr')
    expect(
      format('prefix -1 234 567,891 suffix', {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('should treat English style (SI style (English version))', () => {
    expect(
      format('prefix -1 234 567.891 suffix', {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('should treat swiss style', () => {
    expect(
      format("prefix -1'234'567.891 suffix", {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('should treat ireland style', () => {
    expect(
      format('prefix -12.345·678 suffix', { clean: true, currency: true })
    ).toBe('-12 345,68 kr')
    expect(
      format('prefix -1,234,567·891 suffix', {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('should treat spain style', () => {
    expect(
      format("prefix -12.345'678 suffix", { clean: true, currency: true })
    ).toBe('-12 345,68 kr')
    expect(
      format("prefix -1.234.567'891 suffix", {
        clean: true,
        currency: true,
      })
    ).toBe('-1 234 567,89 kr')
  })

  it('return correct aria', () => {
    const number = -123456789.56
    expect(
      format(number, { currency: true, returnAria: true })
    ).toMatchObject({
      aria: '-123 456 789,56 kroner',
      cleanedValue: '-123456789,56 kr',
      locale: 'nb-NO',
      number: '-123 456 789,56 kr',
      type: 'currency',
      value: number,
    })
  })

  it('return correct aria with "clean_copy_value"', () => {
    const number = -123456789.56
    expect(
      format(number, {
        currency: true,
        returnAria: true,
        clean_copy_value: true,
      })
    ).toMatchObject({
      aria: '-123 456 789,56 kroner',
      cleanedValue: '−123456789,56',
      locale: 'nb-NO',
      number: '-123 456 789,56 kr',
      type: 'currency',
      value: number,
    })
  })

  it('should support currency_position', () => {
    const number = -123456789.5
    expect(
      format(number, {
        currency: true,
        currency_position: 'after',
        locale: 'no',
      })
    ).toBe('-123 456 789,50 kr')
    expect(
      format(number, {
        currency: true,
        currency_position: 'before',
        locale: 'no',
      })
    ).toBe('kr -123 456 789,50')
    expect(
      format(number, {
        currency: true,
        currency_position: 'after',
        locale: 'en-GB',
      })
    ).toBe('-123 456 789.50 NOK')
    expect(
      format(number, {
        currency: true,
        currency_position: 'after',
        locale: 'en-US',
      })
    ).toBe('-123,456,789.50 NOK')
    expect(
      format(number, {
        currency: true,
        currency_position: 'before',
        locale: 'en-GB',
      })
    ).toBe('-NOK 123 456 789.50')
    expect(
      format(number, {
        currency: true,
        currency_position: 'before',
        locale: 'en-US',
      })
    ).toBe('-NOK 123,456,789.50')
    expect(
      format(-0, {
        currency: true,
        currency_position: 'after',
        locale: 'en-GB',
      })
    ).toBe('-0.00 NOK')
    expect(
      format(-0, {
        currency: true,
        currency_position: 'after',
        locale: 'en-US',
      })
    ).toBe('-0.00 NOK')
    expect(
      format('-0', {
        currency: true,
        currency_position: 'after',
        locale: 'en-GB',
      })
    ).toBe('-0.00 NOK')
    expect(
      format('-0', {
        currency: true,
        currency_position: 'after',
        locale: 'en-US',
      })
    ).toBe('-0.00 NOK')
    expect(
      format('-0', {
        currency: true,
        currency_position: 'before',
        locale: 'en-GB',
      })
    ).toBe('-NOK 0.00')
    expect(
      format('-0', {
        currency: true,
        currency_position: 'before',
        locale: 'en-US',
      })
    ).toBe('-NOK 0.00')
    expect(
      format('something 1234 something', {
        clean: true,
        currency: true,
        currency_position: 'after',
      })
    ).toBe('1 234,00 kr')
    expect(
      format(number, {
        currency: 'CHF',
        locale: 'de-CH',
      })
    ).toBe('CHF-123’456’789.50')
    expect(
      format(number, {
        currency: 'CHF',
        currency_position: 'before',
        locale: 'de-CH',
      })
    ).toBe('CHF-123’456’789.50')
    expect(
      format(number, {
        currency: 'CHF',
        currency_position: 'after',
        locale: 'de-CH',
      })
    ).toBe('-123’456’789.50 CHF')
    expect(
      format(number, {
        currency: true,
        currency_position: 'before',
        currency_display: 'name',
      })
    ).toBe('kroner -123 456 789,50')
    expect(
      format(number, {
        currency: true,
        currency_position: 'after',
        currency_display: 'name',
      })
    ).toBe('-123 456 789,50 kroner')
  })
})

describe('NumberFormat percentage', () => {
  const number = -123456789.56

  it('should format with default values', () => {
    expect(format(String(number), { percent: true })).toBe(
      '−123 456 789,56 %'
    )
    expect(format(0.2, { percent: true })).toBe('0,2 %')
    expect(format(-4.1, { percent: true, decimals: 1 })).toBe('−4,1 %')
    expect(format(-4.1, { percent: true })).toBe('−4,1 %')
    expect(format(-4.14, { percent: true })).toBe('−4,14 %')
    expect(format('-4.16', { percent: true })).toBe('−4,16 %')
    expect(format(-4.165, { percent: true })).toBe('−4,165 %')
    expect(format('-4.165', { percent: true, decimals: 2 })).toBe(
      '−4,17 %'
    )
    expect(
      format(-4.165, { percent: true, decimals: 2, rounding: 'omit' })
    ).toBe('−4,16 %')
  })

  it('should format based on locale', () => {
    expect(format(number, { percent: true, locale: 'no' })).toBe(
      '−123 456 789,56 %'
    )
    expect(format(number, { percent: true, locale: 'en-GB' })).toBe(
      '-123 456 789.56%'
    )
    expect(format(number, { percent: true, locale: 'en-US' })).toBe(
      '-123,456,789.56%'
    )
    expect(
      format(number, { percent: true, decimals: 1, locale: 'no' })
    ).toBe('−123 456 789,6 %')
    expect(
      format(number, { percent: true, decimals: 1, locale: 'en-GB' })
    ).toBe('-123 456 789.6%')
    expect(
      format(number, { percent: true, decimals: 1, locale: 'en-US' })
    ).toBe('-123,456,789.6%')
  })

  it('return correct aria', () => {
    expect(
      format(number, {
        percent: true,
        decimals: 1,
        locale: 'en-US',
        returnAria: true,
      })
    ).toMatchObject({
      aria: '-123,456,789.6%',
      cleanedValue: '-123456789.6%',
      locale: 'en-US',
      number: '-123,456,789.6%',
      type: 'number',
      value: number,
    })
    expect(
      format(12.34, {
        percent: true,
        locale: 'en-US',
        returnAria: true,
      })
    ).toMatchObject({
      aria: '12.34%',
      cleanedValue: '12.34%',
      locale: 'en-US',
      number: '12.34%',
      type: 'number',
      value: 12.34,
    })
  })
})

describe('NumberFormat cleanNumber', () => {
  it('should not clean up', () => {
    expect(cleanNumber(-12345.67)).toBe(-12345.67)
    expect(cleanNumber('prefix -123.00 suffix')).toBe('-123.00')
  })

  it('should not clean up if only a dot is given', () => {
    expect(cleanNumber('prefix -12.345 suffix')).toBe('-12345')
  })

  it('should clean up danish/german style', () => {
    expect(cleanNumber('prefix -12.345,678 suffix')).toBe('-12345.678')
    expect(cleanNumber('prefix -12.345.678 suffix')).toBe('-12345678')
  })

  it('should clean up usa style', () => {
    expect(cleanNumber('prefix -1,234,567.891 suffix')).toBe(
      '-1234567.891'
    )
  })

  it('should clean based on options', () => {
    expect(
      cleanNumber('NOK 123,1234 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('123.1234')

    expect(
      cleanNumber('NOK 1234,1234 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('1234.1234')

    expect(
      cleanNumber('NOK 1 234,1234 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('1234.1234')

    expect(
      cleanNumber('NOK 1 234.1234 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('1234.1234')

    expect(
      cleanNumber('NOK 123. kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('123.')

    expect(
      cleanNumber('NOK 123,12 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('123.12')

    expect(
      cleanNumber('NOK 123,1 kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('123.1')

    expect(
      cleanNumber('NOK 123, kr', {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('123.')

    expect(
      cleanNumber('NOK 1234.567 kr', {
        thousandsSeparator: ',',
        decimalSeparator: '.',
      })
    ).toBe('1234.567')

    expect(
      cleanNumber('NOK 1234 567,0123 kr', {
        prefix: 'NOK ',
        suffix: ' kr',
      })
    ).toBe('1234567.0123')
  })

  it('should clean up Norwegian style (SI style (French version))', () => {
    expect(cleanNumber('prefix -12 345,678 suffix')).toBe('-12345.678')
    expect(cleanNumber('prefix -1 234 567,891 suffix')).toBe(
      '-1234567.891'
    )
  })

  it('should clean up English style (SI style (English version))', () => {
    expect(cleanNumber('prefix -1 234 567.891 suffix')).toBe(
      '-1234567.891'
    )
  })

  it('should clean up swiss style', () => {
    expect(cleanNumber("prefix -1'234'567.891 suffix")).toBe(
      '-1234567.891'
    )
  })

  it('should clean up ireland style', () => {
    expect(cleanNumber('prefix -12.345·678 suffix')).toBe('-12345.678')
    expect(cleanNumber('prefix -1,234,567·891 suffix')).toBe(
      '-1234567.891'
    )
  })

  it('should clean up spain style', () => {
    expect(cleanNumber("prefix -12.345'678 suffix")).toBe('-12345.678')
    expect(cleanNumber("prefix -1.234.567'891 suffix")).toBe(
      '-1234567.891'
    )
  })
})

describe('copyWithEffect should', () => {
  it('make valid clipboard copy', async () => {
    copyWithEffect('1234.56')
    expect(await navigator.clipboard.readText()).toBe('1234.56')
  })
})

describe('getFallbackCurrencyDisplay should', () => {
  it('default to narrowSymbol', () => {
    expect(getFallbackCurrencyDisplay()).toBe('narrowSymbol')
  })

  it('return narrowSymbol when locale is nb-NO', () => {
    expect(getFallbackCurrencyDisplay('nb-NO')).toBe('narrowSymbol')
  })

  it('default to code on invalid locale', () => {
    const locale = 'invalid' as InternalLocale
    expect(getFallbackCurrencyDisplay(locale)).toBe('code')
  })

  it('default to given display', () => {
    expect(getFallbackCurrencyDisplay('nb-NO', 'name')).toBe('name')
  })
})

describe('getDecimalSeparator should', () => {
  it('default to comma', () => {
    expect(getDecimalSeparator()).toBe(',')
  })

  it('return comma when locale is nb-NO', () => {
    expect(getDecimalSeparator('nb-NO')).toBe(',')
  })

  it('return comma when locale is sv-SE', () => {
    expect(getDecimalSeparator('sv-SE')).toBe(',')
  })

  it('return dot when locale is en-GB', () => {
    expect(getDecimalSeparator('en-GB')).toBe('.')
  })

  it('return dot when locale is en-US', () => {
    expect(getDecimalSeparator('en-US')).toBe('.')
  })
})

describe('getThousandsSeparator should', () => {
  it('default to space', () => {
    expect(getThousandsSeparator()).toBe(' ')
  })

  it('return space when locale is nb-NO', () => {
    expect(getThousandsSeparator('nb-NO')).toBe(' ')
  })

  it('return space when locale is sv-SE', () => {
    expect(getThousandsSeparator('sv-SE')).toBe(' ')
  })

  it('return space when locale is de-DE', () => {
    expect(getThousandsSeparator('de-DE')).toBe('.')
  })

  it('return space when locale is en-GB', () => {
    expect(getThousandsSeparator('en-GB')).toBe(' ')
  })

  it('return space when locale is en-US', () => {
    expect(getThousandsSeparator('en-US')).toBe(',')
  })
})

describe('getCurrencySymbol should', () => {
  it('default to space', () => {
    expect(getCurrencySymbol()).toBe('kr')
  })

  it('return kr when locale is nb-NO', () => {
    expect(getCurrencySymbol('nb-NO')).toBe('kr')
  })

  it('return NOK when locale is sv-SE', () => {
    expect(getCurrencySymbol('sv-SE')).toBe('NOK')
  })

  it('return NOK when locale is en-GB', () => {
    expect(getCurrencySymbol('en-GB')).toBe('NOK')
  })

  it('return NOK when locale is en-US', () => {
    expect(getCurrencySymbol('en-US')).toBe('NOK')
  })
})

describe('countDecimals should', () => {
  it('return 0 when falsy value is given', () => {
    expect(countDecimals('')).toBe(0)
    expect(countDecimals(null)).toBe(0)
    expect(countDecimals(undefined)).toBe(0)
  })

  it('return decimals count for string', () => {
    expect(countDecimals('1.2')).toBe(1)
    expect(countDecimals('1.23')).toBe(2)
    expect(countDecimals('1.01')).toBe(2)
    expect(countDecimals('1.00')).toBe(2)
  })

  it('return decimals count for float', () => {
    expect(countDecimals(1.2)).toBe(1)
    expect(countDecimals(1.23)).toBe(2)
    expect(countDecimals(1.01)).toBe(2)
  })

  it('return 0 when 1.0 is given (we can not determine better in JS)', () => {
    expect(countDecimals(1.0)).toBe(0)
  })

  it('return 0 when wrong decimal is given', () => {
    expect(countDecimals('1,2')).toBe(0)
  })

  it('allow defining other decimal separator', () => {
    const decimalSeparator = ','
    expect(countDecimals('1,2', decimalSeparator)).toBe(1)
    expect(countDecimals('1,23', decimalSeparator)).toBe(2)
    expect(countDecimals('1,01', decimalSeparator)).toBe(2)
    expect(countDecimals('1,00', decimalSeparator)).toBe(2)
  })
})

describe('rounding', () => {
  describe('roundHalfEven', () => {
    it('should handle 0 input value', () => {
      expect(roundHalfEven(0, 2)).toEqual(0)
    })

    it('should handle 0 input value and 0 decimal places', () => {
      expect(roundHalfEven(0, 0)).toEqual(0)
    })

    it('should handle 0 decimal places [1]', () => {
      expect(roundHalfEven(1.234, 0)).toEqual(1)
    })

    it('should handle 0 decimal places [2]', () => {
      expect(roundHalfEven(2.9, 0)).toEqual(3)
    })

    it('should handle 0 decimal places [3]', () => {
      expect(roundHalfEven(2.5, 0)).toEqual(2)
    })

    it('should handle 0 decimal places [4]', () => {
      expect(roundHalfEven(3.5, 0)).toEqual(4)
    })

    it('should round to the specified number of decimal places', () => {
      expect(roundHalfEven(1.234, 1)).toEqual(1.2)
    })

    it('should round to 2 decimals when numDecimals is omitted', () => {
      expect(roundHalfEven(12.345)).toEqual(12.34)
    })

    it('should handle negative fractions', () => {
      expect(roundHalfEven(-1.2345, 2)).toEqual(-1.23)
    })

    it("should handle '5 case' [1]", () => {
      expect(roundHalfEven(100.435, 2)).toEqual(100.44)
    })

    it("should handle '5 case' [2]", () => {
      expect(roundHalfEven(100.465, 2)).toEqual(100.46)
    })

    it("should handle '5 case' [3]", () => {
      expect(roundHalfEven(100.405, 2)).toEqual(100.4)
    })

    it('should work for integers', () => {
      expect(roundHalfEven(1234, 2)).toEqual(1234)
    })

    it('should work for negative integers', () => {
      expect(roundHalfEven(-1234, 2)).toEqual(-1234)
    })

    it('should work for negative numbers with N decimal places [1]', () => {
      expect(roundHalfEven(-104.8936316, 6)).toEqual(-104.893632)
    })

    it('should work for negative numbers with N decimal places [2]', () => {
      expect(roundHalfEven(-83.0715644, 7)).toEqual(-83.0715644)
    })

    it('should work even if numDecimals > number of digits after decimal in the input', () => {
      expect(roundHalfEven(1.2, 4)).toEqual(1.2)
    })

    it('should handle numbers with exponential', () => {
      expect(roundHalfEven(1e-7, 6)).toEqual(0)
      expect(roundHalfEven(1e-6, 6)).toEqual(0.000001)
      expect(roundHalfEven(12e-6, 6)).toEqual(0.000012)
      expect(roundHalfEven(0.1e-1)).toEqual(0.01)
      expect(roundHalfEven(11.1e-1, 0)).toEqual(1)
    })
  })
})

describe('formatPhone', () => {
  it('should format phone number correctly', () => {
    const { number } = formatPhone('12345678')
    expect(number).toBe('12 34 56 78')
  })

  it('should format a phone number with country code', () => {
    const result = formatPhone('+4712345678')
    expect(result.number).toBe('+47 12 34 56 78')
    expect(result.aria).toBe('+47 12 34 56 78')
  })

  it('should format a phone number without country code', () => {
    const result = formatPhone('12345678')
    expect(result.number).toBe('12 34 56 78')
    expect(result.aria).toBe('12 34 56 78')
  })

  it('should format a phone number with leading 00 country code', () => {
    const result = formatPhone('004712345678')
    expect(result.number).toBe('+47 12 34 56 78')
    expect(result.aria).toBe('+47 12 34 56 78')
  })

  it('should format a short phone number', () => {
    const result = formatPhone('12345')
    expect(result.number).toBe('12345')
    expect(result.aria).toBe('12 34 5')
  })

  it('should format a special phone number starting with 8', () => {
    const result = formatPhone('80022222')
    expect(result.number).toBe('800 22 222')
    expect(result.aria).toBe('80 02 22 22')
  })

  it('should handle invalid characters in phone number', () => {
    const result = formatPhone('+47-123-456-78')
    expect(result.number).toBe('+47 12 34 56 78')
    expect(result.aria).toBe('+47 12 34 56 78')
  })

  it('should handle empty input', () => {
    const result = formatPhone('')
    expect(result.number).toBe('')
    expect(result.aria).toBe('')
  })

  it('should handle null input', () => {
    const result = formatPhone(null)
    expect(result.number).toBe('')
    expect(result.aria).toBe('')
  })

  it('should handle undefined input', () => {
    const result = formatPhone(undefined)
    expect(result.number).toBe('')
    expect(result.aria).toBe('')
  })
})
