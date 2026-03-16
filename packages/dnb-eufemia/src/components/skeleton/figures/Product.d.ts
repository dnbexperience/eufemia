/**
 * Web Skeleton Figure
 *
 */
import React from 'react';
export type SkeletonProductRows = string | number;
export type SkeletonProductChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface SkeletonProductProps extends Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'> {
    rows?: SkeletonProductRows;
    children?: SkeletonProductChildren;
}
declare function SkeletonProduct({ rows, children, ...rest }: SkeletonProductProps): import("react/jsx-runtime").JSX.Element;
export default SkeletonProduct;
