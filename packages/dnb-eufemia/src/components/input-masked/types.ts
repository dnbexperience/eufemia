/**
 * Types for InputMasked
 *
 */

import type { HTMLProps, ReactNode } from 'react'
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
import type { SpacingProps } from '../../shared/types'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
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
  HTMLProps<HTMLInputElement>,
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
     * A mask defined as an array of RegExp and string tokens (e.g. `[/\d/, /\d/, " ", /\d/, /\d/]`) or a single RegExp. Defaults to `number mask`.
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
     * Allow users to keep typing after the defined mask has been filled. Extra characters will be appended without masking.
     */
    allowOverflow?: boolean
    /**
     * Control how overwriting characters is handled; `shift` (default) moves to the next slot while `replace` stays on the current slot.
     */
    overwriteMode?: InputMaskedOverwriteMode | null
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
    label?: ReactNode
    labelDirection?: FormElementProps['labelDirection']
    labelSrOnly?: boolean
    inputState?: string
    autocomplete?: string
    submitButtonTitle?: string
    clearButtonTitle?: string
    placeholder?: ReactNode
    showClearButton?: boolean
    keepPlaceholder?: boolean
    suffix?: InputMaskedSuffix
    align?: InputMaskedAlign
    selectAll?: boolean
    stretch?: boolean
    disabled?: boolean
    skeleton?: SkeletonShow
    inputClassName?: string
    inputAttributes?: InputInputAttributes
    inputElement?: InputElement
    icon?: IconIcon
    iconSize?: IconSize
    iconPosition?: ButtonIconPosition
    readOnly?: boolean
    innerElement?: ReactNode
    submitElement?: InputMaskedSubmitElement
    submitButtonVariant?: ButtonVariant
    submitButtonIcon?: InputMaskedSubmitButtonIcon
    submitButtonStatus?: string
    className?: string
    children?: InputMaskedChildren
  }
