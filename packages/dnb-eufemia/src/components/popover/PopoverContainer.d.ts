/**
 * Web Popover Component
 */
import React from 'react';
import type { PopoverAlign, PopoverArrow, PopoverAutoAlignMode, PopoverPlacement, PopoverResolvedTargetElement } from './types';
type PopoverContainerProps = {
    baseClassNames?: string[];
    active?: boolean;
    showDelay?: number;
    attributes?: React.HTMLAttributes<HTMLElement>;
    arrowPosition?: PopoverArrow;
    placement?: PopoverPlacement;
    alignOnTarget?: PopoverAlign;
    horizontalOffset?: number;
    arrowPositionSelector?: string;
    hideDelay?: number;
    fixedPosition?: boolean;
    noAnimation?: boolean;
    skipPortal?: boolean;
    contentRef?: React.RefObject<HTMLSpanElement>;
    children?: React.ReactNode;
    targetElement?: PopoverResolvedTargetElement;
    triggerOffset?: number;
    keepInDOM?: boolean;
    autoAlignMode?: PopoverAutoAlignMode;
    hideArrow?: boolean;
    arrowEdgeOffset?: number;
    targetRefreshKey?: unknown;
};
declare function PopoverContainer(props: PopoverContainerProps): import("react/jsx-runtime").JSX.Element;
export default PopoverContainer;
