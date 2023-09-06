/**
 * Filters out props from a given object/context
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object of component properties
 * @param validKeys object with keys that should get returned
 * @param excludeKeys object with keys that should be excluded
 * @returns filtered properties
 */
function filterValidProps<Props>(
  props: Props,
  validKeys?: Record<string, unknown>,
  excludeKeys?: Record<string, unknown>
) {
  const res = {} as Props,
    o = Object.prototype.hasOwnProperty

  for (const key in props) {
    if (
      (!validKeys || (validKeys && o.call(validKeys, key))) &&
      (!excludeKeys || (excludeKeys && !o.call(excludeKeys, key)))
    ) {
      res[key] = props[key]
    }
  }

  return res
}

export { filterValidProps }
