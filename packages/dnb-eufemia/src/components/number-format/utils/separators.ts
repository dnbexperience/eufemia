// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Locale-aware separator lookups and currency symbol resolution.
 */

import { formatToParts, alignCurrencySymbol } from './formatNumber'
import { getFallbackCurrencyDisplay, CURRENCY } from './currencyDisplay'

/**
 * Returns a decimal separator symbol based on the given locale.
 */
export function getDecimalSeparator(locale = null) {
  const separator =
    formatToParts({
      number: 1.1,
      locale,
    }).find(({ type }) => type === 'decimal')?.value || ',' // defaults to nb-NO

  return separator
}

/**
 * Returns a thousands separator symbol based on the given locale.
 */
export function getThousandsSeparator(locale = null) {
  return (
    formatToParts({
      number: 1000,
      locale,
    }).find(({ type }) => type === 'group')?.value || ' '
  ) // defaults to nb-NO
}

/**
 * Returns a currency symbol based on the given locale.
 */
export function getCurrencySymbol(
  locale: string | null = null,
  currency: string | boolean | null = null,
  display: string | boolean | null = null,
  number: string | number = 2
) {
  if (!currency) {
    currency = CURRENCY
  }

  const currencyDisplay = getFallbackCurrencyDisplay(locale, display)

  return alignCurrencySymbol(
    formatToParts({
      number,
      locale,
      options: {
        style: 'currency',
        currency,
        currencyDisplay,
      },
    }).find(({ type }) => type === 'currency')?.value || currency,
    currencyDisplay
  )
}
