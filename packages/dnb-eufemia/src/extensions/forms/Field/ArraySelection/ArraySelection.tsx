import React, { useCallback, useContext, useMemo } from 'react'
import { Checkbox, HelpButton, ToggleButton } from '../../../../components'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { ReturnAdditional } from '../../hooks/useFieldProps'
import { FieldHelpProps, FieldProps, FormError, Path } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { getStatus, mapOptions, Data } from '../Selection'
import { HelpButtonProps } from '../../../../components/HelpButton'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'

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
    variant?: 'checkbox' | 'button' | 'checkbox-button'
    optionsLayout?: 'horizontal' | 'vertical'
    /**
     * The path to the context data (Form.Handler).
     * The context data object needs to have a `value` and a `title` property.
     */
    dataPath?: Path

    /**
     * Data to be used for the component. The object needs to have a `value` and a `title` property.
     * The generated options will be placed above given JSX based children.
     */
    data?: Data
  }

function ArraySelection(props: Props) {
  const {
    id,
    path,
    dataPath,
    data,
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

  const { getValueByPath } = useDataValue()
  const dataList = dataPath ? getValueByPath(dataPath) : data

  const fieldBlockProps = {
    forId: id,
    className: classnames(
      'dnb-forms-field-array-selection',
      `dnb-forms-field-array-selection--variant-${
        variant === 'checkbox' ? 'checkbox' : 'button'
      }`,
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

  const options = useCheckboxOrToggleOptions({
    id,
    path,
    variant,
    info,
    warning,
    emptyValue,
    htmlAttributes,
    dataList,
    children,
    value,
    disabled,
    handleChange,
    hasError,
  })

  switch (variant) {
    case 'checkbox':
      return <FieldBlock {...fieldBlockProps}>{options}</FieldBlock>
    default:
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButtonGroupContext.Provider
            value={{
              status: hasError ? 'error' : undefined,
              disabled,
              variant:
                variant === 'checkbox-button' ? 'checkbox' : 'default',
            }}
          >
            {options}
          </ToggleButtonGroupContext.Provider>
        </FieldBlock>
      )
  }
}

export function useCheckboxOrToggleOptions({
  id,
  path,
  variant = 'checkbox',
  info,
  warning,
  emptyValue,
  htmlAttributes,
  dataList,
  children,
  value,
  disabled,
  hasError,
  handleChange,
}: {
  id: Props['id']
  path?: Props['path']
  variant?: Props['variant']
  info?: Props['info']
  warning?: Props['warning']
  emptyValue?: Props['emptyValue']
  htmlAttributes?: Props['htmlAttributes']
  dataList?: Props['data']
  children?: Props['children']
  value?: Props['value']
  disabled?: Props['disabled']
  hasError?: ReturnAdditional<Props['value']>['hasError']
  handleChange?: ReturnAdditional<Props['value']>['handleChange']
}) {
  const { setFieldProps } = useContext(DataContext)
  const optionsCount = useMemo(
    () => React.Children.count(children) + (dataList?.length || 0),
    [dataList, children]
  )
  const collectedData = []

  const createOption = useCallback(
    (props: OptionProps, i: number) => {
      const {
        value: selected,
        error,
        title,
        help,
        className,
        children,
        ...rest
      } = props

      if (value?.includes(selected)) {
        collectedData.push(props)
      }

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

      const Component = (
        variant === 'checkbox' ? Checkbox : ToggleButton
      ) as typeof Checkbox & typeof ToggleButton

      return (
        <Component
          id={optionsCount === 1 ? id : undefined}
          key={`option-${i}-${value}`}
          className={classnames(
            `dnb-forms-field-array-selection__${
              variant === 'checkbox' ? 'checkbox' : 'button'
            }`,
            className
          )}
          label={variant === 'checkbox' ? label : undefined}
          text={variant !== 'checkbox' ? label : undefined}
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      disabled,
      emptyValue,
      handleChange,
      hasError,
      htmlAttributes,
      id,
      info,
      optionsCount,
      value,
      variant,
      warning,
    ]
  )

  const result = [
    ...(dataList || []).map((props, i) =>
      createOption(props as OptionProps, i)
    ),
    ...(mapOptions(children, { createOption }) || []).filter(Boolean),
  ]

  if (path) {
    setFieldProps?.(path + '/arraySelectionData', collectedData)
  }

  return result
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
