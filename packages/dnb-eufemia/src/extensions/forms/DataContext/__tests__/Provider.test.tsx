import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Field } from '../../'
import DataContext from '../'
import { JSONSchema7 } from 'json-schema'

describe('DataContext.Provider', () => {
  it('should provide value with data', () => {
    const { rerender } = render(
      <DataContext.Provider data={{ foo: 'data-context-value' }}>
        <Field.String path="/foo" />
      </DataContext.Provider>
    )

    expect(
      screen.getByDisplayValue('data-context-value')
    ).toBeInTheDocument()

    rerender(
      <DataContext.Provider data={{ foo: 'data-context-changed-value' }}>
        <Field.String path="/foo" />
      </DataContext.Provider>
    )

    expect(
      screen.getByDisplayValue('data-context-changed-value')
    ).toBeInTheDocument()
  })

  it('should handle path change', () => {
    const { rerender } = render(
      <DataContext.Provider data={{ foo: 'data-context-value' }}>
        <Field.String path="/foo" />
      </DataContext.Provider>
    )

    expect(
      screen.getByDisplayValue('data-context-value')
    ).toBeInTheDocument()

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
      >
        <Field.String path="/fooBar" />
      </DataContext.Provider>
    )

    expect(
      screen.getByDisplayValue('data-context-changed-value')
    ).toBeInTheDocument()
  })

  it('should call "onChange" on value change', () => {
    const onChange = jest.fn()

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onChange={onChange}
      >
        <Field.String path="/foo" value="Value" />
      </DataContext.Provider>
    )

    const element = document.querySelector('input')

    fireEvent.change(element, {
      target: { value: 'New Value' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onChange={onChange}
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
      </DataContext.Provider>
    )

    fireEvent.change(element, {
      target: { value: 'Second Value' },
    })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith({ fooBar: 'Second Value' })
  })

  it('should call "onPathChange" on path change', () => {
    const onPathChange = jest.fn()

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onPathChange={onPathChange}
      >
        <Field.String path="/foo" value="Value" />
      </DataContext.Provider>
    )

    const element = document.querySelector('input')

    fireEvent.change(element, {
      target: { value: 'New Value' },
    })

    expect(onPathChange).toHaveBeenCalledTimes(1)
    expect(onPathChange).toHaveBeenCalledWith('/foo', 'New Value')

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onPathChange={onPathChange}
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
      </DataContext.Provider>
    )

    fireEvent.change(element, {
      target: { value: 'Second Value' },
    })

    expect(onPathChange).toHaveBeenCalledTimes(2)
    expect(onPathChange).toHaveBeenCalledWith('/fooBar', 'Second Value')
  })

  it('should call "onSubmit" on submit', () => {
    const onSubmit = jest.fn()

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    const inpuptElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.change(inpuptElement, {
      target: { value: 'New Value' },
    })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'New Value' })

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    fireEvent.change(inpuptElement, {
      target: { value: 'Second Value' },
    })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith({ fooBar: 'Second Value' })
  })

  it('should call "onSubmitRequest" on invalid submit', () => {
    const onSubmitRequest = jest.fn()

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onSubmitRequest={onSubmitRequest}
      >
        <Field.Number path="/foo" minimum={3} />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    const inpuptElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.change(inpuptElement, {
      target: { value: '1' },
    })
    fireEvent.click(submitElement)

    expect(onSubmitRequest).toHaveBeenCalledTimes(1)
    expect(onSubmitRequest).toHaveBeenCalledWith()

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onSubmitRequest={onSubmitRequest}
      >
        <Field.Number path="/fooBar" minimum={3} />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    fireEvent.change(inpuptElement, {
      target: { value: '2' },
    })
    fireEvent.click(submitElement)

    expect(onSubmitRequest).toHaveBeenCalledTimes(2)
    expect(onSubmitRequest).toHaveBeenCalledWith()
  })

  it('should call "onSubmitRequest" on invalid submit set by a schema', () => {
    const onSubmitRequest = jest.fn()

    const TestdataSchema: JSONSchema7 = {
      type: 'object',
      properties: {
        foo: { type: 'number', minimum: 3 },
      },
    }

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onSubmitRequest={onSubmitRequest}
        schema={TestdataSchema}
      >
        <Field.Number path="/foo" />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    const inpuptElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.change(inpuptElement, {
      target: { value: '1' },
    })
    fireEvent.click(submitElement)

    expect(onSubmitRequest).toHaveBeenCalledTimes(1)
    expect(onSubmitRequest).toHaveBeenCalledWith()

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onSubmitRequest={onSubmitRequest}
        schema={TestdataSchema}
      >
        <Field.Number path="/fooBar" required />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    fireEvent.change(inpuptElement, {
      target: { value: '2' },
    })
    fireEvent.click(submitElement)

    expect(onSubmitRequest).toHaveBeenCalledTimes(2)
    expect(onSubmitRequest).toHaveBeenCalledWith()
  })

  it('should scroll on top when "scrollTopOnSubmit" is true', () => {
    const onSubmit = jest.fn()
    const scrollTo = jest.fn()

    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/foo" value="Value" />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    const inpuptElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.change(inpuptElement, {
      target: { value: 'New Value' },
    })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'New Value' })
    expect(scrollTo).toHaveBeenCalledTimes(1)

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'data-context-changed-value' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
        <DataContext.SubmitButton>Submit</DataContext.SubmitButton>
      </DataContext.Provider>
    )

    fireEvent.change(inpuptElement, {
      target: { value: 'Second Value' },
    })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith({ fooBar: 'Second Value' })
    expect(scrollTo).toHaveBeenCalledTimes(2)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })
  })
})
