import React, { useContext } from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'

export type ContentProps = {
  children?: React.ReactNode
  className?: string
  element?: keyof JSX.IntrinsicElements
  direction?: 'horizontal' | 'vertical'
  skeleton?: SkeletonShow
} & SpacingProps

function Content(props: ContentProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    className = null,
    element: Element = 'dd',
    direction = 'horizontal',
    skeleton = null,
    ...rest
  } = props

  const { hasSkeleton } = useStatSkeleton(skeleton)

  if (!inRoot) {
    warn('Stat.Content should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: classnames(
      'dnb-stat',
      'dnb-stat__content-item',
      `dnb-stat__content-item--${direction}`,
      createSpacingClasses(props),
      className
    ),
  })

  return (
    <StatRootContext.Provider value={{ inRoot, skeleton: hasSkeleton }}>
      <Element {...attributes}>{children}</Element>
    </StatRootContext.Provider>
  )
}

Content._supportsSpacingProps = true
Content._statRole = 'content'

export default Content
