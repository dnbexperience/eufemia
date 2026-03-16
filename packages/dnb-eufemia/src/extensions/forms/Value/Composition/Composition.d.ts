import { Props as ValueProps } from '../../ValueBlock';
export type Props = Omit<ValueProps, 'layout'>;
declare function CompositionValue(props: Props): import("react/jsx-runtime").JSX.Element;
export default CompositionValue;
