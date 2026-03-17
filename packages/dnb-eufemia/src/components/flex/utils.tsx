import React, { Fragment } from 'react'
import type { SpaceType, SpacingProps } from '../../shared/types'
import Space from '../space/Space'
import { isValidSpaceProp, removeSpaceProps } from '../space/SpacingUtils'
import type { FlexEnd, FlexStart } from './types'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'

export const omitSpacingProps = removeSpaceProps

/**
 * Picks the spacing props from the given props object.
 * @template Props - The type of the props object.
 * @param {Props} props - The props object.
 * @returns {SpacingProps} - The spacing props object.
 */
export function pickSpacingProps<Props extends SpacingProps>(
  props: Props
): SpacingProps {
  const obj: SpacingProps = {}
  for (const key in props as SpacingProps) {
    if (isValidSpaceProp(key) && typeof props[key] !== 'undefined') {
      obj[key] = props[key]
    }
  }
  return obj
}

/**
 * Retrieves the space value of a Flex component based on the specified type and element.
 * @param type - The type of space value to retrieve (Start or End).
 * @param element - The React element to extract the space value from.
 * @returns The space value of the element, or undefined if it cannot be determined.
 */
export function getSpaceValue(
  type: FlexStart | FlexEnd,
  element: React.ReactNode
): SpaceType | undefined {
  if (!React.isValidElement<Record<string, any>>(element)) {
    return
  }

  const elementProps = (element as React.ReactElement<any>).props || {}

  return (
    elementProps?.[type] ??
    (typeof elementProps?.space === 'object'
      ? elementProps.space[type]
      : undefined)
  )
}

/**
 * Checks if the provided element is a heading element.
 * @param element - The element to check.
 * @returns `true` if the element is a heading element, `false` otherwise.
 */
export function isHeadingElement(element: React.ReactNode): boolean {
  return (
    React.isValidElement(element) &&
    (element?.type as ComponentMarkers)?._isHeadingElement === true
  )
}

/**
 * Determines the spacing variant of a React node element.
 * @param element - The React node element to check.
 * @returns The spacing variant (true, false or "children") of the element, or undefined if it does not support spacing props.
 */
export function getSpaceVariant(element: React.ReactNode) {
  if (React.isValidElement<Record<string, any>>(element)) {
    if (element?.type === Fragment) {
      return 'children'
    }

    const check = (element?.type as ComponentMarkers)
      ?._supportsSpacingProps
    if (typeof check !== 'undefined') {
      return check
    }

    const keys = ['space', 'top', 'right', 'bottom', 'left']
    const props = (element as React.ReactElement<any>)?.props ?? {}
    if (keys.some((key) => key in props)) {
      return true
    }
  }

  return undefined
}

/**
 * Renders an element with spacing props applied.
 * If the element is a component that accepts spacing props, the props are directly applied.
 * If the element is a component that has children and accepts spacing props, the props are applied to the children.
 * If the element does not accept spacing props, the element is returned as is.
 *
 * @param element - The element to render with spacing props.
 * @param spaceProps - The spacing props to apply.
 * @returns The rendered element with spacing props applied.
 */
export function renderWithSpacing(
  element: React.ReactNode,
  spaceProps: SpacingProps & { key?: string; className?: string }
) {
  const variant = getSpaceVariant(element)

  if (variant === false) {
    return element
  }

  if (variant === 'children') {
    return React.Children.toArray(element).map(
      (child: React.ReactElement<any>) => {
        const children = child?.props?.children
        const { key: childKey, ...childProps } = child?.props || {}

        return React.Children.toArray(children).map((element, i) => {
          return React.createElement(
            child.type as React.ComponentType<any>,
            { key: childKey || i, ...childProps },
            wrapWithSpace({ element, spaceProps })
          )
        })
      }
    )
  }

  return wrapWithSpace({ element, spaceProps, variant })
}

function wrapWithSpace({
  element,
  spaceProps: { key = undefined, ...spaceProps },
  variant = null,
}) {
  if (variant ?? getSpaceVariant(element) === true) {
    return React.createElement(
      (element as React.ReactElement).type as React.ComponentType<any>,
      {
        ...((element as React.ReactElement).props as Record<
          string,
          unknown
        >),
        key,
        ...spaceProps,
      }
    )
  }

  if (getSpaceVariant(element) === 'children') {
    return renderWithSpacing(element, spaceProps)
  }

  return (
    <Space key={key} {...spaceProps}>
      {element}
    </Space>
  )
}
