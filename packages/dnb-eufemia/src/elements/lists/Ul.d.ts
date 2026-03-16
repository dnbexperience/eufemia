/**
 * HTML Element
 *
 */
import React from 'react';
import { ElementProps } from '../Element';
export type UlProps = {
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
export type UlAllProps = UlProps & React.AllHTMLAttributes<HTMLUListElement> & Omit<ElementProps, 'skeleton' | 'skeletonMethod'>;
declare const Ul: ({ nested, inside, outside, ...props }?: UlAllProps) => import("react/jsx-runtime").JSX.Element;
export default Ul;
