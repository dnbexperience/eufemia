import React, { useCallback, useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Checkbox, HelpButton, ToggleButton } from '../../../../components'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { checkForError, ReturnAdditional } from '../../hooks/useFieldProps'
import { DefaultErrorMessages, FieldProps, Path } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'
import { HelpProps } from '../../../../components/help-button/HelpButtonInline'
import { mapOptions, Data } from '../Selection'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import { FormError } from '../../utils'

type OptionProps = React.ComponentProps<
  React.FC<{
    value: number | string
    error: Error | FormError | undefined
    title: React.ReactNode
    help: HelpProps
    className: string
    children: React.ReactNode
    handleSelect: () => void
  }>
>

type OptionValue = string | number

export type Props = FieldProps<Array<OptionValue> | undefined> & {
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

  errorMessages?: DefaultErrorMessages & {
    minItems?: string
    maxItems?: string
  }
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
    value,
    hasError,
    info,
    warning,
    disabled,
    emptyValue,
    htmlAttributes,
    handleChange,
    setDisplayValue,
    children,
  } = useFieldProps(props)

  const { getValueByPath } = useDataValue()
  const dataList = dataPath ? getValueByPath(dataPath) : data

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: classnames(
      'dnb-forms-field-array-selection',
      `dnb-forms-field-array-selection--variant-${
        variant === 'checkbox' ? 'checkbox' : 'button'
      }`,
      `dnb-forms-field-array-selection--layout-${layout}`,
      `dnb-forms-field-array-selection--options-layout--${optionsLayout}`,
      className
    ),
    contentClassName: 'dnb-forms-field-array-selection__options',
    labelHeight: 'small',
    disableStatusSummary: true,
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
    hasError,
    handleChange,
    handleActiveData: ({ labels }) => {
      setDisplayValue(path, labels)
    },
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
  handleActiveData,
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
  handleActiveData?: (item: { labels: Array<Props['children']> }) => void
}) {
  const { setFieldProps } = useContext(DataContext)
  const optionsCount = useMemo(
    () => React.Children.count(children) + (dataList?.length || 0),
    [dataList, children]
  )
  const activeData = []

  const createOption = useCallback(
    (props: OptionProps, i: number) => {
      const {
        value: active,
        error,
        title,
        help,
        className,
        children,
        ...rest
      } = props

      if (value?.includes(active)) {
        activeData.push(props)
      }

      const label = title ?? children
      const suffix = help ? (
        <HelpButton size="small" title={convertJsxToString(help.title)}>
          {help.content}
        </HelpButton>
      ) : undefined

      const handleSelect = () => {
        const newValue = value?.includes(active)
          ? value.filter((value) => value !== active)
          : [...(value ?? []), active]

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
          variant={variant === 'checkbox-button' ? 'checkbox' : undefined}
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
          checked={value?.includes(active)}
          status={
            (hasError || checkForError([error, info, warning])) && 'error'
          }
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

  if (handleActiveData) {
    handleActiveData({
      labels: activeData.map(({ title, children }) => title ?? children),
    })
  }

  if (path) {
    setFieldProps?.(path + '/arraySelectionData', activeData)
  }

  return result
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
