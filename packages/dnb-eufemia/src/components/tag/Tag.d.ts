import React from 'react';
import type { IconIcon } from '../icon/Icon';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
export interface TagProps {
    /**
     * The content of the tag element, can be a string or a React Element.
     * Default: null
     */
    text?: string | React.ReactNode;
    /**
     * Icon displaying on the left side
     * Default: null
     */
    icon?: IconIcon;
    /**
     * If a label is given, typical inside a table or dl (definition list), then you can disable Tag.Group as a dependent of Tag. Use `true` to omit the `Tag group required:` warning.
     * Default: null
     */
    hasLabel?: boolean;
    /**
     * Defines the variant
     * Default: 'default'
     */
    variant?: 'default' | 'clickable' | 'addable' | 'removable';
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
     * The content of the tag element, can be a string or a React Element. Will be overwritten by text prop
     * Default: null
     */
    children?: string | React.ReactNode;
    /**
     * Handle the click event on 'tag' element
     * Default: null
     */
    onClick?: (args: {
        event: React.MouseEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Handle the delete event on 'tag' element
     * Default: null
     */
    omitOnKeyUpDeleteEvent?: boolean;
    /**
     * Internal property
     * Has translation in context
     */
    removeIconTitle?: string;
    /**
     * Internal property
     * Has translation in context
     */
    addIconTitle?: string;
}
declare const Tag: {
    (localProps: TagProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, "onClick">): import("react/jsx-runtime").JSX.Element;
    Group: (localProps: import("./TagGroup").TagGroupProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, "label">) => import("react/jsx-runtime").JSX.Element;
};
export default Tag;
