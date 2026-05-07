/**
 * Deep equality check using JSON.stringify.
 * Works with plain JSON-compatible values (objects, arrays, primitives).
 * Returns true for reference-equal values without serialization.
 * Returns false on serialization errors (e.g. circular references or functions).
 */
export function isDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}
