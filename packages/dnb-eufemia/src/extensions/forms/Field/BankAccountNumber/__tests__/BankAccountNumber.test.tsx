import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { Props } from '..'
import { Field } from '../../..'

describe('Field.BankAccountNumber', () => {
  it('should render with props', () => {
    const props: Props = {}

    render(<Field.BankAccountNumber {...props} />)

    const component = document.querySelector(
      '.dnb-forms-field-bank-account-number'
    )

    expect(component).toBeInTheDocument()
  })

  it('should have numeric input mode', () => {
    render(<Field.BankAccountNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'numeric')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Field.BankAccountNumber value="12345678" />)

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
