/**
 * Core number formatting helpers used by all NumberFormat variants.
 */

import { LOCALE } from '../../../shared/defaults'
import { warn, escapeRegexChars } from '../../../shared/component-helper'
import { IS_MAC } from '../../../shared/helpers'
import { ABSENT_VALUE_FORMAT, NUMBER_MINUS } from './constants'
import { getFallbackCurrencyDisplay } from './currencyDisplay'
import type {
  NumberFormatValue,
  FormatPartItem,
  PartFormatter,
  InternalNumberFormatOptions,
} from './types'

/**
 * Strips custom properties (e.g. `decimals`) so the object
 * is compatible with the native `Intl.NumberFormatOptions` type.
 */
function toIntlOptions({
  decimals: _decimals,
  ...rest
}: InternalNumberFormatOptions): Intl.NumberFormatOptions {
  return rest
}

function getFormatParts({
  number,
  locale = null,
  options = null,
}: {
  number: NumberFormatValue
  locale?: string | null
  options?: InternalNumberFormatOptions | null
}): FormatPartItem[] {
  if (
    typeof Intl !== 'undefined' &&
    typeof Intl.NumberFormat === 'function'
  ) {
    const inst = new Intl.NumberFormat(
      locale || LOCALE,
      toIntlOptions(options || {})
    )
    if (typeof inst.formatToParts === 'function') {
      return inst.formatToParts(Number(number))
    }
    return [{ value: inst.format(Number(number)), type: 'unknown' }]
  }

  return [{ value: String(number), type: 'unknown' }]
}

/**
 * For internal usage.
 * Returns an array that contains all the parts of the given number
 * `[{ value, type }]`.
 */
export function formatToParts(args: {
  number: NumberFormatValue
  locale?: string | null
  options?: InternalNumberFormatOptions | null
}): FormatPartItem[] {
  try {
    return getFormatParts(args)
  } catch (e) {
    warn(
      'NumberFormat: Failed to format number with Intl.NumberFormat:',
      e
    )
  }

  return [{ value: String(args.number), type: 'unknown' }]
}

export type FormatNumberCoreResult = {
  number: string
  parts: FormatPartItem[]
}

function joinParts(parts: FormatPartItem[]): string {
  return parts.reduce((acc, { value }) => acc + value, '')
}

function alignParts(
  parts: FormatPartItem[],
  currencyDisplay: InternalNumberFormatOptions['currencyDisplay']
): FormatPartItem[] {
  return parts.map((item) => {
    if (item.type === 'currency') {
      return {
        ...item,
        value: alignCurrencySymbol(item.value, currencyDisplay),
      }
    }

    return item
  })
}

/**
 * Aligns the currency symbol in the output based on the currency display option.
 * "norske kroner" ("Norwegian kroner") will be changed to "kroner" if the
 * currency display option is set to "name".
 */
export function alignCurrencySymbol(
  output: string | number,
  currencyDisplay: string | boolean | null | undefined
): string {
  if (typeof output === 'string' && currencyDisplay === 'name') {
    output = output.replace(/(nor[^\s]+?)\s(\w+)/i, '$2')
  }
  return String(output)
}

/**
 * When e.g. a currency number is given with a minus,
 * this function transforms the minus to be moved before the number
 * instead of the symbol.
 *
 * It only cleans if locale is Norwegian.
 * Form `-NOK 1 234` to `NOK -1 234`.
 */
export const prepareMinus = (
  display: string,
  locale: string | null
): string => {
  if (!(locale && /(no|nb|nn)$/i.test(locale))) {
    return display
  }

  // check for first and second char
  const first = display[0]
  const second = display[1]

  // Seems to be the invalid replacement
  if (first === '-' && second === '-') {
    return display
  }

  const reg = `^(${NUMBER_MINUS})`

  if (new RegExp(reg).test(first)) {
    // if second is number
    if (parseFloat(second) > 0) {
      // then do not swap
      display = display.replace(new RegExp(reg + '(.*)'), '-$2')
    } else {
      // then first has to be currency
      display = display.replace(new RegExp(reg + '([^0-9]+)(.*)'), '$2-$3')
    }
  }

  return display
}

export function prepareMinusParts(
  display: string,
  parts: FormatPartItem[] | undefined,
  locale: string | null
): FormatNumberCoreResult {
  const number = prepareMinus(display, locale)

  if (!parts || number === display) {
    return { number, parts: parts ?? [] }
  }

  const nextParts = parts.map((part) => {
    if (
      part.type === 'minusSign' &&
      display.startsWith(part.value) &&
      number.startsWith('-')
    ) {
      return { ...part, value: '-' }
    }

    return part
  })

  if (joinParts(nextParts) === number) {
    return { number, parts: nextParts }
  }

  return { number, parts: [] }
}

/**
 * Enhance VoiceOver support on mobile devices.
 * Numbers under 99.999 are read out correctly, but only if we remove the spaces.
 */
export const enhanceSR = (
  value: NumberFormatValue,
  aria: string,
  locale: string | null
): string => {
  if (IS_MAC && Math.abs(parseFloat(String(value))) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  aria = prepareMinus(aria, locale)

  return aria
}

function replaceNaNWithDash(number: string | number): string {
  const string = String(number)
  const replaced = string.replace(/NaN/, ABSENT_VALUE_FORMAT)

  if (!/NaN/.test(string)) {
    return replaced
  }

  const escapedDash = escapeRegexChars(ABSENT_VALUE_FORMAT)
  return replaced.replace(
    new RegExp(`([^\\s])${escapedDash}`, 'g'),
    `$1 ${ABSENT_VALUE_FORMAT}`
  )
}

/**
 * The main number formatter function.
 * Calls the browser/Node.js `Intl.NumberFormat` API.
 */
export const formatNumberCore = (
  number: NumberFormatValue,
  locale: string | null,
  options: InternalNumberFormatOptions = {},
  formatter: PartFormatter | null = null
): string => {
  return formatNumberCoreParts(number, locale, options, formatter).number
}

export const formatNumberCoreParts = (
  number: NumberFormatValue,
  locale: string | null,
  options: InternalNumberFormatOptions = {},
  formatter: PartFormatter | null = null
): FormatNumberCoreResult => {
  let parts: FormatPartItem[] = []

  try {
    if (options.currencyDisplay) {
      options.currencyDisplay = getFallbackCurrencyDisplay(
        locale,
        options.currencyDisplay
      )
    }

    // remove unsupported decimals
    delete options.decimals

    parts = getFormatParts({
      number: formatter ? Number(number) : parseFloat(String(number)),
      locale,
      options,
    }).map((item) => (formatter ? formatter(item) : item))
    parts = alignParts(parts, options.currencyDisplay)
    number = joinParts(parts)

    if (
      new RegExp(`^(${NUMBER_MINUS})(0|0[^\\d]|0\\s.*)$`).test(
        String(number)
      )
    ) {
      number = String(number).replace(
        new RegExp(`(${NUMBER_MINUS})0`),
        '0'
      )
    }
  } catch (e) {
    warn(
      `Number could not be formatted: ${JSON.stringify([
        number,
        locale,
        options,
      ])}`,
      e
    )
  }

  number = replaceNaNWithDash(
    alignCurrencySymbol(number, options.currencyDisplay)
  )

  if (joinParts(parts) !== String(number)) {
    parts = []
  }

  return { number: String(number), parts }
}
