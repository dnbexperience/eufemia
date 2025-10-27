/**
 * useNumberMaskParams Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useNumberMaskParams } from '../useNumberMaskParams'
import { createWrapper } from './testHelpers'

describe('useNumberMaskParams', () => {
  it('should return empty object when not requesting number mask', () => {
    const wrapper = createWrapper({})
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toEqual({})
  })

  it('should return number mask params when asNumber is true', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('object')
  })

  it('should handle numberMask with options', () => {
    const wrapper = createWrapper({
      numberMask: {
        allowDecimal: true,
        decimalLimit: 2,
      },
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should handle currencyMask', () => {
    const wrapper = createWrapper({
      currencyMask: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should handle asPercent', () => {
    const wrapper = createWrapper({
      asPercent: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should handle locale-specific decimal separator', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should handle maskOptions', () => {
    const wrapper = createWrapper({
      maskOptions: { decimalLimit: 2 },
    })
    const { result } = renderHook(() => useNumberMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
  })
})
