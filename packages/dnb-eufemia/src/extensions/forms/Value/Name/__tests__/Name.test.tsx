import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.Name', () => {
  it('renders value', () => {
    render(<Value.Name value="Nora" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Nora')
  })

  it('renders no label by default', () => {
    render(<Value.Name showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toBeNull()
  })

  it('renders custom label', () => {
    render(<Value.Name label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders custom className', () => {
    render(<Value.Name label="Label" showEmpty className="custom-class" />)
    expect(document.querySelector('.dnb-forms-value-string')).toHaveClass(
      'custom-class'
    )
  })

  it('renders FirstName label', () => {
    render(<Value.Name.First showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.FirstName.label
    )
  })

  it('renders LastName label', () => {
    render(<Value.Name.Last showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.LastName.label
    )
  })

  it('renders CompanyName label', () => {
    render(<Value.Name.Company showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.CompanyName.label
    )
  })

  it('renders placeholder', () => {
    render(<Value.Name placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'Nora' }}>
        <Value.Name path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Nora')
  })
})
