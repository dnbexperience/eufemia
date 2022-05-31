import React from 'react'
import classnames from 'classnames'

// Shared
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { SkeletonShow } from '../skeleton/Skeleton'
import { ISpacingProps } from '../../shared/interfaces'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import TableContext from './TableContext'
import AccordionContent from './TableAccordionContent'

// Internal
import {
  useStickyHeader,
  StickyHelper,
  StickyTableHeaderProps,
} from './TableStickyHeader'

export type TableSizes = 'large' | 'medium'
export type TableVariants = 'table'
export type TableRespnsiveVariants = 'cards' | 'lines'

export { StickyHelper }

export interface TableProps extends StickyTableHeaderProps {
  /**
   * The content of the component.
   */
  children: React.ReactNode

  /**
   * Custom className on the component root
   */
  className?: string

  /**
   * Male the Table responsive to narrow/smaller screens
   */
  responsive?: boolean

  /**
   * The variant when responsive is true.
   * Default: lines.
   */
  responsiveVariant?: TableRespnsiveVariants

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
   * The variant of the component.
   * Default: table.
   */
  variant?: TableVariants
}

export const defaultProps = {
  size: 'large',
  variant: 'table',
  responsiveVariant: 'table',
}

const Table = (
  componentProps: TableProps &
    React.TableHTMLAttributes<HTMLTableElement> &
    ISpacingProps
) => {
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
    responsiveVariant,
    responsive,
    sticky,
    stickyOffset, // eslint-disable-line
    ...props
  } = allProps

  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const { elementRef } = useStickyHeader(allProps)

  // Create this ref in order to "auto" set even/odd class in tr elements
  const trTmpRef = React.useRef({ count: 0 })
  React.useLayoutEffect(() => {
    trTmpRef.current.count = 0
  })

  validateDOMAttributes(allProps, props)

  return (
    <Provider skeleton={Boolean(skeleton)}>
      <TableContext.Provider value={{ trTmpRef, responsive }}>
        <table
          className={classnames(
            'dnb-table',
            variant && `dnb-table__variant--${variant}`,
            responsive && 'dnb-table--responsive',
            responsive &&
              responsiveVariant &&
              `dnb-table__responsive-variant--${responsiveVariant}`,
            size && `dnb-table__size--${size}`,
            sticky && `dnb-table--sticky`,
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
Table.AccordionContent = AccordionContent
