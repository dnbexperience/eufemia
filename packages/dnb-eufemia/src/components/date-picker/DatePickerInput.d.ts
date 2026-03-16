/**
 * Web DatePicker Component
 *
 */
import React from 'react';
import type { InputInputElement, InputSize } from '../Input';
import type { FormStatusBaseProps } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { ReturnObject } from './DatePickerProvider';
import type { DatePickerProps } from './DatePicker';
export type DatePickerInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'children' | 'ref' | 'value' | 'size' | 'onFocus' | 'onBlur' | 'onSubmit' | 'label'> & FormStatusBaseProps & {
    selectedDateTitle?: string;
    maskOrder?: DatePickerProps['maskOrder'];
    maskPlaceholder?: DatePickerProps['maskPlaceholder'];
    separatorRegExp?: RegExp;
    submitAttributes?: Record<string, unknown>;
    isRange?: boolean;
    /**
     * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
     */
    size?: InputSize;
    /**
     * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
     */
    inputElement?: InputInputElement;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * To open the date-picker by default. Defaults to `false`.
     */
    open?: boolean;
    showInput?: boolean;
    onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onChange?: (event: ReturnObject<React.ChangeEvent<HTMLInputElement>>) => void;
    /**
     * Will be called once the input gets focus.
     */
    onFocus?: (event: ReturnObject<React.FocusEvent<HTMLInputElement>>) => void;
    /**
     * Will be called once the input lose focus.
     */
    onBlur?: (event: ReturnObject<React.FocusEvent<HTMLInputElement>>) => void;
};
export type InvalidDates = {
    invalidDate?: string;
    invalidStartDate?: string;
    invalidEndDate?: string;
};
declare function DatePickerInput(externalProps: DatePickerInputProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerInput;
