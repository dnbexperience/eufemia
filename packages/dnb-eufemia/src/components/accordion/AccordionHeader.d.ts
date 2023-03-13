import * as React from 'react';
import type { ButtonIconPosition } from '../button';
import type { HeadingLevel } from '../Heading';
import type { IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { AccordionIcon } from './Accordion';

export interface AccordionHeaderTitleProps extends SpacingProps {
  children?: React.ReactNode;
}
declare const AccordionHeaderTitle: React.FC<AccordionHeaderTitleProps>;

export interface AccordionHeaderDescriptionProps extends SpacingProps {
  children?: React.ReactNode;
}
declare const AccordionHeaderDescription: React.FC<AccordionHeaderDescriptionProps>;

export interface AccordionHeaderContainerProps extends SpacingProps {
  children?: React.ReactNode;
}
declare const AccordionHeaderContainer: React.FC<AccordionHeaderContainerProps>;

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
export type AccordionHeaderIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any);
      expanded?: React.ReactNode | ((...args: any[]) => any);
    };
export type AccordionHeaderChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);

export interface AccordionHeaderProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  title?: AccordionHeaderTitle;
  description?: AccordionHeaderDescription;
  left_component?: AccordionHeaderLeftComponent;
  element?: AccordionHeaderElement;
  heading?: AccordionHeaderHeading;
  heading_level?: HeadingLevel;
  icon?: AccordionIcon;
  icon_position?: ButtonIconPosition;
  icon_size?: IconSize;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  no_animation?: boolean;
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
