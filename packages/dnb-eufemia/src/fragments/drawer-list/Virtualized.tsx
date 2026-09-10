import {
  Fragment,
  memo,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import {
  defaultRangeExtractor,
  observeElementRect,
  useVirtualizer,
} from '@tanstack/react-virtual'
import type { Range } from '@tanstack/react-virtual'
import type { DrawerListDriver, DrawerListDriverProps } from './DrawerList'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

export type DrawerListVirtualizationOptions = {
  /** Estimated row height in pixels before a row has been measured. */
  estimateSize?: number
  /** Number of rows rendered before and after the visible range. */
  overscan?: number
}

export function createDrawerListVirtualization({
  estimateSize = 48,
  overscan = 5,
}: DrawerListVirtualizationOptions = {}): DrawerListDriver {
  const Renderer = memo(function DrawerListVirtualizedRenderer(
    props: DrawerListDriverProps
  ) {
    return (
      <VirtualizedRenderer
        {...props}
        estimateSize={estimateSize}
        overscan={overscan}
      />
    )
  })

  return {
    Renderer,
  }
}

function VirtualizedRenderer({
  rows,
  activeIndex,
  selectedIndex,
  open,
  listRef,
  registerListDriver,
  estimateSize,
  overscan,
}: DrawerListDriverProps & Required<DrawerListVirtualizationOptions>) {
  const isServer = typeof window === 'undefined'
  const rerender = useReducer((count) => count + 1, 0)[1]
  const rowMetadata = useMemo(() => {
    let groupIndex = -1
    const groupIndexes: number[] = []
    const keepMountedIndexes: number[] = []

    rows.forEach((row, index) => {
      if (row.type === 'group') {
        groupIndex = index
      }
      groupIndexes[index] = groupIndex
      if (row.keepMounted) {
        keepMountedIndexes.push(index)
      }
    })

    return { groupIndexes, keepMountedIndexes }
  }, [rows])
  const measureElement = useCallback(
    (element: Element) => {
      const style = getComputedStyle(element)
      const measuredSize =
        element.getBoundingClientRect().height +
        parseFloat(style.marginTop || '0') +
        parseFloat(style.marginBottom || '0')

      return measuredSize > 0 ? measuredSize : estimateSize
    },
    [estimateSize]
  )

  const rangeExtractor = useCallback(
    (range: Range) => {
      const indexes = new Set(defaultRangeExtractor(range))

      const focusedIndex = activeIndex > -1 ? activeIndex : selectedIndex
      if (focusedIndex > -1) {
        const endIndex = Math.min(
          rows.length - 1,
          focusedIndex + Math.ceil(range.endIndex - range.startIndex)
        )
        for (let index = focusedIndex; index <= endIndex; index++) {
          indexes.add(index)
        }
      }
      rowMetadata.keepMountedIndexes.forEach((index) => indexes.add(index))

      Array.from(indexes).forEach((index) => {
        const groupIndex = rowMetadata.groupIndexes[index]
        if (groupIndex > -1) {
          indexes.add(groupIndex)
        }
      })

      return Array.from(indexes).sort((a, b) => a - b)
    },
    [activeIndex, rowMetadata, rows.length, selectedIndex]
  )

  const virtualizer = useVirtualizer({
    count: rows.length,
    enabled: !isServer,
    getScrollElement: () => listRef.current,
    observeElementRect: (instance, callback) =>
      observeElementRect(instance, (rect) => {
        callback(
          rect.height > 0
            ? rect
            : { width: rect.width, height: estimateSize * 8 }
        )
      }),
    estimateSize: () => estimateSize,
    measureElement,
    getItemKey: (index) => rows[index].key,
    initialRect: { width: 1, height: estimateSize * 8 },
    initialOffset: 0,
    useFlushSync: false,
    overscan,
    rangeExtractor,
  })
  const itemIndexes = useMemo(() => {
    return new Map(
      rows.flatMap(({ itemId }, index) =>
        typeof itemId === 'number' ? [[itemId, index]] : []
      )
    )
  }, [rows])
  const itemIds = useMemo(() => {
    return rows.flatMap(({ itemId }) =>
      typeof itemId === 'number' ? [itemId] : []
    )
  }, [rows])
  const previousItemIdsRef = useRef(itemIds)
  const scrollToItem = useCallback(
    (itemId: number, smooth: boolean) => {
      const index = itemIndexes.get(itemId)
      if (typeof index === 'number') {
        virtualizer.scrollToIndex(index, {
          align: 'auto',
          behavior: smooth ? 'smooth' : 'auto',
        })
      }
    },
    [itemIndexes, virtualizer]
  )
  const virtualRows = isServer
    ? rows.slice(0, overscan * 2 + 1).map((_, index) => ({
        index,
        start: index * estimateSize,
      }))
    : virtualizer.getVirtualItems()
  const totalSize = isServer
    ? rows.length * estimateSize
    : virtualizer.getTotalSize()
  useIsomorphicLayoutEffect(() => {
    return registerListDriver({
      itemIds,
      scrollToItem,
    })
  }, [itemIds, registerListDriver, scrollToItem])

  useIsomorphicLayoutEffect(() => {
    const frame = requestAnimationFrame(rerender)
    return () => cancelAnimationFrame(frame)
  }, [rerender])

  useIsomorphicLayoutEffect(() => {
    const previousItemIds = previousItemIdsRef.current
    previousItemIdsRef.current = itemIds
    const hasItemOrderChanged =
      itemIds.length !== previousItemIds.length ||
      itemIds.some((itemId, index) => itemId !== previousItemIds[index])

    if (!hasItemOrderChanged) {
      return
    }

    const scrollElement = listRef.current
    if (!scrollElement) {
      return
    }

    if (scrollElement.scrollTop) {
      scrollElement.scrollTop = 0
      scrollElement.dispatchEvent(new Event('scroll'))
    }
    virtualizer.scrollOffset = 0
  }, [itemIds, listRef, virtualizer])

  const activeItemId =
    activeIndex > -1 ? rows[activeIndex]?.itemId : undefined
  const selectedItemId =
    selectedIndex > -1 ? rows[selectedIndex]?.itemId : undefined
  const focusedItemId = activeItemId ?? selectedItemId
  const focusedItemIdRef = useRef(focusedItemId)
  focusedItemIdRef.current = focusedItemId

  useIsomorphicLayoutEffect(() => {
    const itemId = focusedItemIdRef.current
    if (!open || typeof itemId !== 'number') {
      return undefined
    }

    let attempts = 0
    let frame = 0
    const revealActiveItem = () => {
      const scrollElement = listRef.current
      if (scrollElement) {
        scrollElement.style.scrollBehavior = 'auto'
        const activeElement = scrollElement.querySelector<HTMLElement>(
          `[data-item="${itemId}"]`
        )
        const scrollRect = scrollElement.getBoundingClientRect()
        const activeRect = activeElement?.getBoundingClientRect()

        if (activeRect) {
          const nextTop =
            scrollElement.scrollTop + activeRect.top - scrollRect.top - 8
          scrollElement.scrollTop = Math.max(0, nextTop)
          scrollElement.dispatchEvent(new Event('scroll'))
        }
      }

      attempts += 1
      if (attempts < 3) {
        frame = requestAnimationFrame(revealActiveItem)
      }
    }

    frame = requestAnimationFrame(revealActiveItem)
    return () => cancelAnimationFrame(frame)
  }, [listRef, open])

  return (
    <li
      role="presentation"
      className="dnb-drawer-list__virtual-content"
      style={{ height: totalSize }}
    >
      <ul role="presentation">
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index]

          return (
            <Fragment key={row.key}>
              {row.render({
                ref: virtualizer.measureElement,
                'data-index': virtualRow.index,
                className: 'dnb-drawer-list__virtual-row',
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                },
              })}
            </Fragment>
          )
        })}
      </ul>
    </li>
  )
}

export default createDrawerListVirtualization

export const virtualizedDrawerList = createDrawerListVirtualization()
