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
   * The main ID. Defaults to `main`.
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
   * The main ID. Defaults to `main`.
   */
  id?: string;
  status_id?: string;
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: GlobalStatusTitle;
  default_title?: string;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: GlobalStatusText;
  /**
   * The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See "Item Object" example below.
   */
  items?: GlobalStatusItem[];
  /**
   * The icon shown before the status title. Defaults to `exclamation`.
   */
  icon?: IconIcon;
  /**
   * The icon size of the title icon shows. Defaults to `medium`.
   */
  icon_size?: IconSize;
  /**
   * Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `info` and `success`. The default status is `error`.
   */
  state?: GlobalStatusState;
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: GlobalStatusShow;
  /**
   * Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.
   */
  autoscroll?: boolean;
  /**
   * Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.
   */
  autoclose?: boolean;
  /**
   * Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.
   */
  no_animation?: boolean;
  /**
   * Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.
   */
  delay?: GlobalStatusDelay;
  /**
   * Text of the close button. Defaults to `Lukk`.
   */
  close_text?: React.ReactNode;
  /**
   * Set to `true` if the close button should be hidden for the user. Defaults to `false`.
   */
  hide_close_button?: boolean;
  /**
   * Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omit_set_focus_on_update` which is set to `true` by default.
   */
  omit_set_focus?: boolean;
  omit_set_focus_on_update?: boolean;
  /**
   * Defines the anchor text showing up after every item, in case there is a `status_id` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.
   */
  status_anchor_text?: React.ReactNode;
  skeleton?: SkeletonShow;
  className?: string;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  children?: GlobalStatusChildren;
  /**
   * Gets triggered once the GlobalStatus is getting new content by the user. Returns `{ id, status_id, ...properties }`.
   */
  on_adjust?: (...args: any[]) => any;
  /**
   * Gets triggered the first time the GlobalStatus appears on the screen. In other words, it has to have been hidden before. Returns `{ id, status_id, ...properties }`.
   */
  on_open?: (...args: any[]) => any;
  /**
   * Gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ id, status_id, ...properties }`.
   */
  on_show?: (...args: any[]) => any;
  /**
   * Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.
   */
  on_close?: (...args: any[]) => any;
  /**
   * Gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ id, status_id, ...properties }`.
   */
  on_hide?: (...args: any[]) => any;
}
export type GlobalStatusStatusId = string;
export type GlobalStatusAddProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string;
  status_id: GlobalStatusStatusId;
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
  item?: GlobalStatusItem;
  /**
   * The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See "Item Object" example below.
   */
  items?: GlobalStatusItem[];
  /**
   * Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.
   */
  on_close: ({ status_id }: { status_id: GlobalStatusStatusId }) => void;
};
export type GlobalStatusUpdateProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
};
export type GlobalStatusRemoveProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string;
  status_id: GlobalStatusStatusId;
  buffer_delay?: number;
};
export type GlobalStatusInterceptorProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string;
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title: string;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string;
  status_id: GlobalStatusStatusId;
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show: boolean;
  item?: GlobalStatusItem;
};
export type GlobalStatusInterceptorUpdateEvents = {
  /**
   * Gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ id, status_id, ...properties }`.
   */
  on_show?: () => void;
  /**
   * Gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ id, status_id, ...properties }`.
   */
  on_hide?: () => void;
  /**
   * Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.
   */
  on_close?: () => void;
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean;
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
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
