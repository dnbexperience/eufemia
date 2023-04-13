import * as React from 'react';
import type { ButtonIconPosition } from '../button';
import type { HeadingLevel } from '../Heading';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import AccordionContent from './AccordionContent';
import AccordionHeader from './AccordionHeader';
import AccordionGroup from './AccordionGroup';
import { Store } from './AccordionStore';
export type AccordionVariant = 'plain' | 'default' | 'outlined' | 'filled';
export type AccordionHeading = boolean | React.ReactNode;
export type AccordionIcon =
  | IconIcon
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);

      /**
       * If set to `true` the accordion will be expanded as its initial state.
       */
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
export type AccordionAttributes = string | Record<string, unknown>;
export interface AccordionProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * A title as a string or React element. It will be used as the button text.
   */
  title?: React.ReactNode;
  description?: React.ReactNode;

  /**
   * If set to `true` the accordion will be expanded as its initial state.
   */
  expanded?: boolean;

  /**
   * If set to `true`, the open and close animation will be omitted.
   */
  no_animation?: boolean;

  /**
   * If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that&#39;s mainly a technical aspect to consider.
   */
  expanded_ssr?: boolean;

  /**
   * If set to `true` the content will be present, even the accordion is not expanded. Can be useful for assistive technology or SEO.
   */
  prerender?: boolean;

  /**
   * If set to `true` the accordion component will not re-render its content – can be useful for widgets you don&#39;t have control of storing the temporary state during an interaction.
   */
  prevent_rerender?: boolean;

  /**
   * Use this prop together with `prevent_rerender` – and if it is to `true`, the accordion component will re-render if the children are a new React element and does not match the previous one anymore.
   */
  prevent_rerender_conditional?: boolean;

  /**
   * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the sate in the local storage.
   */
  remember_state?: boolean;

  /**
   * Send along a custom React Ref for `.dnb-accordion__content`.
   */
  contentRef?: Record<string, unknown>;

  /**
   * If set to `true`, the saved (remembered) will be removed and the initial component state will be used and set.
   */
  flush_remembered_state?: boolean;

  /**
   * If set to `true`, a group of accordions will be wrapped to sidebar looking menu for medium and larger screens.
   */
  single_container?: boolean;

  /**
   * Defines the used styling. As of now, only `outlined` is available. Use `plain` for no styles. It defaults to `outlined`.
   */
  variant?: AccordionVariant;

  /**
   * Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.
   */
  left_component?: React.ReactNode;

  /**
   * If set to `true`, the accordion button will be disabled (dimmed).
   */
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * A unique `id` that will be used on the button element. If you use `remember_state`, an id is required.
   */
  id?: string;
  group?: string;

  /**
   * Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.
   */
  element?: React.ReactNode;

  /**
   * If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `heading_level` property.
   */
  heading?: AccordionHeading;

  /**
   * If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.
   */
  heading_level?: HeadingLevel;

  /**
   * Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.
   */
  icon?: AccordionIcon;

  /**
   * Will set the placement of the icon. Defaults to `left`.
   */
  icon_position?: ButtonIconPosition;

  /**
   * Define a different icon size. Defaults to `medium` (1.5rem).
   */
  icon_size?: IconSize;
  attributes?: AccordionAttributes;
  class?: string;
  className?: string;
  children?: React.ReactNode;

  /**
   * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}

const StoreInstance = (group: string, id?: string) => new Store(group, id);

export default class Accordion extends React.Component<
  AccordionProps,
  any
> {
  static defaultProps: object;
  static Content = AccordionContent;
  static Header = AccordionHeader;
  static Provider = AccordionGroup;
  static Group = Group;
  static Store = StoreInstance;
  render(): JSX.Element;
}
export type GroupProps = {
  allow_close_all?: boolean;
  expanded_id?: string;
} & AccordionProps;

declare class Group extends React.Component<GroupProps, any> {
  static defaultProps: object;
  static Store: StoreInstance;
  render(): JSX.Element;
}
