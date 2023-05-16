import React from 'react'
import classnames from 'classnames'
import { Div } from '../../../elements'
import type { ComponentProps } from '../component-types'
import { forwardSpaceProps } from '../utils'

export type Props = ComponentProps & {
  grow?: boolean
  shrink?: boolean
  children: React.ReactNode
}

export default function FlexItem(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    grow,
    shrink,
    children,
  } = props
  const cn = classnames(
    'dnb-forms-flex-item',
    grow && 'dnb-forms-flex-item--grow',
    shrink && 'dnb-forms-flex-item--shrink',
    className
  )

  return (
    <Div
      className={cn}
      data-testid={dataTestId}
      {...forwardSpaceProps(props)}
    >
      {children}
    </Div>
  )
}
