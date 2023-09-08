import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../../extensions/forms/utils'
import { Space } from '../lib'
import type { DynamicElement } from '../../shared/types'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  width?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

function FlexItem(props: Props) {
  const {
    element = 'div',
    className,
    grow,
    shrink,
    width,
    children,
  } = props
  const cn = classnames(
    'dnb-layout__flex-item',
    grow && 'dnb-layout__flex-item--grow',
    shrink && 'dnb-layout__flex-item--shrink',
    width && `dnb-layout__flex-item--width-${width}`,
    className
  )

  return (
    <Space element={element} className={cn} {...forwardSpaceProps(props)}>
      {children}
    </Space>
  )
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
