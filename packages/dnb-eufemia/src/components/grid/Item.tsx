import React from 'react'
import clsx from 'clsx'
import type { SpaceAllProps } from '../space/Space'
import Space from '../space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type GridItemColumns = number

export type GridItemSpan =
  | [GridItemColumns, GridItemColumns | 'end']
  | 'full'

export type GridItemMedia = {
  small?: GridItemSpan
  medium?: GridItemSpan
  large?: GridItemSpan
}

export type GridItemProps = {
  span?: GridItemMedia | GridItemSpan
}

export type GridItemAllProps = GridItemProps & Omit<SpaceAllProps, 'span'>

const media = ['small', 'medium', 'large']

function GridItem(props: GridItemAllProps) {
  const {
    element = 'div',
    span,
    className,
    style,
    children,
    ...rest
  } = props

  const styleObj = {
    ...compute(span, 'c'),
    ...style,
  }

  const cn = clsx('dnb-grid-item', className)

  return (
    <Space element={element} className={cn} style={styleObj} {...rest}>
      {children}
    </Space>
  )
}

withComponentMarkers(GridItem, {
  _supportsSpacingProps: true,
})

export default GridItem

function compute(span: GridItemMedia | GridItemSpan | undefined, modifier: string) {
  if (!span) {
    return null
  }

  const result = {}

  const collect = (media: string, values: [number, number] | [number, 'end']) => {
    values.forEach((value, i) => {
      const pos = i === 0 ? 's' : 'e'
      let numValue: number | string = value
      if (i === 1 && typeof value === 'number' && value > 0) {
        numValue = value + 1
      }
      if (value === 'end') {
        numValue = '-1'
      }
      result[makeStyle(media, pos)] = numValue
    })
  }

  if (Array.isArray(span)) {
    media.forEach((media) => {
      collect(media, span as [number, number] | [number, 'end'])
    })
  } else if (typeof span === 'object') {
    for (const media in span) {
      const values = (span as GridItemMedia)?.[media as keyof GridItemMedia]

      if (values === 'full') {
        result[makeStyle(media, 's')] = '1'
        result[makeStyle(media, 'e')] = '-1'
      } else if (Array.isArray(values)) {
        collect(media, values as [number, number] | [number, 'end'])
      }
    }
  }

  return result

  function makeStyle(media: string, pos: 's' | 'e') {
    return `--${media}-${modifier}-${pos}`
  }
}
