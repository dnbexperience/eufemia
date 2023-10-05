import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, Field } from '../../..'

describe('Form.Handler', () => {
  it('should call "onSubmit"', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inpuptElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inpuptElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'data-context-value' })

    fireEvent.change(inpuptElement, { target: { value: 'New Value' } })
    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'New Value' })
  })

  it('should call "onSubmit" from Provider at the same time', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inpuptElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inpuptElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'data-context-value' })

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'data-context-value' })
  })

  it('should call preventDefault', () => {
    const preventDefault = jest.fn()
    const onSubmit = jest.fn(preventDefault)

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inpuptElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inpuptElement)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.click(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should default to form element', () => {
    render(
      <Form.Handler data={{ foo: 'data-context-value' }}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('.dnb-forms-form')

    expect(formElement.tagName).toBe('FORM')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        className="custom-class"
      >
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')

    expect(Array.from(formElement.classList)).toEqual([
      'dnb-space',
      'dnb-forms-form',
      'custom-class',
    ])
  })

  it('should handle spacing prop', () => {
    render(
      <Form.Handler data={{ foo: 'data-context-value' }} top="large">
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')

    expect(formElement.classList).toContain('dnb-space__top--large')
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        aria-label="Aria Label"
      >
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    const attributes = Array.from(formElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-label'])
    expect(formElement.getAttribute('aria-label')).toBe('Aria Label')
  })
})
