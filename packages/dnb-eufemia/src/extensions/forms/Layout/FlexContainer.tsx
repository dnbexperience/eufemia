import React from 'react'
import classnames from 'classnames'
import { Space } from '../../../components'
import { Div } from '../../../elements'
import * as EufemiaElements from '../../../elements'
import { SpaceType } from '../../../components/space/types'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../types'
import MainHeading from './MainHeading'
import SubHeading from './SubHeading'

export function isHeadingElement(element): boolean {
  return element.type === MainHeading || element.type === SubHeading
}

const getSpaceTop = (
  element: React.ReactChild | React.ReactFragment | React.ReactPortal
): SpaceType | undefined => {
  if (!React.isValidElement(element)) {
    return
  }
  return (
    element.props?.top ??
    (typeof element.props?.space === 'object'
      ? element.props.space.top
      : undefined)
  )
}

const getSpaceBottom = (
  element: React.ReactChild | React.ReactFragment | React.ReactPortal
): SpaceType | undefined => {
  if (!React.isValidElement(element)) {
    return
  }
  return (
    element.props?.bottom ??
    (typeof element.props?.space === 'object'
      ? element.props.space.bottom
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

const renderWithSpacing = (element: React.ReactNode, props) => {
  const takesSpaceProps = isSpacePropsComponent(element)

  return takesSpaceProps ? (
    React.cloneElement(element as React.ReactElement<unknown>, props)
  ) : (
    <Div {...props}>{element}</Div>
  )
}

export type Props = ComponentProps & {
  direction?: 'row' | 'column'
  wrap?: boolean
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
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
  width?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

function FlexContainer(props: Props) {
  const {
    className,
    children,
    direction = 'column',
    wrap = false,
    justify = 'flex-start',
    align = 'flex-start',
    divider = 'space',
    spacing = 'small',
    width,
  } = props

  const cn = classnames(
    'dnb-forms-flex-container',
    direction && `dnb-forms-flex-container--direction-${direction}`,
    justify && `dnb-forms-flex-container--justify-${justify}`,
    align && `dnb-forms-flex-container--align-${align}`,
    wrap && `dnb-forms-flex-container--wrap`,
    divider && `dnb-forms-flex-container--divider-${divider}`,
    spacing && `dnb-forms-flex-container--spacing-${spacing}`,
    width && `dnb-forms-flex-container--width-${width}`,
    className
  )
  const childrenArray = React.Children.toArray(children)

  return (
    <Div className={cn} {...forwardSpaceProps(props)}>
      {direction === 'column'
        ? childrenArray.map((child, i) => {
            // Set spacing on child components by props (instead of CSS) to be able to dynamically override by props on each child. The default
            // is the spacing-props that controls space between children. Then override with props sent to the children, including both top
            // and bottom when th
            const isFirst = i === 0
            const previousChild = childrenArray?.[i - 1]
            const currentIsHeading = isHeadingElement(child)
            const previousWasHeading =
              i > 0 && isHeadingElement(previousChild)

            // Always set spacing between elements in the column layout on the top props, and 0 on bottom, to avoid
            // having to divide spacing between both with smaller values.
            const bottom = 0

            if (
              divider === 'line' &&
              // No line above first element
              !isFirst &&
              // No line above/below headings
              !previousWasHeading &&
              !currentIsHeading
            ) {
              const spaceAboveLine =
                getSpaceBottom(previousChild) ?? spacing
              const top = getSpaceTop(child) ?? spacing

              return (
                <React.Fragment key={`element-${i}`}>
                  <Space top={spaceAboveLine} />
                  <hr className="dnb-forms-flex-container__hr" />
                  {renderWithSpacing(child, {
                    space: { top, bottom },
                    top,
                    bottom,
                  })}
                </React.Fragment>
              )
            }

            const top =
              // No space above first element.
              isFirst
                ? 0
                : // Since top space of current and bottom space of previous component is the same
                  getSpaceTop(child) ??
                  getSpaceBottom(previousChild) ??
                  spacing

            return renderWithSpacing(child, {
              key: `element-${i}`,
              space: { top, bottom },
              top,
              bottom,
            })
          })
        : // TODO: Consider doing the same with spacing between horizontal items (direction = row) as vertical
          children}
    </Div>
  )
}

FlexContainer._supportsEufemiaSpacingProps = true
export default FlexContainer
