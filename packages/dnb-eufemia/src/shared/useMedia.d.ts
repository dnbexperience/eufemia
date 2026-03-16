import type { MediaQueryCondition, MediaQueryBreakpoints, MediaQueryOptions } from './MediaQueryUtils';
export type UseMediaProps = {
    /**
     * Give a initial value, that is used during SSR as well.
     * Default: null
     */
    initialValue?: Partial<UseMediaResult>;
    /**
     * If set to true, no MediaQuery will be used.
     * Default: false
     */
    disabled?: MediaQueryOptions['disabled'];
    /**
     * Provide a custom breakpoint
     * Default: defaultBreakpoints
     */
    breakpoints?: MediaQueryBreakpoints;
    /**
     * Provide a custom query
     * Default: defaultQueries
     */
    queries?: Record<string, MediaQueryCondition>;
    /**
     * For debugging
     */
    log?: boolean;
    /**
     * Not documented as of now. For internal use only.
     * Default: true
     */
    correctRange?: MediaQueryOptions['correctRange'];
};
export type UseMediaQueries = {
    small: MediaQueryCondition;
    medium: MediaQueryCondition;
    large: MediaQueryCondition;
};
export declare const defaultQueries: UseMediaQueries;
export type UseMediaResult = {
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
    isSSR: boolean;
    key: Keys;
};
/**
 * Internal stuff
 */
type Keys = keyof UseMediaQueries;
export default function useMedia(props?: UseMediaProps): UseMediaResult;
export {};
