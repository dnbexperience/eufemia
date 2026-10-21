import { useCallback, useMemo } from 'react'
import type { MouseEvent } from 'react'
import { clsx } from 'clsx'
import { Checkbox, Switch, Chip, Radio } from '../../../../components'
import ChipGroupContext from '../../../../components/chip/ChipGroupContext'
import ButtonRow from '../../Form/ButtonRow'
import type { FieldBlockProps } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import type { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import mergeProps from '../../../../shared/helpers/mergeProps'
import useTranslation from '../../hooks/useTranslation'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateItemNo'
import type {
  CheckboxProps,
  CheckboxOnChangeParams,
  CheckboxOnClickParams,
} from '../../../../components/Checkbox'
import type {
  ChipProps,
  ChipChangeEvent,
} from '../../../../components/Chip'
import type { SwitchOnChangeParams } from '../../../../components/Switch'
import HelpButtonInline from '../../../../components/help-button/HelpButtonInline'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ToggleProps = {
  valueOn: unknown
  valueOff: unknown
  variant?:
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'checkbox-button'
    | 'radio-button'
    | 'button'
    | 'buttons'
  textOn?: string
  textOff?: string
  /**
   * The size of the toggle. Can be `default`, `medium` or `large`. The button variants also support `small`.
   */
  size?: ChipProps['size'] | CheckboxProps['size']

  /**
   * Will be called on click.
   */
  onClick?: (
    value: unknown,
    params: { event: MouseEvent<HTMLInputElement> }
  ) => void
}

export type FieldToggleProps = Omit<
  FieldProps<unknown>,
  'layout' | 'layoutOptions'
> &
  ToggleProps

function Toggle(props: FieldToggleProps) {
  const translations = useTranslation().ToggleField

  const preparedProps: FieldToggleProps = {
    ...props,
    errorMessages: props.errorMessages,
  }
  const { help } = props

  const {
    fieldBlockProps: sharedFieldBlockProps,
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

  const onClick = preparedProps?.onClick
  const handleClick = useCallback(
    (args: CheckboxOnClickParams) => {
      const preventDefault = () => {
        args.preventDefault?.()
      }

      const checked = value === valueOn
      const event = {
        ...args,
        checked,
        preventDefault,
      }
      onClick?.(checked ? valueOn : valueOff, event)
    },
    [onClick, value, valueOff, valueOn]
  )
  const handleCheckboxChange = useCallback(
    (args: CheckboxOnChangeParams | ChipChangeEvent) => {
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
    ...sharedFieldBlockProps,
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
            label={
              labelWithItemNo ??
              (isOn
                ? (textOn ?? translations.yes)
                : (textOff ?? translations.no))
            }
            labelSrOnly={labelSrOnly}
            checked={isOn}
            disabled={disabled}
            size={size !== 'small' ? size : undefined}
            status={hasError ? 'error' : undefined}
            suffix={helpButton}
            {...mergeProps(
              {
                className: cn,
                onChange: handleCheckboxChange,
                onClick: handleClick,
              },
              htmlAttributes
            )}
          />
        </FieldBlock>
      )
    case 'switch':
      return (
        <FieldBlock {...fieldBlockProps} label={undefined}>
          <Switch
            id={id}
            label={
              labelWithItemNo ??
              (isOn
                ? (textOn ?? translations.yes)
                : (textOff ?? translations.no))
            }
            labelSrOnly={labelSrOnly}
            checked={isOn}
            disabled={disabled}
            size={size !== 'small' ? size : undefined}
            status={hasError ? 'error' : undefined}
            suffix={helpButton}
            {...mergeProps(
              {
                className: cn,
                onChange: handleSwitchChange,
                onClick: handleClick,
              },
              htmlAttributes
            )}
          />
        </FieldBlock>
      )
    case 'button':
      return (
        <ChipGroupContext value={undefined}>
          <FieldBlock {...fieldBlockProps}>
            <Chip
              id={id}
              text={
                isOn
                  ? (textOn ?? translations.yes)
                  : (textOff ?? translations.no)
              }
              checked={isOn}
              disabled={disabled}
              status={hasError ? 'error' : undefined}
              value={value ? 'true' : 'false'}
              size={size}
              {...mergeProps(
                { onChange: handleCheckboxChange },
                htmlAttributes
              )}
            />
          </FieldBlock>
        </ChipGroupContext>
      )
    case 'buttons':
    case 'radio-button':
      return (
        <FieldBlock
          {...fieldBlockProps}
          asFieldset={Boolean(label)}
          fieldsetRole="radiogroup"
        >
          <ButtonRow bottom="x-small">
            <Chip.Group
              attributes={label ? { role: 'presentation' } : undefined}
              value={isOn ? 'on' : isOff ? 'off' : undefined}
              onChange={handleToggleChange}
              status={hasError ? 'error' : undefined}
              disabled={disabled}
              size={size}
            >
              <Chip
                variant={variant === 'radio-button' ? 'radio' : undefined}
                text={textOn ?? translations.yes}
                value="on"
                {...htmlAttributes}
              />
              <Chip
                variant={variant === 'radio-button' ? 'radio' : undefined}
                text={textOff ?? translations.no}
                value="off"
                {...htmlAttributes}
              />
            </Chip.Group>
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
        <ChipGroupContext value={undefined}>
          <FieldBlock {...fieldBlockProps}>
            <Chip
              id={id}
              variant="checkbox"
              text={
                isOn
                  ? (textOn ?? translations.yes)
                  : (textOff ?? translations.no)
              }
              checked={isOn}
              disabled={disabled}
              status={hasError ? 'error' : undefined}
              value={value ? 'true' : 'false'}
              size={size}
              {...mergeProps(
                { onChange: handleCheckboxChange },
                htmlAttributes
              )}
            />
          </FieldBlock>
        </ChipGroupContext>
      )
  }
}

withComponentMarkers(Toggle, {
  _supportsSpacingProps: true,
})

export default Toggle
