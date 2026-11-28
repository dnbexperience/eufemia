/** Normalize a decimal without first passing its digits through a double. */
export function parseDecimal(input: string) {
  const [mantissa, exponent, extra] = input.trim().split(/e/i, 3)
  const sign = mantissa.startsWith('-') ? '-' : ''
  const magnitude = mantissa.replace(/^[+-]/, '')
  const pointParts = magnitude.split('.', 3)
  let [integer, fraction = ''] = pointParts
  if (
    (!integer && !fraction) ||
    /\D/.test(integer + fraction) ||
    pointParts.length > 2 ||
    extra !== undefined ||
    (exponent !== undefined && !/^[+-]?\d+$/.test(exponent))
  ) {
    return undefined
  }
  if (exponent) {
    const digits = integer + fraction
    const point = integer.length + Number(exponent)
    // Do not expand unbounded exponents. Leave overflow/underflow to Number.
    if (point > digits.length + 308 || point < -324) {
      return undefined
    }
    integer = digits
      .slice(0, Math.max(0, point))
      .padEnd(Math.max(0, point), '0')
    fraction =
      '0'.repeat(Math.max(0, -point)) + digits.slice(Math.max(0, point))
  }
  return {
    sign,
    integer: integer.replace(/^0+/, '') || '0',
    fraction,
  }
}

type Decimal = ReturnType<typeof parseDecimal>
export type DecimalRounding = 'omit' | 'half-even' | 'half-up'

/** Round the magnitude so positive and negative ties use the same rule. */
export function roundDecimal(
  { sign, integer, fraction }: Decimal,
  places: number,
  mode: DecimalRounding
): string {
  const digits = integer + fraction
  const cut = integer.length + places
  if (cut < 0) {
    return sign + '0'
  }
  if (cut < digits.length) {
    let kept = digits.slice(0, cut) || '0'
    const first = digits[cut]
    const tieRoundsUp =
      mode === 'half-up' ||
      Number(kept.slice(-1)) % 2 === 1 ||
      /[1-9]/.test(digits.slice(cut + 1))
    if (
      mode !== 'omit' &&
      (first > '5' || (first === '5' && tieRoundsUp))
    ) {
      kept = String(BigInt(kept) + 1n)
    }
    if (places <= 0) {
      return sign + (kept === '0' ? kept : kept + '0'.repeat(-places))
    }
    kept = kept.padStart(places + 1, '0')
    integer = kept.slice(0, -places)
    fraction = kept.slice(-places)
  }
  // Remove trailing zeros without rescanning a long run of internal zeros.
  let end = fraction.length
  while (end > 0 && fraction[end - 1] === '0') {
    end--
  }
  return sign + integer + (end ? '.' + fraction.slice(0, end) : '')
}

/** Divide by 100 for Intl percent formatting without losing string digits. */
export function percentToFraction(value: string | number) {
  const decimal = typeof value === 'string' && parseDecimal(value)
  if (!decimal) {
    return Number(value) / 100
  }
  const integer = decimal.integer.padStart(3, '0')
  return (
    decimal.sign +
    integer.slice(0, -2) +
    '.' +
    integer.slice(-2) +
    decimal.fraction
  )
}
