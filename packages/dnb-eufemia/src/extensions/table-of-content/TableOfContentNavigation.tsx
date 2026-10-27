import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { clsx } from 'clsx'
import Button from '../../components/button/Button'
import HeightAnimation, {
  supportsOpenOnFind,
} from '../../components/height-animation/HeightAnimation'
import Icon from '../../components/icon/Icon'
import Space from '../../components/space/Space'
import ScrollView from '../../components/scroll-view/ScrollView'
import useMediaQuery from '../../shared/useMediaQuery'
import Context from '../../shared/Context'
import { buildQuery } from '../../shared/MediaQueryUtils'
import useCanUseDOM from '../../shared/helpers/useCanUseDOM'
import useId from '../../shared/helpers/useId'
import useLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import { TableOfContentContext } from './TableOfContentContext'
import {
  buildTocTree,
  itemsToRender,
  resolveCurrentId,
} from './tableOfContentTree'
import useCurrentSectionId from './useCurrentSectionId'
import useMarkerStyle from './useMarkerStyle'
import useNavigationTarget from './useNavigationTarget'
import useContentTransition from './useContentTransition'
import useDisclosureState from './useDisclosureState'
import { chevron_down, chevron_up } from '../../icons'
import type {
  TableOfContentRootProps,
  TableOfContentSection,
} from './types'

const chevronIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})

export default function TableOfContentNavigation({
  sections,
  children,
  currentId,
  currentSectionOffset,
  maxDepth = 2,
  maxVisibleItems = 10,
  includeH1 = false,
  breakpoint = 'large',
  title,
  locale,
  lang,
  stretch,
  sticky = true,
  stickyOffset = 0,
  animateChanges = false,
  style,
  expanded,
  defaultExpanded = false,
  expandedStorageKey,
  expandedStorage = 'session',
  onExpandedChange,
  className,
  id,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: TableOfContentRootProps & {
  sections: TableOfContentSection[]
  includeH1?: boolean
}) {
  const tree = useMemo(
    () => buildTocTree(sections, maxDepth, includeH1),
    [sections, maxDepth, includeH1]
  )
  const items = useMemo(() => {
    const flatten = (nodes: typeof tree): typeof tree =>
      itemsToRender(nodes).flatMap((node) => [
        node,
        ...flatten(node.subTree),
      ])
    return flatten(tree)
  }, [tree])
  const limit =
    Number.isFinite(maxVisibleItems) && maxVisibleItems > 0
      ? Math.max(1, Math.floor(maxVisibleItems))
      : items.length
  const hasMore = items.length > limit
  const contentKey = useMemo(
    () => JSON.stringify([limit, items.map(({ id }) => id)]),
    [limit, items]
  )
  const [expandedContent, setExpandedContent] = useState<string | null>(
    null
  )
  const showingAll = expandedContent === contentKey
  const overflowIds = useMemo(
    () =>
      new Set(
        hasMore && !showingAll
          ? items.slice(limit).map(({ id }) => id)
          : []
      ),
    [hasMore, showingAll, items, limit]
  )
  const showAllRef = useRef<HTMLButtonElement>(null)
  const focusRevealed = useRef(false)
  const detectedId = useCurrentSectionId(
    sections,
    currentSectionOffset,
    currentId === undefined
  )
  const sectionIds = useMemo(
    () => sections.map(({ id }) => id),
    [sections]
  )
  const { targetId, navigate } = useNavigationTarget(
    currentId === undefined,
    sectionIds
  )
  const resolvedId = resolveCurrentId(
    tree,
    currentId === undefined ? (targetId ?? detectedId) : currentId
  )
  const isSidebar = useMediaQuery({
    when: { min: breakpoint },
    matchOnSSR: true,
  })
  const canUseDOM = useCanUseDOM()
  const { breakpoints, getTranslation } = useContext(Context)
  const { isExpanded, setExpanded, storageKey } = useDisclosureState({
    expanded,
    defaultExpanded,
    expandedStorageKey,
    expandedStorage,
    onExpandedChange,
  })
  const [animateReady, setAnimateReady] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  useContentTransition(scrollRef, animateChanges, children)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [currentLink, setCurrentLink] = useState<HTMLAnchorElement | null>(
    null
  )
  const markerStyle = useMarkerStyle(isSidebar ? currentLink : null)
  const rootId = useId(id)
  const titleId = rootId + '-title'
  const desktopTitleId = titleId + '-text'
  const listId = rootId + '-list'
  const translation = getTranslation({ locale }).TableOfContent
  const label = title ?? translation.title
  const mobileQuery = String(
    buildQuery({ when: { min: breakpoint }, not: true }, breakpoints)
  )
  const scope =
    '[data-table-of-content-query="' +
    mobileQuery.replace(
      /["\\\n\r\f]/g,
      (char) => '\\' + char.charCodeAt(0).toString(16) + ' '
    ) +
    '"]'

  useLayoutEffect(() => {
    setExpandedContent(null)
  }, [contentKey])

  useEffect(() => {
    setAnimateReady(!isSidebar)
  }, [isSidebar])

  useLayoutEffect(() => {
    setCurrentLink(
      scrollRef.current?.querySelector<HTMLAnchorElement>(
        'a[aria-current="location"]'
      ) ?? null
    )
    if (isSidebar && document.activeElement === showAllRef.current) {
      scrollRef.current
        ?.querySelector<HTMLAnchorElement>('a')
        ?.focus({ preventScroll: true })
    }
    if (focusRevealed.current && showingAll) {
      focusRevealed.current = false
      const links =
        scrollRef.current?.querySelectorAll<HTMLAnchorElement>('a')
      links?.[limit]?.focus({ preventScroll: true })
    } else if (
      !isSidebar &&
      isExpanded &&
      scrollRef.current?.contains(document.activeElement) &&
      document.activeElement?.closest('[hidden]')
    ) {
      showAllRef.current?.focus({ preventScroll: true })
    }
    if (
      !isSidebar &&
      !isExpanded &&
      scrollRef.current?.contains(document.activeElement)
    ) {
      toggleRef.current?.focus()
    }
  }, [resolvedId, children, isSidebar, isExpanded, showingAll, limit])

  useLayoutEffect(() => {
    if (isSidebar || !supportsOpenOnFind()) {
      return
    }
    scrollRef.current
      ?.querySelectorAll('[data-table-of-content-overflow][hidden]')
      .forEach((element) => element.setAttribute('hidden', 'until-found'))
  }, [isSidebar, overflowIds, children])

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

  if (!items.length) {
    return null
  }

  return (
    <TableOfContentContext.Provider
      value={{
        currentId: resolvedId,
        maxDepth,
        depth: 1,
        isSidebar,
        overflowIds,
        lastVisibleId: hasMore && !showingAll ? items[limit - 1].id : null,
        navigate,
      }}
    >
      <Space
        {...rest}
        element="nav"
        lang={lang ?? locale}
        id={rootId}
        data-table-of-content-query={!canUseDOM ? mobileQuery : undefined}
        data-table-of-content-expanded={isExpanded || undefined}
        data-table-of-content-expanded-storage-key={storageKey}
        data-table-of-content-expanded-storage={
          storageKey ? expandedStorage : undefined
        }
        ref={ref}
        style={
          {
            ...style,
            '--table-of-content-sticky-offset':
              typeof stickyOffset === 'number'
                ? stickyOffset + 'px'
                : stickyOffset,
          } as CSSProperties
        }
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy ??
          (ariaLabel ? undefined : isSidebar ? desktopTitleId : titleId)
        }
        className={clsx(
          'dnb-table-of-content',
          isSidebar && 'dnb-table-of-content--sidebar',
          stretch && 'dnb-table-of-content--stretch',
          sticky && 'dnb-table-of-content--sticky',
          className
        )}
      >
        {!canUseDOM && (
          <style>{`@media ${mobileQuery}{
            ${scope}{display:block!important;position:static!important;width:auto!important;max-height:none!important}
            ${scope} .dnb-table-of-content__title{display:none!important}
            ${scope} .dnb-table-of-content__toggle.dnb-button{display:inline-flex!important}
            ${scope} .dnb-table-of-content__scroll{padding-inline:1rem!important}
            ${scope} [data-table-of-content-overflow]{display:none!important}
            ${scope} .dnb-table-of-content__show-all{display:inline-flex!important}
            ${scope} .dnb-table-of-content__link.dnb-anchor{display:inline!important;min-height:0!important;padding:0.05575em 0!important;font-size:var(--font-size-basis)!important;line-height:inherit!important;color:var(--token-color-text-action)!important;text-decoration:underline!important;border-radius:var(--token-radius-sm)!important}
            ${scope}:not([data-table-of-content-expanded]) .dnb-table-of-content__list-wrapper{display:none!important}
          }`}</style>
        )}
        <p id={desktopTitleId} className="dnb-table-of-content__title">
          {label}
        </p>
        <Button
          ref={toggleRef}
          id={titleId}
          type="button"
          className="dnb-table-of-content__toggle"
          variant="tertiary"
          icon={chevronIcon}
          transitionState={isExpanded ? 'expanded' : 'collapsed'}
          aria-expanded={isExpanded}
          aria-controls={listId}
          onClick={() => setExpanded(!isExpanded)}
        >
          {label}
        </Button>
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
            onBeforeMatch={() => {
              flushSync(() => {
                setExpandedContent(contentKey)
                if (!isExpanded) {
                  setExpanded(true)
                }
              })
            }}
            className="dnb-table-of-content__list-wrapper"
          >
            {markerStyle && (
              <span
                className="dnb-table-of-content__marker"
                style={markerStyle}
                aria-hidden
              />
            )}
            <ul
              id={listId + '-items'}
              className="dnb-table-of-content__list"
            >
              {children}
            </ul>
            {hasMore && !showingAll && (
              <Button
                ref={showAllRef}
                type="button"
                className="dnb-table-of-content__show-all"
                variant="tertiary"
                icon={chevronIcon}
                iconPosition="right"
                hidden={isSidebar}
                aria-controls={listId + '-items'}
                onClick={() => {
                  focusRevealed.current = true
                  setExpandedContent(contentKey)
                }}
              >
                {translation.showAll}
              </Button>
            )}
          </HeightAnimation>
        </ScrollView>
      </Space>
    </TableOfContentContext.Provider>
  )
}
