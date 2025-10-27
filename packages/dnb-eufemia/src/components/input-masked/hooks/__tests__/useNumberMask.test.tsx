/**
 * useNumberMask Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useNumberMask } from '../useNumberMask'
import { createWrapper } from './testHelpers'

describe('useNumberMask', () => {
  it('should return null when not requesting number mask', () => {
    const wrapper = createWrapper({})
    const { result } = renderHook(() => useNumberMask(), { wrapper })

    expect(result.current).toBeNull()
  })

  it('should return mask function when asNumber is true', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMask(), { wrapper })

    expect(result.current).not.toBeNull()
    expect(result.current?.maskParams).toBeDefined()
  })

  it('should return mask when currencyMask is set', () => {
    const wrapper = createWrapper({
      currencyMask: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMask(), { wrapper })

    expect(result.current).not.toBeNull()
    expect(result.current?.maskParams).toBeDefined()
  })

  it('should include maskParams in returned mask object', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useNumberMask(), { wrapper })

    expect(result.current).toHaveProperty('maskParams')
  })
})
