import type { formatReturnValue } from '../number-format/NumberUtils';
import type { NumberFormatTypes, ValueTypes } from './types';
export declare const percentToValue: (percent: number, min: number, max: number, isReverse: boolean) => number;
export declare const getOffset: (node: HTMLElement) => {
    top: number;
    left: number;
};
export declare const getMousePosition: (event: MouseEvent & TouchEvent) => {
    x: number;
    y: number;
};
export declare const calculatePercent: (node: HTMLElement, event: MouseEvent | TouchEvent, isVertical: boolean) => number;
export declare const clamp: (value: number, min?: number, max?: number) => number;
export declare const roundValue: (value: number, { step, min, max }: {
    step: number;
    min: number;
    max: number;
}) => number;
export declare const createMockDiv: ({ width, height }: {
    width: any;
    height: any;
}) => HTMLDivElement;
export declare const getUpdatedValues: (value: Array<number>, index: number, newValue: number) => ValueTypes;
export declare const closestIndex: (goal: number, array: Array<number>) => number;
export declare const getFormattedNumber: (value: number, numberFormat: NumberFormatTypes) => formatReturnValue | {
    number: string;
    aria: string;
};
