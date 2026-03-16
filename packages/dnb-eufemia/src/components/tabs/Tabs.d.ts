/**
 * Web Tabs Component
 *
 */
import React from 'react';
import { type ContextProps } from '../../shared/Context';
import type { SpacingProps } from '../space/types';
import CustomContent from './TabsCustomContent';
import ContentWrapper from './TabsContentWrapper';
import { type SharedStateReturn } from '../../shared/helpers/useSharedState';
import type { DynamicElement } from '../../shared/types';
import type { ButtonProps } from '../Button';
import type { AnchorAllProps } from '../Anchor';
import type { SectionSpacing, SectionStyleTypes, SectionVariants } from '../Section';
import type { SkeletonShow } from '../Skeleton';
export type TabsData = string | {
    title: string | React.ReactNode | ((...args: any[]) => any);
    key: string | number;
    selected?: boolean;
    disabled?: boolean;
    content?: TabsContent;
}[] | any;
export type TabsContent = Record<string, unknown> | React.ReactNode | ((...args: any[]) => any);
export type TabsTabElement = DynamicElement<null, ButtonProps | AnchorAllProps>;
export type TabsSelectedKey = string | number;
export type TabsAlign = 'left' | 'center' | 'right';
export type TabsChildren = Record<string, unknown> | React.ReactNode | ((...args: any[]) => any);
export interface TabsProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'content' | 'children'>, SpacingProps {
    data?: TabsData;
    /**
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    content?: TabsContent;
    /**
     * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    contentStyle?: SectionStyleTypes | SectionVariants;
    /**
     * To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.
     */
    contentSpacing?: SectionSpacing;
    label?: string;
    /**
     * Define what HTML element should be used. You can provide e.g. `tabElement={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.
     */
    tabElement?: TabsTabElement;
    /**
     * In case one of the tabs should be opened by a `key`.
     */
    selectedKey?: TabsSelectedKey;
    /**
     * To align the tab list on the right side `align="right"`. Defaults to `left`.
     */
    align?: TabsAlign;
    /**
     * To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    tabsStyle?: SectionStyleTypes | SectionVariants;
    /**
     * To modify the `spacing` inside the tab list. Defaults to `null`.
     */
    tabsSpacing?: boolean;
    /**
     * If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.
     */
    noBorder?: boolean;
    /**
     * If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.
     */
    breakout?: boolean;
    /**
     * If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.
     */
    navButtonEdge?: boolean;
    onOpenTabNavigationFn?: (...args: any[]) => any;
    /**
     * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
     */
    prerender?: boolean;
    /**
     * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
     */
    preventRerender?: boolean;
    /**
     * If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.
     */
    scroll?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    id?: string;
    className?: string;
    /**
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    children?: TabsChildren;
    render?: (...args: any[]) => any;
    onChange?: (...args: any[]) => any;
    onMouseEnter?: (...args: any[]) => any;
    onClick?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
}
export interface DummyProps {
    /**
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    children: React.ReactNode;
}
interface TabDataItem {
    title: string | React.ReactNode | ((...args: any[]) => any);
    key: string | number;
    selected?: boolean;
    disabled?: boolean;
    content?: TabsContent;
    [key: string]: unknown;
}
interface TabsState {
    data: TabDataItem[];
    selectedKey: string | number;
    focusKey: string | number;
    atEdge: boolean;
    lastPosition: number;
    hasScrollbar: boolean;
    _selectedKey: string | number;
    _data: TabsData | TabsChildren;
    _listenForPropChanges: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}
type SharedState = SharedStateReturn<Record<string, unknown>> & {
    subscribe: (subscriber: () => void) => void;
    unsubscribe: (subscriber: () => void) => void;
};
export default class Tabs extends React.PureComponent<TabsProps, TabsState> {
    static contextType: React.Context<ContextProps>;
    context: ContextProps;
    _id: string;
    _tabsRef: React.RefObject<HTMLDivElement>;
    _tablistRef: React.RefObject<HTMLDivElement>;
    _sharedState: SharedState | null;
    _isMounted: boolean;
    _cache: Record<string, {
        content: React.ReactNode;
        [key: string]: unknown;
    }>;
    _props: TabsProps;
    static defaultProps: {
        data: any;
        content: any;
        contentStyle: any;
        contentSpacing: boolean;
        label: any;
        tabElement: string;
        selectedKey: any;
        align: string;
        tabsStyle: any;
        tabsSpacing: any;
        noBorder: boolean;
        navButtonEdge: boolean;
        onOpenTabNavigationFn: any;
        prerender: boolean;
        preventRerender: boolean;
        scroll: any;
        skeleton: any;
        id: any;
        className: any;
        children: any;
        render: any;
        onChange: any;
        onMouseEnter: any;
        onClick: any;
        onFocus: any;
        breakout: boolean;
    };
    static Content: typeof CustomContent;
    static ContentWrapper: typeof ContentWrapper;
    static getSelectedKeyOrFallback(selectedKey: TabsSelectedKey | null, data: TabDataItem[]): TabsSelectedKey;
    static getDerivedStateFromProps(props: TabsProps, state: TabsState): TabsState;
    static getData(props: TabsProps): any[];
    constructor(props: TabsProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    init: () => void;
    componentDidUpdate(props: TabsProps): void;
    hasLastPosition(): boolean;
    getLastPosition(): number;
    hasLastUsedTab(): string | -1;
    saveLastUsedTab(): void;
    saveLastPosition(position?: number): void;
    setScrollbarState: ({ hasScrollbar }?: {
        hasScrollbar?: boolean;
    }) => void;
    onResizeHandler: () => void;
    hasScrollbar(): boolean;
    addScrollBehavior(): void;
    onTablistKeyDownHandler: (e: any) => void;
    focusFirstTab: (e: any) => void;
    focusLastTab: (e: any) => void;
    focusPrevTab: (e: any) => void;
    focusNextTab: (e: any) => void;
    openPrevTab: (e: any) => void;
    openNextTab: (e: any) => void;
    handleVerticalScroll: () => void;
    setLeftPosition(scrollLeft: any): void;
    scrollToTab({ type, behavior, }: {
        type: string;
        behavior?: ScrollBehavior;
    }): void;
    onMouseDown: (event: any) => void;
    onKeyDownHandler: (event: any) => void;
    onMouseEnterHandler: (event: any) => void;
    onClickHandler: (event: any) => void;
    getCurrentKey: (event: React.SyntheticEvent) => string;
    getCurrentTitle: (selectedKey?: string | number) => string | number | bigint | true | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>> | ((...args: any[]) => any);
    getStepKey(useKey: any, stateKey: any): string | number | TabDataItem;
    focusTab: (focusKey: any, event?: any, mode?: any) => void;
    setWhatInput(): void;
    resetWhatInput(): void;
    setFocusOnTabButton: () => void;
    warnAboutMissingContainer(): void;
    openTab: (selectedKey: any, event?: any, mode?: any) => void;
    getEventArgs(args: any): any;
    isFocus(tabKey: any): boolean;
    isSelected(tabKey: any): boolean;
    renderCachedContent(): import("react/jsx-runtime").JSX.Element[];
    renderContent(): any;
    getContent: (selectedKey: any) => any;
    TabsWrapperHandler: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => import("react/jsx-runtime").JSX.Element;
    TabsListHandler: ({ children, className, ...rest }: React.PropsWithChildren<{
        className?: string;
    } & Record<string, unknown>>) => import("react/jsx-runtime").JSX.Element;
    TabContentHandler: () => import("react/jsx-runtime").JSX.Element;
    TabsHandler: (props: Record<string, unknown>) => import("react/jsx-runtime").JSX.Element;
    render(): any;
}
export declare const Dummy: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export {};
