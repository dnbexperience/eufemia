import type { Mask } from './types';
export declare function convertMaskToPlaceholder(mask?: Mask, placeholderChar?: string): string;
export declare function isArray(value: unknown): value is unknown[];
export declare function isString(value: unknown): value is string;
export declare function isNumber(value: unknown): value is number;
export declare function isNil<T>(value: T | undefined | null): value is undefined | null;
export declare function processCaretTraps(mask: Mask): {
    maskWithoutCaretTraps: Mask;
    indexes: number[];
};
