/**
 * useLocalValue Hook Test
 *
 */

import { renderHook, act } from '@testing-library/react'
import { useLocalValue } from '../useLocalValue'
import { createWrapper } from './testHelpers'

describe('useLocalValue', () => {
  it('should initialize with corrected value', () => {
    const wrapper = createWrapper({
      value: '1234.56',
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useLocalValue(), { wrapper })

    expect(result.current.localValue).toBeDefined()
    expect(result.current.setLocalValue).toBeDefined()
    expect(typeof result.current.setLocalValue).toBe('function')
  })

  it('should allow setting local value', () => {
    const wrapper = createWrapper({
      value: '1234',
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useLocalValue(), { wrapper })

    act(() => {
      result.current.setLocalValue('9999')
    })

    expect(result.current.localValue).toBe('9999')
  })

  it('should handle empty value', () => {
    const wrapper = createWrapper({
      value: '',
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useLocalValue(), { wrapper })

    expect(result.current.localValue).toBeDefined()
  })

  it('should handle string value', () => {
    const wrapper = createWrapper({
      value: '12345',
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useLocalValue(), { wrapper })

    expect(result.current.localValue).toBeDefined()
  })
})
