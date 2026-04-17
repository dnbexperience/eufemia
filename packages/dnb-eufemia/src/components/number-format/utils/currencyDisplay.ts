/**
 * Helpers for currency sign display lookup and fallback handling.
 */

import {
  CURRENCY,
  CURRENCY_DISPLAY,
  CURRENCY_FALLBACK_DISPLAY,
} from '../../../shared/defaults'
import type { CurrencyDisplayValue } from './types'

const validCurrencyDisplayValues: ReadonlySet<string> =
  new Set<CurrencyDisplayValue>(['code', 'name', 'symbol', 'narrowSymbol'])

function isCurrencyDisplayValue(
  value: string
): value is CurrencyDisplayValue {
  return validCurrencyDisplayValues.has(value)
}

/**
 * Will return currency display value based on navigator/browser and locale.
 */
export function getFallbackCurrencyDisplay(
  locale: string | null = null,
  currencyDisplay: string | boolean | null = null
): CurrencyDisplayValue {
  // If currencyDisplay is not defined and locale is "no", use narrowSymbol
  if (!currencyDisplay && (!locale || /(no|nb|nn)$/i.test(locale))) {
    currencyDisplay = CURRENCY_DISPLAY
  }

  const value = String(currencyDisplay || '')

  if (isCurrencyDisplayValue(value)) {
    return value
  }

  return CURRENCY_FALLBACK_DISPLAY
}

export { CURRENCY, CURRENCY_DISPLAY, CURRENCY_FALLBACK_DISPLAY }
