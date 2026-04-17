import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
  FormatPartItem,
  PartFormatter,
} from './types'
/**
 * Formatter for currency numbers.
 */

import {
  ABSENT_VALUE_FORMAT,
  isAbsent,
  buildReturn,
  cleanNumber,
  formatDecimals,
  formatNumber,
  handleCompactBeforeAria,
  handleCompactBeforeDisplay,
  prepareFormatOptions,
  prepareMinus,
  resolveLocale,
  enhanceSR,
} from './formatCore'
import { currencyPositionFormatter } from './currencyPosition'
import { getFallbackCurrencyDisplay, CURRENCY } from './currencyDisplay'
import { alignCurrencySymbol } from './formatNumber'

export function formatCurrency(
  value: NumberFormatValue | null | undefined,
  options: NumberFormatOptionParams & { returnAria: true }
): NumberFormatReturnValue
export function formatCurrency(
  value: NumberFormatValue | null | undefined,
  options?: NumberFormatOptionParams
): string
export function formatCurrency(
  value: NumberFormatValue | null | undefined,
  {
    locale: inputLocale = null,
    clean = false,
    compact = null,
    currency = true,
    currencyDisplay = null,
    currencyPosition = null,
    omitCurrencySign = null,
    decimals = null,
    rounding = null,
    signDisplay = null,
    options = null,
    returnAria = false,
    invalidAriaText = null,
    cleanCopyValue = null,
  }: NumberFormatOptionParams = {}
): string | NumberFormatReturnValue {
  value = isAbsent(value) ? ABSENT_VALUE_FORMAT : value

  const locale = resolveLocale(inputLocale)
  const opts = prepareFormatOptions({ options, signDisplay })

  if (clean) {
    value = cleanNumber(value)
  }

  opts.currency =
    opts.currency || (currency === true ? CURRENCY : currency || undefined)

  handleCompactBeforeDisplay({ value, locale, compact, decimals, opts })

  if (parseFloat(String(decimals)) >= 0) {
    value = formatDecimals(value, decimals, rounding, opts)
  } else if (decimals === null) {
    decimals = 2
    value = formatDecimals(value, decimals, rounding, opts)
  }

  // cleanup, but only if it did not got cleaned up already
  const cleanedNumber =
    parseFloat(String(decimals)) >= 0
      ? value
      : clean
        ? cleanNumber(value)
        : value

  if (currencyDisplay === false || currencyDisplay === '') {
    omitCurrencySign = true
  }

  opts.style = 'currency'
  opts.currencyDisplay = getFallbackCurrencyDisplay(
    locale,
    opts.currencyDisplay || currencyDisplay
  )

  // if currency has no decimal, then go ahead and remove it
  if (
    typeof opts.minimumFractionDigits === 'undefined' &&
    String(value).indexOf('.') === -1 &&
    Number(cleanedNumber) % 1 === 0
  ) {
    opts.minimumFractionDigits = 0 // to enforce Norwegian style
  }

  let formatter: PartFormatter | null = null

  if (omitCurrencySign) {
    formatter = (item: FormatPartItem) => {
      switch (item.type) {
        case 'literal':
          item.value = item.value === ' ' ? '' : item.value
          return item

        case 'currency':
          item.value = ''
          return item

        default:
          return item
      }
    }
  }

  /**
   * Make exception – if locale is Norwegian, and position is not defined, then use position "after"
   */
  let resolvedPosition = currencyPosition
  if (!resolvedPosition && locale && /(no|nb|nn)$/i.test(locale)) {
    resolvedPosition = 'after'
  }

  let currencySuffix: string | null = null
  if (resolvedPosition) {
    formatter = currencyPositionFormatter(
      formatter,
      ({ value: currencyValue }: FormatPartItem) => {
        return (currencySuffix = alignCurrencySymbol(
          currencyValue.trim(),
          currencyDisplay
        ))
      },
      resolvedPosition
    )
  }

  let display = formatNumber(cleanedNumber, locale, opts, formatter)
  display = prepareMinus(display, locale)

  if (resolvedPosition && currencySuffix) {
    if (resolvedPosition === 'after') {
      display = `${display.trim()} ${currencySuffix}`
    } else if (resolvedPosition === 'before') {
      display = `${currencySuffix} ${display.trim()}`
    }
  }

  handleCompactBeforeAria({ value, compact, opts })

  // aria options
  let aria = formatNumber(cleanedNumber, locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...opts,
    currencyDisplay: 'name',
  })
  aria = enhanceSR(cleanedNumber, aria, locale) // also calls prepareMinus

  if (!returnAria) {
    return display
  }

  return buildReturn({
    value,
    locale,
    display,
    aria,
    type: 'currency',
    opts,
    cleanCopyValue,
    invalidAriaText,
  })
}
