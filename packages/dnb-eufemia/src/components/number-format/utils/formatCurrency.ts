import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
  FormatPartItem,
  PartFormatter,
} from './types'
import type { NumberFormatInternalOptionParams } from './displayParts'
/**
 * Formatter for currency numbers.
 */

import {
  ABSENT_VALUE_FORMAT,
  isAbsent,
  buildReturn,
  cleanNumber,
  formatDecimals,
  formatNumberCore,
  formatNumberCoreWithParts,
  handleCompactBeforeAria,
  handleCompactBeforeDisplay,
  prepareFormatOptions,
  prepareMinus,
  resolveLocale,
  enhanceSR,
} from './formatCore'
import { currencyPositionFormatter } from './currencyPosition'
import { getFallbackCurrencyDisplay, CURRENCY } from './currencyDisplay'
import { alignCurrencySymbol } from './formatNumberCore'

function trimDisplayParts(parts: FormatPartItem[]): FormatPartItem[] {
  const displayParts = parts.map((part) => ({ ...part }))

  while (displayParts[0]?.value.length === 0) {
    displayParts.shift()
  }

  while (displayParts.at(-1)?.value.length === 0) {
    displayParts.pop()
  }

  const firstPart = displayParts[0]
  if (firstPart) {
    firstPart.value = firstPart.value.trimStart()
  }

  const lastPart = displayParts.at(-1)
  if (lastPart) {
    lastPart.value = lastPart.value.trimEnd()
  }

  return displayParts.filter(({ value }) => value.length > 0)
}

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
    returnDisplayParts = false,
    invalidAriaText = null,
    cleanCopyValue = null,
  }: NumberFormatInternalOptionParams = {}
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

  const displayResult = formatNumberCoreWithParts(
    cleanedNumber,
    locale,
    opts,
    formatter,
    returnDisplayParts
  )
  let display = prepareMinus(displayResult.display, locale)
  let displayParts =
    returnDisplayParts && display === displayResult.display
      ? displayResult.displayParts
      : null

  if (resolvedPosition && currencySuffix) {
    if (resolvedPosition === 'after') {
      display = `${display.trim()} ${currencySuffix}`
      displayParts = displayParts
        ? [
            ...trimDisplayParts(displayParts),
            { type: 'literal', value: ' ' },
            { type: 'currency', value: currencySuffix },
          ]
        : null
    } else if (resolvedPosition === 'before') {
      display = `${currencySuffix} ${display.trim()}`
      displayParts = displayParts
        ? [
            { type: 'currency', value: currencySuffix },
            { type: 'literal', value: ' ' },
            ...trimDisplayParts(displayParts),
          ]
        : null
    }
  }

  handleCompactBeforeAria({ value, compact, opts })

  // aria options
  let aria = formatNumberCore(cleanedNumber, locale, {
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
    displayParts,
    aria,
    type: 'currency',
    opts,
    cleanCopyValue,
    invalidAriaText,
  })
}
