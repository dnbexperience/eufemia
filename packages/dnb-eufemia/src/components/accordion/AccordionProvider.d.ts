import * as React from 'react';
import { SkeletonShow } from '../Skeleton';
export type AccordionGroupVariant =
  | 'plain'
  | 'default'
  | 'outlined'
  | 'filled';
export type AccordionGroupHeading = boolean | React.ReactNode;
export type AccordionGroupHeadingLevel = string | number;
export type AccordionGroupIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
export type AccordionGroupClosed =
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionGroupIconPosition = 'left' | 'right';
export type AccordionGroupAttributes = string | Record<string, unknown>;
export type AccordionGroupSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionGroupTop = string | number | boolean;
export type AccordionGroupRight = string | number | boolean;
export type AccordionGroupBottom = string | number | boolean;
export type AccordionGroupLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionGroupProps extends React.HTMLProps<HTMLElement> {
  title?: React.ReactNode;
  expanded?: boolean;
  no_animation?: boolean;
  expanded_ssr?: boolean;
  prerender?: boolean;
  prevent_rerender?: boolean;
  prevent_rerender_conditional?: boolean;
  remember_state?: boolean;
  contentRef?: Record<string, unknown>;
  flush_remembered_state?: boolean;
  single_container?: boolean;
  variant?: AccordionGroupVariant;
  left_component?: React.ReactNode;
  allow_close_all?: boolean;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  id?: string;
  group?: string;
  element?: React.ReactNode;
  heading?: AccordionGroupHeading;
  heading_level?: AccordionGroupHeadingLevel;
  icon?: AccordionGroupIcon;
  closed?: AccordionGroupClosed;
  icon_position?: AccordionGroupIconPosition;
  icon_size?: string;
  attributes?: AccordionGroupAttributes;
  class?: string;
  className?: string;
  children?: React.ReactNode;
  space?: AccordionGroupSpace;
  top?: AccordionGroupTop;
  right?: AccordionGroupRight;
  bottom?: AccordionGroupBottom;
  left?: AccordionGroupLeft;

  /**
   * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.
   */
  on_change?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  expanded_id?: string;
  onInit?: (...args: any[]) => any;
}
export default class AccordionGroup extends React.Component<
  AccordionGroupProps,
  any
> {
  render(): JSX.Element;
}
