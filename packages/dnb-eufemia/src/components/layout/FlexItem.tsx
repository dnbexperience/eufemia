import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import type { DynamicElement } from '../../shared/types'
import {
  ComponentProps,
  omitSpacingProps,
  pickSpacingProps,
} from '../../extensions/forms/types'

export type Sizes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'auto'
export type Size =
  | {
      xsmall?: Sizes
      small?: Sizes
      medium?: Sizes
      large?: Sizes
    }
  | Sizes

export type Props = ComponentProps & {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  size?: Size
  style?: React.CSSProperties
  children: React.ReactNode
}

function FlexItem(props: Props) {
  const {
    element = 'div',
    className,
    grow,
    shrink,
    alignSelf,
    size,
    style,
    children,
    ...rest
  } = props

  const cn = classnames(
    'dnb-layout-flex-item',
    grow && 'dnb-layout-flex-item--grow',
    shrink && 'dnb-layout-flex-item--shrink',
    alignSelf && `dnb-layout-flex-item--align-self-${alignSelf}`,
    size && 'dnb-layout-flex-item--responsive',
    className
  )

  const styleObj = { ...style } as React.CSSProperties
  if (size) {
    if (typeof size === 'number' || size === 'auto') {
      styleObj['--size--default'] = size
    } else {
      for (const key in size) {
        styleObj[`--${key}`] = size[key]
      }
    }

    return (
      <Space
        element={element}
        className={cn}
        style={styleObj}
        {...omitSpacingProps(rest)}
      >
        <Space
          className="dnb-layout-flex-item__spacer"
          {...pickSpacingProps(rest)}
        >
          {children}
        </Space>
      </Space>
    )
  }

  return (
    <Space element={element} className={cn} style={styleObj} {...rest}>
      {children}
    </Space>
  )
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
