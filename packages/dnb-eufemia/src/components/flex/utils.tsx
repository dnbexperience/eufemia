import React from 'react'
import { SpaceType, SpacingProps } from '../../shared/types'
import Space from '../space/Space'
import { removeSpaceProps } from '../space/SpacingUtils'
import * as EufemiaElements from '../../elements'
import { End, Start } from './types'

export const pickSpacingProps = <Props extends SpacingProps>(
  props: Props
): SpacingProps => {
  return {
    space: props?.space,
    top: props?.top,
    bottom: props?.bottom,
    left: props?.left,
    right: props?.right,
  }
}

export const omitSpacingProps = removeSpaceProps

export const getSpaceValue = (
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

export function isHeadingElement(
  element: React.ReactNode & { _isHeadingElement?: boolean }
): boolean {
  return (
    React.isValidElement(element) &&
    element?.type?.['_isHeadingElement'] === true
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
      element?.type?.['_supportsSpacingProps'] === true) ||
    isEufemiaElement(element)
  )
}

export const getSpacingPropsChildren = (child: React.ReactNode) => {
  if (
    React.isValidElement(child) &&
    child?.type?.['_supportsSpacingProps'] === 'children'
  ) {
    return child?.props?.children
  }
}

export const renderWithSpacing = (
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
