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
import type { LocaleProps, SpacingProps } from '../../shared/types'
import { useHandleOddEven } from './TableTr'

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

  /* Set to true if you have one or more rows that contains an accordion content.
   * Default: false
   */
  accordion?: boolean

  /* Defines where the chevron will be placed.
   * Default: 'start'
   */
  accordionChevronPlacement?: 'start' | 'end'

  /**
   * Defines if the table should behave with a fixed table layout, using: "table-layout: fixed;"
   * Default: null.
   */
  fixed?: boolean
} & StickyTableHeaderProps

export type TableAllProps = TableProps &
  React.TableHTMLAttributes<HTMLTableElement> &
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
    accordion,
    accordionChevronPlacement, // eslint-disable-line
    ...props
  } = allProps

  const { elementRef } = useStickyHeader(allProps)
  const { trCountRef, rerenderAlias } = useHandleOddEven({ children })

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  validateDOMAttributes(allProps, props)

  return (
    <Provider skeleton={Boolean(skeleton)}>
      <TableContext.Provider
        value={{
          trCountRef,
          rerenderAlias,
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
            accordion && 'dnb-table--accordion',
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

export default Table

Table.StickyHelper = StickyHelper
Table.ScrollView = ScrollView
