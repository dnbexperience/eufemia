import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import type { DynamicElement } from '../../shared/types'
import {
  ComponentProps,
  omitSpacingProps,
  pickSpacingProps,
} from '../../extensions/forms/types'

export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Sizes =
  | {
      xsmall?: Columns
      small?: Columns
      medium?: Columns
      large?: Columns
    }
  | number

export type Props = ComponentProps & {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  width?: 'small' | 'medium' | 'large'
  size?: Sizes
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
    width,
    size,
    style,
    children,
    ...rest
  } = props

  const cn = classnames(
    'dnb-layout__flex-item',
    grow && 'dnb-layout__flex-item--grow',
    shrink && 'dnb-layout__flex-item--shrink',
    alignSelf && `dnb-layout__flex-item--align-self-${alignSelf}`,
    width && `dnb-layout__flex-item--width-${width}`,
    size && 'dnb-layout__flex-item--responsive',
    className
  )

  const styleObj = { ...style } as React.CSSProperties
  if (size) {
    if (typeof size === 'number') {
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
          className="dnb-layout__flex-item__spacer"
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
