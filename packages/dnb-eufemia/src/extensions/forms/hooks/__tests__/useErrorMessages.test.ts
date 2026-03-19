import { renderHook } from '@testing-library/react'
import useErrorMessages from '../useErrorMessages'

describe('useErrorMessages', () => {
  it('should return empty object when no options are provided', () => {
    const { result } = renderHook(() => useErrorMessages({}))
    expect(result.current).toEqual({})
  })

  it('should set Field.errorRequired when errorRequired is provided', () => {
    const { result } = renderHook(() =>
      useErrorMessages({ errorRequired: 'Required field' })
    )
    expect(result.current).toEqual({
      'Field.errorRequired': 'Required field',
    })
  })

  it('should set Field.errorPattern when errorPattern is provided', () => {
    const { result } = renderHook(() =>
      useErrorMessages({ errorPattern: 'Invalid format' })
    )
    expect(result.current).toEqual({
      'Field.errorPattern': 'Invalid format',
    })
  })

  it('should set both Field.errorRequired and Field.errorPattern', () => {
    const { result } = renderHook(() =>
      useErrorMessages({
        errorRequired: 'Required',
        errorPattern: 'Invalid',
      })
    )
    expect(result.current).toEqual({
      'Field.errorRequired': 'Required',
      'Field.errorPattern': 'Invalid',
    })
  })

  it('should include extra custom keys', () => {
    const { result } = renderHook(() =>
      useErrorMessages({
        errorRequired: 'Required',
        extra: { required: 'Custom required' },
      })
    )
    expect(result.current).toEqual({
      'Field.errorRequired': 'Required',
      required: 'Custom required',
    })
  })

  it('should let propsErrorMessages override all other values', () => {
    const { result } = renderHook(() =>
      useErrorMessages({
        errorRequired: 'Translation required',
        errorPattern: 'Translation pattern',
        extra: { required: 'Extra required' },
        propsErrorMessages: {
          'Field.errorRequired': 'Consumer override',
          required: 'Consumer extra override',
        },
      })
    )
    expect(result.current).toEqual({
      'Field.errorRequired': 'Consumer override',
      'Field.errorPattern': 'Translation pattern',
      required: 'Consumer extra override',
    })
  })

  it('should return a memoized result for stable inputs', () => {
    const options = {
      errorRequired: 'Required',
      errorPattern: 'Invalid',
    }
    const { result, rerender } = renderHook(() =>
      useErrorMessages(options)
    )
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
