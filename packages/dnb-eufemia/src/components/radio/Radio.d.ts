import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import RadioGroup from './RadioGroup';
export type RadioLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioLabelPosition = 'left' | 'right';
export type RadioSize = 'default' | 'medium' | 'large';
export type RadioSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type RadioAttributes = string | Record<string, unknown>;
export type RadioChildren = string | ((...args: any[]) => any);
export interface RadioProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
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
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: RadioStatusNoAnimation;
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  suffix?: RadioSuffix;
  /**
   * <em>(required)</em> defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "RadioGroup".
   */
  value?: string;
  attributes?: RadioAttributes;
  skeleton?: SkeletonShow;
  readOnly?: boolean;
  className?: string;
  children?: RadioChildren;
  /**
   * Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
}
export default class Radio extends React.Component<RadioProps, any> {
  static defaultProps: object;
  static Group = RadioGroup;
  render(): JSX.Element;
}
