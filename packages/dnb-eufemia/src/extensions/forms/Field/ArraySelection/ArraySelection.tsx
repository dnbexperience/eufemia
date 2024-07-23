import React from 'react'
import { Checkbox, HelpButton, ToggleButton } from '../../../../components'
import classnames from 'classnames'
import OptionField from '../Option'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { ReturnAdditional } from '../../hooks/useFieldProps'
import { FieldHelpProps, FieldProps, FormError } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { getStatus } from '../Selection'
import { HelpButtonProps } from '../../../../components/HelpButton'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'

type OptionProps = React.ComponentProps<
  React.FC<{
    value: number | string
    error: Error | FormError | undefined
    title: React.ReactNode
    help: HelpButtonProps
    className: string
    children: React.ReactNode
    handleSelect: () => void
  }>
>

export type Props = FieldHelpProps &
  FieldProps<Array<string | number> | undefined> & {
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
    help,
    info,
    warning,
    disabled,
    emptyValue,
    htmlAttributes,
    handleChange,
    children,
  } = useFieldProps(props)

  const fieldBlockProps = {
    forId: id,
    className: classnames(
      'dnb-forms-field-array-selection',
      `dnb-forms-field-array-selection--variant-${variant}`,
      `dnb-forms-field-array-selection--layout-${layout}`,
      `dnb-forms-field-array-selection--options-layout-${optionsLayout}`,
      className
    ),
    contentClassName: 'dnb-forms-field-array-selection__options',
    help,
    info,
    warning,
    error,
    layout,
    label,
    labelDescription: (
      <>
        {labelDescription}
        {help ? (
          <HelpButton
            size="small"
            left={labelDescription ? 'x-small' : false}
            title={help.title}
          >
            {help.content}
          </HelpButton>
        ) : undefined}
      </>
    ),
    ...pickSpacingProps(props),
  }

  const options = getCheckboxOrToggleOptions({
    id,
    variant,
    info,
    warning,
    emptyValue,
    htmlAttributes,
    children,
    value,
    disabled,
    handleChange,
    hasError,
  })

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
            {options}
          </ToggleButtonGroupContext.Provider>
        </FieldBlock>
      )
    case 'checkbox':
      return <FieldBlock {...fieldBlockProps}>{options}</FieldBlock>
  }
}

export function getCheckboxOrToggleOptions({
  id,
  variant = 'checkbox',
  info,
  warning,
  emptyValue,
  htmlAttributes,
  children,
  value,
  disabled,
  hasError,
  handleChange,
}: {
  id: Props['id']
  variant?: Props['variant']
  info?: Props['info']
  warning?: Props['warning']
  emptyValue?: Props['emptyValue']
  htmlAttributes?: Props['htmlAttributes']
  children?: Props['children']
  value?: Props['value']
  disabled?: Props['disabled']
  hasError?: ReturnAdditional<Props['value']>['hasError']
  handleChange?: ReturnAdditional<Props['value']>['handleChange']
}) {
  const optionsCount = React.Children.count(children)

  const Component = (
    variant === 'checkbox' ? Checkbox : ToggleButton
  ) as typeof Checkbox & typeof ToggleButton

  const createOption = (props: OptionProps, i: number) => {
    const {
      value: selected,
      error,
      title,
      help,
      className,
      children,
      ...rest
    } = props

    const label = title ?? children
    const status = getStatus(error, info, warning)
    const suffix = help ? (
      <HelpButton size="small" title={help.title}>
        {help.content}
      </HelpButton>
    ) : undefined
    const handleSelect = () => {
      const newValue = value?.includes(selected)
        ? value.filter((value) => value !== selected)
        : [...(value ?? []), selected]

      handleChange?.(
        newValue.length === 0 ? (emptyValue as typeof value) : newValue
      )
    }

    return (
      <Component
        id={optionsCount === 1 ? id : undefined}
        key={`option-${i}-${value}`}
        className={classnames(
          `dnb-forms-field-array-selection__${variant}`,
          className
        )}
        label={variant === 'checkbox' ? label : undefined}
        text={variant === 'button' ? label : undefined}
        value={value}
        disabled={disabled}
        checked={value?.includes(selected)}
        status={(hasError || status) && 'error'}
        suffix={suffix}
        on_change={handleSelect}
        {...htmlAttributes}
        {...rest}
      />
    )
  }

  const mapOptions = (children: React.ReactNode) => {
    return React.Children.toArray(children).map(
      (child: React.ReactElement<OptionProps>, i) => {
        if (React.isValidElement(child)) {
          if (child.type === OptionField) {
            return createOption(child.props, i)
          }

          if (child.props.children) {
            const nestedChildren = mapOptions(child.props.children)
            return React.cloneElement(child, child.props, nestedChildren)
          }
        }

        return child
      }
    )
  }

  return mapOptions(children)
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
