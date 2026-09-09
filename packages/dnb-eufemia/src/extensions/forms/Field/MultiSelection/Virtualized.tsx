import {
  Fragment,
  memo,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'
import {
  defaultRangeExtractor,
  useVirtualizer,
} from '@tanstack/react-virtual'
import type { Range } from '@tanstack/react-virtual'
import type {
  MultiSelectionListDriver,
  MultiSelectionListDriverProps,
} from './MultiSelection'
import { useIsomorphicLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export type MultiSelectionVirtualizationOptions = {
  /** Estimated item height in pixels before an item has been measured. */
  estimateSize?: number
  /** Number of items rendered before and after the visible range. */
  overscan?: number
}

export function createMultiSelectionVirtualization({
  estimateSize = 56,
  overscan = 5,
}: MultiSelectionVirtualizationOptions = {}): MultiSelectionListDriver {
  const Renderer = memo(function MultiSelectionVirtualizedRenderer(
    props: MultiSelectionListDriverProps
  ) {
    return (
      <VirtualizedRenderer
        {...props}
        estimateSize={estimateSize}
        overscan={overscan}
      />
    )
  })

  return { Renderer }
}

function VirtualizedRenderer({
  rows,
  open,
  scrollRef,
  registerListDriver,
  estimateSize,
  overscan,
}: MultiSelectionListDriverProps &
  Required<MultiSelectionVirtualizationOptions>) {
  const isServer = typeof window === 'undefined'
  const rerender = useReducer((count) => count + 1, 0)[1]
  const [focusTarget, setFocusTarget] = useState<number | null>(null)
  const rangeExtractor = useCallback(
    (range: Range) => {
      const indexes = new Set(defaultRangeExtractor(range))
      if (focusTarget !== null && focusTarget < rows.length) {
        indexes.add(focusTarget)
      }
      return Array.from(indexes).sort((a, b) => a - b)
    },
    [focusTarget, rows.length]
  )
  const virtualizer = useVirtualizer({
    count: rows.length,
    enabled: !isServer && open,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    measureElement: (element) => {
      const style = getComputedStyle(element)
      const measuredSize =
        element.getBoundingClientRect().height +
        parseFloat(style.marginTop || '0') +
        parseFloat(style.marginBottom || '0')

      return measuredSize > 0 ? measuredSize : estimateSize
    },
    getItemKey: (index) => rows[index].key,
    initialRect: { width: 1, height: estimateSize * 8 },
    overscan,
    rangeExtractor,
  })
  const initialItems = rows.slice(0, overscan * 2 + 1).map((_, index) => ({
    index,
    start: index * estimateSize,
  }))
  const virtualItems = isServer
    ? initialItems
    : virtualizer.getVirtualItems().length > 0
      ? virtualizer.getVirtualItems()
      : initialItems
  if (
    !isServer &&
    focusTarget !== null &&
    focusTarget < rows.length &&
    !virtualItems.some(({ index }) => index === focusTarget)
  ) {
    const focusedMeasurement = virtualizer.measurementsCache[focusTarget]
    virtualItems.push(
      focusedMeasurement ?? {
        index: focusTarget,
        start: focusTarget * estimateSize,
      }
    )
    virtualItems.sort((a, b) => a.index - b.index)
  }
  const totalSize = isServer
    ? rows.length * estimateSize
    : virtualizer.getTotalSize()
  const focusIndex = useCallback(
    (index: number, direction: -1 | 1 = 1) => {
      let focusableIndex = index
      while (
        focusableIndex >= 0 &&
        focusableIndex < rows.length &&
        rows[focusableIndex].disabled
      ) {
        focusableIndex += direction
      }

      if (focusableIndex < 0 || focusableIndex >= rows.length) {
        return
      }

      flushSync(() => setFocusTarget(focusableIndex))
      scrollRef.current
        ?.querySelector<HTMLInputElement>(
          `[data-multi-selection-index="${focusableIndex}"] .dnb-checkbox__input:not(:disabled)`
        )
        ?.focus({ preventScroll: true })
      virtualizer.scrollToIndex(focusableIndex, { align: 'auto' })
    },
    [rows, scrollRef, virtualizer]
  )
  const driver = useMemo(
    () => ({ focusIndex, itemCount: rows.length }),
    [focusIndex, rows.length]
  )

  useIsomorphicLayoutEffect(() => {
    return registerListDriver(driver)
  }, [driver, registerListDriver])

  useIsomorphicLayoutEffect(() => {
    const frame = requestAnimationFrame(rerender)
    return () => cancelAnimationFrame(frame)
  }, [rerender])

  const rowKeys = useMemo(() => rows.map(({ key }) => key), [rows])
  const previousRowKeysRef = useRef(rowKeys)
  useIsomorphicLayoutEffect(() => {
    const previousRowKeys = previousRowKeysRef.current
    previousRowKeysRef.current = rowKeys
    const changed =
      rowKeys.length !== previousRowKeys.length ||
      rowKeys.some((key, index) => key !== previousRowKeys[index])

    if (changed) {
      setFocusTarget(null)
      virtualizer.scrollToOffset(0)
      virtualizer.measure()
      const frame = requestAnimationFrame(rerender)
      return () => cancelAnimationFrame(frame)
    }

    return undefined
  }, [rerender, rowKeys, virtualizer])

  return (
    <li
      role="presentation"
      className="dnb-forms-field-multi-selection__virtual-content"
      style={{ height: totalSize }}
    >
      <ul role="presentation">
        {virtualItems.map((virtualItem) => {
          const row = rows[virtualItem.index]

          return (
            <Fragment key={row.key}>
              {row.render({
                ref: virtualizer.measureElement,
                'data-index': virtualItem.index,
                className: 'dnb-forms-field-multi-selection__virtual-row',
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                },
              })}
            </Fragment>
          )
        })}
      </ul>
    </li>
  )
}

export default createMultiSelectionVirtualization

export const virtualizedMultiSelection =
  createMultiSelectionVirtualization()
