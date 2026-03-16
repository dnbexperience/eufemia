/**
 * Web DatePicker Component
 *
 */
import React from 'react';
export type DatePickerShortcut = {
    title?: string;
    date?: string | Date | ((...args: unknown[]) => Date);
    startDate?: string | Date | ((...args: unknown[]) => Date);
    endDate?: string | Date | ((...args: unknown[]) => Date);
    closeOnSelect?: boolean;
};
export type DatePickerAddonProps = React.HTMLProps<HTMLElement> & {
    /**
     * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
     */
    shortcuts?: Array<DatePickerShortcut> | string;
    renderElement?: React.ReactNode;
};
declare function DatePickerAddon(props: DatePickerAddonProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerAddon;
