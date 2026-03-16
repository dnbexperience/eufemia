/**
 * Web Pagination Component
 *
 */
import React from 'react';
import type { LocaleProps, SpaceTypeAll } from '../../shared/types';
import type { SkeletonShow } from '../Skeleton';
export type PaginationBarProps = {
    /**
     * The title used in every button shown in the bar. Defaults to Side %s.
     */
    buttonTitle?: string;
    /**
     *  The title used in the previous page button. Defaults to Forrige side.
     */
    prevTitle?: string;
    /**
     *  The title used in the next page button. Defaults to Neste side.
     */
    nextTitle?: string;
    /**
     * The title used in the dots. Relevant for screen readers. Defaults to %s flere sider.
     */
    morePages?: string;
    /**
     * Reference to the parent component. Used to contain height between updates.
     */
    contentRef?: React.RefObject<HTMLElement>;
    /**
     *  the given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
     */
    children?: React.ReactNode | (() => React.ReactNode);
    skeleton?: SkeletonShow;
    space?: SpaceTypeAll;
};
export type PaginationBarAllProps = PaginationBarProps & LocaleProps & React.HTMLProps<HTMLElement>;
declare const PaginationBar: (localProps: PaginationBarAllProps) => import("react/jsx-runtime").JSX.Element;
export declare const useResizeObserver: (element: any) => string;
export default PaginationBar;
