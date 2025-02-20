import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type RadioGroupLabelPosition = 'left' | 'right';
export type RadioGroupSize = 'default' | 'medium' | 'large';
export type RadioGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioGroupLayoutDirection = 'column' | 'row';
export type RadioGroupAttributes = string | Record<string, unknown>;
export type RadioGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface RadioGroupProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: RadioGroupLabelPosition;
  title?: string;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  id?: string;
  name?: string;
  /**
   * The size of the Radio button. For now there is "medium" (default) and "large".
   */
  size?: ButtonSize | number;
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
  suffix?: RadioGroupSuffix;
  layout_direction?: RadioGroupLayoutDirection;
  vertical?: boolean;
  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "RadioGroup".
   */
  value?: string;
  attributes?: RadioGroupAttributes;
  className?: string;
  children?: RadioGroupChildren;
  /**
   * Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.
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
