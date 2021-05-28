/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
  mockGetSelection,
} from '../../../core/jest/jestSetup'
import { LOCALE } from '../../../shared/defaults'
import { isMac } from '../../../shared/helpers'
import NumberFormat from '../NumberFormat'
import { format, cleanNumber, copyWithEffect } from '../NumberUtils'
import { mockMediaQuery } from '../../../shared/__tests__/helpers/MediaQueryMocker'

const Component = (props) => {
  return <NumberFormat id="unique" {...props} />
}

const element = NumberFormat.defaultProps.element
const locale = LOCALE
const value = 12345678.9876
const snapshotProps = {
  value,
  locale,
  element,
}

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-GB
let languageGetter, platformGetter

beforeAll(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get')
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')

  // simulate mac, has to run on the first render
  platformGetter.mockReturnValue('Mac')
  languageGetter.mockReturnValue(locale)

  isMac() // just to update the exported const: IS_MAC

  mockGetSelection()
})

describe('Node', () => {
  it('has icu and full-icu support', () => {
    expect(typeof process.versions.icu).toBe('string')

    const intl = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'NOK',
    })
    expect(intl.format(value)).toBe('kr 12 345 678,99') // Rounds
  })
  it('supports setting navigator.language (JSDOM)', () => {
    expect(navigator.language).toBe(locale)
  })
})

describe('NumberFormat component', () => {
  const displaySelector = element + '.dnb-number-format span'
  const ariaSelector = element + '.dnb-number-format span[id]'

  it('have to match default number-format snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('have to match default number', () => {
    const Comp = mount(<Component value={value} />)
    expect(Comp.find(displaySelector).first().text()).toBe(
      '12 345 678,9876'
    )
  })
  it('have to match currency for default locale', () => {
    const Comp = mount(<Component value={-value} currency />)

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-12 345 678,99 kr'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678,99 norske kroner'
    )

    // also check the formatting with one digit less
    Comp.setProps({
      children: null,
      decimals: 0,
      value: 12345,
    })

    expect(Comp.find(displaySelector).first().text()).toBe('12 345 kr')
  })
  it('have to match currency in en locale', () => {
    const Comp = mount(<Component value={-value} currency locale="en" />)

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-NOK 12 345 678.99'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678.99 Norwegian kroner'
    )

    // also check the formatting with one digit less
    Comp.setProps({
      children: null,
      decimals: 0,
      value: 12345,
    })

    expect(Comp.find(displaySelector).first().text()).toBe('NOK 12 345')
  })
  it('have to match currency with large decimals', () => {
    const Comp = mount(<Component value="5000.0099" currency />)
    expect(Comp.find(displaySelector).first().text()).toBe('5 000,01 kr')
  })
  it('has valid selected number', () => {
    const Comp = mount(<Component value={-value} currency />)

    const selection = window.getSelection()
    selection.removeAllRanges()

    expect(
      Comp.find('span').first().hasClass('dnb-number-format--selected')
    ).toBe(false)

    Comp.find('.dnb-number-format__visible').simulate('click')

    expect(
      Comp.find('span').first().hasClass('dnb-number-format--selected')
    ).toBe(true)

    const { cleanedValue: noVal } = format(-value, {
      currency: true,
      returnAria: true,
    })
    expect(Comp.find('.dnb-number-format__selection').text()).toBe(noVal)
    expect(window.getSelection().toString()).toBe('1234.56') // Hack! Having there the "cleanedNumber" would be optimal.
    expect(window.getSelection().rangeCount).toBe(1)

    Comp.setProps({ locale: 'en-GB' })
    const { cleanedValue: enVal } = format(-value, {
      locale: 'en-GB',
      currency: true,
      returnAria: true,
    })
    expect(Comp.find('.dnb-number-format__selection').text()).toBe(enVal)
  })
  it('have to match currency with currency_position="after"', () => {
    const Comp = mount(
      <Component value={-value} currency currency_position="after" />
    )

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-12 345 678,99 kr'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678,99 norske kroner'
    )

    Comp.setProps({
      locale: 'en-GB',
    })

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-12 345 678.99 NOK'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678.99 Norwegian kroner'
    )

    Comp.setProps({
      currency_display: 'code',
    })
    expect(Comp.find(displaySelector).first().text()).toBe(
      '-12 345 678.99 NOK'
    )

    Comp.setProps({
      locale: 'no',
    })

    Comp.setProps({
      currency_position: 'before',
    })
    expect(Comp.find(displaySelector).first().text()).toBe(
      'NOK -12 345 678,99'
    )
  })
  it('have to match currency with currency_position="before"', () => {
    const Comp = mount(
      <Component value={-value} currency currency_position="before" />
    )

    expect(Comp.find(displaySelector).first().text()).toBe(
      'kr -12 345 678,99'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678,99 norske kroner'
    )

    Comp.setProps({
      locale: 'en-GB',
    })

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-NOK 12 345 678.99'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678.99 Norwegian kroner'
    )

    Comp.setProps({
      currency_display: 'code',
    })
    expect(Comp.find(displaySelector).first().text()).toBe(
      '-NOK 12 345 678.99'
    )

    Comp.setProps({
      locale: 'no',
    })

    Comp.setProps({
      currency_position: 'after',
    })
    expect(Comp.find(displaySelector).first().text()).toBe(
      '-12 345 678,99 NOK'
    )
  })
  it('have to match currency under 100.000', () => {
    const Comp = mount(<Component value={-12345.95} currency />)

    expect(Comp.find(displaySelector).first().text()).toBe('-12 345,95 kr')

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12345,95 norske kroner'
    )
  })
  it('have to match currency with no decimals', () => {
    const Comp = mount(
      <Component value={-12345.99} currency decimals={0} />
    )

    expect(Comp.find(displaySelector).first().text()).toBe('-12 346 kr')

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12346 norske kroner'
    )
  })
  it('have to match phone number', () => {
    const Comp = mount(<Component phone>+47 99999999</Component>)
    expect(Comp.find(displaySelector).first().text()).toBe(
      '0047 99 99 99 99'
    )
  })
  it('have to match bank account number', () => {
    const Comp = mount(<Component ban>20001234567</Component>)
    expect(Comp.find(displaySelector).first().text()).toBe('2000 12 34567')

    // also check the formatting with one digit less
    Comp.setProps({
      children: null,
      value: 2000123456,
    })
    expect(Comp.find(displaySelector).first().text()).toBe('2000 12 3456')
  })
  it('have to match national identification number', () => {
    const Comp = mount(<Component nin>18089212345</Component>)
    expect(Comp.find(displaySelector).first().text()).toBe('180892 12345')
    expect(Comp.find(ariaSelector).first().text()).toBe(
      '18 08 92 1 2 3 4 5'
    )
  })
  it('have to match organization number', () => {
    const Comp = mount(
      <Component org suffix="MVA">
        123456789
      </Component>
    )
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789 MVA'
    )
    expect(Comp.find(ariaSelector).first().text()).toBe(
      '1 2 3 4 5 6 7 8 9 MVA'
    )
  })
  it('have to handle prefix and suffix', () => {
    const Comp = mount(
      <Component prefix={<span>prefix</span>} suffix={<span>suffix</span>}>
        123456789.5
      </Component>
    )
    expect(Comp.find(displaySelector).first().text()).toBe(
      'prefix 123 456 789,5 suffix'
    )
    expect(Comp.find(ariaSelector).first().text()).toBe(
      'prefix 123 456 789,5 suffix'
    )
  })
  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component value={-value} currency />)
    expect(
      await axeComponent(Comp, {
        rules: {
          // because of the role="text", we disable this rule for now
          'aria-text': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})

const matchMedia = mockMediaQuery()

describe('Responsive NumberFormat component', () => {
  const displaySelector = element + '.dnb-number-format span'
  const ariaSelector = element + '.dnb-number-format span[id]'
  it('have to act responsive when currency_breakpoint is enabled', () => {
    const Comp = mount(
      <Component currency_breakpoint currency>
        123456789.5
      </Component>
    )

    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789,50 kr'
    )
    
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 40em)')
    
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789,50'
    )
    expect(Comp.find(ariaSelector).first().text()).toBe(
      '123 456 789,50 norske kroner'
    )

    Comp.setProps({ locale: 'en' })
    
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789.50'
    )

    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 40em)')
    Comp.setProps({ locale: 'en' })
    
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789.50'
    )
    expect(Comp.find(ariaSelector).first().text()).toBe(
      '123 456 789.50 Norwegian kroner'
    )
  })
  it('have to act to custom currency_breakpoint size', () => {
    const Comp = mount(
      <Component currency_breakpoint="large" currency>
        123456789.5
      </Component>
    )
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789,50 kr'
    )
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 60em)')
    expect(Comp.find(displaySelector).first().text()).toBe(
      '123 456 789,50'
    )
  })
})

describe('Decimals format', () => {
  const num = -12345.6789
  it('should handle in unusual cases', () => {
    expect(format(num, { decimals: 0 })).toBe('-12 346')
    expect(format(num, { decimals: 1 })).toBe('-12 345,7')
    expect(format(num, { decimals: 2 })).toBe('-12 345,68')
    expect(format(num, { decimals: 3 })).toBe('-12 345,679')
    expect(format(num, { decimals: 4 })).toBe('-12 345,6789')

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

  it('should support percentage', () => {
    const number = -123456789.56
    expect(format(String(number), { percent: true })).toBe(
      '−123 456 789,56 %'
    )
    expect(format(0.2, { percent: true })).toBe('0,2 %')
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
    ).toBe('-NOK 123 456 789.50')
    expect(
      format(number, {
        currency: true,
        currency_position: 'before',
        locale: 'en-US',
      })
    ).toBe('-NOK 123,456,789.50')
    expect(
      format(-0, {
        currency: true,
        currency_position: 'after',
        locale: 'en-GB',
      })
    ).toBe('0.00 NOK')
    expect(
      format(-0, {
        currency: true,
        currency_position: 'after',
        locale: 'en-US',
      })
    ).toBe('0.00 NOK')
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
    ).toBe('-NOK 0.00')
    expect(
      format('-0', {
        currency: true,
        currency_position: 'before',
        locale: 'en-US',
      })
    ).toBe('-NOK 0.00')
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
    ).toBe('CHF -123’456’789.50')
    expect(
      format(number, {
        currency: 'CHF',
        currency_position: 'after',
        locale: 'de-CH',
      })
    ).toBe('-123’456’789.50 CHF')
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

describe('NumberFormat scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-number-format.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
