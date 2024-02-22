import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, Field } from '../../..'

describe('Form.SubmitButton', () => {
  it('should call "onSubmit" on form element', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Element onSubmit={onSubmit}>
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.submit(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'submit', target: buttonElement })
    )
  })

  it('should call preventDefault', () => {
    const preventDefault = jest.fn()
    const onSubmit = jest.fn(preventDefault)

    render(
      <Form.Element onSubmit={onSubmit}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')

    fireEvent.click(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.submit(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should default to button element with type of submit', () => {
    render(
      <Form.Element>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')

    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement.type).toBe('submit')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Element>
        <Form.SubmitButton className="custom-class">
          Submit
        </Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')

    expect(Array.from(buttonElement.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-button--has-text',
      'dnb-forms-submit-button',
      'custom-class',
      'dnb-button--icon-position-left',
      'dnb-button--has-icon',
    ])
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Element>
        <Form.SubmitButton aria-label="Aria Label">
          Submit
        </Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')
    const attributes = Array.from(buttonElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'type', 'aria-label'])
    expect(buttonElement.getAttribute('aria-label')).toBe('Aria Label')
  })
})
