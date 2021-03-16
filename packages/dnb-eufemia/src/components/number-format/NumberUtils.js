import React from 'react'
import Context from '../../shared/Context'

/**
 * Web NumberFormat Helpers
 *
 */

import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from '../../shared/defaults'
import { warn, isTrue, slugify } from '../../shared/component-helper'
import {
  getOffsetTop,
  getOffsetLeft,
  getSelectedElement,
  copyToClipboard,
  IS_MAC,
  IS_WIN,
  IS_IE11,
  IS_SAFARI
} from '../../shared/helpers'

const NUMBER_CHARS = '-0-9,.'

export const format = (
  value,
  {
    locale = null, // can be "auto"
    clean = false,
    phone = null,
    org = null,
    ban = null,
    nin = null,
    currency = null,
    currency_display = CURRENCY_DISPLAY,
    currency_position = null,
    decimals = null,
    omit_rounding = null,
    options = null,
    returnAria = false
  } = {}
) => {
  let display = value
  let aria = null
  let type = 'number'
  const isCurrency = isTrue(currency) || typeof currency === 'string'

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

  const opts =
    (typeof options === 'string' && options[0] === '{'
      ? JSON.parse(options)
      : options) || {}

  let deci = parseFloat(decimals)
  if (isCurrency && isNaN(deci)) {
    deci = 2
  }
  if (deci >= 0) {
    const isNumber = typeof value === 'number'
    opts.minimumFractionDigits = deci
    opts.maximumFractionDigits = deci
    value = String(clean ? cleanNumber(value) : value)
    const pos = value.indexOf('.')
    if (pos > 0 && omit_rounding === true) {
      value = String(value).substr(0, pos + 1 + deci)
    }
    if (isNumber) {
      value = parseFloat(value)
    }
  } else {
    opts.maximumFractionDigits = 20
  }

  if (isTrue(phone)) {
    type = 'phone'
    const { number: _number, aria: _aria } = formatPhone(value, locale)

    value = cleanNumber(value) // clean, because of +47 and ++47
    display = _number
    aria = _aria
  } else if (isTrue(ban)) {
    type = 'ban'
    const { number: _number, aria: _aria } = formatBAN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(nin)) {
    type = 'nin'
    const { number: _number, aria: _aria } = formatNIN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(org)) {
    type = 'org'
    // organization number
    const { number: _number, aria: _aria } = formatORG(value, locale)

    display = _number
    aria = _aria
  } else if (isCurrency) {
    type = 'currency'
    // cleanup, but only if it not got cleaned up already
    let cleanedNumber =
      deci >= 0 ? value : clean ? cleanNumber(value) : value

    // set currency options
    opts.currency =
      opts.currency || (isTrue(currency) ? CURRENCY : currency)
    opts.style = 'currency'
    opts.currencyDisplay =
      opts.currencyDisplay || currency_display || CURRENCY_DISPLAY // code, name, symbol

    // if currency has no decimal, then go ahead and remove it
    if (
      typeof opts.minimumFractionDigits === 'undefined' &&
      String(value).indexOf('.') === -1 &&
      cleanedNumber % 1 === 0
    ) {
      opts.minimumFractionDigits = 0 // to enforce Norwegian style
    }

    display = formatNumber(cleanedNumber, locale, opts)
    display = cleanupMinus(display)
    display = prepareCurrencyPosition(display, currency_position, locale)

    // aria options
    aria = formatNumber(cleanedNumber, locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...opts,
      currencyDisplay: 'name'
    })
    aria = enhanceSR(cleanedNumber, aria, locale) // also calls cleanupMinus

    // IE has a bug, where negative numbers has a parentese around the number
    if (IS_IE11) {
      display = display.replace(/^\((.*)\)$/, '-$1')
      aria = aria.replace(/^\((.*)\)$/, '-$1')
      display = cleanupMinus(display)
      aria = cleanupMinus(aria)
    }

    // get only the currency name
    // const num = aria.replace(/([^0-9])+$/g, '')
    // const name = aria.replace(num, '')
    // aria = cleanedNumber + name
  } else {
    display = formatNumber(value, locale, opts)
    display = cleanupMinus(display)

    // fix for NDVA to make sure we read the number, we add a minimum fraction digit (decimal)
    // NVDA fix
    aria = formatNumber(value, locale, {
      ...opts,
      minimumFractionDigits: 1,
      maximumFractionDigits: 20
    })
    aria = enhanceSR(value, aria, locale) // also calls cleanupMinus
  }

  if (aria === null) {
    aria = display
  }

  const cleanedValue = formatNumber(
    value,
    locale,
    opts,
    ({ type, value }) => {
      switch (type) {
        case 'currency':
        case 'group':
        case 'literal':
          return ''
        default:
          return value
      }
    }
  )

  // return "locale" as well value,l, since we have to "auto" option
  return returnAria
    ? { value, cleanedValue, number: display, aria, locale, type }
    : display
}

const prepareCurrencyPosition = (
  display,
  position = null,
  locale = null
) => {
  /**
   * Make exception – if locale is nb, and no position is defined, then use position "after"
   */
  if (!position && locale && /no$/i.test(locale)) {
    position = 'after'
  }

  if (position) {
    const sign = String(display)
      .replace(new RegExp(`([${NUMBER_CHARS}])`, 'g'), '')
      .trim()

    const signPos = String(display).indexOf(sign)

    let start = 0
    let end = 0

    // if "NOK -123"
    if (signPos === 0) {
      start = sign.length
      end = display.length
    }
    // if "-123 NOK"
    else {
      end = signPos
    }

    // backup / fallback
    if (!(end > 0)) {
      return display
    }

    const num = String(display).substr(start, end).trim()

    switch (position) {
      case 'before':
        display = `${sign} ${num}`
        break

      case 'after':
        display = `${num} ${sign}`
        break
    }
  }

  return display
}

const cleanupMinus = (display) => {
  // change the position of minus if it's first
  // check for two minus - −
  // check also for hyphen ‐
  // check also for dashes ‒  –  —  ―

  const reg = '^(-|−|‐|‒|–|—|―)'

  // check for first and second char
  const first = display[0]
  const second = display[1]

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

const enhanceSR = (value, aria) => {
  // Enhance VO support on mobile devices
  // Numbers under 99.999 are read out correctly, but only if we remove the spaces
  // Potential we could also check for locale: && /no|nb|nn/.test(locale)
  // but leave it for now without this extra check
  if (IS_MAC && Math.abs(parseFloat(value)) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  aria = cleanupMinus(aria)

  return aria
}

export const formatNumber = (
  number,
  locale,
  options = {},
  formatter = null
) => {
  try {
    // Safari does not support `narrowSymbol` for now, so `symbol` will be used then.
    if (IS_SAFARI && options.currencyDisplay === 'narrowSymbol') {
      options.currencyDisplay = 'symbol'
    }

    if (
      typeof Intl !== 'undefined' &&
      typeof Intl.NumberFormat === 'function'
    ) {
      const inst = Intl.NumberFormat(locale, options)
      if (formatter) {
        return inst
          .formatToParts(number)
          .map((val) => formatter(val))
          .reduce((str, part) => str + part)
      } else {
        return inst.format(number)
      }
    } else if (
      typeof Number !== 'undefined' &&
      typeof Number.toLocaleString === 'function'
    ) {
      return parseFloat(number).toLocaleString(locale, options)
    }
  } catch (e) {
    warn(
      `Number could not be formatted: ${JSON.stringify([
        number,
        locale,
        options
      ])}`,
      e
    )
  }
  return number
}

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

      // correct nim for screen readers
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

// Can be human number - https://en.wikipedia.org/wiki/Decimal_separator
export function cleanNumber(num) {
  if (typeof num === 'number') {
    return num
  }
  num = String(num).trim()

  // 1. Remove invalid chars on the beginning (not a number)
  if (/^[^0-9-]/.test(num)) {
    num.replace(/^(^[^0-9-]+)/, '')
  }

  // Find valid decimals
  let usesThousand = ','
  let usesDecimal = '\\.'

  // -12 345,678
  if (/(\s)([0-9]{3})/.test(num)) {
    usesThousand = '\\s'
    usesDecimal = ','
  }

  // -12.345,678
  else if (
    /(\.)([0-9]{3})/.test(num) &&
    !/([,'][0-9]{3})(\.)([0-9]{3})/.test(num) // just an additioanl check, for support with more
  ) {
    usesThousand = '\\.'
    usesDecimal = ",|·|'" // also support Spain and CH
  }

  // -1,234,567.891
  else if (/(,)([0-9]{3})/.test(num)) {
    usesThousand = ','
    usesDecimal = '\\.|·' // also support Spain
  }

  // -1'234'567.891, only used in CH
  else if (/(')([0-9]{3})/.test(num)) {
    usesThousand = "'"
    usesDecimal = '\\.|,'
  }

  // 3. Remove invalid thousand separators
  const thousandReg = new RegExp(
    `([0-9]|)(${usesThousand})([0-9]{3})`,
    'g'
  )
  if (thousandReg.test(num)) {
    num = num.replace(thousandReg, '$1$3')
  }

  // 2. Rename invalid decimal separator
  // Make sure that there are only two digits after the coma, then we clean that up.
  // else we don't, because it can be a US number
  // therefore, check first, is there a chance of being a decimal?
  const decimalReg = new RegExp(`(${usesDecimal})([0-9]{1,2})`, 'g')
  if (decimalReg.test(num)) {
    num = num.replace(decimalReg, '.$2')
  }

  // Edge case, if we have more than 2 decimals, replace these decimals
  const decimalBackup = new RegExp(`(${usesDecimal})([0-9]{3,})`, 'g')
  if (decimalBackup.test(num)) {
    num = num.replace(decimalBackup, '.$2')
  }

  // Remove all invalid chars
  return num.replace(new RegExp(`([^${NUMBER_CHARS}])`, 'g'), '')
}

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

export function showSelectionNotice({ value, label, timeout = 3e3 }) {
  const id = 'id-' + slugify(value)
  if (typeof document !== 'undefined' && document.getElementById(id)) {
    return { run: () => {} }
  }

  let elem, content

  try {
    // create that portal element
    elem = document.createElement('span')
    elem.setAttribute('id', id)
    elem.setAttribute('class', 'dnb-tooltip dnb-core-style')
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
        document.body.removeChild(elem)
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
        document.body.appendChild(elem)

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

export function useCopyWithNotice() {
  const {
    translation: {
      NumberFormat: { clipboard_copy }
    }
  } = React.useContext(Context)

  const copy = (value, positionElement) => {
    copyWithEffect(value, clipboard_copy, positionElement)
  }

  return { copy }
}
