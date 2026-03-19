import React from 'react'
import clsx from 'clsx'
import type { SpaceAllProps } from '../space/Space'
import Space from '../space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type GridContainerColumns = number

export type GridContainerMedia = {
  small?: GridContainerColumns | false
  medium?: GridContainerColumns | false
  large?: GridContainerColumns | false
}

export type GridContainerProps = {
  columns?: GridContainerMedia | GridContainerColumns
  rowGap?: 'x-small' | 'small' | 'medium' | 'large' | boolean
  columnGap?: 'x-small' | 'small' | 'medium' | 'large' | boolean
}

export type GridContainerAllProps = GridContainerProps & SpaceAllProps

function GridContainer(props: GridContainerAllProps) {
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

  const styleObj: Record<string, string> = {
    ...compute(columns),
    ...(style as Record<string, string>),
  }

  const n = 'dnb-grid-container'

  const unsetClasses: string[] = []
  for (const prop in styleObj) {
    if (styleObj[prop] === 'unset') {
      const disableClass = `${n}__disabled--${prop.replace(
        /--([a-z]+)-.*/,
        '$1'
      )}`
      unsetClasses.push(disableClass)
    }
  }

  const cn = clsx(
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

withComponentMarkers(GridContainer, {
  _supportsSpacingProps: true,
})

export default GridContainer

function compute(columns: Record<string, unknown> | number | undefined) {
  if (!columns) {
    return null
  }

  const result: Record<string, string> = {}

  if (typeof columns === 'number') {
    columns = {
      small: columns,
      medium: columns,
      large: columns,
    }
  }

  for (const media in columns) {
    const value = (columns as Record<string, unknown>)?.[media]
    result[`--${media}-columns`] = (value as string) || 'unset'
  }

  return result
}
