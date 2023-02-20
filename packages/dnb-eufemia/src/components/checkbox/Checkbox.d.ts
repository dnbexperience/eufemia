import * as React from 'react';
export type CheckboxLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxChecked = string | boolean;
export type CheckboxDisabled = string | boolean;
export type CheckboxSize = 'default' | 'medium' | 'large';
export type CheckboxStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type CheckboxStatusNoAnimation = string | boolean;
export type CheckboxSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type CheckboxAttributes = string | Record<string, string>;
export type CheckboxReadOnly = string | boolean;
export type CheckboxSkeleton = string | boolean;
export type CheckboxSpace =
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
export type CheckboxTop = string | number | boolean;
export type CheckboxRight = string | number | boolean;
export type CheckboxBottom = string | number | boolean;
export type CheckboxLeft = string | number | boolean;
export type CheckboxChildren = string | ((...args: any[]) => any);

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface CheckboxProps extends React.HTMLProps<HTMLElement> {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: CheckboxLabel;

  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: CheckboxLabelPosition;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;

  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string;
  element?: React.ReactNode;

  /**
   * Determine whether the checkbox is checked or not. The default is `false`.
   */
  checked?: CheckboxChecked;
  disabled?: CheckboxDisabled;
  id?: string;

  /**
   * The size of the checkbox. For now there is "medium" (default) and "large".
   */
  size?: CheckboxSize;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: CheckboxStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, string>;
  status_no_animation?: CheckboxStatusNoAnimation;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.
   */
  suffix?: CheckboxSuffix;
  value?: string;
  attributes?: CheckboxAttributes;
  readOnly?: CheckboxReadOnly;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: CheckboxSkeleton;
  class?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: CheckboxSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: CheckboxTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: CheckboxRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: CheckboxBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: CheckboxLeft;
  className?: string;
  children?: CheckboxChildren;

  /**
   * Will be called on state changes made by the user. Returns an boolean `{ checked, event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface CheckIconProps {
  /**
   * The size of the checkbox. For now there is "medium" (default) and "large".
   */
  size?: string;
}
export const CheckIcon: React.FC<CheckIconProps>;
