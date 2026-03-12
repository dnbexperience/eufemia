import React from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatValueContext from './StatValueContext'
import useStatSkeleton from './useStatSkeleton'

export type InfoProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  variant?:
    | 'plain'
    | 'subtle'
    | 'prominent'
    | /** @deprecated Use "plain" instead */ 'default'
  skeleton?: SkeletonShow
} & SpacingProps

function Info(props: InfoProps) {
  const {
    children,
    element: Element = 'span',
    className = null,
    variant: variantProp = 'subtle',
    skeleton = null,
    ...rest
  } = props

  let variant = variantProp
  if (variant === 'default') {
    warn(
      'Stat.Info variant="default" is deprecated. Use variant="plain" instead.'
    )
    variant = 'plain'
  }

  const { skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: classnames(
      'dnb-stat',
      'dnb-stat__info',
      `dnb-stat__info--${variant}`,
      createSpacingClasses(props),
      skeletonClass,
      className
    ),
  })

  applySkeletonAttributes(attributes)

  return (
    <Element {...attributes}>
      <StatValueContext.Provider
        value={{ useBasisSize: true, defaultMainWeight: 'regular' }}
      >
        {children}
      </StatValueContext.Provider>
    </Element>
  )
}

Info._supportsSpacingProps = true

export default Info
