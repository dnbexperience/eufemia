import React from 'react';
import type { InputProps } from '../Input';
import type { SpacingProps } from '../space/types';
import type { FormStatusState, FormStatusText } from '../FormStatus';
export type MultiInputMaskInput<T extends string> = {
    /**
     * Defines the id for the input. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` parameters.
     */
    id: T;
    /**
     * Label used by the input. The label itself is hidden, but required to uphold accessibility standards for screen readers.
     */
    label: React.ReactNode;
    /**
     * Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The length sets the size of the input, so an array of two items would produce an input of two characters
     */
    mask: RegExp[];
    /**
     * Sets the placeholder character used for the input.
     */
    placeholderCharacter: string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref'>;
export type MultiInputMaskValue<T extends string> = {
    [_K in T]: string;
};
export type MultiInputMaskProps<T extends string> = {
    /**
     * The label describing the group of inputs inside the components.
     */
    label?: React.ReactNode;
    /**
     * Use to change the label layout direction. Defaults to `horizontal`.
     */
    labelDirection?: 'vertical' | 'horizontal';
    /**
     * Used to define the different inputs representing the inputs in the component. The id's defined here is used to map input value to correct property in `values` parameters used in `onChange`
     */
    inputs: MultiInputMaskInput<T>[];
    /**
     * Values used for the inputs inside the component. Expects an object with keys matching the id's defined in `inputs`
     */
    values?: MultiInputMaskValue<T>;
    /**
     * Defines the delimiter used to separate the inputs inside the component.
     */
    delimiter?: string;
    /**
     * Runs when the input value changes. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
     */
    onChange?: (values: MultiInputMaskValue<T>) => void;
    /**
     * Runs when the input gains focus. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
     */
    onFocus?: (values: MultiInputMaskValue<T>) => void;
    /**
     * Runs when the input loses focus. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
     */
    onBlur?: (values: MultiInputMaskValue<T>) => void;
    /**
     * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
     */
    status?: FormStatusText;
    /**
     * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
     */
    statusState?: FormStatusState;
    /**
     * Set it to `true` in order to stretch the input to the available space. Defaults to false.
     */
    stretch?: boolean;
    /**
     * Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.
     */
    suffix?: React.ReactNode;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur' | 'ref' | 'value' | 'label' | 'placeholder' | 'size'> & SpacingProps & Pick<InputProps, 'size'>;
declare function MultiInputMask<T extends string>({ id, label, labelDirection, inputs, delimiter, onChange: onChangeExternal, disabled, status, statusState, values: defaultValues, className, stretch, inputMode, suffix, onBlur, onFocus, ...props }: MultiInputMaskProps<T>): import("react/jsx-runtime").JSX.Element;
export default MultiInputMask;
