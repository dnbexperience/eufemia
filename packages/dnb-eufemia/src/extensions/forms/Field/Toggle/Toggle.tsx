import React, { useCallback, useMemo, useRef } from 'react'
import clsx from 'clsx'
import {
  Checkbox,
  Switch,
  ToggleButton,
  Radio,
} from '../../../../components'
import ButtonRow from '../../Form/ButtonRow'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import ToggleButtonGroupContext from '../../../../components/toggle-button/ToggleButtonGroupContext'
import useTranslation from '../../hooks/useTranslation'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateItemNo'
import type {
  CheckboxProps,
  OnChangeParams,
  OnClickParams,
} from '../../../../components/Checkbox'
import type { ToggleButtonProps } from '../../../../components/ToggleButton'
import { SwitchOnChangeParams } from '../../../../components/Switch'
import HelpButtonInline from '../../../../components/help-button/HelpButtonInline'

export type ToggleProps = {
  valueOn: unknown
  valueOff: unknown
  variant?:
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'checkbox-button'
    | 'button'
    | 'buttons'
  textOn?: string
  textOff?: string
  size?: ToggleButtonProps['size'] | CheckboxProps['size']

  /**
   * Checkbox props
   */
  onClick?: (
    value: unknown,
    params: { event: React.MouseEvent<HTMLInputElement> }
  ) => void
}

export type Props = Omit<FieldProps<unknown>, 'layout' | 'layoutOptions'> &
  ToggleProps

function Toggle(props: Props) {
  const translations = useTranslation().ToggleField

  const preparedProps: Props = {
    ...props,
    errorMessages: props.errorMessages,
  }
  const { help } = props

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
    size,
    hasError,
    htmlAttributes,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const helpButton =
    help && (variant === 'checkbox' || variant === 'switch') ? (
      <HelpButtonInline contentId={`${id}-help`} help={help} />
    ) : undefined
  const hideHelpButton = Boolean(helpButton)

  const preventChangeRef = useRef(false)

  const onClick = preparedProps?.onClick
  const handleClick = useCallback(
    (args: OnClickParams) => {
      const preventDefault = () => {
        preventChangeRef.current = true
        args.preventDefault?.()
      }

      if (preventChangeRef.current) {
        args.checked = !args.checked
        preventChangeRef.current = false
      }

      const event = {
        ...args,
        preventDefault,
      }
      onClick?.(args.checked ? valueOn : valueOff, event)
    },
    [onClick, valueOff, valueOn]
  )
  const handleCheckboxChange = useCallback(
    (args: OnChangeParams) => {
      handleChange?.(args.checked ? valueOn : valueOff, args)
    },
    [handleChange, valueOn, valueOff]
  )
  const handleToggleChange = useCallback(
    ({ value }) => {
      handleChange?.(value === 'on' ? valueOn : valueOff)
    },
    [handleChange, valueOn, valueOff]
  )
  const handleSwitchChange = useCallback(
    (args: SwitchOnChangeParams) => {
      handleChange?.(args.checked ? valueOn : valueOff, args)
    },
    [handleChange, valueOn, valueOff]
  )

  const cn = clsx('dnb-forms-field-toggle', className)

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: cn,
    disabled,
    hideHelpButton,
    ...pickSpacingProps(props),
  }

  const isOn = value === valueOn
  const isOff = value === valueOff

  useMemo(() => {
    const text = isOn ? textOn : textOff
    if (text) {
      setDisplayValue(text)
    }
  }, [isOn, setDisplayValue, textOff, textOn])

  const { label, labelSuffix, required, labelSrOnly } = props
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
            labelSrOnly={labelSrOnly}
            checked={isOn}
            disabled={disabled}
            size={size !== 'small' ? size : undefined}
            status={hasError ? 'error' : undefined}
            onChange={handleCheckboxChange}
            onClick={handleClick}
            suffix={helpButton}
            {...htmlAttributes}
          />
        </FieldBlock>
      )
    case 'switch':
      return (
        <FieldBlock {...fieldBlockProps} label={undefined}>
          <Switch
            id={id}
            className={cn}
            label={
              labelWithItemNo ??
              (isOn
                ? textOn ?? translations.yes
                : textOff ?? translations.no)
            }
            labelSrOnly={labelSrOnly}
            checked={isOn}
            disabled={disabled}
            size={size !== 'small' ? size : undefined}
            status={hasError ? 'error' : undefined}
            onChange={handleSwitchChange}
            onClick={handleClick}
            suffix={helpButton}
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
            size={size}
            onChange={handleCheckboxChange}
            role="checkbox"
            {...htmlAttributes}
          />
        </FieldBlock>
      )
    case 'buttons':
      return (
        <FieldBlock
          {...fieldBlockProps}
          asFieldset={Boolean(label)}
          fieldsetRole="radiogroup"
        >
          <ButtonRow bottom="x-small">
            <ToggleButton.Group>
              <ToggleButtonGroupContext.Provider
                value={{
                  value: isOn ? 'on' : isOff ? 'off' : null, // use "null" to reset the value
                  onChange: handleToggleChange,
                  status: hasError ? 'error' : undefined,
                  disabled,
                  size,
                }}
              >
                <ToggleButton
                  text={textOn ?? translations.yes}
                  value="on"
                  role="radio"
                  {...htmlAttributes}
                />
                <ToggleButton
                  text={textOff ?? translations.no}
                  value="off"
                  role="radio"
                  {...htmlAttributes}
                />
              </ToggleButtonGroupContext.Provider>
            </ToggleButton.Group>
          </ButtonRow>
        </FieldBlock>
      )
    case 'radio':
      return (
        <FieldBlock
          {...fieldBlockProps}
          asFieldset={Boolean(label)}
          fieldsetRole="radiogroup"
        >
          <Radio.Group
            value={isOn ? 'on' : isOff ? 'off' : null}
            onChange={handleToggleChange}
            status={hasError ? 'error' : undefined}
            disabled={disabled}
            size={size !== 'small' ? size : 'default'} // Radio does not support "small" size
          >
            <Radio
              label={textOn ?? translations.yes}
              value="on"
              status={hasError ? 'error' : undefined}
              {...htmlAttributes}
            />
            <Radio
              label={textOff ?? translations.no}
              value="off"
              status={hasError ? 'error' : undefined}
              {...htmlAttributes}
            />
          </Radio.Group>
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
            size={size}
            onChange={handleCheckboxChange}
            role="checkbox"
            {...htmlAttributes}
          />
        </FieldBlock>
      )
  }
}

Toggle._supportsSpacingProps = true
export default Toggle
