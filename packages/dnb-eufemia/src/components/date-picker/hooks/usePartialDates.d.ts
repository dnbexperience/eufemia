export type PartialDates = {
    partialDate?: string;
    partialStartDate?: string;
    partialEndDate?: string;
};
export default function usePartialDates(): {
    partialDatesRef: import("react").RefObject<PartialDates>;
    setPartialDates: (partialDates: PartialDates) => void;
};
