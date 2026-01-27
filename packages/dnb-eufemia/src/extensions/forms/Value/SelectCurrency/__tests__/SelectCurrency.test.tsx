import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { CurrencyISO } from '../../../constants/currencies'

describe('Value.SelectCurrency', () => {
  it('should render string values', () => {
    render(<Value.SelectCurrency value="NOK" />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Norsk krone (NOK)')
  })

  it('should support invalid values', () => {
    const { rerender } = render(
      <Value.SelectCurrency value={'NotValidISOCode' as CurrencyISO} />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('NotValidISOCode')

    rerender(
      <Value.SelectCurrency
        value={0 as unknown as CurrencyISO}
        showEmpty
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectCurrency value={null} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectCurrency value={undefined} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()
  })

  it('should render label when showEmpty is true', () => {
    render(<Value.SelectCurrency showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('should render value and label', () => {
    render(<Value.SelectCurrency label="My selections" value="NOK" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Norsk krone (NOK)')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('should render custom label', () => {
    render(<Value.SelectCurrency label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('should render placeholder', () => {
    render(<Value.SelectCurrency placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('should render value from path', () => {
    render(
      <Form.Handler data={{ myCurrency: 'CHF' }}>
        <Value.SelectCurrency path="/myCurrency" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Sveitsisk franc (CHF)')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler locale="en-GB" data={{ myCurrency: 'CHF' }}>
        <Value.SelectCurrency path="/myCurrency" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-currency .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Swiss franc (CHF)')
  })
})
