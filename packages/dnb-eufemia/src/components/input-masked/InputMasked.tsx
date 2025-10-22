/* eslint-disable react/no-unused-prop-types */
/**
 * Web InputMasked Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import { extendPropsWithContext } from '../../shared/component-helper'
import InputMaskedContext from './InputMaskedContext'
import InputMaskedElement from './InputMaskedElement'
import Input from '../input/Input'
import Context from '../../shared/Context'
import type { InternalLocale } from '../../shared/Context'
import type { ButtonIconPosition, ButtonVariant } from '../Button'
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
  InputSubmitElement,
  InputSubmitButtonIcon,
  InputSuffix,
  InputChildren,
  InputProps,
} from '../Input'
import type { Pipe, Mask, MaskFunction } from './text-mask/types'
import type { NumberFormatProps } from '../NumberFormat'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

type LooseMaskPair = {
  mask: (...args: unknown[]) => unknown
  pipe?: (...args: unknown[]) => unknown
}

export type InputMaskedMask =
  | Array<RegExp | string>
  | ((
      value: string,
      options: Record<string, unknown>
    ) => Array<RegExp | string>)
  | boolean
  | { mask: Mask | MaskFunction; pipe?: Pipe }
  | LooseMaskPair
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
export type InputMaskedSuffix = InputSuffix
export type InputMaskedAlign = 'left' | 'center' | 'right'
export type InputMaskedSubmitElement = InputSubmitElement
export type InputMaskedSubmitButtonIcon = InputSubmitButtonIcon
export type InputMaskedChildren = InputChildren

export type InputMaskedChangePayload = {
  event?: unknown
  value: string
  numberValue?: number
  cleanedValue?: string | number
}
export interface InputMaskedProps
  extends Omit<
      React.HTMLProps<HTMLInputElement>,
      'ref' | 'placeholder' | 'label' | 'children' | 'onChange' | 'size'
    >,
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
  pipe?: Pipe
  /**
   * When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.
   */
  keep_char_positions?: boolean
  /**
   * The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.
   */
  placeholder_char?: string
  inner_ref?: InputProps['inner_ref']
  on_change?: (payload: { value: string } & Record<string, any>) => unknown
  on_submit?: (payload: { value: string } & Record<string, any>) => unknown
  on_focus?: (payload: { value: string } & Record<string, any>) => unknown
  on_blur?: (payload: { value: string } & Record<string, any>) => unknown
  on_submit_focus?: (
    payload: { value: string } & Record<string, any>
  ) => unknown
  on_submit_blur?: (
    payload: { value: string } & Record<string, any>
  ) => unknown
  type?: string
  size?: InputSize
  value?: InputMaskedValue
  id?: string
  label?: React.ReactNode
  labelDirection?: 'horizontal' | 'vertical'
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
  placeholder?: React.ReactNode
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
  submit_button_variant?: ButtonVariant
  submit_button_icon?: InputMaskedSubmitButtonIcon
  submit_button_status?: string
  className?: string
  children?: InputMaskedChildren
  on_state_update?: (...args: unknown[]) => unknown
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement>
    | ((payload: { value: string } & Record<string, any>) => unknown)
}

function InputMasked(props: InputMaskedProps) {
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
      value={{ props: contextAndProps, context }}
    >
      <InputMaskedElement />
    </InputMaskedContext.Provider>
  )
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

export default InputMasked

// Mark as form element for FieldBlock
InputMasked._formElement = true
InputMasked._supportsSpacingProps = true
