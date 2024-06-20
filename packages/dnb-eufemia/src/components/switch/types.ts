import * as React from 'react'
import type { FormStatusState, FormStatusText } from '../FormStatus'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

export type SwitchLabelPosition = 'left' | 'right'
export type SwitchSize = 'default' | 'medium' | 'large'
export type SwitchAttributes = string | Record<string, unknown>
export type SwitchOnChange = (args: {
  checked: boolean
  event: MouseEvent | TouchEvent | KeyboardEvent
}) => void

export type SwitchProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: SwitchLabelPosition
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * <em>(required)</em> the `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the switch is checked or not. The default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  /**
   * The size of the switch. For now there is "medium" (default) and "large".
   */
  size?: SwitchSize
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: Record<string, unknown>
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject
  statusNoAnimation?: boolean
  /**
   * Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.
   */
  suffix?: React.ReactNode
  value?: string
  attributes?: SwitchAttributes
  readOnly?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  className?: string
  children?: React.ReactNode
  /**
   * Will be called on state changes made by the user. Returns a boolean `{ checked, event }`.
   */
  onChange?: SwitchOnChange
  /**
   * Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.
   */
  onChangeEnd?: SwitchOnChange
  onStateUpdate?: SwitchOnChange
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((elem: HTMLInputElement) => void)
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'size' | 'onChange' | 'innerRef'
> &
  SpacingProps &
  DeprecatedSwitchProps

// deprecated, can be removed in v11
type DeprecatedSwitchProps = {
  /**  @deprecated use `labelPosition` */
  label_position?: SwitchLabelPosition
  /**  @deprecated use `labelSrOnly` */
  label_sr_only?: boolean
  /**  @deprecated use `statusState` */
  status_state?: FormStatusState
  /**  @deprecated use `statusProps` */
  status_props?: Record<string, unknown>
  /**  @deprecated use `onChange` */
  on_change?: SwitchOnChange
  /**  @deprecated use `onChangeEnd` */
  on_change_end?: SwitchOnChange
  /**  @deprecated use `onStateUpdate` */
  on_state_update?: SwitchOnChange
  /**  @deprecated use `statusNoAnimation` */
  status_no_animation?: boolean
}
