import type { ButtonProps } from '../../../../components/Button';
type Props = ButtonProps & {
    showConfirmDialog?: boolean;
    showWhen?: 'uncommittedChangeDetected';
};
export default function IsolationResetButton(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
