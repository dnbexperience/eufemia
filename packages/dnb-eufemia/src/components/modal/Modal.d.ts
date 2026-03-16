/**
 * Web Modal Component
 *
 */
import React from 'react';
import type { ContextProps } from '../../shared/Context';
import ModalInner from './parts/ModalInner';
import type { ModalProps } from './types';
import ModalHeader from './parts/ModalHeader';
import ModalHeaderBar from './parts/ModalHeaderBar';
import type { ScrollViewAllProps } from '../../fragments/scroll-view/ScrollView';
import CloseButton from './parts/CloseButton';
import type { SpacingProps } from '../../shared/types';
export declare const ANIMATION_DURATION = 300;
interface ModalState {
    hide: boolean;
    modalActive: boolean;
    preventAutoFocus: boolean;
}
export type ModalAllProps = ModalProps & SpacingProps & Omit<ScrollViewAllProps, 'children'>;
declare class Modal extends React.PureComponent<ModalAllProps, ModalState> {
    static contextType: React.Context<ContextProps>;
    context: ContextProps;
    static Bar: typeof ModalHeaderBar;
    static Header: typeof ModalHeader;
    static Content: typeof ModalInner;
    static getContent(props: any): any;
    _id: string;
    _triggerRef: React.RefObject<HTMLElement>;
    _onUnmount: Array<() => void>;
    _openTimeout: NodeJS.Timeout;
    _closeTimeout: NodeJS.Timeout;
    _sideEffectsTimeout: NodeJS.Timeout;
    _tryToOpenTimeout: NodeJS.Timeout;
    activeElement: Element;
    isInTransition: boolean;
    modalContentCloseRef: React.RefObject<(event: Event, options: {
        triggeredBy?: string;
    }) => void>;
    state: {
        hide: boolean;
        modalActive: boolean;
        preventAutoFocus: boolean;
        animationDuration: number;
        noAnimation: boolean;
    };
    static defaultProps: {
        id: any;
        focusSelector: any;
        labelledBy: any;
        title: any;
        disabled: any;
        spacing: boolean;
        openDelay: any;
        contentId: any;
        dialogTitle: string;
        closeTitle: string;
        hideCloseButton: boolean;
        closeButtonAttributes: any;
        preventClose: boolean;
        preventCoreStyle: boolean;
        animationDuration: number;
        noAnimation: boolean;
        noAnimationOnMobile: boolean;
        fullscreen: string;
        minWidth: any;
        maxWidth: any;
        alignContent: string;
        containerPlacement: any;
        verticalAlignment: any;
        open: any;
        directDomReturn: boolean;
        omitTriggerButton: boolean;
        className: any;
        children: any;
        onOpen: any;
        onClose: any;
        onClosePrevent: any;
        openModal: any;
        closeModal: any;
        trigger: any;
        triggerAttributes: any;
        overlayClass: any;
        contentClass: any;
        modalContent: any;
        headerContent: any;
        barContent: any;
    };
    static getDerivedStateFromProps(props: any, state: any): any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    openBasedOnStateUpdate(): void;
    toggleOpenClose: (event?: any, showModal?: any) => void;
    handleSideEffects: () => void;
    open: (e: Event) => void;
    close: (event: Event, { ifIsLatest, triggeredBy }?: {
        ifIsLatest: boolean;
        triggeredBy?: string;
    }) => void;
    removeActiveState(): void;
    /**
     * Prevent scrolling on the background
     * But checks if this instance was the last one or not
     *
     * @param {string} modalId Will remove the attribute if false is given
     */
    setActiveState(modalId: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export { CloseButton, Modal as OriginalComponent };
export default Modal;
