/**
 * Web Drawer Component
 *
 */
import React from 'react';
import type { DialogContentProps } from './types';
export default function DialogContent({ modalContent, navContent, headerContent, alignContent, className, preventCoreStyle, spacing, fullscreen, noAnimation, noAnimationOnMobile, minWidth: minWidthProp, maxWidth: maxWidthProp, variant, confirmType, icon, description, hideDecline, hideConfirm, onConfirm, onDecline, declineText, confirmText, ...rest }: DialogContentProps): React.JSX.Element;
