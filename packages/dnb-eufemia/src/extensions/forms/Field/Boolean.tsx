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
  FieldProps<boolean> & {
    variant?: 'checkbox' | 'toggle-button' | 'toggle-checkbox' | 'buttons'
    trueText?: string
    falseText?: string
  }

export default function BooleanInput(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    id,
    className,
    'data-testid': dataTestId,
    layout,
    variant,
    disabled,
    label,
    labelDescription,
    trueText,
    falseText,
    path,
    value,
    info,
    warning,
    error,
    onChange,
  } = useInput(props)

  const handleChange = useCallback(
    ({ checked }) => {
      onChange?.(checked)
    },
    [onChange]
  )

  const setTrue = useCallback(() => {
    onChange?.(true)
  }, [onChange])

  const setFalse = useCallback(() => {
    onChange?.(false)
  }, [onChange])

  const cn = classnames('dnb-forms-field-boolean', className)

  const fieldBlockProps = {
    forId: id,
    className: cn,
    ...forwardSpaceProps(props),
    layout,
    label,
    labelDescription,
    info,
    warning,
    error,
  }

  switch (variant) {
    default:
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          className={cn}
          data-testid={dataTestId ?? path ?? 'field-boolean'}
          label={label}
          checked={value}
          disabled={disabled}
          on_change={handleChange}
          status={error?.message}
          {...forwardSpaceProps(props)}
        />
      )
    case 'toggle-button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            data-testid={dataTestId ?? path ?? 'field-boolean'}
            text={
              value
                ? trueText ?? sharedContext?.translation.Forms.booleanYes
                : falseText ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={value}
            disabled={disabled}
            value={value ? 'true' : 'false'}
            on_change={handleChange}
          />
        </FieldBlock>
      )
    case 'toggle-checkbox':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            data-testid={dataTestId ?? path ?? 'field-boolean'}
            variant="checkbox"
            text={
              value
                ? trueText ?? sharedContext?.translation.Forms.booleanYes
                : falseText ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={value}
            disabled={disabled}
            value={value ? 'true' : 'false'}
            on_change={handleChange}
          />
        </FieldBlock>
      )
    case 'buttons': {
      return (
        <FieldBlock {...fieldBlockProps}>
          <ButtonRow data-testid={dataTestId ?? path ?? 'field-boolean'}>
            <Button
              id={id}
              data-testid="field-boolean-option-yes"
              text={
                trueText ?? sharedContext?.translation.Forms.booleanYes
              }
              on_click={setTrue}
              variant={value === true ? undefined : 'secondary'}
              status={error ? 'error' : undefined}
              disabled={disabled}
            />
            <Button
              id={id}
              data-testid="field-boolean-option-no"
              text={
                falseText ?? sharedContext?.translation.Forms.booleanNo
              }
              on_click={setFalse}
              variant={value === false ? undefined : 'secondary'}
              status={error ? 'error' : undefined}
              disabled={disabled}
            />
          </ButtonRow>
          <Space bottom="x-small" />
        </FieldBlock>
      )
    }
  }
}
