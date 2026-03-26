import React from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type {
  TypographySize,
  TypographyWeight,
} from '../../elements/typography/Typography'
import { getHeadingLineHeightSize } from '../../elements/typography/Typography'
import type { SpacingProps } from '../../shared/types'
import {
  convertJsxToString,
  validateDOMAttributes,
} from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import useStatSkeleton from './useStatSkeleton'
import type { SkeletonMethods } from '../skeleton/SkeletonHelper'

type TextOwnProps = {
  /** @internal Not documented – used by internal sub-components only. */
  element?: keyof JSX.IntrinsicElements
  srLabel?: React.ReactNode
  fontSize?: TypographySize
  fontWeight?: TypographyWeight
  colorizeBySign?: boolean | number
  skeleton?: SkeletonShow
}

export type TextProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof TextOwnProps | 'ref'
> &
  TextOwnProps &
  SpacingProps

/** @internal */
export type TextInternalProps = TextProps & {
  textClassName?: string | false
  skeletonMethod?: SkeletonMethods
}

function TextInternal(props: TextInternalProps) {
  const {
    children,
    element: Element = 'span',
    className = null,
    style = null,
    srLabel = null,
    fontSize = null,
    fontWeight,
    colorizeBySign = false,
    skeleton = null,
    skeletonMethod = 'font',
    textClassName = 'dnb-stat__text',
    ...rest
  } = props

  const { skeletonClass, applySkeletonAttributes } = useStatSkeleton(
    skeleton,
    skeletonMethod
  )

  const resolvedSignTone = resolveSignTone(colorizeBySign, children)
  const textValue = convertJsxToString(children)
  const srText = srLabel
    ? `${convertJsxToString(srLabel)}${' '}${textValue}`
    : textValue
  const ariaLabel = srLabel ? srText : rest['aria-label']

  const attributes = validateDOMAttributes(props, {
    ...rest,
    'aria-label': ariaLabel,
    style,
    className: classnames(
      textClassName,
      textClassName && fontSize && `dnb-t__size--${fontSize}`,
      textClassName &&
        fontSize &&
        `dnb-t__line-height--${getHeadingLineHeightSize(fontSize)}`,
      textClassName && fontWeight && `dnb-t__weight--${fontWeight}`,
      resolvedSignTone && `dnb-stat--tone-${resolvedSignTone}`,
      createSpacingClasses(props),
      skeletonClass,
      className
    ),
  })

  applySkeletonAttributes(attributes)

  return <Element {...attributes}>{children}</Element>
}

TextInternal._supportsSpacingProps = true

function Text(props: TextProps) {
  return <TextInternal {...props} />
}

Text._supportsSpacingProps = true

function resolveSignTone(
  colorizeBySign: TextProps['colorizeBySign'],
  children: React.ReactNode
): 'positive' | 'negative' | null {
  if (colorizeBySign === false || colorizeBySign === null) {
    return null
  }

  const value =
    typeof colorizeBySign === 'number'
      ? colorizeBySign
      : getValueFromChildren(children)

  if (typeof value === 'number') {
    if (value > 0) {
      return 'positive'
    }

    if (value < 0 || Object.is(value, -0)) {
      return 'negative'
    }

    return null
  }

  const normalized = String(value || '').trim()
  const match = normalized.match(/^([+\-−])/)

  if (match?.[1] === '+') {
    return 'positive'
  }

  if (match?.[1] === '-' || match?.[1] === '−') {
    return 'negative'
  }

  const numericValue = Number(normalized)

  if (numericValue > 0) {
    return 'positive'
  }

  if (numericValue < 0 || Object.is(numericValue, -0)) {
    return 'negative'
  }

  return null
}

function getValueFromChildren(children: React.ReactNode) {
  if (typeof children === 'string' || typeof children === 'number') {
    return children
  }

  return convertJsxToString(children)
}

export { TextInternal }
export default Text
