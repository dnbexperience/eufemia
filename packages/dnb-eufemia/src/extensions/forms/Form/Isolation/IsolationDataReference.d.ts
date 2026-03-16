import type React from 'react';
export type IsolationDataReference = {
    refresh: (options?: {
        deferred?: boolean;
    }) => void;
    update: (data: unknown) => void;
    cleanup: (fn?: () => void) => void;
    snapshotRef: React.RefObject<unknown>;
    eventsRef: React.RefObject<Array<() => void>>;
};
export declare function createDataReference(): IsolationDataReference;
