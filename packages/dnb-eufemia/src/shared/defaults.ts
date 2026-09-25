/**
 * DNB Eufemia Defaults
 *
 */

export const LOCALE = 'nb-NO'
export const CURRENCY = 'NOK'
export const CURRENCY_DISPLAY = 'narrowSymbol' as const // code, name, symbol, narrowSymbol
export const CURRENCY_FALLBACK_DISPLAY = 'code' as const // code, name, symbol, narrowSymbol
export const COUNTRY = 'NO' // ISO 3166-1 alpha-2

/**
 * The deadline in milliseconds for an async operation that would otherwise
 * wait forever on a Promise that never settles: how long a
 * `Filter.useFilterAsync` fetcher may stay unsettled before the filter stops
 * waiting and recovers.
 *
 * It is also the default for `asyncSubmitTimeout`, which bounds a pending
 * submit, a field's async `onChange` or validator, a `Field.Upload`'s
 * `fileHandler`, and a `Form.Section`'s `onDone` the same way.
 *
 * The documentation states this value in prose ("30 seconds by default"), so
 * those texts need to be updated alongside it.
 */
export const DEFAULT_ASYNC_SUBMIT_TIMEOUT = 30000
