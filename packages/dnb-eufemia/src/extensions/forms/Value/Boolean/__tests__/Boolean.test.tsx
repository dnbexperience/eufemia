import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.Boolean', () => {
  it('renders positive value', () => {
    render(<Value.Boolean value={true} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent(nb.BooleanField.yes)
  })

  it('renders negative value', () => {
    render(<Value.Boolean value={false} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent(nb.BooleanField.no)
  })

  it('renders positive trueText', () => {
    render(<Value.Boolean value={true} trueText="True Text" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('True Text')
  })

  it('renders negative falseText', () => {
    render(<Value.Boolean value={false} falseText="False Text" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('False Text')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.Boolean label="The Label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'The Label'
    )
  })

  it('renders value and label', () => {
    render(<Value.Boolean label="The Label" value={true} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent(nb.BooleanField.yes)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'The Label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Boolean placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    const { rerender } = render(
      <Form.Handler data={{ myPath: true }}>
        <Value.Boolean path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent(nb.BooleanField.yes)

    rerender(
      <Form.Handler data={{ myPath: false }}>
        <Value.Boolean path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-boolean .dnb-forms-value-block__content'
      )
    ).toHaveTextContent(nb.BooleanField.no)
  })
})
