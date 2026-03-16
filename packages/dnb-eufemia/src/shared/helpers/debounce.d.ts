type ReturnHelpers = {
    cancel: () => void;
    addCancelEvent: (fn: () => void) => () => boolean;
};
type DebouncedFunction<T extends any[], R> = (...args: T) => R;
type DebouncedOptions = {
    /**
     * Whether to execute the debounced function immediately.
     */
    immediate?: boolean;
    /**
     * The instance to bind the debounced function to.
     */
    instance?: any;
    /**
     * Whether to return a promise that resolves with the result of the debounced function.
     */
    async?: boolean;
};
/**
 * Debounces a function in async to be executed after a specified wait time.
 */
export declare function debounceAsync<T extends any[], R>(debouncedFunction: DebouncedFunction<T, R>, wait?: number, opts?: Omit<DebouncedOptions, 'async'>): DebouncedFunction<T, R> & ReturnHelpers;
/**
 * Debounces a function to be executed after a specified wait time.
 */
export declare function debounce<T extends any[], R>(debouncedFunction: DebouncedFunction<T, R>, wait?: number, { immediate, instance, async, }?: DebouncedOptions): DebouncedFunction<T, R> & ReturnHelpers;
export {};
