/**
 * Types for Textarea
 *
 */

import type {
  ChangeEvent,
  FocusEvent,
  HTMLProps,
  KeyboardEvent,
  ReactNode,
  Ref,
  RefObject,
  SyntheticEvent,
  TextareaHTMLAttributes,
} from 'react'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type { InternalLocale } from '../../shared/Context'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'
import type { TextCounterProps } from '../../fragments/TextCounter'

export type TextareaSuffix = string | ReactNode

export type TextareaAlign = 'left' | 'center' | 'right' | 'justify'

export type TextareaAutoresizeMaxRows = string | number

export type TextareaRows = number | string

export type TextareaCols = number | string

export type TextareaElement =
  | ((
      params: TextareaHTMLAttributes<HTMLTextAreaElement>,
      ref: RefObject<HTMLTextAreaElement | null>
    ) => ReactNode)
  | ReactNode

export type TextareaChildren = ReactNode | (() => ReactNode)

export type TextareaSize = 'small' | 'medium' | 'large'

export type TextareaEvent<E = SyntheticEvent<HTMLTextAreaElement>> = {
  value: string
  event: E
}

export type TextareaChangeEvent = TextareaEvent<
  ChangeEvent<HTMLTextAreaElement>
> & {
  rows: number
}

export type TextareaKeyDownEvent = TextareaEvent<
  KeyboardEvent<HTMLTextAreaElement>
> & {
  rows: number
}

export type TextareaProps = Omit<
  HTMLProps<HTMLElement>,
  | 'children'
  | 'label'
  | 'size'
  | 'cols'
  | 'rows'
  | 'placeholder'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
> &
  SpacingProps &
  FormStatusBaseProps & {
    /**
     * The content value of the Textarea.
     */
    value?: string
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
     * The sizes you can choose for 1 row are `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.
     */
    size?: TextareaSize
    /**
     * To control the visual focus state as a property, like `focus` or `blur`.
     */
    textareaState?: string
    /**
     * Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.
     */
    suffix?: TextareaSuffix
    /**
     * The placeholder which shows up once the Textarea value is empty.
     */
    placeholder?: ReactNode
    /**
     * Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.
     */
    keepPlaceholder?: boolean
    /**
     * Defines the `text-align` of the Textarea. Can be `left`, `center`, `right`, or `justify`. Defaults to `left`.
     */
    align?: TextareaAlign
    /**
     * If set to `true`, then the Textarea field will be 100% in `width`.
     */
    stretch?: boolean
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.
     */
    autoResize?: boolean
    /**
     * Use `true` to hide the resize handle and prevent users from manually resizing the Textarea. Defaults to `false`.
     */
    hideResizeHandle?: boolean
    /**
     * Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.
     */
    characterCounter?: Omit<TextCounterProps, 'text'> | number
    /**
     * Set a number to define how many rows the Textarea can auto grow.
     */
    autoResizeMaxRows?: TextareaAutoresizeMaxRows
    textareaClassName?: string
    readOnly?: boolean
    rows?: TextareaRows
    cols?: TextareaCols
    className?: string
    textareaElement?: TextareaElement
    children?: TextareaChildren
    onChange?: (event: TextareaChangeEvent) => void
    onFocus?: (
      event: TextareaEvent<FocusEvent<HTMLTextAreaElement>>
    ) => void
    onBlur?: (
      event: TextareaEvent<FocusEvent<HTMLTextAreaElement>>
    ) => void
    onKeyDown?: (event: TextareaKeyDownEvent) => void
    /**
     * Locale to use for text counter. Inherited from context if not set.
     */
    locale?: InternalLocale
    /**
     * By providing a `React.Ref` we can get the internally used Textarea element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.
     */
    ref?: Ref<HTMLTextAreaElement> | null
  }
