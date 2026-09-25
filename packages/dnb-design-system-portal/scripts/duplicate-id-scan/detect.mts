/**
 * Pure duplicate-id detection helpers, shared by the crawler and its tests.
 */

/** A duplicated element id found on a page. */
export type Duplicate = {
  /** Page slug without leading/trailing slashes, e.g. `uilib/components/button`. */
  url: string
  /** The element id, without a leading `#`. */
  id: string
  /** How many elements on the page share this id (always greater than one). */
  count: number
}

/**
 * Group element ids and return the ones that occur more than once, sorted by
 * id for stable output.
 */
export function findDuplicateIds(
  ids: readonly string[]
): Array<{ id: string; count: number }> {
  const counts = new Map<string, number>()
  for (const id of ids) {
    if (!id) {
      continue
    }
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  const duplicates: Array<{ id: string; count: number }> = []
  counts.forEach((count, id) => {
    if (count > 1) {
      duplicates.push({ id, count })
    }
  })

  return duplicates.sort((a, b) => a.id.localeCompare(b.id))
}
