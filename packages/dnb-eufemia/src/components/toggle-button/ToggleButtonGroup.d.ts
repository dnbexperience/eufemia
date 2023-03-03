import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
export type ToggleButtonGroupLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonGroupLabelDirection = 'horizontal' | 'vertical';
export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio';
export type ToggleButtonGroupStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type ToggleButtonGroupLayoutDirection = 'column' | 'row';
export type ToggleButtonGroupValue =
  | string
  | number
  | Record<string, unknown>
  | any[];
export type ToggleButtonGroupValues = string | any[];
export type ToggleButtonGroupAttributes = string | Record<string, unknown>;
export type ToggleButtonGroupSpace =
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
export type ToggleButtonGroupTop = string | number | boolean;
export type ToggleButtonGroupRight = string | number | boolean;
export type ToggleButtonGroupBottom = string | number | boolean;
export type ToggleButtonGroupLeft = string | number | boolean;
export type ToggleButtonGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface ToggleButtonGroupProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: ToggleButtonGroupLabel;
  label_direction?: ToggleButtonGroupLabelDirection;
  label_sr_only?: boolean;

  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string;
  multiselect?: boolean;
  variant?: ToggleButtonGroupVariant;
  left_component?: React.ReactNode;
  no_fieldset?: boolean;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  id?: string;
  name?: string;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: ToggleButtonGroupStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: boolean;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.
   */
  suffix?: ToggleButtonGroupSuffix;
  vertical?: boolean;
  layout_direction?: ToggleButtonGroupLayoutDirection;

  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "ToggleButtonGroup".
   */
  value?: ToggleButtonGroupValue;

  /**
   * function values() { [native code] }
   */
  values?: ToggleButtonGroupValues;
  attributes?: ToggleButtonGroupAttributes;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: ToggleButtonGroupSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: ToggleButtonGroupTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: ToggleButtonGroupRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: ToggleButtonGroupBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: ToggleButtonGroupLeft;
  class?: string;
  className?: string;
  children?: ToggleButtonGroupChildren;

  /**
   * Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.
   */
  on_change?: (...args: any[]) => any;
}
export default class ToggleButtonGroup extends React.Component<
  ToggleButtonGroupProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
