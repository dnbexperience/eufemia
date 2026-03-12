import React, { useContext } from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import type {
  TypographySize,
  TypographyWeight,
} from '../../elements/typography/Typography'
import { getHeadingLineHeightSize } from '../../elements/typography/Typography'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'
import useStatSkeleton from './useStatSkeleton'

export type LabelProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  srOnly?: boolean
  fontSize?: TypographySize
  fontWeight?: TypographyWeight
  variant?: 'default' | 'subtle'
  skeleton?: SkeletonShow
  style?: React.CSSProperties
} & SpacingProps

function Label(props: LabelProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    element: Element = 'dt',
    className = null,
    srOnly = false,
    fontSize = 'basis',
    fontWeight = 'regular',
    variant = 'default',
    skeleton = null,
    style = null,
    ...rest
  } = props

  const { skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)
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
      skeletonClass,
      className
    ),
  })

  applySkeletonAttributes(attributes)

  return <Element {...attributes}>{children}</Element>
}

Label._supportsSpacingProps = true
Label._statRole = 'label'

export default Label
