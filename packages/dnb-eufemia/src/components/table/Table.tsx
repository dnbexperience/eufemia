import React from 'react'
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
import TableContext from './TableContext'
import { useStickyHeader, StickyHelper } from './TableStickyHeader'

import type { StickyTableHeaderProps } from './TableStickyHeader'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { SpacingProps } from '../../shared/types'

export type TableSizes = 'large' | 'medium' | 'small'
export type TableVariants = 'generic'

export { StickyHelper }
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
   * The style variant of the component.
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
   * Defines if the table should behave with a fixed table layout, using: "table-layout: fixed;"
   * Default: null.
   */
  fixed?: boolean
} & StickyTableHeaderProps

export type TableAllProps = TableProps &
  React.TableHTMLAttributes<HTMLTableElement> &
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
    ...props
  } = allProps

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const { elementRef } = useStickyHeader(allProps)

  // Create this ref in order to "auto" set even/odd class in tr elements
  const trCountRef = React.useRef({ count: 0 })

  // When the alias changes, all tr's will rerender and get a new even/odd color
  // This is usefull, when one tr gets removed
  const [rerenderAlias, setRerenderAlias] = React.useState({}) // eslint-disable-line no-unused-vars

  validateDOMAttributes(allProps, props)

  return (
    <Provider skeleton={Boolean(skeleton)}>
      <TableContext.Provider
        value={{
          trCountRef,
          rerenderAlias,
          forceRerender,
          allProps: {
            ...context.getTranslation(componentProps).Table,
            ...allProps,
          },
        }}
      >
        <table
          className={classnames(
            'dnb-table',
            variant && `dnb-table__variant--${variant}`,
            size && `dnb-table__size--${size}`,
            sticky && `dnb-table--sticky`,
            fixed && `dnb-table--fixed`,
            border && `dnb-table--border`,
            outline && `dnb-table--outline`,
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

  function forceRerender() {
    trCountRef.current.count = 0
    setRerenderAlias({})
  }
}

export default Table

Table.StickyHelper = StickyHelper
Table.ScrollView = ScrollView
