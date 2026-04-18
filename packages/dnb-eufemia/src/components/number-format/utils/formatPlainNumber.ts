import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './types'
/**
 * Formatter for plain (non-currency / non-percent) numbers. Supports `compact`.
 */

import {
  ABSENT_VALUE_FORMAT,
  isAbsent,
  applyDecimalsForPlain,
  buildReturn,
  cleanNumber,
  formatNumberIntl,
  handleCompactBeforeAria,
  handleCompactBeforeDisplay,
  prepareFormatOptions,
  prepareMinus,
  resolveLocale,
  enhanceSR,
} from './formatCore'

export function formatNumber(
  value: NumberFormatValue | null | undefined,
  options: NumberFormatOptionParams & { returnAria: true }
): NumberFormatReturnValue
export function formatNumber(
  value: NumberFormatValue | null | undefined,
  options?: NumberFormatOptionParams
): string
export function formatNumber(
  value: NumberFormatValue | null | undefined,
  {
    locale: inputLocale = null,
    clean = false,
    compact = null,
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

  value = applyDecimalsForPlain({ value, decimals, rounding, opts })

  handleCompactBeforeDisplay({ value, locale, compact, decimals, opts })

  let display = formatNumberIntl(value, locale, opts)
  display = prepareMinus(display, locale)

  handleCompactBeforeAria({ value, compact, opts })

  // NVDA fix
  let aria = formatNumberIntl(value, locale, opts)
  aria = enhanceSR(value, aria, locale)

  if (!returnAria) {
    return display
  }

  return buildReturn({
    value,
    locale,
    display,
    aria,
    type: 'number',
    opts,
    cleanCopyValue,
    invalidAriaText,
  })
}

/**
 * @deprecated Use `formatNumber` instead.
 */
export const formatPlainNumber = formatNumber
