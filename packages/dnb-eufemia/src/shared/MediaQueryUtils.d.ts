export type MediaQuerySizes = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
export type MediaQueryBreakpoints = Partial<Record<MediaQuerySizes, string>>;
export declare const defaultBreakpoints: MediaQueryBreakpoints;
export type MediaQueryCondition = {
    min?: number | string | MediaQuerySizes;
    max?: number | string | MediaQuerySizes;
    screen?: boolean;
    minWidth?: number | string | MediaQuerySizes;
    maxWidth?: number | string | MediaQuerySizes;
    orientation?: string;
    not?: boolean;
    all?: boolean;
    monochrome?: boolean;
    aspectRatio?: string;
} | string;
export type MediaQueryProperties = {
    /**
     * A MediaQuery as a string similar to the CSS API, but without `@media`.
     */
    query?: MediaQueryCondition;
    /**
     * Define a list of sizes to match, given as an object `{ min: 'small', max: 'medium' }` or as an array `[{ min: 'small', max: 'medium' }, { min: 'medium', max: 'large' }]`.
     */
    when?: MediaQueryCondition | Array<MediaQueryCondition>;
    /**
     * Reverts the defined queries as a whole.
     */
    not?: boolean;
} & MediaQueryCondition;
export type MediaQueryOptions = {
    /**
     * If set to true, no MediaQuery will be used.
     */
    disabled?: boolean;
    /**
     * Will correct the size of the media query ranges (e.g. medium will be from 40.0625em to 60em)
     * Default: true
     */
    correctRange?: boolean;
    /**
     * For debugging
     */
    log?: boolean;
};
export type MediaQueryListener = () => void;
export type MediaQueryProps = {
    /**
     * If set to true, it will match and return the given children during SSR.
     */
    matchOnSSR?: boolean;
    children?: React.ReactNode;
} & MediaQueryProperties & MediaQueryOptions;
export type MediaQueryState = {
    match?: boolean | null;
    mediaQueryList?: {
        matches: boolean;
    };
};
/**
 * Adds a listener to a given MediaQuery
 */
export declare function onMediaQueryChange(property: MediaQueryProperties | string, callback?: (matches: boolean, mediaQueryList: MediaQueryList) => void, { runOnInit }?: {
    runOnInit?: boolean;
}): MediaQueryListener;
/**
 * Returns a boolean for whether window.matchMedia is supported or not
 */
export declare const isMatchMediaSupported: () => boolean;
/**
 * Convert user defined media queries to an valid MediaQueryList we can assign a listener to
 */
export declare function makeMediaQueryList({ query, when, not }?: MediaQueryProperties, breakpoints?: MediaQueryBreakpoints, options?: MediaQueryOptions): MediaQueryList;
/**
 * Adds a listener to the window.matchMedia Browser API
 */
export declare function createMediaQueryListener(mediaQueryList: MediaQueryList, callback: (matches: boolean, event: Partial<MediaQueryListEvent>) => void): MediaQueryListener;
/**
 * Builds a valid media query we can use on window.matchMedia(...)
 */
export declare function buildQuery({ query, when, not }?: MediaQueryProperties, breakpoints?: MediaQueryBreakpoints, options?: MediaQueryOptions): MediaQueryCondition;
/**
 * Convert a media query from various formats to a valid string based media query
 */
export declare function convertToMediaQuery(query: MediaQueryCondition | Array<MediaQueryCondition>, breakpoints?: MediaQueryBreakpoints, options?: MediaQueryOptions): string;
