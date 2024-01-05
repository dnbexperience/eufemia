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

  it('should allow rightAligned', () => {
    render(<Currency value={123} rightAligned />)

    const element = document.querySelector('.dnb-input')
    expect(element.className).toContain('dnb-input__align--right')
  })

  it('should have decimal input mode', () => {
    render(<Currency />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'decimal')
  })

  it('should validate with ARIA rules', async () => {
    const element = render(<Currency label="Label" value={123} />)

    expect(await axeComponent(element)).toHaveNoViolations()
  })
})
