/**
 * Web InputMasked Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React from 'react'
import { extendPropsWithContext } from '../../shared/component-helper'
import InputMaskedContext from './InputMaskedContext'
import InputMaskedElement from './InputMaskedElement'
import { inputDefaultProps } from '../input/Input'
import Context from '../../shared/Context'
import type { InternalLocale } from '../../shared/Context'
import type { ButtonIconPosition, ButtonVariant } from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type {
  InputInputAttributes,
  InputElement,
  InputSize,
  InputSubmitElement,
  InputSubmitButtonIcon,
  InputSuffix,
  InputChildren,
} from '../Input'
import type { NumberFormatProps } from '../NumberFormat'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import type { MaskitoOptions } from '@maskito/core'

export type InputMaskedMask = RegExp | Array<RegExp | string> | false
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

export type InputMaskedChange = {
  event?: unknown
  value: string
  numberValue?: number
  cleanedValue?: string | number
}
export type InputMaskedEventHandler = (
  payload: InputMaskedChange
) => unknown
export type InputMaskedOverwriteMode = MaskitoOptions['overwriteMode']
export type InputMaskedProps = Omit<
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
> &
  SpacingProps &
  FormStatusBaseProps & {
    /**
     * A mask defined as an array of RegExp and string tokens (e.g. `[/\d/, /\d/, " ", /\d/, /\d/]`) or a single RegExp. Defaults to number mask.
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
     * Allow users to keep typing after the provided mask has been filled. Extra characters will be appended unmasked.
     */
    allowOverflow?: boolean
    /**
     * Controls how overwriting characters is handled;
     * `shift` (default) moves to the next slot, `replace` keeps the cursor in place.
     */
    overwriteMode?: InputMaskedOverwriteMode | null
    /** @internal */
    _innerRef?: React.Ref<HTMLInputElement>
    onSubmit?: InputMaskedEventHandler
    onFocus?: InputMaskedEventHandler
    onBlur?: InputMaskedEventHandler
    onChange?: InputMaskedEventHandler
    onSubmitFocus?: InputMaskedEventHandler
    onSubmitBlur?: InputMaskedEventHandler
    type?: string
    size?: InputSize
    value?: InputMaskedValue
    id?: string
    label?: React.ReactNode
    labelDirection?: 'horizontal' | 'vertical'
    labelSrOnly?: boolean
    inputState?: string
    autocomplete?: string
    submitButtonTitle?: string
    clearButtonTitle?: string
    placeholder?: React.ReactNode
    clear?: boolean
    keepPlaceholder?: boolean
    suffix?: InputMaskedSuffix
    align?: InputMaskedAlign
    selectAll?: boolean
    stretch?: boolean
    disabled?: boolean
    skeleton?: SkeletonShow
    inputClass?: string
    inputAttributes?: InputInputAttributes
    inputElement?: InputElement
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
  }

const InputMasked = React.forwardRef<HTMLInputElement, InputMaskedProps>(
  function InputMasked(props, ref) {
    const context = React.useContext(Context)

    // Remove masks defined in Provider/Context, because it overwrites a custom mask
    const contextInputMasked = React.useMemo(() => {
      if (!props?.mask || !context?.InputMasked) {
        return context?.InputMasked
      }

      const clone = { ...context.InputMasked }
      for (const key in clone) {
        if (/^as[_A-Z]|numberMask|currencyMask/.test(key)) {
          delete clone[key]
        }
      }

      return clone
    }, [context?.InputMasked, props?.mask])

    const contextAndProps = React.useMemo(() => {
      const propsWithRef = {
        ...props,
        ref,
        _innerRef: props._innerRef ?? ref,
      }

      return extendPropsWithContext(
        propsWithRef,
        defaultProps,
        contextInputMasked
      )
    }, [contextInputMasked, props, ref])

    return (
      <InputMaskedContext value={{ props: contextAndProps, context }}>
        <InputMaskedElement />
      </InputMaskedContext>
    )
  }
)

const defaultProps = {
  ...inputDefaultProps,
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
  allowOverflow: false,
  overwriteMode: null,
  _innerRef: null,
  onChange: null,
  onSubmit: null,
  onFocus: null,
  onBlur: null,
  onSubmitFocus: null,
  onSubmitBlur: null,
}

withComponentMarkers(InputMasked, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default InputMasked
