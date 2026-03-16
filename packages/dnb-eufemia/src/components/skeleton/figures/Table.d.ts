/**
 * Web Skeleton Figure
 *
 */
import React from 'react';
export type SkeletonTableRows = string | number;
export type SkeletonTableChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface SkeletonTableProps extends Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'> {
    rows?: SkeletonTableRows;
    children?: SkeletonTableChildren;
}
declare function SkeletonTable({ rows, children, ...rest }: SkeletonTableProps): import("react/jsx-runtime").JSX.Element;
export default SkeletonTable;
