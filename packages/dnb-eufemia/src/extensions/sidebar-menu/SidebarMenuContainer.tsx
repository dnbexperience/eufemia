import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'
import Dropdown from '../../components/Dropdown'
import Icon from '../../components/icon/Icon'
import Space from '../../components/space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { SidebarMenuContext } from './SidebarMenuContext'
import SidebarMenuAccordion from './SidebarMenuAccordion'
import SidebarMenuItem from './SidebarMenuItem'
import SidebarMenuGroup from './SidebarMenuGroup'
import SidebarMenuSection from './SidebarMenuSection'
import renderSidebarMenuItems from './renderSidebarMenuItems'
import type {
  SidebarMenuContainerProps,
  SidebarMenuSectionProps,
} from './types'

function SidebarMenuContainer(props: SidebarMenuContainerProps) {
  const {
    className,
    children,
    data,
    sections: dataSections,
    openItems,
    defaultOpenItems = [],
    openItemsStorageKey,
    openItemsStorage = 'session',
    scrollPositionStorageKey,
    scrollPositionStorage = 'session',
    scrollSelectedItemIntoView = true,
    disableUntilFound = false,
    onOpenItemsChange,
    activeSection,
    defaultActiveSection,
    sectionLabel = 'Menu section',
    onActiveSectionChange,
    selectedItem,
    defaultSelectedItem,
    onSelectedItemChange,
    ...rest
  } = props
  const menuRef = useRef<HTMLElement>(null)
  const defaultOpenItemsKey = defaultOpenItems.join(',')
  const openItemsStorageId = openItemsStorageKey
    ? `${openItemsStorage}:${openItemsStorageKey}`
    : undefined
  const initialSelectedItem =
    defaultSelectedItem ??
    findActiveDataItem(
      dataSections?.flatMap(({ items }) => items) ?? data
    ) ??
    findActiveDeclarativeItem(children)
  const initialSelection = findSelection({
    id: selectedItem ?? initialSelectedItem,
    children,
    data,
    sections: dataSections,
  })
  const initialOpenState = readStoredOpenState({
    key: openItemsStorageKey,
    storage: openItemsStorage,
    fallback: defaultOpenItems,
  })
  const initialClosedSelectionPath = {
    selectedItem:
      initialOpenState.selectedItem ?? selectedItem ?? initialSelectedItem,
    ids: initialOpenState.closedItems,
  }
  const initialOpenItems =
    openItems ??
    addOpenItem(
      initialOpenState.openItems,
      initialSelection?.selectedAccordionId
    )
  const [internalOpenItems, setInternalOpenItems] =
    useState(initialOpenItems)
  const loadedOpenItemsStorageIdRef = useRef<string | undefined>(
    openItemsStorageId
  )
  const skipOpenItemsPersistRef = useRef(false)
  const [internalActiveSection, setInternalActiveSection] = useState(
    () =>
      defaultActiveSection ??
      dataSections?.find((section) => section.active)?.id ??
      initialSelection?.sectionId
  )
  const [internalSelectedItem, setInternalSelectedItem] = useState(
    initialSelectedItem
  )
  const resolvedSelectedItem = selectedItem ?? internalSelectedItem
  const positionedSelectedItemRef = useRef<string>(undefined)
  const selection = findSelection({
    id: resolvedSelectedItem,
    children,
    data,
    sections: dataSections,
  })
  const selectionAncestorIds = selection?.ancestorIds ?? []
  const selectionAncestorIdsKey = selectionAncestorIds.join(',')
  const selectedAccordionId = selection?.selectedAccordionId
  const selectionOpenIdsKey = [
    ...selectionAncestorIds,
    ...(selectedAccordionId ? [selectedAccordionId] : []),
  ].join(',')
  const [closedSelectionPath, setClosedSelectionPath] = useState<{
    selectedItem?: string
    ids: string[]
  }>(initialClosedSelectionPath)
  const closedSelectionAncestorIds =
    closedSelectionPath.selectedItem === resolvedSelectedItem
      ? closedSelectionPath.ids
      : []
  const closedSelectionAncestorIdsKey =
    closedSelectionAncestorIds.join(',')
  const resolvedOpenItems = Array.from(
    new Set([
      ...(openItems ?? internalOpenItems).filter(
        (id) => !closedSelectionAncestorIds.includes(id)
      ),
      ...selectionAncestorIds.filter(
        (id) => !closedSelectionAncestorIds.includes(id)
      ),
    ])
  )
  const resolvedOpenItemsKey = resolvedOpenItems.join(',')

  useEffect(() => {
    const selectionOpenIds = selectionOpenIdsKey
      ? selectionOpenIdsKey.split(',')
      : []
    const closedSelectionIds = closedSelectionAncestorIdsKey
      ? closedSelectionAncestorIdsKey.split(',')
      : []

    if (openItems === undefined && selectionOpenIds.length) {
      setInternalOpenItems((current) => {
        const missing = selectionOpenIds.filter(
          (id) => !current.includes(id) && !closedSelectionIds.includes(id)
        )
        return missing.length ? [...current, ...missing] : current
      })
    }
  }, [
    closedSelectionAncestorIdsKey,
    openItems,
    resolvedSelectedItem,
    selectionOpenIdsKey,
  ])

  useLayoutEffect(() => {
    if (openItems !== undefined) {
      return
    }
    if (loadedOpenItemsStorageIdRef.current === openItemsStorageId) {
      return
    }

    const storedOpenState = readStoredOpenState({
      key: openItemsStorageKey,
      storage: openItemsStorage,
      fallback: defaultOpenItemsKey ? defaultOpenItemsKey.split(',') : [],
    })
    loadedOpenItemsStorageIdRef.current = openItemsStorageId
    skipOpenItemsPersistRef.current = true
    setInternalOpenItems(
      addOpenItem(storedOpenState.openItems, selectedAccordionId)
    )
    setClosedSelectionPath({
      selectedItem: storedOpenState.selectedItem ?? resolvedSelectedItem,
      ids: storedOpenState.closedItems,
    })
  }, [
    defaultOpenItemsKey,
    openItems,
    openItemsStorage,
    openItemsStorageId,
    openItemsStorageKey,
    resolvedSelectedItem,
    selectedAccordionId,
  ])

  useLayoutEffect(() => {
    if (
      openItems !== undefined ||
      !openItemsStorageKey ||
      loadedOpenItemsStorageIdRef.current !== openItemsStorageId
    ) {
      return
    }

    if (skipOpenItemsPersistRef.current) {
      skipOpenItemsPersistRef.current = false
      return
    }

    writeStoredOpenState({
      key: openItemsStorageKey,
      storage: openItemsStorage,
      openItems: internalOpenItems,
      closedSelectionPath,
    })
  }, [
    closedSelectionPath,
    internalOpenItems,
    openItems,
    openItemsStorage,
    openItemsStorageId,
    openItemsStorageKey,
  ])

  useLayoutEffect(() => {
    if (!scrollPositionStorageKey) {
      return undefined
    }

    const scrollView =
      menuRef.current?.closest<HTMLElement>('.dnb-scroll-view')
    if (!scrollView) {
      return undefined
    }

    const storage = getStorage(scrollPositionStorage)
    const storedPosition = Number(
      storage?.getItem(scrollPositionStorageKey)
    )
    if (Number.isFinite(storedPosition) && storedPosition > 0) {
      scrollInstantly(scrollView, storedPosition)
    }

    const persistPosition = () => {
      storage?.setItem(
        scrollPositionStorageKey,
        String(scrollView.scrollTop)
      )
    }

    scrollView.addEventListener('scroll', persistPosition, {
      passive: true,
    })

    return () => {
      persistPosition()
      scrollView.removeEventListener('scroll', persistPosition)
    }
  }, [scrollPositionStorage, scrollPositionStorageKey])

  const declarativeSections = Children.toArray(children).filter(
    (child): child is ReactElement<SidebarMenuSectionProps> =>
      isValidElement(child) && child.type === SidebarMenuSection
  )
  const hasSections = Boolean(
    dataSections?.length || declarativeSections.length
  )
  const firstSectionId =
    dataSections?.[0]?.id ?? declarativeSections[0]?.props.id
  const resolvedActiveSection =
    activeSection ?? internalActiveSection ?? firstSectionId

  useEffect(() => {
    if (
      activeSection === undefined &&
      selection?.sectionId !== undefined
    ) {
      setInternalActiveSection(selection.sectionId)
    }
  }, [activeSection, resolvedSelectedItem, selection?.sectionId])

  useLayoutEffect(() => {
    if (
      !scrollSelectedItemIntoView ||
      !resolvedSelectedItem ||
      positionedSelectedItemRef.current === resolvedSelectedItem
    ) {
      return undefined
    }

    let frame: number
    let openingAnimationObserver: MutationObserver | undefined

    const stopWaitingForAnimation = () => {
      openingAnimationObserver?.disconnect()
      openingAnimationObserver = undefined
    }
    const positionSelectedItem = () => {
      const selected = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          '[data-sidebar-menu-id]'
        ) ?? []
      ).find(
        (element) => element.dataset.sidebarMenuId === resolvedSelectedItem
      )
      const target =
        selected?.querySelector<HTMLElement>('[aria-current="page"]') ??
        selected

      if (!target) {
        return
      }

      const nextOpeningAnimation = target.closest<HTMLElement>(
        '.dnb-height-animation--animating[aria-hidden="false"]'
      )
      if (nextOpeningAnimation) {
        if (!openingAnimationObserver) {
          stopWaitingForAnimation()
          openingAnimationObserver = new MutationObserver(() => {
            if (
              !nextOpeningAnimation.classList.contains(
                'dnb-height-animation--animating'
              )
            ) {
              stopWaitingForAnimation()
              frame = requestAnimationFrame(positionSelectedItem)
            }
          })
          openingAnimationObserver.observe(nextOpeningAnimation, {
            attributes: true,
            attributeFilter: ['class'],
          })
        }
        return
      }

      const isInitialPosition =
        positionedSelectedItemRef.current === undefined
      positionedSelectedItemRef.current = resolvedSelectedItem

      const scrollView = target.closest<HTMLElement>('.dnb-scroll-view')
      const targetRect = target.getBoundingClientRect()

      if (scrollView) {
        const boundary = scrollView.getBoundingClientRect()
        const isVisible =
          targetRect.top >= boundary.top &&
          targetRect.bottom <= boundary.bottom

        if (isVisible) {
          return
        }

        const top =
          scrollView.scrollTop +
          targetRect.top -
          boundary.top -
          (boundary.height - targetRect.height) / 2

        if (isInitialPosition) {
          scrollInstantly(scrollView, top)
        } else {
          scrollView.scrollTo({ top, behavior: 'smooth' })
        }
        return
      }

      const boundary = {
        top: 0,
        bottom: window.innerHeight,
      }

      if (
        targetRect.top < boundary.top ||
        targetRect.bottom > boundary.bottom
      ) {
        const scrollingElement = document.documentElement
        const scrollBehavior = scrollingElement.style.scrollBehavior
        if (isInitialPosition) {
          scrollingElement.style.scrollBehavior = 'auto'
        }
        target.scrollIntoView({
          block: 'center',
          inline: 'nearest',
          behavior: isInitialPosition ? 'auto' : 'smooth',
        })
        if (isInitialPosition) {
          scrollingElement.style.scrollBehavior = scrollBehavior
        }
      }
    }
    frame = requestAnimationFrame(positionSelectedItem)

    return () => {
      cancelAnimationFrame(frame)
      stopWaitingForAnimation()
    }
  }, [
    resolvedActiveSection,
    resolvedOpenItemsKey,
    resolvedSelectedItem,
    scrollSelectedItemIntoView,
  ])

  const toggleItem = useCallback(
    (id: string, nextOpen: boolean) => {
      if (selectionAncestorIds.includes(id)) {
        setClosedSelectionPath((current) => {
          const ids =
            current.selectedItem === resolvedSelectedItem
              ? current.ids
              : []
          return {
            selectedItem: resolvedSelectedItem,
            ids: nextOpen
              ? ids.filter((itemId) => itemId !== id)
              : Array.from(new Set([...ids, id])),
          }
        })
      }

      const next = nextOpen
        ? Array.from(new Set([...resolvedOpenItems, id]))
        : resolvedOpenItems.filter((itemId) => itemId !== id)

      if (openItems === undefined) {
        setInternalOpenItems(next)
        if (openItemsStorageKey) {
          const closedItems = selectionAncestorIds.includes(id)
            ? nextOpen
              ? closedSelectionAncestorIds.filter(
                  (itemId) => itemId !== id
                )
              : Array.from(new Set([...closedSelectionAncestorIds, id]))
            : closedSelectionAncestorIds

          writeStoredOpenState({
            key: openItemsStorageKey,
            storage: openItemsStorage,
            openItems: next,
            closedSelectionPath: {
              selectedItem: resolvedSelectedItem,
              ids: closedItems,
            },
          })
        }
      }
      onOpenItemsChange?.(next)
    },
    [
      onOpenItemsChange,
      openItems,
      openItemsStorage,
      openItemsStorageKey,
      closedSelectionAncestorIds,
      resolvedOpenItems,
      resolvedSelectedItem,
      selectionAncestorIds,
    ]
  )

  const contextValue = useMemo(
    () => ({
      indent: 0,
      openItems: resolvedOpenItems,
      openItemsControlled: openItems !== undefined,
      toggleItem,
      selectedItem: resolvedSelectedItem,
      selectedItemAncestorIds: selectionAncestorIds,
      selectItem: (itemId: string) => {
        if (selectedItem === undefined) {
          setInternalSelectedItem(itemId)
        }
        onSelectedItemChange?.(itemId)
      },
      untilFound: !disableUntilFound,
    }),
    [
      onSelectedItemChange,
      disableUntilFound,
      openItems,
      resolvedOpenItems,
      resolvedSelectedItem,
      selectionAncestorIdsKey,
      selectedItem,
      toggleItem,
    ]
  )

  const selectSection = useCallback(
    (sectionId: string) => {
      if (activeSection === undefined) {
        setInternalActiveSection(sectionId)
      }
      onActiveSectionChange?.(sectionId)
    },
    [activeSection, onActiveSectionChange]
  )

  let sectionContent = children
  let sectionButtons: Array<{
    id: string
    text: React.ReactNode
    icon?: SidebarMenuSectionProps['icon']
  }> = []

  if (dataSections?.length) {
    sectionButtons = dataSections
    const section = dataSections.find(
      ({ id }) => id === resolvedActiveSection
    )
    sectionContent = section ? renderSidebarMenuItems(section.items) : null
  } else if (declarativeSections.length) {
    sectionButtons = declarativeSections.map(({ props }) => ({
      id: props.id,
      text: props.text,
      icon: props.icon,
    }))
    sectionContent = declarativeSections.find(
      ({ props }) => props.id === resolvedActiveSection
    )?.props.children
  } else if (data) {
    sectionContent = renderSidebarMenuItems(data)
  }

  return (
    <Space
      {...rest}
      element="nav"
      ref={menuRef}
      className={clsx('dnb-sidebar-menu', className)}
      data-scroll-position-storage-key={scrollPositionStorageKey}
      data-scroll-position-storage={scrollPositionStorage}
    >
      {hasSections && (
        <Dropdown
          className="dnb-sidebar-menu__sections"
          portalClass="dnb-sidebar-menu__sections-portal"
          value={resolvedActiveSection}
          label={sectionLabel}
          labelSrOnly
          data={sectionButtons.map((section) => {
            const content = section.icon ? (
              <Dropdown.HorizontalItem className="dnb-sidebar-menu__section-label">
                <Icon icon={section.icon} />
                {section.text}
              </Dropdown.HorizontalItem>
            ) : (
              section.text
            )

            return {
              selectedKey: section.id,
              selectedValue: content,
              content,
            }
          })}
          onChange={({ data }) => {
            if (typeof data?.selectedKey === 'string') {
              selectSection(data.selectedKey)
            }
          }}
          size="medium"
          stretch
        />
      )}

      <SidebarMenuContext value={contextValue}>
        <ul className="dnb-sidebar-menu__list">{sectionContent}</ul>
      </SidebarMenuContext>
    </Space>
  )
}

function scrollInstantly(element: HTMLElement, top: number) {
  const scrollBehavior = element.style.scrollBehavior
  const scrollBehaviorPriority =
    element.style.getPropertyPriority('scroll-behavior')
  element.style.setProperty('scroll-behavior', 'auto', 'important')

  if (typeof element.scrollTo === 'function') {
    element.scrollTo({ top, behavior: 'auto' })
  } else {
    element.scrollTop = top
  }

  element.style.setProperty(
    'scroll-behavior',
    scrollBehavior,
    scrollBehaviorPriority
  )
}

withComponentMarkers(SidebarMenuContainer, { _supportsSpacingProps: true })

export default SidebarMenuContainer

type Selection = {
  ancestorIds: string[]
  selectedAccordionId?: string
  sectionId?: string
}

function findSelection({
  id,
  children,
  data,
  sections,
}: {
  id?: string
  children?: ReactNode
  data?: SidebarMenuContainerProps['data']
  sections?: SidebarMenuContainerProps['sections']
}): Selection | undefined {
  if (!id) {
    return undefined
  }

  if (sections) {
    for (const section of sections) {
      const selection = findDataSelection(section.items, id)
      if (selection) {
        return { ...selection, sectionId: section.id }
      }
    }
  }

  const dataSelection = data && findDataSelection(data, id)
  if (dataSelection) {
    return dataSelection
  }

  return findDeclarativeSelection(children, id)
}

function findDataSelection(
  items: NonNullable<SidebarMenuContainerProps['data']>,
  id: string,
  ancestorIds: string[] = []
): Selection | undefined {
  for (const item of items) {
    if (item.id === id) {
      return {
        ancestorIds,
        selectedAccordionId:
          item.items && item.type !== 'group' && item.collapsible !== false
            ? item.id
            : undefined,
      }
    }

    if (item.items) {
      const selection = findDataSelection(
        item.items,
        id,
        item.type === 'group' ? ancestorIds : [...ancestorIds, item.id]
      )
      if (selection) {
        return selection
      }
    }
  }

  return undefined
}

function findDeclarativeSelection(
  children: ReactNode,
  id: string,
  ancestorIds: string[] = [],
  sectionId?: string
): Selection | undefined {
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) {
      continue
    }

    const element = child as ReactElement<{
      id?: string
      children?: ReactNode
      collapsible?: boolean
    }>
    const nextSectionId =
      child.type === SidebarMenuSection ? element.props.id : sectionId

    if (
      (child.type === SidebarMenuItem ||
        child.type === SidebarMenuAccordion ||
        child.type === SidebarMenuGroup) &&
      element.props.id === id
    ) {
      return {
        ancestorIds,
        selectedAccordionId:
          child.type === SidebarMenuAccordion &&
          element.props.collapsible !== false
            ? element.props.id
            : undefined,
        sectionId: nextSectionId,
      }
    }

    const nextAncestorIds =
      child.type === SidebarMenuAccordion && element.props.id
        ? [...ancestorIds, element.props.id]
        : ancestorIds
    const selection = findDeclarativeSelection(
      element.props.children,
      id,
      nextAncestorIds,
      nextSectionId
    )
    if (selection) {
      return selection
    }
  }

  return undefined
}

function addOpenItem(items: string[], id?: string) {
  return id && !items.includes(id) ? [...items, id] : items
}

function findActiveDataItem(
  items?: NonNullable<SidebarMenuContainerProps['data']>
): string | undefined {
  for (const item of items ?? []) {
    if (item.active) {
      return item.id
    }

    const activeItem = findActiveDataItem(item.items)
    if (activeItem) {
      return activeItem
    }
  }

  return undefined
}

function findActiveDeclarativeItem(
  children: ReactNode
): string | undefined {
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) {
      continue
    }

    const element = child as ReactElement<{
      id?: string
      active?: boolean
      children?: ReactNode
    }>
    if (element.props.active && element.props.id) {
      return element.props.id
    }

    const activeItem = findActiveDeclarativeItem(element.props.children)
    if (activeItem) {
      return activeItem
    }
  }

  return undefined
}

type StoredOpenState = {
  openItems: string[]
  closedItems: string[]
  selectedItem?: string
}

function readStoredOpenState({
  key,
  storage,
  fallback,
}: {
  key?: string
  storage: 'session' | 'local'
  fallback: string[]
}) {
  if (!key) {
    return { openItems: fallback, closedItems: [] }
  }

  try {
    const value = getStorage(storage)?.getItem(key)
    if (!value) {
      return { openItems: fallback, closedItems: [] }
    }

    const parsed = JSON.parse(value)
    if (isStringArray(parsed)) {
      return { openItems: parsed, closedItems: [] }
    }

    if (
      parsed &&
      typeof parsed === 'object' &&
      isStringArray(parsed.openItems) &&
      isStringArray(parsed.closedItems)
    ) {
      return {
        openItems: parsed.openItems,
        closedItems: parsed.closedItems,
        selectedItem:
          typeof parsed.selectedItem === 'string'
            ? parsed.selectedItem
            : undefined,
      }
    }

    return { openItems: fallback, closedItems: [] }
  } catch {
    return { openItems: fallback, closedItems: [] }
  }
}

function writeStoredOpenState({
  key,
  storage,
  openItems,
  closedSelectionPath,
}: {
  key: string
  storage: 'session' | 'local'
  openItems: string[]
  closedSelectionPath: { selectedItem?: string; ids: string[] }
}) {
  const value = closedSelectionPath.ids.length
    ? ({
        openItems,
        closedItems: closedSelectionPath.ids,
        selectedItem: closedSelectionPath.selectedItem,
      } satisfies StoredOpenState)
    : openItems

  getStorage(storage)?.setItem(key, JSON.stringify(value))
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  )
}

function getStorage(storage: 'session' | 'local') {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    return storage === 'local'
      ? window.localStorage
      : window.sessionStorage
  } catch {
    return undefined
  }
}
