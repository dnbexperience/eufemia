export type DefaultsProps = Record<string, unknown>;
export type Contexts = Array<Record<string, unknown>>;
/**
 * Overrides default props with values from context.
 *
 * "undefined" is considered the default value of a prop
 * unless otherwise provided
 *
 * @param props object of component properties
 * @param defaults object of default values
 * @param contexts one or more contexts to merge
 * @returns merged properties
 */
export declare function extendPropsWithContext<Props>(props: Props, defaults?: DefaultsProps, ...contexts: Contexts): Props & {};
export declare function extendPropsWithContextInClassComponent<Props>(props: Props, defaults?: DefaultsProps, ...contexts: Contexts): Props & {};
export declare function reduceContext(contexts: Contexts): Record<string, unknown>;
