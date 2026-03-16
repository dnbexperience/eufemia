import React from 'react';
import type { TableAccordionContentRowProps } from './TableAccordionContent';
export type useTableAnimationHandlerProps = {
    /**
     * Ref to <div> inside the <tr> element being expanded/collapsed
     */
    contentRef: React.RefObject<HTMLDivElement>;
    /**
     * Ref to the <tr> element being clicked
     */
    trRef: React.RefObject<HTMLTableRowElement>;
};
export declare function useTableAnimationHandler({ contentRef, trRef, expanded, noAnimation, }: useTableAnimationHandlerProps & TableAccordionContentRowProps): {
    ariaLive: any;
    isInDOM: boolean;
    isAnimating: boolean;
    isVisibleParallax: boolean;
    firstPaintStyle: {
        readonly visibility: "hidden";
        readonly opacity: "0";
        readonly height: "auto";
    } | Record<string, never>;
};
export default useTableAnimationHandler;
