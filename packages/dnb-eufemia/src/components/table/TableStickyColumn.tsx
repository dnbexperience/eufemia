import { useEffect } from 'react'
import type { RefObject } from 'react'

export type TableStickyColumnProps = {
  /**
   * Use `"first"` or `"last"` to keep the first or last column visible while the table scrolls horizontally, e.g. inside a `Table.ScrollView`. The column stops sticking while it is wider than half of the visible width.
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
    let maxScroll = 0
    let isDisabled = false
    let observedCell: HTMLTableCellElement = null

    const onScroll = () => {
      const offset = Math.abs(scrollElem.scrollLeft)
      const overlaps =
        !isDisabled && (isFirst ? offset >= 1 : maxScroll - offset >= 1)
      tableElem.toggleAttribute('data-sticky-column-overlap', overlaps)
    }

    // Browsers scroll only fully hidden elements into view, so the sticky column may still cover a part of them.
    // The scroll padding includes a gap for the focus ring.
    let frame: number
    const onFocusIn = ({ target }: FocusEvent) => {
      const element = target as HTMLElement
      const cell = element.closest?.('td, th')

      if (
        isDisabled ||
        !observedCell ||
        cell?.closest('table') !== tableElem ||
        cell ===
          cell.parentElement[
            isFirst ? 'firstElementChild' : 'lastElementChild'
          ] ||
        !element.matches(':focus-visible')
      ) {
        return // stop here
      }

      // WebKit would stop the scrolling when it scrolls the focused element into view itself
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const style = window.getComputedStyle(scrollElem)
        const padding =
          parseFloat(
            isFirst ? style.scrollPaddingLeft : style.scrollPaddingRight
          ) || 0
        const sticky = observedCell.getBoundingClientRect()
        const rect = element.getBoundingClientRect()
        const offset = isFirst
          ? Math.min(0, rect.left - sticky.left - padding)
          : Math.max(0, rect.right - sticky.right + padding)
        const isPartlyVisible = isFirst
          ? rect.right > sticky.right
          : rect.left < sticky.left

        if (offset && isPartlyVisible) {
          scrollElem.scrollBy({ left: offset })
        }
      })
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

      const width = cell?.offsetWidth || 0
      const visibleWidth = scrollElem.clientWidth

      // Leave room for the other columns, e.g. on small screens or when zoomed in
      isDisabled = width > visibleWidth / 2
      tableElem.toggleAttribute('data-sticky-column-disabled', isDisabled)

      // Lets focused elements scroll into view next to the sticky column, not underneath it
      if (isDisabled) {
        scrollElem.removeAttribute('data-table-sticky-column')
      } else {
        scrollElem.setAttribute('data-table-sticky-column', stickyColumn)
      }
      scrollElem.style.setProperty(
        '--table-sticky-column-width',
        `${width}px`
      )

      // Lets the sticky header cell draw its shadow across the visible width
      tableElem.style.setProperty(
        '--table-sticky-column-viewport-width',
        `${visibleWidth}px`
      )

      maxScroll = scrollElem.scrollWidth - visibleWidth
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
    scrollElem.addEventListener('focusin', onFocusIn)
    onResize()

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
      scrollElem.removeEventListener('scroll', onScroll)
      scrollElem.removeEventListener('focusin', onFocusIn)
      scrollElem.removeAttribute('data-table-sticky-column')
      scrollElem.style.removeProperty('--table-sticky-column-width')
      tableElem.style.removeProperty(
        '--table-sticky-column-viewport-width'
      )
      tableElem.removeAttribute('data-sticky-column-disabled')
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
