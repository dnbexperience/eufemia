/**
 * Hook Test
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useNumberFormat from '../useNumberFormat'
import Provider from '../../../shared/Provider'

describe('useNumberFormat', () => {
  it('will render without provider', () => {
    const { result } = renderHook(() =>
      useNumberFormat(1234, { currency: true })
    )

    expect(result.current).toBe('1 234,00 kr')
  })

  it('will return object when returnAria is true', () => {
    const { result } = renderHook(() =>
      useNumberFormat(1234, { currency: true, returnAria: true })
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        aria: '1 234,00 kroner',
        cleanedValue: '1234,00 kr',
        locale: 'nb-NO',
        number: '1 234,00 kr',
        type: 'currency',
        value: 1234,
      })
    )
  })

  it('will inherit NumberFormat props from provider', () => {
    const wrapper = ({ children }) => (
      <Provider
        locale="nb-NO" // should get overwritten by the NumberFormat props
        NumberFormat={{
          currency: true,
          locale: 'en-GB',
        }}
      >
        {children}
      </Provider>
    )
    const { result } = renderHook(() => useNumberFormat(1234), { wrapper })

    expect(result.current).toBe('NOK 1 234.00')
  })

  it('will inherit locale from provider', () => {
    const wrapper = ({ children }) => (
      <Provider
        locale="en-GB"
        NumberFormat={{
          currency: true,
        }}
      >
        {children}
      </Provider>
    )
    const { result } = renderHook(() => useNumberFormat(1234), { wrapper })

    expect(result.current).toBe('NOK 1 234.00')
  })

  it('should show dashes when number is invalid', () => {
    const wrapper = ({ children }) => (
      <Provider
        locale="en-GB"
        NumberFormat={{
          currency: true,
        }}
      >
        {children}
      </Provider>
    )
    const { result } = renderHook(() => useNumberFormat('invalid'), {
      wrapper,
    })

    expect(result.current).toBe('NOK–')
  })
})
