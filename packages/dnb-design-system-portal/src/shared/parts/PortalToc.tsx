import { createElement, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { TableOfContent } from '@dnb/eufemia/src/extensions'
import type { TableOfContentSection } from '@dnb/eufemia/src/extensions/table-of-content'
import '@dnb/eufemia/src/extensions/table-of-content/style'

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6'

type PageHeading = {
  element: HTMLElement
  id: string
  text: ReactNode
  signature: string
  level: number
}

export default function PortalToc({ maxDepth }: { maxDepth?: number }) {
  const { headings, currentSectionOffset } = usePageHeadings()

  const sections = useMemo<TableOfContentSection[]>(
    () =>
      headings.map(({ text, id, level }) => ({
        text,
        id,
        level,
      })),
    [headings]
  )

  return (
    <TableOfContent.Data
      data={sections}
      currentSectionOffset={currentSectionOffset}
      maxDepth={maxDepth}
    />
  )
}

/**
 * Every heading the page offers an anchor link to, in document order,
 * kept in step with content that mounts after the first render.
 */
function usePageHeadings() {
  const [headings, setHeadings] = useState<PageHeading[]>([])
  const [currentSectionOffset, setCurrentSectionOffset] = useState(0)

  useEffect(() => {
    const content = document.querySelector('main')
    if (!content) {
      return
    }

    let animationFrameId = 0

    const rescan = () => {
      animationFrameId = 0
      const style = getComputedStyle(document.documentElement)
      // Allow for browser rounding when an anchor settles below the sticky header.
      setCurrentSectionOffset(
        (parseFloat(style.scrollPaddingTop) || 0) +
          (parseFloat(style.fontSize) || 16) / 2
      )
      setHeadings((current) => {
        const found = readHeadings(content)
        return isSameHeadings(current, found) ? current : found
      })
    }

    const scheduleRescan = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(rescan)
      }
    }

    rescan()

    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some(
          ({ target }) =>
            !(
              target instanceof Element ? target : target.parentElement
            )?.closest('.dnb-table-of-content')
        )
      ) {
        scheduleRescan()
      }
    })
    observer.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['id', 'hidden', 'aria-hidden', 'class', 'style'],
    })
    window.addEventListener('resize', scheduleRescan)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', scheduleRescan)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return { headings, currentSectionOffset }
}

function readHeadings(content: HTMLElement) {
  const headings: PageHeading[] = []

  const elements = Array.from(
    content.querySelectorAll<HTMLElement>(HEADING_SELECTOR)
  )

  for (const element of elements) {
    if (
      !element.getClientRects().length ||
      element.closest(
        '[hidden], [aria-hidden="true"], .dnb-live-code-editor, .dnb-table-of-content'
      ) ||
      getComputedStyle(element).visibility === 'hidden'
    ) {
      continue
    }
    const anchor = element.querySelector<HTMLAnchorElement>(
      'a.anchor-hash[id]'
    )

    if (anchor) {
      headings.push({
        element,
        id: anchor.id,
        ...titleOf(element),
        level: Number(element.tagName[1]),
      })
    }
  }

  return headings
}

/** The heading as it reads, without the anchor link and its live region. */
function titleOf(heading: HTMLElement) {
  const title = heading.cloneNode(true) as HTMLElement

  title
    .querySelectorAll('.anchor-hash, .dnb-aria-live')
    .forEach((element) => element.remove())

  const readText = (node: Node): ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
    }
    if (node instanceof HTMLElement && node.tagName === 'CODE') {
      return createElement(
        'code',
        { key: Array.from(node.parentNode.childNodes).indexOf(node) },
        node.textContent
      )
    }
    return Array.from(node.childNodes).map(readText)
  }

  return { text: readText(title), signature: title.innerHTML }
}

function isSameHeadings(current: PageHeading[], found: PageHeading[]) {
  return (
    current.length === found.length &&
    current.every(
      (heading, index) =>
        heading.element === found[index].element &&
        heading.signature === found[index].signature &&
        heading.id === found[index].id &&
        heading.level === found[index].level
    )
  )
}
