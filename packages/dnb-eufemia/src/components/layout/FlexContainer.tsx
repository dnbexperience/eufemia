import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import * as EufemiaElements from '../../elements'
import MainHeading from '../../extensions/forms/Form/MainHeading'
import SubHeading from '../../extensions/forms/Form/SubHeading'
import type { DynamicElement } from '../../shared/types'
import type { SpaceType, SpacingProps } from '../space/types'
import type { ComponentProps } from '../../extensions/forms/types'
import { Hr } from '../../elements'
import useMedia from '../../shared/useMedia'
import type { UseMediaQueries } from '../../shared/useMedia'
import type { MediaQueryBreakpoints } from '../../shared/MediaQueryUtils'

export function isHeadingElement(element): boolean {
  return element.type === MainHeading || element.type === SubHeading
}

type End = 'right' | 'bottom'
type Start = 'left' | 'top'

const getSpaceValue = (
  type: Start | End,
  element: React.ReactChild | React.ReactFragment | React.ReactPortal
): SpaceType | undefined => {
  if (!React.isValidElement(element)) {
    return
  }

  return (
    element.props?.[type] ??
    (typeof element.props?.space === 'object'
      ? element.props.space[type]
      : undefined)
  )
}

export const isEufemiaElement = (element): boolean => {
  return Object.values(EufemiaElements).some(
    (eufemiaElement) => element?.type === eufemiaElement
  )
}

/**
 * Is the requested element a component that can receive Eufemia space props (space, top, bottom, left and right)?
 */
export const isSpacePropsComponent = (
  element: React.ReactNode
): boolean => {
  return (
    (React.isValidElement(element) &&
      element?.type?.['_supportsEufemiaSpacingProps'] === true) ||
    isEufemiaElement(element)
  )
}

const renderWithSpacing = (
  element: React.ReactNode,
  props: SpacingProps & { key?: string; className?: string }
) => {
  const takesSpaceProps = isSpacePropsComponent(element)

  return takesSpaceProps ? (
    React.cloneElement(element as React.ReactElement<unknown>, props)
  ) : (
    <Space {...props}>{element}</Space>
  )
}

export type Props = ComponentProps & {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  rowGap?: 'small' | 'medium' | 'large' | true
  sizeCount?: number
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  // For when used as a flex item in an outer container in addition to being a container:
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  divider?: 'space' | 'line'
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
  element?: DynamicElement
  style?: React.CSSProperties
  breakpoints?: MediaQueryBreakpoints
  queries?: UseMediaQueries
  children: React.ReactNode
}

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

  const childrenArray = React.Children.toArray(children)
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
    const previousChild = childrenArray?.[i - 1]

    // Always set spacing between elements in the vertical layout on the top props, and 0 on bottom, to avoid
    // having to divide spacing between both with smaller values.
    const start: Start = direction === 'horizontal' ? 'left' : 'top'
    const end: End = direction === 'horizontal' ? 'right' : 'bottom'
    // const start: Start | End = direction === 'horizontal' ? 'right' : 'top'
    // const end: Start | End = direction === 'horizontal' ? 'left' : 'bottom'
    const endSpacing = 0
    let startSpacing = null

    if (
      divider === 'line' &&
      // No line above first element
      !isFirst &&
      // No line above/below headings
      !hasHeading
    ) {
      const spaceAboveLine = getSpaceValue(end, previousChild) ?? spacing
      startSpacing = (getSpaceValue(start, child) ?? spacing) as SpaceType

      return (
        <React.Fragment key={`element-${i}`}>
          <Space top={spaceAboveLine} />
          <Hr space={0} />
          {renderWithSpacing(child, {
            space: { [start]: startSpacing, [end]: endSpacing },
          })}
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

    const space =
      direction === 'horizontal'
        ? { [start]: endSpacing, [end]: startSpacing }
        : { [start]: startSpacing, [end]: endSpacing }

    return renderWithSpacing(child, {
      key: `element-${i}`,
      space,
    })
  })

  const n = 'dnb-layout-flex-container'
  const cn = classnames(
    'dnb-layout-flex-container',
    direction && `${n}--direction-${direction}`,
    justify && `${n}--justify-${justify}`,
    align && `${n}--align-${align}`,
    alignSelf && `${n}--align-self-${alignSelf}`,
    spacing && `${n}--spacing-${spacing}`,
    wrap && `${n}--wrap`,
    rowGap && `${n}--row-gap-${rowGap === true ? 'small' : rowGap}`,
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

FlexContainer._supportsEufemiaSpacingProps = true
export default FlexContainer
