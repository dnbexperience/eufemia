import React, { isValidElement, useCallback } from 'react'
import classnames from 'classnames'
import Space, { SpaceProps } from '../space/Space'
import { Hr } from '../../elements'
import useMedia from '../../shared/useMedia'
import { sumTypes } from '../space/SpacingUtils'
import {
  getSpaceValue,
  isHeadingElement,
  pickSpacingProps,
  renderWithSpacing,
} from './utils'

import type { MediaQueryBreakpoints } from '../../shared/MediaQueryUtils'
import type { SpaceType } from '../space/types'
import type { UseMediaQueries } from '../../shared/useMedia'
import type { End, Start } from './types'
import Item from './Item'

export type BasicProps = {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  rowGap?: 'small' | 'medium' | 'large' | boolean
  sizeCount?: number
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  /** For when used as a flex item in an outer container in addition to being a container: */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  /** When "line-framed" is used, a line will be shown between items and above the first and below the last item */
  divider?: 'space' | 'line' | 'line-framed'
  /** Spacing between items inside */
  spacing?:
    | false
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  breakpoints?: MediaQueryBreakpoints
  queries?: UseMediaQueries
}

export type Props = BasicProps &
  SpaceProps &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'ref' | 'wrap' | 'value' | 'label' | 'title' | 'placeholder'
  >

const propNames: Array<keyof Props> = [
  'direction',
  'wrap',
  'justify',
  'align',
  'divider',
  'spacing',
]

export function pickFlexContainerProps<T extends Props>(
  props: T,
  defaults: Partial<Props> = {},
  skip: Array<keyof Props> = []
): Omit<Props, 'children'> {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props ?? {}).filter(
        ([key]) =>
          propNames.includes(key as keyof Props) &&
          !skip.includes(key as keyof Props)
      )
    ),
  }
}

function FlexContainer(props: Props) {
  const {
    className,
    style,
    children,
    element = 'div',
    direction = 'horizontal',
    wrap = true,
    sizeCount = 12,
    rowGap,
    justify = 'flex-start',
    align = 'flex-start',
    alignSelf,
    divider = 'space',
    spacing = 'small',
    breakpoints,
    queries,
    ...rest
  } = props

  const childrenArray = wrapChildren(props, children)
  const hasHeading = childrenArray.some((child, i) => {
    const previousChild = childrenArray?.[i - 1]
    return (
      isHeadingElement(child) || (i > 0 && isHeadingElement(previousChild))
    )
  })
  const hasSizeProp =
    !hasHeading &&
    direction === 'horizontal' &&
    childrenArray.some(
      (child) =>
        isValidElement(child) &&
        child['type'] === Item &&
        child.props?.['size']
    )

  const { key: mediaKey } = useMedia({
    disabled: !hasSizeProp,
    breakpoints,
    queries,
  })

  let rowCount = 0
  const content = childrenArray.map((child, i) => {
    let endSpacing = null
    let startSpacing = null

    // Set spacing on child components by props (instead of CSS) to be able to dynamically override by props on each child. The default
    // is the spacing-props that controls space between children. Then override with props sent to the children, including both top
    // and bottom when th
    const isFirst = i === 0
    const isLast = i >= childrenArray.length - 1

    // Used for horizontal layout only
    let size = child?.['props']?.['size']
    if (
      // direction === 'horizontal' &&
      hasSizeProp &&
      isValidElement(child) &&
      child['type'] === Item &&
      size
    ) {
      size = parseFloat(size[mediaKey] ?? size['small'] ?? size) || 0
      // console.log('size', mediaKey, size)
      rowCount = rowCount + size
      // if (rowCount >= sizeCount) {
      //   rowCount = 0
      // }
      // console.log('rowCount', rowCount)
    }
    const isRowStart = rowCount === size
    console.log('isRowStart', mediaKey, i, rowCount, size, isRowStart)
    if (rowCount >= sizeCount) {
      rowCount = 0
    }
    const isRowEnd = rowCount === 0

    const previousChild = childrenArray?.[i - 1]
    const isHeading = hasHeading && isHeadingElement(previousChild)

    // Always set spacing between elements in the vertical layout on the top props, and 0 on bottom, to avoid
    // having to divide spacing between both with smaller values.
    const start: Start = direction === 'horizontal' ? 'left' : 'top'
    const end: End = direction === 'horizontal' ? 'right' : 'bottom'

    if (
      direction !== 'horizontal' &&
      // No line above heading
      !isHeading &&
      ((divider === 'line' && !isFirst) || divider === 'line-framed')
    ) {
      const spaceAboveLine = getSpaceValue(end, previousChild) ?? spacing
      startSpacing = (getSpaceValue(start, child) ?? spacing) as SpaceType

      return (
        <React.Fragment key={`element-${i}`}>
          <Hr
            top={!isFirst ? spaceAboveLine : 0}
            space={0}
            className="dnb-flex-container__hr"
          />

          {renderWithSpacing(child, {
            space: { [start]: startSpacing, [end]: endSpacing || 0 },
          })}

          {divider === 'line-framed' && isLast && (
            <Hr
              top={spaceAboveLine}
              space={0}
              className="dnb-flex-container__hr"
            />
          )}
        </React.Fragment>
      )
    }

    if (direction === 'horizontal') {
      if (hasSizeProp) {
        // When we have a size prop, we don't expect the layout to wrap,
        // so we add space to the start of each item to mimic CSS gap.
        startSpacing = isRowStart || isFirst ? 0 : sumTypes(spacing) / 2
        endSpacing = isRowEnd || isLast ? 0 : sumTypes(spacing) / 2
      } else {
        // Since we expect the layout to wrap, we add space only to the end of each item,
        // except for the last item. This will make the items align as long as not wrapped.
        // When wrapped, the items will align to the start of the container, but be a little off to the right.
        endSpacing = isLast
          ? 0
          : getSpaceValue(start, child) ??
            getSpaceValue(end, previousChild) ??
            spacing
      }
    } else {
      if (isFirst) {
        // No space above first element.
        startSpacing = 0
      } else {
        // Since top space of current and bottom space of previous component is the same
        startSpacing =
          getSpaceValue(start, child) ??
          getSpaceValue(end, previousChild) ??
          spacing
      }
    }

    if (
      React.isValidElement(previousChild) &&
      previousChild?.type?.['_supportsSpacingProps'] === false
    ) {
      startSpacing = 0
    }

    const givenSpacing = {
      ...child?.['props']?.space,
      ...pickSpacingProps(child?.['props']),
    }
    delete givenSpacing.space

    const space =
      childrenArray.length === 1
        ? givenSpacing
        : {
            [start]: startSpacing || 0,
            [end]: endSpacing || 0,
            ...givenSpacing,
          }

    return renderWithSpacing(child, {
      key: child?.['key'] || `element-${i}`,
      space,
    })
  })

  const n = 'dnb-flex-container'
  const getRowGapClass = useCallback(() => {
    if (rowGap === false) {
      return `${n}--row-gap-off`
    }

    if (
      rowGap === true ||
      (!rowGap && wrap && direction === 'horizontal')
    ) {
      return `${n}--row-gap-small`
    }

    if (hasSizeProp && spacing) {
      return `${n}--row-gap-${spacing}`
    }

    if (rowGap) {
      return `${n}--row-gap-${rowGap}`
    }
  }, [direction, hasSizeProp, rowGap, spacing, wrap])

  const cn = classnames(
    'dnb-flex-container',
    direction && `${n}--direction-${direction}`,
    justify && `${n}--justify-${justify}`,
    align && `${n}--align-${align}`,
    alignSelf && `${n}--align-self-${alignSelf}`,
    spacing && `${n}--spacing-${spacing}`,
    wrap && `${n}--wrap`,
    getRowGapClass(),
    hasSizeProp && `${n}--has-size`,
    divider && `${n}--divider-${divider}`,
    className
  )

  return (
    <Space
      element={element}
      className={cn}
      data-media-key={mediaKey}
      style={
        hasSizeProp
          ? ({ '--sizeCount': sizeCount, ...style } as React.CSSProperties)
          : style
      }
      {...rest}
    >
      {content}
    </Space>
  )
}

function wrapChildren(props: Props, children: React.ReactNode) {
  return React.Children.toArray(children).map((child) => {
    if (
      React.isValidElement(child) &&
      child.type['_supportsSpacingProps'] === 'children'
    ) {
      return React.cloneElement(
        child,
        child.props,
        <FlexContainer {...props}>{child.props.children}</FlexContainer>
      )
    }

    return child
  })
}

FlexContainer._supportsSpacingProps = true

export default FlexContainer
