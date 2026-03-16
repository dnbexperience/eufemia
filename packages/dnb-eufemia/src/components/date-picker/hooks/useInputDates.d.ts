import type { DatePickerDates } from './useDates';
export type DatePickerInputDates = {
    startDay?: string;
    startMonth?: string;
    startYear?: string;
    endDay?: string;
    endMonth?: string;
    endYear?: string;
};
export default function useInputDates({ startDate, endDate, }: Pick<DatePickerDates, 'startDate' | 'endDate'>): {
    inputDates: DatePickerInputDates;
    updateInputDates: (dates: DatePickerInputDates) => void;
};
export declare function pad(date: string, size: number): string;
