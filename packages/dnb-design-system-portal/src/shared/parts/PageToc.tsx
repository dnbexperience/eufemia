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
  const lowestLevel = useMemo(() => {
    if (headings.length === 0) return undefined
    return Math.min(...headings.map(({ level }) => level))
  }, [headings])

  const headingGroups = useMemo(() => {
    const groups: TocGroup[] = []

    headings.forEach((heading) => {
      if (heading.level > lowestLevel && groups.length > 0) {
        groups[groups.length - 1].children.push(heading)
      } else {
        groups.push({ heading, children: [] })
      }
    })

    return groups
  }, [headings])

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
      <Anchor
        href={heading.url}
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
        {heading.title}
      </Anchor>
    )
  }

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
