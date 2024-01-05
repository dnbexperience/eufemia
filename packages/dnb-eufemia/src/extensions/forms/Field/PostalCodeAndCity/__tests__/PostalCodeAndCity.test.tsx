import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '..'
import { Field } from '../../..'

const props: Props = { postalCode: {}, city: {} }

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<Field.PostalCodeAndCity {...props} />)
  })

  it('postal code should only allow four numbers', async () => {
    render(<Field.PostalCodeAndCity {...props} />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
    ) as HTMLInputElement

    expect(postalCodeInput).toHaveValue('')

    await userEvent.type(postalCodeInput, '123456')

    expect(postalCodeInput).toHaveValue('1234')
  })

  it('postal could should have numeric input mode', () => {
    render(<Field.PostalCodeAndCity {...props} />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code-input .dnb-input__input'
    )

    expect(postalCodeInput).toHaveAttribute('inputmode', 'numeric')
  })

  describe('ARIA', () => {
    const props = {
      postalCode: { required: true, validateInitially: true },
      city: { required: true, validateInitially: true },
    }

    it('should validate with ARIA rules', async () => {
      const result = render(<Field.PostalCodeAndCity {...props} />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.PostalCodeAndCity {...props} />)

      const [code, city] = Array.from(document.querySelectorAll('input'))
      expect(code).toHaveAttribute('aria-required', 'true')
      expect(city).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.PostalCodeAndCity {...props} />)

      const [code, city] = Array.from(document.querySelectorAll('input'))
      expect(code).toHaveAttribute('aria-invalid', 'true')
      expect(city).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
