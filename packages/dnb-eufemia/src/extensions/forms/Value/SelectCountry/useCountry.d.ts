import type { CountryType } from '../../constants/countries';
export default function useCountry(): {
    getCountryNameByIso: (iso: CountryType["iso"]) => string | string[];
};
