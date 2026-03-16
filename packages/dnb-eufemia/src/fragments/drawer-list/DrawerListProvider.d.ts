/**
 * Web DrawerList Provider
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import Context from '../../shared/Context';
import type { DetectOutsideClickClass } from '../../shared/component-helper';
import type { DrawerListContextState } from './DrawerListContext';
import type { SpacingProps } from '../../shared/types';
import type { DrawerListProps, DrawerListData, DrawerListInternalData } from './DrawerList';
export type DrawerListProviderProps = Omit<DrawerListProps, 'children'> & Omit<React.HTMLProps<HTMLElement>, 'data' | 'role' | 'size' | 'value'> & SpacingProps & {
    hasFocusOnElement?: boolean;
    setData?: (data: DrawerListData, cb?: (data: DrawerListInternalData) => void, { overwriteOriginalData, }?: {
        overwriteOriginalData?: boolean;
    }) => DrawerListProvider;
    setState?: (state: Partial<DrawerListContextState>, cb?: () => void) => void;
    setWrapperElement?: (wrapperElement?: string | HTMLElement) => DrawerListProvider;
    setHidden?: (args?: unknown[], onStateComplete?: () => void) => void;
    selectItemAndClose?: (itemToSelect: string | number, args?: {
        fireSelectEvent?: boolean;
        event?: React.SyntheticEvent | Event | Record<string, unknown>;
    }) => void;
    selectedItem?: string | number;
    activeItem?: string | number;
    showFocusRing?: boolean;
    closestToTop?: string;
    closestToBottom?: string;
    skipPortal?: boolean;
    addObservers?: () => void;
    removeObservers?: () => void;
    setVisible?: (args?: Record<string, unknown>, onStateComplete?: () => void) => void;
    toggleVisible?: (...args: unknown[]) => void;
    selectItem?: (itemToSelect: string | number, args?: {
        fireSelectEvent?: boolean;
        event?: React.SyntheticEvent | Event;
        closeOnSelection?: boolean;
    }) => void;
    scrollToItem?: (activeItem: string | number, opt?: {
        scrollTo?: boolean;
        element?: HTMLElement;
    }) => void;
    setActiveItemAndScrollToIt?: (activeItem: string | number, args?: {
        fireSelectEvent?: boolean;
        scrollTo?: boolean;
        event?: React.SyntheticEvent | Event;
    }) => void;
    _refShell?: React.RefObject<HTMLSpanElement>;
    _refTriangle?: React.RefObject<HTMLLIElement & HTMLSpanElement>;
    _refUl?: React.RefObject<HTMLUListElement>;
    _refRoot?: React.RefObject<HTMLSpanElement>;
    _rootElem?: Window | Element;
    attributes?: Record<string, any>;
    children: React.ReactNode;
};
export default class DrawerListProvider extends React.PureComponent<DrawerListProviderProps, DrawerListContextState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    static defaultProps: {
        enableBodyLock: boolean;
        pageOffset: any;
        observerElement: any;
        minHeight: number;
        id: any;
        role: string;
        cacheHash: any;
        arrowPosition: string;
        scrollable: boolean;
        focusable: boolean;
        maxHeight: any;
        direction: string;
        size: string;
        noAnimation: boolean;
        noScrollAnimation: boolean;
        preventSelection: boolean;
        actionMenu: boolean;
        isPopup: boolean;
        alignDrawer: string;
        wrapperElement: any;
        defaultValue: any;
        value: string;
        portalClass: any;
        listClass: any;
        skipPortal: any;
        preventClose: boolean;
        keepOpen: boolean;
        preventFocus: boolean;
        fixedPosition: boolean;
        independentWidth: boolean;
        skipKeysearch: boolean;
        open: any;
        data: any;
        rawData: any;
        ignoreEvents: any;
        className: any;
        children: any;
        onOpen: any;
        onClose: any;
        handleDismissFocus: any;
        onChange: any;
        onPreChange: any;
        onResize: any;
        onSelect: any;
        optionsRender: any;
    };
    static blurDelay: number;
    static isOpen: boolean;
    static getDerivedStateFromProps(props: any, state: any): DrawerListContextState;
    attributes: object;
    _refRoot: React.RefObject<HTMLSpanElement>;
    _refShell: React.RefObject<HTMLSpanElement>;
    _refUl: React.RefObject<HTMLUListElement>;
    _refTriangle: React.RefObject<HTMLLIElement & HTMLSpanElement>;
    _showTimeout: NodeJS.Timeout;
    _hideTimeout: NodeJS.Timeout;
    _scrollTimeout: NodeJS.Timeout;
    _directionTimeout: NodeJS.Timeout;
    itemSpots: {
        [customProperty: number]: {
            id: string;
        };
    };
    itemSpotsCount: number;
    setOnScroll: () => void;
    _bodyLockIsEnabled: boolean;
    setDirection: () => void;
    _rootElem: Window | Element;
    changedOrderFor: string;
    searchCache: Record<string, {
        i: number;
    }[]>;
    meta: {
        cmd: boolean;
        ctrl: boolean;
        shift: boolean;
        alt: boolean;
    };
    outsideClick: DetectOutsideClickClass;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    refreshScrollObserver(): void;
    setScrollObserver(): void;
    removeScrollObserver(): void;
    enableBodyLock: () => void;
    disableBodyLock: () => void;
    setDirectionObserver(): void;
    /**
     * Deprecated
     * We should replace all the logic of handling left/right aligned
     * and setting the position, with a PopupMenu component,
     * which uses the logic form Tooltip.
     *
     * EDS-246
     */
    correctHiddenView: () => void;
    findItemByValue(value: any): number;
    scrollToItem: (activeItem: any, { scrollTo, element }?: {
        scrollTo?: boolean;
        element?: any;
    }) => void;
    /**
     * During opening (Dropdown, Autocomplete),
     * and if noting is selected,
     * set scroll to item.
     *
     * @param {number} activeItem The item to set as active
     * @param {object} param1
     * @property {boolean} fireSelectEvent Whether the onSelect event should get emitted
     * @property {boolean} scrollTo Whether the list should animate the scroll to the new active item or not
     * @property {event} event The event object to forward to the emitted events
     */
    setActiveItemAndScrollToIt: (activeItem: any, { fireSelectEvent, scrollTo, event }?: {
        fireSelectEvent?: boolean;
        scrollTo?: boolean;
        event?: any;
    }) => void;
    removeDirectionObserver(): void;
    setWrapperElement: (wrapperElement?: string | HTMLElement) => this;
    getAnchorElem(activeElement: any): any;
    setMetaKey: (e: any) => void;
    onKeyUpHandler: (e: any) => void;
    onKeyDownHandler: (e: any) => void;
    /**
     * Gets the currently selected element inside the DrawerList. Or the list element if nothing is selected.
     */
    getSelectedElement: () => HTMLLIElement | HTMLUListElement;
    getCurrentSelectedItem: () => number;
    /**
     * Gets the currently focused element inside the DrawerList. Or `null` if nothing is focused.
     */
    getActiveElement: () => HTMLLIElement;
    getElementGroup: (element: HTMLLIElement) => HTMLUListElement;
    getCurrentActiveItem: () => number;
    getNextActiveItem: () => number;
    getPrevActiveItem: () => number;
    getFirstItem: () => number;
    getLastItem: () => number;
    getItemData: (element: Element) => number;
    setOutsideClickObserver: () => void;
    removeOutsideClickObserver(): void;
    addObservers: () => void;
    removeObservers: () => void;
    toggleVisible: (...args: any[]) => void;
    setVisible: (args?: {}, onStateComplete?: any) => void;
    setHidden: (args?: {}, onStateComplete?: any) => void;
    setActiveState(active: any): void;
    setDataHandler: (data: any, cb?: any, { overwriteOriginalData }?: {
        overwriteOriginalData?: boolean;
    }) => this;
    setStateHandler: (state: any, cb?: any) => this;
    selectItemAndClose: (itemToSelect: any, args?: {
        fireSelectEvent?: boolean;
        event?: any;
        closeOnSelection?: boolean;
    }) => any;
    selectItem: (itemToSelect: any, { fireSelectEvent, event, closeOnSelection, }?: {
        fireSelectEvent?: boolean;
        event?: any;
        closeOnSelection?: boolean;
    }) => any;
    render(): import("react/jsx-runtime").JSX.Element;
}
