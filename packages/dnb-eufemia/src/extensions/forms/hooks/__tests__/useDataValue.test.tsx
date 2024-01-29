import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import SharedProvider from '../../../../shared/Provider'
import useDataValue from '../useDataValue'
import { Provider } from '../../DataContext'
import { FieldBlock, FormError, JSONSchema } from '../../Forms'

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
      const { result, rerender } = renderHook(
        (props) => useDataValue(props),
        {
          initialProps: {
            validator: () => new Error('This is wrong...'),
            value: 'foo',
            validateInitially: true,
            continuousValidation: true,
          },
        }
      )

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
        require: true,

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

      const { result } = renderHook((props) => useDataValue(props), {
        initialProps,
      })

      const validateBlur = async () => {
        act(() => {
          result.current.handleChange('throw-on-blur-validator')
          result.current.handleBlur()
        })

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

    it('should show given error message', () => {
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
  })

  describe('ariaAttributes', () => {
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
          value: undefined,
          required: true,
          validateInitially: true,
        })
      )

      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.ariaAttributes).toEqual({
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
})
