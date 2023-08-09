interface FormatNumberOptions {
  prefix?: string
  suffix?: string
  /** Character to use for separating groups of number. Like '12 345' for 12345. */
  thousandSeparator?: string
  /** Max number of decimals. For source numbers with higher number of decimals, the number will be rounded. Will not add leading zeros. */
  decimalLimit?: number
  /** Set a fixed number of decimals (rounding when more decimals, adding leading zeros when less). */
  fixedDecimals?: number
  /** Symbol to separate between digits and decimals. */
  decimalSymbol?: string
  /** For showing magnitude of original number. For instance, 23500000 with magnitude 6 displays as 23,5 */
  magnitude?: number
}

export function formatNumber(
  value: number,
  options?: FormatNumberOptions
): string {
  const {
    thousandSeparator,
    decimalLimit,
    fixedDecimals,
    decimalSymbol = ',', // Norwegian default format
    magnitude,
    prefix,
    suffix,
  } = options ?? {}

  const withMagnitude =
    magnitude !== undefined ? value / Math.pow(10, magnitude) : value

  const withDecimals =
    fixedDecimals !== undefined
      ? withMagnitude.toFixed(fixedDecimals)
      : decimalLimit
      ? (
          Math.round(withMagnitude * Math.pow(10, decimalLimit)) /
          Math.pow(10, decimalLimit)
        ).toString()
      : withMagnitude.toString()

  const withDecimalSymbol =
    decimalSymbol !== undefined
      ? withDecimals.replace('.', decimalSymbol)
      : withDecimals

  const withThousandSeparator =
    thousandSeparator !== undefined
      ? withDecimalSymbol.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          thousandSeparator
        )
      : withDecimalSymbol

  const withPrefix =
    prefix !== undefined
      ? prefix + withThousandSeparator
      : withThousandSeparator

  const withSuffix =
    suffix !== undefined ? withPrefix + suffix : withPrefix

  return withSuffix
}

export function parseFormattedNumber(
  formattedValue: string,
  options?: FormatNumberOptions
): number {
  const {
    thousandSeparator,
    decimalSymbol = ',', // Norwegian default format
    magnitude,
    prefix,
    suffix,
  } = options ?? {}

  const parsedDecimalSymbol =
    decimalSymbol !== undefined
      ? formattedValue.replace(decimalSymbol, '.')
      : formattedValue

  const parsedThousandSeparator =
    thousandSeparator !== undefined
      ? parsedDecimalSymbol.split(thousandSeparator).join('')
      : parsedDecimalSymbol

  const parsedPrefix =
    prefix !== undefined &&
    parsedThousandSeparator.substring(0, prefix.length) === prefix
      ? parsedThousandSeparator.substring(prefix.length)
      : parsedThousandSeparator

  const parsedSuffix =
    suffix !== undefined &&
    parsedPrefix.slice(suffix.length * -1) === suffix
      ? parsedPrefix.substring(0, parsedPrefix.length - suffix.length)
      : parsedPrefix

  const parsedNumber = Number(parsedSuffix)

  const parsedMagnitude =
    magnitude !== undefined
      ? // toFixed to avoid inaccuracies (like 10/5 = 1.999999999999998)
        Number((parsedNumber * Math.pow(10, magnitude)).toFixed(6))
      : parsedNumber

  return parsedMagnitude
}
