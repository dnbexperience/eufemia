import { describe, it, expect } from 'vitest'
import {
  categoryOrder,
  categoryIds,
  excludedSlugs,
  getCategoryId,
  getCategoryTitle,
  isCategoryId,
} from '../componentCategories'

describe('componentCategories', () => {
  describe('categoryOrder', () => {
    it('defines the four navigation categories in order', () => {
      expect(categoryOrder.map(({ id }) => id)).toEqual([
        'general',
        'formatting',
        'accessibility',
        'utilities',
      ])
    })

    it('exposes the ids as a set', () => {
      expect(categoryIds.has('general')).toBe(true)
      expect(categoryIds.has('unknown')).toBe(false)
    })
  })

  describe('excludedSlugs', () => {
    it('excludes the fragments index and the overview page', () => {
      expect(excludedSlugs.has('web/components/fragments')).toBe(true)
      expect(excludedSlugs.has('web/components/overview')).toBe(true)
      expect(excludedSlugs.has('web/components/dropdown')).toBe(false)
    })
  })

  describe('isCategoryId', () => {
    it('accepts known category ids', () => {
      expect(isCategoryId('general')).toBe(true)
      expect(isCategoryId('formatting')).toBe(true)
    })

    it('rejects unknown values', () => {
      expect(isCategoryId('unknown')).toBe(false)
      expect(isCategoryId(false)).toBe(false)
      expect(isCategoryId(null)).toBe(false)
      expect(isCategoryId(undefined)).toBe(false)
    })
  })

  describe('getCategoryId', () => {
    it('returns the id for a known category', () => {
      expect(getCategoryId('accessibility')).toBe('accessibility')
    })

    it('returns undefined when the category is explicitly false', () => {
      expect(getCategoryId(false)).toBeUndefined()
    })

    it('falls back to "general" for unknown or missing categories', () => {
      expect(getCategoryId('does-not-exist')).toBe('general')
      expect(getCategoryId(null)).toBe('general')
      expect(getCategoryId(undefined)).toBe('general')
    })
  })

  describe('getCategoryTitle', () => {
    it('returns the human readable title for a category id', () => {
      expect(getCategoryTitle('general')).toBe('General')
      expect(getCategoryTitle('formatting')).toBe(
        'Formatting and typography'
      )
    })
  })
})
