import type { Props as StringValueProps } from '../String';
import type { AnyLocale } from '../../../../shared/Context';
export type Props = StringValueProps & {
    variant?: 'long' | 'short' | 'numeric';
    locale?: AnyLocale;
    dateFormat?: string;
};
declare function DateComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export default DateComponent;
