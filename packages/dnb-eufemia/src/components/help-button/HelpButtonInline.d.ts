import React from 'react';
import type { HelpButtonProps } from './HelpButton';
import type { SpacingProps } from '../space/types';
export type HelpProps = {
    title?: React.ReactNode;
    content?: React.ReactNode;
    renderAs?: 'inline' | 'dialog';
    /** Only for the "inline" variant */
    open?: boolean;
    /** Only for the "inline" variant */
    breakout?: boolean;
    /** Only for the "inline" variant */
    outset?: boolean;
    /**
     * If set to `true`, no open/close animation will be shown when renderAs="dialog". Defaults to `false`.
     */
    noAnimation?: boolean;
};
export type HelpButtonInlineProps = HelpButtonProps & {
    contentId?: string;
    help?: HelpProps;
    /**
     * If set to `true`, the content will get focus when the help content is opened.
     */
    focusOnOpen?: boolean;
};
export type HelpButtonInlineSharedStateDataProps = {
    isOpen: boolean;
    isUserIntent?: boolean;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    focusOnOpen?: boolean;
};
export default function HelpButtonInline(props: HelpButtonInlineProps): import("react/jsx-runtime").JSX.Element;
export type HelpButtonInlineContentProps = SpacingProps & {
    contentId: string;
    className?: string;
    element?: React.ElementType;
    children?: React.ReactNode;
    help?: HelpProps;
    breakout?: boolean;
    outset?: boolean;
    roundedCorner?: boolean;
    focusOnOpen?: boolean;
};
export declare function HelpButtonInlineContent(props: HelpButtonInlineContentProps): import("react/jsx-runtime").JSX.Element;
