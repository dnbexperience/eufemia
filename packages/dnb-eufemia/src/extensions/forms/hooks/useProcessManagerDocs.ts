import type { PropertiesTableProps } from '../../../shared/types'

/**
 * Documentation for the useProcessManager hook.
 *
 * The useProcessManager hook helps manage parallel async operations,
 * providing a mechanism to detect if a newer process has started
 * and should supersede the current one. This prevents race conditions
 * in async validation and data fetching scenarios.
 */

/**
 * Documentation for the useProcessManager hook return values.
 *
 * This hook takes no parameters and returns utilities for process management.
 */
export const useProcessManagerReturns: PropertiesTableProps = {
  startProcess: {
    doc: 'Starts a new process and returns a function to check if the process is still active. Calling `startProcess()` again will invalidate previous processes.',
    type: '() => () => boolean',
    status: 'required',
  },
}
