import React from 'react';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
type BreadcrumbMultipleProps = {
    isCollapsed: boolean;
    noAnimation: boolean;
    data: Array<BreadcrumbItemProps>;
    items: React.ReactElement<BreadcrumbItemProps> | Array<React.ReactElement<BreadcrumbItemProps>>;
};
export declare const BreadcrumbMultiple: ({ isCollapsed, items, noAnimation, data, }: BreadcrumbMultipleProps) => import("react/jsx-runtime").JSX.Element;
export {};
