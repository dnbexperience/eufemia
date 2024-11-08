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
import OptionField, { Props as OptionFieldProps } from '../Option'
import { useFieldProps } from '../../hooks'
import { ReturnAdditional } from '../../hooks/useFieldProps'
import { pickSpacingProps } from '../../../../components/flex/utils'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import { FieldProps, FieldHelpProps, Path } from '../../types'
import type { FormStatusText } from '../../../../components/FormStatus'
import type { AutocompleteAllProps } from '../../../../components/Autocomplete'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import { HelpButtonProps } from '../../../../components/HelpButton'
import { DrawerListProps } from '../../../../fragments/DrawerList'
import {
  convertCamelCaseProps,
  ToCamelCase,
} from '../../../../shared/helpers/withCamelCaseProps'
import useDataValue from '../../hooks/useDataValue'
import { FormError } from '../../utils'

type IOption = {
  title: string | React.ReactNode
  value: number | string
  status: FormStatusText
}
export type Data = Array<{
  value: string
  title: React.ReactNode
  text?: React.ReactNode
}>

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
     * The context data object needs to have a `value` and a `title` property.
     */
    dataPath?: Path

    /**
     * Data to be used for the component. The object needs to have a `value` and a `title` property.
     * The generated options will be placed above given JSX based children.
     */
    data?: Data

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
    optionsLayout = 'vertical',
    placeholder,
    path,
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
    setDisplayValue,
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

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: cn,
    disableStatusSummary: true,
    ...pickSpacingProps(props),
  }

  switch (variant) {
    case 'radio':
    case 'button': {
      const Component = (
        variant === 'radio' ? Radio : ToggleButton
      ) as typeof Radio & typeof ToggleButton

      const items = renderRadioItems({
        id,
        value,
        variant,
        info,
        warning,
        htmlAttributes,
        children,
        dataList,
        hasError,
        iterateOverItems: ({ value: v, label }) => {
          if (v === value) {
            setDisplayValue(path, label)
          }
        },
      })

      return (
        <FieldBlock
          {...fieldBlockProps}
          labelHeight="small"
          asFieldset={React.Children.count(items) > 1}
        >
          <Component.Group
            className={cn}
            layout_direction={
              optionsLayout === 'horizontal' ? 'row' : 'column'
            }
            disabled={disabled}
            on_change={onChangeHandler}
            value={String(value ?? '')}
          >
            {items}
          </Component.Group>
        </FieldBlock>
      )
    }

    case 'autocomplete':
    case 'dropdown': {
      const status = getStatus(error, info, warning)
      const data = renderDropdownItems(dataList)
        .concat(makeOptions(children))
        .filter(Boolean)
      const displayValue = data.find((item) => item.selectedKey === value)
        ?.content
      setDisplayValue(path, displayValue)

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

type OptionProps = React.ComponentProps<
  React.FC<{
    value?: Props['value']
    error?: Error | FormError | undefined
    title: React.ReactNode
    help?: HelpButtonProps
    children?: React.ReactNode
  }>
>

function renderRadioItems({
  id,
  value: valueProp,
  variant,
  info,
  warning,
  htmlAttributes,
  children,
  dataList,
  hasError,
  iterateOverItems,
}: {
  id: string
  value: Props['value']
  variant: Props['variant']
  info: Props['info']
  warning: Props['warning']
  htmlAttributes: Props['htmlAttributes']
  children: Props['children']
  dataList: Data
  hasError: ReturnAdditional<Props['value']>['hasError']
  iterateOverItems?: (item: {
    value: Props['value']
    label: Props['children']
  }) => void
}) {
  const optionsCount =
    React.Children.count(children) + (dataList?.length || 0)

  const createOption = (props: OptionProps, i: number) => {
    const { value, title, children, error, help, ...rest } = props

    const label = title ?? children
    const status = getStatus(error, info, warning)
    const suffix = help ? (
      <HelpButton size="small" title={help.title}>
        {help.content}
      </HelpButton>
    ) : undefined

    iterateOverItems?.({ value, label })

    const Component = (
      variant === 'radio' ? Radio : ToggleButton
    ) as typeof Radio & typeof ToggleButton

    return (
      <Component
        id={optionsCount === 1 ? id : undefined}
        key={`option-${i}-${id}`}
        label={variant === 'radio' ? label : undefined}
        text={variant === 'button' ? label : undefined}
        value={String(value ?? valueProp ?? '')}
        status={(hasError || status) && 'error'}
        suffix={suffix}
        {...htmlAttributes}
        {...rest}
      />
    )
  }

  return [
    ...(dataList || []).map((props, i) => {
      return createOption(props, i)
    }),
    ...(mapOptions(children, { createOption }) || []),
  ].filter(Boolean)
}

export function mapOptions(children: React.ReactNode, { createOption }) {
  return React.Children.map(
    children,
    (child: React.ReactElement<OptionProps>, i) => {
      if (React.isValidElement(child)) {
        if (child.type === OptionField) {
          return createOption(child.props, i)
        }

        if (child.props.children) {
          const nestedChildren = mapOptions(child.props.children, {
            createOption,
          })
          return React.cloneElement(child, child.props, nestedChildren)
        }
      }

      return child
    }
  )
}

export function makeOptions<T = DrawerListProps['data']>(
  children: React.ReactNode
): T {
  return React.Children.map(children, (child) => {
    if (child?.['props']?.children?.type === OptionField) {
      child = child['props'].children
    }

    if (React.isValidElement(child) && child.type === OptionField) {
      const props = child.props as OptionFieldProps
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
  }) as T
}

function renderDropdownItems(data: Data) {
  return (
    data?.map(({ value, title, text }) => {
      return {
        selectedKey: value,
        content: (text ? [title, text] : title) || <em>Untitled</em>,
      }
    }) || []
  )
}

Selection._supportsSpacingProps = true
export default Selection
