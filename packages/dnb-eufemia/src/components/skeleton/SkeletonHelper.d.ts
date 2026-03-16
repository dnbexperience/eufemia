/**
 * Web Skeleton Helpers
 *
 */
import React from 'react';
import type { SkeletonShow } from './Skeleton';
import type { ContextProps } from '../../shared/Context';
export type SkeletonMethods = 'shape' | 'font' | 'code';
export type SkeletonContextProps = ContextProps & {
    translation?: {
        Skeleton?: {
            ariaBusy?: string;
        };
    };
};
export type skeletonDOMAttributesContext = {
    translation?: {
        Skeleton: {
            ariaBusy?: string;
        };
    };
};
export declare const skeletonDOMAttributes: (params: React.HTMLProps<HTMLElement>, skeleton: SkeletonShow, context?: SkeletonContextProps) => React.HTMLProps<HTMLElement>;
export declare const createSkeletonClass: (method: SkeletonMethods, skeleton: SkeletonShow, context?: SkeletonContextProps, className?: any) => any;
export type AutoSizeProps = {
    __element?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};
export declare function AutoSize({ __element: Comp, children, className, style, ...props }: AutoSizeProps): import("react/jsx-runtime").JSX.Element;
