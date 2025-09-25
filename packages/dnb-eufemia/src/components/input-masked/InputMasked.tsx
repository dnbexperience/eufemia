// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
import type { InternalLocale } from '../../shared/Context'
import type { ButtonIconPosition } from '../Button'
import type { FormLabelLabelDirection } from '../FormLabel'
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type {
  InputInputAttributes,
  InputInputElement,
  InputSize,
} from '../Input'
import type { NumberFormatProps } from '../NumberFormat'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

export type InputMaskedMask =
  | Array<RegExp | string>
  | ((
      value: string,
      options: Record<string, boolean, string, number>
    ) => Array<RegExp>)
export type InputMaskedNumberMask =
  | string
  | boolean
  | Record<string, unknown>
export type InputMaskedCurrencyMask =
  | string
  | boolean
  | Record<string, unknown>
export type InputMaskedMaskOptions = string | Record<string, unknown>
export type InputMaskedAsCurrency = string | boolean
export type InputMaskedValue = string | number
export type InputMaskedSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export type InputMaskedAlign = 'left' | 'center' | 'right'
export type InputMaskedSubmitElement =
  | ((...args: any[]) => any)
  | React.ReactNode
export type InputMaskedSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type InputMaskedChildren =
  | React.ReactNode
  | ((...args: any[]) => any)
export interface InputMaskedProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below. Defaults to number mask.
   */
  mask?: InputMaskedMask
  /**
   * Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.
   */
  number_mask?: InputMaskedNumberMask
  /**
   * Set to `true` or set the _valuta_ (currency_mask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.
   */
  currency_mask?: InputMaskedCurrencyMask
  /**
   * Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.
   */
  mask_options?: InputMaskedMaskOptions
  /**
   * Use an object with [NumberFormat](/uilib/components/number-format/properties).
   */
  number_format?: NumberFormatProps
  /**
   * Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.
   */
  locale?: InternalLocale
  /**
   * Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.
   */
  as_currency?: InputMaskedAsCurrency
  /**
   * Set to `true` to automatically set a number mask based on the given or inherited locale.
   */
  as_number?: boolean
  /**
   * Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.
   */
  as_percent?: boolean
  /**
   * Show mask when input is empty and has no focus. Defaults to `false`.
   */
  show_mask?: boolean
  /**
   * When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.
   */
  show_guide?: boolean
  pipe?: (...args: any[]) => any
  /**
   * When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.
   */
  keep_char_positions?: boolean
  /**
   * The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.
   */
  placeholder_char?: string
  inner_ref?: React.Ref
  on_change?: (...args: any[]) => any
  on_submit?: (...args: any[]) => any
  on_focus?: (...args: any[]) => any
  on_blur?: (...args: any[]) => any
  on_submit_focus?: (...args: any[]) => any
  on_submit_blur?: (...args: any[]) => any
  type?: string
  size?: InputSize
  value?: InputMaskedValue
  id?: string
  label?: React.ReactNode
  label_direction?: FormLabelLabelDirection
  label_sr_only?: boolean
  status?: FormStatusText
  status_state?: FormStatusState
  status_props?: FormStatusProps
  status_no_animation?: boolean
  input_state?: string
  globalStatus?: GlobalStatusConfigObject
  autocomplete?: string
  submit_button_title?: string
  clear_button_title?: string
  placeholder?: string
  clear?: boolean
  keep_placeholder?: boolean
  suffix?: InputMaskedSuffix
  align?: InputMaskedAlign
  selectall?: boolean
  stretch?: boolean
  disabled?: boolean
  skeleton?: SkeletonShow
  input_class?: string
  input_attributes?: InputInputAttributes
  input_element?: InputInputElement
  icon?: IconIcon
  icon_size?: IconSize
  icon_position?: ButtonIconPosition
  readOnly?: boolean
  inner_element?: React.ReactNode
  submit_element?: InputMaskedSubmitElement
  submit_button_variant?: any
  submit_button_icon?: InputMaskedSubmitButtonIcon
  submit_button_status?: string
  className?: string
  children?: InputMaskedChildren
  on_state_update?: (...args: any[]) => any
}

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
