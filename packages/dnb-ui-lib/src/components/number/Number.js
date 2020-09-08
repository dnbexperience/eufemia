/**
 * Web Number Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { LOCALE, CURRENCY, CURRENCY_DISPLAY } from '../../shared/defaults'
import {
  warn,
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  registerElement,
  convertJsxToString,
  extend
} from '../../shared/component-helper'
import {
  insertElementBeforeSelection,
  getSelectedText,
  getSelectedElement,
  copyToClipboard,
  hasSelectedText,
  IS_IOS,
  IS_MAC,
  IS_WIN,
  IS_IE11
} from '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'
import { createShortcut } from '../../shared/libs/Shortcuts'

const NUMBER_CHARS = '-0-9,.'

export default class Number extends React.PureComponent {
  static tagName = 'dnb-number'
  static contextType = Context
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    locale: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,

    // currency
    currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    currency_display: PropTypes.string,
    currency_position: PropTypes.oneOf(['auto', 'before', 'after']),

    // bank account number
    ban: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // national identification number
    nin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // phone number
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // organization number
    org: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // can be tel or sms
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    decimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectall: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    // React props
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }
  static defaultProps = {
    value: null,
    locale: null,
    prefix: null,
    suffix: null,
    currency: null,
    currency_display: null, // code, name, symbol
    currency_position: null, // null, before, after
    ban: null,
    nin: null,
    phone: null,
    org: null,
    link: null,
    options: null,
    decimals: null,
    selectall: true,
    element: 'span', // span or abbr
    class: null,

    // React props
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(Number.tagName, Number, Number.defaultProps)
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  componentDidMount() {
    this.osShortcut = IS_WIN ? 'ctrl+c' : 'cmd+c'

    if (typeof window !== 'undefined') {
      if (!window._shortcuts) {
        window._shortcuts = new createShortcut()
        // Firefox sometimes don't respond on the onCopy event
        // But more importanly, Safari does not supprt onCopy event and custom copy at the same time
        // therefore we use shortcuts as well
        window._shortcuts.add(
          this.osShortcut,
          this.shortcutHandler
          // null,
          // this._ref.current
        )
        window._shortcuts._number = 1
      } else {
        window._shortcuts._number++
      }
    }

    // NB: This h ack may be removed in future iOS versions
    // in order that iOS v13 can select someting on the first try, we run this add range trick
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined' && window._shortcuts) {
      window._shortcuts._number--
      if (window._shortcuts._number === 0) {
        window._shortcuts.remove(this.osShortcut)
      }
    }
  }

  shortcutHandler = (e) => {
    copySelectedNumber(e)
  }

  onCopyHandler = (e) => {
    // NB: Safari can't copy during context menu copy
    copySelectedNumber(e)
  }

  onClickHandler = () => {
    if (!hasSelectedText()) {
      try {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(this._ref.current)
        selection.removeAllRanges()
        selection.addRange(range)

        // Could work on IS_IOS, becaus of the user event
        // if (IS_IOS) {
        //   let { value, children } = this.props
        //   if (children !== null) {
        //     value = children
        //   }
        //   const cleanedNumber = cleanDirtyNumber(value)
        //   copyNumber(cleanedNumber)
        // }
      } catch (e) {
        warn(e)
      }
    }
  }

  runFix(comp, className) {
    if (typeof comp === 'function') {
      comp = comp()
    }
    if (React.isValidElement(comp)) {
      return React.cloneElement(comp, {
        className: classnames(comp.props.className, className)
      })
    }
    return <span className={className}>{comp}</span>
  }

  render() {
    // consume the global context
    const {
      value: _value,
      prefix,
      suffix,
      children,
      currency,
      currency_display,
      currency_position,
      ban,
      nin,
      phone,
      org,
      link: _link,
      options,
      locale,
      decimals,
      selectall,
      element,
      class: _className,
      className,
      ...rest
    } = this.props

    let link = _link
    let value = _value

    if (children !== null) {
      value = children
    }

    const formatOptions = {
      locale,
      currency,
      currency_display,
      currency_position,
      ban,
      nin,
      phone,
      org,
      decimals,
      options,
      returnAria: true
    }

    // use only the props from context, who are available here anyway
    if (this.context) {
      const useContext = extend(
        true,
        { locale: null, currency: null },
        this.context,
        this.context.translation.Number
      )

      if (useContext) {
        if (useContext.locale && !locale) {
          formatOptions.locale = useContext.locale
        }

        // only replace if the prop is "true" and not actually a currency
        if (useContext.currency && isTrue(currency)) {
          formatOptions.options = formatOptions.options
            ? { ...formatOptions.options }
            : {}
          formatOptions.options.currency = useContext.currency
        }
      }
    }

    let { number: display, aria, locale: lang } = format(
      value,
      formatOptions
    )

    const attributes = {
      ref: this._ref,
      onCopy: this.onCopyHandler,
      className: classnames(
        'dnb-number',
        className,
        _className,
        (isTrue(currency) || typeof currency === 'string') &&
          'dnb-number--currency',
        isTrue(selectall) && 'dnb-number--selectall',
        link && 'dnb-anchor',
        createSpacingClasses(this.props)
      ),
      ...rest
    }

    if (isTrue(selectall)) {
      attributes.onClick = this.onClickHandler
    }

    if (IS_MAC) {
      attributes['role'] = 'text'
    } else {
      attributes['role'] = 'textbox' // because NVDA is not reading aria-label on span's
      attributes['aria-readonly'] = true
    }

    validateDOMAttributes(this.props, attributes)

    if (prefix) {
      display = (
        <>
          {this.runFix(prefix, 'dnb-number__prefix')} {display}
        </>
      )
      aria = `${convertJsxToString(prefix)} ${aria}`
    }
    if (suffix) {
      display = (
        <>
          {display} {this.runFix(suffix, 'dnb-number__suffix')}
        </>
      )
      aria = `${aria} ${convertJsxToString(suffix)}`
    }

    const additionalAttr = {}
    if (aria !== display) {
      additionalAttr['aria-label'] = aria
    }

    if (link) {
      if (isTrue(link)) {
        link = 'tel'
      }
      return (
        <a href={`${link}:${display}`} {...attributes}>
          {display}
        </a>
      )
    }

    const NVDAFriendly = () => {
      if (!this._id) {
        this._id = makeUniqueId()
      }
      return (
        <>
          <Element
            is={element}
            aria-describedby={this._id}
            aria-hidden
            {...attributes}
          >
            {display}
          </Element>
          <span
            id={this._id}
            lang={lang}
            className="dnb-number__sr-only dnb-sr-only--inline"
          >
            {aria}
          </span>
        </>
      )
    }

    const Element = element

    return IS_WIN ? (
      <NVDAFriendly />
    ) : (
      <Element lang={lang} {...additionalAttr} {...attributes}>
        {display}
      </Element>
    )
  }
}

export const format = (
  value,
  {
    locale = null, // can be "auto"
    phone = null,
    org = null,
    ban = null,
    nin = null,
    currency = null,
    currency_display = CURRENCY_DISPLAY,
    currency_position = null,
    decimals = null,
    options = null,
    returnAria = false
  } = {}
) => {
  let display = value
  let aria = null
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
    opts.minimumFractionDigits = deci
    opts.maximumFractionDigits = deci
    value = String(cleanNumber(value))
    const pos = value.indexOf('.')
    if (pos > 0) {
      value = String(value).substr(0, pos + 1 + deci)
    }
  } else {
    opts.maximumFractionDigits = 20
  }

  if (isTrue(phone)) {
    const { number: _number, aria: _aria } = formatPhone(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(ban)) {
    const { number: _number, aria: _aria } = formatBAN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(nin)) {
    const { number: _number, aria: _aria } = formatNIN(value, locale)

    display = _number
    aria = _aria
  } else if (isTrue(org)) {
    // organization number
    const { number: _number, aria: _aria } = formatORG(value, locale)

    display = _number
    aria = _aria
  } else if (isCurrency) {
    // cleanup
    let cleanedNumber = parseFloat(cleanNumber(value))

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
      opts.minimumFractionDigits = 0 // to enfoce Norwegian style
    }

    display = formatNumber(cleanedNumber, locale, opts)
    display = cleanupMinus(display)
    display = prepareCurrencyPosition(display, currency_position)

    // aria options
    aria = formatNumber(cleanedNumber, locale, {
      ...opts,
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
      currencyDisplay: 'name'
    })
    aria = enhanceSR(cleanedNumber, aria, locale) // also calls cleanupMinus

    // IE has a bug, where negative numbers has a parantese arround the number
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

    // fix for NDVA to make sure we read the number, we add a minium fraction digit (decimal)
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

  // return "locale" as well, since we have to "auto" option
  return returnAria ? { number: display, aria, locale } : display
}

const prepareCurrencyPosition = (display, position = null) => {
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
  // but leave it for now without this ectra check
  if (IS_MAC && Math.abs(parseFloat(value)) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  aria = cleanupMinus(aria)

  return aria
}

export const formatNumber = (number, locale, options = {}) => {
  try {
    if (
      typeof Number !== 'undefined' &&
      typeof Number.toLocaleString === 'function'
    ) {
      return parseFloat(number).toLocaleString(locale, options)
    } else if (
      typeof Intl !== 'undefined' &&
      typeof Intl.NumberFormat === 'function'
    ) {
      return Intl.NumberFormat(locale, options).format(number)
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

      // correct nim for screen redaers
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

export async function copySelectedNumber(e) {
  const cleanedValue = getCleanedSelection(e)

  if (cleanedValue) {
    // If it is a currency, we could do that, but for other numbers like NIN, it does not do a good job
    // if (
    //   String(cleanedValue).indexOf('.') === -1 &&
    //   !isNaN(parseFloat(cleanedValue))
    // ) {
    //   cleanedValue = `${cleanedValue}.0`
    // }

    if (e && typeof e.persist === 'function') {
      e.persist()
    }

    const success = await copyNumber(cleanedValue)

    if (success === true) {
      if (e && typeof e.preventDefault === 'function') {
        // prevents the actuall copy
        e.preventDefault()
      }
    } else {
      warn(success)
    }
  }
}

export async function copyNumber(string) {
  let success = null

  if (string) {
    try {
      const fx = createSelectionFX(string)
      success = await copyToClipboard(string)
      if (success === true) {
        fx.run()
      }
    } catch (e) {
      warn(e)
      success = e
    }
  }

  return success
}

function getCleanedSelection() {
  const selection = getSelectedText()
  return cleanDirtyNumber(selection)
}

export function createSelectionFX(string) {
  let height = 32
  let left = 0
  let top = 0
  let elem // portalElem

  // do that becuase getClientRects from selection is an experimental browser API
  try {
    // getClientRects
    const cR = window.getSelection().getRangeAt(0).getClientRects()

    height = cR[0]?.height
    left = cR[0]?.left
    top = cR[0]?.top
  } catch (e) {
    //
  }

  try {
    // create backup to get the position from
    if (!(top > 0) && !(left > 0)) {
      // get a more precize position by inserting this empty node
      const posElem = document.createElement('span')
      posElem.setAttribute('class', 'dnb-number__fx__selection')
      insertElementBeforeSelection(posElem)

      // get position
      ;({ top, left } = posElem.getBoundingClientRect())
      top -= height / 1.333
      posElem.parentElement.removeChild(posElem)
    }

    // create that portal element
    elem = document.createElement('span')
    elem.textContent = String(string)
    elem.setAttribute('class', 'dnb-number__fx dnb-core-style')
    elem.style.top = `${top}px`
    elem.style.left = `${left + getSelectedText().length / 2}px`
  } catch (e) {
    warn(e)
  }

  return new (class SelectionFx {
    remove() {
      try {
        document.body.removeChild(elem)
      } catch (e) {
        //
      }
    }
    run() {
      try {
        document.body.appendChild(elem)

        // remove that element again
        setTimeout(this.remove, 800)
      } catch (e) {
        warn(e)
      }
    }
  })()
}

export function cleanDirtyNumber(value) {
  value = String(value)

  // give the user the option to opt out if he selects white space before and after
  // later we check even more on that
  if (/^[\s].*[\s]$/.test(value)) {
    // console.info('Selection starts and ends with space', value) // debug
    return false // invalid
  }

  value = value.trim()

  // opt out if we got newlines
  if (/\n|\r/.test(value)) {
    // console.info('Selection had new lines', value) // debug
    return false // invalid
  }

  // ok, there has to be some content
  if (!(value.length > 0)) {
    // console.info('Selection was to short', value) // debug
    return false // invalid
  }

  let elem = getSelectedElement()

  // also, check if we got other elements than our number element
  if (
    // stop if the selected elem is not the number component0
    !/dnb-number/.test(elem.getAttribute('class')) &&
    // and if no, then check if the value is not a pure number
    !new RegExp(`[${NUMBER_CHARS}\\s]`).test(value)
  ) {
    // console.info('Selected elem was not the Number component', elem) // debug
    return false // invalid
  }

  // if the element was a prefix or suffix, get the parent
  if (/dnb-number__(pre|suf|sr)/.test(elem.getAttribute('class'))) {
    elem = elem.parentElement
  }

  // Remove invalid selected text, because we have this for NVDA
  if (IS_WIN) {
    const invalidText = (
      elem.querySelector('.dnb-sr-only--inline') || elem.nextSibling
    )?.innerHTML
    if (invalidText) {
      value = value.replace(invalidText, '')
    }
  }

  // Remove prefix and suffix content
  const removePrefix = elem.querySelector('.dnb-number__prefix')?.innerHTML
  if (removePrefix) {
    value = value.replace(removePrefix, '').trim()
  }
  const remvoeSuffix = elem.querySelector('.dnb-number__suffix')?.innerHTML
  if (remvoeSuffix) {
    value = value.replace(remvoeSuffix, '').trim()
  }

  // now, also opt out if we have someting else then a number on both sides
  if (new RegExp(`^[^${NUMBER_CHARS}].*[^${NUMBER_CHARS}]$`).test(value)) {
    // console.info('Selection starts and ends with someting else than a number', value) // debug
    return false // invalid
  }

  // limit the body, but to be above KID of 25
  if (value.length > 30) {
    // console.info('Selection was to long', value) // debug
    return false // invalid
  }

  let cleanedValue = cleanNumber(value)

  // contoll number
  const num = parseFloat(cleanedValue)
  if (isNaN(num)) {
    // console.info('Number was invalid', cleanedValue) // debug
    return false // invalid
  }

  // If it is a currency, and has no decimals, add zero
  // if (elem.querySelector('.dnb-number--currency')) {
  //   if (String(num).indexOf('.') === -1) {
  //     return cleanedValue
  //   }
  // }

  // Ff the number not starts with 0, then use the controll number
  if (/^0/.test(cleanedValue)) {
    return cleanedValue
  }

  // This is the defualt return
  return cleanedValue
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
  let usesThousand = '\\.'
  let usesDecimal = ','

  // -12 345,678
  if (/(\s)([0-9]{3})/.test(num)) {
    usesThousand = '\\s'
    usesDecimal = ','

    // -12.345,678
  } else if (
    /(\.)([0-9]{3})/.test(num) &&
    !/([,'][0-9]{3})(\.)([0-9]{3})/.test(num) // just an additioanl check, for support with more
  ) {
    usesThousand = '\\.'
    usesDecimal = ",|·|'" // also support Spain and CH

    // -1,234,567.891
  } else if (/(,)([0-9]{3})/.test(num)) {
    usesThousand = ','
    usesDecimal = '\\.|·' // also support Spain
  }

  // -1'234'567.891, only used in CH
  else if (/(')([0-9]{3})/.test(num)) {
    usesThousand = "'"
    usesDecimal = '\\.|,'
  }

  // 3. Remove invalid thousand seperators
  const thousandReg = new RegExp(
    `([0-9]|)(${usesThousand})([0-9]{3})`,
    'g'
  )
  if (thousandReg.test(num)) {
    num = num.replace(thousandReg, '$1$3')
  }

  // 2. Rename invalid decimal separator
  // Make sure that there are only two digits after the coma, then we clean that up.
  // else we dont, because it can be a US number
  // therefore, check first, is there a chance of beeing a decimal?
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

let hasiOSFix = false
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
