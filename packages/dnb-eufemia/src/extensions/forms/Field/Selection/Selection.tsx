import React, { useMemo, useCallback } from 'react'
import clsx from 'clsx'
import {
  convertJsxToString,
  makeUniqueId,
} from '../../../../shared/component-helper'
import {
  ToggleButton,
  Dropdown,
  Radio,
  Autocomplete,
  HelpButton,
} from '../../../../components'
import type { Props as OptionFieldProps } from '../Option'
import OptionField from '../Option'
import { useFieldProps } from '../../hooks'
import type { ReturnAdditional } from '../../hooks/useFieldProps'
import { checkForError } from '../../hooks/useFieldProps'
import { pickSpacingProps } from '../../../../components/flex/utils'
import type {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import type { FieldProps, Path } from '../../types'
import type { FormStatusText } from '../../../../components/FormStatus'
import type { AutocompleteAllProps } from '../../../../components/Autocomplete'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import type { HelpProps } from '../../../../components/help-button/HelpButtonInline'
import type {
  DrawerListDataArrayObjectStrict,
  DrawerListProps,
} from '../../../../fragments/DrawerList'
import useDataValue from '../../hooks/useDataValue'
import type { FormError } from '../../utils'
import type { RadioProps } from '../../../../components/Radio'
import type { ToggleButtonProps } from '../../../../components/ToggleButton'
import type { RadioGroupProps } from '../../../../components/radio/RadioGroup'
import type { ToggleButtonGroupProps } from '../../../../components/toggle-button/ToggleButtonGroup'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

type IOption = {
  title: string | React.ReactNode
  value: number | string
  status: FormStatusText
}
export type Data = Array<
  {
    value: number | string
    title: React.ReactNode
    text?: React.ReactNode
    disabled?: boolean
    style?: React.CSSProperties
    [key: string]: any
  } & Partial<DrawerListDataArrayObjectStrict>
>

type RenderSelectionChildren = (params: {
  value: IOption['value']
  options: Props['data']
}) => React.ReactNode

type DrawerListChangeParams = {
  data?: DrawerListDataArrayObjectStrict | string | null
  value?: IOption['value']
}

type DrawerListVisibilityParams = {
  data?: DrawerListDataArrayObjectStrict | string | null
}

export type Props = FieldProps<IOption['value']> & {
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
   * Transform the displayed selection for Dropdown and Autocomplete variant.
   * Use it to display a different value than the one in the data set.
   */
  transformSelection?: (props: OptionFieldProps) => React.ReactNode

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
   * Array of groups, only the first can be `undefined`
   */
  groups?: React.ReactNode[]
  /**
   * Autocomplete specific props
   */
  autocompleteProps?: AutocompleteAllProps

  /**
   * Dropdown specific props
   */
  dropdownProps?: DropdownAllProps

  /**
   * The size of the component.
   */
  size?:
    | ToggleButtonGroupProps['size']
    | RadioGroupProps['size']
    | AutocompleteAllProps['size']
    | DropdownAllProps['size']

  /**
   * The content of the component.
   */
  children?: React.ReactNode | RenderSelectionChildren
}

function Selection(props: Props) {
  const clearValue = useMemo(() => `clear-option-${makeUniqueId()}`, [])

  const {
    id,
    className,
    variant = 'dropdown',
    layout = 'vertical',
    optionsLayout = 'vertical',
    placeholder,
    value,
    info,
    warning,
    error,
    hasError,
    disabled,
    size,
    emptyValue,
    width,
    htmlAttributes,
    setHasFocus,
    handleChange,
    setDisplayValue,
    transformSelection,
    data,
    groups,
    dataPath,
    children,
    additionalArgs,

    // - Autocomplete and Dropdown specific props
    autocompleteProps,
    dropdownProps,
  } = useFieldProps(props)

  const { getValueByPath } = useDataValue()
  let dataList = data
  if (dataPath) {
    dataList = getValueByPath(dataPath)
  }
  const hasRenderPropChildren = typeof children === 'function'
  const renderedChildren = useMemo(() => {
    return resolveChildren(children, value, dataList)
  }, [children, dataList, value])

  const handleDrawerListChange = useCallback(
    ({ data, value }: DrawerListChangeParams) => {
      const selectedKey =
        typeof data === 'object' && data ? data.selectedKey : value
      handleChange?.(
        !selectedKey || selectedKey === clearValue
          ? emptyValue
          : selectedKey,
        { data }
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
  // due to `useCallback` usage will have no effect, leading to useFieldProps's handleFocus and handleBlur sending out old
  // copies of value as arguments.
  const handleShow = useCallback(
    ({ data }: DrawerListVisibilityParams) => {
      setHasFocus(
        true,
        typeof data === 'object' && data ? data.selectedKey : undefined
      )
    },
    [setHasFocus]
  )

  const handleHide = useCallback(
    ({ data }: DrawerListVisibilityParams) => {
      setHasFocus(
        false,
        typeof data === 'object' && data ? data.selectedKey : undefined
      )
    },
    [setHasFocus]
  )

  const cn = clsx(
    'dnb-forms-field-selection',
    `dnb-forms-field-selection__variant--${variant}`,
    `dnb-forms-field-selection--layout-${layout}`,
    `dnb-forms-field-selection--options-layout--${optionsLayout}`,
    className
  )

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: cn,
    disableStatusSummary: true,
    ...pickSpacingProps(props),
  }

  const onType = props?.autocompleteProps?.onType
  const onTypeAutocompleteHandler = useCallback(
    (event) => {
      if (typeof onType === 'function') {
        const { value } = event
        onType({
          ...event,
          ...additionalArgs,
          value: value === '' ? emptyValue : value,
        })
      }
    },
    [additionalArgs, emptyValue, onType]
  )

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
        children: renderedChildren,
        dataList: hasRenderPropChildren ? undefined : dataList,
        hasError,
        iterateOverItems: ({ value: v, label }) => {
          if (v === value) {
            setDisplayValue(label)
          }
        },
      })

      const additionalFieldBlockProps: FieldBlockProps = {
        asFieldset: React.Children.count(items) > 1,
        fieldsetRole: variant === 'radio' ? 'radiogroup' : 'group',
      }
      if (!size) {
        additionalFieldBlockProps.labelHeight = 'small'
      }
      if (width) {
        additionalFieldBlockProps.contentWidth = width
      }

      return (
        <FieldBlock {...fieldBlockProps} {...additionalFieldBlockProps}>
          <Component.Group
            size={size as RadioGroupProps['size']}
            className={cn}
            layoutDirection={
              optionsLayout === 'horizontal' ? 'row' : 'column'
            }
            disabled={disabled}
            onChange={onChangeHandler}
            value={String(value ?? '')}
          >
            {items}
          </Component.Group>
        </FieldBlock>
      )
    }

    case 'autocomplete':
    case 'dropdown': {
      const data = renderDropdownItems(
        hasRenderPropChildren ? undefined : dataList,
        transformSelection
      )
        .concat(makeOptions(renderedChildren, transformSelection))
        .filter(Boolean)
      const displayValue = data.find((item) => item.selectedKey === value)
        ?.content
      setDisplayValue(displayValue)

      const sharedProps: Omit<
        AutocompleteAllProps & DropdownAllProps,
        'ref'
      > = {
        id,
        listClass: 'dnb-forms-field-selection__list',
        portalClass: 'dnb-forms-field-selection__portal',
        title: placeholder,
        value: String(value ?? ''),
        status:
          (hasError || checkForError([error, info, warning])) && 'error',
        disabled,
        ...htmlAttributes,
        data,
        groups,
        size,
        onChange: handleDrawerListChange,
        onOpen: handleShow,
        onClose: handleHide,
        stretch: true,
      }

      const specificFieldBlockProps: FieldBlockProps = {
        contentWidth: width ?? 'large',
      }

      return (
        <FieldBlock {...fieldBlockProps} {...specificFieldBlockProps}>
          {variant === 'autocomplete' ? (
            <Autocomplete
              {...sharedProps}
              {...autocompleteProps}
              value={
                autocompleteProps?.preventSelection ? undefined : value
              }
              onType={onTypeAutocompleteHandler}
              data={
                !props.data &&
                !props.dataPath &&
                autocompleteProps?.mode === 'async'
                  ? undefined
                  : data
              }
              selectAll
            />
          ) : (
            <Dropdown {...sharedProps} {...dropdownProps} />
          )}
        </FieldBlock>
      )
    }
  }
}

function resolveChildren(
  children: Props['children'],
  value: Props['value'],
  options: Props['data']
) {
  if (typeof children === 'function') {
    return children({ value, options })
  }

  return children
}

type OptionProps = React.ComponentProps<
  (props: {
    value: Props['value']
    error: Error | FormError | undefined
    help: HelpProps
    title: React.ReactNode
    children: React.ReactNode
    size?: ToggleButtonProps['size'] | RadioProps['size']
  }) => React.JSX.Element
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
  children: React.ReactNode
  dataList?: Data
  hasError: ReturnAdditional<Props['value']>['hasError']
  iterateOverItems?: (item: {
    value: Props['value']
    label: React.ReactNode
  }) => void
}) {
  const optionsCount =
    React.Children.count(children) + (dataList?.length || 0)

  const createOption = (props: OptionProps, i: number) => {
    const { value, title, children, error, help, size, ...rest } = props

    const label = title ?? children
    const suffix = help ? (
      <HelpButton size="small" title={convertJsxToString(help.title)}>
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
        role="radio"
        value={String(value ?? valueProp) || undefined}
        status={
          (hasError || checkForError([error, info, warning])) && 'error'
        }
        suffix={suffix}
        size={size}
        {...htmlAttributes}
        {...rest}
      />
    )
  }

  return [
    ...(dataList || []).map((props, i) => {
      return createOption(props as OptionProps, i)
    }),
    ...(mapOptions(children, { createOption }) || []),
  ].filter(Boolean)
}

export function mapOptions(
  children: React.ReactNode,
  {
    createOption,
  }: { createOption: (props: OptionProps, i: number) => React.ReactNode }
) {
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
          return React.createElement(
            child.type as React.ComponentType<any>,
            child.props,
            nestedChildren
          )
        }
      }

      return child
    }
  )
}

export function makeOptions<T = DrawerListProps['data']>(
  children: React.ReactNode,
  transformSelection?: Props['transformSelection']
): T {
  return React.Children.map(children, (child) => {
    if (child?.['props']?.children?.type === OptionField) {
      child = child['props'].children
    }

    if (React.isValidElement(child) && child.type === OptionField) {
      const props = child.props as OptionFieldProps
      const title = props.title ?? props.children ?? <em>Untitled</em>
      const content = props.text ? [title, props.text] : title
      const selectedValue = transformSelection
        ? transformSelection(props)
        : undefined
      const selectedKey = String(props.value ?? '')

      const disabled = props.disabled
      const style = props.style
      const groupIndex = props.groupIndex

      return {
        selectedKey,
        selectedValue,
        content,
        disabled,
        style,
        groupIndex,
      }
    }

    // For other children, just show them as content
    if (child) {
      return {
        content: child,
      }
    }
  }) as T
}

function renderDropdownItems(
  data: Data,
  transformSelection?: Props['transformSelection']
) {
  return (
    data?.map((props) => {
      const { value, title, text, disabled, style, ...rest } = props
      return {
        selectedKey: value,
        content: (text ? [title, text] : title) || <em>Untitled</em>,
        selectedValue: transformSelection
          ? transformSelection(props)
          : undefined,
        disabled,
        style,
        ...rest,
      }
    }) || []
  )
}

withComponentMarkers(Selection, {
  _supportsSpacingProps: true,
})

export default Selection
