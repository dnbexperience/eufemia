/**
 * Web DrawerList Helpers
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import type { DrawerListDataArrayItem, DrawerListData, DrawerListDataAll, DrawerListInternalData } from './DrawerList';
import type { DrawerListProviderProps } from './DrawerListProvider';
import type { DrawerListContextState } from './DrawerListContext';
export declare const drawerListDefaultProps: {
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
export declare const drawerListProviderDefaultProps: {
    enableBodyLock: boolean;
    pageOffset: any;
    observerElement: any;
    minHeight: number;
};
export declare function parseContentTitle(dataItem: DrawerListDataArrayItem, { separator, removeNumericOnlyValues, preferSelectedValue, }?: {
    separator?: string;
    removeNumericOnlyValues?: boolean;
    preferSelectedValue?: boolean;
}): string | null;
export declare const hasObjectKeyAsValue: (data: any) => boolean;
export declare function preSelectData(data: DrawerListData): DrawerListDataAll;
/**
 * Takes any of the forms data can have and returns a normalized array representation of it.
 * If the data is a single React.ReactNode, it will return an empty list.
 * @param {*} props object containing the data in props.data or props.children, or the data itself
 * @returns an array representation of the data
 */
export declare function normalizeData(props: any): DrawerListInternalData;
export declare const getData: (props: any) => DrawerListInternalData;
export declare const getCurrentIndex: (value: any, data: any) => any;
export declare const getSelectedItemValue: (value: any, state: any) => any;
export declare const parseCurrentValue: (current: any) => any;
export declare const getEventData: (itemIndex: any, data: any) => any;
export declare const getCurrentData: (itemIndex: any, data: any) => any;
export declare function prepareStartupState(props: DrawerListProviderProps): DrawerListContextState;
export declare const prepareDerivedState: (props: DrawerListProviderProps, state: DrawerListContextState) => DrawerListContextState;
export declare const getCurrentDataTitle: (selectedItem: any, data: any) => string;
export declare const findClosest: (arr: any, val: any) => any;
