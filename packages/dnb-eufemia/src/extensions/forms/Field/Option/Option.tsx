import React from 'react'
import classnames from 'classnames'
import type { FieldHelpProps, FieldProps } from '../../types'

export type Props = FieldHelpProps &
  FieldProps<number | string> & {
    title?: React.ReactNode
    text?: React.ReactNode
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
      className={classnames('dnb-forms-field-option', className)}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
    >
      {children ?? title}
      {text}
    </span>
  )
}
