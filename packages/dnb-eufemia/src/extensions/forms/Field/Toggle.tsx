import React, { useContext, useCallback } from 'react'
import { Checkbox, ToggleButton, Button, Space } from '../../../components'
import classnames from 'classnames'
import ButtonRow from '../Layout/ButtonRow'
import FieldBlock from '../FieldBlock'
import { useInput } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'
import { forwardSpaceProps } from '../utils'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps &
  FieldProps<unknown> & {
    valueOn: unknown
    valueOff: unknown
    variant?: 'checkbox' | 'checkbox-button' | 'button' | 'buttons'
    textOn?: string
    textOff?: string
  }

export default function ToggleField(props: Props) {
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
    onChange,
  } = useInput(props)

  const handleCheckboxChange = useCallback(
    ({ checked }) => {
      onChange?.(checked ? valueOn : valueOff)
    },
    [onChange, valueOn, valueOff]
  )

  const setOn = useCallback(() => {
    if (value !== valueOn) {
      onChange?.(valueOn)
    }
  }, [onChange, value, valueOn])

  const setOff = useCallback(() => {
    if (value !== valueOff) {
      onChange?.(valueOff)
    }
  }, [onChange, value, valueOff])

  const cn = classnames('dnb-forms-field-boolean', className)

  const fieldBlockPropsWithoutLabel = {
    forId: id,
    className: cn,
    ...forwardSpaceProps(props),
    info,
    warning,
    error,
  }

  const fieldBlockProps = {
    ...fieldBlockPropsWithoutLabel,
    layout,
    label,
    labelDescription,
  }

  const isOn = value === valueOn

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
            on_change={handleCheckboxChange}
            {...forwardSpaceProps(props)}
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
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
          />
        </FieldBlock>
      )
    case 'buttons':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ButtonRow>
            <Button
              id={id}
              data-testid="field-boolean-option-yes"
              text={textOn ?? sharedContext?.translation.Forms.booleanYes}
              on_click={setOn}
              variant={isOn ? undefined : 'secondary'}
              status={error ? 'error' : undefined}
              disabled={disabled}
            />
            <Button
              id={id}
              data-testid="field-boolean-option-no"
              text={textOff ?? sharedContext?.translation.Forms.booleanNo}
              on_click={setOff}
              variant={isOn ? 'secondary' : undefined}
              status={error ? 'error' : undefined}
              disabled={disabled}
            />
          </ButtonRow>
          <Space bottom="x-small" />
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
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
          />
        </FieldBlock>
      )
  }
}
