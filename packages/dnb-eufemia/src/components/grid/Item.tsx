import React from 'react'
import classnames from 'classnames'
import Space, { SpaceAllProps } from '../space/Space'

export type Columns = number

export type Span = [Columns, Columns | 'end'] | 'full'

export type Media = {
  small?: Span
  medium?: Span
  large?: Span
}

export type BasicProps = {
  span?: Media | Span
}

export type AllProps = BasicProps & Omit<SpaceAllProps, 'span'>

const media = ['small', 'medium', 'large']

function GridItem(props: AllProps) {
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

  const cn = classnames('dnb-grid-item', className)

  return (
    <Space element={element} className={cn} style={styleObj} {...rest}>
      {children}
    </Space>
  )
}

GridItem._supportsSpacingProps = true

export default GridItem

function compute(span, modifier) {
  if (!span) {
    return null
  }

  const result = {}

  const collect = (media, values) => {
    values.forEach((value, i) => {
      const pos = i === 0 ? 's' : 'e'
      if (i === 1 && value > 0) {
        value += 1
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
  } else {
    for (const media in span) {
      const values = span?.[media]

      if (values === 'full') {
        result[makeStyle(media, 's')] = '1'
        result[makeStyle(media, 'e')] = '-1'
      } else if (Array.isArray(values)) {
        collect(media, values)
      }
    }
  }

  return result

  function makeStyle(media, pos) {
    return `--${media}-${modifier}-${pos}`
  }
}
