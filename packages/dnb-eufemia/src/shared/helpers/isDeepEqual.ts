/**
 * Deep equality check for plain JSON-compatible values (objects, arrays, primitives).
 * Unlike JSON.stringify, this is insensitive to object key ordering.
 * Returns true for reference-equal values without traversal.
 */
export function isDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  ) {
    return false
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    return a.every((item, i) => isDeepEqual(item, b[i]))
  }

  const objA = a as Record<string, unknown>
  const objB = b as Record<string, unknown>
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      isDeepEqual(objA[key], objB[key])
  )
}
