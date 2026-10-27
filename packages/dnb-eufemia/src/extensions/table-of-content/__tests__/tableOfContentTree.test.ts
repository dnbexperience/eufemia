import { describe, it, expect } from 'vitest'
import {
  buildTocTree,
  resolveCurrentId,
  itemsToRender,
} from '../tableOfContentTree'

const item = (level: number, id: string) => ({
  text: id,
  id,
  level,
})

const sections = [
  item(1, 'title'),
  item(2, 'a'),
  item(3, 'a-1'),
  item(4, 'a-1-1'),
  item(2, 'b'),
]

const renderedIds = (maxDepth = 2) => {
  const walk = (nodes: ReturnType<typeof buildTocTree>) =>
    nodes.flatMap((node) => [
      ...(node.isRendered ? [node.text] : []),
      ...walk(node.subTree),
    ])
  return walk(buildTocTree(sections, maxDepth))
}

describe('buildTocTree', () => {
  it('returns nothing when there are no sections', () => {
    expect(buildTocTree([], 2)).toEqual([])
  })

  it('nests each section below the previous higher level', () => {
    const [title] = buildTocTree(sections, 2)
    expect(title.id).toBe('title')

    const [a, b] = title.subTree
    expect(a.id).toBe('a')
    expect(a.subTree[0].id).toBe('a-1')
    expect(a.subTree[0].subTree[0].id).toBe('a-1-1')
    expect(b.id).toBe('b')
  })

  it('renders two levels when asked for two', () => {
    expect(renderedIds(2)).toEqual(['a', 'a-1', 'b'])
  })

  it('renders only the highest level when asked for one', () => {
    expect(renderedIds(1)).toEqual(['a', 'b'])
  })

  it('renders three levels when asked for three', () => {
    expect(renderedIds(3)).toEqual(['a', 'a-1', 'a-1-1', 'b'])
  })

  it('leaves out the page title', () => {
    expect(renderedIds(4)).not.toContain('title')
  })

  it('starts at the highest level found, not at level 2', () => {
    const tree = buildTocTree(
      [item(3, 'a'), item(4, 'a-1'), item(5, 'deep')],
      2
    )
    expect(tree[0].isRendered).toBe(true)
    expect(tree[0].subTree[0].isRendered).toBe(true)
    expect(tree[0].subTree[0].subTree[0].isRendered).toBe(false)
  })

  it('omits the page title by default', () => {
    expect(buildTocTree([item(1, 'title')], 2)[0].isRendered).toBe(false)
  })
})

describe('itemsToRender', () => {
  it('includes opted-in page titles as peers without changing section depth', () => {
    const tree = buildTocTree(sections, 2, true)
    const roots = itemsToRender(tree)
    expect(roots.map(({ id }) => id)).toEqual(['title', 'a', 'b'])
    expect(roots[0].subTree).toEqual([])
    expect(itemsToRender(roots[1].subTree).map(({ id }) => id)).toEqual([
      'a-1',
    ])
    expect(resolveCurrentId(tree, 'title')).toBe('title')
    expect(resolveCurrentId(tree, 'a-1-1')).toBe('a-1')
  })

  it('supports title-only pages and multiple title groups', () => {
    expect(
      itemsToRender(buildTocTree([item(1, 'title')], 2, true)).map(
        ({ id }) => id
      )
    ).toEqual(['title'])
    expect(
      itemsToRender(
        buildTocTree(
          [
            item(1, 'title'),
            item(2, 'a'),
            item(1, 'second'),
            item(2, 'b'),
          ],
          1,
          true
        )
      ).map(({ id }) => id)
    ).toEqual(['title', 'a', 'second', 'b'])
    expect(itemsToRender(buildTocTree(sections, 0, true))).toEqual([])
  })
  it('starts the list below the page title', () => {
    const roots = itemsToRender(buildTocTree(sections, 2))
    expect(roots.map(({ id }) => id)).toEqual(['a', 'b'])
  })

  it('keeps the sections of every page title', () => {
    const roots = itemsToRender(
      buildTocTree(
        [item(1, 'title'), item(2, 'a'), item(1, 'title-2'), item(2, 'b')],
        2
      )
    )
    expect(roots.map(({ id }) => id)).toEqual(['a', 'b'])
  })

  it('keeps sections that have no page title above them', () => {
    const roots = itemsToRender(buildTocTree([item(2, 'a')], 2))
    expect(roots.map(({ id }) => id)).toEqual(['a'])
  })
})

describe('resolveCurrentId', () => {
  const tree = buildTocTree(sections, 2)

  it('returns null when nothing is current', () => {
    expect(resolveCurrentId(tree, null)).toBeNull()
  })

  it('keeps a section that is rendered', () => {
    expect(resolveCurrentId(tree, 'a-1')).toBe('a-1')
  })

  it('falls back to the closest rendered ancestor', () => {
    expect(resolveCurrentId(tree, 'a-1-1')).toBe('a-1')
  })

  it('falls back across several hidden levels', () => {
    expect(resolveCurrentId(buildTocTree(sections, 1), 'a-1-1')).toBe('a')
  })

  it('marks the first section below the page title', () => {
    expect(resolveCurrentId(tree, 'title')).toBe('a')
  })

  it('marks the first section below a mid-page title', () => {
    const tree = buildTocTree(
      [item(1, 'title'), item(2, 'a'), item(1, 'title-2'), item(2, 'b')],
      2
    )
    expect(resolveCurrentId(tree, 'title-2')).toBe('b')
  })

  it('returns null for a section that is not in the tree', () => {
    expect(resolveCurrentId(tree, 'nowhere')).toBeNull()
  })

  it('returns null when nothing is rendered', () => {
    expect(
      resolveCurrentId(buildTocTree([item(1, 'title')], 2), 'title')
    ).toBeNull()
  })
})
