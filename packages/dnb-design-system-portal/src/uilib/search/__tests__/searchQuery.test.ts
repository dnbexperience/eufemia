import { describe, it, expect } from 'vitest'
import { findAncestorPages, flattenPageEdges } from '../algoliaRecords.js'

describe('algoliaRecords', () => {
  const makeNode = (node) => [
    {
      node: { siblings: [], headings: [], ...node },
    },
  ]

  it('should skip node when no title is found', () => {
    expect(
      flattenPageEdges(
        makeNode({ fields: { slug: '/page' }, frontmatter: {} })
      )
    ).toHaveLength(0)
  })

  it('should remove node when draft is given', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page' },
          frontmatter: { draft: true },
        })
      )
    ).toHaveLength(0)
  })

  it('should remove release pages from Algolia records', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: {
            slug: 'uilib/about-the-lib/releases/eufemia/v11-info',
          },
          frontmatter: { title: 'v11' },
        })
      )
    ).toHaveLength(0)
  })

  it('should remove changelog pages from Algolia records', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: 'EUFEMIA_CHANGELOG' },
          frontmatter: { title: 'Changelog' },
        })
      )
    ).toHaveLength(0)
  })

  it('should collect headings', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page' },
          frontmatter: {},
          headings: [{ value: 'Heading 1', depth: 1 }],
        })
      )
    ).toEqual([{ headings: [], slug: '/page', title: 'Heading 1' }])
  })

  it('should collect frontmatter title and headings', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page' },
          frontmatter: { title: 'Title 1' },
          headings: [
            { value: 'Heading 1', depth: 1 },
            { value: 'Heading 2', depth: 2 },
          ],
        })
      )
    ).toEqual([
      {
        slug: '/page',
        title: 'Title 1',
        headings: [
          {
            slug: 'heading-1',
            value: 'Heading 1',
            depth: 1,
          },
          {
            slug: 'heading-2',
            value: 'Heading 2',
            depth: 2,
          },
        ],
      },
    ])
  })

  it('should use frontmatter search field as title', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page' },
          frontmatter: { search: 'search string' },
          headings: [{ value: 'Heading 1', depth: 1 }],
        })
      )
    ).toEqual([
      {
        slug: '/page',
        title: 'search string',
        search: null,
        headings: [
          {
            slug: 'heading-1',
            value: 'Heading 1',
            depth: 1,
          },
        ],
      },
    ])
  })

  it('should collect siblings and use it as category', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page-1' },
          frontmatter: { title: 'Title 1' },
          headings: [{ value: 'Heading 1', depth: 1 }],
          siblings: [
            {
              fields: { slug: '/page-2' },
              frontmatter: { title: 'Title 2' },
              headings: [{ value: 'Heading 2', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 2' }],
          slug: '/page-2',
          title: 'Title 2',
        },
        headings: [{ depth: 1, slug: 'heading-1', value: 'Heading 1' }],
        slug: '/page-1',
        title: 'Title 1',
      },
    ])
  })

  it('should use heading depth 2 from headings, when no title else exist', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page-1' },
          frontmatter: {},
          headings: [
            { value: 'Heading 2', depth: 2 },
            { value: 'Heading 3', depth: 3 },
          ],
          siblings: [
            {
              fields: { slug: '/page-2' },
              frontmatter: { title: 'Title 2' },
              headings: [{ value: 'Heading 2', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 2' }],
          slug: '/page-2',
          title: 'Title 2',
        },
        headings: [{ depth: 3, slug: 'heading-3', value: 'Heading 3' }],
        slug: '/page-1',
        title: 'Heading 2',
      },
    ])
  })

  it('should use title from siblings, when slug matches', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/page-1' },
          frontmatter: {},
          headings: [
            { value: 'Heading 2', depth: 2 },
            { value: 'Heading 3', depth: 3 },
          ],
          siblings: [
            {
              fields: { slug: '/page-1' },
              frontmatter: { title: 'Title 1' },
              headings: [{ value: 'Heading 1', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 1' }],
          slug: '/page-1',
          title: 'Title 1',
        },
        headings: [{ depth: 3, slug: 'heading-3', value: 'Heading 3' }],
        slug: '/page-1',
        title: 'Title 1 → Heading 2',
      },
    ])
  })

  it('should use closest sibling with title when multiple siblings exist', () => {
    expect(
      flattenPageEdges(
        makeNode({
          fields: { slug: '/uilib/components/country-flag/properties' },
          frontmatter: {},
          headings: [{ value: 'Properties', depth: 2 }],
          siblings: [
            {
              fields: { slug: '/uilib/components/country-flag' },
              frontmatter: { title: 'CountryFlag' },
            },
            {
              fields: { slug: '/uilib/components' },
              frontmatter: { title: 'Components' },
            },
            {
              fields: { slug: '/uilib' },
              frontmatter: { title: 'UI Library' },
            },
          ],
        })
      )[0].title
    ).toBe('CountryFlag → Properties')
  })

  it('should find ancestors ordered from closest to farthest', () => {
    expect(
      findAncestorPages('/uilib/components/country-flag/properties', [
        {
          fields: { slug: '/uilib' },
          frontmatter: { title: 'UI Library' },
        },
        {
          fields: { slug: '/uilib/components' },
          frontmatter: { title: 'Components' },
        },
        {
          fields: { slug: '/uilib/components/country-flag' },
          frontmatter: { title: 'CountryFlag' },
        },
      ]).map(({ fields }) => fields.slug)
    ).toEqual([
      '/uilib/components/country-flag',
      '/uilib/components',
      '/uilib',
    ])
  })
})
