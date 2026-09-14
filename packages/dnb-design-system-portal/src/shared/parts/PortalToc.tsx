import { useEffect, useMemo, useState } from 'react'
import PageToc from './PageToc/PageToc'
import type { PageTocHeading } from './PageToc/PageToc'

const CONTENT_AREA_OFFSET = 56
const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6'

type PageHeading = {
  element: HTMLElement
  id: string
  text: string
  level: number
}

export default function PortalToc({ maxDepth }: { maxDepth?: number }) {
  const headings = usePageHeadings()

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    if (headings.length === 0) {
      return
    }

    let animationFrameId = 0

    const updateCurrent = () => {
      animationFrameId = 0

      const headingPositions = headings.map(({ element }) => ({
        top: element.getBoundingClientRect().top,
        marginTop: parseFloat(getComputedStyle(element).marginTop) || 0,
      }))

      setCurrentIndex(
        computeTocHighlight(
          headingPositions.map((position) => position.top),
          CONTENT_AREA_OFFSET,
          headingPositions.map((position) => position.marginTop)
        )
      )
    }

    const scheduleUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateCurrent)
      }
    }

    updateCurrent()
    window.addEventListener('scroll', scheduleUpdate, {
      passive: true,
    })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [headings])

  const items = useMemo<PageTocHeading[]>(
    () =>
      headings.map(({ text, id, level }) => ({
        title: text,
        url: `#${id}`,
        level,
      })),
    [headings]
  )

  return (
    <PageToc
      headings={items}
      currentIndex={currentIndex}
      maxDepth={maxDepth}
    />
  )
}

/**
 * Index of the last heading to have passed the top of the content area, or
 * the first heading while none has reached it.
 */
export function computeTocHighlight(
  headingTops: number[],
  contentAreaOffset: number,
  headingTopMargins: number[] = []
): number | null {
  if (headingTops.length === 0) {
    return null
  }

  const headingRegionTop = (index: number) =>
    headingTops[index] - (headingTopMargins[index] ?? 0)

  let currentIndex = 0
  for (let index = 0; index < headingTops.length; index++) {
    if (headingRegionTop(index) <= contentAreaOffset) {
      currentIndex = index
    }
  }

  return currentIndex
}

/**
 * Every heading the page offers an anchor link to, in document order,
 * kept in step with content that mounts after the first render.
 */
function usePageHeadings() {
  const [headings, setHeadings] = useState<PageHeading[]>([])

  useEffect(() => {
    const content = document.querySelector('main')
    if (!content) {
      return
    }

    let animationFrameId = 0

    const rescan = () => {
      animationFrameId = 0
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

    const observer = new MutationObserver(scheduleRescan)
    observer.observe(content, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return headings
}

function readHeadings(content: HTMLElement) {
  const headings: PageHeading[] = []

  const elements = Array.from(
    content.querySelectorAll<HTMLElement>(HEADING_SELECTOR)
  )

  for (const element of elements) {
    const anchor = element.querySelector<HTMLAnchorElement>('a[id]')

    if (anchor) {
      headings.push({
        element,
        id: anchor.id,
        text: titleOf(element),
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

  return title.textContent.trim()
}

function isSameHeadings(current: PageHeading[], found: PageHeading[]) {
  return (
    current.length === found.length &&
    current.every(
      (heading, index) =>
        heading.element === found[index].element &&
        heading.text === found[index].text
    )
  )
}
