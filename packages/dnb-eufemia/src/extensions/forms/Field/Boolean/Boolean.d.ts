import type { Props as ToggleFieldProps } from '../Toggle';
import type { FieldProps } from '../../types';
type BooleanProps = {
    trueText?: string;
    falseText?: string;
    variant?: ToggleFieldProps['variant'];
    size?: ToggleFieldProps['size'];
    onClick?: ToggleFieldProps['onClick'];
};
type SharedFieldProps = Omit<FieldProps<unknown>, 'layout' | 'layoutOptions'>;
export type Props = SharedFieldProps & BooleanProps;
declare function BooleanComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export default BooleanComponent;
