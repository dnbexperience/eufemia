import { useEffect, useMemo, useRef } from 'react'
import { ScrollView } from '@dnb/eufemia/src/components'
import styles from './PageToc.module.scss'

// keep in sync with scroll-padding-block in PageToc.module.scss
const SCROLL_PADDING = 16

export type PageTocItem = {
  title: string
  url: string
  level: number
}

type PageTocProps = {
  headings: PageTocItem[]
  currentUrl?: string | null
}

type TocGroup = {
  heading: PageTocItem
  children: PageTocItem[]
}

export default function PageToc({ headings, currentUrl }: PageTocProps) {
  const headingGroups = useMemo(() => {
    const groups: TocGroup[] = []

    headings.forEach((heading) => {
      if (heading.level > 2 && groups.length > 0) {
        groups[groups.length - 1].children.push(heading)
      } else {
        groups.push({ heading, children: [] })
      }
    })

    return groups
  }, [headings])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !currentUrl) {
      return
    }

    const currentLink = container.querySelector<HTMLAnchorElement>(
      'a[aria-current="true"]'
    )
    if (currentLink) {
      revealInScroller(container, currentLink)
    }
  }, [currentUrl])

  if (headings.length === 0) {
    return null
  }

  const renderLink = (heading: PageTocItem) => {
    const isCurrent = heading.url === currentUrl
    return (
      <a
        className={
          isCurrent
            ? `${styles['page-toc__link']} ${styles['page-toc__link--current']}`
            : styles['page-toc__link']
        }
        href={heading.url}
        aria-current={isCurrent ? 'true' : undefined}
      >
        {heading.title}
      </a>
    )
  }

  return (
    <nav aria-labelledby="page-toc-title" className={styles['page-toc']}>
      <p id="page-toc-title" className={styles['page-toc__title']}>
        On this page
      </p>
      <ScrollView
        className={styles['page-toc__scroll']}
        interactive="auto"
        aria-labelledby="page-toc-title"
        ref={scrollRef}
      >
        <ul className={styles['page-toc__list']}>
          {headingGroups.map((group) => (
            <li key={group.heading.url}>
              {renderLink(group.heading)}

              {group.children.length > 0 && (
                <ul className={styles['page-toc__sub-list']}>
                  {group.children.map((child) => (
                    <li key={child.url}>{renderLink(child)}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
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
