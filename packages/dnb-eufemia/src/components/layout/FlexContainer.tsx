import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import * as EufemiaElements from '../../elements'
import MainHeading from './MainHeading'
import SubHeading from './SubHeading'
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
  props: SpacingProps & { key?: string }
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
  columns?: number
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
  width?: false | 'small' | 'medium' | 'large'
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
  'width',
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
    direction = 'vertical',
    wrap = true,
    columns = 12,
    justify = 'flex-start',
    align = 'flex-start',
    alignSelf,
    divider = 'space',
    spacing = 'small',
    breakpoints,
    queries,
    width,
    ...rest
  } = props

  const cn = classnames(
    'dnb-layout__flex-container',
    direction && `dnb-layout__flex-container--direction-${direction}`,
    justify && `dnb-layout__flex-container--justify-${justify}`,
    align && `dnb-layout__flex-container--align-${align}`,
    alignSelf && `dnb-layout__flex-container--align-self-${alignSelf}`,
    spacing && `dnb-layout__flex-container--spacing-${spacing}`,
    wrap && `dnb-layout__flex-container--wrap`,
    divider && `dnb-layout__flex-container--divider-${divider}`,
    width && `dnb-layout__flex-container--width-${width}`,
    className
  )
  const childrenArray = React.Children.toArray(children)
  const hasSizeProp =
    direction === 'horizontal' &&
    childrenArray.some((child) => child['props']?.size)

  const { key: mediaKey } = useMedia({
    disabled: !hasSizeProp,
    breakpoints,
    queries,
  })

  let sizeSum = 0
  const content = childrenArray.map((child, i) => {
    // Set spacing on child components by props (instead of CSS) to be able to dynamically override by props on each child. The default
    // is the spacing-props that controls space between children. Then override with props sent to the children, including both top
    // and bottom when th
    let isFirst = i === 0
    const previousChild = childrenArray?.[i - 1]
    const currentIsHeading = isHeadingElement(child)
    const previousWasHeading = i > 0 && isHeadingElement(previousChild)

    // Always set spacing between elements in the vertical layout on the top props, and 0 on bottom, to avoid
    // having to divide spacing between both with smaller values.
    const start: Start = direction === 'horizontal' ? 'left' : 'top'
    const end: End = direction === 'horizontal' ? 'right' : 'bottom'
    const endSpacing = 0
    let startSpacing = null

    if (
      divider === 'line' &&
      // No line above first element
      !isFirst &&
      // No line above/below headings
      !previousWasHeading &&
      !currentIsHeading
    ) {
      const spaceAboveLine = (getSpaceValue(end, previousChild) ??
        spacing) as SpaceType
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
    } else if (hasSizeProp) {
      const p = child['props']?.size
      const mediaSize =
        typeof p === 'number'
          ? p
          : // The fallbacks should be in line with the "--size:" fallbacks in the CSS
            p?.[mediaKey] || p?.large || p?.medium || p?.small

      if (sizeSum >= columns) {
        sizeSum = 0
        isFirst = true
      } else {
        if (mediaSize >= columns) {
          isFirst = true
        }
        sizeSum += mediaSize
      }
    }

    startSpacing =
      // No space above first element.
      isFirst
        ? 0
        : // Since top space of current and bottom space of previous component is the same
          getSpaceValue(start, child) ??
          getSpaceValue(end, previousChild) ??
          spacing

    return renderWithSpacing(child, {
      key: `element-${i}`,
      space: { [start]: startSpacing, [end]: endSpacing },
    })
  })

  return (
    <Space
      element={element}
      className={cn}
      data-media-key={mediaKey}
      style={{ '--columns': columns, ...style } as React.CSSProperties}
      {...rest}
    >
      {content}
    </Space>
  )
}

FlexContainer._supportsEufemiaSpacingProps = true
export default FlexContainer
