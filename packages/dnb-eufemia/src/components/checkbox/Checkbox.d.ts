import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { FormLabelText } from '../FormLabel';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxSize = 'default' | 'medium' | 'large';
export type CheckboxSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type CheckboxAttributes = string | Record<string, unknown>;
export type CheckboxChildren = string | ((...args: any[]) => any);
export interface CheckboxProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: FormLabelText;
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
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  /**
   * The size of the checkbox. For now there is "medium" (default) and "large".
   */
  size?: CheckboxSize;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties. See [FormStatus](/uilib/components/form-status/properties/)
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status)
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.
   */
  suffix?: CheckboxSuffix;
  value?: string;
  attributes?: CheckboxAttributes;
  readOnly?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  class?: string;
  className?: string;
  children?: CheckboxChildren;
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
}
export default class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
export interface CheckIconProps {
  /**
   * The size of the checkbox. For now there is "medium" (default) and "large".
   */
  size?: string;
}
export declare const CheckIcon: React.FC<CheckIconProps>;
