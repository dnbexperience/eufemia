import {
  createElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import useLayoutEffect from '@dnb/eufemia/src/shared/helpers/useIsomorphicLayoutEffect'
import { TableOfContent } from '@dnb/eufemia/src/extensions'
import type { TableOfContentSection } from '@dnb/eufemia/src/extensions/table-of-content'
import '@dnb/eufemia/src/extensions/table-of-content/style'
import { PortalTocData, readInitialToc } from './PortalTocData'
import type { PortalTocSnapshot } from './PortalTocData'

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6'

type PageHeading = {
  element?: HTMLElement
  id: string
  text: ReactNode
  signature: string
  level: number
}

export default function PortalToc({
  maxDepth,
  pathname = '',
}: {
  maxDepth?: number
  pathname?: string
}) {
  const serverData = useContext(PortalTocData)
  const [initialData] = useState(
    () => serverData ?? readInitialToc(pathname)
  )
  const { headings, currentSectionOffset, resolvedPath } = usePageHeadings(
    initialData,
    pathname
  )

  const navigationRef = useRef<HTMLElement>(null)

  const sections = useMemo<TableOfContentSection[]>(
    () =>
      headings.map(({ text, id, level }) => ({
        text,
        id,
        level,
      })),
    [headings]
  )

  useLayoutEffect(() => {
    const scroll = navigationRef.current?.querySelector<HTMLElement>(
      '.dnb-table-of-content__scroll'
    )
    if (!scroll) {
      return
    }

    const update = () => {
      scroll.style.overscrollBehaviorY =
        scroll.scrollHeight > scroll.clientHeight ? 'contain' : 'auto'
    }
    update()

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return
      }
      const maximum = scroll.scrollHeight - scroll.clientHeight
      if (
        maximum > 0 &&
        ((event.deltaY < 0 && scroll.scrollTop <= 0) ||
          (event.deltaY > 0 && scroll.scrollTop >= maximum - 1))
      ) {
        event.preventDefault()
      }
    }
    scroll.addEventListener('wheel', onWheel, { passive: false })

    const observer = new ResizeObserver(update)
    observer.observe(scroll)
    if (scroll.firstElementChild) {
      observer.observe(scroll.firstElementChild)
    }
    return () => {
      observer.disconnect()
      scroll.removeEventListener('wheel', onWheel)
    }
  }, [sections, resolvedPath, maxDepth])

  if (!initialData && !headings.length) {
    return <template data-portal-toc-depth={maxDepth ?? 2} />
  }

  return (
    <>
      {initialData && (
        <script
          id="portal-toc-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(initialData).replace(/</g, '\\u003c'),
          }}
        />
      )}
      {headings.some(({ level }) => level > 1) && (
        <TableOfContent.Data
          key={resolvedPath}
          ref={navigationRef}
          id="portal-page-toc"
          locale="en-GB"
          includeH1
          expandedStorageKey="portal-toc-expanded"
          data={sections}
          currentSectionOffset={currentSectionOffset}
          maxDepth={maxDepth}
          sticky={false}
          animateChanges={false}
        />
      )}
    </>
  )
}

/**
 * Every heading the page offers an anchor link to, in document order,
 * kept in step with content that mounts after the first render.
 */
function usePageHeadings(
  initialData: PortalTocSnapshot | null,
  pathname: string
) {
  const [resolvedPath, setResolvedPath] = useState(pathname)
  const [headings, setHeadings] = useState<PageHeading[]>(
    () =>
      initialData?.headings.map(({ text, ...heading }) => ({
        ...heading,
        signature: JSON.stringify(text),
        text: text.map((part, index) =>
          typeof part === 'string'
            ? wrapLabel(part)
            : createElement('code', { key: index }, wrapLabel(part.code))
        ),
      })) ?? []
  )
  const [currentSectionOffset, setCurrentSectionOffset] = useState(0)

  useLayoutEffect(() => {
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
      setResolvedPath(pathname)
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
  }, [pathname])

  return { headings, currentSectionOffset, resolvedPath }
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
      return wrapLabel(node.textContent)
    }
    if (node instanceof HTMLElement && node.tagName === 'CODE') {
      return createElement(
        'code',
        { key: Array.from(node.parentNode.childNodes).indexOf(node) },
        wrapLabel(node.textContent)
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

function wrapLabel(text: string): ReactNode {
  return text
    .split(/(?<=\.)/)
    .map((part, index) => [
      index > 0 && createElement('wbr', { key: index }),
      part,
    ])
}
