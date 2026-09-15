/**
 * DNB Eufemia Forms Defaults
 *
 */

/**
 * The deadline in milliseconds for an async operation when no
 * `asyncSubmitTimeout` is given: how long a pending submit, a field's
 * async `onChange` or validator, a `Field.Upload`'s `fileHandler`, an
 * `onFileDelete` or `onFileClick` in `Field.Upload` or `Value.Upload`, or a
 * `Form.Section`'s `onDone` may stay unsettled before the form stops
 * waiting and recovers.
 *
 * The documentation states this value in prose ("30 seconds by default"),
 * so those texts need to be updated alongside it.
 */
export const DEFAULT_ASYNC_SUBMIT_TIMEOUT = 30000
