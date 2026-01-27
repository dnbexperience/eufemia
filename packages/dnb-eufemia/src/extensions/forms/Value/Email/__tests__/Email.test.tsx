import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.Email', () => {
  it('should render value', () => {
    render(<Value.Email value="user@example.com" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('user@example.com')
  })

  it('should render label when showEmpty is true', () => {
    render(<Value.Email showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Email.label
    )
  })

  it('should render value and label', () => {
    render(<Value.Email value="user@example.com" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('user@example.com')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Email.label
    )
  })

  it('should render custom label', () => {
    render(<Value.Email label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('should render placeholder', () => {
    render(<Value.Email placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('should render value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'user@example.com' }}>
        <Value.Email path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('user@example.com')
  })
})
