/**
 * Web DatePicker Component
 *
 */
import React from 'react';
import type { DatePickerDates } from './hooks/useDates';
type DatePickerFooterEvent = React.MouseEvent<HTMLButtonElement> & DatePickerDates & {
    event: React.MouseEvent<HTMLButtonElement>;
};
export type DatePickerFooterProps = Omit<React.HTMLProps<HTMLElement>, 'onSubmit' | 'onCancel' | 'onReset'> & {
    isRange: boolean;
    onSubmit?: (event: DatePickerFooterEvent) => void;
    onCancel?: (event: DatePickerFooterEvent) => void;
    onReset?: (event: DatePickerFooterEvent) => void;
    submitButtonText?: string;
    cancelButtonText?: string;
    resetButtonText?: string;
};
declare function DatePickerFooter({ isRange, submitButtonText, cancelButtonText, resetButtonText, onSubmit, onCancel, onReset, }: DatePickerFooterProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerFooter;
