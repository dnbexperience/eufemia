/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import PaginationBar from './PaginationBar';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceTypeAll } from '../space/types';
import type { ButtonIconPosition } from '../Button';
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers';
export type PaginationStartupPage = string | number;
export type PaginationCurrentPage = string | number;
export type PaginationPageCount = string | number;
export type PaginationStartupCount = string | number;
export type PaginationParallelLoadCount = string | number;
export type PaginationMinWaitTime = string | number;
export type PaginationMode = 'pagination' | 'infinity';
export type PaginationLayout = 'vertical' | 'horizontal';
export type PaginationItems = string | any[];
export type PaginationSetContentHandler = string | ((fn: (pageNumber: number, content: React.ReactNode) => void) => void);
export type PaginationResetContentHandler = string | ((fn: () => void) => void);
export type PaginationResetPaginationHandler = string | ((fn: () => void) => void);
export type PaginationEndInfinityHandler = string | ((fn: () => void) => void);
export type PaginationPageElement = Record<string, unknown> | React.ReactNode | React.ComponentType | string;
export type PaginationFallbackElement = Record<string, unknown> | React.ReactNode | React.ComponentType | string;
export type PaginationMarkerElement = Record<string, unknown> | React.ReactNode | React.ComponentType | string;
export type PaginationIndicatorElement = React.ReactNode | React.ComponentType | string;
export type PaginationChildrenArgs = {
    pageNumber: number;
    setContent: (...args: unknown[]) => void;
    endInfinity: () => void;
    [key: string]: unknown;
};
export type PaginationChildren = React.ReactNode | ((props: PaginationChildrenArgs) => unknown);
export type LoadButtonProps = (() => React.ReactNode) | {
    /**
     * Used during infinity mode. If `useLoadButton` is set to true, then a button is show on the bottom. If the `startupPage` is higher than 1. Defaults to `Vis mer innhold`.
     */
    text: string;
    /**
     * Used during infinity mode. Sets the icon position on the `useLoadButton`. Default: `left`.
     */
    iconPosition: ButtonIconPosition;
};
export type PaginationEvent = {
    pageNumber: number;
    setContent: (...args: unknown[]) => void;
    endInfinity: () => void;
    event?: React.SyntheticEvent;
    [key: string]: unknown;
};
export interface PaginationProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children' | 'onChange' | 'onLoad'>, SpacingProps {
    /**
     * The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.
     */
    startupPage?: PaginationStartupPage;
    /**
     * The page shown at the moment the component renders. Defaults to `1`.
     */
    currentPage?: PaginationCurrentPage;
    /**
     * The total pages count. Defaults to `1`.
     */
    pageCount?: PaginationPageCount;
    /**
     * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
     */
    startupCount?: PaginationStartupCount;
    /**
     * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
     */
    parallelLoadCount?: PaginationParallelLoadCount;
    /**
     * if set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
     */
    placeMarkerBeforeContent?: boolean;
    /**
     * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
     */
    minWaitTime?: PaginationMinWaitTime;
    /**
     * If set to `true`, all pagination bar buttons are disabled.
     */
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.
     */
    mode?: PaginationMode;
    /**
     * The layout of the pagination bar. Defaults to `vertical`.
     */
    paginationBarLayout?: PaginationLayout;
    /**
     * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
     */
    useLoadButton?: boolean;
    items?: PaginationItems;
    /**
     * If set to `true` no indicator will be shown.
     */
    hideProgressIndicator?: boolean;
    /**
     * Callback function to get the `setContent` handler from the current pagination instance. e.g. `setContentHandler={fn => (...)}`. Use this handler to insert content during infinity mode.
     */
    setContentHandler?: PaginationSetContentHandler;
    /**
     * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `resetContentHandler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
     */
    resetContentHandler?: PaginationResetContentHandler;
    /**
     * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `resetPaginationHandler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
     */
    resetPaginationHandler?: PaginationResetPaginationHandler;
    /**
     * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `endInfinityHandler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.
     */
    endInfinityHandler?: PaginationEndInfinityHandler;
    /**
     * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
     */
    pageElement?: PaginationPageElement;
    /**
     * (infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.
     */
    fallbackElement?: PaginationFallbackElement;
    /**
     * (infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.
     */
    markerElement?: PaginationMarkerElement;
    /**
     * (infinity mode) is used by the _indicator_. Falls back to `fallbackElement` if not defined.
     */
    indicatorElement?: PaginationIndicatorElement;
    /**
     * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
     */
    align?: string;
    /**
     * The title used in every button shown in the bar. Defaults to `Side %s`.
     */
    buttonTitle?: string;
    /**
     * The title used in the previous page button. Defaults to `Forrige side`.
     */
    prevTitle?: string;
    /**
     * The title used in the next page button. Defaults to `Neste side`.
     */
    nextTitle?: string;
    /**
     * The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.
     */
    morePages?: string;
    /**
     * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
     */
    isLoadingText?: string;
    /**
     * Used to set load button text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.
     */
    loadButton?: LoadButtonProps;
    /**
     * Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).
     */
    barSpace?: SpaceTypeAll;
    className?: string;
    /**
     * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
     */
    children?: PaginationChildren;
    onChange?: (event: PaginationEvent) => void;
    onStartup?: (event: PaginationEvent) => void;
    onLoad?: (event: PaginationEvent) => void;
    onEnd?: (event: PaginationEvent) => void;
}
export type CreatePaginationReturn = {
    Pagination: (props?: Record<string, unknown>) => React.JSX.Element;
    InfinityMarker: (props?: Record<string, unknown>) => React.JSX.Element;
    setContent: (pageNumber: number, content: React.ReactNode) => void;
    resetContent: () => void;
    resetInfinity: () => void;
    endInfinity: () => void;
};
export type PaginationComponent = ((props: PaginationProps) => React.JSX.Element) & {
    Bar: typeof PaginationBar;
    Content: typeof PaginationContent;
} & ComponentMarkers;
declare const Pagination: PaginationComponent;
export default Pagination;
export declare function InfinityMarker(props: PaginationProps): import("react/jsx-runtime").JSX.Element;
declare function PaginationContent({ children, ref, ...props }: {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare const Bar: (props: PaginationProps) => import("react/jsx-runtime").JSX.Element;
export declare const createPagination: (initProps?: Record<string, unknown>) => CreatePaginationReturn;
