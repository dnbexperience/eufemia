/**
 * Source for a non maintained repo:
 * https://github.com/text-mask/text-mask/tree/master/core/src
 */
import type { Mask, MaskFunction, Pipe } from './types';
export type CreateTextMaskConfig = {
    inputElement?: HTMLInputElement | null;
    mask: Mask | MaskFunction | false | {
        mask: Mask | MaskFunction;
        pipe?: Pipe;
    };
    guide?: boolean;
    pipe?: Pipe;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    showMask?: boolean;
};
export type TextMaskInputController = {
    state: {
        previousConformedValue?: string;
        previousPlaceholder?: string;
    };
    update: (rawValue?: string | number | null, config?: CreateTextMaskConfig) => void;
};
export default function createTextMaskInputElement(config: CreateTextMaskConfig): TextMaskInputController;
export declare function safeSetSelection(element: HTMLInputElement, selectionPosition: number): void;
