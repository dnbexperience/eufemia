// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Shared format plumbing used by the variant formatters
 * (`formatPlainNumber`, `formatPercent`, `formatCurrency`, etc.).
 */

import { LOCALE } from '../../../shared/defaults'
import { warn } from '../../../shared/component-helper'
import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { cleanNumber } from './cleanNumber'
import { formatDecimals } from './decimals'
import { formatNumber, prepareMinus, enhanceSR } from './formatNumber'
import { getThousandsSeparator } from './separators'
import {
  handleCompactBeforeDisplay,
  handleCompactBeforeAria,
} from './compact'
import locales from '../../../shared/locales'

/**
 * Normalises locale (handles `null` + `auto`).
 */
export function resolveLocale(locale) {
  if (!locale) {
    return LOCALE
  }
  if (locale === 'auto') {
    try {
      return window.navigator.language
    } catch (e) {
      warn(e)
    }
  }
  return locale
}

/**
 * Parses the `options` argument (may be a JSON string) and mixes in
 * `signDisplay` when provided.
 */
export function prepareFormatOptions({ options, signDisplay }) {
  const opts =
    (typeof options === 'string' && options[0] === '{'
      ? JSON.parse(options)
      : options) || {}

  if (signDisplay) {
    opts.signDisplay = signDisplay
  }

  return opts
}

/**
 * Marker value used when `value` was absent (null/undefined/empty).
 */
export { ABSENT_VALUE_FORMAT, isAbsent }

/**
 * Builds a default return object that a variant formatter can extend.
 */
export function buildReturn({
  value,
  locale,
  display,
  aria,
  type,
  opts,
  cleanCopyValue,
  invalidAriaText,
}) {
  let cleanedValue

  if (cleanCopyValue) {
    cleanedValue = formatNumber(
      opts.style === 'percent' ? value / 100 : value,
      locale,
      opts,
      (item) => {
        switch (item.type) {
          case 'group':
          case 'literal':
          case 'currency':
          case 'percentSign':
            item.value = ''
            return item
          default:
            return item
        }
      }
    )
  } else {
    const thousandsSeparator = getThousandsSeparator(locale)
    cleanedValue = String(display).replace(
      new RegExp(`${thousandsSeparator}(?=\\d{3})`, 'g'),
      ''
    )
  }

  if (value === 'invalid') {
    aria =
      invalidAriaText ||
      locales[locale]?.NumberFormat.notAvailable ||
      'N/A'
  }

  return { value, cleanedValue, number: display, aria, locale, type }
}

/**
 * Applies the sensible `maximumFractionDigits` defaults and runs `formatDecimals`.
 */
export function applyDecimalsForPlain({
  value,
  decimals,
  rounding,
  opts,
}) {
  if (parseFloat(decimals) >= 0) {
    return formatDecimals(value, decimals, rounding, opts)
  } else if (typeof opts.maximumFractionDigits === 'undefined') {
    // if no decimals are set, opts.maximumFractionDigits is set
    // why do we this? because the ".toLocaleString" will else use 3 as the default
    opts.maximumFractionDigits = 20
  }
  return value
}

export {
  cleanNumber,
  formatDecimals,
  formatNumber,
  prepareMinus,
  enhanceSR,
  handleCompactBeforeDisplay,
  handleCompactBeforeAria,
}

/**
 * Creates a public variant formatter given a type tag and a raw
 * `(number, locale) => { number, aria }` function. The returned function
 * accepts `(value, options)` and returns either a formatted string or –
 * when `returnAria: true` – the full `NumberFormatReturnValue` object.
 */
export function formatWith(type, formatterFn) {
  return (
    value,
    {
      locale: inputLocale = null,
      clean = null,
      options = null,
      signDisplay = null,
      returnAria = false,
      invalidAriaText = null,
      cleanCopyValue = null,
    } = {}
  ) => {
    value = isAbsent(value) ? ABSENT_VALUE_FORMAT : value

    const locale = resolveLocale(inputLocale)
    const opts = prepareFormatOptions({ options, signDisplay })

    if (clean) {
      value = cleanNumber(value)
    }

    const { number: display, aria: initialAria } = formatterFn(value, locale)

    if (type === 'phone' && clean === null) {
      // clean, because of +47 and ++47
      value = cleanNumber(value)
    }

    if (!returnAria) {
      return display
    }

    return buildReturn({
      value,
      locale,
      display,
      aria: initialAria,
      type,
      opts,
      cleanCopyValue,
      invalidAriaText,
    })
  }
}
