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
      | 'ref'
      | 'placeholder'
      | 'label'
      | 'children'
      | 'onChange'
      | 'onFocus'
      | 'onBlur'
      | 'onSubmit'
      | 'size'
    >,
    SpacingProps {
  /**
   * A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below. Defaults to number mask.
   */
  mask?: InputMaskedMask
  /**
   * Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.
   */
  numberMask?: InputMaskedNumberMask
  /**
   * Set to `true` or set the _valuta_ (currencyMask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.
   */
  currencyMask?: InputMaskedCurrencyMask
  /**
   * Use it to manipulate internal masks. You can use it instead of e.g. `numberMask` or `currencyMask`. All options are listed below.
   */
  maskOptions?: InputMaskedMaskOptions
  /**
   * Use an object with [NumberFormat](/uilib/components/number-format/properties).
   */
  numberFormat?: NumberFormatProps
  /**
   * Define the locale to be used in the `asNumber` or `asCurrency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.
   */
  locale?: InternalLocale
  /**
   * Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.
   */
  asCurrency?: InputMaskedAsCurrency
  /**
   * Set to `true` to automatically set a number mask based on the given or inherited locale.
   */
  asNumber?: boolean
  /**
   * Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.
   */
  asPercent?: boolean
  /**
   * Show mask when input is empty and has no focus. Defaults to `false`.
   */
  showMask?: boolean
  /**
   * When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.
   */
  showGuide?: boolean
  pipe?: Pipe
  /**
   * When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.
   */
  keepCharPositions?: boolean
  /**
   * The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.
   */
  placeholderChar?: string
  innerRef?: InputProps['innerRef']
  onSubmit?: (payload: { value: string } & Record<string, any>) => unknown
  onFocus?: (payload: { value: string } & Record<string, any>) => unknown
  onBlur?: (payload: { value: string } & Record<string, any>) => unknown
  onChange?: (payload: { value: string } & Record<string, any>) => unknown
  onSubmitFocus?: (
    payload: { value: string } & Record<string, any>
  ) => unknown
  onSubmitBlur?: (
    payload: { value: string } & Record<string, any>
  ) => unknown
  type?: string
  size?: InputSize
  value?: InputMaskedValue
  id?: string
  label?: React.ReactNode
  labelDirection?: 'horizontal' | 'vertical'
  labelSrOnly?: boolean
  status?: FormStatusText
  statusState?: FormStatusState
  statusProps?: FormStatusProps
  statusNoAnimation?: boolean
  inputState?: string
  globalStatus?: GlobalStatusConfigObject
  autocomplete?: string
  submitButtonTitle?: string
  clearButtonTitle?: string
  placeholder?: React.ReactNode
  clear?: boolean
  keepPlaceholder?: boolean
  suffix?: InputMaskedSuffix
  align?: InputMaskedAlign
  selectall?: boolean
  stretch?: boolean
  disabled?: boolean
  skeleton?: SkeletonShow
  inputClass?: string
  inputAttributes?: InputInputAttributes
  inputElement?: InputInputElement
  icon?: IconIcon
  iconSize?: IconSize
  iconPosition?: ButtonIconPosition
  readOnly?: boolean
  innerElement?: React.ReactNode
  submitElement?: InputMaskedSubmitElement
  submitButtonVariant?: ButtonVariant
  submitButtonIcon?: InputMaskedSubmitButtonIcon
  submitButtonStatus?: string
  className?: string
  children?: InputMaskedChildren
  onStateUpdate?: (...args: unknown[]) => unknown
}

function InputMasked(props: InputMaskedProps) {
  const context = React.useContext(Context)

  // Remove masks defined in Provider/Context, because it overwrites a custom mask
  if (props?.mask) {
    const alias = context?.InputMasked
    for (const key in alias) {
      if (/^as[_A-Z]|numberMask|currencyMask/.test(key)) {
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
  numberMask: null,
  currencyMask: null,
  maskOptions: null,
  numberFormat: null,
  asCurrency: null,
  asNumber: null,
  asPercent: null,
  locale: null,
  showMask: false,
  showGuide: true,
  pipe: null,
  keepCharPositions: false,
  placeholderChar: null,
  innerRef: null,

  onChange: null,
  onSubmit: null,
  onFocus: null,
  onBlur: null,
  onSubmitFocus: null,
  onSubmitBlur: null,
}

export default InputMasked

// Mark as form element for FieldBlock
InputMasked._formElement = true
InputMasked._supportsSpacingProps = true
