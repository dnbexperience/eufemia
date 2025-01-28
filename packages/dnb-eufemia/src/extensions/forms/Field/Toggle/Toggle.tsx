import React, { useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { Checkbox, ToggleButton } from '../../../../components'
import ButtonRow from '../../Form/ButtonRow'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'
import useTranslation from '../../hooks/useTranslation'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateNo'

export type ToggleProps = {
  valueOn: unknown
  valueOff: unknown
  variant?: 'checkbox' | 'checkbox-button' | 'button' | 'buttons'
  textOn?: string
  textOff?: string
}

export type Props = Omit<FieldProps<unknown>, 'layout' | 'layoutOptions'> &
  ToggleProps

function Toggle(props: Props) {
  const translations = useTranslation().ToggleField

  const preparedProps: Props = {
    ...props,
    errorMessages: props.errorMessages,
  }

  const {
    id,
    className,
    valueOn,
    valueOff,
    variant,
    disabled,
    textOn,
    textOff,
    value,
    hasError,
    htmlAttributes,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const handleCheckboxChange = useCallback(
    ({ checked }) => {
      handleChange?.(checked ? valueOn : valueOff)
    },
    [handleChange, valueOn, valueOff]
  )
  const handleToggleChange = useCallback(
    ({ value }) => {
      handleChange?.(value === 'on' ? valueOn : valueOff)
    },
    [handleChange, valueOn, valueOff]
  )

  const cn = classnames('dnb-forms-field-toggle', className)

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: cn,
    disabled,
    ...pickSpacingProps(props),
  }

  const isOn = value === valueOn
  const isOff = value === valueOff

  useMemo(() => {
    const text = isOn ? textOn : textOff
    if (text) {
      setDisplayValue(props.path, text)
    }
  }, [isOn, props.path, setDisplayValue, textOff, textOn])

  const { label, labelSuffix, required } = props
  const labelWithItemNo = useIterateItemNo({
    label,
    labelSuffix,
    required,
  })

  switch (variant) {
    default:
    case 'checkbox':
      return (
        <FieldBlock {...fieldBlockProps} label={undefined}>
          <Checkbox
            id={id}
            className={cn}
            label={
              labelWithItemNo ??
              (isOn
                ? textOn ?? translations.yes
                : textOff ?? translations.no)
            }
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            onChange={handleCheckboxChange}
            {...htmlAttributes}
          />
        </FieldBlock>
      )
    case 'button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            text={
              isOn
                ? textOn ?? translations.yes
                : textOff ?? translations.no
            }
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
            {...htmlAttributes}
          />
        </FieldBlock>
      )
    case 'buttons':
      return (
        <FieldBlock {...fieldBlockProps} asFieldset>
          <ButtonRow bottom="x-small">
            <ToggleButtonGroupContext.Provider
              value={{
                value: isOn ? 'on' : isOff ? 'off' : null, // use "null" to reset the value
                onChange: handleToggleChange,
                status: hasError ? 'error' : undefined,
                disabled,
              }}
            >
              <ToggleButton
                text={textOn ?? translations.yes}
                value="on"
                {...htmlAttributes}
              />
              <ToggleButton
                text={textOff ?? translations.no}
                value="off"
                {...htmlAttributes}
              />
            </ToggleButtonGroupContext.Provider>
          </ButtonRow>
        </FieldBlock>
      )
    case 'checkbox-button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            variant="checkbox"
            text={
              isOn
                ? textOn ?? translations.yes
                : textOff ?? translations.no
            }
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
            {...htmlAttributes}
          />
        </FieldBlock>
      )
  }
}

Toggle._supportsSpacingProps = true
export default Toggle
