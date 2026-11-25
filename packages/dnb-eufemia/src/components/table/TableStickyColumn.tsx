import { useEffect } from 'react'
import type { RefObject } from 'react'

export type TableStickyColumnProps = {
  /**
   * Use `"first"` or `"last"` to keep the first or last column visible while the table scrolls horizontally, e.g. inside a `Table.ScrollView`.
   */
  stickyColumn?: 'first' | 'last'
}

export const useStickyColumn = (
  elementRef: RefObject<HTMLTableElement>,
  { stickyColumn }: TableStickyColumnProps
) => {
  useEffect(() => {
    const tableElem = elementRef.current
    const scrollElem = stickyColumn && getScrollContainer(tableElem)

    if (!scrollElem) {
      return undefined // stop here
    }

    const isFirst = stickyColumn === 'first'
    const paddingProperty = isFirst
      ? 'scroll-padding-left'
      : 'scroll-padding-right'
    let maxScroll = 0
    let observedCell: HTMLTableCellElement = null

    const onScroll = () => {
      const offset = Math.abs(scrollElem.scrollLeft)
      const overlaps = isFirst ? offset >= 1 : maxScroll - offset >= 1
      tableElem.toggleAttribute('data-sticky-column-overlap', overlaps)
    }

    const onResize = () => {
      // Like the CSS, skip cells that span several columns
      const cell = Array.from(
        tableElem.rows,
        ({ cells }) => cells[isFirst ? 0 : cells.length - 1]
      ).find((cell) => cell?.colSpan === 1)

      if (observer && cell !== observedCell) {
        if (observedCell) {
          observer.unobserve(observedCell)
        }
        if (cell) {
          observer.observe(cell)
        }
        observedCell = cell
      }

      // Scroll focused elements into view next to the sticky column, not underneath it
      scrollElem.style.setProperty(
        paddingProperty,
        `${cell?.offsetWidth || 0}px`
      )

      // Lets the sticky header cell draw its shadow across the visible width
      tableElem.style.setProperty(
        '--table-sticky-column-viewport-width',
        `${scrollElem.clientWidth}px`
      )

      maxScroll = scrollElem.scrollWidth - scrollElem.clientWidth
      onScroll()
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null

    if (observer) {
      observer.observe(tableElem)
      observer.observe(scrollElem)
    } else {
      window.addEventListener('resize', onResize)
    }

    scrollElem.addEventListener('scroll', onScroll, { passive: true })
    onResize()

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
      scrollElem.removeEventListener('scroll', onScroll)
      scrollElem.style.removeProperty(paddingProperty)
      tableElem.style.removeProperty(
        '--table-sticky-column-viewport-width'
      )
      tableElem.removeAttribute('data-sticky-column-overlap')
    }
  }, [elementRef, stickyColumn])
}

// The same element the sticky cells stick to
const getScrollContainer = (element: HTMLElement): HTMLElement => {
  for (
    let parent = element?.parentElement;
    parent;
    parent = parent.parentElement
  ) {
    const { overflowX } = window.getComputedStyle(parent)

    if (overflowX !== 'visible' && overflowX !== 'clip') {
      return overflowX === 'auto' || overflowX === 'scroll' ? parent : null
    }
  }

  return null
}
