/**
 * Web Accordion Component
 *
 */
import React from 'react';
import type { ButtonIconPosition } from '../Button';
import type { HeadingLevel } from '../Heading';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import AccordionContent from './AccordionContent';
import { Store } from './AccordionStore';
import { type GroupProps } from './AccordionTypes';
export type { GroupProps } from './AccordionTypes';
export { accordionDefaultProps } from './AccordionTypes';
export type AccordionVariant = 'plain' | 'default' | 'outlined' | 'filled';
export type AccordionHeading = boolean | React.ReactNode;
export type AccordionIcon = IconIcon | {
    closed?: IconIcon;
    /**
     * If set to `true` the accordion will be expanded as its initial state.
     */
    expanded?: IconIcon;
};
export type AccordionIconPosition = ButtonIconPosition;
export type AccordionProps = Omit<React.HTMLProps<HTMLElement>, 'ref'> & SpacingProps & {
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
    noAnimation?: boolean;
    /**
     * If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that&#39;s mainly a technical aspect to consider.
     */
    expandedSsr?: boolean;
    /**
     */
    prerender?: boolean;
    /**
     * If set to `true` the accordion component will not re-render its content – can be useful for components you don&#39;t have control of storing the temporary state during an interaction.
     */
    preventRerender?: boolean;
    /**
     * Use this prop together with `preventRerender` – and if it is to `true`, the accordion component will re-render if the children are a new React element and does not match the previous one anymore.
     */
    preventRerenderConditional?: boolean;
    /**
     * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the sate in the local storage.
     */
    rememberState?: boolean;
    /**
     * Send along a custom React Ref for `.dnb-accordion__content`.
     */
    contentRef?: React.RefObject<HTMLElement | null>;
    /**
     * If set to `true`, the saved (remembered) will be removed and the initial component state will be used and set.
     */
    flushRememberedState?: boolean;
    /**
     * If set to `true`, a group of accordions will be wrapped to sidebar looking menu for medium and larger screens.
     */
    singleContainer?: boolean;
    /**
     * Defines the used styling. As of now, only `outlined` is available. Use `plain` for no styles. It defaults to `outlined`.
     */
    variant?: AccordionVariant;
    /**
     * Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.
     */
    leftComponent?: React.ReactNode;
    /**
     * If set to `true`, the accordion button will be disabled (dimmed).
     */
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * A unique `id` that will be used on the button element. If you use `rememberState`, an id is required.
     */
    id?: string;
    group?: string;
    /**
     * Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.
     */
    element?: React.ReactNode;
    /**
     * If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `headingLevel` property.
     */
    heading?: AccordionHeading;
    /**
     * If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.
     */
    headingLevel?: HeadingLevel;
    /**
     * Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.
     */
    icon?: AccordionIcon;
    /**
     * Will set the placement of the icon. Defaults to `left`.
     */
    iconPosition?: AccordionIconPosition;
    /**
     * Define a different icon size. Defaults to `medium` (1.5rem).
     */
    iconSize?: IconSize;
    className?: string;
    children?: React.ReactNode;
    /**
     * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.
     */
    onChange?: (...args: any[]) => any;
};
declare function Accordion({ variant, iconSize, ...restOfProps }: AccordionProps): import("react/jsx-runtime").JSX.Element;
declare namespace Accordion {
    var Provider: (props: import("./AccordionGroup").AccordionGroupProps) => import("react/jsx-runtime").JSX.Element;
    var Header: {
        ({ iconSize: iconSizeDefault, ...restOfProps }: import("./AccordionHeader").AccordionHeaderProps): import("react/jsx-runtime").JSX.Element;
        Container: ({ children, ...rest }: import("./AccordionHeader").AccordionHeaderContainerProps) => import("react/jsx-runtime").JSX.Element;
        Icon: ({ icon: iconProp, expanded, size, iconPosition, }: import("./AccordionHeader").AccordionHeaderIconProps) => import("react/jsx-runtime").JSX.Element;
        Title: ({ children, ...rest }: import("./AccordionHeader").AccordionHeaderTitleProps) => import("react/jsx-runtime").JSX.Element;
        Description: ({ children, ...rest }: import("./AccordionHeader").AccordionHeaderDescriptionProps) => import("react/jsx-runtime").JSX.Element;
    };
    var Content: typeof AccordionContent;
    var Group: {
        ({ expandBehavior, ...props }: GroupProps): import("react/jsx-runtime").JSX.Element;
        Store(group: string, id?: string): Store;
    };
    var Store: (id: string) => Store;
}
export default Accordion;
