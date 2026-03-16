import React from 'react';
import type { InternalLocale } from '../../shared/Context';
type CalendarNavigationDateType = 'month' | 'year';
type CalendarNavigationType = 'both' | CalendarNavigationDateType;
export type DatePickerCalendarNavigationProps = Omit<React.HTMLProps<HTMLElement>, 'onSelect' | 'onChange'> & {
    type: CalendarNavigationType;
    id: string;
    nr?: number;
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
     */
    date?: Date;
    /**
     * To define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
     */
    locale?: InternalLocale;
};
export declare function DatePickerCalendarNav({ type, id, nr, date, locale, }: DatePickerCalendarNavigationProps): import("react/jsx-runtime").JSX.Element;
export type CalendarNavButtonType = 'prev' | 'next';
export type CalendarNavButtonProps = {
    dateType: CalendarNavigationDateType;
    type: CalendarNavButtonType;
    nr: number;
    dateFormat: Intl.DateTimeFormatOptions;
    date: Date;
    dateLimit: Date;
    locale: InternalLocale;
    onClick: ({ nr, type, }: {
        nr: number;
        type: CalendarNavButtonProps['type'];
    }) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};
export {};
