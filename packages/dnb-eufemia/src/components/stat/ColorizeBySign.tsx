import classnames from 'classnames'
import React from 'react'
import { validateDOMAttributes } from '../../shared/component-helper'
import type { SpacingProps } from '../../shared/types'
import { createSpacingClasses } from '../space/SpacingHelper'

export type ColorizeBySignProps = {
  children?: React.ReactNode
  /**
   * The numeric value used to determine the color tone.
   *
   * - Positive values => green (`--color-success-green`)
   * - Negative values => red (`--color-fire-red`)
   * - Zero => gray (`--color-black-55`)
   * - Negative zero (`-0`) => treated as negative
   */
  value: number
  id?: string
  element?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
} & SpacingProps

function ColorizeBySign(props: ColorizeBySignProps) {
  const {
    children,
    value,
    element: Element = 'span',
    className = null,
    style = null,
    ...rest
  } = props

  const numericValue = Number(value)
  const signTone =
    numericValue > 0
      ? 'positive'
      : numericValue < 0 || Object.is(numericValue, -0)
      ? 'negative'
      : 'zero'

  const attributes = validateDOMAttributes(props, {
    ...rest,
    style,
    className: classnames(
      'dnb-stat',
      `dnb-stat--tone-${signTone}`,
      createSpacingClasses(props),
      className
    ),
  })

  return <Element {...attributes}>{children}</Element>
}

ColorizeBySign._supportsSpacingProps = true

export default ColorizeBySign
