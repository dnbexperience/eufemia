import * as React from 'react';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceTypeAll } from '../space/types';
export type FormStatusText =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
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
   * the `title` attribute in the status.
   */
  title?: string;
  label?: React.ReactNode;
  /**
   * provide `false` if you want to animate the visibility. Defaults to `true`.
   */
  show?: boolean;
  /**
   * the `text` appears as the status message. Beside plain text, you can send in a React component as well.
   */
  text?: FormStatusText;
  /**
   * the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * the `icon` show before the status text. Defaults to `exclamation`.
   */
  icon?: IconIcon;
  /**
   * the icon size of the icon shows. Defaults to `medium`.
   */
  icon_size?: IconSize;
  /**
   * defines the visual appearance of the status. These are the statuses `error`, `warn`, `info` and `marketing`. The default status is `error`.
   */
  state?: FormStatusState;
  /**
   * as of now, there is the `flat` and the `outlined` variant. Defaults to `flat`.
   */
  variant?: FormStatusVariant;
  /**
   * defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.
   */
  size?: FormStatusSize;
  attributes?: FormStatusAttributes;
  text_id?: string;
  width_selector?: string;
  width_element?: Record<string, unknown>;
  /**
   * NB: Animation is disabled as of now. ~~use `true` to omit the animation on content visibility. Defaults to `false`.~~
   */
  no_animation?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * if set to `true`, then the FormStatus will be 100% in available `width`. **NB:** Only use this on independent status messages.
   */
  stretch?: boolean;
  /**
   * the `role` attribute for accessibility, defaults to `alert`.
   */
  role?: string;
  /**
   * Use it to set an inner margin. It supports the same properties as [Space](/uilib/layout/space/properties). Useful for animation.
   */
  shellSpace?: SpaceTypeAll;
  className?: string;
  /**
   * the `text` appears as the status message. Beside plain text, you can send in a React component as well.
   */
  children?: FormStatusChildren;
}
export default class FormStatus extends React.Component<
  FormStatusProps,
  unknown
> {
  static defaultProps: Partial<FormStatusProps>;
  render(): JSX.Element;
}
export interface ErrorIconProps {
  /**
   * the `title` attribute in the status.
   */
  title?: string;
}
export declare const ErrorIcon: React.FC<ErrorIconProps>;
export interface WarnIconProps {
  /**
   * the `title` attribute in the status.
   */
  title?: string;
}
export declare const WarnIcon: React.FC<WarnIconProps>;
export interface InfoIconProps {
  /**
   * the `title` attribute in the status.
   */
  title?: string;
}
export declare const InfoIcon: React.FC<InfoIconProps>;
export interface MarketingIconProps {
  /**
   * the `title` attribute in the status.
   */
  title?: string;
}
export declare const MarketingIcon: React.FC<MarketingIconProps>;
export type FormStatusIconTypes =
  | typeof ErrorIcon
  | typeof WarnIcon
  | typeof InfoIcon
  | typeof MarketingIcon;
