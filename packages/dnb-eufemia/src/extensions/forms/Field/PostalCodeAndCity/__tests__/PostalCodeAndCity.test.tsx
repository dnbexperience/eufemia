import React from 'react'
import { render } from '@testing-library/react'
import PostalCodeAndCity, { Props } from '..'

const props: Props = { postalCode: {}, city: {} }

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<PostalCodeAndCity {...props} />)
  })

  it('postal could should have numeric input mode', () => {
    render(<PostalCodeAndCity {...props} />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code-input .dnb-input__input'
    )
    const cityInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
    )

    expect(postalCodeInput).toHaveAttribute('inputmode')
    expect(postalCodeInput.getAttribute('inputmode')).toBe('numeric')

    expect(cityInput).not.toHaveAttribute('inputmode')
  })
})
