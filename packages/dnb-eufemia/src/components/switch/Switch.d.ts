import * as React from 'react';
export type SwitchLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SwitchLabelPosition = 'left' | 'right';
export type SwitchSize = 'default' | 'medium' | 'large';
export type SwitchStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SwitchSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SwitchAttributes = string | Record<string, unknown>;
export type SwitchSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type SwitchTop = string | number | boolean;
export type SwitchRight = string | number | boolean;
export type SwitchBottom = string | number | boolean;
export type SwitchLeft = string | number | boolean;
export type SwitchChildren = string | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface SwitchProps extends React.HTMLProps<HTMLElement> {
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
  status?: SwitchStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;
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
  skeleton?: boolean;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: SwitchSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: SwitchTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: SwitchRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: SwitchBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: SwitchLeft;
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
}
export default class Switch extends React.Component<SwitchProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
