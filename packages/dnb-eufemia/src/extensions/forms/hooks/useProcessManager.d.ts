/**
 * Keep track of possible parallel processes to avoid issues
 */
export default function useProcessManager(): {
    startProcess: () => () => boolean;
};
