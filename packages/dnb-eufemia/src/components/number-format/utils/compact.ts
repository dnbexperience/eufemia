// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Helpers to configure the `Intl.NumberFormat` compact notation.
 */

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
} = {}) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  value = parseInt(Math.abs(value), 10)
  opts.notation = 'compact'

  // For numbers under 1M we do
  if (compact === true && locale && /(no|nb|nn)$/i.test(locale)) {
    opts.compactDisplay = Math.abs(value) < 1000000 ? 'long' : 'short'
  } else {
    opts.compactDisplay = compact !== true ? compact : 'short'
  }

  if (typeof opts.maximumSignificantDigits === 'undefined') {
    if (isNaN(parseFloat(decimals))) {
      decimals = 0
    } else {
      decimals = parseFloat(decimals)
    }

    // This formula ensures we always get the same amount decimals
    const ref = String(value).length % 3
    if (ref === 2) {
      decimals += 1
    } else if (ref === 0) {
      decimals += 2
    }

    // Firefox issue?
    // If we do not define "maximumSignificantDigits" Firefox does not show any decimals at all
    opts.maximumSignificantDigits = decimals + 1
  }
}

/**
 * Helper for getting a consistent compact format.
 * Mutates the given `opts` object.
 */
export function handleCompactBeforeAria({ value, compact, opts }) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  opts.compactDisplay = 'long'
}

/**
 * Checks if we should/can handle the compact format.
 */
export function canHandleCompact({ value, compact }) {
  if (compact && Math.abs(value) >= 1000) {
    return true
  }

  return false
}
