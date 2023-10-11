import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import { omitSpacingProps, pickSpacingProps } from './utils'

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
type MediaSizes = {
  xsmall?: Sizes
  small?: Sizes
  medium?: Sizes
  large?: Sizes
}
export type Size = MediaSizes | Sizes

export type BasicProps = {
  element?: DynamicElement
  grow?: boolean
  shrink?: boolean
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  size?: Size
}

export type Props = BasicProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'size'>

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
    'dnb-flex-item',
    grow && 'dnb-flex-item--grow',
    shrink && 'dnb-flex-item--shrink',
    alignSelf && `dnb-flex-item--align-self-${alignSelf}`,
    size && 'dnb-flex-item--responsive',
    className
  )

  const spaceStyles = {} as React.CSSProperties

  if (size) {
    if (isValidSize(size as Sizes)) {
      spaceStyles['--size--default'] = size
    } else {
      const sizes = size as MediaSizes
      for (const key in sizes) {
        if (isValidSize(size[key])) {
          spaceStyles[`--${key}`] = size[key]
        }
      }
    }
  }

  if (Object.keys(spaceStyles).length) {
    return (
      <Space
        element={element}
        className={cn}
        style={{ ...spaceStyles, ...style }}
        {...omitSpacingProps(rest)}
      >
        <Space
          className="dnb-flex-item__spacer"
          {...pickSpacingProps(rest)}
        >
          {children}
        </Space>
      </Space>
    )
  }

  return (
    <Space element={element} className={cn} {...rest}>
      {children}
    </Space>
  )

  function isValidSize(size: Sizes) {
    return typeof size === 'number' || size === 'auto'
  }
}

FlexItem._supportsEufemiaSpacingProps = true
export default FlexItem
