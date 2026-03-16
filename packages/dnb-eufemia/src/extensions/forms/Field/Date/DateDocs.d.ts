import type { PropertiesTableProps } from '../../../../shared/types';
export declare const DateProperties: PropertiesTableProps;
export declare const DateEvents: {
    [x: string]: {
        type: string | string[];
        defaultValue?: string;
        doc: string;
        status: "optional" | "internal" | "required" | "deprecated";
    };
};
