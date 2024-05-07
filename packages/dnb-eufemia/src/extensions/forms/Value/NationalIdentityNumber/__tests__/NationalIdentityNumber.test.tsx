import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.NationalIdentityNumber', () => {
  it('renders value', () => {
    render(<Value.NationalIdentityNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.NationalIdentityNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.NationalIdentityNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.NationalIdentityNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.NationalIdentityNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.NationalIdentityNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.NationalIdentityNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '20001234567' }}>
        <Value.NationalIdentityNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
  })
})
