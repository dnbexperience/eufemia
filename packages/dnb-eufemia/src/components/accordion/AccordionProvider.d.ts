import * as React from 'react';
export type AccordionGroupExpanded = boolean;
export type AccordionGroupNoAnimation = boolean;
export type AccordionGroupExpandedSsr = boolean;
export type AccordionGroupPrerender = boolean;
export type AccordionGroupPreventRerender = boolean;
export type AccordionGroupPreventRerenderConditional = boolean;
export type AccordionGroupRememberState = boolean;
export type AccordionGroupFlushRememberedState = boolean;
export type AccordionGroupSingleContainer = boolean;
export type AccordionGroupVariant =
  | 'plain'
  | 'default'
  | 'outlined'
  | 'filled';
export type AccordionGroupAllowCloseAll = boolean;
export type AccordionGroupDisabled = boolean;
export type AccordionGroupSkeleton = boolean;
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
  expanded?: AccordionGroupExpanded;
  no_animation?: AccordionGroupNoAnimation;
  expanded_ssr?: AccordionGroupExpandedSsr;
  prerender?: AccordionGroupPrerender;
  prevent_rerender?: AccordionGroupPreventRerender;
  prevent_rerender_conditional?: AccordionGroupPreventRerenderConditional;
  remember_state?: AccordionGroupRememberState;
  contentRef?: Record<string, unknown>;
  flush_remembered_state?: AccordionGroupFlushRememberedState;
  single_container?: AccordionGroupSingleContainer;
  variant?: AccordionGroupVariant;
  left_component?: React.ReactNode;
  allow_close_all?: AccordionGroupAllowCloseAll;
  disabled?: AccordionGroupDisabled;
  skeleton?: AccordionGroupSkeleton;
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
