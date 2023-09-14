import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../extensions/forms/component-types'
import Space from '../space/Space'
import { DynamicElement } from '../../shared/types'

export type FlexItemProps = ComponentProps & {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  width?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

function FlexItem({
  element = 'div',
  className,
  grow,
  shrink,
  width,
  children,
  ...rest
}: FlexItemProps) {
  const cn = classnames(
    'dnb-layout__flex-item',
    grow && 'dnb-layout__flex-item--grow',
    shrink && 'dnb-layout__flex-item--shrink',
    width && `dnb-layout__flex-item--width-${width}`,
    className
  )

  return (
    <Space element={element} className={cn} {...rest}>
      {children}
    </Space>
  )
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
