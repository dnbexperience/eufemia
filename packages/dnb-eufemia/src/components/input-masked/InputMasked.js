/* eslint-disable react/no-unused-prop-types */
/**
 * Web InputMasked Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { registerElement } from '../../shared/component-helper'
import InputMaskedContext from './InputMaskedContext'
import InputMaskedElement from './InputMaskedElement'
import Input, { inputPropTypes } from '../input/Input'
import Context from '../../shared/Context'

const InputMasked = React.forwardRef((props, ref) => {
  const context = React.useContext(Context)
  return (
    <InputMaskedContext.Provider
      value={{
        inner_ref: ref,
        props,
        ...context,
      }}
    >
      <InputMaskedElement />
    </InputMaskedContext.Provider>
  )
})

export default InputMasked

InputMasked.enableWebComponent = () => {
  registerElement(
    InputMasked?.tagName,
    InputMasked,
    InputMasked.defaultProps
  )
}

InputMasked.tagName = 'dnb-input-masked'

InputMasked.propTypes = {
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
  mask_options: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  number_format: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  as_currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  as_number: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  as_percent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_mask: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_guide: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  pipe: PropTypes.func,
  keep_char_positions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder_char: PropTypes.string,
  inner_ref: PropTypes.object,

  on_change: PropTypes.func,
  on_submit: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_submit_focus: PropTypes.func,
  on_submit_blur: PropTypes.func,

  ...inputPropTypes,
}

InputMasked.defaultProps = {
  ...Input.defaultProps,

  mask: [],
  number_mask: null,
  currency_mask: null,
  mask_options: null,
  number_format: null,
  as_currency: null,
  as_number: null,
  as_percent: null,
  locale: null,
  show_mask: false,
  show_guide: true,
  pipe: null,
  keep_char_positions: false,
  placeholder_char: null,
  inner_ref: null,

  on_change: null,
  on_submit: null,
  on_focus: null,
  on_blur: null,
  on_submit_focus: null,
  on_submit_blur: null,
}
