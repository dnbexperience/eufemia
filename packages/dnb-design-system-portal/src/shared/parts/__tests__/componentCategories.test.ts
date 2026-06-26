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
    it('defines the six known categories in order', () => {
      expect(categoryOrder.map(({ id }) => id)).toEqual([
        'actions',
        'input',
        'navigation',
        'feedback',
        'content',
        'other',
      ])
    })

    it('exposes the ids as a set', () => {
      expect(categoryIds.has('input')).toBe(true)
      expect(categoryIds.has('unknown')).toBe(false)
    })
  })

  describe('excludedSlugs', () => {
    it('excludes the fragments index and the overview page', () => {
      expect(excludedSlugs.has('uilib/components/fragments')).toBe(true)
      expect(excludedSlugs.has('uilib/components/overview')).toBe(true)
      expect(excludedSlugs.has('uilib/components/dropdown')).toBe(false)
    })
  })

  describe('isCategoryId', () => {
    it('accepts known category ids', () => {
      expect(isCategoryId('input')).toBe(true)
      expect(isCategoryId('content')).toBe(true)
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
      expect(getCategoryId('feedback')).toBe('feedback')
    })

    it('returns undefined when the category is explicitly false', () => {
      expect(getCategoryId(false)).toBeUndefined()
    })

    it('falls back to "other" for unknown or missing categories', () => {
      expect(getCategoryId('does-not-exist')).toBe('other')
      expect(getCategoryId(null)).toBe('other')
      expect(getCategoryId(undefined)).toBe('other')
    })
  })

  describe('getCategoryTitle', () => {
    it('returns the human readable title for a category id', () => {
      expect(getCategoryTitle('input')).toBe('Input')
      expect(getCategoryTitle('other')).toBe('Other')
    })
  })
})
