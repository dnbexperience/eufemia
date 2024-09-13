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
  Form,
  FormError,
  JSONSchema,
  OnChange,
  SubmitState,
  UseFieldProps,
} from '../../Forms'
import { wait } from '../../../../core/jest/jestSetup'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

describe('useFieldProps', () => {
  it('should call external onChange based change callbacks', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useFieldProps({ onChange }))

    const { handleChange } = result.current

    act(() => {
      handleChange('new-value')
    })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenNthCalledWith(1, 'new-value')
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

    it('given "defaultValue" should not take precedence over data context value', () => {
      const givenValue = 'given value'
      const defaultValue = 'include this'

      const { result } = renderHook(
        () => useFieldProps({ path: '/foo', defaultValue }),
        {
          wrapper: (props) => (
            <Provider data={{ foo: givenValue }} {...props} />
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
    it('should return error when validator callback return error', async () => {
      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          validator: () => new Error('This is wrong...'),
          value: 'foo',
          validateInitially: true,
          continuousValidation: true,
        },
      })

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })

      rerender({
        validator: () => undefined,
        value: 'bar',
        validateInitially: true,
        continuousValidation: true,
      })

      await waitFor(() => {
        expect(result.current.error).toBeUndefined()
      })
    })

    it('should not return error when validateInitially is set to false', async () => {
      const { result } = renderHook(useFieldProps, {
        initialProps: {
          value: '',
          error: new Error('Error message'),
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

    describe('with async validator', () => {
      const validateBlur = async (result, value = Date.now()) => {
        act(() => {
          result.current.handleChange(String(value))
          result.current.handleBlur()
        })
      }

      it('should set fieldState', async () => {
        const validator = async () => {
          await wait(1)

          return null
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            validator,
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
          validator,
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
            validator,
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
          validator,
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
          validator: undefined,
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

      it('should set fieldState to error for async validator', async () => {
        const validator = async () => {
          await wait(1)

          return new Error('Error message')
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            validator,
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
          validator,
          value: '456',
        })

        expect(result.current.fieldState).toBe('pending')
        expect(result.current.error).toBeUndefined()

        await waitFor(() => {
          expect(result.current.fieldState).toBe('error')
          expect(result.current.error).toBeInstanceOf(Error)
        })
      })

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

      it('should hide fieldState error when disabled', async () => {
        const validator = async () => {
          await wait(1)

          return new Error('Error message')
        }

        const { result, rerender } = renderHook(useFieldProps, {
          initialProps: {
            validator,
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
          validator,
          value: '456',
          disabled: true,
        })

        expect(result.current.fieldState).toBeUndefined()
        expect(result.current.error).toBeUndefined()
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
      expect(result.current.error.message).toBe('Error message')
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
        expect(result.current.error.message).toBe(
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
        expect(result.current.error.message).toBe(
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
        expect(result.current.error.message).toBe(
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
        pattern: '^(throw-on-validator)$',
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
        validator: (value: string) => {
          return value === 'throw-on-validator'
            ? new Error(value)
            : undefined
        },

        // Step: when ever handleChange and handleBlur is called
        onBlurValidator: (value: string) => {
          return value === 'throw-on-blur-validator'
            ? new Error(value)
            : undefined
        },
        value: 'throw-on-required',
        path: '/foo',
      }

      const { result } = renderHook(useFieldProps, {
        initialProps,
      })

      const validateBlur = async () => {
        result.current.handleChange('throw-on-blur-validator')
        result.current.handleBlur()

        await waitFor(() => {
          expect(result.current.error.message).toBe(
            'throw-on-blur-validator'
          )
        })
      }

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-required')
      })

      await waitFor(() => {
        expect(result.current.error.message).toBe('throw-on-required')
      })

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-schema')
      })

      await waitFor(() => {
        expect(result.current.error.message).toBe(
          'must match pattern "^(throw-on-validator)$"'
        )
      })

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-validator')
      })

      await waitFor(() => {
        expect(result.current.error.message).toBe('throw-on-validator')
      })

      await validateBlur()
    })

    it('should show given error from errorMessages', () => {
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
      expect(result.current.error.message).toBe('Show this message')
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
          ? new FormError('The value is required', {
              validationRule: 'required',
            })
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
        expect(result.current.error.message).toBe('Show this message')
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

    it('should validate "validator" before onChange call', async () => {
      const events = []

      const onChange: OnChange<unknown> = async (value) => {
        events.push('onChange')

        if (value === '456') {
          return { success: 'saved' } as const
        }
      }
      const validator = async () => {
        events.push('validator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          validator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual(['validator', 'onChange'])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual(['validator', 'onChange'])
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
      const validator = async () => null
      const onBlurValidator = async () => null

      const { result, rerender } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          validator,
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
        validator: undefined,
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

    it('should validate "validator" and "onBlurValidator" before onChange call', async () => {
      const events = []

      const onChange: OnChange<unknown> = async (value) => {
        events.push('onChange')

        if (value === '456') {
          return { success: 'saved' } as const
        }
      }
      const validator = async () => {
        events.push('validator')
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          validator,
          onBlurValidator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('complete')
        expect(events).toEqual([
          'validator',
          'onBlurValidator',
          'onChange',
        ])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator', 'onBlurValidator'])

      await wait(100)

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual([
          'validator',
          'onBlurValidator',
          'onChange',
        ])
      })
    })

    it('should skip onChange call when "validator" returns error', async () => {
      const events = []
      const onChange: OnChange<unknown> = async () => {
        events.push('onChange')
      }
      const validator = async () => {
        events.push('validator')

        return new Error('Error message')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          validator,
          value: '',
        },
      })

      expect(result.current.fieldState).toBeUndefined()

      await validateBlur(result, '123')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(events).toEqual(['validator'])
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
        expect(result.current.error.message).toBe('Error message')
        expect(result.current.fieldState).toBe('complete')
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(result.current.error.message).toBe('Error message')
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

    it('should wait for both "validator" and "onBlurValidator" and DataContext onChange before local onChange call', async () => {
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
      const validator = async () => {
        events.push('validator')
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange,
          validator,
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
      expect(events).toEqual(['validator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(events).toEqual([
          'validator',
          'onBlurValidator',
          'onChangeForm',
        ])
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['validator', 'onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('success')
        expect(events).toEqual([
          'validator',
          'onBlurValidator',
          'onChangeForm',
          'onChangeField',
        ])
      })
    })

    it('should handle gracefully the "validator" and "onBlurValidator" and DataContext "onChange" and before the local onChange call', async () => {
      const events = []
      const path = '/foo'

      const onChangeField: OnChange<string> = async (value) => {
        events.push('onChangeField')

        if (value === 'invalid') {
          return new Error('Error message')
        }

        return { success: 'saved' } as const
      }
      const onChangeForm: OnChange<{ foo: string }> = async ({ foo }) => {
        events.push('onChangeForm')

        if (foo === 'invalid') {
          return new Error('Error message')
        }

        return { success: 'saved' } as const
      }
      const validator = async (value) => {
        events.push('validator')

        if (value === 'invalid') {
          return new Error('Error message')
        }
      }
      const onBlurValidator = async (value) => {
        events.push('onBlurValidator')

        if (value === 'invalid') {
          return new Error('Error message')
        }
      }

      const { result } = renderHook(useFieldProps, {
        initialProps: {
          onChange: onChangeField,
          validator,
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

      act(() => {
        result.current.handleChange('valid')
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
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
          'validator',
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

      expect(events).toEqual(['validator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual(['validator'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual(['validator', 'onBlurValidator'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error).toBeInstanceOf(Error)
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('valid')
      })

      expect(events).toEqual(['validator'])
      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
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

      await waitFor(() => {
        expect(events).toEqual(['onBlurValidator'])
        expect(result.current.fieldState).toBe('complete')
        expect(result.current.error).toBeUndefined()
      })
    })

    it('should have correct order for when calling the "validator" (if initiated and "onBlurValidator") and DataContext "onChange", before the local onChange call', async () => {
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
      const validator = async (value) => {
        events.push('validator')

        if (value === 'invalid-validator') {
          return new Error('Error in validator')
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
          validator,
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
       * - validator
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
          'validator',
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
          'validator',
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
        result.current.handleChange('invalid-validator')
      })

      expect(events).toEqual(['validator'])
      expect(result.current.fieldState).toBe('pending')
      expect(result.current.error).toBeUndefined()

      await waitFor(() => {
        expect(events).toEqual(['validator'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error.message).toBe('Error in validator')
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onBlurValidator')
      })

      expect(events).toEqual(['validator'])

      await wait(1)

      act(() => {
        result.current.handleBlur()
      })

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error.message).toBe(
          'Error in onBlurValidator'
        )
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onChangeForm')
      })

      expect(events).toEqual(['validator'])

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual(['validator', 'onChangeForm'])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error.message).toBe('Error in onChangeForm')
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onChangeField')
      })

      expect(events).toEqual(['validator'])

      expect(result.current.fieldState).toBe('pending')

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error.message).toBe('Error in onChangeField')
      })

      // Reset events
      events.splice(0, events.length)

      act(() => {
        result.current.handleChange('invalid-onBlurValidator')
      })

      expect(events).toEqual(['validator'])

      await wait(1)

      act(() => {
        result.current.handleBlur()
      })

      await waitFor(() => {
        expect(events).toEqual([
          'validator',
          'onChangeForm',
          'onChangeField',
          'onBlurValidator',
        ])
        expect(result.current.fieldState).toBe('error')
        expect(result.current.error.message).toBe(
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
        expect(result.current.error.message).toBe('Error message')
      })
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

  describe('value manipulation', () => {
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
      expect(transformIn).toHaveBeenLastCalledWith(3)
      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformOut).toHaveBeenLastCalledWith(2)

      act(() => {
        handleChange(4)
      })

      expect(transformIn).toHaveBeenCalledTimes(3)
      expect(transformIn).toHaveBeenLastCalledWith(5)
      expect(transformOut).toHaveBeenCalledTimes(2)
      expect(transformOut).toHaveBeenLastCalledWith(4)
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
      expect(transformIn).toHaveBeenLastCalledWith(0)
      expect(transformOut).toHaveBeenCalledTimes(0)

      act(() => {
        handleChange(2)
      })

      expect(transformIn).toHaveBeenCalledTimes(2)
      expect(transformIn).toHaveBeenLastCalledWith(3)
      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformOut).toHaveBeenLastCalledWith(3)

      act(() => {
        handleChange(4)
      })

      expect(transformIn).toHaveBeenCalledTimes(3)
      expect(transformIn).toHaveBeenLastCalledWith(5)
      expect(transformOut).toHaveBeenCalledTimes(2)
      expect(transformOut).toHaveBeenLastCalledWith(5)
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
      expect(onChange).toHaveBeenLastCalledWith(3)
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenLastCalledWith(2)
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenLastCalledWith(3)

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(toEvent).toHaveBeenCalledTimes(6)
      expect(toEvent).toHaveBeenLastCalledWith(4, 'onBlur')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(5)
      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onFocus).toHaveBeenLastCalledWith(3)
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenLastCalledWith(5)
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
      expect(onFocus).toHaveBeenLastCalledWith(2)
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenLastCalledWith(2)

      act(() => {
        handleFocus()
        handleChange(4)
        handleBlur()
      })

      expect(fromExternal).toHaveBeenCalledTimes(1)
      expect(fromExternal).toHaveBeenLastCalledWith(1)

      expect(onFocus).toHaveBeenCalledTimes(2)
      expect(onFocus).toHaveBeenLastCalledWith(2)
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenLastCalledWith(4)

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

      expect(onFocus).toHaveBeenLastCalledWith('foo')
      expect(onBlur).toHaveBeenLastCalledWith('foo')

      act(() => {
        handleFocus()
        updateValue('a')
        handleBlur()
      })

      expect(onFocus).toHaveBeenLastCalledWith('')
      expect(onBlur).toHaveBeenLastCalledWith('a')

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

      expect(onFocus).toHaveBeenLastCalledWith('foo')
      expect(onBlur).toHaveBeenLastCalledWith('foo')

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

      expect(onFocus).toHaveBeenLastCalledWith('')
      expect(onBlur).toHaveBeenLastCalledWith('a')

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

  describe('validator', () => {
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

        it('should not show error message after it was hidden while typing', async () => {
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

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
    })

    describe('exportValidators', () => {
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

      it('should call internal validates when they are not returned in the publicValidator', async () => {
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
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toHaveTextContent('bar')
        })
        expect(publicValidator).toHaveBeenCalledTimes(5)
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
        expect(barValidator).toHaveBeenCalledTimes(8)
        expect(bazValidator).toHaveBeenCalledTimes(7)
        expect(internalValidators).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('onBlurValidator', () => {
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
              onBlurValidator={validator}
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
            <Field.Number path="/refValue" defaultValue={12} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={1}
              onBlurValidator={validator}
            />
          </Form.Handler>
        )

        const [inputWithRefValue, inputWithValidator] = Array.from(
          document.querySelectorAll('input')
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Make a change to the input with the validator
        await userEvent.type(inputWithValidator, '2')
        fireEvent.blur(inputWithValidator)

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
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              onBlurValidator={validator}
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
        expect(validator).toHaveBeenCalledTimes(2)
        expect(validator).toHaveBeenLastCalledWith(
          2,
          expect.objectContaining({
            connectWithPath: expect.any(Function),
          })
        )
      })

      it('should keep error message hidden during ref input change', async () => {
        const validator = jest.fn(validatorFn)

        render(
          <Form.Handler>
            <Field.Number path="/refValue" defaultValue={2} />

            <Field.Number
              path="/myNumberWithValidator"
              defaultValue={2}
              onBlurValidator={validator}
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
        expect(validator).toHaveBeenCalledTimes(2)

        await userEvent.type(inputWithRefValue, '2')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      describe('validateInitially', () => {
        it('should not show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                onBlurValidator={validator}
                validateInitially
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error message while typing', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                onBlurValidator={validator}
                validateInitially
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

      describe('validateUnchanged', () => {
        it('should not show error message initially', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                onBlurValidator={validator}
                validateUnchanged
              />
            </Form.Handler>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error message while typing', async () => {
          const validator = jest.fn(validatorFn)

          render(
            <Form.Handler>
              <Field.Number path="/refValue" defaultValue={2} />

              <Field.Number
                path="/myNumberWithValidator"
                defaultValue={2}
                onBlurValidator={validator}
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

          await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
                onBlurValidator={validator}
                continuousValidation
              />
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
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(4)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(4, '/foo', {
        isMounted: false,
        isPreMounted: false,
      })
    })

    it('should set isMounted to true when Wizard step has changed', () => {
      const originalConsoleLog = console.log
      const log = jest
        .spyOn(console, 'log')
        .mockImplementation((...message) => {
          if (!message[0].includes('Eufemia')) {
            originalConsoleLog(...message)
          }
        })
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
      })

      unmount()

      expect(setMountedFieldState).toHaveBeenCalledTimes(6)
      expect(setMountedFieldState).toHaveBeenNthCalledWith(2, '/foo', {
        isMounted: true,
      })

      log.mockRestore()
    })
  })
})
