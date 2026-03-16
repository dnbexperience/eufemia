import React from 'react';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
export type SnapshotId = SharedStateId | number;
export type SnapshotName = string;
export type SnapshotProps = {
    name: SnapshotName;
    children: React.ReactNode;
};
declare function SnapshotProvider(props: SnapshotProps): import("react/jsx-runtime").JSX.Element;
export default SnapshotProvider;
