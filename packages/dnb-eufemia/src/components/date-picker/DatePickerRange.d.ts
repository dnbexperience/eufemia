/**
 * Web DatePicker Component
 *
 */
import React from 'react';
import type { DatePickerCalendarProps } from './DatePickerCalendar';
import type { DatePickerChangeEvent } from './DatePickerProvider';
export type DatePickerRangeViews = number | Record<string, unknown>[];
export type DatePickerRangeProps = Omit<React.HTMLProps<HTMLElement>, 'onChange'> & DatePickerCalendarProps & {
    id?: string;
    isRange?: boolean;
    isLink?: boolean;
    isSync?: boolean;
    onlyMonth?: boolean;
    hideNavigation?: boolean;
    onPickerChange?: (event: DatePickerChangeEvent<React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLTableElement>>) => void;
};
declare function DatePickerRange({ onPickerChange, ...props }: DatePickerRangeProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerRange;
