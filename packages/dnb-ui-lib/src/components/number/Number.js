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
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  registerElement,
  extend
} from '../../shared/component-helper'
import {
  insertElementBeforeSelection,
  getSelectedText,
  getSelectedElement,
  copyToClipboard,
  hasSelectedText,
  isiOS as isiOSFunc,
  isMac as isMacFunc,
  isWin as isWinFunc
} from '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'

import { createShortcut } from '../../shared/libs/Shortcuts'

const NUMBER_CHARS = '-0-9,.'

let isMac = null
let isWin = null
const renderProps = {}

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  locale: PropTypes.string,
  currency: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  currency_display: PropTypes.string,
  currency_position: PropTypes.oneOf(['auto', 'before', 'after']),

  // bank account number
  ban: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // national identification number
  nin: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  phone: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // can be tel or sms
  link: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  decimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectall: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  element: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

const defaultProps = {
  value: null,
  locale: null,
  currency: null,
  currency_display: null, // code, name, symbol
  currency_position: null, // null, before, after
  ban: null,
  nin: null,
  phone: null,
  link: null,
  options: null,

  decimals: null,
  selectall: null,
  element: 'span', // span or abbr
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Number extends React.PureComponent {
  static tagName = 'dnb-number'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Number.tagName, Number, defaultProps)
  }

  constructor(prosp) {
    super(prosp)

    this._ref = React.createRef()
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (!window.shortcuts) {
        window.shortcuts = new createShortcut()
      }

      // Firefox sometimes don't respond on the onCopy event
      // therefore we use shortcuts as well
      this.osShortcut = isWin ? 'ctrl+c' : 'cmd+c'
      window.shortcuts.add(this.osShortcut, this.shortcutHandler)
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined' && this.osShortcut) {
      window.shortcuts.remove(this.osShortcut)
    }
  }

  shortcutHandler = (e) => {
    copySelectedNumber(e)
  }

  onCopyHandler = (e) => {
    copySelectedNumber(e)
  }

  onClickHandler = () => {
    if (!hasSelectedText()) {
      try {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNode(this._ref.current) // also selectNodeContents works fine
        selection.removeAllRanges()
        selection.addRange(range)

        // works on iOS, becaus of the user event
        // if (isiOSFunc()) {
        //   let { value, children } = this.props
        //   if (children !== null) {
        //     value = children
        //   }

        //   copyToClipboard(value, () => {
        //     createSelectionFX(value)
        //     console.info('Copy:', value) // debug
        //   })
        // }
      } catch (e) {
        console.warn(e)
      }
    }
  }

  render() {
    if (isMac === null) {
      isMac = isMacFunc()
    }
    if (isWin === null) {
      isWin = isWinFunc()
    }

    // consume the global context
    const {
      value: _value,
      children,
      currency,
      currency_display,
      currency_position,
      ban,
      nin,
      phone,
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

    const deci = parseFloat(decimals)
    if (deci >= 0) {
      formatOptions.options.minimumFractionDigits = deci
      formatOptions.options.maximumFractionDigits = deci
      value = String(cleanNumber(value))
      const pos = value.indexOf('.')
      if (pos > 0) {
        value = String(value).substr(0, pos + 1 + deci)
      }
    }

    const { number: display, aria, locale: lang } = format(
      value,
      formatOptions
    )

    const attributes = {
      ref: this._ref,
      onCopy: this.onCopyHandler,
      onClick: this.onClickHandler,
      className: classnames(
        'dnb-number',
        className,
        _className,
        isTrue(selectall) && 'dnb-number--selectall',
        link && 'dnb-anchor',
        createSpacingClasses(this.props)
      ),
      ...rest
    }

    if (isMac) {
      attributes['role'] = 'text'
    } else {
      attributes['role'] = 'textbox' // because NVDA is not reading aria-label on span's
      attributes['aria-readonly'] = true
    }

    const additionalAttr = {}
    if (aria !== display) {
      additionalAttr['aria-label'] = aria
    }

    validateDOMAttributes(this.props, attributes)

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
          <span id={this._id} lang={lang} className="dnb-sr-only--inline">
            {aria}
          </span>
        </>
      )
    }

    return isWin ? (
      <NVDAFriendly />
    ) : (
      <Element
        is={element}
        lang={lang}
        {...additionalAttr}
        {...attributes}
      >
        {display}
      </Element>
    )
  }
}

const Element = React.forwardRef(
  ({ is: Element, children, ...rest }, ref) => (
    <Element {...rest} ref={ref}>
      {children}
    </Element>

    // Possible solution, but what about word wrapping?
    // <input
    //   {...rest}
    //   size={children.length}
    //   ref={ref}
    //   readOnly
    //   type="text"
    //   defaultValue={children}
    // />
  )
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node
}
Element.defaultProps = {
  children: null
}

export const format = (
  value,
  {
    locale = null, // can be "auto"
    phone = null,
    ban = null,
    nin = null,
    currency = null,
    currency_display = CURRENCY_DISPLAY,
    currency_position = null,
    options = null,
    returnAria = false
  } = {}
) => {
  let display = value
  let aria = null

  // because we are using context comparison
  if (!locale) {
    locale = LOCALE
  } else if (locale === 'auto') {
    try {
      locale = window.navigator.language
    } catch (e) {
      console.warn(e)
    }
  }

  const opts =
    (typeof options === 'string' && options[0] === '{'
      ? JSON.parse(options)
      : options) || {}

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
  } else if (isTrue(currency) || typeof currency === 'string') {
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
      maximumFractionDigits: 2,
      currencyDisplay: 'name'
    })
    aria = enhanceSR(cleanedNumber, aria, locale)

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
      maximumFractionDigits: 1
    })
    aria = enhanceSR(value, aria, locale)
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
      display = display.replace(new RegExp(reg + '([^\\d]+)(.*)'), '$2-$3')
    }
  }

  return display
}

const enhanceSR = (value, aria) => {
  // Enhance VO support on mobile devices
  // Numbers under 99.999 are read out correctly, but only if we remove the spaces
  // Potential we could also check for locale: && /no|nb|nn/.test(locale)
  // but leave it for now without this ectra check
  if (isMac && Math.abs(parseFloat(value)) <= 99999) {
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
    console.warn(
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
            .split(/(\d{3})(\d{2})/)
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
                length === 6 ? /^(\+\d{2})|(\d{3})/ : /^(\+\d{2})|(\d{2})/
              )
              .filter((s) => s)
              .join(' ')
        }
      }

      aria =
        code +
        number
          .split(/(\d{2})/)
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
        .split(/(\d{4})(\d{2})(\d{1,})/)
        .filter((s) => s)
        .join(' ')

      aria = number
        .split(/(\d{2})/)
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
        .split(/(\d{6})/)
        .filter((s) => s)
        .join(' ')

      // correct nim for screen redaers
      aria = display
        .split(/(\d{2})(\d{2})(\d{2}) (\d{1})(\d{1})(\d{1})(\d{1})(\d{1})/)
        .filter((s) => s)
        .join(isWin ? '. ' : ' ') // NVDA fix with a dot to not read date on FF
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

let copyTimeout = null
export function copySelectedNumber(e = null) {
  if (isiOSFunc()) {
    return // iOS does not provide support for async copy
  }

  const cleanedValue = getCleanedSelection(e)

  if (cleanedValue) {
    // copyToClipboard(cleanedValue)
    clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copyToClipboard(cleanedValue, () => {
        createSelectionFX(cleanedValue)
        console.info('Copy:', cleanedValue) // debug
      })
    }, 10) // only to make it work on right click and copy
  }
}

function getCleanedSelection(e = null) {
  let selection = getSelectedText().trim()

  if (/\n|\r/.test(selection)) {
    // console.info('Selection had new lines', selection) // debug
    return // invalid
  }

  if (!(selection.length > 0)) {
    // console.info('Selection was to short', selection) // debug
    return // invalid
  }

  const elem = getSelectedElement()

  if (
    // stop if the selected elem is not the number component0
    !/dnb-number/.test(elem.getAttribute('class')) &&
    // and if no, then check if the selection is not a pure number
    !new RegExp(`[${NUMBER_CHARS}\\s]`).test(selection)
  ) {
    // console.info('Selected elem was not the Number component', elem) // debug
    return // invalid
  }

  // Remove invalid selected text, because we have this for NVDA
  if (isWin) {
    const invalidText = (
      elem.querySelector('.dnb-sr-only--inline') || elem.nextSibling
    )?.innerHTML
    if (invalidText) {
      selection = selection.replace(invalidText, '')
    }
  }

  if (/^[a-z\s].*[a-z\s]$/.test(selection)) {
    // console.info('Selection starts and ends with characters', selection) // debug
    return // invalid
  }

  // limit the body, but to be above KID of 25
  if (selection.length > 30) {
    // console.info('Selection was to long', selection) // debug
    return // invalid
  }

  let cleanedValue = cleanNumber(selection)

  // contoll number
  const num = parseFloat(cleanedValue)
  if (isNaN(num)) {
    // console.info('Number was invalid', cleanedValue) // debug
    return // invalid
  }

  e && e.preventDefault() // works on macOS, prevents the actuall copy

  // if the number not starts with 0, then use the controll number
  if (!/^0/.test(cleanedValue)) {
    cleanedValue = num
  }

  return cleanedValue
}

export function createSelectionFX(string) {
  let height = 32
  try {
    const getClientRects = window
      .getSelection()
      .getRangeAt(0)
      .getClientRects()

    height = getClientRects[0]?.height
  } catch (e) {
    //
  }
  try {
    // get a more precize position by inserting this empty node
    const posElem = document.createElement('span')
    posElem.setAttribute('class', 'dnb-number__fx__selection')
    insertElementBeforeSelection(posElem)

    // get position
    const { top, left } = posElem.getBoundingClientRect()
    posElem.parentElement.removeChild(posElem)

    // create that portal element
    const portalElem = document.createElement('span')
    portalElem.innerHTML = String(string)
    portalElem.setAttribute('class', 'dnb-number__fx dnb-core-style')
    portalElem.style.top = `${top - height / 1.333}px`
    portalElem.style.left = `${left + getSelectedText().length / 2}px`
    document.body.appendChild(portalElem)

    setTimeout(() => {
      try {
        document.body.removeChild(portalElem)
      } catch (e) {
        //
      }
    }, 800)
  } catch (e) {
    console.warn(e)
  }
}

// Can be human number - https://en.wikipedia.org/wiki/Decimal_separator
export function cleanNumber(num) {
  if (typeof num === 'number') {
    return num
  }

  num = String(num).trim()

  // If the number starts with not valid number chars
  num = /^[^0-9-]/.test(num) ? num.replace(/^(^[^0-9-]+)/, '') : num

  // Prepare decimals
  // Make sure that there are only two digits after the coma, then we clean that up.
  // else we dont, because it can be a US number!
  const reg = /(,|'|·)(\d{1,2})([^0-9]|\s+|$)/g
  num = reg.test(num)
    ? num.replace(reg, '.$2')
    : num.replace(/(,|'|·)/g, '')

  // Prepare thousend seperators first
  if ((num.match(/\.|,|'/g) || []).length > 1) {
    num = num.replace(/(\d|)(\.|,|')(\d{3})/g, '$1$3')
  }

  // Remove all invalid chars
  return num.replace(new RegExp(`([^${NUMBER_CHARS}])`, 'g'), '')

  // before we only removed spaces
  // return num.replace(/\s/g, '')
}
