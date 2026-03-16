import React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
export interface TagGroupProps {
    /**
     * Aria label to describe the tag group
     * Default: null
     */
    label: React.ReactNode;
    /**
     * Custom className on the component root
     * Default: null
     */
    className?: string;
    /**
     * The tags to group.
     * Default: null
     */
    children?: React.ReactNode;
    /**
     * Skeleton should be applied when loading content
     * Default: false
     */
    skeleton?: SkeletonShow;
}
declare const TagGroup: (localProps: TagGroupProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, "label">) => import("react/jsx-runtime").JSX.Element;
export default TagGroup;
