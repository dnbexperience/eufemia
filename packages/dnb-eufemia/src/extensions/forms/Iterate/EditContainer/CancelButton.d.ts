import type { ButtonProps } from '../../../../components/Button';
import type { ContainerMode } from '../Array';
type Props = ButtonProps & {
    showConfirmDialog?: boolean;
};
export default function CancelButton(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function useWasNew({ isNew, containerMode, }: {
    isNew: boolean;
    containerMode: ContainerMode;
}): unknown;
export {};
