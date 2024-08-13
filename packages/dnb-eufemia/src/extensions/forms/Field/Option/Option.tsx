import React from 'react'
import classnames from 'classnames'
import type { FieldHelpProps, FieldProps } from '../../types'
import { DrawerListProps } from '../../../../fragments/DrawerList'

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

export function makeOptions<T = DrawerListProps['data']>(
  children: React.ReactNode
): T {
  return React.Children.map(children, (child) => {
    if (child?.['props']?.children?.type === Option) {
      child = child['props'].children
    }

    if (React.isValidElement(child) && child.type === Option) {
      const props = child.props as Props
      const title = props.children ?? props.title ?? <em>Untitled</em>
      const content = props.text ? [title, props.text] : title
      const selectedKey = String(props.value ?? '')

      return { selectedKey, content }
    }

    // For other children, just show them as content
    if (child) {
      return {
        content: child,
      }
    }
  }).filter(Boolean) as T
}

export function convertDataToOptions<T = DrawerListProps['data']>(
  data: Array<{
    value: string
    title: React.ReactNode
    text?: React.ReactNode
  }>
) {
  return data.map(({ value, title, text }) => ({
    selectedKey: value,
    content: (text ? [title, text] : title) || <em>Untitled</em>,
  })) as T
}
