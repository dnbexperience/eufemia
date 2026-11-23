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

type Column = {
  cell: HTMLTableCellElement
  active: boolean
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
  const childType = children.type
  const childKey = children.key
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
      const next = cells.map((cell, index) => {
        const rect = cell.getBoundingClientRect()
        const width = Math.max(
          0,
          Math.min(rect.right, viewport.left + element.clientWidth) -
            Math.max(rect.left, viewport.left)
        )
        // A small threshold gap keeps clipped edges from flickering.
        const threshold = previousColumns?.[index]?.active ? 0.45 : 0.55
        return {
          cell,
          active:
            width > Math.min(rect.width, element.clientWidth) * threshold,
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
    mutationObserver.observe(element, { childList: true, subtree: true })
    window.addEventListener('resize', updateLayout)

    return () => {
      observer?.disconnect()
      mutationObserver.disconnect()
      element.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateLayout)
    }
  }, [childType, childKey])

  const indicator =
    columns.length > 0 ? (
      <ScrollIndicator
        ref={indicatorRef}
        className="dnb-table__scroll-indicator"
        data-hidden={indicatorHidden}
        aria-hidden={indicatorHidden || undefined}
        aria-label={translations.scrollColumnsSR}
        items={columns.map(({ active }, index) => ({
          label: translations.scrollColumnSR.replace(
            '%s',
            String(index + 1)
          ),
          active,
        }))}
        onChange={({ index }) => {
          const element = ref.current
          const viewport = element.getBoundingClientRect()
          const rect = columns[index].cell.getBoundingClientRect()
          const isRtl = getComputedStyle(element).direction === 'rtl'
          const offset = isRtl
            ? rect.right - viewport.right
            : rect.left - viewport.left
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
