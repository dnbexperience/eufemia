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

function compute(span: GridItemMedia | GridItemSpan, modifier: string) {
  if (!span) {
    return null
  }

  const result: Record<string, string | number> = {}

  const collect = (media: string, values: Array<number | 'end'>) => {
    values.forEach((value: number | string, i: number) => {
      const pos = i === 0 ? 's' : 'e'
      if (i === 1 && (value as number) > 0) {
        value = (value as number) + 1
      }
      if (value === 'end') {
        value = '-1'
      }
      result[makeStyle(media, pos)] = value
    })
  }

  if (Array.isArray(span)) {
    media.forEach((media) => {
      collect(media, span)
    })
  } else if (typeof span === 'object') {
    for (const media in span) {
      const values = (span as GridItemMedia)?.[media as keyof GridItemMedia]

      if (values === 'full') {
        result[makeStyle(media, 's')] = '1'
        result[makeStyle(media, 'e')] = '-1'
      } else if (Array.isArray(values)) {
        collect(media, values)
      }
    }
  }

  return result

  function makeStyle(media: string, pos: string) {
    return `--${media}-${modifier}-${pos}`
  }
}
