/**
 * Builds a selector that matches an element by its id.
 * Unlike `#id`, this works for every id HTML allows, and not only for the ones
 * that also happen to be valid CSS identifiers.
 */
export default function idSelector(id: string) {
  return `[id="${id.replace(/["\\]/g, '\\$&')}"]`
}
