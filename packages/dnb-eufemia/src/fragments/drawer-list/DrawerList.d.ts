/**
 * Web List Component
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
import { DrawerListHorizontalItem, DrawerListItem } from './DrawerListItem';
import type { DrawerListItemProps } from './DrawerListItem';
export type DrawerListContent = string | React.ReactNode | (string | React.ReactNode)[];
export type DrawerListDataArrayObjectStrict = {
    /** index of group supplied in the `groups` prop */
    groupIndex?: number;
    selectedValue?: string | React.ReactNode;
    selectedKey?: string | number;
    suffixValue?: string | React.ReactNode;
    content: DrawerListContent;
    disabled?: boolean;
    /** used by Autocomplete for additional search hits */
    searchContent?: string | React.ReactNode | string[];
    /** style prop of the html list item */
    style?: React.CSSProperties;
    /** classname added to the html list item */
    className?: string;
    /** set to true to disable mouse events selected style. Keyboard can still select. */
    ignoreEvents?: boolean;
    /** internal use only */
    render?: (children: React.ReactNode, id: string) => React.ReactNode;
};
export type DrawerListDataArrayObject = {
    [customProperty: string]: any;
} & DrawerListDataArrayObjectStrict;
export type DrawerListDataArrayItem = DrawerListDataArrayObject | DrawerListContent;
export type DrawerListDataArray = DrawerListDataArrayItem[];
export type DrawerListDataRecord = Record<string, DrawerListContent>;
export type DrawerListDataAll = DrawerListDataRecord | DrawerListDataArray;
export type DrawerListSize = 'default' | 'small' | 'medium' | 'large' | number;
export type DrawerListGroup<T> = {
    groupTitle: React.ReactNode;
    groupData: T;
    /** Make title screen reader only */
    hideTitle?: boolean;
};
export type DrawerListGroupTitles = React.ReactNode[];
export type DrawerListOptionsRender = ({ data, Items, Item, }: {
    data: DrawerListDataArrayObject[];
    Items: () => React.ReactNode;
    Item: React.ComponentType<DrawerListItemProps>;
}) => React.ReactNode;
export type DrawerListValue = string | number;
export type DrawerListData = string | ((...args: any[]) => DrawerListDataAll) | DrawerListDataAll;
export type DrawerListSuffix = React.ReactNode;
export interface DrawerListProps {
    id?: string;
    role?: string;
    /**
     * Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
     */
    cacheHash?: string;
    /**
     * Position of the arrow on the popup drawer. Set to 'left' or 'right'. Defaults to 'left' if not set.
     */
    arrowPosition?: string;
    /**
     * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).
     */
    scrollable?: boolean;
    /**
     * If set to `true`, the element is then focusable by assertive technologies.
     */
    focusable?: boolean;
    /**
     * Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.
     */
    direction?: 'auto' | 'top' | 'bottom';
    size?: DrawerListSize;
    /**
     * Defines the minimum height (in `rem`) of the options list.
     */
    minHeight?: string | number;
    /**
     * Defines the maximum height (in `rem`) of the options list.
     */
    maxHeight?: string | number;
    /**
     * To disable appear/disappear (show/hide) animation.
     */
    noAnimation?: boolean;
    /**
     * To disable scrolling animation.
     */
    noScrollAnimation?: boolean;
    /**
     * If set to `true`, the DrawerList will then not make any permanent selection.
     */
    preventSelection?: boolean;
    actionMenu?: boolean;
    isPopup?: boolean;
    /**
     * Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `moreMenu` - or if an independent width is used.
     */
    alignDrawer?: 'left' | 'right';
    /**
     * Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.
     */
    optionsRender?: DrawerListOptionsRender;
    /**
     * Has to be an HTML Element, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.
     */
    wrapperElement?: string | HTMLElement;
    /**
     * Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to null.
     */
    defaultValue?: DrawerListValue;
    /**
     * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
     */
    value?: DrawerListValue;
    /**
     * To disable the React Portal behavior.
     */
    skipPortal?: boolean;
    /**
     * Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
     */
    portalClass?: string;
    /**
     * Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.
     */
    listClass?: string;
    /**
     * If set to `true`, the DrawerList will not close on any events.
     */
    preventClose?: boolean;
    /**
     * If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.
     */
    independentWidth?: boolean;
    /**
     * If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.
     */
    fixedPosition?: boolean;
    /**
     * If set to `true`, the DrawerList will close on outside clicks, but not on selection.
     */
    keepOpen?: boolean;
    preventFocus?: boolean;
    /**
     * If set to `true`, search items by the first key will be ignored.
     */
    skipKeysearch?: boolean;
    /**
     * If set to `true`, the DrawerList will be open. Use together with onHide/onShow to control visibility.
     */
    open?: boolean;
    data?: DrawerListData;
    groups?: DrawerListGroupTitles;
    /**
     * If set to `true`, all keyboard and mouse events will be ignored.
     */
    ignoreEvents?: boolean;
    className?: string;
    /** Accepts the same values as the `data` prop. Will be ignored if `data` is used. Can also accept a single child for custom rendering. */
    children?: DrawerListData | React.ReactElement;
    suffix?: DrawerListSuffix;
    /**
     * If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.
     */
    enableBodyLock?: boolean;
    /**
     * Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).
     */
    pageOffset?: string | number;
    /**
     * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.
     */
    observerElement?: string | React.ReactNode;
    onOpen?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
    handleDismissFocus?: (...args: any[]) => any;
    onChange?: (...args: any[]) => any;
    onPreChange?: (...args: any[]) => any;
    onResize?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
}
export type DrawerListInternalItem = {
    __id: number;
} & DrawerListDataArrayObject;
export type DrawerListInternalData = Array<DrawerListInternalItem>;
export type DrawerListRenderData = Array<DrawerListGroup<DrawerListInternalData>>;
export type DrawerListAllProps = DrawerListProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size' | 'label' | 'placeholder' | 'data' | 'children' | 'onChange' | 'onSelect' | 'onResize'>;
declare function DrawerList(props: DrawerListAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerList {
    var blurDelay: number;
    var Options: React.MemoExoticComponent<({ children, className, triangleRef, cacheHash, showFocusRing, hasGroups, ref, ...rest }: DrawerListOptionsProps & {
        ref?: React.Ref<HTMLUListElement | HTMLSpanElement>;
    }) => import("react/jsx-runtime").JSX.Element>;
    var Item: typeof DrawerListItem;
    var HorizontalItem: typeof DrawerListHorizontalItem;
}
export type DrawerListOptionsProps = React.HTMLProps<HTMLUListElement> & {
    children: React.ReactNode;
    triangleRef?: React.Ref<HTMLLIElement | HTMLSpanElement>;
    cacheHash?: string;
    showFocusRing?: boolean;
    hasGroups?: boolean;
};
export default DrawerList;
