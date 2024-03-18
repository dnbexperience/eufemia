import React, { StrictMode, createRef, useContext, useEffect } from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import {
  Form,
  DataContext,
  Field,
  JSONSchema,
  Ajv,
  OnChange,
  OnChangeValue,
} from '../../../'
import { Props as StringFieldProps } from '../../../Field/String'
import { ContextState, FilterData } from '../../Context'
import { debounceAsync } from '../../../../../shared/helpers/debounce'
import { wait } from '../../../../../core/jest/jestSetup'

import nbNO from '../../../../../shared/locales/nb-NO'
const nb = nbNO['nb-NO'].Forms

function TestField(props: StringFieldProps) {
  return <Field.String {...props} validateInitially continuousValidation />
}

describe('DataContext.Provider', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  describe('props', () => {
    it('should provide value from defaultData but ignore changes', () => {
      const { rerender } = render(
        <DataContext.Provider defaultData={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider defaultData={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('original')
    })

    it('should provide value from data and update based on changes', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('changed')
    })

    it('should handle path change', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider data={{ fooBar: 'changed' }}>
          <Field.String path="/fooBar" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('changed')
    })

    it('should call "onChange" on internal value change', () => {
      const onChange = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
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
          data={{ fooBar: 'changed-value' }}
          onChange={onChange}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
        </DataContext.Provider>
      )

      fireEvent.change(element, {
        target: { value: 'Second Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith({ fooBar: 'Second Value' })
    })

    it('should update data context with initially given "value"', () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <DataContext.Provider
          data={{ other: 'original' }}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Field.String path="/foo" value="include this" />
          <Form.SubmitButton />
        </DataContext.Provider>,
        { wrapper: StrictMode }
      )

      const element = document.querySelector('input')
      const button = document.querySelector('button')

      fireEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { foo: 'include this', other: 'original' },
        expect.anything()
      )

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        foo: 'New Value',
        other: 'original',
      })
    })

    it('should work without any data provided, using an empty object as default when pointing to an object subkey', () => {
      const onChange = jest.fn()

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String path="/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })
    })

    it('should work without any data provided, using an empty array as default when pointing to an array index subkey', () => {
      const onChange = jest.fn()

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String path="/0/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ foo: 'New Value' }])
    })

    it('should call async "onPathChange" on path change', () => {
      const onPathChange = jest.fn(async () => null)

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
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
          data={{ fooBar: 'changed' }}
          onPathChange={onPathChange}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
        </DataContext.Provider>
      )

      fireEvent.change(element, {
        target: { value: 'Second Value' },
      })

      expect(onPathChange).toHaveBeenCalledTimes(2)
      expect(onPathChange).toHaveBeenLastCalledWith(
        '/fooBar',
        'Second Value'
      )
    })

    it('should call "onSubmit" on submit', () => {
      const onSubmit = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmit={onSubmit}
        >
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: 'New Value' },
      })
      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { foo: 'New Value' },
        expect.anything()
      )

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmit={onSubmit}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      fireEvent.change(inputElement, {
        target: { value: 'Second Value' },
      })
      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { fooBar: 'Second Value' },
        expect.anything()
      )
    })

    it('should filter data based in the given "filterData" property method', () => {
      let filteredData = undefined
      const onSubmit = jest.fn((data) => (filteredData = data))

      const filterDataHandler: FilterData = jest.fn(
        (path, value, props) => {
          if (props.disabled === true) {
            return false
          }
        }
      )

      const { rerender } = render(
        <DataContext.Provider
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/foo" value="Include this value" />
          <Field.String path="/bar" value="bar" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { bar: 'bar', foo: 'Include this value' },
        expect.anything()
      )

      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        1,
        '/foo',
        'Include this value',
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        2,
        '/bar',
        'bar',
        expect.anything()
      )

      rerender(
        <DataContext.Provider
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/foo" value="Skip this value" disabled />
          <Field.String path="/bar" value="bar value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      expect(filteredData).toEqual({
        bar: 'bar',
        foo: 'Include this value',
      })

      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { bar: 'bar value' },
        expect.anything()
      )

      expect(filterDataHandler).toHaveBeenCalledTimes(4)
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        3,
        '/foo',
        'Skip this value',
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        4,
        '/bar',
        'bar value',
        expect.anything()
      )

      expect(filteredData).toEqual({ bar: 'bar value' })
    })

    it('should call "onSubmitRequest" on invalid submit', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const onSubmitRequest = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/foo" minimum={3} />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: '1' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledWith()

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/fooBar" minimum={3} />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      fireEvent.change(inputElement, {
        target: { value: '2' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(2)
      expect(onSubmitRequest).toHaveBeenLastCalledWith()

      log.mockRestore()
    })
  })

  describe('async submit', () => {
    let log: jest.SpyInstance
    beforeEach(() => {
      const originalConsoleLog = console.log
      log = jest.spyOn(console, 'log').mockImplementation((...message) => {
        if (!message[0].includes('Eufemia')) {
          originalConsoleLog(...message)
        }
      })
    })
    afterEach(() => {
      log.mockRestore()
    })

    const UseContext = ({
      result,
    }: {
      result: React.MutableRefObject<ContextState>
    }) => {
      result.current = useContext(DataContext.Context)
      return null
    }

    it('should emit onSubmitComplete with data state object and return value when submit is completed', async () => {
      const onSubmit = async () => {
        return { status: 'pending' } as const
      }
      const onSubmitComplete = jest.fn(async () => null)

      render(
        <DataContext.Provider
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      await userEvent.type(inputElement, ' changed')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: 'Value changed' },
          { status: 'pending' }
        )
      })
    })

    it('should keep form in pending state when onSubmitComplete returns status of pending', async () => {
      const onSubmit = async () => {
        return { info: 'Info message' } as const
      }
      const onSubmitComplete = jest.fn(async () => {
        return { status: 'pending' } as const
      })

      render(
        <DataContext.Provider
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String path="/foo" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const indicator = submitButton.querySelector(
        '.dnb-form-submit-indicator'
      )

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: undefined },
          { info: 'Info message' }
        )
      })

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
      })
    })

    it('should evaluate long validator and onBlurValidator before continue with async onSubmit', async () => {
      const eventsStart = []
      const eventsEnd = []

      const onSubmit = async () => {
        eventsStart.push('onSubmit')

        await wait(1)

        eventsEnd.push('onSubmit')
      }

      const onChangeForm: OnChange<{ myField: string }> = async () => {
        eventsStart.push('onChangeForm')

        await wait(2)

        eventsEnd.push('onChangeForm')
      }

      const onChangeField: OnChangeValue = async () => {
        eventsStart.push('onChangeField')

        await wait(3)

        eventsEnd.push('onChangeField')
      }

      const validator = async () => {
        eventsStart.push('validator')

        await wait(10)

        eventsEnd.push('validator')
      }

      const onBlurValidator = async () => {
        eventsStart.push('onBlurValidator')

        await wait(20)

        eventsEnd.push('onBlurValidator')
      }

      render(
        <DataContext.Provider onSubmit={onSubmit} onChange={onChangeForm}>
          <Field.String
            value="vali"
            path="/myField"
            validator={validator}
            onBlurValidator={onBlurValidator}
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      await userEvent.type(input, 'd')

      expect(eventsStart).toEqual([
        'validator',
        'onChangeForm',
        'onChangeField',
      ])

      await userEvent.click(button)

      await wait(100)

      expect(eventsStart).toEqual([
        'validator',
        'onChangeForm',
        'onChangeField',
        'onBlurValidator',
        'validator',
        'onBlurValidator',
        'onSubmit',
      ])
      expect(eventsEnd).toEqual([
        'validator',
        'onChangeForm',
        'onChangeField',
        'onBlurValidator',
        'validator',
        'onBlurValidator',
        'onSubmit',
      ])
    })

    it('should evaluate sync validation, such as required, before continue with async validation', async () => {
      const onSubmit = jest.fn(async () => {
        return { info: 'Info message' } as const
      })
      const validator = jest.fn(async (value) => {
        if (value === 'validator-error') {
          return new Error('validator-error')
        }
      })
      const onBlurValidator = jest.fn(async (value) => {
        if (value === 'onBlurValidator-error') {
          return new Error('onBlurValidator-error')
        }
      })

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <Field.String
            path="/foo"
            validator={validator}
            onBlurValidator={onBlurValidator}
            required
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const input = document.querySelector('input')
      const indicator = submitButton.querySelector(
        '.dnb-form-submit-indicator'
      )

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent(nb.inputErrorRequired)
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'validator-error' },
      })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('validator-error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onBlurValidator-error' },
      })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toBeNull()
      })

      fireEvent.blur(input)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenCalledTimes(2)
      })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenCalledTimes(2)
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onBlurValidator-error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'valid value' },
      })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toBeNull()
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenCalledTimes(3)
      })
    })

    it('should set "formState" to "pending" when "validator" is async', async () => {
      const result = createRef<ContextState>()
      const validator = async () => {
        return new Error('My error')
      }

      const { rerender } = render(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String validator={validator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })

      const syncValidator = () => {
        return new Error('My error')
      }

      rerender(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String validator={syncValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should set "formState" to "pending" when "onBlurValidator" is async', async () => {
      const result = createRef<ContextState>()
      const onBlurValidator = async () => {
        return new Error('My error')
      }

      const { rerender } = render(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onBlurValidator={onBlurValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })

      const syncValidator = () => {
        return new Error('My error')
      }

      rerender(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onBlurValidator={syncValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should set "formState" to "pending" when when "onSubmit" is async', async () => {
      const result = createRef<ContextState>()
      const onSubmit = async () => null

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <UseContext result={result} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should show submit indicator during submit when "onSubmit" is used', async () => {
      const result = createRef<ContextState>()
      const onSubmit = async () => null

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <UseContext result={result} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })
  })

  describe('async change', () => {
    it('should not disable form elements on changes', async () => {
      const onChange: OnChange = async () => null

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const button = document.querySelector('button')
      const input = document.querySelector('input')

      await userEvent.click(button)
      await userEvent.type(input, '123')

      expect(button).not.toBeDisabled()
      expect(input).not.toBeDisabled()
    })

    it('should show indicator on label while pending', async () => {
      const onChange: OnChange = async () => {
        return null
      }

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        'label .dnb-form-submit-indicator'
      )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      expect(indicator).toHaveTextContent('My label...')
      expect(indicator).toHaveClass(
        'dnb-form-submit-indicator--state-pending'
      )

      await waitFor(() => {
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-complete'
        )
      })
    })

    it('should show success indicator on label when success returned', async () => {
      const onChange: OnChange = async () => {
        return { success: 'saved' } as const
      }

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        'label .dnb-form-submit-indicator'
      )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      expect(indicator).toHaveTextContent('My label...')
      expect(indicator).toHaveClass(
        'dnb-form-submit-indicator--state-pending'
      )

      await waitFor(() => {
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-success'
        )
      })
    })

    it('should fulfill first the form event before the field event', async () => {
      const events = []

      const onChangeForm: OnChange = async () => {
        events.push('onChangeForm')
      }
      const onChangeField: OnChangeValue = async () => {
        events.push('onChangeField')
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      await waitFor(() => {
        expect(events).toEqual(['onChangeForm', 'onChangeField'])
      })
    })

    it('should show error on the field from the event return when complete', async () => {
      const onChangeForm: OnChange = async ({ myField }) => {
        if (myField === 'onChangeForm-error') {
          return Error('onChangeForm-error')
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        if (value === 'onChangeField-error') {
          return Error('onChangeField-error')
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-error' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block [role="alert"]'
        )
        expect(status).toHaveTextContent('onChangeForm-error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-error' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block [role="alert"]'
        )
        expect(status).toHaveTextContent('onChangeField-error')
      })
    })

    it('should show status message on the field from the event return when complete', async () => {
      const onChangeForm: OnChange = async ({ myField }) => {
        if (myField === 'onChangeForm-info') {
          return { info: 'onChangeForm-info' }
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        if (value === 'onChangeField-warning') {
          return { warning: 'onChangeField-warning' }
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-info' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onChangeForm-info')
        expect(status).toHaveClass('dnb-form-status--info')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-warning' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onChangeField-warning')
        expect(status).toHaveClass('dnb-form-status--warn')
      })
    })

    it('should show all status messages on the field from the event return when complete', async () => {
      const onChangeForm: OnChange = async ({ myField }) => {
        return {
          info: 'onChangeForm-info',
          error:
            myField === 'onChangeForm-error' &&
            Error('onChangeForm-error'),
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        return {
          warning: 'onChangeField-warning',
          error:
            value === 'onChangeField-error' &&
            Error('onChangeField-error'),
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-error' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(2)
        expect(statusMessages[0]).toHaveTextContent('onChangeForm-error')
        expect(statusMessages[1]).toHaveTextContent('onChangeForm-info')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-error' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(3)
        expect(statusMessages[0]).toHaveTextContent('onChangeField-error')
        expect(statusMessages[1]).toHaveTextContent(
          'onChangeField-warning'
        )
        expect(statusMessages[2]).toHaveTextContent('onChangeForm-info')
      })
    })

    it('should fulfill async validator before the form and field event', async () => {
      const onChangeForm: OnChange = async ({ myField }) => {
        return {
          info: 'onChangeForm-info',
          error:
            myField === 'onChangeForm-error' &&
            Error('onChangeForm-error'),
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        return {
          warning: 'onChangeField-warning',
          error:
            value === 'onChangeField-error' &&
            Error('onChangeField-error'),
        }
      }
      const validator = debounceAsync(async (value) => {
        if (value === 'invalid') {
          return Error('My error')
        }
      })

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
            validator={validator}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'invalid' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(1)
        expect(statusMessages[0]).toHaveTextContent('My error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'valid' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(2)
        expect(statusMessages[0]).toHaveTextContent(
          'onChangeField-warning'
        )
        expect(statusMessages[1]).toHaveTextContent('onChangeForm-info')
      })
    })

    it('should show indicator during all async operations', async () => {
      const events = []

      const validator = debounceAsync(async () => {
        await wait(1)
        events.push('validator')
      })
      const onChangeForm: OnChange = async () => {
        await wait(2)
        events.push('onChangeForm')
      }
      const onChangeField: OnChangeValue = async () => {
        await wait(3)
        events.push('onChangeField')
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
            validator={validator}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        'label .dnb-form-submit-indicator'
      )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      await waitFor(() => {
        expect(indicator).toHaveTextContent('My label...')
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(events).toEqual(['validator'])
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(events).toEqual(['validator', 'onChangeForm'])
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(indicator).toHaveClass(
          'dnb-form-submit-indicator--state-complete'
        )
      })
    })
  })

  it('should scroll on top when "scrollTopOnSubmit" is true', async () => {
    const onSubmit = jest.fn()
    const scrollTo = jest.fn()

    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'original' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </DataContext.Provider>
    )

    const inputElement = document.querySelector('input')
    const submitButton = document.querySelector('button')

    fireEvent.change(inputElement, {
      target: { value: 'New Value' },
    })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledTimes(1)
    })

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'changed' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </DataContext.Provider>
    )

    fireEvent.change(inputElement, {
      target: { value: 'Second Value' },
    })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { fooBar: 'Second Value' },
      expect.anything()
    )
    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledTimes(2)
      expect(scrollTo).toHaveBeenLastCalledWith({
        behavior: 'smooth',
        top: 0,
      })
    })
  })

  describe('session storage', () => {
    it('should store data to session storage when sessionStorageId is provided, but only after changes', async () => {
      const setItem = jest.spyOn(
        Object.getPrototypeOf(window.sessionStorage),
        'setItem'
      )

      render(
        <DataContext.Provider
          defaultData={{ foo: 'original' }}
          sessionStorageId="test-data"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
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
    })

    it('should set initial data to data from session storage when sessionStorageId is provided', () => {
      window.sessionStorage.setItem(
        'sourcedata',
        JSON.stringify({
          lorem: 'Ipsum',
        })
      )

      render(
        <DataContext.Provider sessionStorageId="sourcedata">
          <Field.String path="/lorem" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('Ipsum')).toBeInTheDocument()
    })

    it('should throw error if both data and sessionStorageId is provided', () => {
      const errorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation()

      render(
        <DataContext.Provider
          data={{ foo: 'bar' }}
          sessionStorageId="sourcedata"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(errorSpy).toHaveBeenCalled()
      errorSpy.mockRestore()
    })
  })

  describe('error handling', () => {
    it('should show and hide error messages as expected', async () => {
      render(
        <DataContext.Provider>
          <Field.String
            label="Field 1"
            path="/foo"
            errorMessages={{
              required: 'Required string',
            }}
            required
          />
          <Field.String
            label="Field 2"
            value="abc"
            minLength={5}
            errorMessages={{
              minLength: 'Min 5 chars',
            }}
          />
          <Field.Number
            label="Field 3"
            errorMessages={{
              required: 'Required number',
            }}
            required
          />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const field2 = screen.queryByLabelText('Field 2')

      // Should not show any error messages before clicking submit when no fields has been touched
      expect(screen.queryAllByRole('alert').length).toEqual(0)

      expect(screen.queryByText('Required string')).not.toBeInTheDocument()
      expect(screen.queryByText('Min 5 chars')).not.toBeInTheDocument()
      expect(screen.queryByText('Required number')).not.toBeInTheDocument()

      fireEvent.click(submitButton)

      await waitFor(() => {
        // After clicking submit, all three fields should show errors
        expect(screen.queryAllByRole('alert').length).toEqual(3)

        expect(screen.getByText('Required string')).toBeInTheDocument()
        expect(screen.getByText('Min 5 chars')).toBeInTheDocument()
        expect(screen.getByText('Required number')).toBeInTheDocument()
      })

      // Writing in one field should remove that error, while keeping the others visible
      await act(async () => {
        await userEvent.type(field2, 'de')
      })

      expect(screen.queryAllByRole('alert').length).toEqual(2)

      expect(screen.getByText('Required string')).toBeInTheDocument()
      expect(screen.queryByText('Min 5 chars')).not.toBeInTheDocument()
      expect(screen.getByText('Required number')).toBeInTheDocument()
    })

    it('should show errors for fields with no path-prop after clicking submit', async () => {
      // Make sure it still sets internal showAllError states, even if there is no fields with path triggering it
      render(
        <DataContext.Provider>
          <Field.String required />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      fireEvent.click(submitButton)

      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    describe('error messages', () => {
      it('should display custom pattern error message from provider', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              pattern: 'pattern provider error',
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'pattern provider error'
        )
      })

      it('should display custom pattern error message from provider with json pointer', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              pattern: 'pattern provider error',
              '/myKey': {
                pattern: 'pattern provider myKey error',
              },
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'pattern provider myKey error'
        )
      })

      it('should display custom pattern error message from field', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              pattern: 'pattern provider error',
              '/myKey': {
                pattern: 'pattern provider myKey error',
              },
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
              errorMessages={{
                pattern: 'pattern field error',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'pattern field error'
        )
      })
    })

    describe('schema validation', () => {
      it('should show provider schema type error with path', async () => {
        const log = jest.spyOn(console, 'error').mockImplementation()

        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myField: {
              type: 'number',
            },
          },
        }

        render(
          <DataContext.Provider
            schema={schema}
            data={{
              myField: 'invalid',
            }}
          >
            <TestField path="/myField" />
          </DataContext.Provider>
        )

        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The field at path="/myField" value (invalid) type must be number'
        )

        expect(log).toHaveBeenCalledWith(
          'The field at path="/myField" value (invalid) type must be number'
        )

        log.mockRestore()
      })

      it('should handle errors when initial data is not given', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myKey: {
              type: 'string',
              pattern: '^correct$',
            },
          },
          required: ['myKey'],
        }

        const { rerender } = render(
          <DataContext.Provider schema={schema} data={undefined}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.inputErrorRequired
        )

        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'correct' }}
          >
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        rerender(
          <DataContext.Provider schema={schema} data={{}}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.inputErrorRequired
        )

        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'wrong' }}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'Verdien er ugyldig'
        )

        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'correct' }}
          >
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('should handle errors from inner components and outer provider interchangeably', () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myKey: {
              type: 'string',
              pattern: '^(one|two|three)$',
            },
          },
        }
        const { rerender } = render(
          <DataContext.Provider schema={schema} data={{ myKey: 'one' }}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Change value so field component and provider both have errors
        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'fooooooooo' }}
          >
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value so only provider has errors (ensuring removed field error does not remove provider error)
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'fooo' }}>
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value so only field component has error
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'three' }}>
            <TestField path="/myKey" maxLength={1} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value back to one with no errors again
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'three' }}>
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('should show provided errorMessages based on outer schema validation with injected value', () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            val: {
              type: 'string',
              minLength: 7,
            },
          },
        }

        render(
          <DataContext.Provider schema={schema} data={{ val: 'abc' }}>
            <TestField
              path="/val"
              errorMessages={{
                minLength: 'Minimum {minLength} chars.',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByText('Minimum 7 chars.')).toBeInTheDocument()
      })

      describe('disabled and readOnly', () => {
        it('should skip required validation on disabled fields', () => {
          const { rerender } = render(<TestField value="" required />)

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(<TestField value="value" required disabled />)

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip schema validation on disabled fields', () => {
          const schema: JSONSchema = {
            type: 'object',
            required: ['myField'],
          }

          const { rerender } = render(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" disabled />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip required validation on readOnly fields', () => {
          const { rerender } = render(<TestField value="" required />)

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(<TestField value="value" required readOnly />)

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip schema validation on readOnly fields', () => {
          const schema: JSONSchema = {
            type: 'object',
            required: ['myField'],
          }

          const { rerender } = render(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" readOnly />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })
    })

    it('should show default errorMessages based on outer schema validation with injected value', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          val: {
            type: 'string',
            minLength: 486,
          },
        },
      }

      render(
        <DataContext.Provider schema={schema} data={{ val: 'abc' }}>
          <TestField path="/val" />
        </DataContext.Provider>
      )

      expect(
        screen.getByText(
          nb.stringInputErrorMinLength.replace('{minLength}', '486')
        )
      ).toBeInTheDocument()
    })

    it('should call "onSubmitRequest" on invalid submit set by a schema', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const onSubmitRequest = jest.fn()

      const Schema: JSONSchema = {
        type: 'object',
        properties: {
          foo: { type: 'number', minimum: 3 },
        },
      }

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
          schema={Schema}
        >
          <Field.Number path="/foo" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: '1' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledWith()

      rerender(
        <DataContext.Provider
          data={{ foo: 'changed' }}
          onSubmitRequest={onSubmitRequest}
          schema={Schema}
        >
          <Field.Number path="/fooBar" required />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      fireEvent.change(inputElement, {
        target: { value: '2' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(2)
      expect(onSubmitRequest).toHaveBeenLastCalledWith()

      expect(log).toHaveBeenNthCalledWith(
        1,
        'The field value (original) type must be number'
      )
      expect(log).toHaveBeenNthCalledWith(
        2,
        'The field at path="/foo" value (original) type must be number'
      )
      expect(log).toHaveBeenNthCalledWith(
        3,
        'The field at path="/foo" value (changed) type must be number'
      )

      log.mockRestore()
    })

    it('should revalidate with provided schema based on changes in external data', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const validData = {
        myKey: 'some-value',
      }
      const invalidData = {
        myKey: 123,
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={invalidData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      log.mockRestore()
    })

    it('should revalidate correctly based on changes in provided schema', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema1: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'number',
          },
        },
      }
      const schema2: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const data = {
        myKey: 'some-value',
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema2} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      log.mockRestore()
    })

    it('should accept custom ajv instance', async () => {
      const ajv = new Ajv({
        strict: true,
        allErrors: true,
      })

      ajv.addKeyword({
        keyword: 'isEven',
        validate: (schema: JSONSchema, value: string) => {
          return parseFloat(value) % 2 === 0
        },
      })

      const schema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
            isEven: true,
          },
        },
      } as const

      expect(ajv.validate(schema, { myKey: '1' })).toBe(false)

      render(
        <DataContext.Provider schema={schema} ajvInstance={ajv}>
          <Field.String
            path="/myKey"
            value="1"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      await userEvent.type(screen.getByRole('textbox'), '{Backspace}2')

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it('should accept custom ajv instance with custom error messages', () => {
      const ajv = new Ajv({
        strict: true,
        allErrors: true,
      })

      ajv.addKeyword({
        keyword: 'notEmpty',
        validate: (schema: JSONSchema, value: string) => {
          return value.length > 0
        },
      })

      const schema = {
        type: 'string',
        notEmpty: true, // The value must be more than one character.
        errorMessage: 'message in schema',
      } as const

      const { rerender } = render(
        <DataContext.Provider ajvInstance={ajv}>
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message in schema'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message in provider'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
            '/myKey': {
              notEmpty: 'message in provider for just one field',
            },
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message in provider for just one field'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
            '/myKey': {
              notEmpty: 'message in provider for just one field',
            },
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
            errorMessages={{ notEmpty: 'message for just this field' }}
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message for just this field'
      )
    })
  })

  it('should run filterData with correct data in onSubmit', () => {
    const id = 'disabled-fields'
    const filterDataHandler = jest.fn((path, value, props) => {
      if (props.disabled === true) {
        return false
      }
    })
    const onSubmit = jest.fn()

    const { rerender } = render(
      <Form.Handler
        id={id}
        onSubmit={onSubmit}
        filterData={filterDataHandler}
      >
        <Field.String path="/myField" disabled={true} value="foo" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())
    expect(filterDataHandler).toHaveBeenCalledTimes(1)
    expect(filterDataHandler).toHaveBeenLastCalledWith(
      '/myField',
      'foo',
      expect.objectContaining({
        disabled: true,
      })
    )

    rerender(
      <Form.Handler
        id={id}
        onSubmit={onSubmit}
        filterData={filterDataHandler}
      >
        <Field.String path="/myField" disabled={false} value="bar" />
      </Form.Handler>
    )

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myField: 'bar' },
      expect.anything()
    )
    expect(filterDataHandler).toHaveBeenCalledTimes(2)
    expect(filterDataHandler).toHaveBeenLastCalledWith(
      '/myField',
      'bar',
      expect.objectContaining({
        disabled: false,
      })
    )
  })

  it('should only render once', () => {
    const countRendered = jest.fn()

    const NestedMock = () => {
      const dataContext = useContext(DataContext.Context)
      countRendered(dataContext.data)
      return <></>
    }

    render(
      <DataContext.Provider data={{ foo: 'bar' }}>
        <NestedMock />
      </DataContext.Provider>
    )

    expect(countRendered).toHaveBeenCalledTimes(1)
    expect(countRendered).toHaveBeenLastCalledWith({ foo: 'bar' })
  })

  describe('with useData', () => {
    it('should set Provider data', () => {
      const props = { foo: 'bar' }
      renderHook(() => Form.useData(identifier, props))

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')
    })

    it('should contain data on first render, when nested', () => {
      const initialData = { foo: 'bar' }
      const nestedMockData = []

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <DataContext.Provider id={identifier} data={initialData}>
          <NestedMock />
        </DataContext.Provider>
      )

      expect(nestedMockData).toHaveLength(3)
      expect(nestedMockData).toEqual([
        initialData,
        initialData,
        initialData,
      ])

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')
    })

    it('should contain data on first render, when nested and in side car', () => {
      const initialData = { foo: 'bar' }
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data } = Form.useData(identifier)
        sidecarMockData.push(data)
        return <Field.String path="/foo" />
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier} data={initialData}>
            <NestedMock />
          </DataContext.Provider>
        </>
      )

      expect(sidecarMockData).toHaveLength(3)
      expect(sidecarMockData).toEqual([
        undefined,
        initialData,
        initialData,
      ])

      expect(nestedMockData).toHaveLength(2)
      expect(nestedMockData).toEqual([initialData, initialData])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )
      expect(sidecar).toHaveValue('') // Because the field is outside of the context
      expect(nested).toHaveValue('bar')
    })

    it('should be able to update data from side car', async () => {
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data, update } = Form.useData(identifier)

        useEffect(() => {
          update('/fieldA', () => 'updated A')
          update('/fieldB', () => 'updated B')
        }, [update])

        sidecarMockData.push(data)
        return null
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/fieldB" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier}>
            <Field.String path="/fieldA" />
            <NestedMock />
          </DataContext.Provider>
        </>
      )

      expect(sidecarMockData).toHaveLength(2)
      expect(sidecarMockData).toEqual([
        undefined,
        { fieldA: 'updated A', fieldB: 'updated B' },
      ])

      expect(nestedMockData).toHaveLength(2)
      expect(nestedMockData).toEqual([
        undefined,
        { fieldA: 'updated A', fieldB: 'updated B' },
      ])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )

      expect(sidecar).toHaveValue('updated A')
      expect(nested).toHaveValue('updated B')
    })

    it('should support StrictMode', async () => {
      const initialData = { foo: 'bar' }
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data } = Form.useData(identifier)
        sidecarMockData.push(data)
        return <Field.String path="/foo" />
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier} data={initialData}>
            <NestedMock />
          </DataContext.Provider>
        </>,
        { wrapper: StrictMode }
      )

      expect(sidecarMockData).toHaveLength(4)
      expect(sidecarMockData).toEqual([
        undefined,
        undefined,
        initialData,
        initialData,
      ])

      expect(nestedMockData).toHaveLength(4)
      expect(nestedMockData).toEqual([
        initialData,
        initialData,
        initialData,
        initialData,
      ])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )
      expect(sidecar).toHaveValue('') // Because the field is outside of the context
      expect(nested).toHaveValue('bar')
    })

    it('should set Provider data when sessionStorageId was given', () => {
      window.sessionStorage.setItem(
        'session-id',
        JSON.stringify({
          foo: 'bar',
        })
      )

      render(
        <DataContext.Provider
          id={identifier}
          sessionStorageId="session-id"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const { result } = renderHook(() =>
        Form.useData(identifier, { other: 'value' })
      )

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')

      expect(result.current.data).toEqual({ foo: 'bar', other: 'value' })
      expect(window.sessionStorage.getItem('session-id')).toBe(
        '{"foo":"bar"}'
      )
    })

    it('should update Provider data on hook "set" call', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        result.current.set({ foo: 'bar-changed' })
      })

      expect(inputElement).toHaveValue('bar-changed')
    })

    it('should merge data when Provider has data', () => {
      renderHook(() => Form.useData(identifier, { foo: 'changed' }))

      render(
        <DataContext.Provider
          id={identifier}
          data={{ foo: 'has data', other: 'data' }}
        >
          <Field.String path="/foo" />
          <Field.String path="/other" />
        </DataContext.Provider>
      )

      const [foo, other] = Array.from(document.querySelectorAll('input'))

      expect(foo).toHaveValue('changed')
      expect(other).toHaveValue('data')
    })

    it('should use data only from the first hook render', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'first data set' })
      )

      render(
        <DataContext.Provider
          id={identifier}
          data={{ foo: 'has data', other: 'data' }}
        >
          <Field.String path="/foo" />
          <Field.String path="/other" />
        </DataContext.Provider>
      )

      renderHook(() => Form.useData(identifier, { foo: 'changed' }))

      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('first data set')

      act(() => {
        result.current.set({ foo: 'changed' })
      })

      expect(first).toHaveValue('changed')
      expect(second).toHaveValue('data')
    })

    it('should initially set data when Provider has no data', () => {
      renderHook(() => Form.useData(identifier, { foo: 'bar' }))

      const { rerender } = render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      rerender(
        <DataContext.Provider id={identifier} data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(inputElement).toHaveValue('changed')
    })

    it('should return "update" method that lets you update the data', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )
      const { update } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        update('/foo', (value) => {
          return 'foo ' + value
        })
      })

      expect(inputElement).toHaveValue('foo bar')
    })

    it('should return "set" method that lets you update the data', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )
      const { set } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        set({ foo: 'foo bar' })
      })

      expect(inputElement).toHaveValue('foo bar')
    })

    it('should initial data via the "set" method', () => {
      const { result } = renderHook(() => Form.useData(identifier))
      const { set } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('')

      act(() => {
        set({ foo: 'bar' })
      })

      expect(inputElement).toHaveValue('bar')
    })

    it('should rerender provider and its contents', () => {
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData(identifier, existingData)

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data.count} />
          </DataContext.Provider>
        )
      }

      const { rerender } = render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(1)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(2)

      rerender(<MockComponent />)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('3')
      expect(buttonElement).toHaveTextContent('3')
      expect(countRender).toBe(4)
    })

    it('should not get overwritten by a Provider rerender', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, set } = Form.useData<{ count: number }>(identifier, {
          count: 1,
        })

        const increment = React.useCallback(() => {
          set({ count: data?.count + 1 })
        }, [data.count, set])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={{ count: 0 }}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data?.count} />
          </DataContext.Provider>
        )
      }

      const { rerender } = render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(1)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(2)

      rerender(<MockComponent />)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('3')
      expect(buttonElement).toHaveTextContent('3')
      expect(countRender).toBe(4)
    })

    it('should return data given in the context provider after a rerender', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData<{ count: number }>(
          identifier
        )

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={{ count: 1 }}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(2)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(3)
    })

    it('should update data via useEffect when data is given in useData', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData(identifier, { count: 1 })

        React.useEffect(() => {
          update('/count', (count) => count + 1)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier}>
            <Field.Number path="/count" label={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const labelElement = document.querySelector('label')

      expect(inputElement).toHaveValue('2')
      expect(labelElement).toHaveTextContent('2')
      expect(countRender).toBe(2)
    })

    it('should update data via useEffect when data is given in the context provider', async () => {
      let countRender = 0
      const initialData = { count: 1 }

      const MockComponent = () => {
        const { data, update } = Form.useData<{ count: number }>(
          identifier
        )

        React.useEffect(() => {
          update('/count', () => 123)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={initialData}>
            <Field.Number path="/count" label={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const labelElement = document.querySelector('label')

      expect(inputElement).toHaveValue('123')
      expect(labelElement).toHaveTextContent('123')
      expect(countRender).toBe(3)
    })

    it('should make filterData available in the hook', () => {
      const id = 'disabled-fields-hook'
      const filterDataHandler = jest.fn((path, value, props) => {
        if (props.disabled === true) {
          return false
        }
      })
      const onSubmit = jest.fn()

      const { result } = renderHook((props = { myField: 'foo' }) =>
        Form.useData(id, props)
      )

      const { rerender } = render(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'foo' },
        filterData: expect.any(Function),
        update: expect.any(Function),
        set: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())
      expect(filterDataHandler).toHaveBeenCalledTimes(1)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'foo',
        expect.objectContaining({
          disabled: true,
        })
      )

      act(() => {
        result.current.set({ myField: 'bar' })
      })

      rerender(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={false} />
        </Form.Handler>
      )

      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'bar' },
        filterData: expect.any(Function),
        update: expect.any(Function),
        set: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myField: 'bar' },
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'bar',
        expect.objectContaining({
          disabled: false,
        })
      )

      rerender(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      expect(result.current.data).toEqual({
        myField: 'bar',
      })
      expect(result.current.filterData(filterDataHandler)).toEqual({})
      expect(filterDataHandler).toHaveBeenCalledTimes(3)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'bar',
        expect.objectContaining({
          disabled: true,
        })
      )
    })

    describe('context support without id', () => {
      const MockComponent = ({
        setData = null,
        updatePath = null,
        updateValue = null,
      } = {}) => {
        const { data, set, update } = Form.useData()

        useEffect(() => {
          if (setData) {
            set(setData)
          }
        }, [setData, set])

        useEffect(() => {
          if (updateValue) {
            update(updatePath, () => updateValue)
          }
        }, [updateValue, set, update, updatePath])

        return <output>{JSON.stringify(data)}</output>
      }

      it('should return data from context', () => {
        render(
          <DataContext.Provider data={{ foo: 'bar' }}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')
      })

      it('should set data to context', () => {
        const data = { foo: 'bar' }
        const { rerender } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')

        rerender(
          <DataContext.Provider data={data}>
            <MockComponent
              setData={{
                foo: 'changed',
              }}
            />
          </DataContext.Provider>
        )

        expect(output).toHaveTextContent('{"foo":"changed"}')
      })

      it('should update data to context', () => {
        const data = { foo: 'bar' }
        const { rerender } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')

        rerender(
          <DataContext.Provider data={data}>
            <MockComponent updatePath="/foo" updateValue="changed" />
          </DataContext.Provider>
        )

        expect(output).toHaveTextContent('{"foo":"changed"}')
      })

      it('should provide filterData handler', () => {
        const filterDataHandler = jest.fn((path, value, props) => {
          if (props.disabled === true) {
            return false
          }
        })

        const MockComponent = () => {
          const { filterData } = Form.useData()

          const data = filterData(filterDataHandler)

          return <output>{JSON.stringify(data)}</output>
        }

        render(
          <Form.Handler>
            <Field.String path="/foo" value="foo" disabled />
            <Field.String path="/bar" value="baz" />
            <MockComponent />
          </Form.Handler>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"bar":"baz"}')
      })
    })
  })
})
