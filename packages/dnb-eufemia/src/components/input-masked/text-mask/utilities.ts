export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isNil<T>(
  value: T | undefined | null
): value is undefined | null {
  return typeof value === 'undefined' || value === null
}
