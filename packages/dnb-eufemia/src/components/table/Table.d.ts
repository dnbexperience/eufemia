import React from 'react';
import ScrollView from './TableScrollView';
import type { StickyTableHeaderProps } from './TableStickyHeader';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { LocaleProps, SpacingProps } from '../../shared/types';
export type TableSizes = 'large' | 'medium' | 'small';
export type TableVariants = 'generic';
export { ScrollView };
export type TableProps = {
    /**
     * The content of the component.
     */
    children: React.ReactNode;
    /**
     * Custom className on the component root
     */
    className?: string;
    /**
     * Skeleton should be applied when loading content
     */
    skeleton?: SkeletonShow;
    /**
     * The size of the component.
     * Default: large.
     */
    size?: TableSizes;
    /**
     * The style variant of the component. Currently not implemented.
     * Default: generic.
     */
    variant?: TableVariants;
    /**
     * Use `true` to show borders between table data cell
     * Default: false
     */
    border?: boolean;
    /**
     * Use `true` to show a outline border around the table
     * Default: false
     */
    outline?: boolean;
    /**
     * Defines how the Table should look. Use `accordion` for an accordion-like table. Use `navigation` for a navigation table.
     */
    mode?: 'accordion' | 'navigation';
    /**
     * Defines where the chevron will be placed, should only be used together with mode="accordion".
     * Default: 'start'
     */
    accordionChevronPlacement?: 'start' | 'end';
    /**
     * Defines if the table should behave with a fixed table layout, using: "table-layout: fixed;"
     * Default: null.
     */
    fixed?: boolean;
    /**
     * ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.
     *
     * Default: `undefined`
     */
    collapseAllHandleRef?: React.RefObject<() => void>;
} & StickyTableHeaderProps;
export type TableAllProps = TableProps & Omit<React.TableHTMLAttributes<HTMLTableElement>, 'border'> & LocaleProps & SpacingProps;
declare const Table: {
    (componentProps: TableAllProps): import("react/jsx-runtime").JSX.Element;
    ScrollView: typeof ScrollView;
};
export default Table;
