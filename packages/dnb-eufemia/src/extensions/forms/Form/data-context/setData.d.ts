import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { UseDataReturnUpdate } from './useData';
type SetDataReturn<Data> = {
    update: UseDataReturnUpdate<Data>;
};
export default function setData<Data>(id: SharedStateId, data?: Data): SetDataReturn<Data>;
export {};
