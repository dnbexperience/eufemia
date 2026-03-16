import type { Props as StringValueProps } from '../String';
export type Props = StringValueProps & Partial<Record<'postalCode' | 'city', StringValueProps>>;
declare function PostalCodeAndCity(props: Props): import("react/jsx-runtime").JSX.Element;
export default PostalCodeAndCity;
