import type React from 'react';
import HeightAnimationInstance from './HeightAnimationInstance';
export type useHeightAnimationOptions = {
    /**
     * Set to `true`, when initially `false` was given, to animate from 0px to auto.
     * Default: true
     */
    open?: boolean;
    /**
     * Set to `false` to omit the animation.
     * Default: true
     */
    animate?: boolean;
    /**
     * To compensate for CSS gap between the rows, so animation does not jump during the animation.
     * Provide a CSS unit or `var(--row-gap)`.
     */
    compensateForGap?: string | 'auto';
    /**
     * In order to let the Hook know when children has changed
     */
    children?: React.ReactNode | HTMLElement;
    /**
     * Is called once before mounting the component (useLayoutEffect)
     */
    onInit?: (instance: HeightAnimationInstance) => void;
    /**
     * Is called when fully opened or closed
     */
    onOpen?: (isOpen: boolean) => void;
    /**
     * Is called when animation has started.
     */
    onAnimationStart?: (state: HeightAnimationOnStartTypes) => void;
    /**
     * Is called when animation is done and the full height is reached.
     */
    onAnimationEnd?: (state: HeightAnimationOnEndTypes) => void;
};
export type HeightAnimationOnStartTypes = 'opening' | 'closing' | 'adjusting';
export type HeightAnimationOnEndTypes = 'opened' | 'closed' | 'adjusted';
export declare function useHeightAnimation(targetRef: React.RefObject<HTMLElement>, { open, animate, children, compensateForGap, onInit, onOpen, onAnimationStart, onAnimationEnd, }?: useHeightAnimationOptions): {
    open: boolean;
    isOpen: boolean;
    isInDOM: boolean;
    isVisible: boolean;
    isVisibleParallax: boolean;
    isAnimating: boolean;
    firstPaintStyle: {
        readonly visibility: "hidden";
        readonly opacity: "0";
        readonly height: "auto";
    } | Record<string, never>;
};
