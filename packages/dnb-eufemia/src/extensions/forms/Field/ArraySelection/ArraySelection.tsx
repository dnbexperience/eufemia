import React, { useMemo } from 'react'
import { Checkbox, ToggleButton } from '../../../../components'
import classnames from 'classnames'
import OptionField from '../Option'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'

interface IOption {
  title: string
  value: number | string
  handleSelect: () => void
}

export type Props = FieldProps<Array<string | number>> & {
  children?: React.ReactNode
  variant?: 'checkbox' | 'button'
  optionsLayout?: 'horizontal' | 'vertical'
}

function ArraySelection(props: Props) {
  const {
    id,
    className,
    variant = 'checkbox',
    layout = 'vertical',
    optionsLayout = 'vertical',
    label,
    labelDescription,
    value,
    error,
    hasError,
    info,
    warning,
    disabled,
    emptyValue,
    handleChange,
    children,
  } = useFieldProps(props)

  const fieldBlockProps = {
    forId: id,
    className: classnames(
      'dnb-forms-field-array-selection',
      `dnb-forms-field-array-selection--layout-${layout}`,
      `dnb-forms-field-array-selection--options-layout-${optionsLayout}`,
      className
    ),
    contentClassName: 'dnb-forms-field-array-selection__options',
    info,
    warning,
    error,
    layout,
    label,
    labelDescription,
    ...pickSpacingProps(props),
  }

  const options: IOption[] = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(
          (child) =>
            React.isValidElement(child) && child.type === OptionField
        )
        .map((option: React.ReactElement) => ({
          title: option.props.title ?? option.props.children,
          value: option.props.value,
          handleSelect: () => {
            const selected = option.props.value

            const newValue = value?.includes(selected)
              ? value.filter((value) => value !== selected)
              : [...(value ?? []), selected]

            handleChange?.(newValue.length === 0 ? emptyValue : newValue)
          },
        })),
    [children, value, emptyValue, handleChange]
  )

  switch (variant) {
    case 'button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButtonGroupContext.Provider
            value={{
              status: hasError ? 'error' : undefined,
              disabled,
            }}
          >
            {options.map((option, i) => (
              <ToggleButton
                key={`option-${i}-${option.value}`}
                text={option.title}
                checked={value?.includes(option.value)}
                on_change={option.handleSelect}
              />
            ))}
          </ToggleButtonGroupContext.Provider>
        </FieldBlock>
      )
    case 'checkbox':
      return (
        <FieldBlock {...fieldBlockProps}>
          {options.map((option, i) => (
            <Checkbox
              key={`option-${i}-${option.value}`}
              className="dnb-forms-field-array-selection__checkbox"
              label={option.title}
              checked={value?.includes(option.value)}
              disabled={disabled}
              on_change={option.handleSelect}
              status={hasError ? 'error' : undefined}
            />
          ))}
        </FieldBlock>
      )
  }
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
