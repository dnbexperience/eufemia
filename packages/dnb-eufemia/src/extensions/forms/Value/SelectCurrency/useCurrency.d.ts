import type { CurrencyType } from '../../constants/currencies';
export default function useCurrency(): {
    getCurrencyDisplayNameByIso: (iso: CurrencyType["iso"]) => string;
};
