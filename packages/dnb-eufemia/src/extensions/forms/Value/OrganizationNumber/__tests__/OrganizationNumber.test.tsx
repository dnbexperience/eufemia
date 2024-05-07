import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.OrganizationNumber', () => {
  it('renders value', () => {
    render(<Value.OrganizationNumber value="123456789" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.OrganizationNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.OrganizationNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.OrganizationNumber value="123456789" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.OrganizationNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.OrganizationNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.OrganizationNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '123456789' }}>
        <Value.OrganizationNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })
})
