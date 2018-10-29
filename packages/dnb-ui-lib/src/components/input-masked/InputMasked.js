/**
 * Web Input Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../input/Input'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
// import InputMask from 'react-input-mask' // https://github.com/sanniassin/react-input-mask
// import { registerElement } from '../../shared/component-helper'

const renderProps = {
  on_change: null,
  on_submit: null,
  on_focus: null,
  on_blur: null,
  on_submit_focus: null,
  on_submit_blur: null
}

export const propTypes = {
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  show_mask: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export const defaultProps = {
  mask: [],
  show_mask: false,
  ...renderProps
}

export default class InputMasked extends Component {
  // static tagName = 'dnb-input-masked'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  // static enableWebComponent() {
  //   registerElement(InputMasked.tagName, InputMasked, defaultProps)
  // }

  constructor(props) {
    super(props)
  }
  render() {
    const { mask, show_mask } = this.props

    const params = {
      mask,
      showMask: Boolean(show_mask)
    }

    const elem = ({ innerRef, ...props }) => {
      return (
        <MaskedInput
          ref={ref => {
            if (innerRef.current) {
              innerRef.current = ref
            }
          }}
          {...props}
          {...params}
        />
      )
    }

    return <Input {...this.props} inputElement={elem} />
  }
}
