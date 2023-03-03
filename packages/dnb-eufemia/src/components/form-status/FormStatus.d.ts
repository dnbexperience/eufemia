import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
export type FormStatusText =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormStatusIcon =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type FormStatusState =
  | boolean
  | string
  | 'error'
  | 'warn'
  | 'info'
  | 'marketing';
export type FormStatusVariant = 'flat' | 'outlined';
export type FormStatusSize = 'default' | 'large';
export type FormStatusAttributes = string | Record<string, unknown>;
export type FormStatusSpace =
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
export type FormStatusTop = string | number | boolean;
export type FormStatusRight = string | number | boolean;
export type FormStatusBottom = string | number | boolean;
export type FormStatusLeft = string | number | boolean;
export type FormStatusChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface FormStatusProps extends React.HTMLProps<HTMLElement> {
  id?: string;

  /**
   * The `title` attribute in the status.
   */
  title?: string;

  /**
   * Provide `false` if you want to animate the visibility. Defaults to `true`.
   */
  show?: boolean;

  /**
   * The `text` appears as the status message. Beside plain text, You can send in a React component as well.
   */
  text?: FormStatusText;
  label?: React.ReactNode;

  /**
   * The `icon` show before the status text. Defaults to `exclamation`.
   */
  icon?: FormStatusIcon;

  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  icon_size?: string;

  /**
   * Defines the visual appearance of the status. These are the statuses `error`, `warn`, `info` and `marketing`. The default status is `error`.
   */
  state?: FormStatusState;

  /**
   * As of now, there is the `flat` and the `outlined` variant. Defaults to `flat`.
   */
  variant?: FormStatusVariant;

  /**
   * Defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.
   */
  size?: FormStatusSize;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;
  attributes?: FormStatusAttributes;
  text_id?: string;
  width_selector?: string;
  width_element?: Record<string, unknown>;
  class?: string;

  /**
   * NB: Animation is disabled as of now. <del>use `true` to omit the animation on content visibility. Defaults to `false`.</del>
   */
  no_animation?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * If set to `true`, then the FormStatus will be 100% in available `width`. "NB:" Only use this on independent status messages.
   */
  stretch?: boolean;

  /**
   * The `role` attribute for accessibility, defaults to `alert`
   */
  role?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: FormStatusSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: FormStatusTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: FormStatusRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: FormStatusBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: FormStatusLeft;
  className?: string;

  /**
   * The `text` appears as the status message. Beside plain text, You can send in a React component as well.
   */
  children?: FormStatusChildren;
}
export default class FormStatus extends React.Component<
  FormStatusProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}

export interface ErrorIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export const ErrorIcon: React.FC<ErrorIconProps>;

export interface WarnIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export const WarnIcon: React.FC<WarnIconProps>;

export interface InfoIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export const InfoIcon: React.FC<InfoIconProps>;

export interface MarketingIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export const MarketingIcon: React.FC<MarketingIconProps>;
