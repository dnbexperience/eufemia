import { useCallback, useMemo } from 'react'
import { Dropdown, ToggleButton } from '../../../../components'
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
import type {
  ToggleButtonGroupChangeEvent,
  ToggleButtonGroupProps,
} from '../../../../components/toggle-button/ToggleButtonGroup'

export type InstallmentDayValue = number | 'last'

export type FieldInstallmentDayProps = Omit<
  FieldProps<InstallmentDayValue, undefined | InstallmentDayValue>,
  'layout' | 'layoutOptions'
> & {
  /**
   * The width of the component. Defaults to `small`.
   */
  width?: FieldBlockWidth

  /**
   * The size of the component.
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

  /**
   * The display variant. `'dropdown'` renders a dropdown menu, `'tiles'` renders a grid of toggle buttons. Defaults to `'dropdown'`.
   */
  variant?: 'dropdown' | 'tiles'
}

function InstallmentDay(props: FieldInstallmentDayProps) {
  const {
    label: defaultLabel,
    errorRequired,
    lastDayLabel,
  } = useTranslation().InstallmentDay

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
    width = 'small',
    size,
    days,
    showLastDay,
    variant = 'dropdown',
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

  const toInstallmentValue = useCallback(
    (
      key: string | number | undefined | null
    ): InstallmentDayValue | undefined => {
      if (key == null || key === '') {
        return undefined
      }
      const str = String(key)
      return str === 'last' ? 'last' : Number(str)
    },
    []
  )

  const onChangeHandler = useCallback(
    ({ data }: DrawerListChangeEvent) => {
      const val = toInstallmentValue(data?.selectedKey)
      if (val == null) {
        return
      }
      handleChange(val)
    },
    [handleChange, toInstallmentValue]
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

  const onTilesChangeHandler = useCallback(
    ({ value: selectedValue }: ToggleButtonGroupChangeEvent) => {
      if (selectedValue == null || typeof selectedValue === 'object') {
        return
      }
      const val = toInstallmentValue(selectedValue)
      if (val == null) {
        return
      }
      handleChange(val)
    },
    [handleChange, toInstallmentValue]
  )

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx('dnb-forms-field-installment-day', className),
    label: labelProp ?? defaultLabel,
    ...pickSpacingProps(props),
  }

  if (variant === 'tiles') {
    return (
      <FieldBlock
        {...fieldBlockProps}
        width={width === 'stretch' ? width : undefined}
        asFieldset={data.length > 1}
        fieldsetRole={data.length > 1 ? 'group' : undefined}
      >
        <ToggleButton.Group
          layoutDirection="row"
          value={String(value ?? '')}
          disabled={disabled}
          size={size as ToggleButtonGroupProps['size']}
          onChange={onTilesChangeHandler}
        >
          {data.map((item) => (
            <ToggleButton
              key={`day-${item.selectedKey}`}
              text={item.content}
              value={item.selectedKey}
              role="radio"
              status={hasError ? 'error' : undefined}
              {...htmlAttributes}
            />
          ))}
        </ToggleButton.Group>
      </FieldBlock>
    )
  }

  return (
    <FieldBlock
      {...fieldBlockProps}
      width={width === 'stretch' ? width : undefined}
      contentWidth={width ?? 'small'}
    >
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

withComponentMarkers(InstallmentDay, {
  _supportsSpacingProps: true,
})

export default InstallmentDay
