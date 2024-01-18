import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Form, Field } from '../../..'
import type { Props as StringFieldProps } from '../../../Field/String'
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

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )

    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
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

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )
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

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

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

  it('should call HTMLFormElement.reset on "resetForm" call', () => {
    const onSubmit = jest.fn((data, { resetForm }) => {
      resetForm()
    })
    const onChange = jest.fn()
    const reset = jest.fn()

    const MockComponent = (props: StringFieldProps) => {
      return <Field.String {...props} />
    }

    render(
      <Form.Handler data={{}} onSubmit={onSubmit} onChange={onChange}>
        <MockComponent path="/foo" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    const inputElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    jest.spyOn(formElement, 'reset').mockImplementationOnce(reset)

    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })
    expect(reset).toHaveBeenCalledTimes(1)
    expect(inputElement.value).toBe('New Value')
  })

  it('should empty whole data set "clearData" call', () => {
    const onSubmit = jest.fn((data, { clearData }) => {
      clearData()
    })
    const onChange = jest.fn()

    const MockComponent = (props: StringFieldProps) => {
      return <Field.String {...props} />
    }

    render(
      <Form.Handler data={{}} onSubmit={onSubmit} onChange={onChange}>
        <MockComponent path="/foo" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    fireEvent.click(submitElement)

    expect(inputElement.value).toBe('')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })
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

  it('should reset sessionStorage on "resetForm" call', async () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.sessionStorage),
      'setItem'
    )
    const onSubmit = jest.fn((data, { resetForm }) => {
      resetForm()
    })

    render(
      <Form.Handler
        defaultData={{ foo: 'original' }}
        sessionStorageId="test-data"
        onSubmit={onSubmit}
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

  it('should show errors if form is invalid on submit', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String value="" required />
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    fireEvent.submit(formElement)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should include values from fields in data, without any change', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler data={{ foo: 'bar' }} onSubmit={onSubmit}>
        <Field.String path="/other" value="include this" />
        <Form.SubmitButton />
      </Form.Handler>,
      { wrapper: React.StrictMode }
    )

    const buttonElement = document.querySelector('button')
    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'bar', other: 'include this' },
      expect.anything()
    )
  })
})
