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
import ToggleButton from '../ToggleButton'
import Space from '../space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { SidebarMenuContext } from './SidebarMenuContext'
import SidebarMenuAccordion from './SidebarMenuAccordion'
import SidebarMenuItem from './SidebarMenuItem'
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
  const [internalOpenItems, setInternalOpenItems] = useState(() =>
    readStoredOpenItems({
      key: openItemsStorageKey,
      storage: openItemsStorage,
      fallback: defaultOpenItems,
    })
  )
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
  const initialScrollItemRef = useRef(resolvedSelectedItem)
  const hasHandledInitialScrollRef = useRef(false)
  const selection = findSelection({
    id: resolvedSelectedItem,
    children,
    data,
    sections: dataSections,
  })
  const selectionAncestorIds = selection?.ancestorIds ?? []
  const selectionAncestorIdsKey = selectionAncestorIds.join(',')
  const resolvedOpenItems = Array.from(
    new Set([...(openItems ?? internalOpenItems), ...selectionAncestorIds])
  )
  const resolvedOpenItemsKey = resolvedOpenItems.join(',')

  useEffect(() => {
    const ancestorIds = selectionAncestorIdsKey
      ? selectionAncestorIdsKey.split(',')
      : []

    if (openItems === undefined && ancestorIds.length) {
      setInternalOpenItems((current) => {
        const missing = ancestorIds.filter((id) => !current.includes(id))
        return missing.length ? [...current, ...missing] : current
      })
    }
  }, [openItems, resolvedSelectedItem, selectionAncestorIdsKey])

  useLayoutEffect(() => {
    if (openItems === undefined && openItemsStorageKey) {
      getStorage(openItemsStorage)?.setItem(
        openItemsStorageKey,
        JSON.stringify(internalOpenItems)
      )
    }
  }, [internalOpenItems, openItems, openItemsStorage, openItemsStorageKey])

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
      !resolvedSelectedItem ||
      resolvedSelectedItem !== initialScrollItemRef.current ||
      hasHandledInitialScrollRef.current
    ) {
      return undefined
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

      hasHandledInitialScrollRef.current = true

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

        scrollInstantly(scrollView, top)
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
        scrollingElement.style.scrollBehavior = 'auto'
        target.scrollIntoView({
          block: 'center',
          inline: 'nearest',
          behavior: 'auto',
        })
        scrollingElement.style.scrollBehavior = scrollBehavior
      }
    }
    const frame = requestAnimationFrame(positionSelectedItem)

    return () => cancelAnimationFrame(frame)
  }, [resolvedActiveSection, resolvedOpenItemsKey, resolvedSelectedItem])

  const toggleItem = useCallback(
    (id: string, nextOpen: boolean) => {
      const next = nextOpen
        ? Array.from(new Set([...resolvedOpenItems, id]))
        : resolvedOpenItems.filter((itemId) => itemId !== id)

      if (openItems === undefined) {
        setInternalOpenItems(next)
      }
      onOpenItemsChange?.(next)
    },
    [onOpenItemsChange, openItems, resolvedOpenItems]
  )

  const contextValue = useMemo(
    () => ({
      level: 0,
      openItems: resolvedOpenItems,
      openItemsControlled: openItems !== undefined,
      toggleItem,
      selectedItem: resolvedSelectedItem,
      selectItem: (itemId: string) => {
        if (selectedItem === undefined) {
          setInternalSelectedItem(itemId)
        }
        onSelectedItemChange?.(itemId)
      },
    }),
    [
      onSelectedItemChange,
      openItems,
      resolvedOpenItems,
      resolvedSelectedItem,
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
  let sectionButtons: Array<{ id: string; text: React.ReactNode }> = []

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
        <ToggleButton.Group
          className="dnb-sidebar-menu__sections"
          value={resolvedActiveSection}
          label={sectionLabel}
          labelSrOnly
        >
          {sectionButtons.map((section) => (
            <ToggleButton
              key={section.id}
              data-section-id={section.id}
              text={section.text}
              value={section.id}
              checked={section.id === resolvedActiveSection}
              onChange={() => selectSection(section.id)}
            />
          ))}
        </ToggleButton.Group>
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
      const ancestorIds = findDataPath(section.items, id)
      if (ancestorIds) {
        return { ancestorIds, sectionId: section.id }
      }
    }
  }

  const dataPath = data && findDataPath(data, id)
  if (dataPath) {
    return { ancestorIds: dataPath }
  }

  return findDeclarativeSelection(children, id)
}

function findDataPath(
  items: NonNullable<SidebarMenuContainerProps['data']>,
  id: string,
  ancestorIds: string[] = []
): string[] | undefined {
  for (const item of items) {
    if (item.id === id) {
      return ancestorIds
    }

    if (item.items) {
      const path = findDataPath(item.items, id, [...ancestorIds, item.id])
      if (path) {
        return path
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
    }>
    const nextSectionId =
      child.type === SidebarMenuSection ? element.props.id : sectionId

    if (
      (child.type === SidebarMenuItem ||
        child.type === SidebarMenuAccordion) &&
      element.props.id === id
    ) {
      return { ancestorIds, sectionId: nextSectionId }
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

function readStoredOpenItems({
  key,
  storage,
  fallback,
}: {
  key?: string
  storage: 'session' | 'local'
  fallback: string[]
}) {
  if (!key) {
    return fallback
  }

  try {
    const value = getStorage(storage)?.getItem(key)
    if (!value) {
      return fallback
    }

    const parsed = JSON.parse(value)
    return Array.isArray(parsed) &&
      parsed.every((item) => typeof item === 'string')
      ? parsed
      : fallback
  } catch {
    return fallback
  }
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
