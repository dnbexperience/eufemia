import React from 'react'
import classnames from 'classnames'
import { Div } from '../../elements'
import { forwardSpaceProps } from '../../extensions/forms/utils'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  grow?: boolean
  shrink?: boolean
  width?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

function FlexItem(props: Props) {
  const { className, grow, shrink, width, children } = props
  const cn = classnames(
    'dnb-layout-flex-item',
    grow && 'dnb-layout-flex-item--grow',
    shrink && 'dnb-layout-flex-item--shrink',
    width && `dnb-layout-flex-item--width-${width}`,
    className
  )

  return (
    <Div className={cn} {...forwardSpaceProps(props)}>
      {children}
    </Div>
  )
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
