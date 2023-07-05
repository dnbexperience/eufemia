import React, { useCallback } from 'react'
import { Dropdown } from '../../../components'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import Option from './Option'
import { useInput } from './hooks'
import type { ComponentProps } from '../component-types'
import type { InputProps } from '../input-types'

export type Props = ComponentProps &
  InputProps<string | number> & {
    children?: React.ReactNode
  }

export default function Select(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    path,
    label,
    placeholder,
    value,
    error,
    disabled,
    emptyValue,
    onBlur,
    onFocus,
    onChange,
    children,
  } = useInput(props)

  const handleChange = useCallback(
    ({ data: { selected_key } }) => {
      onChange?.(!selected_key ? emptyValue : selected_key)
    },
    [onChange, emptyValue]
  )

  const handleHide = useCallback(
    ({ data }) => {
      // Provide a value because selecting an option will lead to onChange and onBlur called in parallel, so onBlur might receive the old value
      onBlur?.({ onBlurValue: data?.selected_key })
    },
    [onBlur]
  )

  const data = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Option) {
      // Option components
      return child.props.text
        ? {
            selected_key: String(child.props.value ?? ''),
            content: [
              child.props.title ?? child.props.children ?? (
                <em>Untitled</em>
              ),
              child.props.text,
            ],
          }
        : {
            selected_key: child.props.value,
            content: child.props.title ?? child.props.children,
          }
    }

    // For other children, just show them as content
    return {
      content: child,
    }
  })

  return (
    <Dropdown
      className={classnames('dnb-forms-data-input-select', className)}
      data-testid={dataTestId ?? path ?? 'data-input-select'}
      title={placeholder ?? ' '}
      default_value={String(value ?? '')}
      label={label}
      label_direction="vertical"
      status={error?.message}
      disabled={disabled}
      data={data}
      on_change={handleChange}
      on_show={onFocus}
      on_hide={handleHide}
      {...forwardSpaceProps(props)}
    />
  )
}
