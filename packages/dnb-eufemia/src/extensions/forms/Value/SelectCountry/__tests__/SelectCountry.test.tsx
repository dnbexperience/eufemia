import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { CountryISO } from '../../../constants/countries'

describe('Value.SelectCountry', () => {
  it('renders string values', () => {
    render(<Value.SelectCountry value="NO" />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Norge')
  })

  it('supports invalid values', () => {
    const { rerender } = render(
      <Value.SelectCountry
        value={'NotValidISOCode' as CountryISO}
        showEmpty
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(
      <Value.SelectCountry value={0 as unknown as CountryISO} showEmpty />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectCountry value={null} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectCountry value={undefined} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.SelectCountry showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(<Value.SelectCountry label="My selections" value="NO" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Norge')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.SelectCountry label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.SelectCountry placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myCountry: 'CH' }}>
        <Value.SelectCountry path="/myCountry" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Sveits')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler locale="en-GB" data={{ myCountry: 'CH' }}>
        <Value.SelectCountry path="/myCountry" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-country .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Switzerland')
  })
})
