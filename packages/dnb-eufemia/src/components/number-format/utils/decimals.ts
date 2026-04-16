// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Decimal helpers (rounding, formatting fraction digits).
 */

/**
 * Rounds the number to the nearest even number.
 */
export function roundHalfEven(num, decimalPlaces = 2) {
  const multiplier = Math.pow(10, decimalPlaces)
  const adjustedNum = num * multiplier
  const floored = Math.floor(adjustedNum)
  const diff = adjustedNum - floored

  if (diff > 0.5) {
    return Math.ceil(adjustedNum) / multiplier
  } else if (diff < 0.5) {
    return Math.floor(adjustedNum) / multiplier
  }

  // If exactly halfway, round to the nearest even number
  return floored % 2 === 0
    ? floored / multiplier
    : Math.ceil(adjustedNum) / multiplier
}

/**
 * Fill format decimals.
 */
export const formatDecimals = (value, decimals, rounding, opts = {}) => {
  decimals = parseFloat(decimals)

  // Mutate the given options
  if (decimals >= 0) {
    opts.minimumFractionDigits = decimals
    opts.maximumFractionDigits = decimals
  }

  if (String(value).includes('.')) {
    const decimalPlaces = decimals || opts.maximumFractionDigits
    if (rounding === 'omit' || rounding === true) {
      const factor = Math.pow(10, decimalPlaces)
      value = Math.trunc(value * factor) / factor
    } else {
      switch (rounding) {
        case 'half-even': {
          value = roundHalfEven(value, decimalPlaces)

          break
        }
      }
    }
  }

  return value
}

/**
 * Find the amount of decimals.
 */
export const countDecimals = (value, decimalSeparator = '.') => {
  if (
    typeof value === 'number' &&
    Math.floor(value.valueOf()) === value.valueOf()
  ) {
    return 0
  }
  return String(value).split(decimalSeparator)[1]?.length || 0
}
