import React from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFieldProps from '../useFieldProps'
import { Context, ContextState, Provider } from '../../DataContext'
import WizardContext from '../../Wizard/Context'
import Field, {
  FieldBlock,
  FieldPropsGeneric,
  Form,
  FormError,
  Iterate,
  JSONSchema,
  OnChange,
  SubmitState,
  UseFieldProps,
} from '../../Forms'
import { spyOnEufemiaWarn, wait } from '../../../../core/jest/jestSetup'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

import nbNO from '../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

function getError(error: FieldPropsGeneric['error']) {
  return error as Error | FormError
}

describe('useFieldProps', () => {
  it('should call external onChange based change callbacks', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useFieldProps({ onChange }))

    const { handleChange } = result.current

    act(() => {
      handleChange('new-value')
    })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      'new-value',
      expect.anything()
    )
  })

  it('should update data context with initially given "value"', () => {
    const value = 'include this'

    const { result } = renderHook(
      () => useFieldProps({ path: '/foo', value }),
      { wrapper: Provider }
    )

    expect(result.current.dataContext.data).toEqual({
      foo: value,
    })
  })

  it('given "value" should take precedence over data context value', () => {
    const value = 'include this'
    const givenValue = 'given value'

    const { result } = renderHook(
      () => useFieldProps({ path: '/foo', value }),
      {
        wrapper: (props) => (
          <Provider data={{ foo: givenValue }} {...props} />
        ),
      }
    )

    expect(result.current.dataContext.data).toEqual({
      foo: value,
    })
  })

  describe('defaultValue', () => {
    it('should update data context with initially given "defaultValue"', () => {
      const defaultValue = 'include this'

      const { result } = renderHook(
        () => useFieldProps({ path: '/foo', defaultValue }),
        { wrapper: Provider }
      )

      expect(result.current.dataContext.data).toEqual({
        foo: defaultValue,
      })
    })

    it('should support ReactStrict mode', () => {
      const defaultValue = 'include this'

      const { result } = renderHook(
        () => useFieldProps({ path: '/foo', defaultValue }),
        {
          wrapper: ({ children }) => {
            return (
              <React.StrictMode>
                <Provider>{children}</Provider>
              </React.StrictMode>
            )
          },
        }
      )

      expect(result.current.dataContext.data).toEqual({
        foo: defaultValue,
      })
    })

    it('given "defaultValue" should not take precedence over data context value', () => {
      const givenValue = 'given value'
      const defaultValue = 'include this'

      const { result } = renderHook(
        () => useFieldProps({ path: '/foo', defaultValue }),
        {
          wrapper: (props) => (
            <React.StrictMode>
              <Provider data={{ foo: givenValue }} {...props} />
            </React.StrictMode>
          ),
        }
      )

      expect(result.current.dataContext.data).toEqual({
        foo: givenValue,
      })
    })

    it('should not update data context with changed "defaultValue" after rerendering', () => {
      const givenValue = 'given value'
      const defaultValue = 'include this'

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          path: '/foo',
          defaultValue,
        },
        wrapper: (props) => (
          <Provider data={{ foo: givenValue }} {...props} />
        ),
      })

      expect(result.current.dataContext.data).toEqual({
        foo: givenValue,
      })

      rerender({ path: '/foo', defaultValue: 'new value' })

      expect(result.current.dataContext.data).toEqual({
        foo: givenValue,
      })
    })

    it('changed "defaultValue" should not update value', () => {
      const defaultValue = 'use this value'
      const changedValue = 'changed value'

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          defaultValue,
        },
      })

      expect(result.current.value).toBe(defaultValue)

      rerender({ defaultValue: changedValue })

      expect(result.current.value).toBe(defaultValue)
    })
  })

  it('should return correct "hasError" state but no error object when nested in "FieldBlock"', async () => {
    const wrapper = ({ children }) => <FieldBlock>{children}</FieldBlock>

    const { result } = renderHook(
      () =>
        useFieldProps({
          value: 'foo',
          emptyValue: '',
          required: true,
        }),
      {
        wrapper,
      }
    )

    const { handleFocus, handleBlur, handleChange } = result.current

    act(() => {
      handleFocus()
      handleChange('')
    })
    expect(result.current.error).toBeUndefined()
    expect(result.current.hasError).toBeFalsy()

    act(() => {
      handleBlur()
    })
    await waitFor(() => {
      expect(result.current.error).toBeUndefined()
      expect(result.current.hasError).toBeTruthy()
    })

    act(() => {
      handleFocus()
      handleChange('a')
      handleBlur()
    })
    await waitFor(() => {
      expect(result.current.error).toBeUndefined()
      expect(result.current.hasError).toBeFalsy()
    })
  })

  describe('using focus callbacks', () => {
    it('should return the error only when the value is invalid AND it is not in focus', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: 'foo',
          emptyValue: '',
          required: true,
        })
      )

      const { handleFocus, handleBlur, handleChange } = result.current

      act(() => {
        handleFocus()
        handleChange('')
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        handleBlur()
      })
      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        handleFocus()
        handleChange('a')
        handleBlur()
      })
      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })
  })

  describe('without using focus callbacks', () => {
    it('should return the error as long as the value is invalid', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: 'foo',
          emptyValue: '',
          required: true,
        })
      )

      const { handleChange } = result.current

      act(() => {
        handleChange('')
      })
      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        handleChange('abc')
      })
      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })
  })

  describe('with local validation', () => {
    it('should not return error when validateInitially is set to false', async () => {
      const { result } = renderHook(useFieldProps, {
        initialProps: {
          value: '',
          onChangeValidator: () => {
            return new Error('Error message')
          },
          onBlurValidator: () => {
            return new Error('Error message')
          },
          validateInitially: false,
        },
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        result.current.handleChange('x')
        result.current.handleBlur()
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })
    })

    it('should set info, warning and error when returned by onChange', () => {
      const onChange = () => {
        return {
          info: 'Info message',
          warning: 'Warning message',
          error: new Error('Error message'),
        }
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
        },
      })

      const { handleChange } = result.current

      act(() => {
        handleChange('123')
      })

      expect(result.current.info).toBe('Info message')
      expect(result.current.warning).toBe('Warning message')
      expect(getError(result.current.error).message).toBe('Error message')
    })

    it('should validate schema', async () => {
      const schema: JSONSchema = {
        type: 'string',
        pattern: '^(valid)$',
      }

      const { result } = renderHook(() =>
        useFieldProps({
          value: 'valid',
          schema,
        })
      )

      const { handleChange, handleFocus } = result.current

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        handleChange('invalid')
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        handleFocus()
        handleChange('valid')
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })

    it('should bypass schema type error when empty string or null is given', async () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema: JSONSchema = {
        type: 'number',
      }

      const { result } = renderHook(() =>
        useFieldProps({
          value: '',
          schema,
        })
      )

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        result.current.handleChange(null)
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        result.current.handleChange('invalid')
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'The field value (invalid) type must be number'
        )
      })

      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenNthCalledWith(
        1,
        'The field value (invalid) type must be number'
      )

      log.mockRestore()
    })

    it('should show schema type error initially', async () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema: JSONSchema = {
        type: 'number',
      }

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          value: 'invalid',
          schema,
        },
      })

      const { handleChange } = result.current

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'The field value (invalid) type must be number'
        )
      })

      act(() => {
        handleChange('')
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      rerender({
        value: 'invalid',
        schema: {
          type: 'string',
        },
      })

      act(() => {
        handleChange('valid')
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        handleChange(123)
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'The field value (123) type must be string'
        )
      })

      expect(log).toHaveBeenCalledTimes(2)
      expect(log).toHaveBeenNthCalledWith(
        1,
        'The field value (invalid) type must be number'
      )
      expect(log).toHaveBeenNthCalledWith(
        2,
        'The field value (123) type must be string'
      )

      log.mockRestore()
    })

    it('should have correct validation order', async () => {
      const schema: JSONSchema = {
        type: 'string',
        pattern: '^(?!throw-on-schema$).*', // fail when "throw-on-schema" is given
      }

      const initialProps = {
        required: true,

        // Step 1.
        validateRequired: (value: string) => {
          return value === 'throw-on-required'
            ? new Error(value)
            : undefined
        },

        // Step 2.
        schema,

        // Step 3.
        onChangeValidator: async (value: string) => {
          return value === 'throw-onChangeValidator'
            ? new Error(value)
            : undefined
        },

        // Step: whenever handleBlur is called, and there is not error yet
        onBlurValidator: (value: string) => {
          return value === 'throw-onBlurValidator'
            ? new Error(value)
            : undefined
        },
        path: '/foo',
      }

      const { result } = renderHook(useFieldProps, {
        initialProps,
      })

      // Try onBlurValidator
      act(() => {
        result.current.handleChange('throw-onBlurValidator')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-onBlurValidator'
        )
      })

      // Try required
      act(() => {
        result.current.handleChange('make change')
        result.current.handleChange('throw-on-required')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-on-required'
        )
      })

      // Remove error
      act(() => {
        result.current.handleChange(undefined)
      })
      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      // Try onBlurValidator
      act(() => {
        result.current.handleChange('throw-onBlurValidator')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-onBlurValidator'
        )
      })

      // Try schema
      act(() => {
        result.current.handleChange('make change')
        result.current.handleChange('throw-on-schema')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          nb.Field.errorPattern
        )
      })

      // Remove error
      act(() => {
        result.current.handleChange(undefined)
      })
      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      // Try onBlurValidator
      act(() => {
        result.current.handleChange('throw-onBlurValidator')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-onBlurValidator'
        )
      })

      // Remove error
      act(() => {
        result.current.handleChange(undefined)
      })
      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      // Try onChangeValidator
      act(() => {
        result.current.handleChange('make change')
        result.current.handleChange('throw-onChangeValidator')
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-onChangeValidator'
        )
      })

      // Try onBlurValidator
      act(() => {
        result.current.handleChange('throw-onBlurValidator')
        result.current.handleBlur()
      })
      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'throw-onBlurValidator'
        )
      })
    })

    describe('errorMessages', () => {
      it('should show given error from errorMessages', () => {
        const { result } = renderHook(() =>
          useFieldProps({
            value: undefined,
            required: true,
            validateInitially: true,
            errorMessages: {
              'Field.errorRequired': 'Show this message',
            },
          })
        )
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'Show this message'
        )
      })

      it('should update error message given via errorMessages', () => {
        const props = {
          value: undefined,
          required: true,
          validateInitially: true,
        }
        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            ...props,
            errorMessages: {
              'Field.errorRequired': 'Show this message',
            },
          },
        })
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'Show this message'
        )

        rerender({
          ...props,
          errorMessages: {
            'Field.errorRequired': 'Update the message',
          },
        })

        expect(getError(result.current.error).message).toBe(
          'Update the message'
        )
      })

      /**
       * @deprecated – can be removed in v11
       */
      it('with backwards compatibility', () => {
        const { result } = renderHook(() =>
          useFieldProps({
            value: undefined,
            required: true,
            validateInitially: true,
            errorMessages: {
              required: 'Show this message',
            },
          })
        )
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'Show this message'
        )
      })
    })

    it('should validate required when value is empty string', () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: '',
          required: true,
          validateInitially: true,
        })
      )
      expect(result.current.error).toBeInstanceOf(Error)
    })

    it('should validate "validateRequired"', async () => {
      const validateRequired = jest.fn((v, { emptyValue, required }) => {
        return required && emptyValue === 'empty' && v > 1
          ? new FormError('Field.errorRequired')
          : undefined
      })
      const onChange = jest.fn()
      const onBlur = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          required: true,
          emptyValue: 'empty',
          validateInitially: true,
          validateRequired,
          errorMessages: {
            'Field.errorRequired': 'Show this message',

            /** @deprecated – can be removed in v11 */
            required: 'Show this message',
          },
          onChange,
          onBlur,
        })
      )

      const { handleChange } = result.current

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        handleChange(2)
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'Show this message'
        )
      })

      act(() => {
        handleChange(1)
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })

    it('should return error when required is set and the value is empty', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: undefined,
          required: true,
          validateInitially: true,
        })
      )
      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })
    })

    describe('disabled and readOnly', () => {
      it('should skip validation when disabled is given', async () => {
        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            path: '/foo',
            value: '',
            required: true,
            validateInitially: true,
          },
        })

        expect(result.current.error).toBeInstanceOf(Error)

        rerender({
          disabled: true,
        } as any)

        expect(result.current.error).toBeUndefined()
      })

      it('should skip validation when readOnly is given', async () => {
        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            path: '/foo',
            value: '',
            required: true,
            validateInitially: true,
          },
        })

        expect(result.current.error).toBeInstanceOf(Error)

        rerender({
          readOnly: true,
        } as any)

        expect(result.current.error).toBeUndefined()
      })
    })
  })

  describe('onBlur', () => {
    it('should provide "additionalArgs" to onBlur', () => {
      const onBlur: OnChange<unknown> = jest.fn()

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlur,
          value: '',
          foo: 'bar',
        },
      })

      const { handleChange, handleBlur } = result.current

      expect(onBlur).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange('123')
        handleBlur()
      })

      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          props: expect.objectContaining({ foo: 'bar' }),
        })
      )
    })
  })

  describe('onFocus', () => {
    it('should provide "additionalArgs" to onFocus', () => {
      const onFocus: OnChange<unknown> = jest.fn()

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onFocus,
          value: '',
          foo: 'bar',
        },
      })

      const { handleChange, handleFocus } = result.current

      expect(onFocus).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange('123')
        handleFocus()
      })

      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          props: expect.objectContaining({ foo: 'bar' }),
        })
      )
    })
  })

  describe('with sync onChange', () => {
    it('should provide "additionalArgs" to onChange', () => {
      const onChange: OnChange<unknown> = jest.fn()

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          value: '',
          foo: 'bar',
        },
      })

      const { handleChange } = result.current

      expect(onChange).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange('456')
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        '456',
        expect.objectContaining({
          props: expect.objectContaining({ foo: 'bar' }),
        })
      )
    })
  })

  describe('with async onChange', () => {
    const validateBlur = async (result, value) => {
      act(() => {
        result.current.handleChange(value)
        result.current.handleBlur()
      })
    }

    it('should not set fieldState on rerender or on blur', async () => {
      const onChange: OnChange<unknown> = async () => {
        return null
      }

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe(undefined)

      rerender({
        onChange,
        value: '456',
      })

      expect(result.current.fieldState).toBe(undefined)
    })

    it('should set fieldState to pending and success on changes', async () => {
      const onChange: OnChange<unknown> = async () => {
        return null
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
        },
      })

      const { handleChange } = result.current

      expect(result.current.fieldState).toBeUndefined()

      act(() => {
        handleChange('123')
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
      })

      act(() => {
        handleChange('456')
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
      })
    })

    it('should set fieldState to complete when error returned from onChange', async () => {
      const onChange: OnChange<unknown> = async () => {
        await wait(1)

        return new Error('Error message')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
        },
      })

      const { handleChange } = result.current

      expect(result.current.fieldState).toBeUndefined()

      act(() => {
        handleChange('123')
      })

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        handleChange('456')
      })

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })
    })

    it('should validate "onChangeValidator" before onChange call', async () => {
      const events = []

      const onChange: OnChange<unknown> = async (value) => {
        events.push('onChange')

        if (value === '456') {
          return { success: 'saved' } as const
        }
      }
      const onChangeValidator = async () => {
        events.push('onChangeValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onChangeValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual(['onChangeValidator', 'onChange'])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual(['onChangeValidator', 'onChange'])
      })
    })

    it('should validate "onBlurValidator" before onChange call', async () => {
      const events = []

      const onChange: OnChange<unknown> = async (value) => {
        events.push('onChange')

        if (value === '456') {
          return { success: 'saved' } as const
        }
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual(['onBlurValidator', 'onChange'])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual(['onBlurValidator', 'onChange'])
      })
    })

    it('should set "disabled" on blur when "onBlurValidator" and async onChange is given', async () => {
      const onChange: OnChange<unknown> = async () => null
      const onChangeValidator = async () => null
      const onBlurValidator = async () => null

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onChangeValidator,
          onBlurValidator,
        },
      })

      expect(result.current.disabled).toBeUndefined()

      result.current.handleChange('123')

      expect(result.current.disabled).toBeUndefined()

      await waitFor(() => {
        expect(result.current.disabled).toBeUndefined()
      })

      result.current.handleChange('456')

      expect(result.current.disabled).toBeUndefined()

      await waitFor(() => {
        expect(result.current.disabled).toBeUndefined()
      })

      rerender({
        onChange,
        onChangeValidator: undefined,
        onBlurValidator,
      })

      result.current.handleChange('789')

      expect(result.current.disabled).toBeUndefined()

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.disabled).toBeTruthy()

      await waitFor(() => {
        expect(result.current.disabled).toBeUndefined()
      })
    })

    it('should validate "onChangeValidator" and "onBlurValidator" before onChange call', async () => {
      const events = []

      const onChange: OnChange<unknown> = async (value) => {
        events.push('onChange')

        if (value === '456') {
          return { success: 'saved' } as const
        }
      }
      const onChangeValidator = async () => {
        events.push('onChangeValidator')
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onChangeValidator,
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onChange',
        ])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator', 'onBlurValidator'])

      await wait(100)

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onChange',
        ])
      })
    })

    it('should skip onChange call when "onChangeValidator" returns error', async () => {
      const events = []
      const onChange: OnChange<unknown> = async () => {
        events.push('onChange')
      }
      const onChangeValidator = async () => {
        events.push('onChangeValidator')

        return new Error('Error message')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onChangeValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(events).toEqual(['onChangeValidator'])
      })
    })

    it('should skip onChange call when "onBlurValidator" returns error', async () => {
      const events = []
      const onChange: OnChange<unknown> = jest.fn(async () => {
        events.push('onChange')
      })
      const onBlurValidator = jest.fn(async () => {
        events.push('onBlurValidator')

        return new Error('Error message')
      })

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'Error message'
        )
        expect(result.current.fieldState).toBe('complete')
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(getError(result.current.error).message).toBe(
          'Error message'
        )
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual(['onBlurValidator'])
      })

      expect(onChange).not.toHaveBeenCalled()
      expect(onBlurValidator).toHaveBeenCalledTimes(2)
    })

    it('should yeld error object when returned by async onChange', async () => {
      const onChange: OnChange<unknown> = async () => {
        return new Error('Error message')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
        },
      })

      const { handleChange } = result.current

      act(() => {
        handleChange('123')
      })

      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })
    })

    it('should wait for both "onChangeValidator" and "onBlurValidator" and DataContext onChange before local onChange call', async () => {
      const events = []
      const path = '/foo'

      const onChange: OnChange<unknown> = async () => {
        events.push('onChangeField')
      }
      const onChangeForm: OnChange<{ foo: string }> = async ({ foo }) => {
        events.push('onChangeForm')

        if (foo === '456') {
          return { success: 'saved' } as const
        } else {
          return new Error('Error message')
        }
      }
      const onChangeValidator = async () => {
        events.push('onChangeValidator')
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          onChangeValidator,
          onBlurValidator,
          path,
          value: '',
        },
        wrapper: ({ children }) => {
          return <Provider onChange={onChangeForm}>{children}</Provider>
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(events).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onChangeForm',
        ])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onChangeValidator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onChangeForm',
          'onChangeField',
        ])
      })
    })

    it('should handle gracefully the "onChangeValidator" and "onBlurValidator" and DataContext "onChange" and before the local onChange call', async () => {
      const events = []
      const path = '/foo'

      const onChangeField: OnChange<string> = async (value) => {
        events.push('onChangeField')

        if (value === 'invalid') {
          return new Error('Error message by onChangeField')
        }

        return { success: 'saved' } as const
      }
      const onChangeForm: OnChange<{ foo: string }> = async ({ foo }) => {
        events.push('onChangeForm')

        if (foo === 'invalid') {
          return new Error('Error message by onChangeForm')
        }

        return { success: 'saved' } as const
      }
      const onChangeValidator = async (value) => {
        events.push('onChangeValidator')

        if (value === 'invalid') {
          return new Error('Error message by onChangeValidator')
        }
      }
      const onBlurValidator = async (value) => {
        events.push('onBlurValidator')

        if (value === 'invalid') {
          return new Error('Error message by onBlurValidator')
        }
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange: onChangeField,
          onChangeValidator,
          onBlurValidator,
          path,
          value: '',
        },
        wrapper: ({ children }) => {
          return <Provider onChange={onChangeForm}>{children}</Provider>
        },
      })

      expect(events).toEqual([])
      expect(result.current.fieldState).toBeUndefined()
      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('valid')
      })

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(result.current.fieldState).toBe('success')
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.error).toBeUndefined()
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid')
      })

      expect(events).toEqual(['onChangeValidator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeInstanceOf(Error)
      expect(getError(result.current.error).message).toBe(
        'Error message by onChangeValidator'
      )

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator', 'onBlurValidator'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
        expect(getError(result.current.error).message).toBe(
          'Error message by onBlurValidator'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('valid')
      })

      expect(events).toEqual(['onChangeValidator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(result.current.fieldState).toBe('success')
        expect(result.current.error).toBeUndefined()
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleBlur()
      })

      expect(events).toEqual(['onBlurValidator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual(['onBlurValidator'])
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.error).toBeUndefined()
      })
    })

    it('should have correct order for when calling the "onChangeValidator" (if initiated and "onBlurValidator") and DataContext "onChange", before the local onChange call', async () => {
      const events = []
      const path = '/foo'

      const onChangeField: OnChange<string> = async (value) => {
        events.push('onChangeField')

        if (value === 'invalid-onChangeField') {
          return new Error('Error in onChangeField')
        }

        if (value !== 'invalid-onChangeForm') {
          return { success: 'saved' } as const
        }
      }
      const onChangeForm: OnChange<{ foo: string }> = async ({ foo }) => {
        events.push('onChangeForm')

        if (foo === 'invalid-onChangeForm') {
          return new Error('Error in onChangeForm')
        }

        if (foo !== 'invalid-onChangeField') {
          return { success: 'saved' } as const
        }
      }
      const onChangeValidator = async (value) => {
        events.push('onChangeValidator')

        if (value === 'invalid-onChangeValidator') {
          return new Error('Error in onChangeValidator')
        }
      }
      const onBlurValidator = async (value) => {
        events.push('onBlurValidator')

        if (value === 'invalid-onBlurValidator') {
          return new Error('Error in onBlurValidator')
        }
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange: onChangeField,
          onChangeValidator,
          onBlurValidator,
          path,
          value: '',
        },
        wrapper: ({ children }) => {
          return <Provider onChange={onChangeForm}>{children}</Provider>
        },
      })

      /**
       * The order we test in is:
       *
       * - onChangeValidator
       * - onBlurValidator (if initiated)
       * - onChangeForm
       * - onChangeField
       */

      expect(events).toEqual([])
      expect(result.current.fieldState).toBeUndefined()

      act(() => {
        result.current.handleChange('valid')
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(result.current.fieldState).toBe('success')
        expect(result.current.error).toBeUndefined()
      })

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.error).toBeUndefined()
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onChangeValidator')
      })

      expect(events).toEqual(['onChangeValidator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator'])
        expect(result.current.fieldState).toBe('error')
        expect(getError(result.current.error).message).toBe(
          'Error in onChangeValidator'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onBlurValidator')
      })

      expect(events).toEqual(['onChangeValidator'])

      await wait(1)

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(getError(result.current.error).message).toBe(
          'Error in onBlurValidator'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onChangeForm')
      })

      expect(events).toEqual(['onChangeValidator'])

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator', 'onChangeForm'])
        expect(result.current.fieldState).toBe('error')
        expect(getError(result.current.error).message).toBe(
          'Error in onChangeForm'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onChangeField')
      })

      expect(events).toEqual(['onChangeValidator'])

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(getError(result.current.error).message).toBe(
          'Error in onChangeField'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onBlurValidator')
      })

      expect(events).toEqual(['onChangeValidator'])

      await wait(1)

      act(() => {
        result.current.handleBlur()
      })

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(getError(result.current.error).message).toBe(
          'Error in onBlurValidator'
        )
      })
    })

    it('should set info, warning and error when returned by async onChange', async () => {
      const onChange: OnChange<unknown> = async () => {
        return {
          info: 'Info message',
          warning: 'Warning message',
          error: new Error('Error message'),
        }
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
        },
      })

      const { handleChange } = result.current

      act(() => {
        handleChange('123')
      })

      expect(result.current.info).toBeUndefined()
      expect(result.current.warning).toBeUndefined()
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.info).toBe('Info message')
        expect(result.current.warning).toBe('Warning message')
        expect(getError(result.current.error).message).toBe(
          'Error message'
        )
      })
    })

    it('should provide "additionalArgs" to onChange', async () => {
      const onChange: OnChange<unknown> = jest.fn(async () => {
        return null
      })

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          value: '',
          foo: 'bar',
        },
      })

      const { handleChange } = result.current

      expect(onChange).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange('456')
      })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
      expect(onChange).toHaveBeenCalledWith(
        '456',
        expect.objectContaining({
          props: expect.objectContaining({ foo: 'bar' }),
        })
      )
    })
  })

  describe('htmlAttributes', () => {
    it('should forward custom aria attributes', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          'aria-label': 'custom attribute',
        })
      )

      expect(result.current.htmlAttributes).toEqual({
        'aria-label': 'custom attribute',
      })
    })

    it('should combine attributes', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          id: 'unique',
          error: new Error('error'),
          'aria-describedby': 'existing-id',
        })
      )

      expect(result.current.htmlAttributes).toEqual({
        'aria-describedby': 'existing-id unique-form-status--error',
        'aria-invalid': 'true',
      })
    })

    it('should return false by default', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: undefined,
          validateInitially: true,
        })
      )

      expect(result.current.htmlAttributes).toEqual({})
    })

    it('should return empty htmlAttributes when optional prop is true and required prop is true', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          value: undefined,
          required: false,
        })
      )

      expect(result.current.htmlAttributes).toEqual({})
      expect(result.current.error).not.toBeInstanceOf(Error)
    })

    describe('required', () => {
      it('should return aria-required=true when required prop is true', async () => {
        const { result } = renderHook(() =>
          useFieldProps({
            value: undefined,
            required: true,
          })
        )

        expect(result.current.error).not.toBeInstanceOf(Error)
        expect(result.current.htmlAttributes).toEqual({
          'aria-required': 'true',
        })
      })

      it('should return aria-required=true when defined in schema', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myField: {
              type: 'string',
            },
          },
          required: ['myField'],
        }

        const { result } = renderHook(() =>
          useFieldProps({
            path: '/myField',
            value: undefined,
            schema,
          })
        )

        expect(result.current.htmlAttributes).toEqual({
          'aria-required': 'true',
        })
      })

      it('should return aria-required=true when required in context schema', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myField: {
              type: 'string',
            },
          },
          required: ['myField'],
        }

        const { result } = renderHook(
          () =>
            useFieldProps({
              path: '/myField',
              value: undefined,
            }),
          {
            wrapper: ({ children }) => {
              return <Provider schema={schema}>{children}</Provider>
            },
          }
        )

        expect(result.current.htmlAttributes).toEqual({
          'aria-required': 'true',
        })
      })

      it('should return aria-required=true when required inside nested context schema', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myObject: {
              type: 'object',
              properties: {
                myField: {
                  type: 'string',
                },
              },
              required: ['myField'],
            },
          },
        }

        const { result } = renderHook(
          () =>
            useFieldProps({
              path: '/myObject/myField',
              value: undefined,
            }),
          {
            wrapper: ({ children }) => {
              return <Provider schema={schema}>{children}</Provider>
            },
          }
        )

        expect(result.current.htmlAttributes).toEqual({
          'aria-required': 'true',
        })
      })
    })

    it('should return true on required and invalid', async () => {
      const { result } = renderHook(() =>
        useFieldProps({
          id: 'unique',
          value: undefined,
          required: true,
          validateInitially: true,
        })
      )

      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.htmlAttributes).toEqual({
        'aria-invalid': 'true',
        'aria-required': 'true',
        'aria-describedby': 'unique-form-status--error',
      })
    })

    it('should return aria-describedby', async () => {
      const { result, rerender } = renderHook(
        (props) => useFieldProps(props),
        {
          initialProps: {},
        }
      )

      expect(result.current.htmlAttributes).toEqual({})

      rerender({ info: 'info' })

      expect(result.current.htmlAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
      })

      rerender({ warning: 'warning' })

      expect(result.current.htmlAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
      })

      rerender({ error: new Error('error') })

      expect(result.current.htmlAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
        'aria-invalid': 'true',
      })

      rerender({})

      expect(result.current.htmlAttributes).toEqual({})
    })

    it('should combine all aria', async () => {
      const { result } = renderHook(() =>
        useFieldProps({ error: new Error('error'), required: true })
      )

      expect(result.current.htmlAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
        'aria-invalid': 'true',
        'aria-required': 'true',
      })
    })
  })

  describe('value manipulation with transformers', () => {
    it('should call "transformIn" and "transformOut"', () => {
      const transformIn = jest.fn((v) => v - 1)
      const transformOut = jest.fn((v) => v + 1)
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          onChange,
          transformIn,
          transformOut,
        })
      )

      const { handleChange } = result.current

      expect(transformIn).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange(2)
      })

      expect(transformIn).toHaveBeenCalledTimes(2)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(2)
      expect(transformOut).toHaveBeenNthCalledWith(1, 2, expect.anything())
      expect(transformOut).toHaveBeenNthCalledWith(2, 2, expect.anything())

      act(() => {
        handleChange(4)
      })

      expect(transformIn).toHaveBeenCalledTimes(3)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(4)
      expect(transformOut).toHaveBeenNthCalledWith(3, 4, expect.anything())
      expect(transformOut).toHaveBeenNthCalledWith(4, 4, expect.anything())
    })

    it('should call "transformOut" initially when path is given', () => {
      const transformOut = jest.fn((v) => v + 1)

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          path: '/myPath',
          value: 1,
          transformOut,
        },
        wrapper: Provider,
      })

      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformOut).toHaveBeenLastCalledWith(1, undefined)
      expect(result.current.dataContext.data).toEqual({
        myPath: 2,
      })
      expect(result.current.value).toEqual(1)
    })

    it('should call "transformOut" initially when "value" is given', () => {
      const transformOut = jest.fn((v) => v + 1)
      const value = 1

      const { result } = renderHook(
        () => useFieldProps({ path: '/foo', transformOut, value }),
        { wrapper: Provider }
      )

      expect(result.current.dataContext.data).toEqual({
        foo: 2,
      })
      expect(result.current.value).toEqual(1)
      expect(transformOut).toHaveBeenCalledTimes(1)
    })

    it('should call "transformOut" initially when "defaultValue" is given', () => {
      const transformOut = jest.fn((v) => v + 1)
      const transformIn = jest.fn((v) => v - 1)
      const defaultValue = 2

      const { result } = renderHook(
        () =>
          useFieldProps({
            path: '/foo',
            transformOut,
            transformIn,
            defaultValue,
          }),
        { wrapper: Provider }
      )

      expect(result.current.dataContext.data).toEqual({
        foo: 2,
      })
      expect(result.current.value).toEqual(1)
      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenCalledTimes(3)
    })

    it('should call "transformIn" and "transformOut" after "fromInput" and "toInput"', () => {
      const transformIn = jest.fn((v) => v - 1)
      const transformOut = jest.fn((v) => v + 1)
      const toInput = jest.fn((v) => v - 1)
      const fromInput = jest.fn((v) => v + 1)
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          onChange,
          transformIn,
          transformOut,
          fromInput,
          toInput,
        })
      )

      const { handleChange } = result.current

      expect(transformIn).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange(2)
      })

      expect(transformIn).toHaveBeenCalledTimes(2)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(2)
      expect(transformOut).toHaveBeenNthCalledWith(1, 3, expect.anything())
      expect(transformOut).toHaveBeenNthCalledWith(2, 3, expect.anything())

      act(() => {
        handleChange(4)
      })

      expect(transformIn).toHaveBeenCalledTimes(3)
      expect(transformIn).toHaveBeenLastCalledWith(1)
      expect(transformOut).toHaveBeenCalledTimes(4)
      expect(transformOut).toHaveBeenNthCalledWith(3, 5, expect.anything())
      expect(transformOut).toHaveBeenNthCalledWith(4, 5, expect.anything())
    })

    it('should call "fromInput" and "toInput"', () => {
      const fromInput = jest.fn((v) => v + 1)
      const toInput = jest.fn((v) => v - 1)
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          onChange,
          fromInput,
          toInput,
        })
      )

      const { handleChange } = result.current

      expect(fromInput).toHaveBeenCalledTimes(0)
      expect(toInput).toHaveBeenCalledTimes(1)

      act(() => {
        handleChange(2)
      })

      expect(fromInput).toHaveBeenCalledTimes(1)
      expect(toInput).toHaveBeenCalledTimes(2)
      expect(fromInput).toHaveBeenLastCalledWith(2)
      expect(toInput).toHaveBeenLastCalledWith(3)

      act(() => {
        handleChange(4)
      })

      expect(fromInput).toHaveBeenCalledTimes(2)
      expect(toInput).toHaveBeenCalledTimes(3)
      expect(fromInput).toHaveBeenLastCalledWith(4)
      expect(toInput).toHaveBeenLastCalledWith(5)

      /**
       * NB: "forceUpdate" is initiator that "toInput" is called more often.
       */
    })

    it('should call "toEvent"', () => {
      const toEvent = jest.fn((v) => v + 1)
      const onChange = jest.fn()
      const onFocus = jest.fn()
      const onBlur = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          toEvent,
          onChange,
          onFocus,
          onBlur,
        })
      )

      const { handleFocus, handleBlur, handleChange } = result.current

      expect(toEvent).toHaveBeenCalledTimes(0)

      act(() => {
        handleFocus()
        handleChange(2)
        handleBlur()
      })

      expect(toEvent).toHaveBeenCalledTimes(3)
      expect(toEvent).toHaveBeenLastCalledWith(2, 'onBlur')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(3, expect.anything())
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenLastCalledWith(2, expect.anything())
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenLastCalledWith(3, expect.anything())

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(toEvent).toHaveBeenCalledTimes(6)
      expect(toEvent).toHaveBeenLastCalledWith(4, 'onBlur')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(5, expect.anything())
      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onFocus).toHaveBeenLastCalledWith(3, expect.anything())
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenLastCalledWith(5, expect.anything())
    })

    it('should call "fromExternal"', () => {
      const fromExternal = jest.fn((v) => v + 1)
      const onChange = jest.fn()
      const onFocus = jest.fn()
      const onBlur = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          fromExternal,
          onChange,
          onFocus,
          onBlur,
        })
      )

      const { handleFocus, handleBlur, handleChange } = result.current

      expect(fromExternal).toHaveBeenCalledTimes(1)
      expect(fromExternal).toHaveBeenLastCalledWith(1)

      act(() => {
        handleFocus()
        handleChange(2)
        handleBlur()
      })

      expect(fromExternal).toHaveBeenCalledTimes(1)
      expect(fromExternal).toHaveBeenLastCalledWith(1)

      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenLastCalledWith(2, expect.anything())
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenLastCalledWith(2, expect.anything())

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(fromExternal).toHaveBeenCalledTimes(1)
      expect(fromExternal).toHaveBeenLastCalledWith(1)

      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onFocus).toHaveBeenLastCalledWith(2, expect.anything())
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenLastCalledWith(4, expect.anything())

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should call "transformValue"', () => {
      const transformValue = jest.fn((v) => v + 1)

      const { result } = renderHook(() =>
        useFieldProps({
          value: 1,
          transformValue,
        })
      )

      const { handleFocus, handleBlur, handleChange } = result.current

      expect(transformValue).toHaveBeenCalledTimes(0)

      act(() => {
        handleFocus()
        handleChange(2)
        handleBlur()
      })

      expect(transformValue).toHaveBeenCalledTimes(1)
      expect(transformValue).toHaveBeenLastCalledWith(2, 1)

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(transformValue).toHaveBeenCalledTimes(2)
      expect(transformValue).toHaveBeenLastCalledWith(4, 3)
    })

    it('"provideAdditionalArgs" should provide additional arguments to "onFocus", "onBlur" and "onChange" and "transformOut"', () => {
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      const onChange = jest.fn()
      const transformOut = jest.fn((value) => value + 1)
      const provideAdditionalArgs = jest.fn((value) => {
        return {
          value,
          foo: 'bar',
        }
      })

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          path: '/myPath',
          value: 1,
          onFocus,
          onBlur,
          onChange,
          transformOut,
          provideAdditionalArgs,
        },
        wrapper: Provider,
      })

      const { handleFocus, handleBlur, handleChange } = result.current

      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformOut).toHaveBeenLastCalledWith(1, {
        foo: 'bar',
        value: 1,
      })
      expect(result.current.value).toBe(1)
      expect(result.current.dataContext.data).toEqual({
        myPath: 2,
      })

      act(() => {
        handleFocus()
        handleChange(2)
        handleBlur()
      })

      expect(result.current.value).toBe(2)
      expect(result.current.dataContext.data).toEqual({
        myPath: 3,
      })
      expect(transformOut).toHaveBeenCalledTimes(5)
      expect(transformOut).toHaveBeenNthCalledWith(1, 1, {
        value: 1,
        foo: 'bar',
      })
      expect(transformOut).toHaveBeenNthCalledWith(2, 1, {
        value: 1,
        foo: 'bar',
      })
      expect(transformOut).toHaveBeenNthCalledWith(3, 2, {
        value: 2,
        foo: 'bar',
      })
      expect(transformOut).toHaveBeenNthCalledWith(4, 2, {
        value: 2,
        foo: 'bar',
      })
      expect(transformOut).toHaveBeenNthCalledWith(5, 2, {
        value: 2,
        foo: 'bar',
      })
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenLastCalledWith(2, {
        value: 1,
        foo: 'bar',
      })
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenLastCalledWith(3, {
        value: 2,
        foo: 'bar',
      })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(3, {
        value: 2,
        foo: 'bar',
      })

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(result.current.value).toBe(4)
      expect(result.current.dataContext.data).toEqual({
        myPath: 5,
      })
      expect(transformOut).toHaveBeenCalledTimes(9)
      expect(transformOut).toHaveBeenLastCalledWith(4, {
        value: 4,
        foo: 'bar',
      })
      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onFocus).toHaveBeenLastCalledWith(3, {
        value: 2,
        foo: 'bar',
      })
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenLastCalledWith(5, {
        value: 4,
        foo: 'bar',
      })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(5, {
        value: 4,
        foo: 'bar',
      })
    })
  })

  describe('updating internal value', () => {
    it('should update the internal value, but not call any event handler', () => {
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 'foo',
          onFocus,
          onBlur,
          onChange,
        })
      )

      const { handleFocus, handleBlur, updateValue } = result.current

      act(() => {
        handleFocus()
        handleBlur()
        updateValue('')
      })

      expect(onFocus).toHaveBeenLastCalledWith('foo', expect.anything())
      expect(onBlur).toHaveBeenLastCalledWith('foo', expect.anything())

      act(() => {
        handleFocus()
        updateValue('a')
        handleBlur()
      })

      expect(onFocus).toHaveBeenLastCalledWith('', expect.anything())
      expect(onBlur).toHaveBeenLastCalledWith('a', expect.anything())

      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenCalledTimes(2)
    })

    it('should not call fromInput', () => {
      const fromInput = jest.fn((v) => v)
      const toInput = jest.fn((v) => v)
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 'foo',
          onChange,
          fromInput,
          toInput,
        })
      )

      const { updateValue, handleChange } = result.current

      act(() => {
        updateValue('')
      })

      expect(fromInput).toHaveBeenCalledTimes(0)

      act(() => {
        updateValue('bar')
      })

      expect(fromInput).toHaveBeenCalledTimes(0)
      expect(onChange).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange('')
      })

      expect(fromInput).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)

      act(() => {
        updateValue('unchanged')
      })

      expect(fromInput).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)

      act(() => {
        handleChange('unchanged')
      })

      expect(fromInput).toHaveBeenCalledTimes(2)
      expect(toInput).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should update the internal value and run error validation', async () => {
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useFieldProps({
          value: 'foo',
          emptyValue: '',
          onFocus,
          onBlur,
          onChange,
          required: true,
        })
      )

      const { handleFocus, handleBlur, updateValue } = result.current

      act(() => {
        handleFocus()
        handleBlur()
        updateValue('')
      })

      expect(onFocus).toHaveBeenLastCalledWith('foo', expect.anything())
      expect(onBlur).toHaveBeenLastCalledWith('foo', expect.anything())

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        handleFocus()
        updateValue('a')
        handleBlur()
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })

      expect(onFocus).toHaveBeenLastCalledWith('', expect.anything())
      expect(onBlur).toHaveBeenLastCalledWith('a', expect.anything())

      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenCalledTimes(2)
    })
  })

  it('should return "hasError" when outer FieldBlocks as error', () => {
    let hasOuterError = false
    const MockComponent = (props) => {
      const { hasError } = useFieldProps(props)
      hasOuterError = hasError
      return null
    }

    const { rerender } = render(
      <FieldBlock error={new Error('Error message')}>
        <MockComponent />
      </FieldBlock>
    )

    expect(hasOuterError).toBeTruthy()

    rerender(
      <FieldBlock>
        <MockComponent />
      </FieldBlock>
    )

    expect(hasOuterError).toBeFalsy()
  })

  it('should translate required error', () => {
    const { result } = renderHook(
      () =>
        useFieldProps({
          validateInitially: true,
          required: true,
        }),
      {
        wrapper: ({ children }) => (
          <Form.Handler
            locale="en-GB"
            translations={{
              'en-GB': {
                Field: {
                  errorRequired: 'new required error message',
                },
              },
            }}
          >
            {children}
          </Form.Handler>
        ),
      }
    )

    expect(result.current.error).toEqual(
      new Error('new required error message')
    )
  })

  it('should return autoComplete based on DataContext', () => {
    const { result, rerender } = renderHook(
      (props) => useFieldProps(props),
      {
        initialProps: {},
        wrapper: ({ children }) => (
          <Form.Handler autoComplete>{children}</Form.Handler>
        ),
      }
    )

    expect(result.current.autoComplete).toBe('on')

    rerender({ autoComplete: 'something' })

    expect(result.current.autoComplete).toBe('something')
  })

  it('should return data-attributes', () => {
    const dataAttributes = {
      'data-long-key': 'long-key',
      'data-testid': 'testid',
    } as Record<string, unknown>

    const { result } = renderHook(() => useFieldProps(dataAttributes))

    expect(result.current.htmlAttributes).toEqual(
      expect.objectContaining(dataAttributes)
    )
  })

  it('should return data-attributes combined with aria-*', () => {
    const htmlAttributes = {
      'data-long-key': 'long-key',
      'data-testid': 'testid',
      'aria-label': 'custom attribute',
    } as Record<string, unknown>

    const { result } = renderHook(() => useFieldProps(htmlAttributes))

    expect(result.current.htmlAttributes).toEqual(
      expect.objectContaining(htmlAttributes)
    )
  })

  it('should forward props in a props object', () => {
    const props = {
      foo: 'bar',
    } as Record<string, unknown>

    const { result } = renderHook(() => useFieldProps(props))

    expect(result.current.props).toEqual(expect.objectContaining(props))
  })

  it('should call async context onChange when no error is present', async () => {
    const onChange = jest.fn(async () => null)

    const { result } = renderHook(useFieldProps, {
      initialProps: {
        path: '/foo',
        error: undefined,
      },
      wrapper: (props) => <Provider {...props} onChange={onChange} />,
    })

    await act(async () => {
      result.current.handleChange('new-value')
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      { foo: 'new-value' },
      expect.anything()
    )
    expect(result.current.error).toBeUndefined()
  })

  it('should not call async context onChange when error is present', async () => {
    const onChange = jest.fn(async () => null)

    const { result } = renderHook(useFieldProps, {
      initialProps: {
        path: '/foo',
        error: new Error('Error message'),
      },
      wrapper: (props) => <Provider {...props} onChange={onChange} />,
    })

    await act(async () => {
      result.current.handleChange('new-value')
    })

    expect(onChange).toHaveBeenCalledTimes(0)
    expect(result.current.error).toBeInstanceOf(Error)
  })

  it('should set emptyValue when handleChange gets undefined', async () => {
    const onSubmit = jest.fn(() => null)

    const first = {}
    const { result } = renderHook(useFieldProps, {
      initialProps: {
        path: '/foo',
        emptyValue: first,
      },
      wrapper: (props) => <Form.Handler {...props} onSubmit={onSubmit} />,
    })

    const form = document.querySelector('form')

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { foo: first },
      expect.anything()
    )
    expect(result.current.value).toBe(first)

    const second = {}
    act(() => {
      result.current.handleChange(second)
    })

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { foo: second },
      expect.anything()
    )
    expect(result.current.value).toBe(second)

    act(() => {
      result.current.handleChange(undefined)
    })

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(3)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { foo: first },
      expect.anything()
    )
    expect(result.current.value).toBe(first)
  })

  it('should call async context onChange regardless of error when executeOnChangeRegardlessOfError is true', async () => {
    const onChange = jest.fn(async () => null)

    const { result } = renderHook(
      (props) =>
        useFieldProps(props, {
          executeOnChangeRegardlessOfError: true,
        }),
      {
        initialProps: {
          path: '/foo',
          error: new Error('Error message'),
        },
        wrapper: (props) => <Provider {...props} onChange={onChange} />,
      }
    )

    await act(async () => {
      result.current.handleChange('new-value')
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      { foo: 'new-value' },
      expect.anything()
    )
    expect(result.current.error).toBeInstanceOf(Error)
  })

  // Deprecated – can be removed in v11
  describe('validator (deprecated)', () => {
    describe('validateInitially', () => {
      it('should show error message initially', async () => {
        const validator = jest.fn(() => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number validator={validator} validateInitially />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(validator).toHaveBeenCalledTimes(1)
      })

      it('should show error message initially when validator is async', async () => {
        const validator = jest.fn(async () => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number
              label="Label"
              validator={validator}
              validateInitially
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(validator).toHaveBeenCalledTimes(1)
      })
    })

    describe('connectWithPath', () => {
      const validatorFn: UseFieldProps<number>['validator'] = (
        num,
        { connectWithPath }
      ) => {
        const amount = connectWithPath('/refValue').getValue()

        if (amount >= num) {
          return new Error(`The amount should be greater than ${amount}`)
        }
      }

      it('should show validator error on form submit', async () => {
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              validator={validator}
            />
          </Form.Handler>
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })
        expect(validator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should update error message on input change', async () => {
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              validator={validator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        // Make a change to the ref input
        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The amount should be greater than 22'
        )
      })

      it('should hide error message when validation is successful', async () => {
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              validator={validator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(validator).toHaveBeenCalledTimes(2)
        expect(validator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden after validation is successful and another input change', async () => {
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              validator={validator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(validator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateInitially
              />
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should show error message continuously when using onChangeValidator', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateInitially
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })

      describe('validateUnchanged', () => {
        it('should show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateUnchanged
              />
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should hide and show error message while typing', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateUnchanged
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('continuousValidation', () => {
        it('should show not show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                continuousValidation
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                continuousValidation
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('validateContinuously', () => {
        it('should show not show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateContinuously
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                validator={validator}
                validateContinuously
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })
    })

    describe('validators given as an array', () => {
      it('should call all validators returned as an array', async () => {
        const fooValidator = jest.fn((value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        const barValidator = jest.fn((value) => {
          if (value.includes('bar')) {
            return new Error('bar')
          }
        })

        const myValidator = jest.fn(() => {
          return [fooValidator, barValidator]
        })

        render(
          <Form.Handler>
            <Field.String
              path="/myField"
              defaultValue="foo"
              validator={myValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(myValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(myValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(4)
      })

      it('should call all validators returned as an array (mixed async and sync)', async () => {
        const fooValidator = jest.fn(async (value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        const barValidator = jest.fn((value) => {
          if (value.includes('bar')) {
            return new Error('bar')
          }
        })

        // The main validator needs to be async, because it contains async validators in the array
        const myValidator = jest.fn(async () => {
          return [fooValidator, barValidator]
        })

        render(
          <Form.Handler>
            <Field.String
              label="Label"
              path="/myField"
              defaultValue="foo"
              validator={myValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(myValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(myValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(4)
      })
    })

    describe('exportValidators', () => {
      it('should call exported validators from mock component', async () => {
        let internalValidators, fooValidator, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              validator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn(
          (value, { validators: { barValidator, bazValidator } }) => {
            fooValidator = jest.fn(() => {
              if (value.includes('foo')) {
                return new Error('foo')
              }
            })

            return [fooValidator, barValidator, bazValidator]
          }
        )

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              validator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(4)
        expect(bazValidator).toHaveBeenCalledTimes(3)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('baz')
        })
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(8)
        expect(bazValidator).toHaveBeenCalledTimes(7)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })

      it('should export and call same validator without "Maximum call stack size exceeded"', async () => {
        const onBlurValidator = jest.fn((value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        render(
          <Field.String
            onBlurValidator={onBlurValidator}
            exportValidators={{ onBlurValidator }}
          />
        )

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(onBlurValidator).toHaveBeenCalledTimes(2)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should show error on every value change', async () => {
        const exportedValidator = jest.fn((value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators

          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onBlurValidator={props.onBlurValidator}
              exportValidators={{ exportedValidator }}
            />
          )
        }

        render(<MockComponent onBlurValidator={myValidator} />)

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(2)
        expect(myValidator).toHaveBeenCalledTimes(2)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        await userEvent.type(input, '{Backspace}4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(3)
        expect(myValidator).toHaveBeenCalledTimes(3)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should support mixed sync and async validators', async () => {
        const exportedValidator = jest.fn(async (value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators

          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onBlurValidator={props.onBlurValidator}
              exportValidators={{ exportedValidator }}
            />
          )
        }

        render(<MockComponent onBlurValidator={myValidator} />)

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(1)
        expect(myValidator).toHaveBeenCalledTimes(4)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        await userEvent.type(input, '{Backspace}4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(2)
        expect(myValidator).toHaveBeenCalledTimes(6)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should only call returned validators (barValidator should not be called)', async () => {
        let internalValidators, fooValidator, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              validator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn(
          (value, { validators: { bazValidator } }) => {
            fooValidator = jest.fn(() => {
              if (value.includes('foo')) {
                return new Error('foo')
              }
            })

            return [fooValidator, bazValidator]
          }
        )

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              validator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar' // remove one letter from bar, so the bar validator should return undefined
        )
        await waitFor(() => {
          // Here we should not see the bar validator called
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(4)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('baz')
        })
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(8)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })

      it('should show error when validateInitially is set to true', async () => {
        const exportedValidator = jest.fn(() => {
          return Error('Error message')
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators
          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              validator={props.validator}
              exportValidators={{ exportedValidator }}
              validateInitially
            />
          )
        }

        render(<MockComponent validator={myValidator} />)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should not run exported internal validators when a validator is given', async () => {
        const exportedValidator = jest.fn(() => {
          return undefined
        })

        const myValidator = jest.fn(() => {
          return undefined
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              validator={props.validator}
              exportValidators={{ exportedValidator }}
              validateInitially
            />
          )
        }

        render(<MockComponent validator={myValidator} />)

        await expect(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        }).toNeverResolve()
      })

      it('should not call internal validators when they are not returned in the publicValidator', async () => {
        let internalValidators, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              validator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn((value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              validator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )
        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('onChangeValidator', () => {
    it('should return error when onChangeValidator callback returns error', async () => {
      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onChangeValidator: () => new Error('This is wrong...'),
          value: 'foo',
          validateInitially: true,
        },
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      rerender({
        onChangeValidator: () => undefined,
        value: 'bar',
        validateInitially: true,
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })

    describe('with async onChangeValidator', () => {
      const validateBlur = async (result, value = Date.now()) => {
        act(() => {
          result.current.handleChange(String(value))
          result.current.handleBlur()
        })
      }

      it('should set fieldState', async () => {
        const onChangeValidator = async () => {
          await wait(1)

          return null
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            onChangeValidator,
            value: '',
          },
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()

        await validateBlur(result)

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('complete')
          expect(result.current.error).toBeUndefined()
          expect(result.current.disabled).toBeUndefined()
        })

        rerender({
          onChangeValidator,
          value: '456',
        })

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('complete')
          expect(result.current.error).toBeUndefined()
          expect(result.current.disabled).toBeUndefined()
        })
      })

      it('should set fieldState and disabled in SharedState', async () => {
        let count = 0
        const validator = async () => {
          await wait(1)

          count++

          if (count > 2) {
            return new Error('Error message')
          }

          return null
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            onChangeValidator: validator,
            onBlurValidator: undefined,
            value: '',
            info: 'Info message',
            warning: 'Warning message',
          },
        })
        const id = result.current.id
        const { result: sharedResult } = renderHook(() =>
          useSharedState<{
            disabled: boolean
            error: Error
            fieldState: SubmitState
            info: string
            warning: string
          }>('field-block-props-' + id)
        )
        expect(sharedResult.current.data).toEqual({
          disabled: undefined,
          error: undefined,
          fieldState: undefined,
          info: 'Info message',
          warning: 'Warning message',
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()

        await validateBlur(result)

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()
        expect(sharedResult.current.get().fieldState).toBe('pending')
        expect(sharedResult.current.get().error).toBeUndefined()
        expect(sharedResult.current.get().disabled).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('complete')
          expect(result.current.error).toBeUndefined()
          expect(result.current.disabled).toBeUndefined()
          expect(sharedResult.current.get().fieldState).toBe('complete')
          expect(sharedResult.current.get().error).toBeUndefined()
          expect(sharedResult.current.get().disabled).toBeUndefined()
        })

        rerender({
          onChangeValidator: validator,
          onBlurValidator: undefined,
          value: '456',
          info: 'Info message changed',
          warning: 'Warning message changed',
        })

        expect(sharedResult.current.get()).toEqual({
          disabled: undefined,
          error: undefined,
          fieldState: 'pending',
          info: 'Info message changed',
          warning: 'Warning message changed',
        })

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeUndefined()
        expect(sharedResult.current.get().fieldState).toBe('pending')
        expect(sharedResult.current.get().error).toBeUndefined()
        expect(sharedResult.current.get().disabled).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('complete')
          expect(result.current.error).toBeUndefined()
          expect(result.current.disabled).toBeUndefined()
          expect(sharedResult.current.get().fieldState).toBe('complete')
          expect(sharedResult.current.get().error).toBeUndefined()
          expect(sharedResult.current.get().disabled).toBeUndefined()
        })

        rerender({
          onChangeValidator: undefined,
          onBlurValidator: validator,
          value: '456',
          info: 'Info message changed',
          warning: 'Warning message changed',
        })

        await validateBlur(result)

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()
        expect(result.current.disabled).toBeTruthy()
        expect(sharedResult.current.get().fieldState).toBe('pending')
        expect(sharedResult.current.get().error).toBeUndefined()
        expect(sharedResult.current.get().disabled).toBeTruthy()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('error')
          expect(result.current.error).toBeInstanceOf(Error)
          expect(result.current.disabled).toBeUndefined()
          expect(sharedResult.current.get().fieldState).toBe('error')
          expect(sharedResult.current.get().error).toBeInstanceOf(Error)
          expect(sharedResult.current.get().disabled).toBeUndefined()

          expect(sharedResult.current.get()).toEqual({
            disabled: undefined,
            error: new Error('Error message'),
            fieldState: 'error',
            info: 'Info message changed',
            warning: 'Warning message changed',
          })
        })
      })

      it('should set fieldState to error for async onChangeValidator', async () => {
        const onChangeValidator = async () => {
          await wait(1)

          return new Error('Error message')
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            onChangeValidator,
            value: '',
          },
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()

        await validateBlur(result)

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('error')
          expect(result.current.error).toBeInstanceOf(Error)
        })

        rerender({
          onChangeValidator,
          value: '456',
        })

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('error')
          expect(result.current.error).toBeInstanceOf(Error)
        })
      })

      it('should hide fieldState error when disabled', async () => {
        const onChangeValidator = async () => {
          await wait(1)

          return new Error('Error message')
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            onChangeValidator,
            value: '',
            disabled: undefined,
          },
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()

        await validateBlur(result)

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('error')
          expect(result.current.error).toBeInstanceOf(Error)
        })

        rerender({
          onChangeValidator,
          value: '456',
          disabled: true,
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()
      })

      it('should not show error when onChangeValidator has no error, but schema has', async () => {
        const original = window.requestAnimationFrame
        window.requestAnimationFrame = jest.fn((callback) => {
          return setTimeout(callback, 0)
        })

        const onChangeValidator = jest.fn(async (value) => {
          if (value === '1234') {
            return new Error('onChangeValidator error')
          }
        })
        const schema: JSONSchema = {
          type: 'string',
          pattern: '^[0-9]{4}$',
        }

        render(
          <Field.String
            schema={schema}
            onChangeValidator={onChangeValidator}
          />
        )

        const input = document.querySelector('input')
        await userEvent.type(input, '1{Backspace}1')

        expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        await userEvent.type(input, '234')

        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'onChangeValidator error'
        )

        window.requestAnimationFrame = original
      })
    })

    describe('validateInitially', () => {
      it('should show error message initially', async () => {
        const onChangeValidator = jest.fn(() => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
      })

      it('should show error message initially when onChangeValidator is async', async () => {
        const onChangeValidator = jest.fn(async () => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number
              label="Label"
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
      })
    })

    describe('connectWithPath', () => {
      const onChangeValidatorFn: UseFieldProps<number>['onChangeValidator'] =
        (num, { connectWithPath }) => {
          const amount = connectWithPath('/refValue').getValue()

          if (amount >= num) {
            return new Error(`The amount should be greater than ${amount}`)
          }
        }

      it('should show onChangeValidator error on form submit', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnChangeValidator"
              defaultValue={2}
              onChangeValidator={onChangeValidator}
            />
          </Form.Handler>
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should update error message on input change', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnChangeValidator"
              defaultValue={2}
              onChangeValidator={onChangeValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        // Make a change to the ref input
        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The amount should be greater than 22'
        )
      })

      it('should hide error message when validation is successful', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnChangeValidator"
              defaultValue={2}
              onChangeValidator={onChangeValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onChangeValidator).toHaveBeenCalledTimes(2)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden after validation is successful and another input change', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnChangeValidator"
              defaultValue={2}
              onChangeValidator={onChangeValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onChangeValidator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateInitially
              />
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should show error message continuously when using onChangeValidator', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateInitially
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })

      describe('validateUnchanged', () => {
        it('should show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateUnchanged
              />
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateUnchanged
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('continuousValidation', () => {
        it('should show not show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                continuousValidation
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                continuousValidation
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('validateContinuously', () => {
        it('should show not show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateContinuously
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnChangeValidator"
                defaultValue={2}
                onChangeValidator={onChangeValidator}
                validateContinuously
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })
    })

    describe('connectWithItemPath', () => {
      const onChangeValidatorFn: UseFieldProps<number>['onChangeValidator'] =
        (num, { connectWithItemPath }) => {
          const amount = connectWithItemPath('/refValue').getValue()

          if (amount >= num) {
            return new Error(`The amount should be greater than ${amount}`)
          }
        }

      it('should show onChangeValidator error on form submit', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [
                {
                  refValue: 2,
                  myNumberWithOnChangeValidator: 2,
                },
              ],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" />

              <Field.Number
                itemPath="/myNumberWithOnChangeValidator"
                onChangeValidator={onChangeValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should update error message on input change', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{ refValue: 2, myNumberWithOnChangeValidator: 2 }],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" />

              <Field.Number
                itemPath="/myNumberWithOnChangeValidator"
                onChangeValidator={onChangeValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        // Make a change to the ref input
        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The amount should be greater than 22'
        )
      })

      it('should hide error message when validation is successful', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{ refValue: 2, myNumberWithOnChangeValidator: 2 }],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" />

              <Field.Number
                itemPath="/myNumberWithOnChangeValidator"
                onChangeValidator={onChangeValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onChangeValidator).toHaveBeenCalledTimes(2)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden after validation is successful and another input change', async () => {
        const onChangeValidator = jest.fn(onChangeValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{ refValue: 2, myNumberWithOnChangeValidator: 2 }],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" />

              <Field.Number
                itemPath="/myNumberWithOnChangeValidator"
                onChangeValidator={onChangeValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onChangeValidator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateInitially
                />
              </Iterate.Array>
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should show error message continuously when using onChangeValidator', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateInitially
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })

      describe('validateUnchanged', () => {
        it('should show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateUnchanged
                />
              </Iterate.Array>
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateUnchanged
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('continuousValidation', () => {
        it('should show not show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  continuousValidation
                />
              </Iterate.Array>
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  continuousValidation
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })

      describe('validateContinuously', () => {
        it('should show not show error message initially', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateContinuously
                />
              </Iterate.Array>
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should hide and show error message while typing', async () => {
          const onChangeValidator = jest.fn(onChangeValidatorFn)

          render(
            <Form.Handler defaultData={{ myList: [{}] }}>
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnChangeValidator"
                  defaultValue={2}
                  onChangeValidator={onChangeValidator}
                  validateContinuously
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          // Show error message
          fireEvent.submit(document.querySelector('form'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 2'
            )
          })

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              'The amount should be greater than 3'
            )
          })
        })
      })
    })

    describe('onChangeValidators given as an array', () => {
      it('should call all onChangeValidators returned as an array', async () => {
        const fooValidator = jest.fn((value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        const barValidator = jest.fn((value) => {
          if (value.includes('bar')) {
            return new Error('bar')
          }
        })

        const myOnChangeValidator = jest.fn(() => {
          return [fooValidator, barValidator]
        })

        render(
          <Form.Handler>
            <Field.String
              path="/myField"
              defaultValue="foo"
              onChangeValidator={myOnChangeValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(myOnChangeValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(myOnChangeValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(4)
      })

      it('should call all validators returned as an array (mixed async and sync)', async () => {
        const fooValidator = jest.fn(async (value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        const barValidator = jest.fn((value) => {
          if (value.includes('bar')) {
            return new Error('bar')
          }
        })

        // The main validator needs to be async, because it contains async validators in the array
        const myValidator = jest.fn(async () => {
          return [fooValidator, barValidator]
        })

        render(
          <Form.Handler>
            <Field.String
              label="Label"
              path="/myField"
              defaultValue="foo"
              onChangeValidator={myValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(myValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(myValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(4)
      })
    })

    describe('exportValidators', () => {
      it('should call exported validators from mock component', async () => {
        let internalValidators, fooValidator, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              onChangeValidator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn(
          (value, { validators: { barValidator, bazValidator } }) => {
            fooValidator = jest.fn(() => {
              if (value.includes('foo')) {
                return new Error('foo')
              }
            })

            return [fooValidator, barValidator, bazValidator]
          }
        )

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              onChangeValidator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(4)
        expect(bazValidator).toHaveBeenCalledTimes(3)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('baz')
        })
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(8)
        expect(bazValidator).toHaveBeenCalledTimes(7)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })

      it('should export and call same validator without "Maximum call stack size exceeded"', async () => {
        const onBlurValidator = jest.fn((value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        render(
          <Field.String
            onBlurValidator={onBlurValidator}
            exportValidators={{ onBlurValidator }}
          />
        )

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(onBlurValidator).toHaveBeenCalledTimes(2)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should show error on every value change', async () => {
        const exportedValidator = jest.fn((value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators

          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onBlurValidator={props.onBlurValidator}
              exportValidators={{ exportedValidator }}
            />
          )
        }

        render(<MockComponent onBlurValidator={myValidator} />)

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(2)
        expect(myValidator).toHaveBeenCalledTimes(2)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        await userEvent.type(input, '{Backspace}4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(3)
        expect(myValidator).toHaveBeenCalledTimes(3)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should support mixed sync and async validators', async () => {
        const exportedValidator = jest.fn(async (value) => {
          if (value === '1234') {
            return Error('Error message')
          }
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators

          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onBlurValidator={props.onBlurValidator}
              exportValidators={{ exportedValidator }}
            />
          )
        }

        render(<MockComponent onBlurValidator={myValidator} />)

        const input = document.querySelector('input')

        await userEvent.type(input, '123')
        fireEvent.blur(input)

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.type(input, '4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(1)
        expect(myValidator).toHaveBeenCalledTimes(4)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        await userEvent.type(input, '{Backspace}4')
        fireEvent.blur(input)

        expect(exportedValidator).toHaveBeenCalledTimes(2)
        expect(myValidator).toHaveBeenCalledTimes(6)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })
      })

      it('should only call returned validators (barValidator should not be called)', async () => {
        let internalValidators, fooValidator, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              onChangeValidator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn(
          (value, { validators: { bazValidator } }) => {
            fooValidator = jest.fn(() => {
              if (value.includes('foo')) {
                return new Error('foo')
              }
            })

            return [fooValidator, bazValidator]
          }
        )

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              onChangeValidator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar' // remove one letter from bar, so the bar validator should return undefined
        )
        await waitFor(() => {
          // Here we should not see the bar validator called
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(4)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('baz')
        })
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(8)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })

      it('should show error when validateInitially is set to true', async () => {
        const exportedValidator = jest.fn(() => {
          return Error('Error message')
        })

        const myValidator = jest.fn((value, { validators }) => {
          const { exportedValidator } = validators
          return [exportedValidator]
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onChangeValidator={props.onChangeValidator}
              exportValidators={{ exportedValidator }}
              validateInitially
            />
          )
        }

        render(<MockComponent onChangeValidator={myValidator} />)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should not run exported internal validators when a onChangeValidator is given', async () => {
        const exportedValidator = jest.fn(() => {
          return undefined
        })

        const myValidator = jest.fn(() => {
          return undefined
        })

        const MockComponent = (props) => {
          return (
            <Field.String
              label="Label"
              onChangeValidator={props.onChangeValidator}
              exportValidators={{ exportedValidator }}
              validateInitially
            />
          )
        }

        render(<MockComponent onChangeValidator={myValidator} />)

        await expect(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        }).toNeverResolve()
      })

      it('should not call internal validators when they are not returned in the publicValidator', async () => {
        let internalValidators, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              onChangeValidator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn((value) => {
          if (value.includes('foo')) {
            return new Error('foo')
          }
        })

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              onChangeValidator={publicValidator}
              validateUnchanged
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}bar'
        )
        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
        expect(publicValidator).toHaveBeenCalledTimes(5)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace}baz'
        )

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
        expect(publicValidator).toHaveBeenCalledTimes(9)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('onBlurValidator', () => {
    describe('validateInitially', () => {
      it('should show error message initially', async () => {
        const onBlurValidator = jest.fn(() => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
      })

      it('should show error message initially when onBlurValidator is async', async () => {
        const onBlurValidator = jest.fn(async () => {
          return new Error('My Error')
        })

        render(
          <Form.Handler>
            <Field.Number
              label="Label"
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          </Form.Handler>
        )

        expect(
          document.querySelector('.dnb-forms-submit-indicator')
        ).toHaveClass('dnb-forms-submit-indicator--state-pending')

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
      })
    })

    describe('connectWithPath', () => {
      const onBlurValidatorFn: UseFieldProps<number>['onBlurValidator'] = (
        num,
        { connectWithPath }
      ) => {
        const amount = connectWithPath('/refValue').getValue()

        if (amount >= num) {
          return new Error(`The amount should be greater than ${amount}`)
        }
      }

      it('should show onBlurValidator error on form submit', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnBlurValidator"
              defaultValue={2}
              onBlurValidator={onBlurValidator}
            />
          </Form.Handler>
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(onBlurValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should update error message on input change', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={12} />

            <Field.Number
              path="/myNumberWithOnBlurValidator"
              defaultValue={1}
              onBlurValidator={onBlurValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue, inputWithOnBlurValidator] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Make a change to the input with the validator
        await userEvent.type(inputWithOnBlurValidator, '2')
        fireEvent.blur(inputWithOnBlurValidator)

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 12'
          )
        })

        // Make a change to the ref input
        await userEvent.type(inputWithRefValue, '3')

        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The amount should be greater than 123'
        )
      })

      it('should hide error message when validation is successful', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnBlurValidator"
              defaultValue={2}
              onBlurValidator={onBlurValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onBlurValidator).toHaveBeenCalledTimes(2)
        expect(onBlurValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden during ref input change', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithOnBlurValidator"
              defaultValue={2}
              onBlurValidator={onBlurValidator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onBlurValidator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                validateInitially
              />
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          })
        })

        it('should not show error message while typing', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                validateInitially
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('validateUnchanged', () => {
        it('should not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                validateUnchanged
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error message while typing', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                validateUnchanged
              />
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('continuousValidation', () => {
        it('should show not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                continuousValidation
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('validateContinuously', () => {
        it('should show not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
                validateContinuously
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })
    })

    describe('connectWithItemPath', () => {
      const onBlurValidatorFn: UseFieldProps<number>['onBlurValidator'] = (
        num,
        { connectWithItemPath }
      ) => {
        const amount = connectWithItemPath('/refValue').getValue()

        if (amount >= num) {
          return new Error(`The amount should be greater than ${amount}`)
        }
      }

      it('should show onBlurValidator error on form submit', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{}],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" defaultValue={2} />

              <Field.Number
                itemPath="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 2'
          )
        })

        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(onBlurValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should update error message on input change', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{}],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" defaultValue={12} />

              <Field.Number
                itemPath="/myNumberWithOnBlurValidator"
                defaultValue={1}
                onBlurValidator={onBlurValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue, inputWithOnBlurValidator] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Make a change to the input with the validator
        await userEvent.type(inputWithOnBlurValidator, '2')
        fireEvent.blur(inputWithOnBlurValidator)

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            'The amount should be greater than 12'
          )
        })

        // Make a change to the ref input
        await userEvent.type(inputWithRefValue, '3')

        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The amount should be greater than 123'
        )
      })

      it('should hide error message when validation is successful', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{}],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" defaultValue={2} />

              <Field.Number
                itemPath="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onBlurValidator).toHaveBeenCalledTimes(2)
        expect(onBlurValidator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden during ref input change', async () => {
        const onBlurValidator = jest.fn(onBlurValidatorFn)

        render(
          <Form.Handler
            defaultData={{
              myList: [{}],
            }}
          >
            <Iterate.Array path="/myList">
              <Field.Number itemPath="/refValue" defaultValue={2} />

              <Field.Number
                itemPath="/myNumberWithOnBlurValidator"
                defaultValue={2}
                onBlurValidator={onBlurValidator}
              />
            </Iterate.Array>
          </Form.Handler>
        )

        const [inputWithRefValue] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Show error message
        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })

        await userEvent.type(inputWithRefValue, '{Backspace}')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(onBlurValidator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  validateInitially
                />
              </Iterate.Array>
            </Form.Handler>
          )

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          })
        })

        it('should not show error message while typing', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler
              defaultData={{
                myList: [{}],
              }}
            >
              <Iterate.Array path="/myList">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  validateInitially
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('validateUnchanged', () => {
        it('should not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  validateUnchanged
                />
              </Iterate.Array>
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error message while typing', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  validateUnchanged
                />
              </Iterate.Array>
            </Form.Handler>
          )

          const [inputWithRefValue] = Array.from(
            document.querySelectorAll('input')
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '{Backspace}')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()

          await userEvent.type(inputWithRefValue, '3')

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('continuousValidation', () => {
        it('should show not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array>
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  continuousValidation
                />
              </Iterate.Array>
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('validateContinuously', () => {
        it('should show not show error message initially', async () => {
          const onBlurValidator = jest.fn(onBlurValidatorFn)

          render(
            <Form.Handler defaultData={{ myArray: [{}] }}>
              <Iterate.Array path="/myArray">
                <Field.Number itemPath="/refValue" defaultValue={2} />

                <Field.Number
                  itemPath="/myNumberWithOnBlurValidator"
                  defaultValue={2}
                  onBlurValidator={onBlurValidator}
                  validateContinuously
                />
              </Iterate.Array>
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })
    })

    describe('exportValidators', () => {
      it('should only call returned validators (barValidator should not be called)', async () => {
        let internalValidators, fooValidator, barValidator, bazValidator

        const MockComponent = (props) => {
          barValidator = jest.fn((value) => {
            if (value.includes('bar')) {
              return new Error('bar')
            }
          })

          bazValidator = jest.fn((value) => {
            if (value.includes('baz')) {
              return new Error('baz')
            }
          })

          internalValidators = jest.fn((value) => {
            return barValidator(value) || bazValidator(value)
          })

          return (
            <Field.String
              exportValidators={{ barValidator, bazValidator }}
              onBlurValidator={internalValidators}
              {...props}
            />
          )
        }

        const publicValidator = jest.fn(
          (value, { validators: { bazValidator } }) => {
            fooValidator = jest.fn(() => {
              if (value.includes('foo')) {
                return new Error('foo')
              }
            })

            return [fooValidator, bazValidator]
          }
        )

        render(
          <Form.Handler>
            <MockComponent
              path="/myField"
              defaultValue="foo"
              onBlurValidator={publicValidator}
            />
          </Form.Handler>
        )

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('foo')
        })
        expect(publicValidator).toHaveBeenCalledTimes(1)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(0)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        expect(publicValidator).toHaveBeenLastCalledWith(
          'foo',
          expect.objectContaining({
            validators: {
              barValidator,
              bazValidator,
            },
          })
        )

        const input = document.querySelector('input')

        await userEvent.type(
          input,
          '{Backspace}bar' // remove one letter from bar, so the bar validator should return undefined
        )
        fireEvent.blur(input)
        await waitFor(() => {
          // Here we should not see the bar validator called
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
        expect(publicValidator).toHaveBeenCalledTimes(2)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(1)
        expect(internalValidators).toHaveBeenCalledTimes(0)

        await userEvent.type(input, ' baz')
        fireEvent.blur(input)

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('baz')
        })
        expect(publicValidator).toHaveBeenCalledTimes(3)
        expect(fooValidator).toHaveBeenCalledTimes(1)
        expect(barValidator).toHaveBeenCalledTimes(0)
        expect(bazValidator).toHaveBeenCalledTimes(2)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })
    })

    it('should not call onBlurValidator when required error is present', () => {
      const onBlurValidator = jest.fn(() => new Error('This is wrong...'))

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          required: true,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
        result.current.handleChange('')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        nb.Field.errorRequired
      )

      act(() => {
        result.current.handleChange('something')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'This is wrong...'
      )
    })

    it('should not call onBlurValidator when pattern error is present', () => {
      const schema: JSONSchema = {
        type: 'string',
        pattern: '[0-9]',
      }

      const onBlurValidator = jest.fn(() => new Error('This is wrong...'))

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          schema,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        nb.Field.errorPattern
      )

      act(() => {
        result.current.handleChange('123')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'This is wrong...'
      )
    })

    it('should always show onBlurValidator over onChangeValidator', () => {
      const onChangeValidator = jest.fn(
        () => new Error('Error message by onChangeValidator')
      )

      const onBlurValidator = jest.fn(
        () => new Error('Error message by onBlurValidator')
      )

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChangeValidator,
          onBlurValidator,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'Error message by onBlurValidator'
      )

      act(() => {
        result.current.handleChange('123')
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'Error message by onBlurValidator'
      )
    })

    it('should call onBlurValidator when the error initiator is an async onChangeValidator', async () => {
      const onBlurValidator = jest.fn(
        () => new Error('Error message by onBlurValidator')
      )
      const onChangeValidator = jest.fn(
        async () => new Error('Error message by onChangeValidator')
      )

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          onChangeValidator,
          required: true,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
        result.current.handleChange('')
      })

      await wait(1) // to ensure that "localErrorInitiator" is set to "required"

      act(() => {
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'Error message by onBlurValidator'
      )
    })

    it('should call onBlurValidator when the error initiator is an async onChange handler', async () => {
      const onBlurValidator = jest.fn(
        () => new Error('Error message by onBlurValidator')
      )
      const onChange = jest.fn(async () => null)

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          onChange,
          required: true,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
        result.current.handleChange('')
      })

      await wait(1) // to ensure that "localErrorInitiator" is set to "required"

      act(() => {
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'Error message by onBlurValidator'
      )
    })

    it('should call onBlurValidator when the error initiator is onChangeValidator and the onChangeValidator is async', async () => {
      const onBlurValidator = jest.fn(
        () => new Error('Error message by onBlurValidator')
      )
      const onChangeValidator = jest.fn(
        async () => new Error('Error message by onChangeValidator')
      )

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          onChangeValidator,
          required: true,
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('something')
      })

      await wait(1) // to ensure that "localErrorInitiator" is set to "required"

      act(() => {
        result.current.handleBlur()
      })

      expect(getError(result.current.error).message).toBe(
        'Error message by onBlurValidator'
      )
    })

    it('should show error when validateInitially is set to true', async () => {
      const exportedValidator = jest.fn(() => {
        return Error('Error message')
      })

      const myValidator = jest.fn((value, { validators }) => {
        const { exportedValidator } = validators
        return [exportedValidator]
      })

      const MockComponent = (props) => {
        return (
          <Field.String
            onBlurValidator={props.onBlurValidator}
            exportValidators={{ exportedValidator }}
            validateInitially
          />
        )
      }

      render(<MockComponent onBlurValidator={myValidator} />)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
    })

    const validateBlur = async (result, value = Date.now()) => {
      act(() => {
        result.current.handleChange(String(value))
        result.current.handleBlur()
      })
    }

    it('should set fieldState to error for async onBlurValidator', async () => {
      const onBlurValidator = async () => {
        await wait(1)

        return new Error('Error message')
      }

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()
      expect(result.current.error).toBeUndefined()

      await validateBlur(result)

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })

      rerender({
        onBlurValidator,
        value: '456',
      })

      expect(result.current.fieldState).toBe('error')
      expect(result.current.error).toBeUndefined()

      await validateBlur(result)

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })
    })

    it('should return disable=true during async onBlurValidator validation', async () => {
      const onBlurValidator = async () => {
        await wait(1)

        return null
      }

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()
      expect(result.current.disabled).toBeUndefined()

      await validateBlur(result)

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.disabled).toBeTruthy()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.disabled).toBeUndefined()
      })

      rerender({
        onBlurValidator,
        value: '456',
      })

      expect(result.current.fieldState).toBe('complete')
      expect(result.current.disabled).toBeUndefined()

      await validateBlur(result)

      expect(result.current.fieldState).toBe('pending')
      expect(result.current.disabled).toBeTruthy()

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.disabled).toBeUndefined()
      })
    })

    it('should rerender returned error when onBlurValidator returns array with different errors', async () => {
      const firstReturn = [new Error('first error')]
      const secondReturn = [
        new Error('first error'),
        new Error('second error'),
      ]

      let count = 0
      const onBlurValidator = () => {
        count++
        if (count > 1) {
          return secondReturn
        }
        return firstReturn
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('1')
        result.current.handleBlur()
      })
      expect(count).toBe(1)
      expect(result.current.error['errors']).toEqual(firstReturn)

      act(() => {
        result.current.handleBlur()
      })
      expect(count).toBe(2)
      expect(result.current.error['errors']).toEqual(secondReturn)
    })

    it('should rerender returned error when onBlurValidator returns array changed error', async () => {
      const firstReturn = [new Error('Error message')]
      const secondReturn = [new Error('Changed error message')]

      let count = 0
      const onBlurValidator = () => {
        count++
        if (count > 1) {
          return secondReturn
        }
        return firstReturn
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.error).toBeUndefined()

      act(() => {
        result.current.handleChange('1')
        result.current.handleBlur()
      })
      expect(count).toBe(1)
      expect(result.current.error['errors']).toEqual(firstReturn)

      act(() => {
        result.current.handleBlur()
      })
      expect(count).toBe(2)
      expect(result.current.error['errors']).toEqual(secondReturn)
    })
  })

  describe('setMountedFieldState', () => {
    it('should mount and unmount when the field is removed from the DOM', () => {
      const setMountedFieldState = jest.fn()

      const { unmount } = renderHook((props) => useFieldProps(props), {
        initialProps: {
          path: '/foo',
        },
        wrapper: ({ children }) => {
          const value = {
            setMountedFieldState,
          } as unknown as ContextState
          return (
            <Context.Provider value={value}>{children}</Context.Provider>
          )
        },
      })

      expect(setMountedFieldState).toHaveBeenCalledTimes(2)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(1, '/foo', {
        isPreMounted: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isMounted: true,
        isPreMounted: true,
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(3)
      expect(setMountedFieldState).toHaveBeenLastCalledWith('/foo', {
        isMounted: false,
        isPreMounted: false,
      })
    })

    it('should set isVisible when within a visibility context', () => {
      const setMountedFieldState = jest.fn()

      const { unmount } = renderHook((props) => useFieldProps(props), {
        initialProps: {
          path: '/foo',
        },
        wrapper: ({ children }) => {
          const value = {
            setMountedFieldState,
          } as unknown as ContextState
          return (
            <Context.Provider value={value}>
              <Form.Visibility visible>{children}</Form.Visibility>
            </Context.Provider>
          )
        },
      })

      expect(setMountedFieldState).toHaveBeenCalledTimes(3)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(1, '/foo', {
        isPreMounted: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isVisible: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(3, '/foo', {
        isMounted: true,
        isPreMounted: true,
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(4)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(4, '/foo', {
        isMounted: false,
        isPreMounted: false,
      })
    })

    it('should set isVisible when within a visibility context with a negative visibility', () => {
      const setMountedFieldState = jest.fn()

      const { unmount } = renderHook((props) => useFieldProps(props), {
        initialProps: {
          path: '/foo',
        },
        wrapper: ({ children }) => {
          const value = {
            setMountedFieldState,
          } as unknown as ContextState
          return (
            <Context.Provider value={value}>
              <Form.Visibility visible={false} keepInDOM>
                {children}
              </Form.Visibility>
            </Context.Provider>
          )
        },
      })

      expect(setMountedFieldState).toHaveBeenCalledTimes(3)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(1, '/foo', {
        isPreMounted: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isVisible: false,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(3, '/foo', {
        isMounted: true,
        isPreMounted: true,
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(4)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(4, '/foo', {
        isMounted: false,
        isPreMounted: false,
      })
    })

    it('should set isMounted to true when Wizard step has changed', () => {
      const log = spyOnEufemiaWarn()
      const setMountedFieldState = jest.fn()

      let activeIndex = 0
      const { rerender, unmount } = renderHook(
        (props) => useFieldProps(props),
        {
          initialProps: { path: '/foo' },
          wrapper: ({ children }) => {
            const value = {
              setMountedFieldState,
            } as unknown as ContextState
            activeIndex++
            return (
              <Context.Provider value={value}>
                <WizardContext.Provider
                  value={{
                    activeIndex,
                  }}
                >
                  {children}
                </WizardContext.Provider>
              </Context.Provider>
            )
          },
        }
      )

      expect(setMountedFieldState).toHaveBeenCalledTimes(2)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(1, '/foo', {
        isPreMounted: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isMounted: true,
        isPreMounted: true,
      })

      rerender({ path: '/bar' })

      expect(setMountedFieldState).toHaveBeenCalledTimes(5)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(3, '/bar', {
        isPreMounted: true,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(4, '/foo', {
        isMounted: false,
        isPreMounted: false,
      })
      expect(setMountedFieldState).toHaveBeenNthCalledWith(5, '/bar', {
        isMounted: true,
        isPreMounted: true,
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(6)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isMounted: true,
        isPreMounted: true,
      })

      log.mockRestore()
    })
  })

  describe('warn about duplicated paths', () => {
    let log = null
    beforeEach(() => {
      log = spyOnEufemiaWarn()
    })
    afterEach(() => {
      log.mockRestore()
    })

    it('for the "path" prop', () => {
      render(
        <React.StrictMode>
          <Form.Handler>
            <Field.String path="/myPath" />
            <Field.String path="/myPath" />
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Path declared multiple times:',
        '/myPath'
      )
    })

    it('should not warn when omitMultiplePathWarning is true', () => {
      const MockComponent = () => {
        useFieldProps(
          { path: '/myPath' },
          { omitMultiplePathWarning: true }
        )
        return null
      }

      render(
        <React.StrictMode>
          <Form.Handler>
            <MockComponent />
            <MockComponent />
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledTimes(0)
    })

    it('should not warn when process.env.NODE_ENV is not production', () => {
      const originalNodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      render(
        <React.StrictMode>
          <Form.Handler>
            <Field.String path="/myPath" />
            <Field.String path="/myPath" />
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledTimes(0)
      process.env.NODE_ENV = originalNodeEnv
    })

    it('for the "itemPath" prop', () => {
      render(
        <React.StrictMode>
          <Form.Handler>
            <Iterate.Array value={['foo', 'bar']}>
              <Field.String itemPath="/myPath" defaultValue="foo" />
              <Field.String itemPath="/myPath" defaultValue="bar" />
            </Iterate.Array>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Path declared multiple times:',
        '/0/myPath'
      )
    })

    it('for the "itemPath" prop distributed in several Iterate.Array', () => {
      render(
        <React.StrictMode>
          <Form.Handler>
            <Iterate.Array value={['foo']}>
              <Field.String itemPath="/myPath" defaultValue="foo" />
            </Iterate.Array>
            <Iterate.Array value={['bar']}>
              <Field.String itemPath="/myPath" defaultValue="bar" />
            </Iterate.Array>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Path declared multiple times:',
        '/0/myPath'
      )
    })

    it('should not warn when path is used in iterate', () => {
      render(
        <React.StrictMode>
          <Form.Handler>
            <Iterate.Array value={['foo']}>
              <Field.String path="/myPath" />
            </Iterate.Array>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(log).toHaveBeenCalledTimes(0)
    })
  })
})
