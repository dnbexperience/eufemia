import * as React from 'react';
export type RadioGroupLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioGroupLabelDirection = 'horizontal' | 'vertical';
export type RadioGroupLabelSrOnly = string | boolean;
export type RadioGroupLabelPosition = 'left' | 'right';
export type RadioGroupNoFieldset = string | boolean;
export type RadioGroupDisabled = string | boolean;
export type RadioGroupSkeleton = string | boolean;
export type RadioGroupSize = 'default' | 'medium' | 'large';
export type RadioGroupStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioGroupStatusNoAnimation = string | boolean;
export type RadioGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioGroupLayoutDirection = 'column' | 'row';
export type RadioGroupVertical = string | boolean;
export type RadioGroupAttributes = string | Object;
export type RadioGroupSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type RadioGroupTop = string | number | boolean;
export type RadioGroupRight = string | number | boolean;
export type RadioGroupBottom = string | number | boolean;
export type RadioGroupLeft = string | number | boolean;
export type RadioGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface RadioGroupProps extends React.HTMLProps<HTMLElement> {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioGroupLabel;
  label_direction?: RadioGroupLabelDirection;
  label_sr_only?: RadioGroupLabelSrOnly;

  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: RadioGroupLabelPosition;
  title?: string;
  no_fieldset?: RadioGroupNoFieldset;
  disabled?: RadioGroupDisabled;
  skeleton?: RadioGroupSkeleton;
  id?: string;
  name?: string;

  /**
   * The size of the Radio button. For now there is "medium" (default) and "large".
   */
  size?: RadioGroupSize;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: RadioGroupStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Object;
  status_no_animation?: RadioGroupStatusNoAnimation;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;
  suffix?: RadioGroupSuffix;
  layout_direction?: RadioGroupLayoutDirection;
  vertical?: RadioGroupVertical;

  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "RadioGroup".
   */
  value?: string;
  attributes?: RadioGroupAttributes;
  space?: RadioGroupSpace;
  top?: RadioGroupTop;
  right?: RadioGroupRight;
  bottom?: RadioGroupBottom;
  left?: RadioGroupLeft;
  class?: string;
  className?: string;
  children?: RadioGroupChildren;

  /**
   * Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.
   */
  on_change?: (...args: any[]) => any;
}
export default class RadioGroup extends React.Component<
  RadioGroupProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
