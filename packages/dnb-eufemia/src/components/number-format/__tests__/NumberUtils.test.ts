/**
 * Component Test
 *
 */

import { mockGetSelection } from '../../../core/jest/jestSetup'
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

  mockGetSelection()
})

describe('Node', () => {
  it('has icu and full-icu support', () => {
    expect(typeof process.versions.icu).toBe('string')

    const intl = new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'NOK',
    })
    expect(intl.format(value)).toBe('kr 12 345 678,99') // Rounds
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
  })

  it('should handle omit rounding', () => {
    expect(
      format(num, { currency: true, decimals: 0, omit_rounding: true })
    ).toBe('-12 345 kr')
    expect(
      format(num, { currency: true, decimals: 1, omit_rounding: true })
    ).toBe('-12 345,6 kr')
    expect(
      format(num, { currency: true, decimals: 2, omit_rounding: true })
    ).toBe('-12 345,67 kr')
    expect(
      format(num, { currency: true, decimals: 3, omit_rounding: true })
    ).toBe('-12 345,678 kr')
    expect(
      format(num, { currency: true, decimals: 4, omit_rounding: true })
    ).toBe('-12 345,6789 kr')
    expect(
      format(num, { currency: true, decimals: 5, omit_rounding: true })
    ).toBe('-12 345,67890 kr')
    expect(
      format(num, { currency: true, decimals: 6, omit_rounding: true })
    ).toBe('-12 345,678900 kr')
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

  it('should treat norwegian style (SI style (French version))', () => {
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

  it('should treat english style (SI style (English version))', () => {
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

  it('return corret aria', () => {
    const number = -123456789.56
    expect(
      format(number, { currency: true, returnAria: true })
    ).toMatchObject({
      aria: '-123 456 789,56 norske kroner',
      cleanedValue: '-123456789,56 kr',
      locale: 'nb-NO',
      number: '-123 456 789,56 kr',
      type: 'currency',
      value: number,
    })
  })

  it('return corret aria with "clean_copy_value"', () => {
    const number = -123456789.56
    expect(
      format(number, {
        currency: true,
        returnAria: true,
        clean_copy_value: true,
      })
    ).toMatchObject({
      aria: '-123 456 789,56 norske kroner',
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
    ).toBe('kr -123 456 789,50')
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
      format('someting 1234 someting', {
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
    ).toBe('norske kroner -123 456 789,50')
    expect(
      format(number, {
        currency: true,
        currency_position: 'after',
        currency_display: 'name',
      })
    ).toBe('-123 456 789,50 norske kroner')
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
      format(-4.165, { percent: true, decimals: 2, omit_rounding: true })
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

  it('should clean up norwegian style (SI style (French version))', () => {
    expect(cleanNumber('prefix -12 345,678 suffix')).toBe('-12345.678')
    expect(cleanNumber('prefix -1 234 567,891 suffix')).toBe(
      '-1234567.891'
    )
  })

  it('should clean up english style (SI style (English version))', () => {
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
    expect(getFallbackCurrencyDisplay('invalid')).toBe('code')
  })
  it('default to given display', () => {
    expect(getFallbackCurrencyDisplay('nb-NO', 'name')).toBe('name')
  })
})

describe('getDecimalSeparator should', () => {
  it('default to coma', () => {
    expect(getDecimalSeparator()).toBe(',')
  })
  it('return coma when locale is nb-NO', () => {
    expect(getDecimalSeparator('nb-NO')).toBe(',')
  })
  it('return coma when locale is sv-SE', () => {
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
  it('return space when locale is nb-NO', () => {
    expect(getCurrencySymbol('nb-NO')).toBe('kr')
  })
  it('return space when locale is sv-SE', () => {
    expect(getCurrencySymbol('sv-Se')).toBe('NOK')
  })
  it('return space when locale is en-GB', () => {
    expect(getCurrencySymbol('en-GB')).toBe('NOK')
  })
  it('return space when locale is en-US', () => {
    expect(getCurrencySymbol('en-US')).toBe('NOK')
  })
})

describe('countDecimals should', () => {
  it('return deciamls count for string', () => {
    expect(countDecimals('1.2')).toBe(1)
    expect(countDecimals('1.23')).toBe(2)
    expect(countDecimals('1.01')).toBe(2)
    expect(countDecimals('1.00')).toBe(2)
  })
  it('return deciamls count for float', () => {
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
