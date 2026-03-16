import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { UseDataReturnGetValue, UseDataReturnFilterData, UseDataReturnVisibleData } from './useData';
type SetDataReturn<Data> = {
    data: Data;
    getValue: UseDataReturnGetValue<Data>;
    filterData: UseDataReturnFilterData<Data>;
    reduceToVisibleFields: UseDataReturnVisibleData<Data>;
};
export default function getData<Data>(id: SharedStateId): SetDataReturn<Data>;
export {};
