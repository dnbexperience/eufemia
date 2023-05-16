import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import type { InputProps } from '../input-types'

export type Props = ComponentProps &
  InputProps<number | string> & {
    title?: string
    text?: string
    children?: React.ReactNode
  }

export default function Option({
  className,
  title,
  text,
  children,
}: Props) {
  return (
    <span
      className={classnames('dnb-forms-data-input-option', className)}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
    >
      {children ?? title}
      {text}
    </span>
  )
}
