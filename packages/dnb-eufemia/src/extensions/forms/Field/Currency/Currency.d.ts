import type { CurrencyISO } from '../../constants/currencies';
import { Props as NumberFieldProps } from '../Number';
import type { PathStrict } from '../../types';
export type Props = NumberFieldProps & {
    /**
     * Will change the currency.
     * You can also set a path as the value, e.g. `/myCurrencyPath`.
     */
    currency?: PathStrict | CurrencyISO;
};
declare function Currency(props: Props): import("react/jsx-runtime").JSX.Element;
export default Currency;
