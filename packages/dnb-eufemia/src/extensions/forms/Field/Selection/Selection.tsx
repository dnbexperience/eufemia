import React, { useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { makeUniqueId } from '../../../../shared/component-helper'
import {
  ToggleButton,
  Dropdown,
  Radio,
  HelpButton,
  Autocomplete,
} from '../../../../components'
import OptionField, { convertDataToOptions, makeOptions } from '../Option'
import { useFieldProps } from '../../hooks'
import { ReturnAdditional } from '../../hooks/useFieldProps'
import { pickSpacingProps } from '../../../../components/flex/utils'
import FieldBlock from '../../FieldBlock'
import {
  FormError,
  FieldProps,
  FieldHelpProps,
  FieldBlockWidth,
  Path,
} from '../../types'
import type { FormStatusText } from '../../../../components/FormStatus'
import type { AutocompleteAllProps } from '../../../../components/Autocomplete'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import { HelpButtonProps } from '../../../../components/HelpButton'
import {
  convertCamelCaseProps,
  ToCamelCase,
} from '../../../../shared/helpers/withCamelCaseProps'
import useDataValue from '../../hooks/useDataValue'

type IOption = {
  title: string | React.ReactNode
  value: number | string
  status: FormStatusText
}
type OptionProps = React.ComponentProps<
  React.FC<{
    error: Error | FormError | undefined
    title: React.ReactNode
    help: HelpButtonProps
    children: React.ReactNode
  }>
>

export type Data = AutocompleteAllProps['data'] | DropdownAllProps['data']

export type Props = FieldHelpProps &
  FieldProps<IOption['value']> & {
    /**
     * Defines the variant of the component.
     * Default: dropdown
     */
    variant?: 'dropdown' | 'autocomplete' | 'radio' | 'button'

    /**
     * The width of the component.
     * Default: large
     */
    width?: FieldBlockWidth

    /**
     * Defines the layout of the options for radio and button variants.
     */
    optionsLayout?: 'horizontal' | 'vertical'

    /**
     * The path to the context data (Form.Handler).
     * The object needs to have a `value` and a `title` property.
     */
    dataPath?: Path

    /**
     * Data to be used for the component. The object needs to have a `value` and a `title` property.
     * Provide the Dropdown or Autocomplete data in the format documented here: [Dropdown](/uilib/components/dropdown) and [Autocomplete](/uilib/components/autocomplete) documentation.
     */
    data?: Array<{ value: string; title: React.ReactNode }>

    /**
     * Autocomplete specific props
     */
    autocompleteProps?: ToCamelCase<AutocompleteAllProps>

    /**
     * Dropdown specific props
     */
    dropdownProps?: ToCamelCase<DropdownAllProps>

    /**
     * The content of the component.
     */
    children?: React.ReactNode
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
    data,
    dataPath,
    children,

    // - Autocomplete and Dropdown specific props
    autocompleteProps,
    dropdownProps,
  } = useFieldProps(props)

  const { getValueByPath } = useDataValue()
  let dataList = data
  if (dataPath) {
    dataList = getValueByPath(dataPath)
  }

  const handleDropdownChange = useCallback(
    ({ data }) => {
      const selectedKey = data?.selectedKey
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

  switch (variant) {
    case 'radio':
    case 'button': {
      const Component = (
        variant === 'radio' ? Radio : ToggleButton
      ) as typeof Radio & typeof ToggleButton

      const content = getRadioOrToggleOptions({
        id,
        value,
        variant,
        info,
        warning,
        htmlAttributes,
        children:
          dataList?.length > 0
            ? dataList.map(({ value, title }) => (
                <OptionField key={value} value={value} title={title} />
              ))
            : children,
        hasError,
      })

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
            {content}
          </Component.Group>
        </FieldBlock>
      )
    }

    case 'autocomplete':
    case 'dropdown': {
      const status = getStatus(error, info, warning)
      const data = dataList
        ? convertDataToOptions<Data>(dataList)
        : makeOptions<Data>(children)
      const sharedProps: AutocompleteAllProps & DropdownAllProps = {
        id,
        list_class: 'dnb-forms-field-selection__list',
        portal_class: 'dnb-forms-field-selection__portal',
        title: placeholder,
        value: String(value ?? ''),
        status: (hasError || status) && 'error',
        disabled,
        ...htmlAttributes,
        data,
        suffix: help ? (
          <HelpButton title={help.title}>{help.content}</HelpButton>
        ) : undefined,
        on_change: handleDropdownChange,
        on_show: handleShow,
        on_hide: handleHide,
        stretch: true,
      }

      return (
        <FieldBlock {...fieldBlockProps} width={width}>
          {variant === 'autocomplete' ? (
            <Autocomplete
              {...sharedProps}
              {...(autocompleteProps
                ? (convertCamelCaseProps(
                    autocompleteProps
                  ) as AutocompleteAllProps)
                : null)}
            />
          ) : (
            <Dropdown
              {...sharedProps}
              {...(dropdownProps
                ? (convertCamelCaseProps(
                    dropdownProps
                  ) as DropdownAllProps)
                : null)}
            />
          )}
        </FieldBlock>
      )
    }
  }
}

export function getStatus(
  error: Error | FormError | undefined,
  info: React.ReactNode,
  warning: React.ReactNode
) {
  return (
    error?.message ??
    ((warning instanceof Error && warning.message) ||
      (warning instanceof FormError && warning.message) ||
      warning?.toString() ||
      (info instanceof Error && info.message) ||
      (info instanceof FormError && info.message) ||
      info?.toString())
  )
}

export function getRadioOrToggleOptions({
  id,
  value,
  variant,
  info,
  warning,
  htmlAttributes,
  children,
  hasError,
}: {
  id: string
  value: Props['value']
  variant: Props['variant']
  info: Props['info']
  warning: Props['warning']
  htmlAttributes: Props['htmlAttributes']
  children: Props['children']
  hasError: ReturnAdditional<Props['value']>['hasError']
}) {
  const optionsCount = React.Children.count(children)

  const Component = (
    variant === 'radio' ? Radio : ToggleButton
  ) as typeof Radio & typeof ToggleButton

  const createOption = (props: OptionProps, i: number) => {
    const { error, title, help, children, ...rest } = props

    const label = title ?? children
    const status = getStatus(error, info, warning)
    const suffix = help ? (
      <HelpButton size="small" title={help.title}>
        {help.content}
      </HelpButton>
    ) : undefined

    return (
      <Component
        id={optionsCount === 1 ? id : undefined}
        key={`option-${i}-${value}`}
        label={variant === 'radio' ? label : undefined}
        text={variant === 'button' ? label : undefined}
        value={String(value ?? '')}
        status={(hasError || status) && 'error'}
        suffix={suffix}
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

Selection._supportsSpacingProps = true
export default Selection
