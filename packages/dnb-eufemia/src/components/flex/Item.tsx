import React from 'react'
import clsx from 'clsx'
import Space, { SpaceProps } from '../space/Space'

export type Spans =
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
  xsmall?: Spans
  small?: Spans
  medium?: Spans
  large?: Spans
}
export type Span = MediaSpans | Spans

export type BasicProps = {
  grow?: boolean
  shrink?: boolean
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  span?: Span
  ref?: React.Ref<HTMLElement>
}

export type Props = BasicProps &
  SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'span'>

function FlexItem(props: Props) {
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

  const isValidSpan = React.useCallback((span: Spans) => {
    return typeof span === 'number' || span === 'auto'
  }, [])

  const spaceStyles = {} as React.CSSProperties

  if (span) {
    if (isValidSpan(span as Spans)) {
      spaceStyles['--span--default'] = span
    } else {
      const spans = span as MediaSpans
      for (const key in spans) {
        if (isValidSpan(span[key])) {
          spaceStyles[`--${key}`] = span[key]
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

FlexItem._supportsSpacingProps = true

export default FlexItem
