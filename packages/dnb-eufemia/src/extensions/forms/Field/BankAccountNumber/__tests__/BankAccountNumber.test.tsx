import React from 'react'
import { render } from '@testing-library/react'
import BankAccountNumber, { Props } from '..'

describe('Field.ArraySelection', () => {
  it('should render with props', () => {
    const props: Props = {}

    render(<BankAccountNumber {...props} />)

    const input = document.querySelector(
      '.dnb-forms-field-bank-account-number'
    )

    expect(input).toBeInTheDocument()
  })

  it('should have numeric input mode', () => {
    render(<BankAccountNumber />)

    const input = document
      .querySelector('.dnb-forms-field-bank-account-number')
      .querySelector('input')

    expect(input).toHaveAttribute('inputmode')
    expect(input.getAttribute('inputmode')).toBe('numeric')
  })
})
