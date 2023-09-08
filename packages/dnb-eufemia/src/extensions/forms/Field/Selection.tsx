import React, { useMemo, useContext, useCallback } from 'react'
import { Button, Dropdown, Radio, HelpButton } from '../../../components'
import FieldBlock from '../FieldBlock'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import { makeUniqueId } from '../../../shared/component-helper'
import SharedContext from '../../../shared/Context'
import Option from './Option'
import { useDataValue } from '../hooks'
import { FormError } from '../types'
import type { FieldProps, FieldHelpProps } from '../types'
import ButtonRow from '../../../components/layout/ButtonRow'

interface IOption {
  title: string | React.ReactNode
  value: number | string
  handleSelect: () => void
}

export type Props = FieldHelpProps &
  FieldProps<string | number> & {
    children?: React.ReactNode
    variant?: 'dropdown' | 'radio' | 'button'
    clear?: boolean
    optionsLayout?: 'horizontal' | 'vertical'
    width?: 'small' | 'medium' | 'large' | 'stretch'
  }

function Selection(props: Props) {
  const sharedContext = useContext(SharedContext)
  const clearValue = useMemo(() => `clear-option-${makeUniqueId()}`, [])

  const {
    id,
    className,
    variant = 'dropdown',
    clear,
    label,
    labelDescription,
    labelSecondary,
    layout = 'vertical',
    optionsLayout = 'vertical',
    placeholder,
    value,
    info,
    warning,
    error,
    disabled,
    help,
    emptyValue,
    width = 'large',
    setHasFocus,
    handleChange,
    children,
  } = useDataValue(props)

  const handleDropdownChange = useCallback(
    ({ data: { selected_key } }) => {
      handleChange?.(
        !selected_key || selected_key === clearValue
          ? emptyValue
          : selected_key
      )
    },
    [handleChange, emptyValue, clearValue]
  )

  const handleRadioChange = useCallback(
    ({ value }) => {
      handleChange?.(value === undefined ? emptyValue : value)
    },
    [handleChange, emptyValue]
  )

  // Specific handleShow and handleHide because Dropdown preserve the initially received callbacks, so changes
  // due to `useCallback` usage will have no effect, leading to useDataValues handleFocus and handleBlur sending out old
  // copies of value as arguments.
  const handleShow = useCallback(
    ({ data }) => {
      setHasFocus(true, data?.selected_key)
    },
    [setHasFocus]
  )

  const handleHide = useCallback(
    ({ data }) => {
      setHasFocus(false, data?.selected_key)
    },
    [setHasFocus]
  )

  const cn = classnames('dnb-forms-field-selection', className)

  const fieldBlockProps = {
    forId: id,
    className: cn,
    ...forwardSpaceProps(props),
    info,
    warning,
    error,
    layout,
    label,
    labelDescription,
    labelSecondary,
  }

  const options: IOption[] = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(
          (child) => React.isValidElement(child) && child.type === Option
        )
        .map((option: React.ReactElement) => ({
          title: option.props.title ?? option.props.children,
          value: option.props.value,
          handleSelect: () => {
            const selected = option.props.value

            handleChange?.(selected === value ? emptyValue : selected)
          },
        })),
    [children, value, emptyValue, handleChange]
  )

  switch (variant) {
    case 'radio':
      return (
        <Radio.Group
          className={cn}
          label={label}
          layout_direction={
            optionsLayout === 'horizontal' ? 'row' : 'column'
          }
          vertical={layout === 'vertical'}
          on_change={handleRadioChange}
          value={String(value ?? '')}
          {...forwardSpaceProps(props)}
        >
          {options.map((option, i) => (
            <Radio
              key={`option-${i}-${option.value}`}
              label={option.title}
              value={String(option.value ?? '')}
            />
          ))}
        </Radio.Group>
      )
    case 'button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ButtonRow>
            {options.map((option, i) => (
              <Button
                key={`option-${i}-${option.value}`}
                id={id}
                text={option.title}
                on_click={option.handleSelect}
                variant={option.value === value ? undefined : 'secondary'}
                status={error ? 'error' : undefined}
                disabled={disabled}
              />
            ))}
          </ButtonRow>
        </FieldBlock>
      )
    case 'dropdown': {
      const optionsData = React.Children.map(children, (child) => {
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
      const data = [
        clear
          ? {
              selected_key: clearValue,
              content: (
                <em>
                  {sharedContext?.translation.Forms.selectionClearSelected}
                </em>
              ),
            }
          : undefined,
        ...(optionsData ?? []),
      ].filter(Boolean)

      return (
        <Dropdown
          className={classnames(
            'dnb-forms-field-selection',
            width !== 'stretch' &&
              `dnb-forms-field-selection--width-${width}`,
            className
          )}
          list_class="dnb-forms-field-selection__list"
          portal_class="dnb-forms-field-selection__portal"
          title={placeholder}
          value={String(value ?? '')}
          label={label}
          label_direction={layout}
          status={
            error?.message ??
            ((warning instanceof Error && warning.message) ||
              (warning instanceof FormError && warning.message) ||
              warning?.toString() ||
              (info instanceof Error && info.message) ||
              (info instanceof FormError && info.message) ||
              info?.toString())
          }
          disabled={disabled}
          data={data}
          suffix={
            help ? (
              <HelpButton title={help.title}>{help.contents}</HelpButton>
            ) : undefined
          }
          on_change={handleDropdownChange}
          on_show={handleShow}
          on_hide={handleHide}
          {...forwardSpaceProps(props)}
          stretch={width === 'stretch'}
        />
      )
    }
  }
}

Selection._supportsEufemiaSpacingProps = true
export default Selection
