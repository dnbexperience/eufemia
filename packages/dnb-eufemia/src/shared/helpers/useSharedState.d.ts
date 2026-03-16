import type React from 'react';
export type SharedStateId = string | (() => void) | Promise<() => void> | React.Context<any> | Record<string, unknown>;
/**
 * The shared state will be deleted when all components have been unmounted.
 */
export declare function useWeakSharedState<Data>(id: SharedStateId | undefined, 
/** The initial data for the shared state. */
initialData?: Data, 
/** Optional callback function to be called when the shared state is set from another instance/component. */
onChange?: any): {
    get: () => Data;
    data: Data;
    hadInitialData: boolean;
    update: (newData: Data, opts?: Options) => void;
    set: (newData: Data) => void;
    extend: (newData: Data, opts?: Options) => void;
};
/**
 * Custom hook that provides shared state functionality.
 */
export declare function useSharedState<Data>(
/** The identifier for the shared state. */
id: SharedStateId | undefined, 
/** The initial data for the shared state. */
initialData?: Data, 
/** Optional callback function to be called when the shared state is set from another instance/component. */
onChange?: any, 
/** Optional configuration options. */
{ 
/** When set to `true`, the shared state will be deleted when all components have been unmounted. */
weak, }?: {
    weak?: boolean;
}): {
    get: () => Data;
    data: Data;
    hadInitialData: boolean;
    update: (newData: Data, opts?: Options) => void;
    set: (newData: Data) => void;
    extend: (newData: Data, opts?: Options) => void;
};
type Subscriber = () => void;
export interface SharedStateReturn<Data = undefined> {
    data: Data;
    get: () => Data;
    set: (newData: Partial<Data>) => void;
    extend: (newData: Partial<Data>, opts?: Options) => void;
    update: (newData: Partial<Data>, opts?: Options) => void;
    subscribersRef?: {
        current: Subscriber[];
    };
}
interface SharedStateInstance<Data> extends SharedStateReturn<Data> {
    subscribe: (subscriber: Subscriber) => void;
    unsubscribe: (subscriber: Subscriber) => void;
    hadInitialData: boolean;
}
type Options = {
    preventSyncOfSameInstance?: boolean;
};
/**
 * Creates a shared state instance with the specified ID and initial data.
 */
export declare function createSharedState<Data>(
/** The identifier for the shared state. */
id: SharedStateId, 
/** The initial data for the shared state. */
initialData?: Data, 
/** Optional configuration options. */
{ 
/** A function that returns true if the component should be rerendered. */
shouldSync, }?: {
    shouldSync?: any;
}): SharedStateInstance<Data>;
/**
 * Creates a reference key for the shared state.
 * You can pass any JavaScript instance as the reference.
 */
export declare function createReferenceKey(ref1: any, ref2: any): any;
export {};
