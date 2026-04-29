/** @private */
const startsWithCamelCaseRegex = /(^[a-z]{1,}[A-Z]{1})/
/** @private */
const notOnlyAZOrHyphenRegex = /[^a-z-]/i

/** Props that are Eufemia-specific and should not reach the DOM */
const spacingProps = [
  'space',
  'top',
  'right',
  'bottom',
  'left',
  'noCollapse',
  'innerSpace',
  'labelDirection',
] as const

/**
 * Returns a new object with only valid DOM attributes, removing:
 * - Eufemia spacing props (space, top, right, bottom, left, etc.)
 * - Null values
 * - Function props that are not event handlers or refs
 * - Invalid attribute names (containing underscores or other non-standard characters)
 *
 * Converts `disabled: true` to `aria-disabled: true`.
 *
 * Unlike the deprecated `validateDOMAttributes`, this function:
 * - Does NOT mutate the input
 * - Does NOT handle `props.attributes` merging (do this explicitly before calling)
 *
 * @param params - Object with DOM attributes to clean
 * @returns A new object with only valid DOM attributes
 */
export function cleanDOMAttributes<
  T extends Record<string, unknown> = Record<string, unknown>,
>(params: T): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  let hasDisabledTrue = false

  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      continue
    }

    const value = params[key]

    // Skip Eufemia spacing props
    if ((spacingProps as readonly string[]).includes(key)) {
      continue
    }

    // Skip disabled if null
    if (key === 'disabled' && value === null) {
      continue
    }

    // Skip null values
    if (value === null) {
      continue
    }

    // Skip invalid attribute names (must be only a-z, A-Z, or hyphens)
    if (notOnlyAZOrHyphenRegex.test(key)) {
      continue
    }

    // Skip non-handler function props (keep ref and camelCase handlers like onClick)
    if (
      typeof value === 'function' &&
      key !== 'ref' &&
      !startsWithCamelCaseRegex.test(key)
    ) {
      continue
    }

    // Track disabled=true to add aria-disabled after all other attributes
    if (key === 'disabled' && value === true) {
      hasDisabledTrue = true
    }

    result[key] = value
  }

  // Add aria-disabled after all other attributes (matches legacy behavior)
  if (hasDisabledTrue) {
    result['aria-disabled'] = true
  }

  return result
}
