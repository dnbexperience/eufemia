import type { ButtonProps } from '../../../../components/Button';
import type { Path } from '../../types';
export type Props = ButtonProps & {
    path?: Path;
    itemPath?: Path;
    pushValue: unknown | ((value: unknown) => void);
    /**
     * Used internally
     */
    value?: unknown;
};
declare function PushButton(props: Props): import("react/jsx-runtime").JSX.Element;
export default PushButton;
