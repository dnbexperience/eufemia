import { describe, it, expect } from 'vitest'
import { buildTocTree, resolveCurrentIndex } from '../PageToc'

const item = (level: number, id: string) => ({
  title: id,
  url: `#${id}`,
  level,
})

const headings = [
  item(1, 'title'),
  item(2, 'a'),
  item(3, 'a-1'),
  item(4, 'a-1-1'),
  item(2, 'b'),
]

const visibleIds = (maxDepth = 2) => {
  const walk = (nodes: ReturnType<typeof buildTocTree>) =>
    nodes.flatMap((node) => [
      ...(node.isHidden ? [] : [node.title]),
      ...walk(node.subTree),
    ])
  return walk(buildTocTree(headings, maxDepth))
}

describe('buildTocTree', () => {
  it('returns nothing when there are no headings', () => {
    expect(buildTocTree([], 2)).toEqual([])
  })

  it('nests each heading below the previous higher level', () => {
    const [title] = buildTocTree(headings, 2)
    expect(title.url).toBe('#title')

    const [a, b] = title.subTree
    expect(a.url).toBe('#a')
    expect(a.subTree[0].url).toBe('#a-1')
    expect(a.subTree[0].subTree[0].url).toBe('#a-1-1')
    expect(b.url).toBe('#b')
  })

  it('keeps two levels visible when asked for two', () => {
    expect(visibleIds(2)).toEqual(['a', 'a-1', 'b'])
  })

  it('keeps only the highest level visible when asked for one', () => {
    expect(visibleIds(1)).toEqual(['a', 'b'])
  })

  it('keeps three levels visible when asked for three', () => {
    expect(visibleIds(3)).toEqual(['a', 'a-1', 'a-1-1', 'b'])
  })

  it('leaves out the page title', () => {
    expect(visibleIds(4)).not.toContain('title')
  })

  it('starts at the highest level found, not at level 2', () => {
    const tree = buildTocTree(
      [item(3, 'a'), item(4, 'a-1'), item(5, 'deep')],
      2
    )
    expect(tree[0].isHidden).toBe(false)
    expect(tree[0].subTree[0].isHidden).toBe(false)
    expect(tree[0].subTree[0].subTree[0].isHidden).toBe(true)
  })

  it('hides the page title', () => {
    expect(buildTocTree([item(1, 'title')], 2)[0].isHidden).toBe(true)
  })
})

describe('resolveCurrentIndex', () => {
  const tree = buildTocTree(headings, 2)

  const [title, a, aOne, aOneOne] = headings.map((_, index) => index)

  it('returns null when nothing is current', () => {
    expect(resolveCurrentIndex(tree, null)).toBeNull()
  })

  it('keeps a heading that is rendered', () => {
    expect(resolveCurrentIndex(tree, aOne)).toBe(aOne)
  })

  it('falls back to the closest rendered ancestor', () => {
    expect(resolveCurrentIndex(tree, aOneOne)).toBe(aOne)
  })

  it('falls back across several hidden levels', () => {
    expect(resolveCurrentIndex(buildTocTree(headings, 1), aOneOne)).toBe(a)
  })

  it('marks the first heading below the page title', () => {
    expect(resolveCurrentIndex(tree, title)).toBe(a)
  })

  it('returns null for a heading that is not in the tree', () => {
    expect(resolveCurrentIndex(tree, headings.length)).toBeNull()
  })

  it('returns null when nothing is rendered', () => {
    expect(
      resolveCurrentIndex(buildTocTree([item(1, 'title')], 2), 0)
    ).toBeNull()
  })

  it('marks the heading at the given position when several share an id', () => {
    const duplicates = [
      item(1, 'title'),
      item(2, 'a'),
      item(2, 'shared'),
      item(2, 'b'),
      item(2, 'shared'),
    ]

    expect(resolveCurrentIndex(buildTocTree(duplicates, 2), 4)).toBe(4)
  })
})
