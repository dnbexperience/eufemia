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
  mockGetSelection
} from '../../../core/jest/jestSetup'
import { LOCALE } from '../../../shared/defaults'
import { isMac } from '../../../shared/helpers'
import Component, {
  format,
  cleanNumber,
  cleanDirtyNumber,
  copyNumber,
  copySelectedNumber
} from '../Number'

const element = Component.defaultProps.element
const locale = LOCALE
const value = 12345678.9876
const snapshotProps = {
  value,
  locale,
  element
}

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-US
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
      currency: 'NOK'
    })
    expect(intl.format(value)).toBe('kr 12 345 678,99') // Rounds
  })
  it('supports setting navigator.language (JSDOM)', () => {
    expect(navigator.language).toBe(locale)
  })
})

describe('Number component', () => {
  const slector = element + '.dnb-number'
  it('have to match default number snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('have to match default number', () => {
    const Comp = mount(<Component value={value} />)
    expect(Comp.find(slector).first().text()).toBe('12 345 678,9876')
  })
  it('have to match currency', () => {
    const Comp = mount(<Component value={-value} currency />)

    expect(Comp.find(slector).first().text()).toBe('kr -12 345 678,99')

    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('-12 345 678,99 norske kroner')

    // also check the formatting with one digit less
    Comp.setProps({
      children: null,
      decimals: 0,
      value: 12345
    })

    expect(Comp.find(slector).first().text()).toBe('kr 12 345')
  })
  it('have to match currency with large decimals', () => {
    const Comp = mount(<Component value="5000.0099" currency />)
    expect(Comp.find(slector).first().text()).toBe('kr 5 000,01')
  })
  it('have to match currency with currency_position="after"', () => {
    const Comp = mount(
      <Component value={-value} currency currency_position="after" />
    )

    expect(Comp.find(slector).first().text()).toBe('-12 345 678,99 kr')

    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('-12 345 678,99 norske kroner')

    Comp.setProps({
      currency_display: 'code'
    })
    expect(Comp.find(slector).first().text()).toBe('-12 345 678,99 NOK')

    Comp.setProps({
      currency_position: 'before'
    })
    expect(Comp.find(slector).first().text()).toBe('NOK -12 345 678,99')
  })
  it('have to match currency under 100.000', () => {
    const Comp = mount(<Component value={-12345.95} currency />)

    expect(Comp.find(slector).first().text()).toBe('kr -12 345,95')

    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('-12345,95 norske kroner')
  })
  it('have to match currency with no decimals', () => {
    const Comp = mount(
      <Component value={-12345.99} currency decimals={0} />
    )

    expect(Comp.find(slector).first().text()).toBe('kr -12 346')

    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('-12345,99 norske kroner')
  })
  it('have to match phone number', () => {
    const Comp = mount(<Component phone>+47 99999999</Component>)
    expect(Comp.find(slector).first().text()).toBe('0047 99 99 99 99')
  })
  it('have to match bank account number', () => {
    const Comp = mount(<Component ban>20001234567</Component>)
    expect(Comp.find(slector).first().text()).toBe('2000 12 34567')

    // also check the formatting with one digit less
    Comp.setProps({
      children: null,
      value: 2000123456
    })
    expect(Comp.find(slector).first().text()).toBe('2000 12 3456')
  })
  it('have to match national identification number', () => {
    const Comp = mount(<Component nin>18089212345</Component>)
    expect(Comp.find(slector).first().text()).toBe('180892 12345')
    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('18 08 92 1 2 3 4 5')
  })
  it('have to match organization number', () => {
    const Comp = mount(
      <Component org suffix="MVA">
        123456789
      </Component>
    )
    expect(Comp.find(slector).first().text()).toBe('123 456 789 MVA')
    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('1 2 3 4 5 6 7 8 9 MVA')
  })
  it('have to handle prefix and suffix', () => {
    const Comp = mount(
      <Component prefix={<span>prefix</span>} suffix={<span>suffix</span>}>
        123456789.5
      </Component>
    )
    expect(Comp.find(slector).first().text()).toBe(
      'prefix 123 456 789,5 suffix'
    )
    expect(
      Comp.find(slector).first().instance().getAttribute('aria-label')
    ).toBe('prefix 123 456 789,5 suffix')
  })
  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component value={-value} currency />)
    expect(
      await axeComponent(Comp, {
        rules: {
          // because of the role="text", we disable this rule for now
          'aria-roles': { enabled: false }
        }
      })
    ).toHaveNoViolations()
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

    expect(format(num, { currency: true, decimals: 0 })).toBe('kr -12 346')
    expect(format(num, { currency: true, decimals: 1 })).toBe(
      'kr -12 345,7'
    )
    expect(format(num, { currency: true, decimals: 2 })).toBe(
      'kr -12 345,68'
    )
    expect(format(num, { currency: true, decimals: 3 })).toBe(
      'kr -12 345,679'
    )
    expect(format(num, { currency: true, decimals: 4 })).toBe(
      'kr -12 345,6789'
    )
  })

  it('should handle omit rounding', () => {
    expect(
      format(num, { currency: true, decimals: 0, omit_rounding: true })
    ).toBe('kr -12 345')
    expect(
      format(num, { currency: true, decimals: 1, omit_rounding: true })
    ).toBe('kr -12 345,6')
    expect(
      format(num, { currency: true, decimals: 2, omit_rounding: true })
    ).toBe('kr -12 345,67')
    expect(
      format(num, { currency: true, decimals: 3, omit_rounding: true })
    ).toBe('kr -12 345,678')
    expect(
      format(num, { currency: true, decimals: 4, omit_rounding: true })
    ).toBe('kr -12 345,6789')
    expect(
      format(num, { currency: true, decimals: 5, omit_rounding: true })
    ).toBe('kr -12 345,67890')
    expect(
      format(num, { currency: true, decimals: 6, omit_rounding: true })
    ).toBe('kr -12 345,678900')
  })
})

describe('Currency format with dirty number', () => {
  it('should treat a dot as decimal', () => {
    expect(format(-12345.67, { clean: true, currency: true })).toBe(
      'kr -12 345,67'
    )
    expect(
      format('prefix -123.45 suffix', { clean: true, currency: true })
    ).toBe('kr -123,45')
  })

  it('should treat danish/german style', () => {
    expect(
      format('prefix -12.345 suffix', { clean: true, currency: true })
    ).toBe('kr -12 345,00')
    expect(
      format('prefix -12.345,678 suffix', { clean: true, currency: true })
    ).toBe('kr -12 345,68')
  })

  it('should treat usa style', () => {
    expect(
      format('prefix -1,234,567.891 suffix', {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })

  it('should treat norwegian style (SI style (French version))', () => {
    expect(
      format('prefix -12 345,678 suffix', { clean: true, currency: true })
    ).toBe('kr -12 345,68')
    expect(
      format('prefix -1 234 567,891 suffix', {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })

  it('should treat english style (SI style (English version))', () => {
    expect(
      format('prefix -1 234 567.891 suffix', {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })

  it('should treat swiss style', () => {
    expect(
      format("prefix -1'234'567.891 suffix", {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })

  it('should treat ireland style', () => {
    expect(
      format('prefix -12.345·678 suffix', { clean: true, currency: true })
    ).toBe('kr -12 345,68')
    expect(
      format('prefix -1,234,567·891 suffix', {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })

  it('should treat spain style', () => {
    expect(
      format("prefix -12.345'678 suffix", { clean: true, currency: true })
    ).toBe('kr -12 345,68')
    expect(
      format("prefix -1.234.567'891 suffix", {
        clean: true,
        currency: true
      })
    ).toBe('kr -1 234 567,89')
  })
})

describe('Number cleanNumber', () => {
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

describe('Number cleanDirtyNumber', () => {
  it('should clean up and remove invalid suff arround numbers', () => {
    expect(cleanDirtyNumber(-12345.67)).toBe('-12345.67')
    expect(cleanDirtyNumber('-12.345,67 suffix')).toBe('-12345.67')
    expect(cleanDirtyNumber('prefix -12.345,67')).toBe('-12345.67')
    expect(cleanDirtyNumber(' -12.345,67')).toBe('-12345.67')
    expect(cleanDirtyNumber('prefix -12 345,67 suffix')).toBe(false)
    expect(cleanDirtyNumber('prefix -12 345,67 $')).toBe(false)
    expect(cleanDirtyNumber('$ -12 345,67 suffix')).toBe(false)
    expect(cleanDirtyNumber(' -12 345,67 ')).toBe(false)
    expect(cleanDirtyNumber('  -12 345,67  ')).toBe(false)
    expect(cleanDirtyNumber('0047 ')).toBe('0047')
    expect(cleanDirtyNumber('prefix \n-12 345,67')).toBe(false)
    expect(cleanDirtyNumber('prefix')).toBe(false)
  })
})

describe('Number copy methods like', () => {
  it('copyNumber should make valid clipboard copy', async () => {
    copyNumber('1234.56')
    expect(await navigator.clipboard.readText()).toBe('1234.56')
  })
  it('copySelectedNumber make valid clipboard copy', async () => {
    copySelectedNumber()
    expect(await navigator.clipboard.readText()).toBe('1234.56')
  })
})

describe('Number scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-number.scss'))
    expect(scss).toMatchSnapshot()
  })
})
