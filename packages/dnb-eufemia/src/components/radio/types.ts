/**
 * Types for Radio
 *
 */

import type {
  ChangeEvent,
  ElementType,
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  SyntheticEvent,
} from 'react'
import type { SkeletonShow } from '../Skeleton'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SpacingProps } from '../../shared/types'

export type RadioLabel = string | ReactNode

export type RadioLabelPosition = 'left' | 'right'

export type RadioSize = 'default' | 'medium' | 'large'

export type RadioSuffix = string | ReactNode

export type RadioChildren = string | ReactNode

export type RadioEvent<E = SyntheticEvent> = {
  group?: string
  checked: boolean
  value: string
  event: E
}

export type RadioChangeEvent = RadioEvent<
  | ChangeEvent<HTMLInputElement>
  | KeyboardEvent<HTMLInputElement>
  | MouseEvent<HTMLInputElement>
>

export type RadioProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioLabel
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: RadioLabelPosition
  /**
   * Determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  element?: ElementType
  /**
   * Use a unique group identifier to define the Radio buttons that belong together.
   */
  group?: string
  /**
   * The size of the Radio button. For now there are `medium` (default) and `large`.
   */
  size?: RadioSize
  suffix?: RadioSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **RadioGroup**.
   */
  value?: string
  skeleton?: SkeletonShow
  readOnly?: boolean
  className?: string
  children?: RadioChildren
  onChange?: (event: RadioChangeEvent) => void
  /**
   * By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.
   */
  ref?: Ref<HTMLInputElement>
} & Omit<
  HTMLProps<HTMLElement>,
  'ref' | 'onChange' | 'label' | 'size' | 'children'
> &
  SpacingProps &
  FormStatusBaseProps
