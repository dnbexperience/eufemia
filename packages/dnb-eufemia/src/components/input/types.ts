/**
 * Types for Input
 *
 */

import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentType,
  FocusEvent,
  FocusEventHandler,
  HTMLProps,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  ReactNode,
  Ref,
  RefObject,
  SyntheticEvent,
} from 'react'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
} from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'

export type InputSize = 'default' | 'small' | 'medium' | 'large' | number

export type InputValue = string | number

export type InputSuffix = ReactNode

export type InputAlign = 'left' | 'center' | 'right'

export type InputInputAttributes = string | Record<string, unknown>

export type InputElementRenderProps = {
  className: string
  autoComplete: string
  type: string
  id: string
  disabled: boolean
  name: string
  value: string | number | null
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
  onFocus: FocusEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  [key: string]: unknown
}

export type InputElement =
  | ComponentType
  | ReactNode
  | ((
      params: InputElementRenderProps,
      ref: RefObject<HTMLInputElement | null>
    ) => ReactNode)

export type InputSubmitElement = ComponentType | ReactNode

export type InputSubmitButtonIcon = string | ReactNode

export type InputChildren = ReactNode

export type InputEvent<E = SyntheticEvent> = {
  value: string
  event: E
}

export type InputChangeEvent = InputEvent<
  ChangeEvent<HTMLInputElement> | MouseEvent
>

export type InputFocusEvent = InputEvent<FocusEvent<HTMLInputElement>>

export type InputKeyDownEvent = InputEvent<KeyboardEvent<HTMLInputElement>>

export type InputClearEvent = {
  value: string
  previousValue: string | number | null
  event: MouseEvent
}

export type InputProps = Omit<
  HTMLProps<HTMLInputElement>,
  | 'ref'
  | 'children'
  | 'onChange'
  | 'onKeyDown'
  | 'onSubmit'
  | 'onFocus'
  | 'onBlur'
  | 'size'
  | 'label'
  | 'placeholder'
> &
  SpacingProps &
  FormStatusBaseProps & {
    /**
     * Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`. `search` shows a loupe icon by default when no submit button is shown.
     */
    type?: string
    /**
     * The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.
     */
    size?: InputSize
    /**
     * The content value of the input.
     */
    value?: InputValue
    id?: string
    /**
     * Prepends the Form Label component. If no ID is provided, a random ID is created.
     */
    label?: ReactNode
    /**
     * Use `labelDirection="horizontal"` to change the label layout direction. Defaults to `vertical`.
     */
    labelDirection?: FormElementProps['labelDirection']
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean
    /**
     * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. There are currently three statuses `virgin`, `focus` and `dirty`. Defaults to `null`.
     */
    inputState?: string
    /**
     * Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
     */
    autocomplete?: string
    /**
     * Title attribute for the submit button. Only relevant when `showSubmitButton` is used.
     */
    submitButtonTitle?: string
    clearButtonTitle?: string
    /**
     * The placeholder which shows up once the input value is empty.
     */
    placeholder?: ReactNode
    /**
     * If set to `true`, then a clear button will be shown which lets the user clear any given input value.
     */
    showClearButton?: boolean
    /**
     * Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.
     */
    keepPlaceholder?: boolean
    /**
     * Text describing the content of the input more than the label. You can also send in a React component, so it gets wrapped inside the Input component.
     */
    suffix?: InputSuffix
    /**
     * Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.
     */
    align?: InputAlign
    /**
     * If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.
     */
    selectAll?: boolean
    /**
     * If set to `true`, then the input field will be 100% in `width`.
     */
    stretch?: boolean
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * In case we have to set a custom class on the input element.
     */
    inputClassName?: string
    /**
     * Provide the Input element with any attributes by using an Object `inputAttributes={{size:'2'}}` or a JSON Object `inputAttributes='{"size":"2"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
     */
    inputAttributes?: InputInputAttributes
    /**
     * By providing a new component we can change the internally used element. Also supports a string only, like `inputElement="input"`.
     */
    inputElement?: InputElement
    /**
     * If set to `true`, the Input's internal "__shell" and "__border" class element will be omitted.
     * @internal
     */
    _omitInputShellClass?: boolean
    /**
     * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
     */
    icon?: IconIcon
    /**
     * The size of the icon. Defaults to `medium`.
     */
    iconSize?: IconSize
    /**
     * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
     */
    iconPosition?: ButtonIconPosition
    /**
     * By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.
     */
    ref?: Ref<HTMLInputElement>
    readOnly?: boolean
    /**
     * By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
     */
    innerElement?: ReactNode
    /**
     * If set to `true`, then a submit button will be shown when `type="search"`.
     */
    showSubmitButton?: boolean
    /**
     * Accepts a React element which will show up where the "submit button" would do.
     */
    submitElement?: InputSubmitElement
    submitButtonVariant?: ButtonVariant
    submitButtonIcon?: InputSubmitButtonIcon
    submitButtonStatus?: string
    children?: InputChildren
    onChange?: (event: InputChangeEvent) => void
    onKeyDown?: (event: InputKeyDownEvent) => void
    onSubmit?: (event: InputEvent) => void
    onFocus?: (event: InputFocusEvent) => void
    onBlur?: (event: InputFocusEvent) => void
    onSubmitFocus?: (event: InputEvent<FocusEvent>) => void
    onSubmitBlur?: (event: InputEvent<FocusEvent>) => void
    onClear?: (event: InputClearEvent) => void
  }

export type InputSubmitButtonProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'ref' | 'size' | 'onSubmit'
> &
  FormStatusBaseProps & {
    id?: string
    /**
     * The content value of the input.
     */
    value?: string
    title?: string
    variant?: ButtonVariant
    /**
     * The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.
     */
    size?: ButtonSize
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
     */
    icon?: IconIcon
    /**
     * The size of the icon. Defaults to `medium`.
     */
    iconSize?: IconSize
    onSubmit?: (event: InputEvent) => void
    onSubmitFocus?: (event: InputEvent<FocusEvent>) => void
    onSubmitBlur?: (event: InputEvent<FocusEvent>) => void
  }
