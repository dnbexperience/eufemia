/**
 * Component helpers legacy
 *
 * This is a legacy component.
 */
import React from 'react';
/**
 * Check if device is touch device or not
 */
export declare function isTouchDevice(): boolean;
export declare function defineNavigator(): void;
export declare const processChildren: (props: Record<string, any>) => any;
/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {HTMLElement} ignoreElement [The element we want to protect from a click]
 * @param  {Function} onSuccess     [Will be called on outside click]
 * @param  {Object} [options]      [Options]
 * @return {DetectOutsideClickClass} [A new instance of DetectOutsideClickClass]
 */
export declare const detectOutsideClick: (ignoreElements: HTMLElement | HTMLElement[] | React.RefObject<HTMLElement>[], onSuccess: (args: {
    event: Event;
}) => void, options?: {
    includedKeys?: string[];
}) => DetectOutsideClickClass;
export declare class DetectOutsideClickClass {
    handleClickOutside: ((event: Event, onDone?: () => void) => void) | null;
    keydownCallback: ((event: KeyboardEvent) => void) | null;
    keyupCallback: ((event: KeyboardEvent) => void) | null;
    constructor(ignoreElementsInput: HTMLElement | HTMLElement[] | React.RefObject<HTMLElement>[], onSuccess: (args: {
        event: Event;
    }) => void, options?: {
        includedKeys?: string[];
    });
    remove(): void;
    checkOutsideClick: ({ event, ignoreElements, }: {
        event: Event;
        ignoreElements: (HTMLElement | React.RefObject<HTMLElement> | null)[];
    }, onSuccess?: (() => void) | null) => void;
}
export declare const checkIfHasScrollbar: (elem: HTMLElement | null) => boolean;
