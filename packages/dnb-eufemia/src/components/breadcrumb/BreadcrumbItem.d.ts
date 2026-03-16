import React from 'react';
import type { ButtonProps } from '../Button';
import type { AnchorAllProps } from '../Anchor';
import type { DataAttributeTypes } from '../../shared/types';
import type { IconIcon } from '../icon/Icon';
import type { SkeletonShow } from '../skeleton/Skeleton';
export type BreadcrumbItemProps = {
    /**
     * Text displaying the title of the item's corresponding page
     * Default: If variant='home', default is "Home". Otherwise it is required.
     */
    text?: React.ReactNode;
    /**
     * Icon displaying on the left side
     * Default: HomeIcon / chevron_right
     */
    icon?: IconIcon;
    /**
     * Href should be the link to the item's corresponding page.
     * Default: null
     */
    href?: string;
    /**
     * Set a custom click event. In this case, you should not define the prop href.
     * Default: null
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    /**
     * The component variant. Variant 'current' should correspond to the current page and 'home' to the root page.
     * Default: null
     */
    variant?: 'home' | 'previous' | 'current';
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
    /** Internal */
    itemNo?: number;
} & (AnchorAllProps & Omit<ButtonProps, 'variant'>) & DataAttributeTypes;
declare const BreadcrumbItem: (localProps: BreadcrumbItemProps) => import("react/jsx-runtime").JSX.Element;
export default BreadcrumbItem;
