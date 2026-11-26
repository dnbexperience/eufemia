import { useRef, useState } from 'react'
import type { ReactElement, TableHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import type { ScrollViewAllProps } from '../scroll-view/ScrollView'
import ScrollView from '../scroll-view/ScrollView'
import ScrollIndicator from '../scroll-indicator/ScrollIndicator'
import { removeSpaceProps, useSpacing } from '../space/SpacingUtils'

import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useTranslation from '../../shared/useTranslation'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

export type TableScrollViewProps = {
  /**
   * The content of the component.
   */
  children: ReactElement<HTMLTableElement>
}

export type TableScrollViewAllProps = TableScrollViewProps &
  Omit<TableHTMLAttributes<HTMLDivElement>, 'children'> &
  SpacingProps &
  ScrollViewAllProps

// Sticky cells, e.g. of a sticky column, cover the columns that are scrolled underneath them
const getUncoveredArea = (
  element: HTMLElement,
  cells: Array<HTMLTableCellElement>
) => {
  const viewport = element.getBoundingClientRect()
  const middle = viewport.left + element.clientWidth / 2
  const stickyCells = new Set<HTMLTableCellElement>()
  let start = viewport.left
  let end = viewport.left + element.clientWidth

  cells.forEach((cell) => {
    if (getComputedStyle(cell).position === 'sticky') {
      const rect = cell.getBoundingClientRect()
      stickyCells.add(cell)

      if ((rect.left + rect.right) / 2 < middle) {
        start = Math.max(start, rect.right)
      } else {
        end = Math.min(end, rect.left)
      }
    }
  })

  return { start, end, stickyCells }
}

// Scroll the dot row, not the page or the table, to reveal the dots.
// The first dot wins when they do not fit.
const revealDots = (row: HTMLElement, first: Element, last = first) => {
  const viewport = row.getBoundingClientRect()
  const getOffset = ({ left, right }: { left: number; right: number }) =>
    left < viewport.left
      ? left - viewport.left
      : Math.max(0, right - viewport.right)
  const start = first.getBoundingClientRect()
  let offset = getOffset(last.getBoundingClientRect())
  offset += getOffset({
    left: start.left - offset,
    right: start.right - offset,
  })

  if (offset) {
    row.scrollBy({ left: offset, behavior: 'instant' })
  }
}

type Column = {
  cell: HTMLTableCellElement
  active: boolean
  label: string
}

export default function TableScrollView(
  props: TableScrollViewAllProps & {
    _renderScrollView?: (
      scrollView: ReactElement,
      indicator: ReactElement
    ) => ReactElement
  }
) {
  const {
    className,
    children,
    ref: refProp,
    _renderScrollView = (scrollView, indicator) => (
      <>
        {indicator}
        {scrollView}
      </>
    ),
    ...rest
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<Column[]>([])
  const [indicatorHidden, setIndicatorHidden] = useState(false)
  const combinedRef = useCombinedRef(refProp, ref)
  const { Table: translations } = useTranslation()
  const childType = children?.type
  const childKey = children?.key
  const { width, maxWidth, direction, ...scrollStyle } = rest.style || {}
  const containerProps = useSpacing(props, {
    className: 'dnb-table__scroll-container',
    dir: rest.dir,
    style: { width, maxWidth, direction },
  })

  useLayoutEffect(() => {
    const element = ref.current
    let previousColumns: Column[]
    let hidden = false
    const updateIndicator = (updateVisibility: boolean) => {
      const table = element.querySelector('table')
      const viewport = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      const overflows =
        element.scrollWidth > element.clientWidth + 1 &&
        style.overflowX !== 'visible'
      const rows = Array.from(table?.rows || [])
      const row = rows.reduce<HTMLTableRowElement>(
        (widest, current) =>
          current.cells.length > (widest?.cells.length || 0)
            ? current
            : widest,
        null
      )
      const cells = overflows ? Array.from(row?.cells || []) : []
      const area = getUncoveredArea(element, cells)
      const next = cells.map((cell, index) => {
        const rect = cell.getBoundingClientRect()
        const isSticky = area.stickyCells.has(cell)
        const start = isSticky ? viewport.left : area.start
        const end = isSticky
          ? viewport.left + element.clientWidth
          : area.end
        const width = Math.max(
          0,
          Math.min(rect.right, end) - Math.max(rect.left, start)
        )
        // A small threshold gap keeps clipped edges from flickering.
        const threshold = previousColumns?.[index]?.active ? 0.45 : 0.55
        return {
          cell,
          label: updateVisibility
            ? cell.tagName === 'TH'
              ? cell.textContent.trim()
              : ''
            : previousColumns?.[index]?.label || '',
          active: width > Math.min(rect.width, end - start) * threshold,
        }
      })
      // Scrolling updates the active columns without hiding the controls.
      if (updateVisibility) {
        hidden = next.every((column) => column.active)
        setIndicatorHidden(hidden)
      }
      if (
        hidden &&
        indicatorRef.current?.contains(document.activeElement)
      ) {
        const target = overflows ? element : table || element
        if (!target.hasAttribute('tabindex')) {
          target.tabIndex = -1
        }
        target.focus({ preventScroll: true })
      }
      if (
        next.length !== previousColumns?.length ||
        next.some(
          (column, index) =>
            column.cell !== previousColumns[index].cell ||
            column.label !== previousColumns[index].label ||
            column.active !== previousColumns[index].active
        )
      ) {
        previousColumns = next
        setColumns(next)
      }
    }

    const updateLayout = () => updateIndicator(true)
    const updateScroll = () => updateIndicator(false)
    updateLayout()
    element.addEventListener('scroll', updateScroll, { passive: true })
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateLayout)
        : undefined
    observer?.observe(element)
    Array.from(element.children).forEach((child) =>
      observer?.observe(child)
    )
    const mutationObserver = new MutationObserver(updateLayout)
    mutationObserver.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
      // Is set while a sticky column sticks, e.g. on "Table" with "stickyColumn"
      attributeFilter: ['data-table-sticky-column'],
    })
    if (!observer) {
      window.addEventListener('resize', updateLayout)
    }

    return () => {
      observer?.disconnect()
      mutationObserver.disconnect()
      element.removeEventListener('scroll', updateScroll)
      if (!observer) {
        window.removeEventListener('resize', updateLayout)
      }
    }
  }, [childType, childKey])

  // Keep the active dots in view when the dot row overflows
  useLayoutEffect(() => {
    const row = indicatorRef.current
    const dots = row?.querySelectorAll('[data-active="true"]')

    if (dots?.length) {
      revealDots(row, dots[0], dots[dots.length - 1])
    }
  }, [columns])

  const indicator =
    columns.length > 0 ? (
      <ScrollIndicator
        ref={indicatorRef}
        className="dnb-table__scroll-indicator"
        data-hidden={indicatorHidden}
        aria-hidden={indicatorHidden || undefined}
        aria-label={translations.scrollColumnsSR}
        // Firefox makes an overflowing row a tab stop, but the dots already have one
        tabIndex={-1}
        onFocusCapture={(event) => {
          revealDots(event.currentTarget, event.target)
        }}
        items={columns.map(({ active, label }, index) => ({
          label: translations.scrollColumnSR.replace(
            '%s',
            label || String(index + 1)
          ),
          active,
        }))}
        onChange={({ index }) => {
          const element = ref.current
          const viewport = element.getBoundingClientRect()
          const { cell } = columns[index]
          const rect = cell.getBoundingClientRect()
          const isRtl = getComputedStyle(element).direction === 'rtl'

          // Scroll the column next to a sticky column, not underneath it
          const { start, end, stickyCells } = getUncoveredArea(
            element,
            columns.map((column) => column.cell)
          )
          const isSticky = stickyCells.has(cell)
          const coveredStart = isSticky ? 0 : start - viewport.left
          const coveredEnd = isSticky
            ? 0
            : viewport.left + element.clientWidth - end

          const offset = isRtl
            ? rect.right - viewport.right + coveredEnd
            : rect.left - viewport.left - coveredStart
          const max = element.scrollWidth - element.clientWidth
          const left = isRtl
            ? Math.max(-max, Math.min(0, element.scrollLeft + offset))
            : Math.min(max, Math.max(0, element.scrollLeft + offset))
          element.scrollTo({
            left,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }}
      />
    ) : null

  return (
    <div {...containerProps}>
      {_renderScrollView(
        <ScrollView
          ref={combinedRef}
          className={clsx('dnb-table__scroll-view', className)}
          interactive="auto"
          {...removeSpaceProps(rest)}
          style={scrollStyle}
        >
          {children}
        </ScrollView>,
        indicator
      )}
    </div>
  )
}

withComponentMarkers(TableScrollView, { _supportsSpacingProps: true })
