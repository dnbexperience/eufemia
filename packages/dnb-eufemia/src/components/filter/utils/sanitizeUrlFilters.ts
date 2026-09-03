import type { FilterValue } from '../FilterContext'

/**
 * Validates and sanitizes filter data parsed from a URL query parameter.
 *
 * Protects against:
 * - Non-object payloads (arrays, primitives, null)
 * - Prototype pollution keys (__proto__, constructor, prototype)
 * - Entries that don't match the FilterValue shape
 */
export function sanitizeUrlFilters(
  raw: unknown
): Record<string, FilterValue> {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return {}
  }

  // Collect into a Map so a user-controlled key is never used as a dynamic
  // object property name (prevents prototype pollution / property injection).
  const result = new Map<string, FilterValue>()

  for (const key of Object.keys(raw as Record<string, unknown>)) {
    // Skip prototype-polluting keys before writing them to the result object.
    if (
      key === '__proto__' ||
      key === 'constructor' ||
      key === 'prototype'
    ) {
      continue
    }

    const entry = (raw as Record<string, unknown>)[key]

    if (!isFilterValue(entry)) {
      continue
    }

    const picked: FilterValue = {
      value: entry.value,
      label: entry.label,
    }
    if (entry.categoryLabel !== undefined) {
      picked.categoryLabel = entry.categoryLabel
    }

    result.set(key, picked)
  }

  return Object.fromEntries(result)
}

function isFilterValue(val: unknown): val is FilterValue {
  if (val === null || typeof val !== 'object' || Array.isArray(val)) {
    return false
  }

  const obj = val as Record<string, unknown>

  if (typeof obj.label !== 'string') {
    return false
  }

  if (
    obj.categoryLabel !== undefined &&
    typeof obj.categoryLabel !== 'string'
  ) {
    return false
  }

  const v = obj.value
  if (
    typeof v !== 'string' &&
    typeof v !== 'number' &&
    typeof v !== 'boolean' &&
    (v === null || typeof v !== 'object' || Array.isArray(v))
  ) {
    return false
  }

  return true
}
