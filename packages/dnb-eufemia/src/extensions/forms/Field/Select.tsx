import React, { useCallback } from 'react'
import { Dropdown, Radio } from '../../../components'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import Option from './Option'
import { useInput } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'

export type Props = ComponentProps &
  FieldProps<string | number> & {
    children?: React.ReactNode
    variant?: 'dropdown' | 'radio'
    // Styling
    width?: false | 'medium' | 'large'
  }

export default function Select(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    variant,
    path,
    label,
    placeholder,
    value,
    error,
    disabled,
    emptyValue,
    width = 'large',
    onBlur,
    onFocus,
    onChange,
    children,
  } = useInput(props)

  const handleDropdownChange = useCallback(
    ({ data: { selected_key } }) => {
      onChange?.(!selected_key ? emptyValue : selected_key)
    },
    [onChange, emptyValue]
  )

  const handleRadioChange = useCallback(
    ({ value }) => {
      onChange?.(value === undefined ? emptyValue : value)
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

  switch (variant) {
    case 'radio':
      return (
        <Radio.Group
          className={classnames('dnb-forms-field-select', className)}
          data-testid={dataTestId ?? path ?? 'field-select'}
          label={label}
          layout_direction="column"
          on_change={handleRadioChange}
          {...forwardSpaceProps(props)}
          vertical
        >
          {React.Children.toArray(children)
            .filter(
              (child) =>
                React.isValidElement(child) && child.type === Option
            )
            .map((child: React.ReactElement, i) => (
              <Radio
                key={child.props.value ?? `option-${i}`}
                label={child.props.title ?? child.props.children}
                value={String(child.props.value ?? '')}
              />
            ))}
        </Radio.Group>
      )
    default:
    case 'dropdown': {
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
          className={classnames(
            'dnb-forms-field-select',
            width !== false && `dnb-forms-field-select--width-${width}`,
            className
          )}
          list_class="dnb-forms-field-select__list"
          portal_class="dnb-forms-field-select__portal"
          data-testid={dataTestId ?? path ?? 'field-select'}
          title={placeholder}
          default_value={String(value ?? '')}
          label={label}
          label_direction="vertical"
          status={error?.message}
          disabled={disabled}
          data={data}
          on_change={handleDropdownChange}
          on_show={onFocus}
          on_hide={handleHide}
          {...forwardSpaceProps(props)}
        />
      )
    }
  }
}
