import * as React from 'react';
import ToggleButtonGroup from './ToggleButtonGroup';
export type ToggleButtonLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonLabelDirection = 'horizontal' | 'vertical';
export type ToggleButtonLabelSrOnly = string | boolean;
export type ToggleButtonChecked = string | boolean;
export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio';
export type ToggleButtonDisabled = string | boolean;
export type ToggleButtonSkeleton = string | boolean;
export type ToggleButtonStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonStatusNoAnimation = string | boolean;
export type ToggleButtonSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonValue =
  | string
  | number
  | Record<string, unknown>
  | any[];
export type ToggleButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type ToggleButtonIconPosition = 'left' | 'right';
export type ToggleButtonAttributes = string | Record<string, unknown>;
export type ToggleButtonReadOnly = string | boolean;
export type ToggleButtonSpace =
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
export type ToggleButtonTop = string | number | boolean;
export type ToggleButtonRight = string | number | boolean;
export type ToggleButtonBottom = string | number | boolean;
export type ToggleButtonLeft = string | number | boolean;
export type ToggleButtonChildren = string | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface ToggleButtonProps extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> the text shown in the ToggleButton.
   */
  text?: string;

  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: ToggleButtonLabel;
  label_direction?: ToggleButtonLabelDirection;
  label_sr_only?: ToggleButtonLabelSrOnly;

  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string;

  /**
   * Determine whether the ToggleButton is checked or not. The default will be `false`.
   */
  checked?: ToggleButtonChecked;
  variant?: ToggleButtonVariant;
  left_component?: React.ReactNode;
  disabled?: ToggleButtonDisabled;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: ToggleButtonSkeleton;
  id?: string;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: ToggleButtonStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: ToggleButtonStatusNoAnimation;

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
  icon?: ToggleButtonIcon;

  /**
   * Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.
   */
  icon_position?: ToggleButtonIconPosition;

  /**
   * Define icon width and height. Defaults to 16px
   */
  icon_size?: string;
  attributes?: ToggleButtonAttributes;
  readOnly?: ToggleButtonReadOnly;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: ToggleButtonSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: ToggleButtonTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: ToggleButtonRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: ToggleButtonBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: ToggleButtonLeft;
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
