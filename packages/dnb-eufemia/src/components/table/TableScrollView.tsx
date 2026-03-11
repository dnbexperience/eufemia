import React from 'react'
import clsx from 'clsx'
import ScrollView, {
  ScrollViewAllProps,
} from '../../fragments/scroll-view/ScrollView'

import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
      className={clsx('dnb-table__scroll-view', className)}
      interactive="auto"
      {...rest}
    >
      {children}
    </ScrollView>
  )
}

withComponentMarkers(TableScrollView, { _supportsSpacingProps: true })
