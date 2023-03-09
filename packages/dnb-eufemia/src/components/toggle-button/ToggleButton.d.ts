import * as React from 'react';
import type { ButtonIconPosition } from '../button';
import {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { IconPrimaryIcon, IconPrimarySize } from '../IconPrimary';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import ToggleButtonGroup from './ToggleButtonGroup';
export type ToggleButtonLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonLabelDirection = 'horizontal' | 'vertical';
export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio';
export type ToggleButtonSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonValue =
  | string
  | number
  | Record<string, unknown>
  | any[];
export type ToggleButtonAttributes = string | Record<string, unknown>;
export type ToggleButtonChildren = string | ((...args: any[]) => any);

export interface ToggleButtonProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * <em>(required)</em> the text shown in the ToggleButton.
   */
  text?: string;

  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: ToggleButtonLabel;
  label_direction?: ToggleButtonLabelDirection;
  label_sr_only?: boolean;

  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string;

  /**
   * Determine whether the ToggleButton is checked or not. The default will be `false`.
   */
  checked?: boolean;
  variant?: ToggleButtonVariant;
  left_component?: React.ReactNode;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  id?: string;

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
  status_props?: FormStatusProps;
  status_no_animation?: boolean;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.
   */
  suffix?: ToggleButtonSuffix;

  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "ToggleButtonGroup".
   */
  value?: ToggleButtonValue;

  /**
   * Icon to be included in the toggle button.
   */
  icon?: IconPrimaryIcon;

  /**
   * Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.
   */
  icon_position?: ButtonIconPosition;

  /**
   * Define icon width and height. Defaults to 16px
   */
  icon_size?: IconPrimarySize;
  attributes?: ToggleButtonAttributes;
  readOnly?: boolean;

  class?: string;
  className?: string;
  children?: ToggleButtonChildren;

  /**
   * Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class ToggleButton extends React.Component<
  ToggleButtonProps,
  any
> {
  static defaultProps: object;
  static Group = ToggleButtonGroup;
  render(): JSX.Element;
}
