import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './types'
/**
 * Formatter for percent numbers.
 *
 * Mirrors the original `format(..., { percent: true })` behaviour:
 * - Lets `Intl.NumberFormat` control the minus sign (we do NOT apply
 *   `prepareMinus`/`enhanceSR` here).
 * - Reports `type: 'number'` in the return object (kept for backwards
 *   compatibility with existing consumers).
 */

import {
  ABSENT_VALUE_FORMAT,
  isAbsent,
  buildReturn,
  cleanNumber,
  formatDecimals,
  formatNumberCoreParts,
  prepareFormatOptions,
  resolveLocale,
} from './formatCore'
import { countDecimals } from './decimals'
import { escapeRegexChars } from '../../../shared/component-helper'

export function formatPercent(
  value: NumberFormatValue | null | undefined,
  options: NumberFormatOptionParams & { returnAria: true }
): NumberFormatReturnValue
export function formatPercent(
  value: NumberFormatValue | null | undefined,
  options?: NumberFormatOptionParams
): string
export function formatPercent(
  value: NumberFormatValue | null | undefined,
  {
    locale: inputLocale = null,
    clean = false,
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

  if (parseFloat(String(decimals)) >= 0) {
    value = formatDecimals(value, decimals, rounding, opts)
  }

  if (decimals === null) {
    if (typeof opts.maximumFractionDigits === 'undefined') {
      decimals = countDecimals(value)
    }
    value = formatDecimals(value, decimals, rounding, opts)
  }

  if (!opts.style) {
    opts.style = 'percent'
  }

  const { number: display, parts } = formatNumberCoreParts(
    Number(value) / 100,
    locale,
    opts
  )

  if (!returnAria) {
    return display
  }

  let aria = display

  if (opts.style === 'percent' && Number.isFinite(Number(value))) {
    const unitParts = formatNumberCoreParts(value, locale, {
      ...opts,
      style: 'unit',
      unit: 'percent',
      unitDisplay: 'long',
    }).parts
    const unit = unitParts.find(({ type }) => type === 'unit')?.value
    const percentParts = parts.length
      ? parts
      : formatNumberCoreParts(0, locale, opts).parts
    const percentSign = percentParts.find(
      ({ type }) => type === 'percentSign'
    )?.value

    if (unit && percentSign) {
      // Keep the displayed digits so speech cannot round the value differently.
      aria = display
        .replace(
          new RegExp(`\\s*${escapeRegexChars(percentSign)}\\s*`),
          ` ${unit} `
        )
        .trim()
    }
  }

  return buildReturn({
    value,
    locale,
    display,
    aria,
    // Original `format()` only assigns `type = 'currency'` – percent keeps
    // the default "number" type.
    type: 'number',
    opts,
    cleanCopyValue,
    invalidAriaText,
    parts,
  })
}
