/**
 * Web DatePicker Component
 *
 */
import React from 'react';
import type { InternalLocale } from '../../shared/Context';
import type { DatePickerChangeEvent } from './DatePickerProvider';
import type { CalendarNavButtonProps } from './DatePickerCalendarNavigator';
export type CalendarDay = {
    date: Date;
    isDisabled?: boolean;
    isEndDate?: boolean;
    isInactive?: boolean;
    isLastMonth?: boolean;
    isNextMonth?: boolean;
    isPreview?: boolean;
    isSelectable?: boolean;
    isStartDate?: boolean;
    isToday?: boolean;
    isWithinSelection?: boolean;
    className?: string;
};
export type CalendarNavigationEvent = {
    nr: number;
    type?: CalendarNavButtonProps['type'];
};
export type DatePickerCalendarProps = Omit<React.HTMLProps<HTMLElement>, 'onSelect' | 'onChange'> & {
    id?: string;
    nr?: number;
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
     */
    month?: Date;
    hoverDate?: Date;
    firstDayOfWeek?: string;
    hideNavigation?: boolean;
    hideDays?: boolean;
    onlyMonth?: boolean;
    hideNextMonthWeek?: boolean;
    onSelect?: (event: DatePickerChangeEvent<React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>, tableRef: React.RefObject<HTMLTableElement>, nr: number) => void;
    /**
     * To define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
     */
    locale?: InternalLocale;
    rtl?: boolean;
    isRange?: boolean;
    resetDate?: boolean;
};
declare function DatePickerCalendar(restOfProps: DatePickerCalendarProps): import("react/jsx-runtime").JSX.Element;
export default DatePickerCalendar;
