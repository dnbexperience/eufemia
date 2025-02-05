/**
 * Component Test
 *
 */

import React from 'react'
import {
  axeComponent,
  loadScss,
  mockClipboard,
} from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LOCALE } from '../../../shared/defaults'
import { isMac } from '../../../shared/helpers'
import Provider from '../../../shared/Provider'
import NumberFormat, { NumberFormatProps } from '../NumberFormat'
import { format, formatReturnValue } from '../NumberUtils'

const Component = (props) => {
  return <NumberFormat id="unique" {...props} />
}

const element = NumberFormat.defaultProps.element
const locale = LOCALE
const value = 12345678.9876

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-GB
let languageGetter, platformGetter

beforeEach(() => {
  const selection = window.getSelection()
  selection.removeAllRanges()
})

beforeAll(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get')
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')

  // simulate mac, has to run on the first render
  platformGetter.mockReturnValue('Mac')
  languageGetter.mockReturnValue(locale)

  isMac() // just to update the exported const: IS_MAC

  mockClipboard()
})

describe('NumberFormat component', () => {
  const displaySelector =
    element + '.dnb-number-format .dnb-number-format__visible'
  const ariaSelector = element + '.dnb-number-format .dnb-sr-only'

  it('renders without properties', () => {
    const props: NumberFormatProps = {}
    render(<Component {...props} />)

    expect(
      document.querySelector(displaySelector).textContent
    ).toBeTruthy()
  })

  it('have to match default number', () => {
    render(<Component value={value} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '12 345 678,9876'
    )
  })

  it('should support inline styling', () => {
    render(<Component style={{ color: 'red' }} value="12345" />)

    expect(
      document.querySelector('.dnb-number-format').getAttribute('style')
    ).toBe('color: red;')
  })

  it('have to match currency for default locale', () => {
    const { rerender } = render(<Component value={-value} currency />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 345 678,99 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678,99 kroner')

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
    ).toBe('-12 345 678.99 kroner')

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

  it('will show copy advice', () => {
    render(<Component value={-value} currency />)

    expect(document.querySelector('span').classList).not.toContain(
      'dnb-number-format--selected'
    )

    expect(document.querySelector('.dnb-tooltip')).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('.dnb-number-format__visible'))
    fireEvent.copy(document.querySelector('.dnb-number-format__selection'))

    expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
  })

  it('has valid selected number', () => {
    const { rerender } = render(<Component value={-value} currency />)

    expect(document.querySelector('span').classList).not.toContain(
      'dnb-number-format--selected'
    )

    expect(document.activeElement).toBe(document.body)

    fireEvent.click(document.querySelector('.dnb-number-format__visible'))

    expect(document.activeElement).toBe(
      document.querySelector('.dnb-number-format__selection')
    )
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

    fireEvent.blur(document.querySelector('.dnb-number-format__selection'))

    expect(document.querySelector('span').classList).not.toContain(
      'dnb-number-format--selected'
    )
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
    ).toBe('-12 345 678,99 kroner')

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
    ).toBe('-12 345 678.99 kroner')

    rerender(
      <Component
        value={-value}
        currency
        locale="en-GB"
        currency_position="after"
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
        locale="no"
        currency_position="before"
        currency_display="code"
      />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      'NOK -12 345 678,99'
    )
  })

  it('have to match currency with currency_position="before"', () => {
    const { rerender } = render(
      <Component value={-value} currency currency_position="before" />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      'kr -12 345 678,99'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12 345 678,99 kroner')

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
    ).toBe('-12 345 678.99 kroner')

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
    ).toBe('-12345,95 kroner')
  })

  it('have to match currency with no decimals', () => {
    render(<Component value={-12345.99} currency decimals={0} />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12 346 kr'
    )

    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12346 kroner')
  })

  it('have to match phone number', () => {
    render(<Component phone>+47 99999999</Component>)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '+47 99 99 99 99'
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

  it('will prefix aria-label with "srLabel" when given', () => {
    render(<Component value={-value} currency srLabel="Total:" />)
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('Total: -12 345 678,99 kroner')
    expect(
      document.querySelector('.dnb-number-format').textContent
    ).toContain('-12 345 678,99 kr')
  })

  it('will support "srLabel" given in a jsx element', () => {
    render(
      <Component value={-value} currency srLabel={<span>Total:</span>} />
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('Total: -12 345 678,99 kroner')
    expect(
      document.querySelector('.dnb-number-format').textContent
    ).toContain('-12 345 678,99 kr')
  })

  it('will have aria-hidden on the visual element', () => {
    render(<Component value={-value} currency />)
    expect(
      document.querySelector('.dnb-number-format__visible')
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('will set aria-hidden to false on mouse over', () => {
    render(<Component value={-value} currency />)

    const element = document.querySelector('.dnb-number-format__visible')

    fireEvent.mouseOver(element)
    expect(element).toHaveAttribute('aria-hidden', 'false')

    fireEvent.mouseLeave(element)
    expect(element).toHaveAttribute('aria-hidden', 'true')
  })

  it('will render selection value on click event', () => {
    render(<Component value={-value} currency />)

    expect(
      document.querySelector('.dnb-number-format__selection').textContent
    ).toBe('')

    fireEvent.click(document.querySelector('.dnb-number-format__visible'))

    expect(
      document.querySelector('.dnb-number-format__selection').textContent
    ).toBe('-12345678,99 kr')

    fireEvent.blur(document.querySelector('.dnb-number-format__selection'))

    expect(
      document.querySelector('.dnb-number-format__selection').textContent
    ).toBe('')
  })

  it('will not render selection element when copy_selection="false"', () => {
    render(<Component value={-value} currency copy_selection={false} />)

    expect(
      document.querySelector('.dnb-number-format__selection')
    ).not.toBeInTheDocument()
  })

  it('percent should respect options like maximumFractionDigits', () => {
    const { rerender } = render(
      <Component percent options={{ maximumFractionDigits: 2 }}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,35 %')

    rerender(
      <Component
        percent
        rounding="omit"
        options={{ maximumFractionDigits: 2 }}
      >
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,34 %')

    rerender(
      <Component percent options={{ maximumFractionDigits: 2 }}>
        12
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12 %')

    rerender(
      <Component
        percent
        options={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }}
      >
        12
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,0 %')

    rerender(<Component percent>12</Component>)

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12 %')

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12 %')

    rerender(
      <Component percent decimals={2}>
        12
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,00 %')

    rerender(
      <Component percent decimals={2}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,35 %')

    rerender(
      <Component percent rounding="omit" decimals={2}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,34 %')
  })

  it('currency should respect options like maximumFractionDigits', () => {
    const { rerender } = render(
      <Component currency options={{ maximumFractionDigits: 2 }}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,35 kr')

    rerender(
      <Component
        currency
        rounding="omit"
        options={{ maximumFractionDigits: 2 }}
      >
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,34 kr')

    rerender(
      <Component currency options={{ maximumFractionDigits: 2 }}>
        12
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,00 kr')

    rerender(<Component currency>12</Component>)

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,00 kr')

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,00 kr')

    rerender(
      <Component currency decimals={2}>
        12
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,00 kr')

    rerender(
      <Component currency decimals={2}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,35 kr')

    rerender(
      <Component currency rounding="omit" decimals={2}>
        12.3456
      </Component>
    )

    expect(
      document.querySelector('.dnb-number-format__visible').textContent
    ).toBe('12,34 kr')
  })

  it('should show dashes when number is invalid', () => {
    const { rerender } = render(<Component currency>invalid</Component>)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '- kr'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('Ikke tilgjengelig')

    rerender(<Component percent>invalid</Component>)

    expect(document.querySelector(displaySelector).textContent).toBe('– %')
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('Ikke tilgjengelig')

    rerender(<Component locale="en-GB">invalid</Component>)

    expect(document.querySelector(displaySelector).textContent).toBe('–')
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('Not available')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <Component value={-value} currency srLabel="Total:" />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should not select all if selectall is false', async () => {
    render(<NumberFormat selectall={false} value={1234568} />)

    const comp = document.querySelector('.dnb-number-format')
    const number = document.querySelector('.dnb-number-format__visible')
    const selection = document.querySelector(
      '.dnb-number-format__selection'
    )

    expect(comp).not.toHaveClass('dnb-number-format--selectall')

    await userEvent.click(number)

    expect(comp).not.toHaveClass('dnb-number-format--selected')
    expect(selection).toHaveTextContent('')
  })

  describe('rounding', () => {
    it('should support "omit"', async () => {
      render(
        <NumberFormat rounding="omit" value={123456.789} decimals={2} />
      )
      expect(
        document.querySelector('.dnb-number-format')
      ).toHaveTextContent('123 456,78') // without omit it would equal to 123 456,79
    })

    it('should support "half-even"', async () => {
      render(<NumberFormat rounding="half-even" value={2.5} />)
      expect(
        document.querySelector('.dnb-number-format')
      ).toHaveTextContent('2')
    })
  })
})

describe('NumberFormat compact', () => {
  const displaySelector =
    element + '.dnb-number-format .dnb-number-format__visible'
  const ariaSelector = element + '.dnb-number-format .dnb-sr-only'

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
    ).toBe('-12,35 millioner kroner')
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
      '-12,346 millioner kroner'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,346 millioner kroner')
  })

  it('have to hide currency code on falsy currency_display', () => {
    const { rerender } = render(
      <Component currency currency_display={false} value={-1234} />
    )

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-1 234,00'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-1234,00 kroner')

    rerender(<Component currency currency_display="" value={-1234567} />)

    expect(document.querySelector(displaySelector).textContent).toBe(
      '-1 234 567,00'
    )

    const element = document.querySelector('.dnb-number-format')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['lang', 'class', 'role'])
  })

  it('have to match compact number with custom decimals', () => {
    render(<Component value={-value} compact currency decimals={4} />)
    expect(document.querySelector(displaySelector).textContent).toBe(
      '-12,3457 mill. kr'
    )
    expect(
      document.querySelector(ariaSelector).getAttribute('data-text')
    ).toBe('-12,3457 millioner kroner')
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
      ).toBe('-12.35 million kroner')
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
  const displaySelector =
    element + '.dnb-number-format .dnb-number-format__visible'

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
      '12 345 678.99 kroner'
    )
  })
})

describe('NumberFormat scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
