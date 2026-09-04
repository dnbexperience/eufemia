import { useCallback, useContext, useMemo } from 'react'
import { Dropdown } from '../../../../components'
import { useFieldProps } from '../../hooks'
import type { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { clsx } from 'clsx'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import SharedContext from '../../../../shared/Context'
import { LOCALE } from '../../../../shared/defaults'
import { getInstallmentDayDisplayValue } from './InstallmentDayDisplay'
import type { DropdownAllProps } from '../../../../components/Dropdown'
import type {
  DrawerListChangeEvent,
  DrawerListEvent,
} from '../../../../fragments/DrawerList'

export type InstallmentDayValue = number | 'last'

export type FieldInstallmentDayProps = Omit<
  FieldProps<InstallmentDayValue, undefined | InstallmentDayValue>,
  'layout' | 'layoutOptions'
> & {
  /**
   * `small`, `medium` or `large` (default) for predefined standard widths, `stretch` for fill available width.
   */
  width?: FieldBlockWidth

  /**
   * The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).
   */
  size?: DropdownAllProps['size']

  /**
   * Constrains which days are available for selection. When not provided, days 1–28 are shown. If the current `value` is not among them, it is still shown and added to the list.
   */
  days?: number[]

  /**
   * If set to `true`, a "Last day of month" option is appended to the list. Defaults to `true`.
   */
  showLastDay?: boolean
}

function InstallmentDay(props: FieldInstallmentDayProps) {
  const {
    label: defaultLabel,
    errorRequired,
    lastDayLabel,
    dayDisplay,
    placeholder: defaultPlaceholder,
  } = useTranslation().InstallmentDay

  const { locale: contextLocale } = useContext(SharedContext)
  const locale = contextLocale || LOCALE

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...props.errorMessages,
    }),
    [errorRequired, props.errorMessages]
  )

  const preparedProps: FieldInstallmentDayProps = {
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
    width = 'large',
    size,
    days,
    showLastDay = true,
    placeholder = defaultPlaceholder,
    path,
    itemPath,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const dayList = useMemo(
    () => days ?? Array.from({ length: 28 }, (_, i) => i + 1),
    [days]
  )

  // The current numeric value may fall outside the available days (e.g. 29–31
  // from a stored record, or a value missing from a custom `days` array).
  // Track it separately so the option list is only rebuilt when this extra
  // day changes – not on every in-range value change.
  const extraDay =
    typeof value === 'number' && !dayList.includes(value)
      ? value
      : undefined

  // Also surface the last-day option whenever the value is 'last', even if
  // showLastDay is disabled. The value can come from stored data while the
  // prop is set in code, so the field must still be able to render it.
  const includeLastDay = showLastDay || value === 'last'

  const data = useMemo(() => {
    // Inject the out-of-range value in sorted order so it always renders in
    // the trigger and as a selectable option, instead of falling back to the
    // placeholder while a value is actually set.
    const numericDays =
      extraDay != null
        ? [...dayList, extraDay].sort((a, b) => a - b)
        : dayList

    const items = numericDays.map((day) => ({
      selectedKey: String(day),
      content: String(day),
      selectedValue: getInstallmentDayDisplayValue(day, {
        dayDisplay,
        lastDayLabel,
        locale,
      }),
    }))

    if (includeLastDay) {
      items.push({
        selectedKey: 'last',
        content: lastDayLabel,
        selectedValue: lastDayLabel,
      })
    }

    return items
  }, [dayList, extraDay, includeLastDay, lastDayLabel, dayDisplay, locale])

  const dropdownValue = useMemo(() => {
    if (value == null) {
      return undefined
    }
    return String(value)
  }, [value])

  const displayValue = useMemo(() => {
    return getInstallmentDayDisplayValue(value, {
      dayDisplay,
      lastDayLabel,
      locale,
    })
  }, [value, lastDayLabel, dayDisplay, locale])

  useMemo(() => {
    if (path || itemPath) {
      setDisplayValue(displayValue)
    }
  }, [displayValue, path, itemPath, setDisplayValue])

  const onChangeHandler = useCallback(
    ({ data: eventData }: DrawerListChangeEvent) => {
      if (eventData?.selectedKey == null) {
        return
      }
      const key = String(eventData.selectedKey)
      const val = key === 'last' ? 'last' : Number(key)
      handleChange(val)
    },
    [handleChange]
  )

  const toInstallmentValue = useCallback(
    (
      key: string | number | undefined
    ): InstallmentDayValue | undefined => {
      if (key == null) {
        return undefined
      }
      const str = String(key)
      return str === 'last' ? 'last' : Number(str)
    },
    []
  )

  const handleOpen = useCallback(
    ({ data: eventData }: DrawerListEvent) => {
      setHasFocus(
        true,
        typeof eventData === 'object' && eventData
          ? toInstallmentValue(eventData.selectedKey)
          : undefined
      )
    },
    [setHasFocus, toInstallmentValue]
  )

  const handleClose = useCallback(
    ({ data: eventData }: DrawerListEvent) => {
      setHasFocus(
        false,
        typeof eventData === 'object' && eventData
          ? toInstallmentValue(eventData.selectedKey)
          : undefined
      )
    },
    [setHasFocus, toInstallmentValue]
  )

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx('dnb-forms-field-installment-day', className),
    label: labelProp ?? defaultLabel,
    width: width === 'stretch' ? width : undefined,
    contentWidth: width ?? 'large',
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <Dropdown
        id={id}
        title={placeholder}
        data={data}
        value={dropdownValue}
        disabled={disabled}
        size={size}
        status={hasError ? 'error' : undefined}
        stretch
        onChange={onChangeHandler}
        onOpen={handleOpen}
        onClose={handleClose}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

withComponentMarkers(InstallmentDay, {
  _supportsSpacingProps: true,
})

export default InstallmentDay
