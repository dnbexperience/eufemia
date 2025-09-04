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
  /**
   * To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * The `title` of group, describing it a bit further for accessibility reasons.
   */
  title?: string;
  /**
   * Defines if the ToggleButton's should act as a multi-selectable list of toggle buttons. Defaults to `false`.
   */
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
   * Uses the `form-status` component to show failure messages.
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
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
   */
  suffix?: ToggleButtonGroupSuffix;
  /**
   * Will force both `direction` and `label_direction` to be **vertical** if set to `true`.
   */
  vertical?: boolean;
  /**
   * Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.
   */
  layout_direction?: ToggleButtonGroupLayoutDirection;
  /**
   * Defines the pre-selected ToggleButton button. The value has to match the one provided in the ToggleButton button. Use a string value.
   */
  value?: ToggleButtonGroupValue;
  /**
   * Defines the pre-selected ToggleButton buttons in `multiselect` mode. The values have to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string.
   */
  values?: ToggleButtonGroupValues;
  attributes?: ToggleButtonGroupAttributes;
  className?: string;
  size?: ButtonSize | number;
  children?: ToggleButtonGroupChildren;
  on_change?: (...args: any[]) => any;
}
export default class ToggleButtonGroup extends React.Component<
  ToggleButtonGroupProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
