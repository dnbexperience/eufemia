import { clsx } from 'clsx'
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

function compute(
  span: GridItemProps['span'],
  modifier: string
): Record<string, number | string> | null {
  if (!span) {
    return null
  }

  const result: Record<string, number | string> = {}

  const collect = (mediaKey: string, values: GridItemSpan) => {
    if (!Array.isArray(values)) {
      return
    }
    values.forEach((value, i) => {
      const pos = i === 0 ? 's' : 'e'
      let out: number | string = value
      if (i === 1 && typeof value === 'number' && value > 0) {
        out = value + 1
      }
      if (value === 'end') {
        out = '-1'
      }
      result[makeStyle(mediaKey, pos)] = out
    })
  }

  if (Array.isArray(span)) {
    media.forEach((mediaKey) => {
      collect(mediaKey, span)
    })
  } else {
    for (const mediaKey in span as GridItemMedia) {
      const values = (span as GridItemMedia)[
        mediaKey as keyof GridItemMedia
      ]

      if (values === 'full') {
        result[makeStyle(mediaKey, 's')] = '1'
        result[makeStyle(mediaKey, 'e')] = '-1'
      } else if (Array.isArray(values)) {
        collect(mediaKey, values)
      }
    }
  }

  return result

  function makeStyle(mediaKey: string, pos: string) {
    return `--${mediaKey}-${modifier}-${pos}`
  }
}
