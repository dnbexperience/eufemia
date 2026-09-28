/**
 * Makes sure the integer part of the number string has 3 digits,
 * so the keys can be compared as strings. Decimals are kept as they are,
 * so a fractional order still sorts between its surrounding integers.
 */
const pad = (number: number) => {
  const [integer, decimals] = String(number).split('.')

  return integer.padStart(3, '0') + (decimals ? `.${decimals}` : '')
}

/** Keys are compared as strings, so the order has to fit within 3 digits. */
const limit = 999

const clamp = (number: number) => Math.min(limit, Math.max(-limit, number))

/**
 * Builds a sortable key for a page, based on its frontmatter `order`.
 *
 * The leading digit groups the pages, so a page can never overlap with
 * a page from another group, no matter how many siblings it has:
 * positive order first, unordered and 0 in the middle, and negative last.
 *
 * `fallbackIndex` is the position among its siblings, and is used when
 * no order is given.
 */
export function createOrderKey(
  order: number | string | undefined,
  fallbackIndex: number
) {
  const value = clamp(parseFloat(String(order)))

  if (!value) {
    return '2' + pad(clamp(fallbackIndex))
  }

  return value > 0 ? '1' + pad(value) : '3' + pad(value + 1000)
}
