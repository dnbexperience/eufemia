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
import { fireEvent, render } from '@testing-library/react'
import { LOCALE } from '../../../shared/defaults'
import { isMac } from '../../../shared/helpers'
import Provider from '../../../shared/Provider'
import NumberFormat from '../NumberFormat'
import { format, formatReturnValue } from '../NumberUtils'

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

beforeEach(() => {
  document.body.innerHTML = ''
})

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
    render(<Component value={value} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '12 345 678,9876'
    )
  })

  it('have to match currency for default locale', () => {
    const { rerender } = render(<Component value={-value} currency />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678,99 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678,99 norske kroner')

    // also check the formatting with one digit less
    rerender(<Component currency decimals={0} value={12345} />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '12 345 kr'
    )
  })

  it('have to match currency in en locale', () => {
    const { rerender } = render(
      <Component value={-value} currency locale="en" />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-NOK 12 345 678.99'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678.99 Norwegian kroner')

    // also check the formatting with one digit less
    rerender(<Component currency locale="en" decimals={0} value={12345} />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      'NOK 12 345'
    )
  })

  it('have to match currency with large decimals', () => {
    render(<Component value="5000.0099" currency />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '5 000,01 kr'
    )
  })

  it('has valid selected number', () => {
    const { rerender } = render(<Component value={-value} currency />)

    const selection = window.getSelection()
    selection.removeAllRanges()

    expect(
      document
        .querySelector('span')
        .classList.contains('dnb-number-format--selected')
    ).toBe(false)

    fireEvent.click(document.querySelector('.dnb-number-format__visible'))

    expect(document.querySelector('span').classList).toContain(
      'dnb-number-format--selected'
    )

    const { cleanedValue: noVal } = format(-value, {
      currency: true,
      returnAria: true,
    }) as formatReturnValue
    expect(
      document.querySelector('.dnb-number-format__selection').textContent
    ).toBe(noVal)
    expect(window.getSelection().toString()).toBe('1234.56') // Hack! Having there the "cleanedNumber" would be optimal.
    expect(window.getSelection().rangeCount).toBe(1)

    rerender(<Component value={-value} currency locale="en-GB" />)

    const { cleanedValue: enVal } = format(-value, {
      locale: 'en-GB',
      currency: true,
      returnAria: true,
    }) as formatReturnValue

    expect(
      document.querySelector('.dnb-number-format__selection').textContent
    ).toBe(enVal)
  })

  it('have to match currency with currency_position="after"', () => {
    const { rerender } = render(
      <Component value={-value} currency currency_position="after" />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678,99 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678,99 norske kroner')

    rerender(
      <Component
        value={-value}
        currency
        currency_position="after"
        locale="en-GB"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678.99 NOK'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678.99 Norwegian kroner')

    rerender(
      <Component
        value={-value}
        currency
        currency_position="after"
        locale="en-GB"
        currency_display="code"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678.99 NOK'
    )

    rerender(
      <Component
        value={-value}
        currency
        currency_position="before"
        locale="no"
        currency_display="code"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      'NOK −12 345 678,99'
    )
  })

  it('have to match currency with currency_position="before"', () => {
    const { rerender } = render(
      <Component value={-value} currency currency_position="before" />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      'kr −12 345 678,99'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678,99 norske kroner')

    rerender(
      <Component
        value={-value}
        currency
        currency_position="before"
        locale="en-GB"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-NOK 12 345 678.99'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678.99 Norwegian kroner')

    rerender(
      <Component
        value={-value}
        currency
        currency_position="code"
        locale="en-GB"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-NOK 12 345 678.99'
    )

    rerender(
      <Component
        value={-value}
        currency
        currency_position="after"
        currency_display="code"
        locale="no"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678,99 NOK'
    )
  })

  it('have to match currency under 100.000', () => {
    render(<Component value={-12345.95} currency />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345,95 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12345,95 norske kroner')
  })

  it('have to match currency with no decimals', () => {
    render(<Component value={-12345.99} currency decimals={0} />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 346 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12346 norske kroner')
  })

  it('have to match phone number', () => {
    render(<Component phone>+47 99999999</Component>)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '0047 99 99 99 99'
    )
  })

  it('have to match bank account number', () => {
    const { rerender } = render(<Component ban>20001234567</Component>)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '2000 12 34567'
    )

    // also check the formatting with one digit less
    rerender(<Component ban value="2000123456" />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '2000 12 3456'
    )
  })

  it('have to match national identification number', () => {
    render(<Component nin>18089212345</Component>)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '180892 12345'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('18 08 92 1 2 3 4 5')
  })

  it('have to match organization number', () => {
    render(
      <Component org suffix="MVA">
        123456789
      </Component>
    )
    expect(document.querySelector(displaySelector).textContent).toBe(
      '123 456 789 MVA'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('1 2 3 4 5 6 7 8 9 MVA')
  })

  it('have to handle prefix and suffix', () => {
    render(
      <Component prefix={<span>prefix</span>} suffix={<span>suffix</span>}>
        123456789.5
      </Component>
    )
    expect(document.querySelector(displaySelector).textContent).toBe(
      'prefix 123 456 789,5 suffix'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('prefix 123 456 789,5 suffix')
  })

  it('will add visually hidden label when srLabel is given', () => {
    render(
      <Component
        value={-value}
        currency
        srLabel="Total:"
        copy_selection={false}
      />
    )
    expect(
      document.querySelector('.dnb-sr-only').getAttribute('data-text')
    ).toBe('Total: ')
    expect(document.querySelector('.dnb-sr-only').textContent).toBe('')
    expect(
      document.querySelector('.dnb-number-format').textContent
    ).toContain('-12 345 678,99 kr')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <Component value={-value} currency srLabel="Total:" />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('NumberFormat compact', () => {
  const displaySelector = element + '.dnb-number-format span'
  const ariaSelector = element + '.dnb-number-format span[id]'

  it('have to match default compact number', () => {
    render(<Component value={-value} compact decimals={1} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,3 mill.'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,3 millioner')
  })

  it('have to match short compact number', () => {
    render(<Component value={-12345} compact="short" decimals={3} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,345k'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,345 tusen')
  })

  it('have to match long compact number', () => {
    render(<Component value={-value} compact="long" decimals={3} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,346 millioner'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,346 millioner')
  })

  it('have to match currency based compact number', () => {
    render(<Component value={-value} compact currency decimals={2} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,35 mill. kr'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,35 millioner norske kroner')
  })

  it('have to match currency based compact number with custom currency_display', () => {
    render(
      <Component
        compact="long"
        currency
        value={-value}
        decimals={3}
        currency_display="name"
      />
    )
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,346 millioner norske kroner'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,346 millioner norske kroner')
  })

  it('have to match compact number with custom decimals', () => {
    render(<Component value={-value} compact currency decimals={4} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,3457 mill. kr'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,3457 millioner norske kroner')
  })

  describe('en-GB', () => {
    it('have to match default compact number', () => {
      render(
        <Component value={-value} compact locale="en-GB" decimals="2" />
      )
      expect(document.querySelector(displaySelector).textContent).toBe(
        '-12.35M'
      )
      expect(
        document.querySelector(ariaSelector).getAttribute('data-text')
      ).toBe('-12.35 million')
    })

    it('have to match long compact number', () => {
      render(
        <Component
          value={-value}
          compact="long"
          locale="en-GB"
          decimals="2"
        />
      )
      expect(document.querySelector(displaySelector).textContent).toBe(
        '-12.35 million'
      )
      expect(
        document.querySelector(ariaSelector).getAttribute('data-text')
      ).toBe('-12.35 million')
    })

    it('have to match currency based compact number', () => {
      render(
        <Component
          value={-value}
          compact
          currency
          locale="en-GB"
          decimals="2"
        />
      )
      expect(document.querySelector(displaySelector).textContent).toBe(
        '-NOK 12.35M'
      )
      expect(
        document.querySelector(ariaSelector).getAttribute('data-text')
      ).toBe('-12.35 million Norwegian kroner')
    })
  })

  const numbersDecimals = [
    {
      value: -123,
      display: '-123,0',
      aria: '-123,0',
    },
    {
      value: -1234,
      display: '-1,2 tusen',
      aria: '-1,2 tusen',
    },
    {
      value: -12345,
      display: '-12,3 tusen',
      aria: '-12,3 tusen',
    },
    {
      value: -123456,
      display: '-123,5 tusen',
      aria: '-123,5 tusen',
    },
    {
      value: -1234567,
      display: '-1,2 mill.',
      aria: '-1,2 millioner',
    },
    {
      value: -12345678,
      display: '-12,3 mill.',
      aria: '-12,3 millioner',
    },
    {
      value: -123456789,
      display: '-123,5 mill.',
      aria: '-123,5 millioner',
    },
    {
      value: -1234567891,
      display: '-1,2 mrd.',
      aria: '-1,2 milliarder',
    },
    {
      value: -12345678912,
      display: '-12,3 mrd.',
      aria: '-12,3 milliarder',
    },
    {
      value: -123456789123,
      display: '-123,5 mrd.',
      aria: '-123,5 milliarder',
    },
    {
      value: -1234567891234,
      display: '-1,2 bill.',
      aria: '-1,2 billioner',
    },
    {
      value: -12345678912345,
      display: '-12,3 bill.',
      aria: '-12,3 billioner',
    },
    {
      value: -123456789123456,
      display: '-123,5 bill.',
      aria: '-123,5 billioner',
    },
  ]

  it.each(numbersDecimals)(
    'have to match compact number %s',
    ({ value, display, aria }) => {
      render(<Component value={value} compact decimals={1} />)

      expect(document.querySelector(displaySelector).textContent).toBe(
        display
      )
      expect(
        document.querySelector(ariaSelector).getAttribute('data-text')
      ).toBe(aria)
    }
  )
})

describe('NumberFormat component with provider', () => {
  const displaySelector = element + '.dnb-number-format span'

  it('have to match inherit properties', () => {
    render(
      <Provider
        locale="en-GB"
        NumberFormat={{ currency: true, currency_display: 'name' }}
      >
        <Component value={value} />
      </Provider>
    )
    expect(document.querySelector(displaySelector).textContent).toBe(
      '12 345 678.99 Norwegian kroner'
    )
  })
})

describe('NumberFormat scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
