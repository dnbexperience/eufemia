/**
 * Web Skeleton Figure
 *
 */
import React from 'react';
export type SkeletonCircleRows = string | number;
export type SkeletonCircleChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface SkeletonCircleProps extends Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'> {
    rows?: SkeletonCircleRows;
    children?: SkeletonCircleChildren;
}
declare function SkeletonCircle({ rows, children, ...rest }: SkeletonCircleProps): import("react/jsx-runtime").JSX.Element;
export default SkeletonCircle;
