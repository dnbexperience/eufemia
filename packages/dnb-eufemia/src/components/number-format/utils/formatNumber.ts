// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Core number formatting helpers used by all NumberFormat variants.
 */

import { LOCALE } from '../../../shared/defaults'
import { warn, escapeRegexChars } from '../../../shared/component-helper'
import { IS_MAC } from '../../../shared/helpers'
import { ABSENT_VALUE_FORMAT, NUMBER_MINUS } from './constants'
import { getFallbackCurrencyDisplay } from './currencyDisplay'

/**
 * For internal usage.
 * Returns an array that contains all the parts of the given number
 * `[{ value, type }]`.
 */
export function formatToParts({ number, locale = null, options = null }) {
  if (
    typeof Intl !== 'undefined' &&
    typeof Intl.NumberFormat === 'function'
  ) {
    try {
      const inst = Intl.NumberFormat(locale || LOCALE, options || {})
      if (typeof inst.formatToParts === 'function') {
        return inst.formatToParts(number)
      } else {
        return [{ value: inst.format(number) }]
      }
    } catch (e) {
      warn(e)
    }
  }

  return [{ value: number }]
}

/**
 * Aligns the currency symbol in the output based on the currency display option.
 * "norske kroner" ("Norwegian kroner") will be changed to "kroner" if the
 * currency display option is set to "name".
 */
export function alignCurrencySymbol(output, currencyDisplay) {
  if (typeof output === 'string' && currencyDisplay === 'name') {
    output = output.replace(/(nor[^\s]+?)\s(\w+)/i, '$2')
  }
  return output
}

/**
 * When e.g. a currency number is given with a minus,
 * this function transforms the minus to be moved before the number
 * instead of the symbol.
 *
 * It only cleans if locale is Norwegian.
 * Form `-NOK 1 234` to `NOK -1 234`.
 */
export const prepareMinus = (display, locale) => {
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

/**
 * Enhance VoiceOver support on mobile devices.
 * Numbers under 99.999 are read out correctly, but only if we remove the spaces.
 */
export const enhanceSR = (value, aria, locale) => {
  if (IS_MAC && Math.abs(parseFloat(value)) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  aria = prepareMinus(aria, locale)

  return aria
}

function replaceNaNWithDash(number) {
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
 * Calls the browser/Node.js `Intl.NumberFormat` or `Number.toLocaleString` APIs.
 */
export const formatNumber = (
  number,
  locale,
  options = {},
  formatter = null
) => {
  try {
    if (options.currencyDisplay) {
      options.currencyDisplay = getFallbackCurrencyDisplay(
        locale,
        options.currencyDisplay
      )
    }

    // remove unsupported decimals
    delete options.decimals

    if (formatter) {
      number = formatToParts({ number, locale, options })
        .map(formatter)
        .reduce((acc, { value }) => acc + value, '')
    } else if (
      typeof Number !== 'undefined' &&
      typeof Number.toLocaleString === 'function'
    ) {
      number = parseFloat(number).toLocaleString(locale, options)
    }
    if (new RegExp(`^(${NUMBER_MINUS})(0|0[^\\d]|0\\s.*)$`).test(number)) {
      number = number.replace(new RegExp(`(${NUMBER_MINUS})0`), '0')
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

  return replaceNaNWithDash(
    alignCurrencySymbol(number, options.currencyDisplay)
  )
}
