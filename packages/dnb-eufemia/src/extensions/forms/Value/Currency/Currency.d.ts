import type { Props as NumberValueProps } from '../Number';
import type { CurrencyISO } from '../../constants/currencies';
export type Props = NumberValueProps & {
    /**
     * The currency of the component.
     */
    currency?: CurrencyISO | true;
};
declare function Currency(props: Props): import("react/jsx-runtime").JSX.Element;
export default Currency;
