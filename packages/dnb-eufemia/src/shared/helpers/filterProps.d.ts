/**
 * Filters out props from a given object/array
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object|array|function of component properties
 * @param remove object|array|function with keys that should be excluded
 * @param allowed object|array|function with keys that should be included
 * @returns filtered properties
 */
export declare function filterProps<Props = FilterProps>(props: Props, remove?: FilterPropsRemove, allowed?: FilterPropsAllowed): Props;
export type FilterProps = Record<string, unknown> | Array<string | number>;
export type FilterPropsValidationTypes = Record<string, unknown> | Array<string | number> | ((key: string) => boolean);
export type FilterPropsRemove = FilterPropsValidationTypes;
export type FilterPropsAllowed = FilterPropsValidationTypes;
