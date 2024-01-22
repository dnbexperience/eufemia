import React, { useContext, useCallback } from 'react'
import { Checkbox, ToggleButton } from '../../../../components'
import classnames from 'classnames'
import ButtonRow from '../../Form/ButtonRow'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'

export type Props = FieldProps<unknown> & {
  valueOn: unknown
  valueOff: unknown
  variant?: 'checkbox' | 'checkbox-button' | 'button' | 'buttons'
  textOn?: string
  textOff?: string
}

function Toggle(props: Props) {
  const sharedContext = useContext(SharedContext)
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
    ariaAttributes,
    handleChange,
  } = useDataValue(props)

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
            {...ariaAttributes}
            {...pickSpacingProps(props)}
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
                ? textOn ?? sharedContext?.translation.Forms.booleanYes
                : textOff ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
            {...ariaAttributes}
          />
        </FieldBlock>
      )
    case 'buttons':
      return (
        <FieldBlock {...fieldBlockProps} asFieldset>
          <ButtonRow bottom="x-small">
            <ToggleButtonGroupContext.Provider
              value={{
                value: isOn ? 'on' : isOff ? 'off' : undefined,
                onChange: handleToggleChange,
                status: hasError ? 'error' : undefined,
                disabled,
              }}
            >
              <ToggleButton
                text={
                  textOn ?? sharedContext?.translation.Forms.booleanYes
                }
                value="on"
                {...ariaAttributes}
              />
              <ToggleButton
                text={
                  textOff ?? sharedContext?.translation.Forms.booleanNo
                }
                value="off"
                {...ariaAttributes}
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
                ? textOn ?? sharedContext?.translation.Forms.booleanYes
                : textOff ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={isOn}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
            {...ariaAttributes}
          />
        </FieldBlock>
      )
  }
}

Toggle._supportsSpacingProps = true
export default Toggle
