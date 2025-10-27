/**
 * useMask Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useMask } from '../useMask'
import createNumberMask from '../../addons/createNumberMask'
import { createWrapper } from './testHelpers'

describe('useMask', () => {
  it('should return number mask when asNumber is set', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMask(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should return custom mask when provided', () => {
    const customMask = createNumberMask({})
    const wrapper = createWrapper({ mask: customMask })
    const { result } = renderHook(() => useMask(), { wrapper })

    expect(result.current).toBe(customMask)
  })

  it('should prioritize number mask over custom mask', () => {
    const customMask = createNumberMask({})
    const wrapper = createWrapper({
      mask: customMask,
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMask(), { wrapper })

    expect(result.current).not.toBe(customMask)
    expect(result.current).toBeDefined()
  })

  it('should return currency mask when currencyMask is set', () => {
    const wrapper = createWrapper({
      currencyMask: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMask(), { wrapper })

    expect(result.current).toBeDefined()
  })
})
