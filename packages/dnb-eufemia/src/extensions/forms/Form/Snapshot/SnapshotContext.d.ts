import type { Path } from '../../types';
import type { SnapshotName } from './Snapshot';
export type SnapshotMap = React.RefObject<Map<Path, unknown>>;
export type SnapshotContextState = {
    name: SnapshotName;
    setMountedField: (path: Path, { isMounted }: {
        isMounted: boolean;
    }) => void;
};
declare const SnapshotContext: import("react").Context<SnapshotContextState>;
export default SnapshotContext;
