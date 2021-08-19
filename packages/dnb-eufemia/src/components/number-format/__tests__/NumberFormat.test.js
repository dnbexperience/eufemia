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
import Provider from '../../../shared/Provider'
import NumberFormat from '../NumberFormat'
import { format } from '../NumberUtils'

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
      'NOK -12 345 678,99'
    )
  })
  it('have to match currency with currency_position="before"', () => {
    const Comp = mount(
      <Component value={-value} currency currency_position="before" />
    )

    expect(Comp.find(displaySelector).first().text()).toBe(
      'kr -12 345 678,99'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678,99 norske kroner'
    )

    Comp.setProps({
      locale: 'en-GB',
    })

    expect(Comp.find(displaySelector).first().text()).toBe(
      '-NOK 12 345 678.99'
    )

    expect(Comp.find(ariaSelector).first().text()).toBe(
      '-12 345 678.99 Norwegian kroner'
    )

    Comp.setProps({
      currency_display: 'code',
    })
    expect(Comp.find(displaySelector).first().text()).toBe(
      '-NOK 12 345 678.99'
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

describe('NumberFormat component with provider', () => {
  const displaySelector = element + '.dnb-number-format span'

  it('have to match inherit properties', () => {
    const Comp = mount(
      <Provider
        locale="en-GB"
        NumberFormat={{ currency: true, currency_display: 'name' }}
      >
        <Component value={value} />
      </Provider>
    )
    expect(Comp.find(displaySelector).first().text()).toBe(
      '12 345 678.99 Norwegian kroner'
    )
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
