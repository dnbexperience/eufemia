/**
 * Web Pagination Helpers
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
export type PaginationIndicatorIndicatorElement = Record<string, unknown> | React.ReactNode | ((...args: any[]) => any) | string;
export interface PaginationIndicatorProps {
    indicatorElement?: PaginationIndicatorIndicatorElement;
}
export declare const PaginationIndicator: ({ indicatorElement, ...props }: PaginationIndicatorProps) => import("react/jsx-runtime").JSX.Element;
export declare class ContentObject {
    content: React.ReactNode | null;
    pageNumber: number;
    hasContent: boolean;
    onInsert?: (obj: ContentObject) => void;
    onUpdate?: (obj: ContentObject) => void;
    [key: string]: unknown;
    constructor({ pageNumber, ...props }: {
        pageNumber: number;
        [key: string]: unknown;
    });
    insert(content: React.ReactNode): this;
    update(content: React.ReactNode): this;
}
export declare function isTrElement(Element: any): boolean;
export declare function preparePageElement(Element: any, includeClassName?: string): any;
