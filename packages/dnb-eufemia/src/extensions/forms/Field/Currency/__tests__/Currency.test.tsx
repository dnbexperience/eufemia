import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Currency from '../Currency'
import { Provider } from '../../../../../shared'

describe('Field.Currency', () => {
  it('defaults to "kr" and use "NOK" when locale is en-GB', () => {
    const { rerender } = render(
      <Provider>
        <Currency value={123} />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('123 kr')

    rerender(
      <Provider locale="en-GB">
        <Currency value={123} />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('123 NOK')
  })

  it('placeholder should use correct currency format', () => {
    const { rerender } = render(
      <Provider>
        <Currency />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('kr')

    rerender(
      <Provider locale="en-GB">
        <Currency />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('NOK')
  })

  it('should align input correctly', () => {
    render(
      <>
        <Currency value={123} align="left" />
        <Currency value={123} align="center" />
        <Currency value={123} align="right" />
      </>
    )

    const inputs = document.querySelectorAll('.dnb-input')
    expect(inputs[0]).toHaveClass('dnb-input__align--left')
    expect(inputs[1]).toHaveClass('dnb-input__align--center')
    expect(inputs[2]).toHaveClass('dnb-input__align--right')
  })

  it('should have decimal input mode', () => {
    render(<Currency />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'decimal')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Currency label="Label" value={123} />)

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
