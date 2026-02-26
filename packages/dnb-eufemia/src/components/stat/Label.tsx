import React, { useContext } from 'react'
import clsx from 'clsx'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import StatRootContext from './StatRootContext'

export type LabelProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
} & SpacingProps

function Label(props: LabelProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    element: Element = 'dt',
    className = null,
    ...rest
  } = props

  if (!inRoot) {
    warn('Stat.Label should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: clsx(
      'dnb-stat',
      'dnb-stat__label',
      createSpacingClasses(props),
      className
    ),
  })

  return <Element {...attributes}>{children}</Element>
}

Label._supportsSpacingProps = true
Label._statRole = 'label'

export default Label
