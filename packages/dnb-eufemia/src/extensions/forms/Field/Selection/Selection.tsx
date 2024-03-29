import React, { useMemo, useCallback } from 'react'
import {
  ToggleButton,
  Dropdown,
  Radio,
  HelpButton,
} from '../../../../components'
import classnames from 'classnames'
import { makeUniqueId } from '../../../../shared/component-helper'
import OptionField from '../Option'
import { useFieldProps } from '../../hooks'
import { FormError, FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import type { FormStatusText } from '../../../../components/FormStatus'
import FieldBlock from '../../FieldBlock'

interface IOption {
  title: string | React.ReactNode
  value: number | string
  status: FormStatusText
}

export type Props = FieldHelpProps &
  FieldProps<IOption['value']> & {
    children?: React.ReactNode
    variant?: 'dropdown' | 'radio' | 'button'
    optionsLayout?: 'horizontal' | 'vertical'
    width?: 'small' | 'medium' | 'large' | 'stretch'
  }

function Selection(props: Props) {
  const clearValue = useMemo(() => `clear-option-${makeUniqueId()}`, [])

  const {
    id,
    className,
    variant = 'dropdown',
    label,
    labelDescription,
    layout = 'vertical',
    optionsLayout = 'vertical',
    placeholder,
    value,
    info,
    warning,
    error,
    hasError,
    disabled,
    help,
    emptyValue,
    width = 'large',
    htmlAttributes,
    setHasFocus,
    handleChange,
    children,
  } = useFieldProps(props)

  const handleDropdownChange = useCallback(
    ({ data: { selectedKey } }) => {
      handleChange?.(
        !selectedKey || selectedKey === clearValue
          ? emptyValue
          : selectedKey
      )
    },
    [handleChange, emptyValue, clearValue]
  )

  const onChangeHandler = useCallback(
    ({ value }) => {
      handleChange?.(value === undefined ? emptyValue : value)
    },
    [handleChange, emptyValue]
  )

  // Specific handleShow and handleHide because Dropdown preserve the initially received callbacks, so changes
  // due to `useCallback` usage will have no effect, leading to useFieldPropss handleFocus and handleBlur sending out old
  // copies of value as arguments.
  const handleShow = useCallback(
    ({ data }) => {
      setHasFocus(true, data?.selectedKey)
    },
    [setHasFocus]
  )

  const handleHide = useCallback(
    ({ data }) => {
      setHasFocus(false, data?.selectedKey)
    },
    [setHasFocus]
  )

  const cn = classnames(
    'dnb-forms-field-selection',
    `dnb-forms-field-selection__variant--${variant}`,
    `dnb-forms-field-selection__options-layout--${optionsLayout}`,
    className
  )

  const fieldBlockProps = {
    forId: id,
    className: cn,
    ...pickSpacingProps(props),
    info,
    warning,
    error,
    layout,
    label,
    labelDescription,
  }

  const getStatus = useCallback(
    (error: Error | FormError | undefined) => {
      return (
        error?.message ??
        ((warning instanceof Error && warning.message) ||
          (warning instanceof FormError && warning.message) ||
          warning?.toString() ||
          (info instanceof Error && info.message) ||
          (info instanceof FormError && info.message) ||
          info?.toString())
      )
    },
    [info, warning]
  )

  const options: IOption[] = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(
          (child) =>
            React.isValidElement(child) && child.type === OptionField
        )
        .map((option: React.ReactElement) => {
          const {
            value: v,
            error,
            title,
            children,
            ...rest
          } = option.props

          const status = getStatus(error)

          return {
            title: title ?? children,
            value: v,
            status,
            ...rest,
          }
        }),
    [children, getStatus]
  )

  const status = getStatus(error)

  switch (variant) {
    case 'radio':
    case 'button': {
      const Component = (
        variant === 'radio' ? Radio : ToggleButton
      ) as typeof Radio & typeof ToggleButton

      return (
        <FieldBlock {...fieldBlockProps}>
          <Component.Group
            className={cn}
            layout_direction={
              optionsLayout === 'horizontal' ? 'row' : 'column'
            }
            disabled={disabled}
            on_change={onChangeHandler}
            value={String(value ?? '')}
          >
            {options.map((option, i) => {
              const { value, title, status, ...rest } = option
              return (
                <Component
                  id={options.length === 1 ? id : undefined}
                  key={`option-${i}-${value}`}
                  label={variant === 'radio' ? title : undefined}
                  text={variant === 'button' ? title : undefined}
                  value={String(value ?? '')}
                  status={(hasError || status) && 'error'}
                  {...htmlAttributes}
                  {...rest}
                />
              )
            })}
          </Component.Group>
        </FieldBlock>
      )
    }

    case 'dropdown': {
      const optionsData = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === OptionField) {
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

        // For other children, just show them as content
        return {
          content: child,
        }
      })

      return (
        <FieldBlock {...fieldBlockProps} width={width}>
          <Dropdown
            id={id}
            list_class="dnb-forms-field-selection__list"
            portal_class="dnb-forms-field-selection__portal"
            title={placeholder}
            value={String(value ?? '')}
            status={(hasError || status) && 'error'}
            disabled={disabled}
            {...htmlAttributes}
            data={optionsData}
            suffix={
              help ? (
                <HelpButton title={help.title}>{help.content}</HelpButton>
              ) : undefined
            }
            on_change={handleDropdownChange}
            on_show={handleShow}
            on_hide={handleHide}
            stretch
          />
        </FieldBlock>
      )
    }
  }
}

Selection._supportsSpacingProps = true
export default Selection
