import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '..'
import { Field } from '../../..'

const props: Props = { postalCode: {}, city: {} }

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<Field.PostalCodeAndCity {...props} />)
    expect(screen.getByLabelText('Postnr.')).toBeInTheDocument()
    expect(screen.getByLabelText('Sted')).toBeInTheDocument()
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

  it('should show single error message and have error modifier on two inputs', () => {
    const { rerender } = render(<Field.PostalCodeAndCity {...props} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    expect(
      document.querySelectorAll('.dnb-input__status--error')
    ).toHaveLength(0)

    rerender(
      <Field.PostalCodeAndCity
        {...props}
        error={new Error('Single error message')}
      />
    )

    expect(screen.queryAllByRole('alert')).toHaveLength(1)
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).toHaveTextContent(
      'Single error message'
    )

    // Red border on two inputs
    expect(
      document.querySelectorAll('.dnb-input__status--error')
    ).toHaveLength(2)
  })

  it('should have autofill attributes', () => {
    render(<Field.PostalCodeAndCity {...props} />)

    const [code, city] = Array.from(document.querySelectorAll('input'))

    expect(code).toHaveAttribute('autocomplete', 'postal-code')
    expect(city).toHaveAttribute('autocomplete', 'address-level2')
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
