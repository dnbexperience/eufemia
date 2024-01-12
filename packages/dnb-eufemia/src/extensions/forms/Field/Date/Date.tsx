import React, { useCallback, useContext, useMemo } from 'react'
import { DatePicker, HelpButton } from '../../../../components'
import { useDataValue } from '../../hooks'
import { FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'
import { JSONSchema7 } from 'json-schema'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { parseISO, isValid } from 'date-fns'

export type Props = FieldHelpProps &
  FieldProps<string> & {
    // Validation
    pattern?: string
  }

function DateComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useMemo(
    () => ({
      required: tr.dateErrorRequired,
      pattern: tr.inputErrorPattern,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages]
  )

  const schema = useMemo<JSONSchema7>(
    () =>
      props.schema ?? {
        type: 'string',
        pattern: props.pattern,
      },
    [props.schema, props.pattern]
  )

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      if (required && (!value || !isValid(parseISO(value)))) {
        return error
      }

      return undefined
    },
    []
  )

  const preparedProps: Props = {
    ...props,
    errorMessages,
    schema,
    fromInput: ({ date }: { date: string }) => {
      return date
    },
    validateRequired,
  }

  const {
    id,
    className,
    label,
    labelDescription,
    labelSecondary,
    value,
    help,
    info,
    warning,
    error,
    hasError,
    disabled,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(preparedProps)

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-string', className)}
      forId={id}
      label={label ?? sharedContext?.translation.Forms.dateLabel}
      labelDescription={labelDescription}
      labelSecondary={labelSecondary}
      info={info}
      warning={warning}
      disabled={disabled}
      error={error}
      {...pickSpacingProps(props)}
    >
      <DatePicker
        id={id}
        date={value}
        disabled={disabled}
        show_input={true}
        show_cancel_button={true}
        show_reset_button={true}
        status={hasError ? 'error' : undefined}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.contents}</HelpButton>
          ) : undefined
        }
        on_change={handleChange}
        on_reset={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...pickSpacingProps(props)}
      />
    </FieldBlock>
  )
}

DateComponent._supportsSpacingProps = true
export default DateComponent
