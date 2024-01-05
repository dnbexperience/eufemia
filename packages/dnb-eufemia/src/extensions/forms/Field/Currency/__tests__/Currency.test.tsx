import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { Field } from '../../..'
import { Provider } from '../../../../../shared'

describe('Field.Currency', () => {
  it('defaults to "kr" and use "NOK" when locale is en-GB', () => {
    const { rerender } = render(
      <Provider>
        <Field.Currency value={123} />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('123 kr')

    rerender(
      <Provider locale="en-GB">
        <Field.Currency value={123} />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('123 NOK')
  })

  it('placeholder should use correct currency format', () => {
    const { rerender } = render(
      <Provider>
        <Field.Currency />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('kr')

    rerender(
      <Provider locale="en-GB">
        <Field.Currency />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('NOK')
  })

  it('should align input correctly', () => {
    render(
      <>
        <Field.Currency value={123} align="left" />
        <Field.Currency value={123} align="center" />
        <Field.Currency value={123} align="right" />
      </>
    )

    const inputs = document.querySelectorAll('.dnb-input')
    expect(inputs[0]).toHaveClass('dnb-input__align--left')
    expect(inputs[1]).toHaveClass('dnb-input__align--center')
    expect(inputs[2]).toHaveClass('dnb-input__align--right')
  })

  it('should have decimal input mode', () => {
    render(<Field.Currency />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'decimal')
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Currency label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Currency required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Currency required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
