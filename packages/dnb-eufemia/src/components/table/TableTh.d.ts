import React from 'react';
import TableSortButton from './TableSortButton';
import TableHelpButton from './TableHelpButton';
export type TableThChildren = React.ReactNode | ReturnType<typeof TableSortButton> | ReturnType<typeof TableHelpButton>;
export type TableThProps = {
    /**
     * Defines the table header as sortable (ascending)
     * Default: false
     */
    sortable?: boolean;
    /**
     * Defines the sortable column as the current active (ascending)
     * Default: false
     */
    active?: boolean;
    /**
     * Defines the sortable column as in reversed order (descending)
     * Default: false
     */
    reversed?: boolean;
    /**
     * If set to true, the header text will not wrap to new lines
     * Default: false
     */
    noWrap?: boolean;
    /**
     * The content of the table header given as Tr.
     */
    children?: TableThChildren | Array<TableThChildren>;
};
declare function Th(componentProps: TableThProps & React.ThHTMLAttributes<HTMLTableCellElement>): import("react/jsx-runtime").JSX.Element;
declare namespace Th {
    var SortButton: typeof TableSortButton;
    var HelpButton: typeof TableHelpButton;
    var Horizontal: ({ className, ...rest }: React.ThHTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
}
export default Th;
