import React, { useContext } from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'
import Provider from '../../shared/Provider'

type ContentOwnProps = {
  element?: keyof JSX.IntrinsicElements
  direction?: 'horizontal' | 'vertical'
  skeleton?: SkeletonShow
}

export type ContentProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof ContentOwnProps | 'ref'
> &
  ContentOwnProps &
  SpacingProps

function Content(props: ContentProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    className = null,
    style = null,
    element: elementProp,
    direction = 'horizontal',
    skeleton = null,
    ...rest
  } = props

  const Element = elementProp ?? (inRoot ? 'dd' : 'span')

  const { hasSkeleton, skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  if (!inRoot) {
    warn('Stat.Content should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(props, {
    ...rest,
    style,
    className: classnames(
      'dnb-stat',
      'dnb-stat__content-item',
      `dnb-stat__content-item--${direction}`,
      createSpacingClasses(props),
      skeletonClass,
      className
    ),
  })

  applySkeletonAttributes(attributes)

  return (
    <StatRootContext.Provider value={{ inRoot, skeleton: hasSkeleton }}>
      <Provider skeleton={hasSkeleton}>
        <Element {...attributes}>{children}</Element>
      </Provider>
    </StatRootContext.Provider>
  )
}

Content._supportsSpacingProps = true
Content._statRole = 'content'

export default Content
