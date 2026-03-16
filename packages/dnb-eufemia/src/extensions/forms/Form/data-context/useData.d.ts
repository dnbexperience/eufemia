import type { JsonObject } from '../../utils/json-pointer';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { Path } from '../../types';
import type { FilterData, VisibleDataHandler } from '../../DataContext/Context';
type PathImpl<T, P extends string> = P extends `${infer Key}/${infer Rest}` ? Key extends keyof T ? Rest extends '' ? T[Key] : PathImpl<T[Key], Rest> : never : T[P & keyof T];
export type PathType<T, P extends string> = P extends `/${infer Rest}` ? PathImpl<T, Rest> : never;
export type UseDataReturnUpdate<Data> = <P extends Path>(path: P, value: ((value: PathType<Data, P>) => unknown) | unknown) => void;
export type UseDataReturnGetValue<Data> = <P extends Path>(path: P) => PathType<Data, P> | any;
export type UseDataReturnFilterData<Data> = (filterDataHandler: FilterData, data?: Data) => Partial<Data>;
export type UseDataReturnVisibleData<Data> = VisibleDataHandler<Data>;
type UseDataReturn<Data> = {
    data: Data;
    set: (newData: Data) => void;
    update: UseDataReturnUpdate<Data>;
    remove: (path: Path) => void;
    getValue: UseDataReturnGetValue<Data>;
    filterData: UseDataReturnFilterData<Data>;
    reduceToVisibleFields: UseDataReturnVisibleData<Data>;
};
/**
 * Custom hook that provides form data management functionality.
 *
 * @template Data - The type of data being managed.
 * @param {SharedStateId} id - The identifier for the data.
 * @param {Data} initialData - The initial data value (optional).
 * @returns {UseDataReturn<Data>} An object containing the data and data management functions.
 */
export default function useData<Data = JsonObject>(id?: SharedStateId, initialData?: Data): UseDataReturn<Data>;
export {};
