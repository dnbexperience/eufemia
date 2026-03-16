import React from 'react';
import type { Mask, MaskFunction, Pipe } from './text-mask/types';
export type TextMaskMask = Mask | MaskFunction | boolean | {
    mask?: Mask | MaskFunction;
    pipe?: Pipe;
};
export type TextMaskInputElement = React.ReactElement;
export type TextMaskValue = string | number;
export interface TextMaskProps extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
    mask: TextMaskMask;
    inputRef?: React.RefObject<HTMLInputElement>;
    inputElement?: TextMaskInputElement;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    guide?: boolean;
    value?: TextMaskValue;
    pipe?: Pipe;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    showMask?: boolean;
    ref?: React.Ref<TextMaskHandle>;
}
export interface TextMaskHandle {
    inputRef: React.RefObject<HTMLInputElement>;
}
export default function TextMask({ inputElement, inputRef: externalInputRef, mask, guide, pipe, placeholderChar, keepCharPositions, value, onChange, showMask, ref, ...props }: TextMaskProps): React.JSX.Element;
