import * as React from 'react';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceTypeAll } from '../space/types';
export type FormStatusText = React.ReactNode;
export type FormStatusState =
  | boolean
  | string
  | 'error'
  | 'warn'
  | 'info'
  | 'success'
  | 'marketing';
export type FormStatusVariant = 'flat' | 'outlined';
export type FormStatusSize = 'default' | 'large';
export type FormStatusAttributes = string | Record<string, unknown>;
export type FormStatusChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface FormStatusProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'ref' | 'label ' | 'value' | 'onFocus' | 'onBlur'
    >,
    SpacingProps {
  id?: string;
  /**
   * The `title` attribute in the status.
   */
  title?: string;
  label?: React.ReactNode;
  /**
   * Provide `false` if you want to animate the visibility. Defaults to `true`.
   */
  show?: boolean;
  /**
   * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
   */
  text?: FormStatusText;
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * The `icon` show before the status text. Defaults to `exclamation`.
   */
  icon?: IconIcon;
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  icon_size?: IconSize;
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
  attributes?: FormStatusAttributes;
  text_id?: string;
  width_selector?: string;
  width_element?: Record<string, unknown>;
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
   * Use it to set an inner margin. It supports the same properties as `space`. Useful for animation.
   */
  shellSpace?: SpaceTypeAll;
  className?: string;
  /**
   * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
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
export declare const ErrorIcon: React.FC<ErrorIconProps>;
export interface WarnIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export declare const WarnIcon: React.FC<WarnIconProps>;
export interface InfoIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export declare const InfoIcon: React.FC<InfoIconProps>;
export interface MarketingIconProps {
  /**
   * The `title` attribute in the status.
   */
  title?: string;
}
export declare const MarketingIcon: React.FC<MarketingIconProps>;
export type FormStatusIconTypes =
  | typeof ErrorIcon
  | typeof WarnIcon
  | typeof InfoIcon
  | typeof MarketingIcon;
