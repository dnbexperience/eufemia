import type { JsonObject } from '../utils/json-pointer';
import type { FilterData } from '../DataContext/Context';
import type { JSONSchema } from '../types';
export type GenerateSchemaReturn = {
    schema: JSONSchema;
    data: JsonObject;
    propsOfFields: JsonObject;
    propsOfValues: JsonObject;
};
export type GenerateSchemaProps = {
    log?: boolean;
    generateRef?: React.RefObject<() => GenerateSchemaReturn>;
    filterData?: FilterData;
    children: React.ReactNode;
};
export type GenerateRef = GenerateSchemaProps['generateRef']['current'];
export declare const schemaParams: string[];
export default function GenerateSchema(props: GenerateSchemaProps): import("react").ReactNode;
