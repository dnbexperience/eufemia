import { describe, it, expect } from 'vitest'
import {
  compareByOrder,
  globPath,
} from '../../client/plugins/portal-pages.shared'
import { createOrderKey } from '../../../src/shared/menu/SidebarMenuOrder'
import type { MdxNode } from '../../client/plugins/portal-pages.shared'

const page = (slug: string) =>
  ({
    fields: { slug, sourcePath: `src/docs/${slug}.mdx` },
    frontmatter: {},
  }) as MdxNode

const matches = (slug: string, pattern: string) =>
  globPath(page(slug), pattern)

describe('globPath', () => {
  describe('a single star stays inside one segment', () => {
    it('matches a direct child', () => {
      expect(matches('uilib/elements/anchor', 'uilib/elements/*')).toBe(
        true
      )
    })

    it('does not match a deeper page', () => {
      expect(
        matches('uilib/elements/anchor/demos', 'uilib/elements/*')
      ).toBe(false)
    })

    it('does not match the section page itself', () => {
      expect(matches('uilib/elements', 'uilib/elements/*')).toBe(false)
    })
  })

  describe('a double star spans segments', () => {
    it('matches a direct child', () => {
      expect(matches('uilib/elements/anchor', 'uilib/elements/**')).toBe(
        true
      )
    })

    it('matches a deeper page', () => {
      expect(
        matches('uilib/elements/anchor/demos', 'uilib/elements/**')
      ).toBe(true)
    })

    it('matches no segments at all', () => {
      expect(matches('uilib/elements', 'uilib/elements/**')).toBe(true)
    })

    it('requires at least one segment when followed by a star', () => {
      expect(matches('uilib/elements', 'uilib/elements/**/*')).toBe(false)
      expect(matches('uilib/elements/anchor', 'uilib/elements/**/*')).toBe(
        true
      )
      expect(
        matches('uilib/elements/anchor/demos', 'uilib/elements/**/*')
      ).toBe(true)
    })

    it('matches a leading double star', () => {
      expect(matches('uilib/elements/anchor', '**/elements/*')).toBe(true)
      expect(matches('elements/anchor', '**/elements/*')).toBe(true)
    })
  })

  describe('partial segments', () => {
    it('matches a prefix', () => {
      expect(
        matches('uilib/components/button', 'uilib/components/b*')
      ).toBe(true)
      expect(
        matches('uilib/components/anchor', 'uilib/components/b*')
      ).toBe(false)
    })

    it('matches a suffix', () => {
      expect(
        matches('uilib/releases/v11-info', 'uilib/releases/*-info')
      ).toBe(true)
      expect(
        matches('uilib/releases/v11-draft', 'uilib/releases/*-info')
      ).toBe(false)
    })

    it('matches around a middle part', () => {
      expect(matches('uilib/components/x', 'uilib/*component*/x')).toBe(
        true
      )
    })

    it('does not let a star cross a segment boundary', () => {
      expect(matches('uilib/elements/anchor', 'uilib/*')).toBe(false)
    })
  })

  describe('exact patterns', () => {
    it('matches an exact slug', () => {
      expect(matches('uilib/elements', 'uilib/elements')).toBe(true)
    })

    it('rejects a different slug', () => {
      expect(matches('uilib/components', 'uilib/elements')).toBe(false)
    })

    it('rejects a prefix of the pattern', () => {
      expect(matches('uilib', 'uilib/elements')).toBe(false)
    })
  })

  describe('the real patterns used by the portal', () => {
    it('selects direct children for base-fields', () => {
      const pattern = 'uilib/extensions/forms/base-fields/*'

      expect(
        matches('uilib/extensions/forms/base-fields/String', pattern)
      ).toBe(true)
      expect(
        matches('uilib/extensions/forms/base-fields/Toggle/demos', pattern)
      ).toBe(false)
    })

    it('selects any depth for Form', () => {
      const pattern = 'uilib/extensions/forms/Form/**'

      expect(matches('uilib/extensions/forms/Form/Handler', pattern)).toBe(
        true
      )
      expect(
        matches('uilib/extensions/forms/Form/Handler/demos', pattern)
      ).toBe(true)
    })

    it('keeps extensions to its own direct children', () => {
      const pattern = 'uilib/extensions/*'

      expect(matches('uilib/extensions/forms', pattern)).toBe(true)
      expect(matches('uilib/extensions/forms/Form/Handler', pattern)).toBe(
        false
      )
    })
  })
})

describe('compareByOrder', () => {
  // Wrapped in an object because `Array.sort` moves an `undefined` element
  // to the end, without ever asking the comparator.
  const sortByOrder = (orders: Array<number | undefined>) =>
    orders
      .map((order) => ({ order }))
      .sort((a, b) => compareByOrder(a.order, b.order))
      .map(({ order }) => order)

  it('puts positive order first, unordered and 0 in the middle, and negative last', () => {
    expect(sortByOrder([-1, undefined, 1, 0])).toEqual([
      1,
      undefined,
      0,
      -1,
    ])
  })

  it('sorts numerically within a group', () => {
    expect(sortByOrder([100, 2, 999, 11, 1])).toEqual([1, 2, 11, 100, 999])
    expect(sortByOrder([-1, -100, -999, -11])).toEqual([
      -999, -100, -11, -1,
    ])
  })

  it('sorts a fractional order between its surrounding integers', () => {
    expect(sortByOrder([101, 4, 4.5, 5, -4, -4.18, -5])).toEqual([
      4, 4.5, 5, 101, -5, -4.18, -4,
    ])
  })

  it('keeps unordered pages in the order they came in', () => {
    expect(sortByOrder([undefined, 0, undefined])).toEqual([
      undefined,
      0,
      undefined,
    ])
  })

  it('agrees with the sidebar menu ordering', () => {
    const orders = [3, 1, -2, undefined, 0, -1, 2.5, 999, -999]
    const bySidebar = orders
      .map((order) => ({ order }))
      .sort((a, b) => {
        const keyA = createOrderKey(a.order, 0)
        const keyB = createOrderKey(b.order, 0)

        return keyA < keyB ? -1 : keyA > keyB ? 1 : 0
      })
      .map(({ order }) => order)

    expect(sortByOrder(orders)).toEqual(bySidebar)
  })
})
