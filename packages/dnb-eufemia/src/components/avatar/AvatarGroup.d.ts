import React from 'react';
import type { AvatarSizes, AvatarVariants } from './Avatar';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
export interface AvatarGroupProps extends Omit<React.HTMLProps<HTMLElement>, 'size' | 'label'> {
    /**
     * Label to describe the avatar group
     * Default: null
     */
    label: React.ReactNode;
    /**
     * Custom className on the component root
     * Default: null
     */
    className?: string;
    /**
     * Number of max displayed elements, including the "elements hidden text (+x)".
     * Default: 4
     */
    maxElements?: number;
    /**
     * The avatars to group.
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * The size of the Avatars, and "elements hidden text (+x)".
     * Default: medium.
     */
    size?: AvatarSizes;
    /**
     * The variant of the Avatars.
     * Default: primary.
     */
    variant?: AvatarVariants;
    /**
     * Skeleton should be applied when loading content
     * Default: false
     */
    skeleton?: SkeletonShow;
    /**
     * Define a custom background color for the Avatars, instead of a variant. Use a Eufemia color.
     * Default: undefined
     */
    backgroundColor?: string;
    /**
     * Define a custom color to compliment the backgroundColor for the Avatars. Use a Eufemia color.
     * Default: undefined
     */
    color?: string;
}
export declare const AvatarGroupContext: React.Context<any>;
export declare const AvatarGroupItemContext: React.Context<{
    zIndex?: number;
}>;
declare const AvatarGroup: (localProps: AvatarGroupProps & SpacingProps) => import("react/jsx-runtime").JSX.Element;
export interface ElementsHiddenProps {
    /**
     * The avatars to group.
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * The size of the "elements hidden text (+x)".
     * Default: medium.
     */
    size?: AvatarSizes;
}
export default AvatarGroup;
