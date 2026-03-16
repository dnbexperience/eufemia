/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import Context from '../../shared/Context';
import PaginationContext from './PaginationContext';
export interface InfinityScrollerProps {
    children?: React.ReactNode;
}
export default class InfinityScroller extends React.PureComponent<InfinityScrollerProps> {
    static contextType: React.Context<Record<string, any>>;
    context: React.ContextType<typeof PaginationContext>;
    static defaultProps: {
        children: any;
    };
    hideIndicator: boolean;
    useLoadButton: boolean;
    lastElement: React.RefObject<any>;
    callOnUnmount: Array<any>;
    _startupTimeout: ReturnType<typeof setTimeout>;
    _bufferTimeout: ReturnType<typeof setTimeout>;
    callbackBuffer: Array<{
        fn: (...args: any[]) => any;
        params: any;
    }>;
    _lastCall: number;
    constructor(props: any, context: any);
    componentWillUnmount(): void;
    startup: () => void;
    getNewContent: (newPageNo: number, props?: any, { callStartupEvent, preventWaitForDelay }?: any) => any;
    waitForReachedTime(fn: (...args: any[]) => any, params: any): void;
    callBuffer({ minTime }?: any): void;
    callEventHandler(pageNumber: number, { callStartupEvent, preventWaitForDelay, callOnEnd, onDispatch, }?: any): void;
    handleInfinityMarker(): import("react/jsx-runtime").JSX.Element;
    render(): any;
}
export interface InfinityLoadButtonProps {
    element?: React.ElementType;
    pressedElement?: React.ReactNode;
    icon?: string;
    text?: string;
    iconPosition?: 'left' | 'right' | 'top';
    onClick?: (...args: any[]) => any;
}
interface InfinityLoadButtonState {
    isPressed: boolean;
}
export declare class InfinityLoadButton extends React.PureComponent<InfinityLoadButtonProps, InfinityLoadButtonState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    static defaultProps: {
        element: string;
        pressedElement: any;
        icon: string;
        text: any;
        iconPosition: string;
    };
    state: {
        isPressed: boolean;
    };
    onClickHandler: (e: React.MouseEvent) => void;
    render(): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>;
}
export {};
