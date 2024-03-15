import React from 'react'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import SharedProvider from '../../../../shared/Provider'
import useDataValue from '../useFieldProps'
import { Provider } from '../../DataContext'
import {
  FieldBlock,
  Form,
  FormError,
  JSONSchema,
  OnChange,
  SubmitState,
} from '../../Forms'
import { wait } from '../../../../core/jest/jestSetup'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

describe('useDataValue', () => {
  it('should call external onChange based change callbacks', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useDataValue({ onChange }))

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
      () => useDataValue({ path: '/foo', value }),
      { wrapper: Provider }
    )

    expect(result.current.dataContext.data).toEqual({
      foo: value,
    })
  })

  it('should return correct "hasError" state but no error object when nested in "FieldBlock"', async () => {
    const wrapper = ({ children }) => <FieldBlock>{children}</FieldBlock>

    const { result } = renderHook(
      () =>
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
      const { result, rerender } = renderHook(useDataValue, {
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

        const { result, rerender } = renderHook(useDataValue, {
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

        const { result, rerender } = renderHook(useDataValue, {
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
          }>(id)
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

        const { result, rerender } = renderHook(useDataValue, {
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

        const { result, rerender } = renderHook(useDataValue, {
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

        const { result, rerender } = renderHook(useDataValue, {
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

        const { result, rerender } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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
        type: 'object',
        properties: {
          txt: {
            type: 'string',
            pattern: '^(valid)$',
          },
        },
      }

      const { result } = renderHook(() =>
        useDataValue({
          value: 'valid',
          schema,
          path: '/txt',
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

      const { result } = renderHook(useDataValue, {
        initialProps,
      })

      const validateBlur = async () => {
        result.current.handleChange('throw-on-blur-validator')
        result.current.handleBlur()

        await waitFor(() => {
          expect(result.current.error.toString()).toBe(
            'Error: throw-on-blur-validator'
          )
        })
      }

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-required')
      })

      await waitFor(() => {
        expect(result.current.error.toString()).toBe(
          'Error: throw-on-required'
        )
      })

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-schema')
      })

      await waitFor(() => {
        expect(result.current.error.toString()).toBe(
          'Error: must match pattern "^(throw-on-validator)$"'
        )
      })

      await validateBlur()

      act(() => {
        result.current.updateValue('throw-on-validator')
      })

      await waitFor(() => {
        expect(result.current.error.toString()).toBe(
          'Error: throw-on-validator'
        )
      })

      await validateBlur()
    })

    it('should show given error from errorMessages', () => {
      const { result } = renderHook(() =>
        useDataValue({
          value: undefined,
          required: true,
          validateInitially: true,
          errorMessages: {
            required: 'Show this message',
          },
        })
      )
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error.toString()).toBe(
        'Error: Show this message'
      )
    })

    it('should validate required when value is empty string', () => {
      const { result } = renderHook(() =>
        useDataValue({
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
        useDataValue({
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
        expect(result.current.error.toString()).toBe(
          'Error: Show this message'
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
        useDataValue({
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
        const { result, rerender } = renderHook(useDataValue, {
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
        const { result, rerender } = renderHook(useDataValue, {
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

      const { result, rerender } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result, rerender } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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
      const onChange: OnChange<unknown> = async () => {
        events.push('onChange')
      }
      const onBlurValidator = async () => {
        events.push('onBlurValidator')

        return new Error('Error message')
      }

      const { result } = renderHook(useDataValue, {
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
        expect(result.current.fieldState).toBe('error')
      })

      // Reset events
      events.splice(0, events.length)

      await validateBlur(result, '456')

      expect(result.current.fieldState).toBe('pending')
      expect(events).toEqual(['onBlurValidator'])

      await waitFor(() => {
        expect(result.current.fieldState).toBe('error')
        expect(events).toEqual(['onBlurValidator'])
      })
    })

    it('should yeld error object when returned by async onChange', async () => {
      const onChange: OnChange<unknown> = async () => {
        return new Error('Error message')
      }

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

      const { result } = renderHook(useDataValue, {
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

  describe('ariaAttributes', () => {
    it('should forward custom aria attributes', async () => {
      const { result } = renderHook(() =>
        useDataValue({
          'aria-label': 'custom attribute',
        })
      )

      expect(result.current.ariaAttributes).toEqual({
        'aria-label': 'custom attribute',
      })
    })

    it('should combine attributes', async () => {
      const { result } = renderHook(() =>
        useDataValue({
          id: 'unique',
          error: new Error('error'),
          'aria-describedby': 'existing-id',
        })
      )

      expect(result.current.ariaAttributes).toEqual({
        'aria-describedby': 'existing-id unique-form-status--error',
        'aria-invalid': 'true',
      })
    })

    it('should return false by default', async () => {
      const { result } = renderHook(() =>
        useDataValue({
          value: undefined,
          validateInitially: true,
        })
      )

      expect(result.current.ariaAttributes).toEqual({})
    })

    it('should return true on required', async () => {
      const { result } = renderHook(() =>
        useDataValue({
          value: undefined,
          required: true,
        })
      )

      expect(result.current.error).not.toBeInstanceOf(Error)
      expect(result.current.ariaAttributes).toEqual({
        'aria-required': 'true',
      })
    })

    it('should return true on required and invalid', async () => {
      const { result } = renderHook(() =>
        useDataValue({
          id: 'unique',
          value: undefined,
          required: true,
          validateInitially: true,
        })
      )

      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.ariaAttributes).toEqual({
        'aria-invalid': 'true',
        'aria-required': 'true',
        'aria-describedby': 'unique-form-status--error',
      })
    })

    it('should return aria-describedby', async () => {
      const { result, rerender } = renderHook(
        (props) => useDataValue(props),
        {
          initialProps: {},
        }
      )

      expect(result.current.ariaAttributes).toEqual({})

      rerender({ info: 'info' })

      expect(result.current.ariaAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
      })

      rerender({ warning: 'warning' })

      expect(result.current.ariaAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
      })

      rerender({ error: new Error('error') })

      expect(result.current.ariaAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
      })

      rerender({})

      expect(result.current.ariaAttributes).toEqual({})
    })

    it('should combine all aria', async () => {
      const { result } = renderHook(() =>
        useDataValue({ error: new Error('error'), required: true })
      )

      expect(result.current.ariaAttributes).toEqual({
        'aria-describedby': expect.stringMatching(/id-.*-form-status/),
        'aria-invalid': 'true',
        'aria-required': 'true',
      })
    })
  })

  describe('value manipulation', () => {
    it('should call "fromInput" and "toInput"', () => {
      const fromInput = jest.fn((v) => v + 1)
      const toInput = jest.fn((v) => v - 1)
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
        useDataValue({
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
      const { hasError } = useDataValue(props)
      hasOuterError = hasError
      return null
    }

    const { rerender } = render(
      <FieldBlock error={new FormError('Error message')}>
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
        useDataValue({
          validateInitially: true,
          required: true,
        }),
      {
        wrapper: ({ children }) => (
          <SharedProvider
            locale="en-GB"
            locales={{
              'en-GB': {
                Forms: {
                  fieldErrorRequired: 'new required error message',
                },
              },
            }}
          >
            {children}
          </SharedProvider>
        ),
      }
    )

    expect(result.current.error).toEqual(
      new Error('new required error message')
    )
  })

  it('should return autoComplete based on DataContext', () => {
    const { result, rerender } = renderHook(
      (props) => useDataValue(props),
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
})
