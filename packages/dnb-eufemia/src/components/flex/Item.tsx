import React from 'react'
import clsx from 'clsx'
import type { SpaceProps } from '../space/Space'
import Space from '../space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type FlexSpans =
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
type MediaSpans = {
  xsmall?: FlexSpans
  small?: FlexSpans
  medium?: FlexSpans
  large?: FlexSpans
}
export type FlexSpan = MediaSpans | FlexSpans

export type FlexItemProps = {
  grow?: boolean
  shrink?: boolean
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  span?: FlexSpan
  ref?: React.Ref<HTMLElement>
}

export type FlexItemAllProps = FlexItemProps &
  SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'span'>

function FlexItem(props: FlexItemAllProps) {
  const {
    element = 'div',
    className,
    grow,
    shrink,
    alignSelf,
    span,
    style,
    children,
    ...rest
  } = props

  const cn = clsx(
    'dnb-flex-item',
    grow && 'dnb-flex-item--grow',
    shrink && 'dnb-flex-item--shrink',
    alignSelf && `dnb-flex-item--align-self-${alignSelf}`,
    span && 'dnb-flex-item--responsive'
  )

  const isValidSpan = React.useCallback((span: FlexSpans) => {
    return typeof span === 'number' || span === 'auto'
  }, [])

  const spaceStyles = {} as Record<string, string | number>

  if (span) {
    if (isValidSpan(span as FlexSpans)) {
      spaceStyles['--span--default'] = span as FlexSpans
    } else {
      const spans = span as MediaSpans
      for (const key in spans) {
        if (isValidSpan(spans[key as keyof MediaSpans])) {
          spaceStyles[`--${key}`] = spans[key as keyof MediaSpans]
        }
      }
    }
  }

  if (Object.keys(spaceStyles).length) {
    return (
      <Space element={element} className={cn} style={spaceStyles}>
        <Space
          className={clsx('dnb-flex-item__spacer', className)}
          style={style}
          {...rest}
        >
          {children}
        </Space>
      </Space>
    )
  }

  return (
    <Space
      element={element}
      className={clsx(cn, className)}
      style={style}
      {...rest}
    >
      {children}
    </Space>
  )
}

withComponentMarkers(FlexItem, {
  _supportsSpacingProps: true,
})

export default FlexItem
