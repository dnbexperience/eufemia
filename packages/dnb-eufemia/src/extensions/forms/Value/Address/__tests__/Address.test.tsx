import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.Address', () => {
  it('renders value', () => {
    render(<Value.Address value="Dronning Eufemias gate 30" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Dronning Eufemias gate 30')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.Address showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Address.label
    )
  })

  it('renders value and label', () => {
    render(<Value.Address value="Dronning Eufemias gate 30" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Dronning Eufemias gate 30')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Address.label
    )
  })

  it('renders custom label', () => {
    render(<Value.Address label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Address placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'Dronning Eufemias gate 30' }}>
        <Value.Address path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Dronning Eufemias gate 30')
  })
})
