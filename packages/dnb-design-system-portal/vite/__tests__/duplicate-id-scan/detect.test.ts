import { describe, it, expect } from 'vitest'
import { findDuplicateIds } from '../../../scripts/duplicate-id-scan/detect.mts'

describe('findDuplicateIds', () => {
  it('returns nothing when all ids are unique', () => {
    expect(findDuplicateIds(['a', 'b', 'c'])).toEqual([])
  })

  it('returns ids that occur more than once with their counts', () => {
    expect(findDuplicateIds(['a', 'a', 'b', 'a', 'b'])).toEqual([
      { id: 'a', count: 3 },
      { id: 'b', count: 2 },
    ])
  })

  it('ignores empty ids', () => {
    expect(findDuplicateIds(['', '', 'x'])).toEqual([])
  })

  it('sorts results by id', () => {
    expect(findDuplicateIds(['z', 'z', 'a', 'a'])).toEqual([
      { id: 'a', count: 2 },
      { id: 'z', count: 2 },
    ])
  })
})
