import React, { useContext } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import type {
  TypographySize,
  TypographyWeight,
} from '../../elements/typography/Typography'
import { getHeadingLineHeightSize } from '../../elements/typography/Typography'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import StatRootContext from './StatRootContext'

export type LabelProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  srOnly?: boolean
  fontSize?: TypographySize
  fontWeight?: TypographyWeight
  variant?: 'default' | 'subtle'
  style?: React.CSSProperties
} & SpacingProps

function Label(props: LabelProps) {
  const { inRoot, skeleton: rootSkeleton } = useContext(StatRootContext)
  const context = useContext(Context)
  const resolvedSkeleton = Boolean(rootSkeleton ?? context?.skeleton)

  const {
    children,
    element: Element = 'dt',
    className = null,
    srOnly = false,
    fontSize = 'basis',
    fontWeight = 'regular',
    variant = 'default',
    style = null,
    ...rest
  } = props
  const resolvedLineHeight = getHeadingLineHeightSize(fontSize)

  if (!inRoot) {
    warn('Stat.Label should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(props, {
    ...rest,
    style,
    className: classnames(
      'dnb-stat',
      'dnb-stat__label',
      `dnb-stat__label--${variant}`,
      srOnly && 'dnb-sr-only',
      `dnb-t__size--${fontSize}`,
      `dnb-t__line-height--${resolvedLineHeight}`,
      `dnb-t__weight--${fontWeight}`,
      createSpacingClasses(props),
      createSkeletonClass('font', resolvedSkeleton, context),
      className
    ),
  })

  skeletonDOMAttributes(attributes, resolvedSkeleton, context)

  return <Element {...attributes}>{children}</Element>
}

Label._supportsSpacingProps = true
Label._statRole = 'label'

export default Label
