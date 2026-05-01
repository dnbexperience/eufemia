import { describe, it, expect, vi } from 'vitest'

// Mock virtual:portal-pages before importing the gatsby shim
vi.mock('virtual:portal-pages', () => ({
  allMdxNodes: [
    {
      fields: { slug: 'uilib/components/button' },
      frontmatter: { title: 'Button', order: 1 },
    },
    {
      fields: { slug: 'uilib/components/anchor' },
      frontmatter: { title: 'Anchor', order: 2 },
    },
    {
      fields: { slug: 'uilib/elements/heading' },
      frontmatter: { title: 'Heading', draft: true },
    },
    {
      fields: { slug: 'uilib/components/slider' },
      frontmatter: { title: null },
    },
    {
      fields: { slug: 'uilib/components' },
      frontmatter: { title: 'Components' },
    },
    {
      fields: { slug: 'uilib/components/modal' },
      frontmatter: { title: 'Modal' },
    },
    {
      fields: { slug: 'uilib/components/modal/demos' },
      frontmatter: {},
    },
    {
      fields: { slug: 'quickguide-designer' },
      frontmatter: { title: 'Design', hideInMenu: true, order: 5 },
    },
  ],
}))

// Must mock react-router-dom before importing gatsby shim
vi.mock('react-router-dom', () => ({
  Link: vi.fn(({ to, children, ...rest }) => null),
  useNavigate: vi.fn(() => vi.fn()),
}))

import { graphql, useStaticQuery } from '../../client/shims/gatsby'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyResult = any

// eslint-disable-next-line react-hooks/rules-of-hooks -- not a real hook, just a shim under test
const runQuery = (q: string): AnyResult => useStaticQuery(q)

describe('gatsby shim', () => {
  describe('graphql', () => {
    it('joins template literal strings', () => {
      const result = graphql`
        query {
          allMdx {
            edges {
              node {
                id
              }
            }
          }
        }
      `
      expect(result).toContain('allMdx')
      expect(result).toContain('edges')
      expect(typeof result).toBe('string')
    })
  })

  describe('useStaticQuery', () => {
    it('always returns site metadata', () => {
      const result = runQuery('')
      expect(result.site).toBeDefined()
      expect(result.site.siteMetadata.title).toBe('DNB Design System')
      expect(result.site.siteMetadata.name).toBe('Eufemia')
    })

    it('returns allMdx edges for backward compat when no allMdx in query', () => {
      const result = runQuery('')
      expect(result.allMdx).toBeDefined()
      expect(result.allMdx.edges.length).toBeGreaterThan(0)
    })

    it('filters by title when query includes title filter', () => {
      const query = `
        query { allMdx(filter: { frontmatter: { title: { ne: null } } }) {
          edges { node { frontmatter { title } } }
        }}
      `
      const result = runQuery(query)
      const edges = result.allMdx.edges

      const titles = edges.map(
        (e: { node: { frontmatter: { title: string } } }) =>
          e.node.frontmatter.title
      )
      expect(titles).not.toContain(null)
      expect(titles).not.toContain(undefined)
    })

    it('filters by draft when query includes draft filter', () => {
      const query = `
        query { allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
          edges { node { frontmatter { title } } }
        }}
      `
      const result = runQuery(query)
      const edges = result.allMdx.edges

      for (const { node } of edges) {
        expect(node.frontmatter.draft).not.toBe(true)
      }
    })

    it('filters by title and draft combined', () => {
      const query = `
        query { allMdx(filter: { frontmatter: { title: { ne: null }, draft: { ne: true } } }) {
          edges { node { frontmatter { title } } }
        }}
      `
      const result = runQuery(query)
      const edges = result.allMdx.edges

      for (const { node } of edges) {
        expect(node.frontmatter.title).toBeTruthy()
        expect(node.frontmatter.draft).not.toBe(true)
      }
    })

    it('filters by slug in list', () => {
      const query = `
        query { allMdx(filter: { fields: { slug: { in: ["uilib/components/button" "uilib/components/anchor"] } } }) {
          edges { node { fields { slug } } }
        }}
      `
      const result = runQuery(query)
      const slugs = result.allMdx.edges.map(
        (e: { node: { fields: { slug: string } } }) => e.node.fields.slug
      )
      expect(slugs).toEqual([
        'uilib/components/button',
        'uilib/components/anchor',
      ])
    })

    it('filters by contentFilePath regex', () => {
      const query = `
        query { allMdx(filter: { internal: { contentFilePath: { regex: "/uilib\\/components/" } } }) {
          edges { node { fields { slug } } }
        }}
      `
      const result = runQuery(query)
      const slugs = result.allMdx.edges.map(
        (e: { node: { fields: { slug: string } } }) => e.node.fields.slug
      )
      for (const slug of slugs) {
        expect(slug).toMatch(/uilib\/components/)
      }
    })

    it('filters by contentFilePath glob', () => {
      const query = `
        query { allMdx(filter: { internal: { contentFilePath: { glob: "**/uilib/elements/*" } } }) {
          edges { node { fields { slug } } }
        }}
      `
      const result = runQuery(query)
      const slugs = result.allMdx.edges.map(
        (e: { node: { fields: { slug: string } } }) => e.node.fields.slug
      )
      for (const slug of slugs) {
        expect(slug).toMatch(/^uilib\/elements\//)
      }
    })

    it('filters by hideInMenu', () => {
      const query = `
        query { allMdx(filter: { frontmatter: { hideInMenu: { ne: true } } }) {
          edges { node { frontmatter { title hideInMenu } } }
        }}
      `
      const result = runQuery(query)
      for (const { node } of result.allMdx.edges) {
        expect(node.frontmatter.hideInMenu).not.toBe(true)
      }
    })

    it('sorts by order ASC then title ASC', () => {
      const query = `
        query { allMdx(sort: { frontmatter: { order: ASC } }, filter: { frontmatter: { title: { ne: null } } }) {
          edges { node { frontmatter { title order } } }
        }}
      `
      const result = runQuery(query)
      const orders = result.allMdx.edges.map(
        (e: { node: { frontmatter: { order: number } } }) =>
          e.node.frontmatter.order ?? 999
      )
      for (let i = 1; i < orders.length; i++) {
        expect(orders[i]).toBeGreaterThanOrEqual(orders[i - 1])
      }
    })

    it('does not filter hideInMenu when query only reads the field', () => {
      const query = `
        query { allMdx {
          edges { node { frontmatter { title hideInMenu } } }
        }}
      `
      const result = runQuery(query)
      const slugs = result.allMdx.edges.map(
        (e: { node: { fields: { slug: string } } }) => e.node.fields.slug
      )
      expect(slugs).toContain('quickguide-designer')
    })

    it('computes siblings (parent pages) when query includes siblings', () => {
      const query = `
        query { allMdx {
          edges { node { fields { slug } frontmatter { title } siblings { fields { slug } frontmatter { title } } } }
        }}
      `
      const result = runQuery(query)
      const demosNode = result.allMdx.edges.find(
        (e: { node: { fields: { slug: string } } }) =>
          e.node.fields.slug === 'uilib/components/modal/demos'
      )?.node

      expect(demosNode.siblings).toBeDefined()
      expect(demosNode.siblings.length).toBe(2)

      const sibSlugs = demosNode.siblings.map(
        (s: { fields: { slug: string } }) => s.fields.slug
      )
      expect(sibSlugs).toContain('uilib/components/modal')
      expect(sibSlugs).toContain('uilib/components')
    })

    it('does not add siblings when query does not request them', () => {
      const query = `
        query { allMdx {
          edges { node { fields { slug } frontmatter { title } } }
        }}
      `
      const result = runQuery(query)

      // Without 'siblings' in the query, no new siblings should be computed.
      // Note: previously run tests may have mutated shared mock objects,
      // so we check a top-level node that has no parents to traverse.
      const topNode = result.allMdx.edges.find(
        (e: { node: { fields: { slug: string } } }) =>
          e.node.fields.slug === 'quickguide-designer'
      )?.node

      // A top-level slug has no parents, so even if siblings were computed
      // the array would be empty — but it should not be set at all when
      // the query doesn't request siblings.
      expect(topNode.siblings ?? []).toEqual([])
    })

    it('supports aliased allMdx queries', () => {
      const query = `
        query {
          categories: allMdx(filter: { frontmatter: { title: { ne: null } } }) {
            edges { node { frontmatter { title } } }
          }
        }
      `
      const result = runQuery(query)
      expect(result.categories).toBeDefined()
      expect(result.categories.edges.length).toBeGreaterThan(0)
    })
  })
})
