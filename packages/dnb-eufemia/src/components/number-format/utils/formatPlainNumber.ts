// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { NumberFormatOptionParams } from './types'
/**
 * Formatter for plain (non-currency / non-percent) numbers. Supports `compact`.
 */

import {
  ABSENT_VALUE_FORMAT,
  isAbsent,
  applyDecimalsForPlain,
  buildReturn,
  cleanNumber,
  formatNumber,
  handleCompactBeforeAria,
  handleCompactBeforeDisplay,
  prepareFormatOptions,
  prepareMinus,
  resolveLocale,
  enhanceSR,
} from './formatCore'

export const formatPlainNumber = (
  value,
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
) => {
  value = isAbsent(value) ? ABSENT_VALUE_FORMAT : value

  const locale = resolveLocale(inputLocale)
  const opts = prepareFormatOptions({ options, signDisplay })

  if (clean) {
    value = cleanNumber(value)
  }

  value = applyDecimalsForPlain({ value, decimals, rounding, opts })

  handleCompactBeforeDisplay({ value, locale, compact, decimals, opts })

  let display = formatNumber(value, locale, opts)
  display = prepareMinus(display, locale)

  handleCompactBeforeAria({ value, compact, opts })

  // NVDA fix
  let aria = formatNumber(value, locale, opts)
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
