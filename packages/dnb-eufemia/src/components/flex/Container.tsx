import React, { Fragment, useCallback } from 'react'
import classnames from 'classnames'
import Space, { SpaceProps } from '../space/Space'
import { Hr } from '../../elements'
import useMedia from '../../shared/useMedia'
import {
  getSpaceValue,
  isHeadingElement,
  renderWithSpacing,
} from './utils'

import type { MediaQueryBreakpoints } from '../../shared/MediaQueryUtils'
import type { SpaceType } from '../space/types'
import type { UseMediaQueries } from '../../shared/useMedia'
import type { End, Start } from './types'

type Gap =
  | false
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type BasicProps = {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  /** value `true` is deprecated, use `undefined` instead */
  rowGap?: Gap | true
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
  gap?: Gap
  /** @deprecated Use `gap` instead */
  spacing?: Gap
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
  'gap',
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
function handleDeprecatedProps({
  spacing,
  gap,
  rowGap,
  ...rest
}: Props): Omit<Props, 'spacing'> & { rowGap?: Gap } {
  return {
    ...rest,
    rowGap: rowGap === true ? undefined : rowGap,
    gap: spacing ?? gap,
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
    gap = 'small',
    breakpoints,
    queries,
    ...rest
  } = handleDeprecatedProps(props)

  const spacing =
    (direction === 'vertical' && rowGap !== undefined
      ? false
      : undefined) ?? gap
  const childrenArray = replaceRootFragment(wrapChildren(props, children))
  const hasHeading = childrenArray.some((child, i) => {
    const previousChild = childrenArray?.[i - 1]
    return (
      isHeadingElement(child) || (i > 0 && isHeadingElement(previousChild))
    )
  })
  const hasSizeProp =
    !hasHeading &&
    direction === 'horizontal' &&
    childrenArray.some((child) => child['props']?.size)

  const { key: mediaKey } = useMedia({
    disabled: !hasSizeProp,
    breakpoints,
    queries,
  })

  const content = childrenArray.map((child, i) => {
    // Set spacing on child components by props (instead of CSS) to be able to dynamically override by props on each child. The default
    // is the spacing-props that controls space between children. Then override with props sent to the children, including both top
    // and bottom when th
    const isFirst = i === 0
    const isLast = i >= childrenArray.length - 1
    const previousChild = childrenArray?.[i - 1]
    const isHeading = hasHeading && isHeadingElement(previousChild)

    // Always set spacing between elements in the vertical layout on the top props, and 0 on bottom, to avoid
    // having to divide spacing between both with smaller values.
    const start: Start = direction === 'horizontal' ? 'left' : 'top'
    const end: End = direction === 'horizontal' ? 'right' : 'bottom'
    // const start: Start | End = direction === 'horizontal' ? 'right' : 'top'
    // const end: Start | End = direction === 'horizontal' ? 'left' : 'bottom'
    const endSpacing = 0
    let startSpacing = null

    if (
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
            space: { [start]: startSpacing, [end]: endSpacing },
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

    // No space above first element.
    if (isFirst && direction !== 'horizontal') {
      startSpacing = 0
    } else {
      // Since top space of current and bottom space of previous component is the same
      startSpacing =
        getSpaceValue(start, child) ??
        getSpaceValue(end, previousChild) ??
        spacing
    }

    if (
      React.isValidElement(previousChild) &&
      previousChild?.type?.['_supportsSpacingProps'] === false
    ) {
      startSpacing = 0
    }

    const space =
      direction === 'horizontal'
        ? { [start]: endSpacing, [end]: startSpacing }
        : { [start]: startSpacing, [end]: endSpacing }

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

    if (typeof rowGap === 'string') {
      return `${n}--row-gap-${rowGap}`
    }

    if (spacing && direction === 'horizontal') {
      return `${n}--row-gap-${spacing}`
    }
  }, [direction, rowGap, spacing])

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

function replaceRootFragment(children) {
  const firstChild = children[0]
  if (
    React.Children.count(children) === 1 &&
    firstChild?.type === Fragment
  ) {
    return React.Children.toArray(firstChild?.props?.children)
  }
  return children
}

FlexContainer._supportsSpacingProps = true

export default FlexContainer
