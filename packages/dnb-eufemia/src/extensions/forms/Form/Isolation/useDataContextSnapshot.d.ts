export default function useDataContextSnapshot({ enabled, }?: {
    enabled?: boolean;
}): {
    handleReset: () => void;
    snapshotRef: import("react").RefObject<unknown>;
};
