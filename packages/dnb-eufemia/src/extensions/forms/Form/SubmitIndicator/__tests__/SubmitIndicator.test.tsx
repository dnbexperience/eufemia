import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, Field } from '../../..'

describe('Form.SubmitIndicator', () => {
  it('should set custom "className"', () => {
    render(
      <Form.Element>
        <Form.SubmitIndicator className="custom-class" state={undefined} />
      </Form.Element>
    )

    const buttonElement = document.querySelector(
      '.dnb-form-submit-indicator'
    )

    expect(Array.from(buttonElement.classList)).toEqual([
      'dnb-space',
      'dnb-form-submit-indicator',
      'custom-class',
    ])
  })
})
