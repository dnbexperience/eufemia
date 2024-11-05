import React, { useCallback, useContext, useMemo } from 'react'
import { DatePicker, HelpButton } from '../../../../components'
import { useFieldProps } from '../../hooks'
import {
  FieldProps,
  FieldHelpProps,
  AllJSONSchemaVersions,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import SharedContext from '../../../../shared/Context'
import { parseISO, isValid } from 'date-fns'
import useTranslation from '../../hooks/useTranslation'
import { DatePickerEvent } from '../../../../components/DatePicker'
import { formatDate } from '../../Value/Date'

export type Props = FieldHelpProps &
  FieldProps<string, undefined | string> & {
    // Validation
    pattern?: string
    /**
     * Defines if the Date field should support a value of two dates (starting and ending date).
     * The value needs to be a string containing two dates, separated by a pipe character (`|`) i.e. (`01-09-2024|30-09-2024`) when this is set to `true`.
     * Defaults to `false`.
     */
    range?: boolean
  }

function DateComponent(props: Props) {
  const translations = useTranslation()
  const { locale } = useContext(SharedContext)

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.Date.errorRequired,
      'Field.errorPattern': translations.Date.errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, translations.Date.errorRequired])

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
    fromInput: ({
      date,
      start_date,
      end_date,
    }: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>) => {
      return range ? `${start_date}|${end_date}` : date
    },
    validateRequired,
  }

  const {
    id,
    path,
    className,
    label,
    value,
    help,
    hasError,
    disabled,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
    range,
  } = useFieldProps(preparedProps)

  const rangeValue = useMemo(() => {
    if (!range) {
      return
    }

    const [startDate, endDate] = value.split('|')

    return { startDate, endDate }
  }, [range, value])

  useMemo(() => {
    if (path && value) {
      setDisplayValue(path, formatDate(value, { locale }))
    }
  }, [locale, path, setDisplayValue, value])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    label: label ?? translations.Date.label,
    className: classnames('dnb-forms-field-string', className),
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <DatePicker
        id={id}
        date={!range ? value : undefined}
        disabled={disabled}
        show_input={true}
        show_cancel_button={true}
        show_reset_button={true}
        start_date={range ? rangeValue.startDate : undefined}
        end_date={range ? rangeValue.endDate : undefined}
        status={hasError ? 'error' : undefined}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.content}</HelpButton>
          ) : undefined
        }
        range={range}
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
