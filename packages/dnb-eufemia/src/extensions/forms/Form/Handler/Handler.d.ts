import type { JsonObject } from '../../utils/json-pointer';
import type { Props as ProviderProps } from '../../DataContext/Provider';
import type { Props as FormElementProps } from '../Element';
export type Props = FormElementProps & {
    /**
     * Will enable autoComplete for all nested Field.String fields
     */
    autoComplete?: boolean;
    /**
     * Will decouple the form element from rendering
     */
    decoupleForm?: boolean;
};
export default function FormHandler<Data extends JsonObject>(props: ProviderProps<Data> & Omit<Props, keyof ProviderProps<Data>>): import("react/jsx-runtime").JSX.Element;
