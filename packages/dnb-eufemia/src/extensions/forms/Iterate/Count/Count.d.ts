import type { Path } from '../../types';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
export type Props = {
    /**
     * The path (JSON Pointer) to the array or object to count.
     */
    path: Path;
    /**
     * A Form.Handler or DataContext `id` for when called outside of the context.
     */
    id?: SharedStateId;
    /**
     * A filter function to filter the data before counting.
     */
    filter?: (item: unknown) => boolean;
};
export declare function Count(props: Props): number;
export declare function count(props: Props): number;
export declare function useCount(id?: SharedStateId): {
    count: (path: Props["path"], filter?: Props["filter"]) => number;
};
