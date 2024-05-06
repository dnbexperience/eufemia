import React from 'react'
import classnames from 'classnames'
import type { FieldProps } from '../../types'
import { DrawerListProps } from '../../../../fragments/DrawerList'

export type Props = FieldProps<number | string> & {
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
      className={classnames('dnb-forms-field-option', className)}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
    >
      {children ?? title}
      {text}
    </span>
  )
}

export function makeOptions<T = DrawerListProps['data']>(
  children: React.ReactNode
): T {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Option) {
      // Option components
      return child.props.text
        ? {
            selectedKey: String(child.props.value ?? ''),
            content: [
              child.props.children ?? child.props.title ?? (
                <em>Untitled</em>
              ),
              child.props.text,
            ],
          }
        : {
            selectedKey: child.props.value,
            content: child.props.children ?? child.props.title,
          }
    }

    if (child) {
      // For other children, just show them as content
      return {
        content: child,
      }
    }
  }).filter(Boolean) as T
}
