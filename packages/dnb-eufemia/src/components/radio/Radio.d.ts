import * as React from 'react';
import { SkeletonShow } from '../Skeleton';
import RadioGroup from './RadioGroup';
export type RadioLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioLabelPosition = 'left' | 'right';
export type RadioSize = 'default' | 'medium' | 'large';
export type RadioStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioAttributes = string | Record<string, unknown>;
export type RadioSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type RadioTop = string | number | boolean;
export type RadioRight = string | number | boolean;
export type RadioBottom = string | number | boolean;
export type RadioLeft = string | number | boolean;
export type RadioChildren = string | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface RadioProps extends React.HTMLProps<HTMLElement> {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioLabel;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;

  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: RadioLabelPosition;

  /**
   * Determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  element?: React.ReactNode;

  /**
   * Use a unique group identifier to define the Radio buttons that belongs together.
   */
  group?: string;

  /**
   * The size of the Radio button. For now there is "medium" (default) and "large".
   */
  size?: RadioSize;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: RadioStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: RadioStatusNoAnimation;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;
  suffix?: RadioSuffix;

  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "RadioGroup".
   */
  value?: string;
  attributes?: RadioAttributes;
  skeleton?: SkeletonShow;
  readOnly?: boolean;
  space?: RadioSpace;
  top?: RadioTop;
  right?: RadioRight;
  bottom?: RadioBottom;
  left?: RadioLeft;
  class?: string;
  className?: string;
  children?: RadioChildren;

  /**
   * Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Radio extends React.Component<RadioProps, any> {
  static defaultProps: object;
  static Group = RadioGroup;
  render(): JSX.Element;
}
