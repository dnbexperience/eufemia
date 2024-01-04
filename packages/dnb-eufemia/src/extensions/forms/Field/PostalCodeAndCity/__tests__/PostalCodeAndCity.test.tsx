import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostalCodeAndCity, { Props } from '..'

const props: Props = { postalCode: {}, city: {} }

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<PostalCodeAndCity {...props} />)
  })

  it('postal code should only allow four numbers', async () => {
    render(<PostalCodeAndCity {...props} />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
    ) as HTMLInputElement

    expect(postalCodeInput).toHaveValue('')

    await userEvent.type(postalCodeInput, '123456')

    expect(postalCodeInput).toHaveValue('1234')
  })

  it('postal could should have numeric input mode', () => {
    render(<PostalCodeAndCity {...props} />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code-input .dnb-input__input'
    )

    expect(postalCodeInput).toHaveAttribute('inputmode', 'numeric')
  })

  it('should validate with ARIA rules', async () => {
    const element = render(<PostalCodeAndCity {...props} />)

    expect(await axeComponent(element)).toHaveNoViolations()
  })
})
