/**
 * Filters out props from a given object/context
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object of component properties
 * @param validKeys object with keys that should get returned
 * @param excludeKeys object with keys that should be excluded
 * @returns filtered properties
 */
export declare function filterValidProps<T extends Record<string, unknown>>(props: T | any, validKeys?: Record<string, unknown>, excludeKeys?: Record<string, unknown>): T;
/**
 * Filters out props from a given object/context
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object of form component properties
 * @param excludeProps object with keys that should be excluded
 * @returns filtered properties
 */
export declare function pickFormElementProps(props: FormElementProps, excludeProps?: Record<string, unknown>): Record<string, unknown>;
export declare function prepareFormElementContext<Props>(props: Props & FormElementProps): Props & FormElementProps;
export type FormElementProps = {
    disabled?: boolean;
    vertical?: boolean;
    labelDirection?: 'vertical' | 'horizontal';
};
