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
        props.on_change = (params) => {
          dispatchCustomElementEvent(this, 'on_change', {
            cleaned_value: clean(params.value),
            ...params
          })
        }
        props.on_focus = (params) => {
          dispatchCustomElementEvent(this, 'on_focus', {
            cleaned_value: clean(params.value),
            ...params
          })

          const elem = params.event.target
          setTimeout(() => {
            try {
              if (
                elem.selectionStart === elem.selectionEnd &&
                elem.selectionStart === elem.value.length
              ) {
                elem.setSelectionRange(0, elem.selectionEnd)
              }
            } catch (e) {
              //
            }
          }, 1) // to get selectionStart
        }
        props.on_blur = (params) => {
          dispatchCustomElementEvent(this, 'on_blur', {
            cleaned_value: clean(params.value),
            ...params
          })
        }
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

    return <Input className="dnb-input-masked" {...props} />
  }
}
