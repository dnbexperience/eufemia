import type { ContainerMode } from '../Array';
import type { Path } from '../../types';
/**
 * This is a helper for the Iterate component.
 * It is used to switch the container mode of the items inside the Iterate component.
 * You can use the hook outside of the Iterate component, and it will communicate with the items inside the Iterate component.
 * Therefore, it is imported and used in both e.g. the EditContainer and e.g. the PushButton.
 */
export default function useSwitchContainerMode(path?: Path): {
    getNextContainerMode: () => ContainerMode | undefined;
    nextContainerModeRef: import("react").RefObject<any>;
    setNextContainerMode: (mode: ContainerMode) => void;
    setLastItemContainerMode: (mode: ContainerMode) => void;
};
