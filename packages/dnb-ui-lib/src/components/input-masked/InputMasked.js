/**
 * Web Input Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../input/Input'
import { isTrue } from '../../shared/component-helper'
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
  show_mask: false,
  show_guide: true,
  pipe: null,
  keep_char_positions: false,
  placeholder_char: '_',
  ...renderProps
}

export default class InputMasked extends PureComponent {
  // static tagName = 'dnb-input-masked'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  // static enableWebComponent() {
  //   registerElement(InputMasked.tagName, InputMasked, defaultProps)
  // }

  render() {
    let {
      mask,
      number_mask,
      show_mask,
      show_guide,
      pipe,
      keep_char_positions,
      placeholder_char,
      ...props
    } = this.props

    if (isTrue(number_mask)) {
      mask = createNumberMask({})
    } else if (number_mask) {
      if (typeof number_mask === 'string' && number_mask[0] === '{') {
        number_mask = JSON.parse(number_mask)
      }
      mask = createNumberMask(number_mask)
    }

    if (!props.inputElement)
      props.inputElement = (params, innerRef) => {
        params = {
          ...params,
          pipe,
          mask,
          showMask: isTrue(show_mask),
          guide: isTrue(show_guide),
          keepCharPositions: isTrue(keep_char_positions),
          placeholderChar: placeholder_char
        }
        return <MaskedInput ref={innerRef} {...params} />
      }

    return <Input className="dnb-input-masked" {...props} />
  }
}
