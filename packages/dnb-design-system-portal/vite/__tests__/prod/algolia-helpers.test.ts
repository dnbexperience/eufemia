import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import {
  makeSlug,
  shouldIncludeInAlgolia,
  buildAlgoliaRecord,
  findAncestorPages,
  excludedSlugPartials,
} from '../../prod/algolia-helpers.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(__dirname, '../..')

describe('algolia-helpers', () => {
  describe('makeSlug', () => {
    it('should slugify a heading value', () => {
      expect(makeSlug('Hello World')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(makeSlug('Ä Ö Ü')).toBe('ä-ö-ü')
    })
  })

  describe('shouldIncludeInAlgolia', () => {
    it('should include a regular page', () => {
      expect(
        shouldIncludeInAlgolia({ slug: '/uilib/components/button' })
      ).toBe(true)
    })

    it('should exclude not_in_use pages', () => {
      expect(
        shouldIncludeInAlgolia({ slug: '/uilib/not_in_use/old-page' })
      ).toBe(false)
    })

    it('should exclude drafts', () => {
      expect(
        shouldIncludeInAlgolia({
          slug: '/uilib/components/button',
          draft: true,
        })
      ).toBe(false)
    })

    it.each(excludedSlugPartials)(
      'should exclude pages matching "%s"',
      (partial) => {
        expect(
          shouldIncludeInAlgolia({ slug: `${partial}some-page` })
        ).toBe(false)
      }
    )
  })

  describe('buildAlgoliaRecord', () => {
    it('should return null when no title or description exists', () => {
      expect(
        buildAlgoliaRecord({
          fields: { slug: '/page' },
          frontmatter: {},
          headings: [],
          siblings: [],
        })
      ).toBeNull()
    })

    it('should use frontmatter title', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: { title: 'My Page' },
        headings: [],
        siblings: [],
      })

      expect(result).toMatchObject({
        slug: '/page',
        title: 'My Page',
      })
    })

    it('should promote h1 heading to title when frontmatter has no title', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: {},
        headings: [{ value: 'Heading 1', depth: 1 }],
        siblings: [],
      })

      expect(result).toMatchObject({
        slug: '/page',
        title: 'Heading 1',
      })
      expect(result.headings).toHaveLength(0)
    })

    it('should use frontmatter search field as title', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: { search: 'search string' },
        headings: [{ value: 'Heading 1', depth: 1 }],
        siblings: [],
      })

      expect(result).toMatchObject({
        slug: '/page',
        title: 'search string',
        search: null,
      })
    })

    it('should add slug to headings without one', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: { title: 'Title' },
        headings: [{ value: 'Some Heading', depth: 2 }],
        siblings: [],
      })

      expect(result.headings[0]).toMatchObject({
        value: 'Some Heading',
        slug: 'some-heading',
      })
    })

    it('should set category from the first sibling', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: { title: 'Title' },
        headings: [],
        siblings: [
          {
            fields: { slug: '/category' },
            frontmatter: { title: 'Category' },
          },
        ],
      })

      expect(result.category).toMatchObject({
        slug: '/category',
        title: 'Category',
      })
    })

    it('should combine sibling title with h2 heading', () => {
      const result = buildAlgoliaRecord({
        fields: { slug: '/page' },
        frontmatter: {},
        headings: [{ value: 'Properties', depth: 2 }],
        siblings: [
          {
            fields: { slug: '/page' },
            frontmatter: { title: 'Button' },
          },
        ],
      })

      expect(result.title).toBe('Button \u2192 Properties')
    })
  })

  describe('findAncestorPages', () => {
    const nodes = [
      {
        fields: { slug: '/uilib' },
        frontmatter: { title: 'UI Library' },
      },
      {
        fields: { slug: '/uilib/components' },
        frontmatter: { title: 'Components' },
      },
      {
        fields: { slug: '/uilib/components/button' },
        frontmatter: { title: 'Button' },
      },
    ]

    it('should find ancestors ordered from closest to farthest', () => {
      const result = findAncestorPages(
        '/uilib/components/button/properties',
        nodes
      )

      expect(result.map(({ fields }) => fields.slug)).toEqual([
        '/uilib/components/button',
        '/uilib/components',
        '/uilib',
      ])
    })

    it('should not include the page itself', () => {
      const result = findAncestorPages('/uilib/components/button', nodes)

      expect(result.map(({ fields }) => fields.slug)).toEqual([
        '/uilib/components',
        '/uilib',
      ])
    })

    it('should skip nodes without a title', () => {
      const result = findAncestorPages('/uilib/components/button', [
        { fields: { slug: '/uilib' }, frontmatter: {} },
      ])

      expect(result).toHaveLength(0)
    })

    it('should return empty array when no ancestors exist', () => {
      expect(findAncestorPages('/uilib', nodes)).toHaveLength(0)
    })
  })

  describe('push-algolia.mjs', () => {
    it('should run under plain Node without module resolution errors', () => {
      const script = path.resolve(portalRoot, 'prod/push-algolia.mjs')

      expect(() => {
        execFileSync(process.execPath, [script, '--dry-run'], {
          cwd: portalRoot,
          stdio: 'pipe',
          timeout: 30_000,
        })
      }).not.toThrow()
    })
  })
})
