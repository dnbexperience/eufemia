/**
 * DNB Eufemia Forms Defaults
 *
 */

/**
 * The deadline in milliseconds for an async operation when no
 * `asyncSubmitTimeout` is given: how long a pending submit, a field's
 * async `onChange` or validator, a `Field.Upload`'s `fileHandler`, or a
 * `Form.Section`'s `onDone` may stay unsettled before the form stops
 * waiting and recovers.
 *
 * Defined in `shared/defaults`, which owns the note about the prose stating
 * this value, because `Filter.useFilterAsync` gives its fetcher the same
 * deadline and a component cannot read a forms default.
 */
export { DEFAULT_ASYNC_SUBMIT_TIMEOUT } from '../../shared/defaults'
