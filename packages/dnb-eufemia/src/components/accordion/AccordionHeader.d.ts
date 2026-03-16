/**
 * Web Accordion Component
 *
 */
import React from 'react';
import type { SpacingProps } from '../space/types';
import type { HeadingLevel } from '../Heading';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { AccordionIcon, AccordionIconPosition, AccordionVariant } from './Accordion';
export type AccordionHeaderTitleProps = SpacingProps & {
    children?: React.ReactNode;
};
declare function AccordionHeaderTitle({ children, ...rest }: AccordionHeaderTitleProps): import("react/jsx-runtime").JSX.Element;
export type AccordionHeaderDescriptionProps = SpacingProps & {
    children?: React.ReactNode;
};
declare function AccordionHeaderDescription({ children, ...rest }: AccordionHeaderDescriptionProps): import("react/jsx-runtime").JSX.Element;
export type AccordionHeaderContainerProps = SpacingProps & {
    children?: React.ReactNode;
};
declare function AccordionHeaderContainer({ children, ...rest }: AccordionHeaderContainerProps): import("react/jsx-runtime").JSX.Element;
type AccordionHeaderIconIcon = IconIcon | {
    closed?: IconIcon;
    expanded?: IconIcon;
};
export type AccordionHeaderIconProps = {
    icon?: AccordionHeaderIconIcon;
    size?: IconSize;
    expanded?: boolean;
    iconPosition?: AccordionIconPosition;
};
declare function AccordionHeaderIcon({ icon: iconProp, expanded, size, iconPosition, }: AccordionHeaderIconProps): import("react/jsx-runtime").JSX.Element;
export type AccordionHeaderTitle = string | React.ReactNode | ((...args: any[]) => any);
export type AccordionHeaderDescription = string | React.ReactNode | ((...args: any[]) => any);
export type AccordionHeaderLeftComponent = string | React.ReactNode | ((...args: any[]) => any);
export type AccordionHeaderElement = string | React.ReactNode | ((...args: any[]) => any);
export type AccordionHeaderHeading = boolean | string | React.ReactNode | ((...args: any[]) => any);
export type AccordionHeaderIcon = React.ReactNode | ((...args: any[]) => any) | {
    closed?: React.ReactNode | ((...args: any[]) => any);
    expanded?: React.ReactNode | ((...args: any[]) => any);
};
export type AccordionHeaderProps = React.HTMLProps<HTMLElement> & SpacingProps & {
    title?: AccordionHeaderTitle;
    expanded?: boolean;
    description?: AccordionHeaderDescription;
    leftComponent?: AccordionHeaderLeftComponent;
    element?: AccordionHeaderElement;
    heading?: AccordionHeaderHeading;
    headingLevel?: HeadingLevel;
    icon?: AccordionIcon;
    iconPosition?: AccordionIconPosition;
    iconSize?: IconSize;
    disabled?: boolean;
    skeleton?: SkeletonShow;
    noAnimation?: boolean;
    className?: string;
    children?: string | React.ReactNode | ((...args: any[]) => any);
    variant?: AccordionVariant;
};
export declare const AccordionHeader: {
    ({ iconSize: iconSizeDefault, ...restOfProps }: AccordionHeaderProps): import("react/jsx-runtime").JSX.Element;
    Container: typeof AccordionHeaderContainer;
    Icon: typeof AccordionHeaderIcon;
    Title: typeof AccordionHeaderTitle;
    Description: typeof AccordionHeaderDescription;
};
export default AccordionHeader;
