/**
 * Web GlobalStatus Provider
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import type { ReactNode } from 'react';
type StatusProps = {
    statusId?: string;
    show?: boolean | string;
    text?: ReactNode;
    children?: ReactNode;
    items?: (StatusItem | string)[] | string;
    item?: StatusItem | string;
    bufferDelay?: number;
    [key: string]: any;
};
type StatusItem = {
    itemId?: string;
    text?: any;
    [key: string]: any;
};
type GlobalStatusResult = {
    statusId?: string;
    items?: StatusItem[];
    [key: string]: any;
};
type OnUpdateCallback = (globalStatus: GlobalStatusResult, props: StatusProps | null, opts: {
    isEmpty?: boolean;
}) => void;
type OnReadyEntry = {
    status: GlobalStatusProviderItem;
    cb: ((status: GlobalStatusProviderItem) => void) | null;
};
export declare class GlobalStatusProviderItem {
    internalId: string;
    constructor(id: string, props?: StatusProps | null);
    onUpdate(event: OnUpdateCallback): void;
    forceRerender(globalStatus: GlobalStatusResult, props: StatusProps | null, { bufferDelay, isEmpty }?: {
        bufferDelay?: number;
        isEmpty?: boolean;
    }): void;
    init(props: StatusProps): GlobalStatusResult;
    add(props: StatusProps, opts?: {
        preventRerender?: boolean;
    }): GlobalStatusResult;
    get(statusId: string): StatusProps;
    update(statusId: string, newProps: StatusProps, opts?: {
        preventRerender?: boolean;
        preventRestack?: boolean;
    }): void;
    restack(statusId: string): void;
    remove(statusId: string, opts?: {
        preventRerender?: boolean;
        bufferDelay?: number;
        [key: string]: unknown;
    }): void;
    empty(): void;
    unbind(): void;
    isReady(): boolean;
    addOnReady(status: GlobalStatusProviderItem, cb: (status: GlobalStatusProviderItem) => void): void;
    stack: StatusProps[];
    globalStatus: GlobalStatusResult;
    _onUpdateEvents: (OnUpdateCallback | null)[];
    _onReadyEvents: OnReadyEntry[];
    _bufferDelayId: ReturnType<typeof setTimeout> | undefined;
}
declare class GlobalStatusProvider {
    static providers: Record<string, GlobalStatusProviderItem>;
    static create: (id?: string, props?: StatusProps | null) => GlobalStatusProviderItem;
    static init(id?: string, onReady?: ((status: GlobalStatusProviderItem) => void) | null, props?: StatusProps | null): GlobalStatusProviderItem;
    static get(id?: string): GlobalStatusProviderItem | null;
    static remove(id?: string): void;
    static prepareItemWithStatusId(item: StatusItem | string, statusId?: string | null): StatusItem;
    static combineMessages(stack: StatusProps[]): GlobalStatusResult;
}
export default GlobalStatusProvider;
