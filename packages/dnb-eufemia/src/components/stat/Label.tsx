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
import Provider from '../../shared/Provider'

type LabelOwnProps = {
  element?: keyof JSX.IntrinsicElements
  srOnly?: boolean
  fontSize?: TypographySize
  fontWeight?: TypographyWeight
  variant?:
    | 'plain'
    | 'subtle'
    | /** @deprecated Use "plain" instead */ 'default'
  skeleton?: SkeletonShow
}

export type LabelProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof LabelOwnProps | 'ref'
> &
  LabelOwnProps &
  SpacingProps

function Label(props: LabelProps) {
  const { inRoot, skeleton: rootSkeleton } = useContext(StatRootContext)

  const {
    children,
    element: elementProp,
    className = null,
    srOnly = false,
    fontSize = 'basis',
    fontWeight = 'regular',
    variant: variantProp = 'plain',
    skeleton = null,
    style = null,
    ...rest
  } = props

  const Element = elementProp ?? (inRoot ? 'dt' : 'span')

  const { hasSkeleton, skeletonClass, applySkeletonAttributes } =
    useStatSkeleton(skeleton)

  // Only override the root skeleton context if this Label has an
  // explicit skeleton prop — otherwise, let the root value propagate.
  const childSkeleton =
    skeleton !== null && skeleton !== undefined
      ? hasSkeleton
      : rootSkeleton
  const resolvedLineHeight = getHeadingLineHeightSize(fontSize)

  let variant = variantProp
  if (variant === 'default') {
    warn(
      'Stat.Label variant="default" is deprecated. Use variant="plain" instead.'
    )
    variant = 'plain'
  }

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

  return (
    <StatRootContext.Provider value={{ inRoot, skeleton: childSkeleton }}>
      <Provider skeleton={hasSkeleton}>
        <Element {...attributes}>{children}</Element>
      </Provider>
    </StatRootContext.Provider>
  )
}

Label._supportsSpacingProps = true
Label._statRole = 'label'

export default Label
