import { useCallback } from 'react'
import type { CSSProperties, HTMLProps, Ref } from 'react'
import { clsx } from 'clsx'
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
  ref?: Ref<HTMLElement>
}

export type FlexItemAllProps = FlexItemProps &
  SpaceProps &
  Omit<HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'span'>

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

  const isValidSpan = useCallback(
    (value: FlexSpan | undefined): value is FlexSpans => {
      return typeof value === 'number' || value === 'auto'
    },
    []
  )

  const spaceStyles: CSSProperties & Record<`--${string}`, FlexSpans> = {}

  if (span) {
    if (isValidSpan(span)) {
      spaceStyles['--span--default'] = span
    } else {
      const spans = span
      for (const key in spans) {
        const value = spans[key as keyof MediaSpans]
        if (isValidSpan(value)) {
          spaceStyles[`--${key}`] = value
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
