import React from 'react';
import type { SpacingProps } from '../../space/types';
type ExtendedMouseEvent = {
    event: React.MouseEvent<HTMLElement>;
    close: () => void;
};
export type DialogActionProps = {
    /**
     * For dialog actions, give a custom text for the decline button.
     */
    declineText?: React.ReactNode;
    /**
     * For dialog actions, give a custom text for the confirm button.
     */
    confirmText?: React.ReactNode;
    /**
     * For variant confirmation, handle the confirm action click.
     */
    onConfirm?: (event: ExtendedMouseEvent) => void;
    /**
     * For variant confirmation, handle the decline action click.
     */
    onDecline?: (event: ExtendedMouseEvent) => void;
    /**
     * For variant confirmation, hide the default decline button and only show the confirm button.
     */
    hideDecline?: boolean;
    /**
     * For variant confirmation, hide the default confirm button and only show the decline button.
     */
    hideConfirm?: boolean;
    /**
     * Pass in custom confirm/decline buttons for action handling. Every child of type Button will be provided with a `close` function attribute.
     */
    children?: React.ReactElement | Array<React.ReactElement>;
};
export type DialogActionAllProps = DialogActionProps & SpacingProps & Omit<React.HTMLAttributes<HTMLElement>, 'children'>;
declare const DialogAction: ({ declineText, confirmText, hideDecline, hideConfirm, onConfirm, onDecline, className, children, ...props }: DialogActionAllProps) => import("react/jsx-runtime").JSX.Element;
export default DialogAction;
