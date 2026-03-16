import React from 'react';
import type { TableProps } from './Table';
import type { SpacingProps } from '../space/types';
export type TableContainerProps = {
    /**
     * The content of the component.
     */
    children: [
        React.ReactElement<TableContainerHeadProps>,
        React.ReactElement<TableContainerBodyProps>,
        React.ReactElement<TableContainerFootProps>
    ] | React.ReactElement<TableContainerBodyProps>;
};
export type TableContainerAllProps = TableContainerProps & React.TableHTMLAttributes<HTMLTableRowElement> & SpacingProps;
declare function TableContainer(props: TableContainerAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace TableContainer {
    var Body: typeof TableContainerBody;
    var Head: typeof TableContainerHead;
    var Foot: typeof TableContainerFoot;
}
export default TableContainer;
export type TableContainerBodyProps = {
    /**
     * The content of the component.
     */
    children: React.ReactElement<TableProps> | Array<React.ReactElement<TableProps>>;
};
export declare function TableContainerBody(props: TableContainerBodyProps & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export type TableContainerHeadProps = {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
};
export declare function TableContainerHead(props: TableContainerHeadProps & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export type TableContainerFootProps = {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
};
export declare function TableContainerFoot(props: TableContainerFootProps & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
