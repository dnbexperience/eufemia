/**
 * Web Input Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../input/Input'
import {
  isTrue,
  registerElement,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import createNumberMask from './addons/createNumberMask'
import classnames from 'classnames'

const renderProps = {
  on_change: null,
  on_submit: null,
  on_focus: null,
  on_blur: null,
  on_submit_focus: null,
  on_submit_blur: null
}

const propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func
  ]),
  number_mask: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object
  ]),
  currency_mask: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object
  ]),
  show_mask: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_guide: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  pipe: PropTypes.func,
  keep_char_positions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  placeholder_char: PropTypes.string
}

const defaultProps = {
  mask: [],
  number_mask: null,
  currency_mask: null,
  show_mask: false,
  show_guide: true,
  pipe: null,
  keep_char_positions: false,
  placeholder_char: '_',
  ...renderProps
}

export default class InputMasked extends PureComponent {
  static tagName = 'dnb-input-masked'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(InputMasked.tagName, InputMasked, defaultProps)
  }

  componentWillUnmount() {
    clearTimeout(this._selectionTimeout)
  }

  render() {
    let {
      mask,
      number_mask,
      currency_mask,
      show_mask,
      show_guide,
      pipe,
      keep_char_positions,
      placeholder_char: placeholderChar,
      ...props
    } = this.props

    if (number_mask) {
      if (isTrue(number_mask)) {
        number_mask = {}
      } else {
        if (typeof number_mask === 'string' && number_mask[0] === '{') {
          number_mask = JSON.parse(number_mask)
        }
      }
      mask = createNumberMask(number_mask)
    } else if (currency_mask) {
      if (isTrue(currency_mask)) {
        currency_mask = {}
      } else {
        if (typeof number_mask === 'string' && number_mask[0] === '{') {
          number_mask = JSON.parse(number_mask)
        }
      }
      show_mask = true
      placeholderChar = null
      props.align = props.align || 'right'

      const maskParams = {
        allowDecimal: true,
        ...currency_mask
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
      mask = createNumberMask(maskParams)
    }

    if (!props.input_element) {
      if (placeholderChar === '' || placeholderChar === null) {
        placeholderChar = '\u200B'
      }

      if (mask.instanceOf === 'createNumberMask') {
        const clean = (v) =>
          String(v).replace(new RegExp('[^\\d,.-]', 'g'), '')

        const fixPositionIssue = (elem) => {
          clearTimeout(this._selectionTimeout)
          this._selectionTimeout = setTimeout(() => {
            const cleaned_value = clean(elem.value)
            if (cleaned_value.length > 0) {
              return
            }
            try {
              const end = elem.selectionEnd
              if (
                elem.selectionStart === end &&
                end === elem.value.length
              ) {
                let pos = 0
                if (props.align === 'left') {
                  pos = end - 1
                }
                elem.setSelectionRange(pos, pos)
              }
            } catch (e) {
              //
            }
          }, 1) // to get the current value
        }

        const callEvent = ({ event, value }, name) => {
          value = value || event.target.value
          const cleaned_value = clean(value)
          return dispatchCustomElementEvent(this, name, {
            event,
            value,
            cleaned_value
          })
        }
        props.onMouseUp = (event) => {
          fixPositionIssue(event.target)
          callEvent({ event }, 'on_mouse_up')
        }
        props.onTouchEnd = (event) => {
          fixPositionIssue(event.target)
          callEvent({ event }, 'on_touch_end')
        }
        props.on_focus = (params) => {
          fixPositionIssue(params.event.target)
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
          placeholderChar
        }
        return <MaskedInput ref={innerRef} {...params} />
      }
    }

    props.className = classnames(
      'dnb-input-masked',
      props.className,
      show_guide && 'dnb-input-masked--guide'
    )

    return <Input {...props} />
  }
}
