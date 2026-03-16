import type { Props as StringValueProps } from '../String';
export type Props = StringValueProps;
declare function Address(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Address {
    var Postal: (props: Props) => import("react/jsx-runtime").JSX.Element;
    var Street: (props: Props) => import("react/jsx-runtime").JSX.Element;
}
export default Address;
