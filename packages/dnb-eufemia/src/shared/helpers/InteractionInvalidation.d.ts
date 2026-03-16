export type TargetElement = HTMLElement;
export type TargetSelector = string;
export type HTMLElementNode = TargetElement & {
    __ariaHidden: string;
    __tabIndex: string;
};
export type InteractionInvalidationOptions = {
    /**
     * Use false to omit processing aria-hidden. Defaults to true.
     */
    ariaHidden?: boolean;
    /**
     * Use false to omit processing tabindex. Defaults to true.
     */
    tabIndex?: boolean;
};
export declare class InteractionInvalidation {
    bypassElements: Array<TargetElement>;
    bypassSelectors: Array<TargetSelector>;
    _nodesToInvalidate: Array<HTMLElementNode>;
    options: InteractionInvalidationOptions;
    constructor(options?: InteractionInvalidationOptions);
    setBypassElements(bypassElements: Array<TargetElement>): void;
    setBypassSelector(bypassSelector: TargetSelector | Array<TargetSelector>): this;
    activate(targetElement?: TargetElement | TargetSelector): void;
    revert(): void;
    _runInvalidation(targetElement: TargetElement | TargetSelector): void;
    _revertInvalidation(): void;
    getNodesToInvalidate(targetElement?: TargetElement | TargetSelector): Array<HTMLElementNode>;
}
