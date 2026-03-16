import type { ComponentProps } from '../../types';
import type { ButtonProps } from '../../../../components/button/Button';
import type { StepIndex } from '../Context/types';
export type Props = ComponentProps & ButtonProps & {
    toStep?: StepIndex;
};
declare function EditButton(props: Props): import("react/jsx-runtime").JSX.Element;
export default EditButton;
