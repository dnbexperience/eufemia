import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, Field } from '../../..'
import { Provider } from '../../../../../shared'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

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
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
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
      <Form.Handler>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement.type).toBe('submit')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Handler>
        <Form.SubmitButton className="custom-class">
          Submit
        </Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    expect(Array.from(buttonElement.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-button--has-text',
      'dnb-forms-submit-button',
      'custom-class',
    ])
  })

  it('should have default text', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Send')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <Form.SubmitButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Send')
  })

  it('should support custom text', () => {
    render(<Form.SubmitButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be primary variant', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveClass('dnb-button--primary')
  })

  it('should have "text" by default', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.textContent).toBe('‌' + nb.SubmitButton.text)
  })

  it('should have "sendText" when variant is "send"', () => {
    render(<Form.SubmitButton variant="send" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.textContent).toBe('‌' + nb.SubmitButton.sendText)
  })

  it('should have "send" icon when variant is "send"', () => {
    render(<Form.SubmitButton variant="send" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'send icon'
    )
  })

  it('should have no icon', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.querySelector('.dnb-icon')).toBeNull()
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Handler>
        <Form.SubmitButton aria-label="Aria Label">
          Submit
        </Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')
    const attributes = Array.from(buttonElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'type', 'aria-label'])
    expect(buttonElement.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should show submit indicator when showIndicator is true', () => {
    const { rerender } = render(<Form.SubmitButton showIndicator />)

    const buttonElement = document.querySelector('button')

    expect(
      buttonElement.querySelector(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toBeTruthy()

    rerender(<Form.SubmitButton />)

    expect(
      document.querySelector('.dnb-forms-submit-indicator--state-pending')
    ).toBeNull()
  })

  it('should contain submit indicator and its aria features', () => {
    const { rerender } = render(<Form.SubmitButton />)

    const buttonElement = document.querySelector('button')
    const indicatorElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator'
    )
    const indicatorContentElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(indicatorElement).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    rerender(<Form.SubmitButton showIndicator />)

    expect(buttonElement).toHaveTextContent('Send...')
    expect(indicatorElement).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
    expect(indicatorContentElement).toHaveAttribute('role', 'status')
    expect(indicatorContentElement).toHaveAttribute(
      'aria-label',
      nb.SubmitIndicator.label
    )
  })

  it('should support custom text with submit indicator', () => {
    const { rerender } = render(<Form.SubmitButton text="Save" />)

    const buttonElement = document.querySelector('button')
    const indicatorElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator'
    )

    expect(indicatorElement).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    rerender(<Form.SubmitButton text="Save" showIndicator />)

    expect(buttonElement).toHaveTextContent('Save...')
    expect(indicatorElement).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
  })
})
