/**
 * Internal types for NumberFormatBase
 *
 * Kept out of `types.ts` so they stay off the public `NumberFormat` entry.
 */

import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './utils'

/**
 * Contract used by `__format` – the formatter is always invoked with
 * `returnAria: true`, so it always returns the full `NumberFormatReturnValue`.
 * This is a strict sub-type of the public `NumberFormatFunction` (which also
 * supports the non-aria, string-returning overload).
 */
export type NumberFormatInternalFormatter = (
  value: NumberFormatValue | null,
  options: NumberFormatOptionParams & { returnAria: true }
) => NumberFormatReturnValue

/**
 * Private formatter injection used by the `NumberFormat.*` variant wrappers
 * to pick the minimal formatter needed and enable tree shaking.
 *
 * Not part of the public API – variants set it via the
 * `NumberFormat.withFormatter(Component, formatter)` helper.
 */
export type NumberFormatInternalProps = {
  /** @internal */
  __format?: NumberFormatInternalFormatter
}
