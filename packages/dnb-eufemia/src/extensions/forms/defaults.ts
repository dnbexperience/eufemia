/**
 * DNB Eufemia Forms Defaults
 *
 */

/**
 * The deadline used for async operations when no `asyncSubmitTimeout` is
 * given: how long the submit indicator is displayed, how long a field waits
 * for an async `onChange` or validator, how long a `Field.Upload` waits for
 * its `fileHandler`, and how long a `Form.Section` waits for its `onDone`.
 *
 * The documentation states this value in prose ("30 seconds by default"), so
 * those texts need to be updated alongside it.
 */
export const DEFAULT_ASYNC_SUBMIT_TIMEOUT = 30000
