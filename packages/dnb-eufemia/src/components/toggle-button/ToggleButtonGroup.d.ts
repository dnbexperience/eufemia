import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { ButtonSize } from '../Button';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio';
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
export type ToggleButtonGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface ToggleButtonGroupProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
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
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
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
  className?: string;
  /**
   * The size of the toggle button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize;
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
