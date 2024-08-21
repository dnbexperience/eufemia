import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

describe('Value.Selection', () => {
  it('renders value', () => {
    render(<Value.Selection value="Bankaxept" />)

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Bankaxept')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.Selection showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(<Value.Selection label="My selections" value="Visa" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Visa')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.Selection label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Selection placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'Mastercard' }}>
        <Value.Selection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Mastercard')
  })
})
