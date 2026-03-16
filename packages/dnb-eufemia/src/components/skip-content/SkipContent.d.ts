import React from 'react';
import type { ButtonProps } from '../button/Button';
export interface SkipContentProps {
    /**
     * Define an existing `Section` id to focus when the inner button got pressed.
     * Required
     */
    selector: string;
    /**
     * Define a clear message describing the choices the users has.
     * Optional
     */
    text?: React.ReactNode;
    /**
     * Defines the delay after the enter key has been pressed
     * Defaults to 400
     */
    focusDelay?: number;
}
export type SkipContentAllProps = SkipContentProps & ButtonProps;
declare const SkipContent: {
    (localProps: SkipContentAllProps): import("react/jsx-runtime").JSX.Element;
    Return: (localProps: SkipContentReturnProps) => import("react/jsx-runtime").JSX.Element;
};
export type SkipContentReturnProps = SkipContentAllProps;
export default SkipContent;
