import type { ValueProps } from '../../types';
import type { CountryISO } from '../../constants/countries';
export type Props = ValueProps<CountryISO>;
declare function SelectCountry(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace SelectCountry {
    var useCountry: typeof import("./useCountry").default;
}
export default SelectCountry;
