/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */
import React from 'react';
import type { SkeletonMethods } from '../components/skeleton/SkeletonHelper';
import type { SkeletonShow } from '../components/skeleton/Skeleton';
import type { DynamicElement, SpacingProps } from '../shared/types';
export type ElementInternalProps = {
    /**
     * Defines the Element Type, like "div"
     */
    as: DynamicElement<unknown>;
};
export type ElementProps = {
    skeleton?: SkeletonShow;
    skeletonMethod?: SkeletonMethods;
    /**
     * As a string: replaces the default tag class `dnb-{TAG_NAME}` with a different class. Empty string does the same as default `undefined`.
     *
     * As a boolean: set it to `false` to disable the default tag class. `true` does the same as default `undefined`.
     *
     * Default: `undefined`
     */
    internalClass?: string | boolean;
    ref?: React.RefObject<HTMLElement> | React.Ref<unknown>;
    children?: React.ReactNode;
} & SpacingProps;
export type ElementAllProps = ElementProps & ElementInternalProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'as'>;
export declare const defaultProps: {
    skeletonMethod: string;
};
declare function Element(localProps: ElementAllProps): import("react/jsx-runtime").JSX.Element;
export default Element;
