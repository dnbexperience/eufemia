import React from 'react'
import classnames from 'classnames'
import Space, { SpaceAllProps } from '../space/Space'

export type Columns = number

export type Media = {
  small?: Columns | false
  medium?: Columns | false
  large?: Columns | false
}

export type BasicProps = {
  columns?: Media | Columns
  rowGap?: 'small' | 'medium' | 'large' | true
  columnGap?: 'small' | 'medium' | 'large' | true
}

export type AllProps = BasicProps & SpaceAllProps

function GridContainer(props: AllProps) {
  const {
    columns,
    rowGap,
    columnGap,
    style,
    className,
    children,
    element = 'div',
    ...rest
  } = props

  const styleObj = {
    ...compute(columns),
    ...style,
  }

  const n = 'dnb-layout-grid-container'

  const unsetClasses = []
  for (const prop in styleObj) {
    if (styleObj[prop] === 'unset') {
      const disableClass = `${n}__disabled--${prop.replace(
        /--([a-z]+)-.*/,
        '$1'
      )}`
      unsetClasses.push(disableClass)
    }
  }

  const cn = classnames(
    n,
    className,
    columnGap &&
      `${n}--column-gap-${columnGap === true ? 'small' : columnGap}`,
    rowGap && `${n}--row-gap-${rowGap === true ? 'small' : rowGap}`,
    unsetClasses
  )

  return (
    <Space element={element} className={cn} style={styleObj} {...rest}>
      {children}
    </Space>
  )
}

GridContainer._supportsEufemiaSpacingProps = true

export default GridContainer

function compute(columns) {
  if (!columns) {
    return null
  }

  const result = {}

  if (typeof columns === 'number') {
    columns = {
      small: columns,
      medium: columns,
      large: columns,
    }
  }

  for (const media in columns) {
    const value = columns?.[media]
    result[`--${media}-columns`] = value || 'unset'
  }

  return result
}
