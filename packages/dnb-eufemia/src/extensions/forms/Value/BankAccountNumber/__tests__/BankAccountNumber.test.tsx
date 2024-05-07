import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.BankAccountNumber', () => {
  it('renders value', () => {
    render(<Value.BankAccountNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.BankAccountNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.BankAccountNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.BankAccountNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.BankAccountNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.BankAccountNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.BankAccountNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '20001234567' }}>
        <Value.BankAccountNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
  })
})
