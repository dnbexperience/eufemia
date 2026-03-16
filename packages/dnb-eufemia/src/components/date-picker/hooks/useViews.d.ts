import type { DatePickerDates } from './useDates';
export type CalendarView = {
    nr: number;
    month?: Date;
};
export type ViewDates = {
    startMonth?: DatePickerDates['startMonth'];
    endMonth?: DatePickerDates['endMonth'];
};
export type UseViewsParams = ViewDates & {
    isRange?: boolean;
};
export default function useViews({ isRange, ...dates }: UseViewsParams): {
    readonly views: CalendarView[];
    readonly setViews: (views: Array<CalendarView>, cb?: (...args: unknown[]) => void) => void;
    readonly setHasClickedCalendarDay: (hasClicked: boolean) => boolean;
};
export declare function getViews({ isRange, ...dates }: ViewDates & UseViewsParams): Array<CalendarView>;
