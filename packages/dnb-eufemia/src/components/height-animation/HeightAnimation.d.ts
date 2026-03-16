import React from 'react';
import type { useHeightAnimationOptions } from './useHeightAnimation';
import type { DynamicElement, SpacingProps } from '../../shared/types';
export type HeightAnimationProps = {
    /**
     * Whether the nested children content should be kept in the DOM or not.
     * Default: false
     */
    keepInDOM?: boolean;
    /**
     * Set to `true` to omit the usage of "overflow: hidden;"
     * Default: false
     */
    showOverflow?: boolean;
    /**
     * Defines the duration of the animation in milliseconds.
     * Default: 400
     */
    duration?: number;
    /**
     * Defines the delay of the animation in milliseconds.
     * Default: 0
     */
    delay?: number;
    /**
     * Define a custom HTML Element.
     * Default: div
     */
    element?: DynamicElement;
    /**
     * Send along a custom React Ref.
     * Default: null
     */
    ref?: React.RefObject<HTMLElement>;
} & useHeightAnimationOptions;
export type HeightAnimationAllProps = HeightAnimationProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'onAnimationEnd'>;
declare function HeightAnimation({ open, animate, keepInDOM, showOverflow, element, duration, delay, className, ref, children, compensateForGap, onInit, onOpen, onAnimationStart, onAnimationEnd, ...rest }: HeightAnimationAllProps): import("react/jsx-runtime").JSX.Element;
export default HeightAnimation;
