import type { AccordionContextProps } from './AccordionContext';
type AccordionStoreInstance = {
    context: AccordionContextProps;
    _id: string;
    close: () => void;
};
export declare class AccordionStore {
    _instances: Array<AccordionStoreInstance>;
    _id: string;
    constructor(id: string);
    onChange({ id }: {
        id: string;
    }): void;
    addInstance(instance: AccordionStoreInstance): void;
    removeInstance(instance: any): void;
}
export type StoreDataReturn = {
    id: string;
    expanded: boolean;
};
export type StoreOptions = {
    force?: boolean;
};
type StoreProps = {
    id?: string;
    group?: string;
};
export declare class Store {
    id?: string;
    group?: string;
    constructor({ id, group }: StoreProps);
    storeId(id?: string): string;
    saveState(expanded: boolean, id?: string, opts?: StoreOptions): void;
    getData(id?: string): StoreDataReturn;
    getState(id?: string): any;
    flush(id?: string): void;
}
export declare function rememberWarning(type?: string): void;
export {};
