import * as React from 'react';
import type { FormStatusState, FormStatusText } from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type SwitchLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SwitchLabelPosition = 'left' | 'right';
export type SwitchSize = 'default' | 'medium' | 'large';
export type SwitchSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SwitchAttributes = string | Record<string, unknown>;
export type SwitchChildren = string | ((...args: any[]) => any);
export interface SwitchProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: SwitchLabel;
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: SwitchLabelPosition;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * <em>(required)</em> the `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string;
  /**
   * Determine whether the switch is checked or not. The default will be `false`.
   */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  /**
   * The size of the switch. For now there is "medium" (default) and "large".
   */
  size?: SwitchSize;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  status_no_animation?: boolean;
  /**
   * Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.
   */
  suffix?: SwitchSuffix;
  value?: string;
  attributes?: SwitchAttributes;
  readOnly?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  class?: string;
  className?: string;
  children?: SwitchChildren;
  /**
   * Will be called on state changes made by the user. Returns a boolean `{ checked, event }`.
   */
  on_change?: (...args: any[]) => any;
  /**
   * Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.
   */
  on_change_end?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
}
export default class Switch extends React.Component<SwitchProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
