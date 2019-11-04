/**
 * Web Number Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { LOCALE, CURRENCY } from '../../shared/defaults'
import {
  isTrue,
  validateDOMAttributes,
  registerElement,
  extend
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {}

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  locale: PropTypes.string,
  currency: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // bank account number
  ban: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // national identification number
  nin: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  phone: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // can be tel or sms
  anchor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  selectable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  element: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

  // Web Component props
}

const defaultProps = {
  value: null,
  locale: null,
  currency: null,
  ban: null,
  nin: null,
  phone: null,
  anchor: null,
  options: null,

  selectable: null,
  element: 'span', // span or abbr
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Number extends PureComponent {
  static tagName = 'dnb-number'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Number.tagName, Number, defaultProps)
  }

  // NB: not ready. To copy to clipboard, we have to create a fake input
  // constructor(props) {
  //   super(props)
  //   this._ref = React.createRef()
  // }
  // onClickHandler = e => {
  //   try {
  //     console.log('this._ref', e.target)
  //     e.target.select()
  //     // this._ref.current.setSelectionRange(0, 99999)
  //     document.execCommand('copy')
  //   } catch (e) {
  //     console.warn(e)
  //   }
  // }

  render() {
    // consume the global context

    const {
      value: _value,
      children,
      currency,
      ban,
      nin,
      phone,
      anchor: _anchor,
      options,
      locale,
      selectable,
      element,
      class: _className,
      className,
      ...rest
    } = this.props

    let anchor = _anchor
    let value = _value

    if (children !== null) {
      value = children
    }

    const formatOptions = {
      locale,
      currency,
      ban,
      nin,
      phone,
      options,
      returnAria: true
    }

    // use only the props from context, who are available here anyway
    if (this.context) {
      const useContext = extend(
        { locale: null, currency: null },
        this.context
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

    const { number: display, aria, locale: lang } = format(
      value,
      formatOptions
    )

    let attributes = { ...rest }

    // NB: possible enhancement
    // if (isTrue(selectable)) {
    //   attributes.onClick = this.onClickHandler
    //   // attributes.ref = this._ref
    // }

    if (aria !== display) {
      // NB: role="text" is not valid,
      // but is required by VO to fix group anouncement
      attributes['role'] = 'text'
      attributes['aria-label'] = aria
    }
    attributes = {
      ...{
        className: classnames(
          'dnb-number',
          className,
          _className,
          isTrue(selectable) && 'dnb-number--selectable',
          anchor && 'dnb-anchor',
          createSpacingClasses(this.props)
        ),
        lang
      },
      ...attributes
    }

    validateDOMAttributes(this.props, attributes)

    if (anchor) {
      if (isTrue(anchor)) {
        anchor = 'tel'
      }
      return (
        <a href={`${anchor}:${display}`} {...attributes}>
          {display}
        </a>
      )
    }

    return (
      <Element is={element} {...attributes}>
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
    // set currency options
    opts.currency =
      opts.currency || (isTrue(currency) ? CURRENCY : currency)
    opts.style = opts.style || 'currency'
    opts.currencyDisplay = opts.currencyDisplay || 'symbol' // code, name, symbol

    // cleanup
    let cleanedNumber = String(value).replace(/[\s,]/g, '')
    cleanedNumber = parseFloat(
      /(,)(\d\d)$/.test(String(value))
        ? String(value).replace(/(,)(\d\d)$/, '.$2')
        : cleanedNumber
    )

    display = formatNumber(cleanedNumber, locale, opts)

    // change the position of minus if it's first
    const first = display[0]
    if (first === '−' || first === '-') {
      display = display.replace(/^(−|-)([^\d]+)(.*)/g, '$2$1$3')

      // NB: Here we could check if windos is used and put a minus in front, so NVDA reads it out
      // aria = 'minus ' + aria
    }

    // aria options
    opts.currencyDisplay = 'name'
    aria = formatNumber(cleanedNumber, locale, opts)
    aria = enhanceSR(cleanedNumber, aria, locale)

    // get only the currency name
    // const num = aria.replace(/([^0-9])+$/g, '')
    // const name = aria.replace(num, '')
    // aria = cleanedNumber + name
  } else {
    display = formatNumber(value, locale, opts)

    // fix for NDVA to make sure we read the number, we add a minium fraction digit (decimal)
    if (typeof opts.minimumFractionDigits === 'undefined') {
      opts.minimumFractionDigits = 1 // NVDA fix
      aria = formatNumber(value, locale, opts)
      aria = enhanceSR(value, aria, locale)
    }
  }

  if (aria === null) {
    aria = display
  }

  // return "locale" as well, since we have to "auto" option
  return returnAria ? { number: display, aria, locale } : display
}

const enhanceSR = (value, aria) => {
  // Enhance VO support on mobile devices
  // Numbers under 99.999 are read out correctly, but only if we remove the spaces
  // Potential we could also check for locale: && /no|nb|nn/.test(locale)
  // but leave it for now without this ectra check
  if (Math.abs(parseFloat(value)) <= 99999) {
    aria = String(aria).replace(/\s([0-9])/g, '$1')
  }

  return aria
}

export const formatNumber = (number, locale, options = {}) => {
  if (typeof Number.toLocaleString === 'function') {
    return parseFloat(number).toLocaleString(locale, options)
  } else if (
    typeof Intl !== 'undefined' &&
    typeof Intl.NumberFormat === 'function'
  ) {
    return Intl.NumberFormat(locale, options).format(number)
  }
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
            .filter(s => s)
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
              .filter(s => s)
              .join(' ')
        }
      }

      aria =
        code +
        number
          .split(/(\d{2})/)
          .filter(s => s)
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
        .split(/(\d{4})(\d{2})(\d{5})/)
        .filter(s => s)
        .join(' ')

      aria = number
        .split(/(\d{2})/)
        .filter(s => s)
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
        .filter(s => s)
        .join(' ')

      // correct nim for screen redaers
      aria = display
        .split(/(\d{2})(\d{2})(\d{2}) (\d{1})(\d{1})(\d{1})(\d{1})(\d{1})/)
        .filter(s => s)
        .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}
