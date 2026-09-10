import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ScrollView,
  Anchor,
  Button,
  HeightAnimation,
} from '@dnb/eufemia/src/components'
import { useMediaQuery } from '@dnb/eufemia/src/shared'
import styles from './PageToc.module.scss'

// keep in sync with scroll-padding-block in PageToc.module.scss
const SCROLL_PADDING = 16

export type PageTocHeading = {
  title: string
  url: string
  level: number
}

type PageTocProps = {
  /** Flat list of headings in page order */
  headings: PageTocHeading[]
  /** Position in `headings`. May point to a heading that is too deep to be rendered, in which case its closest rendered ancestor is highlighted. */
  currentIndex?: number | null
  /** How many heading levels to render, counting from the highest level found. Defaults to `2`. */
  maxDepth?: number
}

type TocNode = PageTocHeading & {
  /** Position in the flat list of headings, which is the identity of a heading. Anchor ids may repeat across a page. */
  index: number
  subTree: TocNode[]
  /** Left out of the rendered list for being deeper than `maxDepth`. */
  isHidden: boolean
}

/**
 * Turn flat list of headings into a tree, setting the `isHidden` flag
 * for headings that are deeper than `maxDepth`.
 */
export function buildTocTree(
  headings: PageTocHeading[],
  maxDepth: number
): TocNode[] {
  const levelsBelowTitle = headings
    .filter(({ level }) => level > 1)
    .map(({ level }) => level)
  const firstTocLevel = Math.min(...levelsBelowTitle)

  const tocTree: TocNode[] = []

  const potentialParents: TocNode[] = []

  headings.forEach((heading, index) => {
    const tocItem: TocNode = {
      ...heading,
      index,
      subTree: [],
      isHidden:
        heading.level === 1 || heading.level >= firstTocLevel + maxDepth,
    }

    let parent = potentialParents.at(-1)

    // remove any potential parents that are not actually parents of the current heading
    while (parent && parent.level >= heading.level) {
      potentialParents.pop()
      parent = potentialParents.at(-1)
    }

    if (parent) {
      parent.subTree.push(tocItem)
    } else {
      tocTree.push(tocItem)
    }

    // add the current toc item as a potential parent for subsequent headings
    potentialParents.push(tocItem)
  })

  return tocTree
}

/**
 * Returns only the visible toc items.
 */
function pruneTocTree(tocTree: TocNode[]): TocNode[] {
  return tocTree.filter(({ isHidden }) => !isHidden)
}

/**
 * Returns the heading to mark as current, which has to be one of the given toc
 * items. A visible heading marks itself, and a hidden one marks its closest
 * visible ancestor. The page title, which is never visible and has no
 * ancestor, marks the first heading below it. Anything else leaves nothing
 * marked.
 */
export function resolveCurrentIndex(
  tocTree: TocNode[],
  currentIndex?: number | null,
  closestVisibleAncestor?: TocNode
): number | null {
  for (const tocItem of tocTree) {
    const closestVisible = tocItem.isHidden
      ? closestVisibleAncestor
      : tocItem

    if (tocItem.index === currentIndex) {
      if (tocItem.level === 1) {
        // Take the first visible child of h1
        return pruneTocTree(tocItem.subTree)[0]?.index ?? null
      }

      return closestVisible?.index ?? null
    }

    const found = resolveCurrentIndex(
      tocItem.subTree,
      currentIndex,
      closestVisible
    )
    if (found !== null) {
      return found
    }
  }

  return null
}

export default function PageToc({
  headings,
  currentIndex,
  maxDepth = 2,
}: PageTocProps) {
  const tocTree = useMemo(
    () => buildTocTree(headings, maxDepth),
    [headings, maxDepth]
  )

  const currentVisibleIndex = useMemo(
    () => resolveCurrentIndex(tocTree, currentIndex),
    [tocTree, currentIndex]
  )

  const scrollRef = useRef<HTMLDivElement>(null)

  const isLargeScreen = useMediaQuery({ when: { min: 'large' } })
  const [isExpanded, setIsExpanded] = useState(false)
  const [animateReady, setAnimateReady] = useState(!isLargeScreen)

  useEffect(() => {
    // delays height animation with setState in useEffect so it doesnt trigger on screen size change to small
    setAnimateReady(!isLargeScreen)
  }, [isLargeScreen])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || currentVisibleIndex === null) {
      return
    }

    const currentLink = container.querySelector<HTMLAnchorElement>(
      'a[aria-current="true"]'
    )
    if (currentLink) {
      revealInScroller(container, currentLink)
    }
  }, [currentVisibleIndex])

  // the page title holds every heading below it, so the list starts one level deep
  const rootTocTree = pruneTocTree(
    tocTree[0]?.level === 1 ? tocTree[0].subTree : tocTree
  )

  if (rootTocTree.length === 0) {
    return null
  }

  const renderLink = (tocItem: TocNode) => {
    const isCurrent = tocItem.index === currentVisibleIndex
    return (
      <Anchor
        href={tocItem.url}
        aria-current={isCurrent ? 'true' : undefined}
        className={
          isLargeScreen
            ? isCurrent
              ? `${styles['page-toc__link']} ${styles['page-toc__link--current']}`
              : styles['page-toc__link']
            : undefined
        }
        noStyle={isLargeScreen}
        noUnderline={isLargeScreen}
        noHover={isLargeScreen}
        noAnimation={isLargeScreen}
      >
        {tocItem.title}
      </Anchor>
    )
  }

  const renderList = (tocTree: TocNode[], isSubList = false) => (
    <ul
      className={
        isSubList ? styles['page-toc__sub-list'] : styles['page-toc__list']
      }
    >
      {tocTree.map((tocItem) => {
        const childTocTree = pruneTocTree(tocItem.subTree)
        return (
          <li key={tocItem.index}>
            {renderLink(tocItem)}

            {childTocTree.length > 0 && renderList(childTocTree, true)}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav aria-labelledby="page-toc-title" className={styles['page-toc']}>
      {isLargeScreen ? (
        <p id="page-toc-title" className={styles['page-toc__title']}>
          On this page
        </p>
      ) : (
        <Button
          id="page-toc-title"
          variant="tertiary"
          icon={isExpanded ? 'chevron_up' : 'chevron_down'}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          On this page
        </Button>
      )}

      <ScrollView
        className={styles['page-toc__scroll']}
        interactive="auto"
        aria-labelledby="page-toc-title"
        ref={scrollRef}
      >
        <HeightAnimation
          open={isLargeScreen || isExpanded}
          animate={!isLargeScreen && animateReady}
          openOnFind
          onBeforeMatch={() => setIsExpanded(true)}
        >
          {renderList(rootTocTree)}
        </HeightAnimation>
      </ScrollView>
    </nav>
  )
}

function revealInScroller(
  container: HTMLDivElement,
  link: HTMLAnchorElement
) {
  const containerRect = container.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()

  const overflowTop = containerRect.top + SCROLL_PADDING - linkRect.top
  if (overflowTop > 0) {
    container.scrollTop -= overflowTop
  } else {
    const overflowBottom =
      linkRect.bottom + SCROLL_PADDING - containerRect.bottom
    if (overflowBottom > 0) {
      container.scrollTop += overflowBottom
    }
  }
}
