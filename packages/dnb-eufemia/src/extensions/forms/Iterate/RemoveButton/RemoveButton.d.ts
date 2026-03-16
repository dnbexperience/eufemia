import type { ButtonProps } from '../../../../components/Button';
import type { DataValueReadWriteComponentProps } from '../../types';
export type Props = ButtonProps & DataValueReadWriteComponentProps<unknown[]> & {
    showConfirmDialog?: boolean;
};
declare function RemoveButton(props: Props): import("react/jsx-runtime").JSX.Element;
export default RemoveButton;
