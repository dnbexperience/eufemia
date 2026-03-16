import type { JsonObject } from '../utils/json-pointer';
import type { FilterData } from '../DataContext/Context';
export type ListAllPropsReturn<Data> = {
    propsOfFields: Data;
    propsOfValues: Data;
};
export type ListAllPropsProps<Data> = {
    log?: boolean;
    generateRef?: React.RefObject<() => ListAllPropsReturn<Data>>;
    filterData?: FilterData;
    children: React.ReactNode;
};
export type GenerateRef<Data extends JsonObject = JsonObject> = ListAllPropsProps<Data>['generateRef']['current'];
export default function ListAllProps<Data extends JsonObject = JsonObject>(props: ListAllPropsProps<Data>): import("react").ReactNode;
