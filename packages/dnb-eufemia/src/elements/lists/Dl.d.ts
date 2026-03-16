/**
 * HTML Element
 *
 */
import React from 'react';
import type { ElementProps } from '../Element';
import type { SpacingProps } from '../../shared/types';
export type DlProps = {
    /**
     * Use "true" to horizontally align both the term and the description
     */
    layout?: 'vertical' | 'horizontal' | 'grid';
};
export type DlAllProps = DlProps & React.AllHTMLAttributes<HTMLDListElement> & Omit<ElementProps, 'skeleton' | 'skeletonMethod'>;
declare const Dl: {
    ({ layout, ...props }: DlAllProps): import("react/jsx-runtime").JSX.Element;
    Item({ className, children, ...props }: React.AllHTMLAttributes<HTMLSpanElement> & SpacingProps): import("react/jsx-runtime").JSX.Element;
};
export default Dl;
