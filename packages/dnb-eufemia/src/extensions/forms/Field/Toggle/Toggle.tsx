import React, { useContext, useCallback } from 'react'
import { Checkbox, ToggleButton } from '../../../../components'
import classnames from 'classnames'
import ButtonRow from '../../Form/ButtonRow'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { Context } from '../../DataContext'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'

export type Props = FieldProps<unknown> & {
  valueOn: unknown
  valueOff: unknown
  variant?: 'checkbox' | 'checkbox-button' | 'button' | 'buttons'
  textOn?: string
  textOff?: string
}

function Toggle(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.boolean

  const preparedProps: Props = {
    ...props,
    errorMessages: props.errorMessages,
  }

  const {
    id,
    className,
    valueOn,
    valueOff,
    layout,
    variant,
    disabled,
    label,
    labelDescription,
    textOn,
    textOff,
    value,
    info,
    warning,
    error,
    hasError,
    htmlAttributes,
    handleChange,
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

  const fieldBlockPropsWithoutLabel = {
    forId: id,
    className: cn,
    ...pickSpacingProps(props),
    info,
    warning,
    error,
    disabled,
  }

  const fieldBlockProps = {
    ...fieldBlockPropsWithoutLabel,
    layout,
    label,
    labelDescription,
    disabled,
  }

  const isOn = value === valueOn
  const isOff = value === valueOff

  switch (variant) {
    default:
    case 'checkbox':
      return (
        <FieldBlock {...fieldBlockPropsWithoutLabel}>
          <Checkbox
            id={id}
            className={cn}
            label={label}
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            on_change={handleCheckboxChange}
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
