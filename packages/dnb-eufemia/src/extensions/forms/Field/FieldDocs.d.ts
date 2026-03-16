import type { PropertiesTableProps } from '../../../shared/types';
export declare const FieldProperties: PropertiesTableProps;
export declare const FieldEvents: PropertiesTableProps;
export declare const getFieldEventsWithTypes: (valueType?: {
    type: string;
    optional?: boolean;
}, additionalArgsType?: {
    type: string;
    optional?: boolean;
}) => PropertiesTableProps;
