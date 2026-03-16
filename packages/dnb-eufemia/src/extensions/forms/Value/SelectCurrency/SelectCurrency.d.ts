import type { ValueProps } from '../../types';
import type { CurrencyISO } from '../../constants/currencies';
export type Props = ValueProps<CurrencyISO>;
declare function SelectCurrency(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace SelectCurrency {
    var useCurrency: typeof import("./useCurrency").default;
}
export default SelectCurrency;
