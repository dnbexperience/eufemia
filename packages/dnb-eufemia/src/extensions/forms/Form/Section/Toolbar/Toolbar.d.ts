import type { SpaceAllProps } from '../../../../../components/Space';
export type Props = SpaceAllProps & {
    onEdit?: () => void;
    onDone?: () => void;
    onCancel?: () => void;
};
export default function Toolbar(props: Props): import("react/jsx-runtime").JSX.Element;
