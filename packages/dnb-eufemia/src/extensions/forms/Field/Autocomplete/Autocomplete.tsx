import React, { useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { makeUniqueId } from '../../../../shared/component-helper'
import { Autocomplete } from '../../../../components'
import { Props as OptionFieldProps } from '../Option'
import { useFieldProps } from '../../hooks'
import { checkForError } from '../../hooks/useFieldProps'
import { pickSpacingProps } from '../../../../components/flex/utils'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import { FieldProps, Path } from '../../types'
import type { FormStatusText } from '../../../../components/FormStatus'
import type {
  AutocompleteAllProps,
  AutocompleteProps,
} from '../../../../components/Autocomplete'
import {
  convertCamelCaseProps,
  ToCamelCase,
} from '../../../../shared/helpers/withCamelCaseProps'
import useDataValue from '../../hooks/useDataValue'
import { makeOptions, renderDropdownItems } from '../Selection/Selection'

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

export type Props = Omit<FieldProps<IOption['value']>, 'autoComplete'> & {
  /**
   * The width of the component.
   * Default: large
   */
  width?: FieldBlockWidth

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
   * The content of the component.
   */
  children?: React.ReactNode
} & Pick<
    ToCamelCase<AutocompleteProps>,
    | 'onType'
    | 'mode'
    | 'disableFilter'
    | 'keepValue'
    | 'showSubmitButton'
    | 'submitButtonTitle'
  >

function AutocompleteField(props: Props) {
  const clearValue = useMemo(() => `clear-option-${makeUniqueId()}`, [])

  const {
    id,
    className,
    placeholder,
    value,
    info,
    warning,
    error,
    hasError,
    disabled,
    emptyValue,
    width = 'large',
    htmlAttributes,
    setHasFocus,
    handleChange,
    setDisplayValue,
    transformSelection,
    onType,
    data,
    dataPath,
    children,
    additionalArgs,

    // - Autocomplete specific props
    mode,
    disableFilter,
    keepValue,
    showSubmitButton,
    submitButtonTitle,
  } = useFieldProps(props)

  const { getValueByPath } = useDataValue()
  let dataList = data
  if (dataPath) {
    dataList = getValueByPath(dataPath)
  }

  const onChangeHandler = useCallback(
    (event) => {
      const { value, data } = event
      const selectedKey = data?.selectedKey ?? value
      handleChange(
        !selectedKey || selectedKey === clearValue
          ? emptyValue
          : selectedKey,
        { data }
      )
    },
    [handleChange, emptyValue, clearValue]
  )

  const onTypeHandler = useCallback(
    (event) => {
      const { value } = event
      if (typeof onType === 'function') {
        onType(value === undefined ? emptyValue : value, {
          ...event,
          ...additionalArgs,
        })
      }
    },
    [additionalArgs, emptyValue, onType]
  )

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

  const cn = classnames('dnb-forms-field-autocomplete', className)

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: cn,
    disableStatusSummary: true,
    ...pickSpacingProps(props),
  }

  {
    const data =
      dataList || children
        ? renderDropdownItems(dataList, transformSelection)
            .concat(makeOptions(children, transformSelection))
            .filter(Boolean)
        : undefined
    const displayValue = data?.find((item) => item.selectedKey === value)
      ?.content
    setDisplayValue(displayValue)

    const status =
      (hasError || checkForError([error, info, warning])) && 'error'
    const sharedProps: AutocompleteAllProps = {
      id,
      list_class: 'dnb-forms-field-autocomplete__list',
      portal_class: 'dnb-forms-field-autocomplete__portal',
      title: placeholder,
      value: String(value ?? ''),
      stretch: true,
      status,
      disabled,
      data,
      ...htmlAttributes,

      // - Event handlers
      on_change: onChangeHandler,
      on_type: onTypeHandler,
      on_show: handleShow,
      on_hide: handleHide,

      // - Autocomplete specific props
      ...convertCamelCaseProps({
        mode,
        disableFilter,
        keepValue,
        showSubmitButton,
        submitButtonTitle,
      }),
    }

    const specificFieldBlockProps: FieldBlockProps = {
      width: width === 'stretch' ? width : undefined,
      contentWidth: width !== false ? width : undefined,
    }

    return (
      <FieldBlock {...fieldBlockProps} {...specificFieldBlockProps}>
        <Autocomplete {...sharedProps} />
      </FieldBlock>
    )
  }
}

AutocompleteField._supportsSpacingProps = true
export default AutocompleteField
