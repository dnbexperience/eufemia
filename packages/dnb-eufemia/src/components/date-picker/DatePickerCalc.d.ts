/**
 * Web DatePicker Component
 *
 */
type ZeroDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare function makeDayObject(date: Date, { startDate, endDate, hoverDate, minDate, maxDate, month, }: Record<string, Date>): {
    date: Date;
    isToday: boolean;
    isLastMonth: boolean;
    isNextMonth: boolean;
    isStartDate: boolean;
    isEndDate: boolean;
    isWithinSelection: boolean;
    isPreview: boolean;
    isDisabled: boolean;
    isSelectable: boolean;
    isInactive: boolean;
};
export declare function getCalendar(month: Date, weekStartsOn?: number, { onlyMonth, hideNextMonthWeek, }?: {
    onlyMonth?: boolean;
    hideNextMonthWeek?: boolean;
}): Date[];
export declare function dayOffset(dayName: string): ZeroDayIndex;
export declare function toRange(startDate: Date, endDate: Date): {
    startDate: Date;
    endDate: Date;
};
export declare function getWeek(weekStartsOn?: ZeroDayIndex): Date[];
export declare function getMonth(month: Date, skip?: number, limit?: number): Date[];
declare function isDisabledCalc(date: Date, minDate: Date, maxDate: Date): boolean;
export { isDisabledCalc as isDisabled };
export declare function convertStringToDate(date: string | Date, { dateFormat }?: {
    dateFormat?: string | null;
}): Date;
