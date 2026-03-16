/**
 * Web DatePicker Provider
 *
 */
import React from 'react';
import type { DatePickerEventAttributes, DatePickerAllProps } from './DatePicker';
import type { DatePickerContextValues } from './DatePickerContext';
import type { DatePickerDates } from './hooks/useDates';
import type { InvalidDates } from './DatePickerInput';
import type { PartialDates } from './hooks/usePartialDates';
type DatePickerProviderProps = DatePickerAllProps & {
    setReturnObject: (func: DatePickerContextValues['getReturnObject']) => DatePickerContextValues['getReturnObject'];
    hidePicker?: DatePickerContextValues['hidePicker'];
    attributes?: DatePickerEventAttributes;
    children: React.ReactNode;
};
export type DatePickerChangeEvent<E> = DatePickerDates & InvalidDates & {
    nr?: number;
    hidePicker?: boolean;
    event?: E;
};
export type GetReturnObjectParams<E> = DatePickerDates & PartialDates & InvalidDates & {
    event?: E;
};
export type ReturnObject<E> = InvalidDates & PartialDates & {
    event?: E;
    attributes?: Record<string, unknown>;
    daysBetween?: number;
    date?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    isValid?: boolean;
    isValidStartDate?: boolean;
    isValidEndDate?: boolean;
};
declare function DatePickerProvider(props: DatePickerProviderProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerProvider;
