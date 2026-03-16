import type { Path } from '../../types';
import type { ContainerMode } from '../Array';
type PushContainerContext = {
    path: Path;
    itemPath: Path;
    entries?: Array<unknown>;
    commitHandleRef: React.RefObject<() => void>;
    switchContainerMode?: (mode: ContainerMode) => void;
};
declare const PushContainerContext: import("react").Context<PushContainerContext>;
export default PushContainerContext;
