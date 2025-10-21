import * as React from 'react';
import type { FormStatusText } from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type GlobalStatusTitle = React.ReactNode | boolean;
export type GlobalStatusText =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type GlobalStatusItem = string | ((...args: any[]) => any) | any;
export type GlobalStatusState = 'error' | 'info' | 'warning' | 'success';
export type GlobalStatusShow = 'auto' | any | any | 'true' | 'false';
export type GlobalStatusDelay = string | number;
export type GlobalStatusConfigObject = {
  /**
   * the main ID. Defaults to `main`.
   */
  id?: string;
  message?: FormStatusText;
};
export type GlobalStatusChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export interface GlobalStatusProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * the main ID. Defaults to `main`.
   */
  id?: string;
  statusId?: string;
  /**
   * the title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: GlobalStatusTitle;
  default_title?: string;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: GlobalStatusText;
  /**
   * the items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[];
  /**
   * the icon shown before the status title. Defaults to `exclamation`.
   */
  icon?: IconIcon;
  /**
   * the icon size of the title icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize;
  /**
   * defines the visual appearance of the status. There are four main statuses `error`, `warning`, `info` and `success`. The default status is `error`.
   */
  state?: GlobalStatusState;
  /**
   * set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: GlobalStatusShow;
  /**
   * set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.
   */
  autoscroll?: boolean;
  /**
   * set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.
   */
  autoclose?: boolean;
  /**
   * set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.
   */
  noAnimation?: boolean;
  /**
   * defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.
   */
  delay?: GlobalStatusDelay;
  /**
   * text of the close button. Defaults to `Lukk`.
   */
  closeText?: React.ReactNode;
  /**
   * set to `true` if the close button should be hidden for the user. Defaults to `false`.
   */
  hideCloseButton?: boolean;
  /**
   * set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omitSetFocusOnUpdate` which is set to `true` by default.
   */
  omitSetFocus?: boolean;
  /**
   * set to `true` to omit setting the focus during update. Defaults to `true`.
   */
  omitSetFocusOnUpdate?: boolean;
  /**
   * defines the anchor text showing up after every item, in case there is a `statusId` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.
   */
  statusAnchorText?: React.ReactNode;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  className?: string;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  children?: GlobalStatusChildren;
  on_adjust?: (...args: any[]) => any;
  on_open?: (...args: any[]) => any;
  on_show?: (...args: any[]) => any;
  on_close?: (...args: any[]) => any;
  on_hide?: (...args: any[]) => any;
}
export type GlobalStatusStatusId = string;
export type GlobalStatusAddProps = {
  /**
   * the main ID. Defaults to `main`.
   */
  id: string;
  statusId: GlobalStatusStatusId;
  /**
   * the title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
  item?: GlobalStatusItem;
  /**
   * the items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[];
  on_close: ({ statusId }: { statusId: GlobalStatusStatusId }) => void;
};
export type GlobalStatusUpdateProps = {
  /**
   * the main ID. Defaults to `main`.
   */
  id: string;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
};
export type GlobalStatusRemoveProps = {
  /**
   * the main ID. Defaults to `main`.
   */
  id: string;
  statusId: GlobalStatusStatusId;
  buffer_delay?: number;
};
export type GlobalStatusInterceptorProps = {
  /**
   * the main ID. Defaults to `main`.
   */
  id: string;
  /**
   * the title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title: string;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
  statusId: GlobalStatusStatusId;
  /**
   * set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show: boolean;
  item?: GlobalStatusItem;
};
export type GlobalStatusInterceptorUpdateEvents = {
  on_show?: () => void;
  on_hide?: () => void;
  on_close?: () => void;
  /**
   * set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean;
  /**
   * the text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string;
};
export type GlobalStatusInterceptor = {
  add: (props: GlobalStatusInterceptorUpdateEvents) => void;
  update: (props: GlobalStatusInterceptorUpdateEvents) => void;
  remove: () => void;
};
export default class GlobalStatus extends React.Component<
  GlobalStatusProps,
  any
> {
  static defaultProps: object;
  static create: (
    props: GlobalStatusInterceptorProps
  ) => GlobalStatusInterceptor;
  static Add: (props: GlobalStatusAddProps) => JSX.Element;
  static Update: (
    props: GlobalStatusUpdateProps
  ) => JSX.Element & GlobalStatusInterceptor;
  static Remove: (props: GlobalStatusRemoveProps) => JSX.Element;
  render(): JSX.Element;
}
