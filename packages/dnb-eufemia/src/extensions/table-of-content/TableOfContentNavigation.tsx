import { useEffect, useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'
import Button from '../../components/button/Button'
import HeightAnimation from '../../components/height-animation/HeightAnimation'
import Space from '../../components/space/Space'
import ScrollView from '../../components/scroll-view/ScrollView'
import useMediaQuery from '../../shared/useMediaQuery'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import useLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import { TableOfContentContext } from './TableOfContentContext'
import {
  buildTocTree,
  itemsToRender,
  resolveCurrentId,
} from './tableOfContentTree'
import useCurrentSectionId from './useCurrentSectionId'
import useMarkerStyle from './useMarkerStyle'
import type {
  TableOfContentRootProps,
  TableOfContentSection,
} from './types'

export default function TableOfContentNavigation({
  sections,
  children,
  currentId,
  currentSectionOffset,
  maxDepth = 2,
  breakpoint = 'large',
  title,
  stretch,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  className,
  id,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: TableOfContentRootProps & { sections: TableOfContentSection[] }) {
  const tree = useMemo(
    () => buildTocTree(sections, maxDepth),
    [sections, maxDepth]
  )
  const detectedId = useCurrentSectionId(
    sections,
    currentSectionOffset,
    currentId === undefined
  )
  const resolvedId = resolveCurrentId(
    tree,
    currentId === undefined ? detectedId : currentId
  )
  const isSidebar = useMediaQuery({
    when: { min: breakpoint },
    matchOnSSR: true,
  })
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = expanded ?? internalExpanded
  const [animateReady, setAnimateReady] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [currentLink, setCurrentLink] = useState<HTMLAnchorElement | null>(
    null
  )
  const markerStyle = useMarkerStyle(isSidebar ? currentLink : null)
  const rootId = useId(id)
  const titleId = rootId + '-title'
  const listId = rootId + '-list'
  const translation = useTranslation().TableOfContent
  const label = title ?? translation.title

  const setExpanded = (value: boolean) => {
    if (expanded === undefined) {
      setInternalExpanded(value)
    }
    onExpandedChange?.(value)
  }

  useEffect(() => {
    setAnimateReady(!isSidebar)
  }, [isSidebar])

  useLayoutEffect(() => {
    setCurrentLink(
      scrollRef.current?.querySelector<HTMLAnchorElement>(
        'a[aria-current="location"]'
      ) ?? null
    )
    if (
      !isSidebar &&
      !isExpanded &&
      scrollRef.current?.contains(document.activeElement)
    ) {
      toggleRef.current?.focus()
    }
  }, [resolvedId, children, isSidebar, isExpanded])

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!isSidebar || !currentLink || !container) {
      return
    }
    const containerRect = container.getBoundingClientRect()
    const linkRect = currentLink.getBoundingClientRect()
    const padding = parseFloat(getComputedStyle(container).fontSize) || 16
    if (linkRect.top < containerRect.top + padding) {
      container.scrollTop -= containerRect.top + padding - linkRect.top
    } else if (linkRect.bottom > containerRect.bottom - padding) {
      container.scrollTop +=
        linkRect.bottom + padding - containerRect.bottom
    }
  }, [currentLink, isSidebar])

  if (!itemsToRender(tree).length) {
    return null
  }

  return (
    <TableOfContentContext.Provider
      value={{ currentId: resolvedId, maxDepth, depth: 1 }}
    >
      <Space
        {...rest}
        element="nav"
        id={rootId}
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy ?? (ariaLabel ? undefined : titleId)
        }
        className={clsx(
          'dnb-table-of-content',
          isSidebar && 'dnb-table-of-content--sidebar',
          stretch && 'dnb-table-of-content--stretch',
          className
        )}
      >
        {isSidebar ? (
          <p id={titleId} className="dnb-table-of-content__title">
            {label}
          </p>
        ) : (
          <Button
            ref={toggleRef}
            id={titleId}
            type="button"
            className="dnb-table-of-content__toggle"
            variant="tertiary"
            icon={isExpanded ? 'chevron_up' : 'chevron_down'}
            aria-expanded={isExpanded}
            aria-controls={listId}
            onClick={() => setExpanded(!isExpanded)}
          >
            {label}
          </Button>
        )}
        <ScrollView
          className="dnb-table-of-content__scroll"
          aria-labelledby={titleId}
          ref={scrollRef}
        >
          <HeightAnimation
            id={listId}
            open={isSidebar || isExpanded}
            animate={!isSidebar && animateReady}
            openOnFind
            onBeforeMatch={() => setExpanded(true)}
            className="dnb-table-of-content__list-wrapper"
          >
            {markerStyle && (
              <span
                className="dnb-table-of-content__marker"
                style={markerStyle}
                aria-hidden
              />
            )}
            <ul className="dnb-table-of-content__list">{children}</ul>
          </HeightAnimation>
        </ScrollView>
      </Space>
    </TableOfContentContext.Provider>
  )
}
