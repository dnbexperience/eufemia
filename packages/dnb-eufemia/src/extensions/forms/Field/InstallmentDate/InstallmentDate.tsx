import { useCallback, useMemo } from 'react'
import { Dropdown } from '../../../../components'
import { useFieldProps } from '../../hooks'
import type { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { clsx } from 'clsx'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import type {
  DrawerListChangeEvent,
  DrawerListEvent,
} from '../../../../fragments/DrawerList'

export type InstallmentDateValue = number | 'last'

export type FieldInstallmentDateProps = Omit<
  FieldProps<InstallmentDateValue, undefined | InstallmentDateValue>,
  'layout' | 'layoutOptions'
> & {
  /**
   * The width of the component. Defaults to `small`.
   */
  width?: FieldBlockWidth

  /**
   * The size of the Dropdown component.
   */
  size?: DropdownAllProps['size']

  /**
   * Constrains which days are available for selection. When not provided, days 1–28 are shown.
   */
  days?: number[]

  /**
   * If set to `true`, a "Last day of month" option is appended to the list. Defaults to `true`.
   */
  showLastDay?: boolean
}

function InstallmentDate(props: FieldInstallmentDateProps) {
  const {
    label: defaultLabel,
    errorRequired,
    lastDayLabel,
  } = useTranslation().InstallmentDate

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...props.errorMessages,
    }),
    [errorRequired, props.errorMessages]
  )

  const preparedProps: FieldInstallmentDateProps = {
    ...props,
    errorMessages,
  }

  const {
    id,
    className,
    label: labelProp,
    value,
    disabled,
    hasError,
    htmlAttributes,
    handleChange,
    setHasFocus,
    width = 'small',
    size,
    days,
    showLastDay,
  } = useFieldProps(preparedProps)

  const data = useMemo(() => {
    const dayList = days ?? Array.from({ length: 28 }, (_, i) => i + 1)
    const items = dayList.map((day) => ({
      selectedKey: String(day),
      content: String(day),
    }))

    if (showLastDay !== false) {
      items.push({
        selectedKey: 'last',
        content: lastDayLabel,
      })
    }

    return items
  }, [days, showLastDay, lastDayLabel])

  const dropdownValue = useMemo(() => {
    if (value == null) {
      return undefined
    }
    return String(value)
  }, [value])

  const onChangeHandler = useCallback(
    ({ data }: DrawerListChangeEvent) => {
      if (data?.selectedKey == null) {
        return
      }
      const key = String(data.selectedKey)
      const val = key === 'last' ? 'last' : Number(key)
      handleChange(val)
    },
    [handleChange]
  )

  const toInstallmentValue = useCallback(
    (
      key: string | number | undefined
    ): InstallmentDateValue | undefined => {
      if (key == null) {
        return undefined
      }
      const str = String(key)
      return str === 'last' ? 'last' : Number(str)
    },
    []
  )

  const handleOpen = useCallback(
    ({ data }: DrawerListEvent) => {
      setHasFocus(
        true,
        typeof data === 'object' && data
          ? toInstallmentValue(data.selectedKey)
          : undefined
      )
    },
    [setHasFocus, toInstallmentValue]
  )

  const handleClose = useCallback(
    ({ data }: DrawerListEvent) => {
      setHasFocus(
        false,
        typeof data === 'object' && data
          ? toInstallmentValue(data.selectedKey)
          : undefined
      )
    },
    [setHasFocus, toInstallmentValue]
  )

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx('dnb-forms-field-installment-date', className),
    label: labelProp ?? defaultLabel,
    width: width === 'stretch' ? width : undefined,
    contentWidth: width ?? 'small',
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <Dropdown
        id={id}
        data={data}
        value={dropdownValue}
        disabled={disabled}
        size={size}
        status={hasError ? 'error' : undefined}
        onChange={onChangeHandler}
        onOpen={handleOpen}
        onClose={handleClose}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

withComponentMarkers(InstallmentDate, {
  _supportsSpacingProps: true,
})

export default InstallmentDate
