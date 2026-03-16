import React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
export type BadgeProps = {
    /**
     * Aria label to describe the badge
     * Default: null
     */
    label?: React.ReactNode;
    /**
     * Custom className on the component root
     * Default: null
     */
    className?: string;
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
    /**
     * The content to display the badge on top of.
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * The content of the component.
     * Default: null
     */
    content?: string | number | React.ReactNode;
    /**
     * The vertical positioning of the component.
     * Default: null
     */
    vertical?: 'bottom' | 'top';
    /**
     * The horizontal positioning of the component.
     * Default: null
     */
    horizontal?: 'left' | 'right';
    /**
     * The variant of the component.
     * Default: "information".
     */
    variant?: 'information' | 'notification' | 'content';
    /**
     * Defines the status color of the `"information"` variant. Has no effect on other variants.
     * Default: "default".
     */
    status?: 'default' | 'neutral' | 'positive' | 'warning' | 'negative';
    /**
     * Applies subtle style to `"information"` variant. Has no effect on other variants.
     * Default: false.
     */
    subtle?: boolean;
    /**
     * Removes the badge without removing children. Useful when Badge wraps content.
     * Default: false
     */
    hideBadge?: boolean;
};
type BadgeAndSpacingProps = BadgeProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'content' | 'label'>;
export declare const defaultProps: BadgeAndSpacingProps;
declare function Badge(localProps: BadgeAndSpacingProps): import("react/jsx-runtime").JSX.Element;
export default Badge;
