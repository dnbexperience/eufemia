/**
 * Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import useNumberFormatWithParts from '../useNumberFormatWithParts'
import { formatCurrency, formatPercent, formatNumber } from '../utils'
import type { NumberFormatter } from '../useNumberFormat'
import {
  numberFormatDisplayPartsSymbol,
  type NumberFormatInternalOptionParams,
  type NumberFormatReturnValueWithDisplayParts,
} from '../utils/displayParts'
import Provider from '../../../shared/Provider'

describe('useNumberFormatWithParts', () => {
  it('will return object with parts by default', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency)
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
      })
    )
  })

  it('will include split parts for currency when currency is enabled', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(-1234, formatCurrency)
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
      })
    )
  })

  describe('compact', () => {
    describe('currency', () => {
      it('will include compact suffix in the number part', () => {
        const { result } = renderHook(() =>
          useNumberFormatWithParts(1300000, formatCurrency, {
            compact: true,
            decimals: 1,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1,3 mill. kr',
            parts: expect.objectContaining({
              signedNumber: '1,3 mill.',
              number: '1,3 mill.',
              currency: 'kr',
              currencyPosition: 'after',
              spaceBeforeCurrency: true,
            }),
          })
        )
      })

      it('will include compact suffix in the number part for before-position currency', () => {
        const { result } = renderHook(() =>
          useNumberFormatWithParts(1300000, formatCurrency, {
            compact: true,
            currency: 'NOK',
            decimals: 1,
            locale: 'en-GB',
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: 'NOK 1.3m',
            parts: expect.objectContaining({
              signedNumber: '1.3m',
              number: '1.3m',
              currency: 'NOK',
              currencyPosition: 'before',
              spaceAfterCurrency: true,
            }),
          })
        )
      })

      it('will include compact suffix when value is cleaned', () => {
        const { result } = renderHook(() =>
          useNumberFormatWithParts('1 300 000', formatCurrency, {
            clean: true,
            compact: true,
            decimals: 1,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1,3 mill. kr',
            parts: expect.objectContaining({
              signedNumber: '1,3 mill.',
              number: '1,3 mill.',
              currency: 'kr',
              currencyPosition: 'after',
            }),
          })
        )
      })

      it('will use display parts when fallback parsing cannot split joined compact currency output', () => {
        const formatJoinedCurrency = (() => {
          const result: NumberFormatReturnValueWithDisplayParts = {
            value: 1000000,
            cleanedValue: '1000000',
            number: '1Mkr',
            aria: '1 million kroner',
            locale: 'nb-NO',
            type: 'currency',
          }

          Object.defineProperty(result, numberFormatDisplayPartsSymbol, {
            value: [
              { type: 'integer', value: '1' },
              { type: 'compact', value: 'M' },
              { type: 'currency', value: 'kr' },
            ],
          })

          return result
        }) as unknown as NumberFormatter

        const { result } = renderHook(() =>
          useNumberFormatWithParts(1000000, formatJoinedCurrency, {
            compact: true,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1Mkr',
            parts: expect.objectContaining({
              signedNumber: '1M',
              number: '1M',
              currency: 'kr',
              currencyPosition: 'after',
              spaceBeforeCurrency: false,
            }),
          })
        )
      })

      it('will keep display parts internal and opt-in for formatters', () => {
        const regularResult = formatCurrency(1300000, {
          compact: true,
          decimals: 1,
          returnAria: true,
        })

        expect(numberFormatDisplayPartsSymbol in regularResult).toBe(false)

        const internalResult = formatCurrency(1300000, {
          compact: true,
          decimals: 1,
          returnAria: true,
          returnDisplayParts: true,
        } as NumberFormatInternalOptionParams & {
          returnAria: true
        }) as NumberFormatReturnValueWithDisplayParts
        const descriptor = Object.getOwnPropertyDescriptor(
          internalResult,
          numberFormatDisplayPartsSymbol
        )
        const displayParts = internalResult[numberFormatDisplayPartsSymbol]

        expect(descriptor?.enumerable).toBe(false)
        expect(displayParts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ type: 'compact', value: 'mill.' }),
            expect.objectContaining({ type: 'currency', value: 'kr' }),
          ])
        )
        expect(displayParts.map(({ value }) => value).join('')).toBe(
          internalResult.number
        )
      })
    })

    describe('number', () => {
      it('will include compact suffix in the number part', () => {
        const { result } = renderHook(() =>
          useNumberFormatWithParts(1300000, formatNumber, {
            compact: true,
            decimals: 1,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1,3 mill.',
            parts: expect.objectContaining({
              signedNumber: '1,3 mill.',
              number: '1,3 mill.',
              currency: null,
              currencyPosition: null,
            }),
          })
        )
      })

      it('will include compact suffix when formatter wraps formatNumber', () => {
        const formatWrappedNumber: NumberFormatter = ((value, options) =>
          formatNumber(value, options)) as NumberFormatter

        const { result } = renderHook(() =>
          useNumberFormatWithParts(1300000, formatWrappedNumber, {
            compact: true,
            decimals: 1,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1,3 mill.',
            parts: expect.objectContaining({
              signedNumber: '1,3 mill.',
              number: '1,3 mill.',
              currency: null,
              currencyPosition: null,
            }),
          })
        )
      })
    })

    describe('percent', () => {
      it('will not include percent sign in the number part', () => {
        const { result } = renderHook(() =>
          useNumberFormatWithParts(1300, formatPercent, {
            compact: true,
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            number: '1 300 %',
            parts: expect.objectContaining({
              signedNumber: '1 300',
              number: '1 300',
              currency: null,
              currencyPosition: null,
              percent: '%',
            }),
          })
        )
      })
    })
  })

  it('will derive before-position and after-currency space for en-GB currency', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        currency: 'NOK',
        locale: 'en-GB',
      })
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'before',
          currency: 'NOK',
          spaceAfterCurrency: true,
          spaceBeforeCurrency: false,
        }),
      })
    )
  })

  it('will derive after-position and before-currency space for nb-NO currency', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        locale: 'nb-NO',
      })
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'after',
          currency: 'kr',
          spaceAfterCurrency: false,
          spaceBeforeCurrency: true,
        }),
      })
    )
  })

  it('will include split parts for plain numbers by default', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatNumber, {
        signDisplay: 'always',
      })
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
      })
    )
  })

  it('will include split parts for percent values', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(-12.34, formatPercent)
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
      })
    )
  })

  it('will follow explicit currencyPosition="after" for en-GB', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        currency: 'NOK',
        locale: 'en-GB',
        currencyPosition: 'after',
      })
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        parts: expect.objectContaining({
          currencyPosition: 'after',
          currency: 'NOK',
        }),
      })
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
      { wrapper }
    )

    expect(result.current).toEqual(
      expect.objectContaining({
        number: '1,234',
      })
    )
  })

  it('will return plain formatting when returnAria is false', () => {
    const { result } = renderHook(() =>
      useNumberFormatWithParts(1234, formatCurrency, {
        returnAria: false,
      })
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
      })
    )
  })
})
