import * as React from 'react';
import { SkeletonShow } from '../Skeleton';
export type AccordionHeaderTitleSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionHeaderTitleTop = string | number | boolean;
export type AccordionHeaderTitleRight = string | number | boolean;
export type AccordionHeaderTitleBottom = string | number | boolean;
export type AccordionHeaderTitleLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionHeaderTitleProps {
  space?: AccordionHeaderTitleSpace;
  top?: AccordionHeaderTitleTop;
  right?: AccordionHeaderTitleRight;
  bottom?: AccordionHeaderTitleBottom;
  left?: AccordionHeaderTitleLeft;
  children?: React.ReactNode;
}
declare const AccordionHeaderTitle: React.FC<AccordionHeaderTitleProps>;
export type AccordionHeaderDescriptionSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionHeaderDescriptionTop = string | number | boolean;
export type AccordionHeaderDescriptionRight = string | number | boolean;
export type AccordionHeaderDescriptionBottom = string | number | boolean;
export type AccordionHeaderDescriptionLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionHeaderDescriptionProps {
  space?: AccordionHeaderDescriptionSpace;
  top?: AccordionHeaderDescriptionTop;
  right?: AccordionHeaderDescriptionRight;
  bottom?: AccordionHeaderDescriptionBottom;
  left?: AccordionHeaderDescriptionLeft;
  children?: React.ReactNode;
}
declare const AccordionHeaderDescription: React.FC<AccordionHeaderDescriptionProps>;
export type AccordionHeaderContainerSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionHeaderContainerTop = string | number | boolean;
export type AccordionHeaderContainerRight = string | number | boolean;
export type AccordionHeaderContainerBottom = string | number | boolean;
export type AccordionHeaderContainerLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionHeaderContainerProps {
  space?: AccordionHeaderContainerSpace;
  top?: AccordionHeaderContainerTop;
  right?: AccordionHeaderContainerRight;
  bottom?: AccordionHeaderContainerBottom;
  left?: AccordionHeaderContainerLeft;
  children?: React.ReactNode;
}
declare const AccordionHeaderContainer: React.FC<AccordionHeaderContainerProps>;
export type AccordionHeaderIconIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionHeaderIconProps {
  icon?: AccordionHeaderIconIcon;
  size?: string;
  expanded?: boolean;
}
declare const AccordionHeaderIcon: React.FC<AccordionHeaderIconProps>;
export type AccordionHeaderTitle =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionHeaderDescription =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionHeaderLeftComponent =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionHeaderElement =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionHeaderHeading =
  | boolean
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AccordionHeaderHeadingLevel = string | number;
export type AccordionHeaderIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
export type AccordionHeaderIconPosition = 'left' | 'right';
export type AccordionHeaderSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionHeaderTop = string | number | boolean;
export type AccordionHeaderRight = string | number | boolean;
export type AccordionHeaderBottom = string | number | boolean;
export type AccordionHeaderLeft = string | number | boolean;
export type AccordionHeaderChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AccordionHeaderProps
  extends React.HTMLProps<HTMLElement> {
  title?: AccordionHeaderTitle;
  description?: AccordionHeaderDescription;
  left_component?: AccordionHeaderLeftComponent;
  element?: AccordionHeaderElement;
  heading?: AccordionHeaderHeading;
  heading_level?: AccordionHeaderHeadingLevel;
  icon?: AccordionHeaderIcon;
  icon_position?: AccordionHeaderIconPosition;
  icon_size?: string;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  no_animation?: boolean;
  space?: AccordionHeaderSpace;
  top?: AccordionHeaderTop;
  right?: AccordionHeaderRight;
  bottom?: AccordionHeaderBottom;
  left?: AccordionHeaderLeft;
  className?: string;
  children?: AccordionHeaderChildren;
}
export default class AccordionHeader extends React.Component<
  AccordionHeaderProps,
  any
> {
  static defaultProps: object;
  static Container: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  static Title: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  static Description: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  render(): JSX.Element;
}
