import * as React from 'react';
import AccordionContent from './AccordionContent';
import AccordionHeader from './AccordionHeader';
import AccordionProvider from './AccordionProvider';
export type AccordionExpanded = string | boolean;
export type AccordionNoAnimation = string | boolean;
export type AccordionExpandedSsr = string | boolean;
export type AccordionPrerender = string | boolean;
export type AccordionPreventRerender = string | boolean;
export type AccordionPreventRerenderConditional = string | boolean;
export type AccordionRememberState = string | boolean;
export type AccordionFlushRememberedState = string | boolean;
export type AccordionSingleContainer = string | boolean;
export type AccordionVariant = 'plain' | 'default' | 'outlined' | 'filled';
export type AccordionAllowCloseAll = string | boolean;
export type AccordionDisabled = string | boolean;
export type AccordionSkeleton = string | boolean;
export type AccordionHeading = boolean | React.ReactNode;
export type AccordionHeadingLevel = string | number;
export type AccordionIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);

      /**
       * If set to `true` the accordion will be expanded as its initial state.
       */
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
export type AccordionClosed = React.ReactNode | ((...args: any[]) => any);
export type AccordionIconPosition = 'left' | 'right';
export type AccordionAttributes = string | Record<string, string>;
export type AccordionSpace =
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
export type AccordionTop = string | number | boolean;
export type AccordionRight = string | number | boolean;
export type AccordionBottom = string | number | boolean;
export type AccordionLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionProps extends React.HTMLProps<HTMLElement> {
  /**
   * A title as a string or React element. It will be used as the button text.
   */
  title?: React.ReactNode;

  /**
   * If set to `true` the accordion will be expanded as its initial state.
   */
  expanded?: AccordionExpanded;

  /**
   * If set to `true`, the open and close animation will be omitted.
   */
  no_animation?: AccordionNoAnimation;

  /**
   * If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that&#39;s mainly a technical aspect to consider.
   */
  expanded_ssr?: AccordionExpandedSsr;

  /**
   * If set to `true` the content will be present, even the accordion is not expanded. Can be useful for assistive technology or SEO.
   */
  prerender?: AccordionPrerender;

  /**
   * If set to `true` the accordion component will not re-render its content – can be useful for widgets you don&#39;t have control of storing the temporary state during an interaction.
   */
  prevent_rerender?: AccordionPreventRerender;

  /**
   * Use this prop together with `prevent_rerender` – and if it is to `true`, the accordion component will re-render if the children are a new React element and does not match anymore the previews one.
   */
  prevent_rerender_conditional?: AccordionPreventRerenderConditional;

  /**
   * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the sate in the local storage.
   */
  remember_state?: AccordionRememberState;

  /**
   * Send along a custom React Ref for `.dnb-accordion__content`.
   */
  contentRef?: Record<string, string>;

  /**
   * If set to `true`, the saved (remembered) will be removed and the initial component state will be used and set.
   */
  flush_remembered_state?: AccordionFlushRememberedState;

  /**
   * If set to `true`, a group of accordions will be wrapped to sidebar looking menu for medium and larger screens.
   */
  single_container?: AccordionSingleContainer;

  /**
   * Defines the used styling. As of now, only `outlined` is available. Use `plain` for no styles. It defaults to `outlined`.
   */
  variant?: AccordionVariant;

  /**
   * Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.
   */
  left_component?: React.ReactNode;
  allow_close_all?: AccordionAllowCloseAll;

  /**
   * If set to `true`, the accordion button will be disabled (dimmed).
   */
  disabled?: AccordionDisabled;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: AccordionSkeleton;

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
  heading_level?: AccordionHeadingLevel;

  /**
   * Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.
   */
  icon?: AccordionIcon;
  closed?: AccordionClosed;

  /**
   * Will set the placement of the icon. Defaults to `left`.
   */
  icon_position?: AccordionIconPosition;

  /**
   * Define a different icon size. Defaults to `medium` (1.5rem).
   */
  icon_size?: string;
  attributes?: AccordionAttributes;
  class?: string;
  className?: string;
  children?: React.ReactNode;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: AccordionSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: AccordionTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: AccordionRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: AccordionBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: AccordionLeft;

  /**
   * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Accordion extends React.Component<
  AccordionProps,
  any
> {
  static defaultProps: object;
  static Content = AccordionContent;
  static Header = AccordionHeader;
  static Provider = AccordionProvider;
  render(): JSX.Element;
}
export type GroupRememberState = string | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface GroupProps {
  /**
   * A unique `id` that will be used on the button element. If you use `remember_state`, an id is required.
   */
  id?: string;
  group?: string;

  /**
   * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the sate in the local storage.
   */
  remember_state?: GroupRememberState;
}

declare class Group extends React.Component<GroupProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
