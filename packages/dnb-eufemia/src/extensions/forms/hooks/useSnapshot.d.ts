import type { JsonObject } from '../utils/json-pointer';
import type { SharedStateId } from '../../../shared/helpers/useSharedState';
import type { SnapshotId, SnapshotName } from '../Form/Snapshot';
export default function useSnapshot(id?: SharedStateId): {
    createSnapshot: (id?: SnapshotId, name?: SnapshotName, content?: JsonObject) => SnapshotId;
    revertSnapshot: (id: SnapshotId, name?: SnapshotName) => void;
    applySnapshot: (id: SnapshotId, name?: SnapshotName) => void;
    internalSnapshotsRef: import("react").RefObject<Map<SnapshotId, JsonObject>>;
};
