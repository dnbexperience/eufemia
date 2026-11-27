/**
 * Decimal helpers (rounding, formatting fraction digits).
 */

import type {
  NumberFormatValue,
  InternalNumberFormatOptions,
} from './types'
import { parseDecimal, roundDecimal } from './decimalValue'
import type { DecimalRounding } from './decimalValue'

function roundValue(
  value: NumberFormatValue,
  places: number,
  mode: DecimalRounding
): NumberFormatValue {
  if (!Number.isInteger(places)) {
    return value
  }
  const decimal = parseDecimal(String(value))
  if (!decimal || Object.is(value, -0)) {
    return Number(value)
  }
  const rounded = roundDecimal(decimal, places, mode)
  const numeric = Number(rounded)
  // Keep the previous numeric return type only when it can carry all digits.
  return typeof value === 'number' ||
    String(numeric) === rounded ||
    rounded === '-0'
    ? numeric
    : rounded
}

/** Rounds a decimal tie to the nearest even digit. */
export function roundHalfEven(num: number, decimalPlaces = 2): number {
  return Number(roundValue(num, decimalPlaces, 'half-even'))
}

/** Sets fraction digit options and applies the requested decimal rounding. */
export const formatDecimals = (
  value: NumberFormatValue,
  decimals: number | string | null,
  rounding: string | boolean | null | undefined,
  opts: InternalNumberFormatOptions = {}
): NumberFormatValue => {
  decimals = parseFloat(String(decimals))

  if (decimals >= 0) {
    opts.minimumFractionDigits = decimals
    opts.maximumFractionDigits = decimals
  }

  if (
    (rounding === true ||
      rounding === 'omit' ||
      rounding === 'half-even') &&
    /[.e]/i.test(String(value))
  ) {
    return roundValue(
      value,
      opts.maximumFractionDigits ?? 2,
      rounding === 'half-even' ? rounding : 'omit'
    )
  }
  return value
}

/**
 * Find the amount of decimals.
 */
export const countDecimals = (
  value: NumberFormatValue,
  decimalSeparator = '.'
): number => {
  if (
    typeof value === 'number' &&
    Math.floor(value.valueOf()) === value.valueOf()
  ) {
    return 0
  }
  return String(value).split(decimalSeparator)[1]?.length || 0
}
