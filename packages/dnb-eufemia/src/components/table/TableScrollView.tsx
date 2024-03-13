import React from 'react'
import classnames from 'classnames'
import ScrollView, {
  ScrollViewAllProps,
} from '../../fragments/scroll-view/ScrollView'

import type { SpacingProps } from '../../shared/types'

export type TableScrollViewProps = {
  /**
   * The content of the component.
   */
  children: React.ReactElement<HTMLTableElement>
}

export type TableScrollViewAllProps = TableScrollViewProps &
  Omit<React.TableHTMLAttributes<HTMLDivElement>, 'children'> &
  SpacingProps &
  ScrollViewAllProps

export default function TableScrollView(props: TableScrollViewAllProps) {
  const { className, children, ...rest } = props

  return (
    <ScrollView
      className={classnames('dnb-table__scroll-view', className)}
      interactive="auto"
      {...rest}
    >
      {children}
    </ScrollView>
  )
}

TableScrollView._supportsSpacingProps = true
