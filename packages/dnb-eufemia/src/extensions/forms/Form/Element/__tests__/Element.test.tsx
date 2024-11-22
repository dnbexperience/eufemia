/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, DataContext, Field } from '../../..'

describe('Form.Element', () => {
  it('should call "onSubmit"', () => {
    const onSubmitElement = jest.fn()

    render(
      <Form.Element onSubmit={onSubmitElement}>
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmitElement).toHaveBeenCalledTimes(1)

    fireEvent.click(buttonElement)

    expect(onSubmitElement).toHaveBeenCalledTimes(2)

    expect(onSubmitElement).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'submit', target: inputElement })
    )
  })

  it('should call "onSubmit" from Provider at the same time', () => {
    const onSubmit = jest.fn()
    const onSubmitElement = jest.fn()

    render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Form.Element onSubmit={onSubmitElement}>
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Form.Element>
      </DataContext.Provider>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )
    expect(onSubmitElement).toHaveBeenCalledTimes(1)

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )
    expect(onSubmitElement).toHaveBeenCalledTimes(2)

    expect(onSubmitElement).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'submit', target: inputElement })
    )
  })

  it('should call preventDefault', () => {
    const preventDefault = jest.fn()
    const onSubmitElement = jest.fn(preventDefault)

    render(
      <Form.Element onSubmit={onSubmitElement}>
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onSubmitElement).toHaveBeenCalledTimes(1)

    fireEvent.click(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onSubmitElement).toHaveBeenCalledTimes(2)
  })

  it('should default to form element', () => {
    render(
      <Form.Element>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const formElement = document.querySelector('.dnb-forms-form')

    expect(formElement.tagName).toBe('FORM')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Element className="custom-class">
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
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
      <Form.Element top="large">
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const formElement = document.querySelector('form')

    expect(formElement.classList).toContain('dnb-space__top--large')
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Element aria-label="Aria Label">
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const formElement = document.querySelector('form')
    const attributes = Array.from(formElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-label'])
    expect(formElement.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should ensure that only a string can be set as the id', () => {
    const myId = () => null
    render(
      // @ts-expect-error
      <Form.Element id={myId}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const formElement = document.querySelector('form')
    expect(formElement).not.toHaveAttribute('id')
  })
})
