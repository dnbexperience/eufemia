/**
 * HTML Element
 *
 */
import React from 'react';
import { ElementProps } from '../Element';
export type OlProps = {
    /**
     * Defines the position of the marker
     */
    inside?: boolean;
    /**
     * Defines the position of the marker (default)
     */
    outside?: boolean;
    /**
     * Will ensure a nested structure of several lists
     */
    nested?: boolean;
};
export type OlAllProps = OlProps & React.AllHTMLAttributes<HTMLOListElement> & Omit<ElementProps, 'skeleton' | 'skeletonMethod'>;
declare const Ol: ({ nested, inside, outside, ...props }?: OlAllProps) => import("react/jsx-runtime").JSX.Element;
export default Ol;
