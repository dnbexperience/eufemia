import React from 'react'
import clsx from 'clsx'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes } from '../../shared/component-helper'

export type InfoProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
} & SpacingProps

function Info(props: InfoProps) {
  const {
    children,
    element: Element = 'span',
    className = null,
    ...rest
  } = props

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: clsx(
      'dnb-stat',
      'dnb-stat__info',
      createSpacingClasses(props),
      className
    ),
  })

  return <Element {...attributes}>{children}</Element>
}

Info._supportsSpacingProps = true

export default Info
