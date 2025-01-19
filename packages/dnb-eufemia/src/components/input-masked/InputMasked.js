/* eslint-disable react/no-unused-prop-types */
/**
 * Web InputMasked Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { extendPropsWithContext } from '../../shared/component-helper'
import InputMaskedContext from './InputMaskedContext'
import InputMaskedElement from './InputMaskedElement'
import Input, { inputPropTypes } from '../input/Input'
import Context from '../../shared/Context'

const InputMasked = (props) => {
  const context = React.useContext(Context)

  // Remove masks defined in Provider/Context, because it overwrites a custom mask
  if (props?.mask) {
    const alias = context?.InputMasked
    for (const key in alias) {
      if (/^as[_A-Z]|number_mask|currency_mask/.test(key)) {
        delete alias[key]
      }
    }
  }

  const contextAndProps = React.useMemo(() => {
    return extendPropsWithContext(
      props,
      defaultProps,
      context?.InputMasked
    )
  }, [context?.InputMasked, props])

  return (
    <InputMaskedContext.Provider
      value={{
        props: contextAndProps,
        context,
      }}
    >
      <InputMaskedElement />
    </InputMaskedContext.Provider>
  )
}

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
  inner_ref: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  on_change: PropTypes.func,
  on_submit: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_submit_focus: PropTypes.func,
  on_submit_blur: PropTypes.func,

  ...inputPropTypes,
}

const defaultProps = {
  ...Input.defaultProps,

  mask: null,
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

InputMasked._formElement = true
InputMasked._supportsSpacingProps = true

export default InputMasked
