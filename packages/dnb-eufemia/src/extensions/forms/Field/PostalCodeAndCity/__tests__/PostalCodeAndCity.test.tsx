import React from 'react'
import { render } from '@testing-library/react'
import PostalCodeAndCity, { Props } from '..'

const props: Props = { postalCode: {}, city: {} }

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<PostalCodeAndCity {...props} />)
  })

  it('should omit cities field when prop is set to true', () => {
    const { rerender } = render(<PostalCodeAndCity {...props} />)

    expect(
      document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-forms-field-postal-code-and-city__city')
    ).toBeInTheDocument()

    rerender(<PostalCodeAndCity {...props} omitCityField />)

    expect(
      document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-forms-field-postal-code-and-city__city')
    ).not.toBeInTheDocument()

    rerender(<PostalCodeAndCity {...props} />)

    expect(
      document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-forms-field-postal-code-and-city__city')
    ).toBeInTheDocument()
  })
})
