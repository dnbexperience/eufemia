/**
 * Web Input Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  format,
  getCurrencySymbol,
  getDecimalSeparator,
  getThousandsSeparator,
} from '../number-format/NumberUtils'
import Input, { inputPropTypes } from '../input/Input'
import {
  isTrue,
  registerElement,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import _MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Context from '../../shared/Context'
import createNumberMask from './addons/createNumberMask'
import classnames from 'classnames'
import keycode from 'keycode'

// Looks like we get two defaults back – this may change in a future update
const MaskedInput = _MaskedInput.default || _MaskedInput

export default class InputMasked extends React.PureComponent {
  static tagName = 'dnb-input-masked'
  static contextType = Context

  static propTypes = {
    mask: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.func,
    ]),
    number_mask: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    currency_mask: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    locale: PropTypes.string,
    as_currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    as_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      // PropTypes.object,
    ]),
    show_mask: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    show_guide: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    pipe: PropTypes.func,
    keep_char_positions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    placeholder_char: PropTypes.string,

    on_change: PropTypes.func,
    on_submit: PropTypes.func,
    on_focus: PropTypes.func,
    on_blur: PropTypes.func,
    on_submit_focus: PropTypes.func,
    on_submit_blur: PropTypes.func,

    ...inputPropTypes,
  }

  static defaultProps = {
    ...Input.defaultProps,

    mask: [],
    number_mask: null,
    currency_mask: null,
    as_currency: null,
    as_number: null,
    locale: null,
    show_mask: false,
    show_guide: true,
    pipe: null,
    keep_char_positions: false,
    placeholder_char: '_',

    on_change: null,
    on_submit: null,
    on_focus: null,
    on_blur: null,
    on_submit_focus: null,
    on_submit_blur: null,
  }

  static enableWebComponent() {
    registerElement(
      InputMasked?.tagName,
      InputMasked,
      InputMasked.defaultProps
    )
  }

  componentWillUnmount() {
    clearTimeout(this._selectionTimeout)
  }

  render() {
    let {
      mask,
      number_mask,
      currency_mask,
      as_currency,
      as_number,
      locale,
      show_mask,
      show_guide,
      pipe,
      keep_char_positions,
      placeholder_char: placeholderChar,
      ...props
    } = this.props

    if (isTrue(number_mask)) {
      number_mask = {}
    } else {
      if (typeof number_mask === 'string' && number_mask[0] === '{') {
        number_mask = JSON.parse(number_mask)
      }
    }

    if (isTrue(currency_mask)) {
      currency_mask = {}
    } else {
      if (typeof currency_mask === 'string' && currency_mask[0] === '{') {
        currency_mask = JSON.parse(currency_mask)
      }
    }

    if (as_number || as_currency) {
      if (isTrue(as_number)) {
        as_number = {}
      } else if (isTrue(as_currency)) {
        as_currency = {}
      }

      if (!locale && this.context) {
        locale = this.context.locale
      }

      if (props.value !== 'initval') {
        props.value = format(props.value, {
          locale,
          ...(as_number || as_currency),
        })
      }

      const decimalSymbol = getDecimalSeparator(locale)
      const thousandsSeparatorSymbol = getThousandsSeparator(
        locale
      ).replace(' ', ' ')

      if (as_number) {
        number_mask = {
          decimalSymbol,
          thousandsSeparatorSymbol,
          decimalLimit: null,
          ...number_mask,
        }
      } else if (as_currency) {
        currency_mask = {
          decimalSymbol,
          thousandsSeparatorSymbol,
          decimalLimit: null,
          currency: getCurrencySymbol(
            locale,
            typeof as_currency !== 'string' ? null : as_currency
          ),
          ...currency_mask,
        }
      }
    }

    let maskParams = null

    if (number_mask) {
      maskParams = {
        allowDecimal: true,
        ...number_mask,
      }
    } else if (currency_mask) {
      show_mask = true
      placeholderChar = null
      props.align = props.align || 'right'

      maskParams = {
        allowDecimal: true,
        ...currency_mask,
      }

      const fix =
        typeof currency_mask === 'string'
          ? currency_mask
          : typeof currency_mask.currency === 'string'
          ? currency_mask.currency
          : 'kr'

      if (props.align === 'left') {
        maskParams.prefix = `${fix} `
      } else {
        maskParams.suffix = ` ${fix}`
      }
    }

    if (maskParams) {
      mask = createNumberMask(maskParams)
    }

    if (!props.input_element) {
      if (placeholderChar === '' || placeholderChar === null) {
        placeholderChar = '\u200B'
      }

      if (mask.instanceOf === 'createNumberMask') {
        const callEvent = ({ event, value }, name) => {
          value = value || event.target.value

          if (name === 'on_key_down' && maskParams?.decimalSymbol) {
            const keyCode = keycode(event)
            const hasDecimalSymbol = value.includes(
              maskParams.decimalSymbol
            )

            // https://en.wikipedia.org/wiki/Decimal_separator
            const decimalSeparators = /[,.'·]/

            if (
              maskParams.decimalLimit === 0 &&
              decimalSeparators.test(keyCode)
            ) {
              event.preventDefault()
            }

            // if we have already a decimal, we do not allow to type another
            else if (
              hasDecimalSymbol &&
              keyCode === maskParams.decimalSymbol
            ) {
              event.preventDefault()
            }

            // replace other decimal
            else if (
              !hasDecimalSymbol &&
              keyCode !== maskParams.decimalSymbol &&
              decimalSeparators.test(keyCode) &&
              maskParams.decimalLimit !== 0
            ) {
              value = value.slice(0, event.target.selectionStart)
              event.target.value = value + maskParams.decimalSymbol
            }
          }

          const cleaned_value = clean(value)

          return dispatchCustomElementEvent(this, name, {
            event,
            value,
            cleaned_value,
          })
        }

        props.onMouseUp = (event) => {
          fixPositionIssue(event.target, props)
          callEvent({ event }, 'on_mouse_up')
        }
        props.onTouchEnd = (event) => {
          fixPositionIssue(event.target, props)
          callEvent({ event }, 'on_touch_end')
        }
        props.on_focus = (params) => {
          fixPositionIssue(params.event.target, props)
          callEvent(params, 'on_focus')
        }

        props.on_key_down = (params) => callEvent(params, 'on_key_down')
        props.on_submit = (params) => callEvent(params, 'on_submit')
        props.on_blur = (params) => callEvent(params, 'on_blur')
        props.on_change = (params) => callEvent(params, 'on_change')
      }

      props.input_element = (params, innerRef) => {
        params = {
          ...params,
          pipe,
          mask,
          showMask: isTrue(show_mask),
          guide: isTrue(show_guide),
          keepCharPositions: isTrue(keep_char_positions),
          placeholderChar,
        }

        return (
          <MaskedInput
            render={(setRef, props) => (
              <input
                ref={(ref) => setRef((innerRef.current = ref))}
                {...props}
              />
            )}
            {...params}
          />
        )
      }
    }

    props.className = classnames(
      'dnb-input-masked',
      props.className,
      show_mask &&
        show_guide &&
        placeholderChar === '_' &&
        'dnb-input-masked--guide'
    )

    return <Input {...props} />
  }
}

const clean = (v) => String(v).replace(new RegExp('[^\\d,.-]', 'g'), '')

/**
 * This is a fix for a "text-mask" bug
 * when the user sets the focus after a prefix,
 * its not anymore possible to type.
 *
 * @param {*} elem DOM element
 * @param {*} param1 props from the component – we use only align
 */
export const fixPositionIssue = (elem, { align = 'right' } = {}) => {
  clearTimeout(_selectionTimeout)
  _selectionTimeout = setTimeout(() => {
    const cleaned_value = clean(elem.value)
    if (cleaned_value.length > 0) {
      return
    }
    try {
      const end = elem.selectionEnd
      if (elem.selectionStart === end && end === elem.value.length) {
        let pos = 0
        if (align === 'left') {
          pos = end - 1
        }
        elem.setSelectionRange(pos, pos)
      }
    } catch (e) {
      //
    }
  }, 1) // to get the current value
}
let _selectionTimeout
