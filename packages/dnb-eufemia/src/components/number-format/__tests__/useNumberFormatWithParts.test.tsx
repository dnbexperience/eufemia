/**
 * Hook Test
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useNumberFormatWithParts from '../useNumberFormatWithParts'
import { formatCurrency, formatPercent, formatNumber } from '../utils'
import Provider from '../../../shared/Provider'

describe('useNumberFormatWithParts', () => {
  it('will return object with parts by default', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        number: '1 234,00 kr',
        aria: '1 234,00 kroner',
        parts: expect.objectContaining({
          sign: null,
          number: '1 234,00',
          currency: 'kr',
          currencyPosition: 'after',
        }),
      }),
    )
  })

  it('will include split parts for currency when currency is enabled', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(-1234, formatCurrency),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          sign: '-',
          signedNumber: '-1\u00A0234,00',
          number: '1\u00A0234,00',
          currency: 'kr',
          currencyPosition: 'after',
        }),
      }),
    )
  })

  it('will derive before-position and after-currency space for en-GB currency', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        currency: 'NOK',
        locale: 'en-GB',
      }),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'before',
          currency: 'NOK',
          spaceAfterCurrency: true,
          spaceBeforeCurrency: false,
        }),
      }),
    )
  })

  it('will derive after-position and before-currency space for nb-NO currency', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        locale: 'nb-NO',
      }),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'after',
          currency: 'kr',
          spaceAfterCurrency: false,
          spaceBeforeCurrency: true,
        }),
      }),
    )
  })

  it('will include split parts for plain numbers by default', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatNumber, {
        signDisplay: 'always',
      }),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          sign: '+',
          signedNumber: '+1\u00A0234',
          number: '1\u00A0234',
          currency: null,
          currencyPosition: null,
        }),
      }),
    )
  })

  it('will include split parts for percent values', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(-12.34, formatPercent),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        number: '−12,34 %',
        parts: expect.objectContaining({
          sign: '−',
          signedNumber: '−12,34',
          number: '12,34',
          currency: null,
          currencyPosition: null,
          percent: '%',
          percentSpacing: '\u00A0',
        }),
      }),
    )
  })

  it('will follow explicit currencyPosition="after" for en-GB', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        currency: 'NOK',
        locale: 'en-GB',
        currencyPosition: 'after',
      }),
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'after',
          currency: 'NOK',
        }),
      }),
    )
  })

  it('will not inherit currency from provider unless explicitly enabled', () => {
    const wrapper = ({ children }) => (
      <Provider
        locale="nb-NO"
        NumberFormat={{
          currency: true,
          locale: 'en-GB',
        }}
      >
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () =>
        useNumberFormatWithParts(1234, formatNumber, {
          locale: 'en-GB',
        }),
      { wrapper },
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        number: '1,234',
      }),
    )
  })

  it('will return plain formatting when returnAria is false', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        returnAria: false,
      }),
    )

    expect(result.current).toBe('1 234,00 kr')
  })

  it('defaults to formatNumber when no formatter is supplied', () => {
    const { result } = renderHook(() => useNumberFormatWithParts(1234))

    expect(result.current).toEqual(
      expect.objectContaining({
        number: '1\u00A0234',
        parts: expect.objectContaining({
          number: '1\u00A0234',
          currency: null,
          currencyPosition: null,
        }),
      }),
    )
  })
})
