// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Helpers for currency sign display lookup and fallback handling.
 */

import {
  CURRENCY,
  CURRENCY_DISPLAY,
  CURRENCY_FALLBACK_DISPLAY,
} from '../../../shared/defaults'

/**
 * Will return currency display value based on navigator/browser and locale.
 */
export function getFallbackCurrencyDisplay(
  locale = null,
  currencyDisplay = null
) {
  // If currencyDisplay is not defined and locale is "no", use narrowSymbol
  if (!currencyDisplay && (!locale || /(no|nb|nn)$/i.test(locale))) {
    currencyDisplay = CURRENCY_DISPLAY
  }

  return currencyDisplay || CURRENCY_FALLBACK_DISPLAY // code, name, symbol
}

export { CURRENCY, CURRENCY_DISPLAY, CURRENCY_FALLBACK_DISPLAY }
