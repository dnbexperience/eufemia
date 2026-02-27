import React from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes } from '../../shared/component-helper'

export type InfoProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  variant?: 'default' | 'subtle' | 'prominent'
} & SpacingProps

function Info(props: InfoProps) {
  const {
    children,
    element: Element = 'span',
    className = null,
    variant = 'subtle',
    ...rest
  } = props

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: classnames(
      'dnb-stat',
      'dnb-stat__info',
      `dnb-stat__info--${variant}`,
      createSpacingClasses(props),
      className
    ),
  })

  return <Element {...attributes}>{children}</Element>
}

Info._supportsSpacingProps = true

export default Info
