/**
 * Web Modal Component
 *
 */
import React from 'react';
import { InteractionInvalidation } from '../../shared/component-helper';
import type { CloseHandlerParams, ModalContentProps, TriggeredBy } from './types';
import type { ContextProps } from '../../shared/Context';
interface ModalContentState {
    color: string;
}
declare global {
    interface Window {
        __modalStack: any[];
    }
}
export default class ModalContent extends React.PureComponent<ModalContentProps, ModalContentState> {
    state: {
        color: any;
    };
    _contentRef: React.RefObject<HTMLElement>;
    _scrollRef: React.RefObject<HTMLElement>;
    _overlayClickRef: {
        current: null | HTMLElement;
    };
    _id: string;
    _lockTimeout: NodeJS.Timeout;
    _focusTimeout: NodeJS.Timeout;
    _androidFocusTimeout: NodeJS.Timeout;
    _ii: InteractionInvalidation;
    _iiLocal: InteractionInvalidation;
    _triggeredBy: TriggeredBy;
    _triggeredByEvent: React.SyntheticEvent;
    _mounted: number;
    _lastFocusTime: number;
    static contextType: React.Context<ContextProps>;
    context: ContextProps;
    constructor(props: ModalContentProps);
    componentDidUpdate(prevProps: ModalContentProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    wasOpenedManually(): boolean;
    lockBody: () => void;
    removeLocks(): void;
    setAndroidFocusHelper(): void;
    removeAndroidFocusHelper(): void;
    _androidFocusHelper: () => void;
    setFocus(): void;
    removeScrollPossibility(): void;
    revertScrollPossibility(): void;
    preventClick: (event: any) => void;
    onCloseClickHandler: (event: React.SyntheticEvent) => void;
    onContentMouseDownHandler: (event: React.SyntheticEvent) => void;
    onContentClickHandler: (event: React.SyntheticEvent) => void;
    onKeyDownHandler: (event: any) => void;
    setModalContentState: (event: React.SyntheticEvent, { triggeredBy }: CloseHandlerParams) => void;
    closeModalContent(event: any, { triggeredBy, ...params }: CloseHandlerParams & {
        ifIsLatest?: boolean;
    }): void;
    setBackgroundColor: (color: string) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
