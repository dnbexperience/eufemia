/**
 * Takes all component properties and filters out all internal used properties
 *
 * @returns object {props, htmlAttributes}
 */
export declare const useFilteredProps: () => {
    props: any;
    htmlAttributes: Readonly<Record<string, unknown>>;
};
