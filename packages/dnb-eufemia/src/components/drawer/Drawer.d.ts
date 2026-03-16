/**
 * Web Drawer Component
 *
 */
import React from 'react';
import DrawerBody from './parts/DrawerBody';
import DrawerHeader from './parts/DrawerHeader';
import DrawerNavigation from './parts/DrawerNavigation';
import type { DrawerProps, DrawerContentProps } from './types';
export type DrawerAllProps = DrawerProps & DrawerContentProps;
declare function Drawer({ id, contentId, focusSelector, labelledBy, directDomReturn, hideCloseButton, disabled, title, dialogTitle, closeTitle, containerPlacement, spacing, noAnimation, noAnimationOnMobile, animationDuration, fullscreen, onOpen, onClose, onClosePrevent, openModal, closeModal, preventClose, preventOverlayClose, open, openDelay, omitTriggerButton, trigger, triggerAttributes, closeButtonAttributes, overlayClass, contentClass, contentRef, scrollRef, top, bottom, left, right, space, ...props }: DrawerAllProps): React.JSX.Element;
declare namespace Drawer {
    var Body: typeof DrawerBody;
    var Header: typeof DrawerHeader;
    var Navigation: typeof DrawerNavigation;
}
export default Drawer;
