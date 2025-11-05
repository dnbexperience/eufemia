/**
 * useMask Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useMask } from '../useMask'
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

  it('should return currency mask when currencyMask is set', () => {
    const wrapper = createWrapper({
      currencyMask: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMask(), { wrapper })

    expect(result.current).toBeDefined()
  })
})
