import type { InvalidDates } from '../../../../../components/date-picker/DatePickerInput';
export default function useInvalidDates(): {
    invalidDatesRef: React.RefObject<InvalidDates>;
    setInvalidDates: (invalidDates: InvalidDates) => void;
};
