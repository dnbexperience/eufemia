import React, { useMemo, useCallback } from 'react'
import classnames from 'classnames'
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
import OptionField, { Props as OptionFieldProps } from '../Option'
import { useFieldProps } from '../../hooks'
import { checkForError, ReturnAdditional } from '../../hooks/useFieldProps'
import { pickSpacingProps } from '../../../../components/flex/utils'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import { FieldProps, Path } from '../../types'
import type { FormStatusText } from '../../../../components/FormStatus'
import type { AutocompleteAllProps } from '../../../../components/Autocomplete'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import { HelpProps } from '../../../../components/help-button/HelpButtonInline'
import { DrawerListProps } from '../../../../fragments/DrawerList'
import {
  AssertNoMissing,
  convertCamelCasePropsToSnakeCase,
  KeysWithUnderscore,
  ToCamelCase,
} from '../../../../shared/helpers/withCamelCaseProps'
import useDataValue from '../../hooks/useDataValue'
import { FormError } from '../../utils'
import type { RadioProps } from '../../../../components/Radio'
import type { ToggleButtonProps } from '../../../../components/ToggleButton'
import type { RadioGroupProps } from '../../../../components/radio/RadioGroup'
import type { ToggleButtonGroupProps } from '../../../../components/toggle-button/ToggleButtonGroup'
import {
  DrawerListProperties,
  DrawerListEvents,
} from '../../../../fragments/drawer-list/DrawerListDocs'
import {
  AutocompleteEvents,
  AutocompleteProperties,
} from '../../../../components/autocomplete/AutocompleteDocs'
import {
  DropdownProperties,
  DropdownEvents,
} from '../../../../components/dropdown/DropdownDocs'

type IOption = {
  title: string | React.ReactNode
  value: number | string
  status: FormStatusText
}
export type Data = Array<{
  value: string
  title: React.ReactNode
  text?: React.ReactNode
  disabled?: boolean
  style?: React.CSSProperties
}>

export type Props = FieldProps<IOption['value']> & {
  /**
   * Defines the variant of the component.
   * Default: dropdown
   */
  variant?: 'dropdown' | 'autocomplete' | 'radio' | 'radio-list' | 'button'

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
   * Autocomplete specific props
   */
  autocompleteProps?: ToCamelCase<AutocompleteAllProps>

  /**
   * Dropdown specific props
   */
  dropdownProps?: ToCamelCase<DropdownAllProps>

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
  children?: React.ReactNode
}

const validDrawerListProps = [
  // DrawerList Properties
  'default_value',
  'triangle_position',
  'label_direction',
  'prevent_selection',
  'prevent_close',
  'keep_open',
  'independent_width',
  'fixed_position',
  'enable_body_lock',
  'skip_keysearch',
  'ignore_events',
  'align_drawer',
  'list_class',
  'portal_class',
  'no_scroll_animation',
  'no_animation',
  'skip_portal',
  'min_height',
  'max_height',
  'page_offset',
  'observer_element',
  'cache_hash',
  'wrapper_element',
  'options_render',

  // DrawerList Events
  'on_pre_change',
  'on_change',
  'on_select',
  'on_show',
  'on_hide',
] as const satisfies ReadonlyArray<
  KeysWithUnderscore<typeof DrawerListProperties & typeof DrawerListEvents>
>

const validAutocompleteProps = [
  // Autocomplete Properties
  'align_autocomplete',
  'aria_live_options',
  'disable_filter',
  'disable_highlighting',
  'disable_reorder',
  'drawer_class',
  'icon_position',
  'icon_size',
  'indicator_label',
  'input_element',
  'input_icon',
  'input_ref',
  'input_value',
  'keep_selection',
  'keep_value',
  'keep_value_and_selection',
  'label_direction',
  'label_sr_only',
  'no_options',
  'open_on_focus',
  'prevent_selection',
  'search_in_word_index',
  'search_numbers',
  'selected_sr',
  'show_all',
  'show_clear_button',
  'show_options_sr',
  'show_submit_button',
  'skip_portal',
  'status_props',
  'status_state',
  'submit_button_icon',
  'submit_button_title',
  'submit_element',
  'triangle_position',

  // Autocomplete Events
  'on_type',
  'on_focus',
  'on_blur',
  'on_change',
  'on_select',
  'on_show',
  'on_hide',
] as const satisfies ReadonlyArray<
  KeysWithUnderscore<
    typeof AutocompleteProperties & typeof AutocompleteEvents
  >
>
export const listOfValidAutocompleteProps = [
  ...(validAutocompleteProps satisfies AssertNoMissing<
    typeof validAutocompleteProps,
    typeof AutocompleteProperties & typeof AutocompleteEvents
  >),
  ...(validDrawerListProps satisfies AssertNoMissing<
    typeof validDrawerListProps,
    typeof DrawerListProperties & typeof DrawerListEvents
  >),
]

const validDropdownProps = [
  // From DropdownProperties
  'icon_size',
  'icon_position',
  'triangle_position',
  'open_on_focus',
  'prevent_selection',
  'action_menu',
  'more_menu',
  'align_dropdown',
  'independent_width',
  'skip_portal',
  'status_state',
  'status_props',
  'label_direction',
  'label_sr_only',
  'trigger_element',

  // From DropdownEvents
  'on_change',
  'on_select',
  'on_show',
  'on_hide',
] as const satisfies ReadonlyArray<
  KeysWithUnderscore<typeof DropdownProperties & typeof DropdownEvents>
>
export const listOfValidDropdownProps = [
  ...(validDropdownProps satisfies AssertNoMissing<
    typeof validDropdownProps,
    typeof DropdownProperties & typeof DropdownEvents
  >),
  ...(validDrawerListProps satisfies AssertNoMissing<
    typeof validDrawerListProps,
    typeof DrawerListProperties & typeof DrawerListEvents
  >),
]

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
    width = 'large',
    htmlAttributes,
    setHasFocus,
    handleChange,
    setDisplayValue,
    transformSelection,
    data,
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

  const handleDrawerListChange = useCallback(
    ({ data, value }) => {
      const selectedKey = data?.selectedKey ?? value
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
    case 'radio-list':
    case 'button': {
      const Component = (
        variant === 'radio' || variant === 'radio-list'
          ? Radio
          : ToggleButton
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
            setDisplayValue(label)
          }
        },
      })

      const additionalFieldBlockProps: FieldBlockProps = {
        asFieldset: React.Children.count(items) > 1,
      }
      if (!size) {
        additionalFieldBlockProps.labelHeight = 'small'
      }
      if (variant === 'radio-list') {
        additionalFieldBlockProps.contentWidth = width
      }

      return (
        <FieldBlock {...fieldBlockProps} {...additionalFieldBlockProps}>
          <Component.Group
            role="radiogroup"
            size={size}
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
      const data = renderDropdownItems(dataList, transformSelection)
        .concat(makeOptions(children, transformSelection))
        .filter(Boolean)
      const displayValue = data.find((item) => item.selectedKey === value)
        ?.content
      setDisplayValue(displayValue)

      const sharedProps: AutocompleteAllProps & DropdownAllProps = {
        id,
        list_class: 'dnb-forms-field-selection__list',
        portal_class: 'dnb-forms-field-selection__portal',
        title: placeholder,
        value: String(value ?? ''),
        status:
          (hasError || checkForError([error, info, warning])) && 'error',
        disabled,
        ...htmlAttributes,
        data,
        size,
        on_change: handleDrawerListChange,
        on_show: handleShow,
        on_hide: handleHide,
        stretch: true,
      }

      const specificFieldBlockProps: FieldBlockProps = {
        contentWidth: width,
      }

      return (
        <FieldBlock {...fieldBlockProps} {...specificFieldBlockProps}>
          {variant === 'autocomplete' ? (
            <Autocomplete
              {...sharedProps}
              {...(autocompleteProps
                ? (convertCamelCasePropsToSnakeCase(
                    Object.freeze(autocompleteProps),
                    listOfValidAutocompleteProps
                  ) as AutocompleteAllProps)
                : null)}
              value={
                autocompleteProps?.preventSelection ? undefined : value
              }
              on_type={onTypeAutocompleteHandler}
              data={
                !props.data &&
                !props.dataPath &&
                autocompleteProps?.mode === 'async'
                  ? undefined
                  : data
              }
              selectall
            />
          ) : (
            <Dropdown
              {...sharedProps}
              {...(dropdownProps
                ? (convertCamelCasePropsToSnakeCase(
                    dropdownProps,
                    listOfValidDropdownProps
                  ) as DropdownAllProps)
                : null)}
            />
          )}
        </FieldBlock>
      )
    }
  }
}

type OptionProps = React.ComponentProps<
  React.FC<{
    value: Props['value']
    error: Error | FormError | undefined
    help: HelpProps
    title: React.ReactNode
    children: React.ReactNode
    size?: ToggleButtonProps['size'] | RadioProps['size']
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
    const { value, title, children, error, help, size, ...rest } = props

    const label = title ?? children
    const suffix = help ? (
      <HelpButton size="small" title={convertJsxToString(help.title)}>
        {help.content}
      </HelpButton>
    ) : undefined

    iterateOverItems?.({ value, label })

    const Component = (
      variant === 'radio' || variant === 'radio-list'
        ? Radio
        : ToggleButton
    ) as typeof Radio & typeof ToggleButton

    return (
      <Component
        id={optionsCount === 1 ? id : undefined}
        key={`option-${i}-${id}`}
        label={
          variant === 'radio' || variant === 'radio-list'
            ? label
            : undefined
        }
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
          return React.cloneElement(child, child.props, nestedChildren)
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
      const selected_value = transformSelection
        ? transformSelection(props)
        : undefined
      const selectedKey = String(props.value ?? '')
      const disabled = props.disabled
      const style = props.style

      return { selectedKey, selected_value, content, disabled, style }
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
      const { value, title, text, disabled, style } = props
      return {
        selectedKey: value,
        content: (text ? [title, text] : title) || <em>Untitled</em>,
        selected_value: transformSelection
          ? transformSelection(props)
          : undefined,
        disabled,
        style,
      }
    }) || []
  )
}

Selection._supportsSpacingProps = true
export default Selection
