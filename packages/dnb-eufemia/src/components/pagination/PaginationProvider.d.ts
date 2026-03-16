/**
 * Web Pagination Provider
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import Context from '../../shared/Context';
import type { PaginationProps } from './Pagination';
export interface PaginationProviderProps extends PaginationProps {
    rerender?: {
        current?: (...args: any[]) => any;
    };
    store?: {
        current?: any;
    };
    useMarkerOnly?: boolean;
    internalContent?: any;
    [key: string]: unknown;
}
interface PaginationProviderState {
    items: any[];
    isLoading: boolean;
    currentPageInternal?: number;
    startupPage?: number;
    pageCountInternal?: number;
    lowerPage?: number;
    upperPage?: number;
    hasEndedInfinity?: boolean;
    parallelLoadCount?: number;
    minTime?: number;
    placeMakerBeforeContent?: boolean;
    [key: string]: unknown;
}
export default class PaginationProvider extends React.PureComponent<PaginationProviderProps, PaginationProviderState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    rerender: any;
    rerenderTimeout: ReturnType<typeof setTimeout>;
    resetContentTimeout: ReturnType<typeof setTimeout>;
    resetInfinityTimeout: ReturnType<typeof setTimeout>;
    callOnPageUpdateTimeout: ReturnType<typeof setTimeout>;
    _isMounted: boolean;
    _updateStack: Array<(() => void) | undefined>;
    static defaultProps: {
        startupPage: any;
        currentPage: any;
        pageCount: any;
        setContentHandler: any;
        resetContentHandler: any;
        resetPaginationHandler: any;
        endInfinityHandler: any;
        rerender: any;
        store: any;
        useMarkerOnly: any;
        internalContent: any;
        children: any;
    };
    static getDerivedStateFromProps(props: any, state: any): any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate({ currentPage: current, internalContent: content, }: any): void;
    setContent: (newContent: any, content?: any, position?: any) => void;
    resetContent: () => void;
    resetInfinity: (pageNumber?: number) => void;
    startInfinity: () => void;
    endInfinity: () => void;
    setItems: (items: any[], cb?: () => void) => void;
    prefillItems: (pageNumber: any, props?: any, items?: any[]) => any[];
    setStateHandler: (state: any, cb?: () => void) => void;
    callOnPageUpdate: () => void;
    updatePageContent: (pageNumber?: number) => void;
    onPageUpdate: (fn: () => void) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
