import type { DatePickerDates } from './useDates';
export type SubmittedDates = Pick<DatePickerDates, 'startDate' | 'endDate'>;
export default function useSubmittedDates(): {
    submittedDatesRef: import("react").RefObject<SubmittedDates>;
    setSubmittedDates: (dates: SubmittedDates) => void;
};
