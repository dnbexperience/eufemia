import { act, renderHook } from '@testing-library/react'
import useDataValue from '../useDataValue'

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

  describe('using focus callbacks', () => {
    it('should return the error only when the value is invalid AND it is not in focus', () => {
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
      expect(result.current.error).toBeInstanceOf(Error)

      act(() => {
        handleFocus()
        handleChange('a')
        handleBlur()
      })
      expect(result.current.error).toBeUndefined()
    })
  })

  describe('without using focus callbacks', () => {
    it('should return the error as long as the value is invalid', () => {
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
      expect(result.current.error).toBeInstanceOf(Error)

      act(() => {
        handleChange('abc')
      })
      expect(result.current.error).toBeUndefined()
    })
  })
})
