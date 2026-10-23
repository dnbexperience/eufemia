import type { TableOfContentSection } from './types'

export type TocNode = TableOfContentSection & {
  /** Distinguishes the rendered list items from one another. */
  key: number
  subTree: TocNode[]
  /** Left out of the rendered list for being deeper than `maxDepth`. */
  isRendered: boolean
}

/**
 * Returns a tree of the sections based on their level. Flags those too deep
 * for `maxDepth` as not rendered.
 */
export function buildTocTree(
  sections: TableOfContentSection[],
  maxDepth: number
): TocNode[] {
  const levelsBelowTitle = sections
    .filter(({ level }) => level > 1)
    .map(({ level }) => level)
  const firstTocLevel = Math.min(...levelsBelowTitle)

  const tocTree: TocNode[] = []

  const potentialParents: TocNode[] = []

  sections.forEach((section, index) => {
    const tocItem: TocNode = {
      ...section,
      key: index,
      subTree: [],
      isRendered:
        section.level > 1 && section.level < firstTocLevel + maxDepth,
    }

    let parent = potentialParents.at(-1)

    // a potential parent only stays one while it is above the current level
    while (parent && parent.level >= section.level) {
      potentialParents.pop()
      parent = potentialParents.at(-1)
    }

    if (parent) {
      parent.subTree.push(tocItem)
    } else {
      tocTree.push(tocItem)
    }

    // add the current toc item as a potential parent for subsequent sections
    potentialParents.push(tocItem)
  })

  return tocTree
}

/** The items to render in place of the given ones, where a page title is replaced by the sections below it. */
export function itemsToRender(tocTree: TocNode[]): TocNode[] {
  return tocTree
    .flatMap((tocItem) =>
      tocItem.level === 1 ? tocItem.subTree : [tocItem]
    )
    .filter(({ isRendered }) => isRendered)
}

/**
 * Returns the section to mark as current. Will traverse up from currentId to
 * the closest section that is rendered in the toc. If the currentId is above
 * the first then it returns the first rendered section.
 */
export function resolveCurrentId(
  tocTree: TocNode[],
  currentId?: string | null,
  closestRenderedAncestor?: TocNode
): string | null {
  for (const tocItem of tocTree) {
    const closestRendered = tocItem.isRendered
      ? tocItem
      : closestRenderedAncestor

    if (tocItem.id === currentId) {
      if (tocItem.level === 1) {
        // Take the first visible child of h1
        return itemsToRender(tocItem.subTree)[0]?.id ?? null
      }

      return closestRendered?.id ?? null
    }

    const found = resolveCurrentId(
      tocItem.subTree,
      currentId,
      closestRendered
    )
    if (found !== null) {
      return found
    }
  }

  return null
}
