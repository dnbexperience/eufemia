import React, { useCallback, useMemo } from 'react'
import { DatePicker, HelpButton } from '../../../../components'
import { useFieldProps } from '../../hooks'
import {
  FieldProps,
  FieldHelpProps,
  AllJSONSchemaVersions,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { parseISO, isValid } from 'date-fns'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = FieldHelpProps &
  FieldProps<string, undefined | string> & {
    // Validation
    pattern?: string
  }

function DateComponent(props: Props) {
  const translations = useTranslation()

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.Date.errorRequired,
    pattern: translations.Field.errorRequired,
  })

  const schema = useMemo<AllJSONSchemaVersions>(
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
    value,
    help,
    info,
    warning,
    error,
    hasError,
    disabled,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
  } = useFieldProps(preparedProps)

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-string', className)}
      forId={id}
      label={label ?? translations.Date.label}
      labelDescription={labelDescription}
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
            <HelpButton title={help.title}>{help.content}</HelpButton>
          ) : undefined
        }
        on_change={handleChange}
        on_reset={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

DateComponent._supportsSpacingProps = true
export default DateComponent
