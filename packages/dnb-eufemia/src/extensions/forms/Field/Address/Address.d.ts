import React from 'react';
import type { Props as StringFieldProps } from '../String';
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete';
export type Props = StringFieldProps & {
    element?: React.ElementType<Props>;
    autocompleteProps?: AutocompleteAllProps;
};
declare function Address(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Address {
    var Postal: (props: Props) => import("react/jsx-runtime").JSX.Element;
    var Street: (props: Props) => import("react/jsx-runtime").JSX.Element;
}
export default Address;
