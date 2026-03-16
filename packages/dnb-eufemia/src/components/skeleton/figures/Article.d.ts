/**
 * Web Skeleton Figure
 *
 */
import React from 'react';
export type SkeletonArticleRows = string | number;
export type SkeletonArticleChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface SkeletonArticleProps extends Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'> {
    rows?: SkeletonArticleRows;
    children?: SkeletonArticleChildren;
}
declare function SkeletonArticle({ rows, children, ...rest }: SkeletonArticleProps): import("react/jsx-runtime").JSX.Element;
export default SkeletonArticle;
