import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
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

export interface AccordionGroupProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
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
  SpacingProps,
  any
> {
  render(): JSX.Element;
}
