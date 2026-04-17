/**
 * Helpers to configure the `Intl.NumberFormat` compact notation.
 */

import type { NumberFormatValue } from './types'
import type { InternalNumberFormatOptions } from './types'

/**
 * Helper for getting a consistent compact format.
 * Mutates the given `opts` object.
 */
export function handleCompactBeforeDisplay({
  value,
  locale,
  compact,
  decimals = 0,
  opts,
}: {
  value: NumberFormatValue
  locale: string | null
  compact: boolean | 'short' | 'long' | null
  decimals?: number | string | null
  opts: InternalNumberFormatOptions
}) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  value = parseInt(String(Math.abs(Number(value))), 10)
  opts.notation = 'compact'

  // For numbers under 1M we do
  if (compact === true && locale && /(no|nb|nn)$/i.test(locale)) {
    opts.compactDisplay = Math.abs(value) < 1000000 ? 'long' : 'short'
  } else if (compact === 'long' || compact === 'short') {
    opts.compactDisplay = compact
  }

  if (typeof opts.maximumSignificantDigits === 'undefined') {
    let decimalCount = parseFloat(String(decimals))
    if (isNaN(decimalCount)) {
      decimalCount = 0
    }

    // This formula ensures we always get the same amount decimals
    const ref = String(value).length % 3
    if (ref === 2) {
      decimalCount += 1
    } else if (ref === 0) {
      decimalCount += 2
    }

    // Firefox issue?
    // If we do not define "maximumSignificantDigits" Firefox does not show any decimals at all
    opts.maximumSignificantDigits = decimalCount + 1
  }
}

/**
 * Helper for getting a consistent compact format.
 * Mutates the given `opts` object.
 */
export function handleCompactBeforeAria({
  value,
  compact,
  opts,
}: {
  value: NumberFormatValue
  compact: boolean | 'short' | 'long' | null
  opts: InternalNumberFormatOptions
}) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  opts.compactDisplay = 'long'
}

/**
 * Checks if we should/can handle the compact format.
 */
export function canHandleCompact({
  value,
  compact,
}: {
  value: NumberFormatValue
  compact: boolean | 'short' | 'long' | null
}): boolean {
  if (compact && Math.abs(Number(value)) >= 1000) {
    return true
  }

  return false
}
