import React from 'react'
import { render } from '@testing-library/react'
import BankAccountNumber, { Props } from '..'

describe('Field.ArraySelection', () => {
  it('should render with props', () => {
    const props: Props = {}

    render(<BankAccountNumber {...props} />)

    const component = document.querySelector(
      '.dnb-forms-field-bank-account-number'
    )

    expect(component).toBeInTheDocument()
  })

  it('should have numeric input mode', () => {
    render(<BankAccountNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode')
    expect(input.getAttribute('inputmode')).toBe('numeric')
  })
})
