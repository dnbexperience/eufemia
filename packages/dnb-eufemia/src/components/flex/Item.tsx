import type { CSSProperties, HTMLProps, Ref } from 'react'
import { useContext } from 'react'
import { clsx } from 'clsx'
import type { SpaceProps } from '../space/Space'
import Space from '../space/Space'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { FlexGap } from './types'
import FlexLayoutContext from './FlexLayoutContext'

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
  /**
   * With `layoutEngine="css"`, replace the [Flex.Container](/uilib/layout/flex/container) gap before this item on the main axis: left in horizontal layouts and top in vertical layouts. Use `false` for no gap. Ordinary spacing props remain additive. When adjacent items set both sides of the same gap, this value takes precedence over the previous item’s `gapAfter`.
   */
  gapBefore?: FlexGap
  /**
   * With `layoutEngine="css"`, replace the [Flex.Container](/uilib/layout/flex/container) gap after this item on the main axis: right in horizontal layouts and bottom in vertical layouts. Use `false` for no gap. Ordinary spacing props remain additive. A following item’s `gapBefore` takes precedence when both sides set the same gap.
   */
  gapAfter?: FlexGap
  ref?: Ref<HTMLElement>
}

export type FlexItemAllProps = FlexItemProps &
  SpaceProps &
  Omit<HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'span'>

function FlexItem(props: FlexItemAllProps) {
  const layout = useContext(FlexLayoutContext)
  const {
    element = 'div',
    className,
    grow,
    shrink,
    alignSelf,
    span,
    gapBefore,
    gapAfter,
    style,
    children,
    ...rest
  } = props

  const cn = clsx(
    'dnb-flex-item',
    grow && 'dnb-flex-item--grow',
    shrink && 'dnb-flex-item--shrink',
    alignSelf && `dnb-flex-item--align-self-${alignSelf}`,
    span && 'dnb-flex-item--responsive',
    typeof gapBefore !== 'undefined' && 'dnb-flex-item--gap-before',
    typeof gapAfter !== 'undefined' && 'dnb-flex-item--gap-after'
  )

  const itemStyles: CSSProperties = {}

  if (typeof gapBefore !== 'undefined') {
    itemStyles['--flex-gap-before'] = getGapValue(gapBefore)
  }
  if (typeof gapAfter !== 'undefined') {
    itemStyles['--flex-gap-after'] = getGapValue(gapAfter)
  }

  if (span) {
    if (isValidSpan(span as FlexSpans)) {
      itemStyles['--span--default'] = span
    } else {
      const spans = span as MediaSpans
      for (const key in spans) {
        if (isValidSpan(span[key])) {
          itemStyles[`--${key}`] = span[key]
        }
      }
    }
  }

  if (layout?.mediaKey && typeof span === 'object') {
    const mediaSpan = (span as Record<string, FlexSpans>)[layout.mediaKey]
    if (isValidSpan(mediaSpan)) {
      itemStyles['--span--media'] = mediaSpan
    }
  }

  if (span) {
    return (
      <Space element={element} className={cn} style={itemStyles}>
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
      style={{ ...itemStyles, ...style }}
      {...rest}
    >
      {children}
    </Space>
  )
}

function isValidSpan(span: FlexSpans) {
  return typeof span === 'number' || span === 'auto'
}

function getGapValue(gap: FlexGap) {
  return gap === false ? '0rem' : `var(--spacing-${gap})`
}

withComponentMarkers(FlexItem, {
  _supportsSpacingProps: true,
})

export default FlexItem
