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
   * use either the `label` property or provide a custom one.
   */
  label?: RadioLabel;
  /**
   * use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean;
  /**
   * defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: RadioLabelPosition;
  /**
   * determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  element?: React.ReactNode;
  /**
   * use a unique group identifier to define the Radio buttons that belongs together.
   */
  group?: string;
  /**
   * the size of the Radio button. For now there is **medium** (default) and **large**.
   */
  size?: RadioSize;
  /**
   * text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState;
  /**
   * use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps;
  statusNoAnimation?: RadioStatusNoAnimation;
  /**
   * the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  suffix?: RadioSuffix;
  /**
   * defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **RadioGroup**.
   */
  value?: string;
  attributes?: RadioAttributes;
  skeleton?: SkeletonShow;
  readOnly?: boolean;
  className?: string;
  children?: RadioChildren;
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  /**
   * by providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
}
export default class Radio extends React.Component<RadioProps, any> {
  static defaultProps: object;
  static Group = RadioGroup;
  render(): JSX.Element;
}
