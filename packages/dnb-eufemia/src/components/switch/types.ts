/**
 * Types for Switch
 *
 */

import type {
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react'
import type { FormStatusBaseProps } from '../form-status/FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'

export type SwitchLabelPosition = 'left' | 'right'

export type SwitchSize = 'default' | 'medium' | 'large'

export type SwitchAttributes = string | Record<string, unknown>

export type SwitchOnChangeParams = {
  checked: boolean
  event: MouseEvent | TouchEvent | KeyboardEvent
}

export type SwitchOnClickParams = MouseEvent<HTMLInputElement> & {
  checked: boolean
  event: MouseEvent<HTMLInputElement>
}

export type SwitchOnChange = (args: SwitchOnChangeParams) => void

export type SwitchProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: ReactNode
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: SwitchLabelPosition
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the switch is checked or not. The default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  /**
   * The size of the switch. For now there are `medium` (default) and `large`.
   */
  size?: SwitchSize
  /**
   * Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.
   */
  suffix?: ReactNode
  value?: string
  attributes?: SwitchAttributes
  readOnly?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  className?: string
  children?: ReactNode
  /**
   * Will be called on state changes made by the user.
   */
  onChange?: SwitchOnChange
  /**
   * Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.
   */
  /**
   * Will be called on click.
   */
  onClick?: (args: SwitchOnClickParams) => void
  onChangeEnd?: SwitchOnChange
  /**
   * By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.
   */
  ref?: RefObject<HTMLInputElement> | ((elem: HTMLInputElement) => void)
} & FormStatusBaseProps &
  Omit<
    HTMLProps<HTMLElement>,
    'ref' | 'size' | 'onChange' | 'onClick' | 'label'
  > &
  SpacingProps
