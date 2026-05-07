import { useContext, useEffect, useRef } from 'react'
import type { ReactNode, Ref, RefObject, TableHTMLAttributes } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import { applySpacing } from '../space/SpacingUtils'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
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
   * Custom className on the component root
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   */
  skeleton?: SkeletonShow

  /**
   * The size of the component.
   * Default: `large`
   */
  size?: TableSizes

  /**
   * The style variant of the component. Currently not implemented.
   * Default: `generic`
   */
  variant?: TableVariants

  /**
   * Use `true` to show borders between table data cells.
   * Default: `false`
   */
  border?: boolean

  /**
   * Use `true` to show an outline border around the table.
   * Default: `false`
   */
  outline?: boolean

  /**
   * Defines how the Table should look. Use `accordion` for an accordion-like table. Use `navigation` for a navigation table.
   */
  mode?: 'accordion' | 'navigation'

  /**
   * Defines where the chevron will be placed, should only be used together with mode="accordion".
   * Default: `'left'`
   */
  accordionChevronPlacement?: 'left' | 'right'

  /**
   * Defines if the table should behave with a fixed table layout, using: "table-layout: fixed;"
   * Default: `null`
   */
  fixed?: boolean

  /**
   * ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.
   *
   * Default: `undefined`
   */
  collapseAllHandleRef?: RefObject<() => void>

  /**
   * Array of table plugins that run as effects with access to the table element.
   * Each plugin receives the table DOM element and may return a cleanup function.
   * Default: `undefined`
   */
  plugins?: TablePlugin[]
} & TableStickyHeaderProps

/**
 * A table plugin function that receives the table element after render.
 * It may return a cleanup function that is called before re-running or on unmount.
 */
export type TablePlugin = (
  tableElement: HTMLTableElement
) => void | (() => void)

export type TableAllProps = TableProps &
  Omit<TableHTMLAttributes<HTMLTableElement>, 'border'> &
  LocaleProps &
  SpacingProps & {
    ref?: Ref<HTMLElement>
  }

const defaultProps: Partial<TableAllProps> = {
  size: 'large',
  variant: 'generic',
}

const Table = (componentProps: TableAllProps) => {
  const context = useContext(Context)

  const allProps = extendPropsWithContext(
    componentProps,
    defaultProps,
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
    mode,
    accordionChevronPlacement,
    collapseAllHandleRef,
    ref,
    plugins,
    ...props
  } = allProps

  const { elementRef } = useStickyHeader(allProps)
  const mergedRef = useCombinedRef(elementRef, ref)

  const { trCountRef, rerenderAlias } = useHandleOddEven({ children })
  const collapseTrCallbacks = useRef<(() => void)[]>([])

  useEffect(() => {
    const table = elementRef.current
    if (!table || !plugins?.length) {
      return undefined // stop here
    }

    const cleanups = plugins
      .map((plugin) => plugin(table))
      .filter(Boolean) as (() => void)[]

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
    }
  })

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

  validateDOMAttributes(allProps, props)

  const tableProps = applySpacing(allProps, {
    ...props,
    ref: mergedRef,
    className: clsx(
      'dnb-table',
      variant && `dnb-table__variant--${variant}`,
      size && `dnb-table__size--${size}`,
      sticky && 'dnb-table--sticky',
      fixed && 'dnb-table--fixed',
      border && 'dnb-table--border',
      border === false && 'dnb-table--no-border',
      outline && 'dnb-table--outline',
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
export { highlightPlugin } from './plugins/TableHighlightPlugin'

Table.ScrollView = ScrollView
