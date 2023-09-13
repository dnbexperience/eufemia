import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import type { DynamicElement } from '../../shared/types'
import type { ComponentProps } from '../../extensions/forms/types'

export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Props = ComponentProps & {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  width?: 'small' | 'medium' | 'large'
  small?: Columns
  medium?: Columns
  large?: Columns
  children: React.ReactNode
}

function FlexItem(props: Props) {
  const {
    element = 'div',
    className,
    grow,
    shrink,
    width,
    small,
    medium,
    large,
    children,
    ...rest
  } = props
  const cn = classnames(
    'dnb-layout__flex-item',
    grow && 'dnb-layout__flex-item--grow',
    shrink && 'dnb-layout__flex-item--shrink',
    width && `dnb-layout__flex-item--width-${width}`,
    small && `dnb-layout__flex-item--small-${small}`,
    medium && `dnb-layout__flex-item--medium-${medium}`,
    large && `dnb-layout__flex-item--large-${large}`,
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
