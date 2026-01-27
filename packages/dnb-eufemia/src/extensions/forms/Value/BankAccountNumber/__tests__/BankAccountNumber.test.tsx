import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.BankAccountNumber', () => {
  it('should render value', () => {
    render(<Value.BankAccountNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('2000 12 34567')
  })

  it('should render label when showEmpty is true', () => {
    render(<Value.BankAccountNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.BankAccountNumber.label
    )
  })

  it('should render value and label', () => {
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

  it('should render custom label', () => {
    render(<Value.BankAccountNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('should render placeholder', () => {
    render(<Value.BankAccountNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('should render value from path', () => {
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

  it('should not render when value is null', () => {
    render(<Value.BankAccountNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('should not render when value is undefined', () => {
    render(<Value.BankAccountNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })
})
