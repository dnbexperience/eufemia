import type { DateType } from '../DatePickerContext';
export type DatePickerDateProps = {
    date?: DateType;
    startDate?: DateType;
    endDate?: DateType;
    startMonth?: DateType;
    endMonth?: DateType;
    minDate?: DateType;
    maxDate?: DateType;
};
type UseDatesOptions = {
    dateFormat: string;
    isRange: boolean;
};
export type DatePickerDates = {
    date?: DateType;
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    startMonth?: Date;
    endMonth?: Date;
};
export default function useDates(dateProps: DatePickerDateProps, { dateFormat, isRange }: UseDatesOptions): {
    readonly dates: DatePickerDates;
    readonly updateDates: (newDates: DatePickerDates, callback?: (dates: DatePickerDates) => void) => void;
    readonly previousDateProps: DatePickerDateProps;
};
export {};
