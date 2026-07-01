import { useContext, useEffect, useRef } from 'react'
import type { ReactNode, Ref, RefObject, TableHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import { useSpacing } from '../space/SpacingUtils'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { extendPropsWithContext } from '../../shared/component-helper'
import ScrollView from './TableScrollView'
import { TableContext } from './TableContext'
import { useStickyHeader } from './TableStickyHeader'

import type { TableStickyHeaderProps } from './TableStickyHeader'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { LocaleProps, SpacingProps } from '../../shared/types'
import { useHandleOddEven } from './TableTr'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCombinedRef from '../../shared/helpers/useCombinedRef'

export type TableSizes = 'large' | 'medium' | 'small'
export type TableVariants = 'generic'

export { ScrollView }

export type TableProps = {
  /**
   * The content of the component.
   */
  children: ReactNode

  /**
   * Custom `className` on the component root.
   * Default: `undefined`
   */
  className?: string

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   * Default: `undefined`
   */
  skeleton?: SkeletonShow

  /**
   * Spacing size inside the table header and data.
   * Default: `"large"`
   */
  size?: TableSizes

  /**
   * Defines the visual style of the table header. Use `subtle` for a lighter appearance with reduced font-weight, smaller font-size, and muted text color.
   * Default: `"emphasis"`
   */
  variant?: TableVariants

  /**
   * Use `true` to show borders between table data cells. Use `"horizontal"` to show only horizontal borders between rows.
   * Default: `false`
   */
  border?: boolean | 'horizontal'

  /**
   * Use `true` to show an outline border around the table.
   * Default: `false`
   */
  outline?: boolean

  /**
   * Use `false` to disable alternating row background colors (striped rows).
   * Default: `true`
   */
  striped?: boolean

  /**
   * Defines how the Table should look. Use `accordion` for an accordion-like table. Use `navigation` for a navigation table.
   * Default: `null`
   */
  mode?: 'accordion' | 'navigation'

  /**
   * Defines where the chevron will be placed, should only be used together with `mode="accordion"`.
   * Default: `"left"`
   */
  accordionChevronPlacement?: 'left' | 'right'

  /**
   * If set to `true`, the table will behave with a fixed table layout, using: `table-layout: fixed;`. Use e.g. CSS `width: 40%` on a table column to define the width.
   * Default: `null`
   */
  fixed?: boolean

  /**
   * Ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.
   * Default: `undefined`
   */
  collapseAllHandleRef?: RefObject<() => void>
} & TableStickyHeaderProps

export type TableAllProps = TableProps &
  Omit<TableHTMLAttributes<HTMLTableElement>, 'border'> &
  LocaleProps &
  SpacingProps & {
    ref?: Ref<HTMLElement>
  }

const tableDefaultProps: Partial<TableAllProps> = {
  size: 'large',
  variant: 'generic',
}

const Table = (componentProps: TableAllProps) => {
  const context = useContext(Context)

  const allProps = extendPropsWithContext(
    componentProps,
    tableDefaultProps,
    context?.Table,
    {
      skeleton: context?.skeleton,
    }
  )

  const {
    className,
    children,
    size,
    skeleton,
    variant,
    sticky,
    stickyOffset,
    fixed,
    border,
    outline,
    striped,
    mode,
    accordionChevronPlacement,
    collapseAllHandleRef,
    ref,
    ...props
  } = allProps

  const { elementRef } = useStickyHeader(allProps)
  const mergedRef = useCombinedRef(elementRef, ref)

  const { trCountRef, rerenderAlias, totalCount } = useHandleOddEven({
    children,
  })
  const collapseTrCallbacks = useRef<(() => void)[]>([])

  useEffect(() => {
    if (collapseAllHandleRef) {
      const mutableCollapseAllHandleRef =
        collapseAllHandleRef as RefObject<() => void>
      mutableCollapseAllHandleRef.current = () => {
        collapseTrCallbacks.current.forEach((callback) => callback())
      }
    }
  }, [collapseAllHandleRef])

  const skeletonClasses = createSkeletonClass('font', skeleton, context)

  const tableProps = useSpacing(allProps, {
    ...props,
    ref: mergedRef,
    className: clsx(
      'dnb-table',
      variant && `dnb-table__variant--${variant}`,
      size && `dnb-table__size--${size}`,
      sticky && 'dnb-table--sticky',
      fixed && 'dnb-table--fixed',
      border && 'dnb-table--border',
      typeof border === 'string' && `dnb-table--border-${border}`,
      border === false && 'dnb-table--no-border',
      outline && 'dnb-table--outline',
      striped === false && 'dnb-table--no-striped',
      mode === 'accordion' && 'dnb-table--accordion',
      mode === 'navigation' && 'dnb-table--navigation',
      skeletonClasses,
      className
    ),
  })

  return (
    <Provider skeleton={Boolean(skeleton)}>
      <TableContext
        value={{
          trCountRef,
          rerenderAlias,
          totalCount,
          collapseTrCallbacks,
          allProps: {
            ...allProps,
            ...context.getTranslation(componentProps).Table,
          },
        }}
      >
        <table {...tableProps}>{children}</table>
      </TableContext>
    </Provider>
  )
}

withComponentMarkers(Table, { _supportsSpacingProps: true })

export default Table
export { useTableKeyboardNavigation } from './useTableKeyboardNavigation'
export { default as Th } from './TableTh'
export { default as Td } from './TableTd'
export { default as Tr } from './TableTr'
export { useTableHighlight } from './useTableHighlight'

Table.ScrollView = ScrollView
