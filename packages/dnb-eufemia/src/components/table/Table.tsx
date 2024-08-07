import React, { useEffect } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import ScrollView from './TableScrollView'
import { TableContext } from './TableContext'
import { useStickyHeader } from './TableStickyHeader'

import type { StickyTableHeaderProps } from './TableStickyHeader'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { LocaleProps, SpacingProps } from '../../shared/types'
import { useHandleOddEven } from './TableTr'

export type TableSizes = 'large' | 'medium' | 'small'
export type TableVariants = 'generic'

export { ScrollView }

export type TableProps = {
  /**
   * The content of the component.
   */
  children: React.ReactNode

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
   * Default: large.
   */
  size?: TableSizes

  /**
   * The style variant of the component. Currently not implemented.
   * Default: generic.
   */
  variant?: TableVariants

  /**
   * Use `true` to show borders between table data cell
   * Default: false
   */
  border?: boolean

  /**
   * Use `true` to show a outline border around the table
   * Default: false
   */
  outline?: boolean

  /**
   * Defines how the Table should look. Use `accordion` for an accordion-like table. Use `navigation` for a navigation table.
   */
  mode?: 'accordion' | 'navigation'

  /**
   * @deprecated – use mode="accordion" instead. Will be removed in v11.
   */
  accordion?: boolean

  /**
   * Defines where the chevron will be placed, should only be used together with mode="accordion".
   * Default: 'start'
   */
  accordionChevronPlacement?: 'start' | 'end'

  /**
   * Defines if the table should behave with a fixed table layout, using: "table-layout: fixed;"
   * Default: null.
   */
  fixed?: boolean

  /**
   * ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.
   *
   * Default: `undefined`
   */
  collapseAllHandleRef?: React.MutableRefObject<() => void>
} & StickyTableHeaderProps

export type TableAllProps = TableProps &
  Omit<React.TableHTMLAttributes<HTMLTableElement>, 'border'> &
  LocaleProps &
  SpacingProps

export const defaultProps = {
  size: 'large',
  variant: 'generic',
}

const Table = (componentProps: TableAllProps) => {
  const context = React.useContext(Context)

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
    stickyOffset, // eslint-disable-line
    fixed,
    border,
    outline,
    accordion, // Deprecated – can be removed in v11
    mode,
    accordionChevronPlacement, // eslint-disable-line
    collapseAllHandleRef,
    ...props
  } = allProps

  const { elementRef } = useStickyHeader(allProps)
  const { trCountRef, rerenderAlias } = useHandleOddEven({ children })
  const collapseTrCallbacks = React.useRef<(() => void)[]>([])

  useEffect(() => {
    if (collapseAllHandleRef) {
      collapseAllHandleRef.current = () => {
        collapseTrCallbacks.current.forEach((callback) => callback())
      }
    }
  }, [collapseAllHandleRef])

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  validateDOMAttributes(allProps, props)

  return (
    <Provider skeleton={Boolean(skeleton)}>
      <TableContext.Provider
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
        <table
          className={classnames(
            'dnb-table',
            variant && `dnb-table__variant--${variant}`,
            size && `dnb-table__size--${size}`,
            sticky && 'dnb-table--sticky',
            fixed && 'dnb-table--fixed',
            border && 'dnb-table--border',
            outline && 'dnb-table--outline',
            accordion && 'dnb-table--accordion', // Deprecated – can be removed in v11
            mode === 'accordion' && 'dnb-table--accordion',
            mode === 'navigation' && 'dnb-table--navigation',
            spacingClasses,
            skeletonClasses,
            className
          )}
          ref={elementRef}
          {...props}
        >
          {children}
        </table>
      </TableContext.Provider>
    </Provider>
  )
}

Table._supportsSpacingProps = true

export default Table

Table.ScrollView = ScrollView
