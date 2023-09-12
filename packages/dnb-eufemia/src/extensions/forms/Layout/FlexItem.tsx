import React from 'react'
import classnames from 'classnames'
import { Div } from '../../../elements'
import { ComponentProps, pickSpacingProps } from '../types'

export type Props = ComponentProps & {
  grow?: boolean
  shrink?: boolean
  width?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

function FlexItem(props: Props) {
  const { className, grow, shrink, width, children } = props
  const cn = classnames(
    'dnb-forms-flex-item',
    grow && 'dnb-forms-flex-item--grow',
    shrink && 'dnb-forms-flex-item--shrink',
    width && `dnb-forms-flex-item--width-${width}`,
    className
  )

  return (
    <Div className={cn} {...pickSpacingProps(props)}>
      {children}
    </Div>
  )
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
