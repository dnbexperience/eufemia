import React from 'react';
import type { SectionSpacing, SectionStyleTypes, SectionVariants } from '../section/Section';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import BreadcrumbItem from './BreadcrumbItem';
export type BreadcrumbProps = {
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
     * Pass in a list of your pages as objects of breadcrumbitem to render them as breadcrumbitems.
     * Default: null
     */
    data?: Array<BreadcrumbItemProps>;
    /**
     * The content of the component. Can be used instead of prop "data".
     * Default: null
     */
    children?: React.ReactElement<BreadcrumbItemProps> | Array<React.ReactElement<BreadcrumbItemProps>>;
    /**
     * The variant of the component.
     * Default: When children and data is not defined, it defaults to "single". "responsive" if they are defined.
     */
    variant?: 'responsive' | 'single' | 'multiple' | 'collapse';
    /**
     * Handle the click event on 'single'/'collapse'
     * Default: null
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * For variant 'single', use href (or onClick) to set href when clicking "Back"
     * Default: null
     */
    href?: string;
    /**
     * Every <nav> on a page needs an unique aria-label text
     * Default: Page hierarchy
     */
    navText?: React.ReactNode;
    /**
     * Add custom 'Back' text for variant 'single'
     * Default: 'Back' or defined by Context translation
     */
    goBackText?: React.ReactNode;
    /**
     * Add custom 'Home' text
     * Default: 'Home' or defined by Context translation
     */
    homeText?: React.ReactNode;
    /**
     * Add custom 'Back to...' text, for variant collapse
     * Default 'Back to...' or defined by Context translation
     */
    backToText?: React.ReactNode;
    /**
     * If variant='collapse', you can override isCollapsed for the collapsed content by updating this value.
     * Default: null
     */
    isCollapsed?: boolean;
    /**
     * Use one of the Section component style types (style_type)
     * Default: transparent
     */
    styleType?: SectionStyleTypes;
    /**
     * Use one of the Section component variants
     * Default: info
     */
    collapsedStyleType?: SectionVariants;
    /**
     * Include spacing properties from the Section component in breadcrumb. If only `true` is given, the spacing will be `small`.
     * Default: false
     */
    spacing?: SectionSpacing;
    /**
     * Will disable the height animation
     * Default: false
     */
    noAnimation?: boolean;
    /**
     * Will be called when breadcrumb expands or collapses.
     */
    onToggle?: (isCollapsed: boolean) => void;
    /**
     * Send along a custom React Ref.
     * Default: null
     */
    ref?: React.Ref<HTMLElement>;
};
declare const Breadcrumb: {
    (localProps: BreadcrumbProps & SpacingProps): import("react/jsx-runtime").JSX.Element;
    Item: (localProps: BreadcrumbItemProps) => import("react/jsx-runtime").JSX.Element;
};
export { BreadcrumbItem };
export default Breadcrumb;
