import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.OrganizationNumber', () => {
  it('should render value', () => {
    render(<Value.OrganizationNumber value="123456789" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })

  it('should render label when showEmpty is true', () => {
    render(<Value.OrganizationNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.OrganizationNumber.label
    )
  })

  it('should render value and label', () => {
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

  it('should render custom label', () => {
    render(<Value.OrganizationNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('should render placeholder', () => {
    render(<Value.OrganizationNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('should render value from path', () => {
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

  it('should not render when value is null', () => {
    render(<Value.OrganizationNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('should not render when value is undefined', () => {
    render(<Value.OrganizationNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })
})
