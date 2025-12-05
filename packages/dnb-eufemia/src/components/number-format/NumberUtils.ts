// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web NumberFormat Helpers
 *
 */

import {
  LOCALE,
  CURRENCY,
  CURRENCY_DISPLAY,
  CURRENCY_FALLBACK_DISPLAY,
} from '../../shared/defaults'
import {
  warn,
  isTrue,
  escapeRegexChars,
} from '../../shared/component-helper'
import { IS_MAC, IS_WIN } from '../../shared/helpers'
import locales from '../../shared/locales'

// TypeScript types
export type formatTypes =
  | 'phone'
  | 'org'
  | 'ban'
  | 'nin'
  | 'percent'
  | 'currency'
export type formatCurrencyPosition = 'before' | 'after'
export interface formatReturnValue {
  /** The given number */
  value: number
  /** Cleans a number from unnecessary parts */
  cleanedValue: string
  /** The formatted display number */
  number: string
  /** A screen reader optimized number */
  aria: string
  /** Language code, like en-US */
  locale: string
  /** The given type */
  type: formatTypes | string
}
export type formatValue = string | number
export type formatReturnType = formatReturnValue | formatValue

export interface formatOptionParams {
  /** can be "auto" */
  locale?: string
  /** Should the number be cleaned */
  clean?: boolean
  /** shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long" */
  compact?: boolean | 'short' | 'long'
  /** How many decimals */
  decimals?: number
  /** @deprecated Use `rounding: "omit"` instead. */
  omit_rounding?: boolean
  /**
   * Rounding method
   * - If set to `omit`, the decimal will NOT be rounded.
   * - If set to `half-even`, the decimal will be rounded to the nearest even number.
   * - If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
   */
  rounding?: 'omit' | 'half-even' | 'half-up'
  /** phone type */
  phone?: boolean
  /** org type */
  org?: boolean
  /** ban type */
  ban?: boolean
  /** nin type */
  nin?: boolean
  /** percent type */
  percent?: boolean
  /** Currency code (ISO 4217) or `true` to use the default, `NOK`. */
  currency?: string | boolean
  /** Intl.NumberFormat currency option – you can use false or empty string to hide the sign/name. Defaults to narrowSymbol when the locale is no else we default to code. */
  currency_display?:
    | boolean
    | ''
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
  /** currency option */
  currency_position?: formatCurrencyPosition
  /** hides the currency sign */
  omit_currency_sign?: boolean
  /** will remove all extra signs, like a currency sign or percent sign for the cleanedValue return when returnAria is true */
  clean_copy_value?: boolean
  /** Intl.NumberFormat options (NumberFormatOptions) */
  options?: object
  /** If an object should be returned, including the "aria" property */
  returnAria?: boolean
  /** ARIA Text to be displayed when value is invalid. */
  invalidAriaText?: string
}

export const NUMBER_CHARS = '\\-0-9,.'

// change the position of minus if it's first
// check for two minus - −
// check also for hyphen ‐
// check also for dashes ‒  –  —  ―
export const NUMBER_MINUS = '-|−|‐|‒|–|—|―'

// this is used to format a number that is not absent
const ABSENT_VALUE_FORMAT = '–'

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
 * @property {boolean} omit_rounding - deprecated Use `rounding: "omit"` instead.
 * @property {string} rounding - if `omit`, the decimal will NOT be rounded. If `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
 * @property {object} options - accepts all number.toLocaleString API options
 * @property {boolean} returnAria - if true, this function returns an object that includes an aria property with a special aria formatting
 * @property {string} invalidAriaText - aria text to be displayed when value is invalid.
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
    invalidAriaText = null,
  }: formatOptionParams = {}
) => {
  value = isAbsent(value) ? ABSENT_VALUE_FORMAT : value

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

    // cleanup, but only if it did not got cleaned up already
    const cleanedNumber =
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
      aria =
        invalidAriaText ||
        locales[locale]?.NumberFormat.not_available ||
        'N/A'
    }

    // return "locale" as well value, since we have to "auto" option
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
 * @param {string} decimalSeparator a dot or comma
 * @returns amount of decimals
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
 * Aligns the currency symbol in the output based on the currency display option.
 * "norske kroner" ("Norwegian kroner") will be changed to "kroner" if the currency display option is set to "name".
 *
 * @param {string} output - The output string containing the currency symbol.
 * @param {string} currencyDisplay - The currency display option ('name' or 'symbol').
 * @returns {string} The aligned output string.
 */
function alignCurrencySymbol(output, currencyDisplay) {
  if (typeof output === 'string' && currencyDisplay === 'name') {
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

function replaceNaNWithDash(number) {
  return String(number).replace(/NaN/, ABSENT_VALUE_FORMAT)
}

function isAbsent(value) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === ABSENT_VALUE_FORMAT
  )
}

/**
 * Use this function to format phone numbers
 *
 * @param {string|number} number a phone number
 * @param {string} locale locale as a string
 * @returns a formatted phone number
 */
export const formatPhone = (number, locale = null) => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }

  let display = number
  let aria = null

  switch (locale) {
    default: {
      let code = ''
      number = String(number)
        // Edge case for when a Norwegian number is given without a space after the country code
        .replace(/^(00|\+|)47([^\s])/, '+47 $2')
        .replace(/^00/, '+')

      if (number.substring(0, 1) === '+') {
        const codeAndNumber = number.match(
          // Split the number into the country code and the rest of the number
          /^\+([\d-]{1,8})\s{0,2}([\d\s-]{1,20})$/
        )
        if (codeAndNumber) {
          code = `+${codeAndNumber[1]} `
          number = codeAndNumber[2]
        }
      }

      number = number.replace(/[^+\d]/g, '')
      const length = number.length

      // Get 800 22 222
      if (length === 8 && number.substring(0, 1) === '8') {
        display =
          code +
          number
            .split(/([\d]{3})([\d]{2})/)
            .filter((s) => s)
            .join(' ')
      } else {
        // Get 02000
        if (length < 6) {
          display = code + number
        } else {
          if (code.includes('-')) {
            // Convert +12-3456 to +12 (3456)
            code = code.replace(/(\+[\d]{1,2})-([\d]{1,6})/, '$1 ($2)')
          }

          // Get 6 or 8 formatting
          display =
            code +
            number
              .split(
                length === 6
                  ? /^(\+[\d]{2})|([\d]{3})/
                  : /^(\+[\d]{2})|([\d]{2})/
              )
              .filter((s) => s)
              .join(' ')
        }
      }

      aria =
        code +
        number
          .split(/([\d]{2})/)
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
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // Get 2000 12 34567
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
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // Get 123 456 789
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
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // Get 180892 12345
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
  if (
    typeof num === 'number' ||
    typeof num === 'undefined' ||
    num === null
  ) {
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
  // Make sure that there are only two digits after the comma, then we clean that up.
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
    currencyDisplay = CURRENCY_DISPLAY
  }

  return currencyDisplay || CURRENCY_FALLBACK_DISPLAY // code, name, symbol
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
  return (
    formatToParts({
      number: 1000,
      locale,
    }).find(({ type }) => type === 'group')?.value || ' '
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
