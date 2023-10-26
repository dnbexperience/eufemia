import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Form, Field } from '../../..'
import type { Props as StringProps } from '../../../Field/String'
import userEvent from '@testing-library/user-event'

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

  it('string renders autocomplete from context if a path was given', () => {
    const { rerender } = render(
      <Form.Handler autoComplete>
        <Field.String path="/firstName" />
      </Form.Handler>
    )
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('on')
    expect(document.querySelector('input').getAttribute('name')).toBe(
      'firstName'
    )

    rerender(
      <Form.Handler autoComplete>
        <Field.String path="/firstName" autoComplete="family-name" />
      </Form.Handler>
    )
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('family-name')
    expect(document.querySelector('input').getAttribute('name')).toBe(
      'firstName'
    )
  })

  it('should call HTMLFormElement.reset on submit', () => {
    const onSubmit = jest.fn()
    const reset = jest.fn()

    const MockComponent = (props: StringProps) => {
      return <Field.String {...props} />
    }

    render(
      <Form.Handler data={{}} onSubmit={onSubmit}>
        <MockComponent path="/foo" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    const inpuptElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    jest.spyOn(formElement, 'reset').mockImplementationOnce(reset)

    fireEvent.change(inpuptElement, { target: { value: 'New Value' } })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'New Value' })
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it('should store data to session storage when sessionStorageId is provided, but only after changes', async () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.sessionStorage),
      'setItem'
    )

    render(
      <Form.Handler
        defaultData={{ foo: 'original' }}
        sessionStorageId="test-data"
      >
        <Field.String path="/foo" />
      </Form.Handler>
    )

    expect(setItem).not.toHaveBeenCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original123',
      })
    )

    const inputElement = document.querySelector('input')
    await userEvent.type(inputElement, '123')

    expect(setItem).toHaveBeenCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original1',
      })
    )
    expect(setItem).toHaveBeenCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original12',
      })
    )
    expect(setItem).toHaveBeenCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original123',
      })
    )

    setItem.mockRestore()
    window.sessionStorage.removeItem('test-data')
  })

  it('should reset sessionStorage on submit', async () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.sessionStorage),
      'setItem'
    )

    render(
      <Form.Handler
        defaultData={{ foo: 'original' }}
        sessionStorageId="test-data"
      >
        <Field.String path="/foo" />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    await userEvent.type(inputElement, '123')

    expect(setItem).toHaveBeenLastCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original123',
      })
    )
    expect(window.sessionStorage.getItem('test-data')).toEqual(
      JSON.stringify({
        foo: 'original123',
      })
    )

    const buttonElement = document.querySelector('button')
    fireEvent.click(buttonElement)

    expect(window.sessionStorage.getItem('test-data')).toBe(null)

    setItem.mockRestore()
  })
})
