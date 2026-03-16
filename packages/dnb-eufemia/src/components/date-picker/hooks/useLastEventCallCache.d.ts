import type { DatePickerDates } from './useDates';
export type LastEventCallCache = {
    startDate?: DatePickerDates['startDate'];
    endDate?: DatePickerDates['startDate'];
};
type uncachedDates = LastEventCallCache;
export default function useLastEventCallCache(uncachedDates: uncachedDates): readonly [LastEventCallCache, import("react").Dispatch<import("react").SetStateAction<LastEventCallCache>>];
export {};
