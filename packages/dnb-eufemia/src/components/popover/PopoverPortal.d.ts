/**
 * Web Popover Component
 */
import React from 'react';
import PopoverContainer from './PopoverContainer';
import type { PopoverAutoAlignMode, PopoverResolvedTargetElement } from './types';
type PopoverPortalProps = {
    baseClassNames?: string[];
    targetElement?: PopoverResolvedTargetElement;
    active: boolean;
    showDelay: number;
    hideDelay: number;
    keepInDOM?: boolean;
    noAnimation?: boolean;
    portalRootClass?: string;
    children?: React.ReactNode;
    attributes?: React.HTMLAttributes<HTMLElement>;
    arrowPosition?: React.ComponentProps<typeof PopoverContainer>['arrowPosition'];
    placement?: React.ComponentProps<typeof PopoverContainer>['placement'];
    alignOnTarget?: React.ComponentProps<typeof PopoverContainer>['alignOnTarget'];
    horizontalOffset?: React.ComponentProps<typeof PopoverContainer>['horizontalOffset'];
    arrowPositionSelector?: React.ComponentProps<typeof PopoverContainer>['arrowPositionSelector'];
    fixedPosition?: boolean;
    contentRef?: React.RefObject<HTMLSpanElement>;
    triggerOffset?: number;
    autoAlignMode?: PopoverAutoAlignMode;
    hideArrow?: boolean;
    arrowEdgeOffset?: React.ComponentProps<typeof PopoverContainer>['arrowEdgeOffset'];
    targetRefreshKey?: unknown;
};
declare function PopoverPortal(props: PopoverPortalProps): import("react/jsx-runtime").JSX.Element;
export default PopoverPortal;
