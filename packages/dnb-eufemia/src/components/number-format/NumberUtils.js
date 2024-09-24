import React from 'react'
import Context from '../../shared/Context'

/**
 * Web NumberFormat Helpers
 *
 */

import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from '../../shared/defaults'
import {
  warn,
  isTrue,
  slugify,
  escapeRegexChars,
} from '../../shared/component-helper'
import {
  getOffsetTop,
  getOffsetLeft,
  getSelectedElement,
  copyToClipboard,
  IS_MAC,
  IS_WIN,
} from '../../shared/helpers'
import locales from '../../shared/locales'

const NUMBER_CHARS = '\\-0-9,.'

/**
 * Format a number to a streamlined format based on the given locale
 *
 * @param {string|number} value any number
 * @type {object} string or object { when: { min: 'small' } } that describes the media query
 * @property {string} locale - media queries
 * @property {boolean} clean - if true, clean the number for unwanted decimal separators
 * @property {string|boolean} compact - shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long"
 * @property {boolean} phone - if true, it formats to a phone number
 * @property {boolean} org - if true, it formats to a Organization Number
 * @property {boolean} ban - if true, it formats to a Bank Account Number
 * @property {boolean} nin - if true, it formats to a National Identification Number
 * @property {boolean} percent - if true, it formats with a percent
 * @property {string|boolean} currency - currency code (ISO 4217) or `true` to use the default, `NOK`
 * @property {string} currency_display - use false or empty string to hide the sign or "code", "name", "symbol" or "narrowSymbol" – supports the API from number.toLocaleString
 * @property {string} currency_position - can be "before" or "after"
 * @property {string} omit_currency_sign - hides currency sign if true is given
 * @property {number} decimals - defines how many decimals should be added
 * @property {boolean} omit_rounding - @deprecated Use `rounding: "omit"` instead.
 * @property {string} rounding - if `omit`, the decimal will NOT be rounded. If `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
 * @property {object} options - accepts all number.toLocaleString API options
 * @property {boolean} returnAria - if true, this function returns an object that includes an aria property with a special aria formatting
 * @returns a formatted number as a string or as an object if "returnAria" is true
 */
export const format = (
  value,
  {
    locale = null, // can be "auto"
    clean = false,
    compact = null,
    phone = null,
    org = null,
    ban = null,
    nin = null,
    percent = null,
    currency = null,
    currency_display = null,
    currency_position = null,
    omit_currency_sign = null,
    clean_copy_value = null,
    decimals = null,
    omit_rounding = null, // @deprecated – can be removed in v11
    rounding = null,
    options = null,
    returnAria = false,
  } = {}
) => {
  let display = value
  let aria = null
  let type = 'number'

  // because we are using context comparison
  if (!locale) {
    locale = LOCALE
  } else if (locale === 'auto') {
    try {
      locale = window.navigator.language
    } catch (e) {
      warn(e)
    }
  }

  if (isTrue(clean)) {
    value = cleanNumber(value)
  }

  const opts =
    (typeof options === 'string' && options[0] === '{'
      ? JSON.parse(options)
      : options) || {}

  if (parseFloat(decimals) >= 0) {
    value = formatDecimals(
      value,
      decimals,
      rounding ?? omit_rounding,
      opts
    )
  } else if (
    typeof opts.maximumFractionDigits === 'undefined' &&
    !isTrue(percent) &&
    !isTrue(currency)
  ) {
    // if no decimals are set, opts.maximumFractionDigits is set
    // why do we this? because the ".toLocaleString" will else use 3 as the default
    opts.maximumFractionDigits = 20
  }

  if (isTrue(phone)) {
    type = 'phone'
    const { number: _number, aria: _aria } = formatPhone(value, locale)

    if (clean === null) {
      value = cleanNumber(value) // clean, because of +47 and ++47
    }
    display = _number
    aria = _aria
  } else if (isTrue(ban)) {
    type = 'ban' // Bank Account Number
    const { number: _number, aria: _aria } = formatBAN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(nin)) {
    type = 'nin' // National Identification Number
    const { number: _number, aria: _aria } = formatNIN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(org)) {
    type = 'org' // organization number

    const { number: _number, aria: _aria } = formatORG(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(percent)) {
    if (decimals === null) {
      if (typeof opts.maximumFractionDigits === 'undefined') {
        decimals = countDecimals(value)
      }
      value = formatDecimals(
        value,
        decimals,
        rounding ?? omit_rounding,
        opts
      )
    }

    if (!opts.style) {
      opts.style = 'percent'
    }

    display = formatNumber(value / 100, locale, opts)
  } else if (isTrue(currency) || typeof currency === 'string') {
    type = 'currency'

    opts.currency =
      opts.currency || (isTrue(currency) ? CURRENCY : currency)

    handleCompactBeforeDisplay({ value, locale, compact, decimals, opts })

    if (decimals === null) {
      decimals = 2
      value = formatDecimals(
        value,
        decimals,
        rounding ?? omit_rounding,
        opts
      )
    }

    // cleanup, but only if it not got cleaned up already
    let cleanedNumber =
      decimals >= 0 ? value : clean ? cleanNumber(value) : value

    if (currency_display === false || currency_display === '') {
      omit_currency_sign = true
    }

    opts.style = 'currency'
    opts.currencyDisplay = getFallbackCurrencyDisplay(
      locale,
      opts.currencyDisplay || currency_display
    )

    // if currency has no decimal, then go ahead and remove it
    if (
      typeof opts.minimumFractionDigits === 'undefined' &&
      String(value).indexOf('.') === -1 &&
      cleanedNumber % 1 === 0
    ) {
      opts.minimumFractionDigits = 0 // to enforce Norwegian style
    }

    let formatter = undefined

    if (isTrue(omit_currency_sign)) {
      formatter = (item) => {
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
    if (!currency_position && locale && /(no|nb|nn)$/i.test(locale)) {
      currency_position = 'after'
    }

    let currencySuffix = null
    if (currency_position) {
      formatter = currencyPositionFormatter(
        formatter,
        ({ value }) => {
          return (currencySuffix = alignCurrencySymbol(
            value.trim(),
            currency_display
          ))
        },
        currency_position
      )
    }

    display = formatNumber(cleanedNumber, locale, opts, formatter)
    display = prepareMinus(display, locale)

    if (currency_position && currencySuffix) {
      if (currency_position === 'after') {
        display = `${display.trim()} ${currencySuffix}`
      } else if (currency_position === 'before') {
        display = `${currencySuffix} ${display.trim()}`
      }
    }

    handleCompactBeforeAria({ value, compact, opts })

    // aria options
    aria = formatNumber(cleanedNumber, locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...opts,
      currencyDisplay: 'name',
    })
    aria = enhanceSR(cleanedNumber, aria, locale) // also calls prepareMinus

    // get only the currency name
    // const num = aria.replace(/([^0-9])+$/g, '')
    // const name = aria.replace(num, '')
    // aria = cleanedNumber + name
  } else {
    handleCompactBeforeDisplay({ value, locale, compact, decimals, opts })

    display = formatNumber(value, locale, opts)
    display = prepareMinus(display, locale)

    handleCompactBeforeAria({ value, compact, opts })

    // fix for NVDA to make sure we read the number, we add a minimum fraction digit (decimal)
    // NVDA fix
    aria = formatNumber(value, locale, opts)
    aria = enhanceSR(value, aria, locale) // also calls prepareMinus
  }

  if (aria === null) {
    aria = display
  }

  if (returnAria) {
    let cleanedValue

    if (clean_copy_value) {
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
      aria = locales[locale].NumberFormat.not_available || 'N/A'
    }

    // return "locale" as well value,l, since we have to "auto" option
    return { value, cleanedValue, number: display, aria, locale, type }
  }

  return display
}

/**
 * Fill format decimals
 *
 * @param {number|string} value
 * @param {number} decimals how many decimals
 * @param {boolean} defines what rounding method to use for decimals
 * @param {boolean} clean whether the value should be cleaned or not
 * @param {object} opts immutable object
 * @returns a decimal prepared number
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
 * Find the amount of decimals
 *
 * @param {number|string} value any number
 * @param {string} decimalSeparator a dot or coma
 * @returns amount of decimals
 */
export const countDecimals = (value, decimalSeparator = '.') => {
  if (Math.floor(value.valueOf()) === value.valueOf()) {
    return 0
  }
  return String(value).split(decimalSeparator)[1]?.length || 0
}

/**
 * Changes the currency sign position
 *
 * For Norway, the position defaults to "after"
 *
 * @param {function} existingFormatter an existing number formatter or undefined
 * @param {function} callback function that will emitted with the currency
 * @param {string} position blank, before or after
 * @returns {function} number formatter
 */
const currencyPositionFormatter = (
  existingFormatter,
  callback,
  position = null
) => {
  let count = 0
  let countCurrency = -1

  return (item) => {
    // Ensure we do not overwrite a given formatter, but run it as well
    if (typeof existingFormatter === 'function') {
      item = existingFormatter(item)
    }

    count++

    switch (item.type) {
      case 'currency': {
        if (position === 'after' || (position === 'before' && count > 2)) {
          countCurrency = count
          callback(item)
          item.value = ''
        }
        return item
      }

      case 'literal': {
        // Remove the literal after currency
        if (count === countCurrency + 1) {
          item.value = ''
        }
        return item
      }

      default:
        return item
    }
  }
}

/**
 * When e.g. a currency number is given with a minus,
 * this function transforms the minus to be moved before the number
 * instead of the symbol.
 *
 * It only cleans if locale is Norwegian
 *
 * form -NOK 1 234 to NOK -1 234
 *
 * @param {string} display currency number that includes either a minus or not
 * @param {string} locale locale as a string
 * @returns {string} number
 */
const prepareMinus = (display, locale) => {
  /**
   * Make exception – if locale is NOT Norwegian,
   * we skip the cleanup
   */
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

  // change the position of minus if it's first
  // check for two minus - −
  // check also for hyphen ‐
  // check also for dashes ‒  –  —  ―
  const reg = '^(-|−|‐|‒|–|—|―)'

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
 * Aligns the currency symbol in the output based on the currency display option.
 * "norske kroner" ("Norwegian kroner") will be changed to "kroner" if the currency display option is set to "name".
 *
 * @param {string} output - The output string containing the currency symbol.
 * @param {string} currencyDisplay - The currency display option ('name' or 'symbol').
 * @returns {string} The aligned output string.
 */
function alignCurrencySymbol(output, currencyDisplay) {
  if (currencyDisplay === 'name') {
    output = output.replace(/(nor[^\s]+?)\s(\w+)/i, '$2')
  }
  return output
}

/**
 * Enhance VoiceOver support on mobile devices
 * Numbers under 99.999 are read out correctly, but only if we remove the spaces
 * Potential we could also check for locale: && /no|nb|nn/.test(locale)
 * but leave it for now without this extra check
 *
 * @param {string|number} value any number
 * @param {string} aria aria formatted number
 * @param {string} locale locale as a string
 * @returns aria number
 */
const enhanceSR = (value, aria, locale) => {
  if (IS_MAC && Math.abs(parseFloat(value)) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  aria = prepareMinus(aria, locale)

  return aria
}

/**
 * The main number formatter function
 * This function is used to call the browsers/Node.js "Intl.NumberFormat" or "Number.toLocaleString" APIs
 *
 * @param {string|number} number any number
 * @param {string} locale locale as a string
 * @param {string} options formatting options based on the toLocaleString API
 * @param {string} formatter optional, a custom formatter can be given
 * @returns formatted number
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

    if (locale && /(en|gb)$/i.test(locale)) {
      formatter = getGroupFormatter(locale, null, formatter)
    }

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

function replaceNaNWithDash(number) {
  return String(number).replace(/NaN/, '–')
}

/**
 * Use this function to format phone numbers
 *
 * @param {string|number} number a phone number
 * @param {string} locale locale as a string
 * @returns a formatted phone number
 */
export const formatPhone = (number, locale = null) => {
  let display = number
  let aria = null

  switch (locale) {
    default: {
      // cleanup
      number = String(number).replace(/[^+0-9]/g, '')

      let code = ''
      if (number.length > 8 && number.substr(0, 2) !== '00') {
        number = '+' + number
        number = number.replace(/^\+{2,}/, '+')
      }
      if (number[0] === '+') {
        code = number.substr(0, 3) + ' '
        number = number.substr(3)
      } else if (number.substr(0, 2) === '00') {
        code = number.substr(0, 4) + ' '
        number = number.substr(4)
      }
      code = code.replace('+', '00')
      const length = number.length

      // get 800 22 222
      if (length === 8 && number[0] === '8') {
        display =
          code +
          number
            .split(/([0-9]{3})([0-9]{2})/)
            .filter((s) => s)
            .join(' ')
      } else {
        // get 02000
        if (length < 6) {
          display = code + number
        } else {
          // get 6 or 8 formatting
          display =
            code +
            number
              .split(
                length === 6
                  ? /^(\+[0-9]{2})|([0-9]{3})/
                  : /^(\+[0-9]{2})|([0-9]{2})/
              )
              .filter((s) => s)
              .join(' ')
        }
      }

      aria =
        code +
        number
          .split(/([0-9]{2})/)
          .filter((s) => s)
          .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

/**
 * Use this function to format Bank Account Numbers
 *
 * @param {string|number} number a Bank Account Number
 * @param {string} locale locale as a string
 * @returns a formatted Bank Account Number
 */
export const formatBAN = (number, locale = null) => {
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // get 2000 12 34567
      display = number
        .split(/([0-9]{4})([0-9]{2})([0-9]{1,})/)
        .filter((s) => s)
        .join(' ')

      aria = number
        .split(/([0-9]{2})/)
        .filter((s) => s)
        .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

/**
 * Use this function to format Organization Numbers
 *
 * @param {string|number} number a Organization Number
 * @param {string} locale locale as a string
 * @returns a formatted Organization Number
 */
export const formatORG = (number, locale = null) => {
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // get 123 456 789
      display = number
        .split(/([0-9]{3})/)
        .filter((s) => s)
        .join(' ')

      aria = number
        .split(/([0-9]{1})/)
        .filter((s) => s)
        .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

/**
 * Use this function to format National Identification Numbers
 *
 * @param {string|number} number a National Identification Number
 * @param {string} locale locale as a string
 * @returns a formatted National Identification Number
 */
export const formatNIN = (number, locale = null) => {
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // get 180892 12345
      display = number
        .split(/([0-9]{6})/)
        .filter((s) => s)
        .join(' ')

      // correct nin for screen readers
      aria = display
        .split(
          /([0-9]{2})([0-9]{2})([0-9]{2}) ([0-9]{1})([0-9]{1})([0-9]{1})([0-9]{1})([0-9]{1})/
        )
        .filter((s) => s)
        .join(IS_WIN ? '. ' : ' ') // NVDA fix with a dot to not read date on FF
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

/**
 * This function cleans numbers for separators
 * https://en.wikipedia.org/wiki/Decimal_separator
 *
 * @param {string|number} num any number
 * @returns a number that contains valid number separators
 */
export function cleanNumber(
  num,
  {
    decimalSeparator = null,
    thousandsSeparator = null,
    prefix = null,
    suffix = null,
  } = {}
) {
  if (typeof num === 'number') {
    return num
  }

  num = String(num).trim()

  if (typeof prefix === 'string' && num.startsWith(prefix)) {
    num = num.substring(prefix.length, num.length)
  }
  if (typeof suffix === 'string' && num.endsWith(suffix)) {
    num = num.substring(0, num.length - suffix.length)
  }

  // 1. Remove invalid chars on the beginning (not a number)
  if (/^[^0-9-]/.test(num)) {
    num = num.replace(/^(^[^0-9-]+)/, '')
  }

  let decimal = decimalSeparator
  let thousands = thousandsSeparator

  // -12 345,678
  if (/(\s)([0-9]{3})/.test(num)) {
    thousands = thousands || '\\s'
    decimal = decimal || ','
  }

  // -12.345,678
  else if (
    /(\.)([0-9]{3})/.test(num) &&
    !/([,'][0-9]{3})(\.)([0-9]{3})/.test(num) // just an additional check, for support with more
  ) {
    thousands = thousands || '\\.'
    decimal = decimal || ",|·|'" // also support Spain and CH
  }

  // -1,234,567.891
  else if (/(,)([0-9]{3})/.test(num)) {
    thousands = thousands || ','
    decimal = decimal || '\\.|·' // also support Spain
  }

  // -1'234'567.891, only used in CH
  else if (/(')([0-9]{3})/.test(num)) {
    thousands = thousands || "'"
    decimal = decimal || '\\.|,'
  } else {
    thousands = ','
    decimal = '\\.'
  }

  // 3. Remove invalid thousand separators
  const thousandReg = thousandsSeparator
    ? new RegExp(
        `([0-9]|)(${escapeRegexChars(thousandsSeparator)})([0-9]{3})`,
        'g'
      )
    : new RegExp(`([0-9]|)(${thousands})([0-9]{3})`, 'g')
  if (thousandReg.test(num)) {
    num = num.replace(thousandReg, '$1$3')
  }

  // 2. Rename invalid decimal separator
  // Make sure that there are only two digits after the coma, then we clean that up.
  // else we don't, because it can be a US number
  // therefore, check first, is there a chance of being a decimal?
  // const decimalReg = new RegExp(`(${decimal})([0-9]{1,2})`, 'g')
  const decimalReg = decimalSeparator
    ? new RegExp(`(${escapeRegexChars(decimalSeparator)})([0-9]{0,})`, 'g')
    : new RegExp(`(${decimal})([0-9]{1,2})`, 'g')
  if (decimalReg.test(num)) {
    num = num.replace(decimalReg, '.$2')
  }

  // Edge case, if we have more than 2 decimals, replace these decimals
  if (!decimalSeparator) {
    const decimalBackup = new RegExp(`(${decimal})([0-9]{3,})`, 'g')
    if (decimalBackup.test(num)) {
      num = num.replace(decimalBackup, '.$2')
    }
  }

  // Remove all invalid chars
  return num.replace(new RegExp(`([^${NUMBER_CHARS}])`, 'g'), '')
}

/**
 * So iOS v13 can select something on the first try, we run this add range trick.
 * NB: This hack may be removed in future iOS versions.
 */
export function runIOSSelectionFix() {
  try {
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    selection.addRange(range)
  } catch (e) {
    //
  }
}

/**
 * A function that tries to copy to the clipboard
 * at the same time it shows the copy result in a tooltip
 *
 * NB: This function is not documented.
 * It should not be used!
 *
 * @param {string} value any number
 * @param {*} label
 * @param {*} positionElement
 * @returns
 */
export async function copyWithEffect(
  value,
  label,
  positionElement = null
) {
  let success = null

  if (value) {
    try {
      const fx = showSelectionNotice({ value, label })
      success = await copyToClipboard(value)
      if (success === true) {
        fx.run(positionElement)
      }
    } catch (e) {
      warn(e)
      success = e
    }
  }

  return success
}

/**
 * This function add a tooltip looking
 *
 * @type {object} object with property
 * @property {string} value any value
 * @property {string} label any additional label that gets added as a suffix
 * @property {number} timeout how long the tooltip should be visible (3 sec)
 * @returns {object} { run, hide, remove } call the "run" function when the effect should be shown
 */
export function showSelectionNotice({ value, label, timeout = 3e3 }) {
  const id = 'id-' + slugify(value)
  if (typeof document !== 'undefined' && document.getElementById(id)) {
    return { run: () => {} }
  }

  let elem, content, root

  try {
    root = document.querySelector('.dnb-tooltip__portal, body')

    // create that portal element
    elem = document.createElement('span')
    elem.setAttribute('id', id)
    elem.setAttribute('class', 'dnb-tooltip')
    elem.setAttribute('role', 'tooltip')

    const arrow = document.createElement('span')
    arrow.setAttribute(
      'class',
      'dnb-tooltip__arrow dnb-tooltip__arrow__position--top'
    )
    content = document.createElement('span')
    content.setAttribute('class', 'dnb-tooltip__content')
    content.setAttribute('aria-live', 'assertive')
    elem.appendChild(arrow)
    elem.appendChild(content)
  } catch (e) {
    warn(e)
  }

  return new (class SelectionFx {
    remove() {
      try {
        root.removeChild(elem)
        elem = null
        content = null
      } catch (e) {
        //
      }
    }
    hide() {
      try {
        elem.classList.add('dnb-tooltip--hide')
      } catch (e) {
        //
      }
    }
    run(pE = getSelectedElement()) {
      try {
        root.appendChild(elem)

        const top = getOffsetTop(pE)
        const left = getOffsetLeft(pE)

        content.innerHTML =
          String(label) +
          (pE instanceof HTMLElement
            ? `<span class="dnb-sr-only">: ${
                (
                  (pE &&
                    pE.querySelector('.dnb-number-format__selection')) ||
                  pE
                ).innerHTML
              }</span>`
            : '')

        const width =
          (
            (pE && pE.querySelector('.dnb-number-format__visible')) ||
            pE ||
            {}
          ).offsetWidth || 0

        elem.style.top = `${top - elem.offsetHeight}px`
        elem.style.left = `${left + width / 2 - elem.offsetWidth / 2}px`
        elem.classList.add('dnb-tooltip--active')

        setTimeout(this.hide, timeout)
        setTimeout(this.remove, timeout + 600)
      } catch (e) {
        warn(e)
      }
    }
  })()
}

/**
 * React Hook
 * It returns "copyWithEffect" but with a translated string
 *
 * @returns copyWithEffect function inside object { copy }
 */
export function useCopyWithNotice() {
  const {
    translation: {
      NumberFormat: { clipboard_copy },
    },
  } = React.useContext(Context)

  const copy = (value, positionElement) => {
    copyWithEffect(value, clipboard_copy, positionElement)
  }

  return { copy }
}

/**
 * Will return currency display value based on navigator/browser and locale
 *
 * @property {string} currencyDisplay (optional) code, name, symbol or narrowSymbol
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export function getFallbackCurrencyDisplay(
  locale = null,
  currencyDisplay = null
) {
  // If currencyDisplay is not defined and locale is "no", use narrowSymbol
  if (!currencyDisplay && (!locale || /(no|nb|nn)$/i.test(locale))) {
    currencyDisplay = 'narrowSymbol'
  }

  return currencyDisplay || CURRENCY_DISPLAY // code, name, symbol
}

/**
 * This function returns a decimal separator symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export function getDecimalSeparator(locale = null) {
  const separator =
    formatToParts({
      number: 1.1,
      locale,
    }).find(({ type }) => type === 'decimal')?.value || ',' // defaults to nb-NO

  return separator
}

/**
 * This function returns a thousands separator symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export function getThousandsSeparator(locale = null) {
  const formatter = getGroupFormatter(locale)

  return (
    formatToParts({
      number: 1000,
      locale,
    })
      .map(formatter)
      .find(({ type }) => type === 'group')?.value || ' '
  ) // defaults to nb-NO
}

/**
 * This function returns a currency symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @property {string} currency (optional) a given currency
 * @property {string} display (optional) what currency display
 * @property {number} number (optional) only to define if it should be formatted in singular or plural
 * @returns {string} a currency symbol
 */
export function getCurrencySymbol(
  locale = null,
  currency = null,
  display = null,
  number = 2
) {
  if (!currency) {
    currency = CURRENCY
  }

  const currencyDisplay = getFallbackCurrencyDisplay(locale, display)

  return alignCurrencySymbol(
    formatToParts({
      number,
      locale,
      options: {
        style: 'currency',
        currency,
        currencyDisplay,
      },
    }).find(({ type }) => type === 'currency')?.value || currency,
    currencyDisplay
  )
}

function getGroupFormatter(
  locale = null,
  separatorSymbol = null,
  existingFormatter = null
) {
  /**
   * We change the thousand separator to be a non-breaking space
   *
   * Effected locales:
   * - en-GB
   * - en
   */
  if (locale && /(en|gb)$/i.test(locale)) {
    separatorSymbol = ' ' // non-breaking space
  }

  return (item) => {
    // Ensure we do not overwrite a given formatter, but run it as well
    if (typeof existingFormatter === 'function') {
      item = existingFormatter(item)
    }

    if (item.type === 'group') {
      item.value = separatorSymbol || item.value
    }

    return item
  }
}

/**
 * For internal usage
 *
 * @type {object}
 * @property {string} number - a number
 * @property {string} locale - locale as a string. Defaults to the global LOCALE constant
 * @property {object} options - NumberFormat options
 * @returns {array} that contains all the parts of the given number [{ value: x, type: 'type' }]
 */
function formatToParts({ number, locale = null, options = null }) {
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
 * Helper for getting a consistent compact format
 * Mutates a given "opts" object.
 *
 * @param {object}
 * @property {string} value any number
 * @property {string} locale a given locale
 * @property {string|boolean} compact "short" or "long" if true is given, "short" is used
 * @property {number} decimals the amount of decimals
 * @property {object} opts the options object – it gets mutated
 */
function handleCompactBeforeDisplay({
  value,
  locale,
  compact,
  decimals = 0,
  opts,
} = {}) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  value = parseInt(Math.abs(value))
  opts.notation = 'compact'

  // For numbers under 1M we do
  if (isTrue(compact) && locale && /(no|nb|nn)$/i.test(locale)) {
    opts.compactDisplay = Math.abs(value) < 1000000 ? 'long' : 'short'
  } else {
    opts.compactDisplay = !isTrue(compact) ? compact : 'short'
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

    // The result of this formula would be equal to this:
    // if (value >= 100000000000000) {
    //   decimals += 2
    // } else if (value >= 10000000000000) {
    //   decimals += 1
    // } else if (value >= 1000000000000) {
    //   decimals += 0
    // } else if (value >= 100000000000) {
    //   decimals += 2
    // } else if (value >= 10000000000) {
    //   decimals += 1
    // } else if (value >= 1000000000) {
    //   decimals += 0
    // } else if (value >= 100000000) {
    //   decimals += 2
    // } else if (value >= 10000000) {
    //   decimals += 1
    // } else if (value >= 1000000) {
    //   decimals += 0
    // } else if (value >= 100000) {
    //   decimals += 2
    // } else if (value >= 10000) {
    //   decimals += 1
    // }

    // Firefox issue?
    // If we do not define "maximumSignificantDigits" Firefox does not show any decimals at all
    opts.maximumSignificantDigits = decimals + 1
  }
}

/**
 * Helper for getting a consistent compact format
 * Mutates a given "opts" object.
 *
 * @param {object}
 * @property {string|boolean} compact "short" or "long" if true is given, "short" is used
 * @property {object} opts the options object – it gets mutated
 */
function handleCompactBeforeAria({ value, compact, opts }) {
  if (!canHandleCompact({ value, compact })) {
    return // stop here
  }

  opts.compactDisplay = 'long'
}

/**
 * Checks if we should/can handle the compact format
 *
 * @param {object}
 * @property {string|number} value any number
 * @property {string|boolean} compact "short" or "long" if true is given, "short" is used
 */
function canHandleCompact({ value, compact }) {
  if (compact && Math.abs(value) >= 1000) {
    return true
  }

  return false
}

/**
 * Rounds the number to the nearest even number
 *
 * @param {number} num the number to round
 * @param {number} decimalPlaces the number of decimal places to round to
 * @returns {number} the rounded number
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
