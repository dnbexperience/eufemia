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
import { formatDate } from '../../Value/Date'
import {
  DatePickerEvent,
  DatePickerProps,
} from '../../../../components/DatePicker'
import { convertCamelCaseProps } from '../../../../shared/helpers/withCamelCaseProps'

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
    // Adding the DatePickerProps has been done manually here, as to be able to camelCase the props, and adding the JSdoc comments
    // We could of course have joined the DatePickerProps with the Props type, but that would lead to a breaking changes for Field.Date
    // in the future when DatePickerProps is converted to camelCase, so solved this way as of now, to mitigate that.
    // TODO: Remove when DatePickerProps is converted to camelCase
    // Current solution is solvede this way, as the ToCamelCase type does not does not retain the JSDOC comments,
    // and hovering over the types themselves just shows all the DatePickerProp types instead of a type description
    /**
     * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
     */
    startDate?: DatePickerProps['start_date']
    /**
     * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
     */
    endDate?: DatePickerProps['end_date']
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
     */
    month?: DatePickerProps['month']
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
     */
    startMonth?: DatePickerProps['start_month']
    /**
     * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `start_date`.
     */
    endMonth?: DatePickerProps['end_month']
    /**
     * To limit a date range to a minimum `start_date`. Defaults to `null`.
     */
    minDate?: DatePickerProps['min_date']
    /**
     * To limit a date range to a maximum `end_date`. Defaults to `null`.
     */
    maxDate?: DatePickerProps['max_date']
    /**
     * Corrects the input date value to be the same as either `min_date` or `max_date`, when the user types in a date that is either before or after one of these. Defaults to `false`.
     */
    correctInvalidDate?: DatePickerProps['correct_invalid_date']
    /**
     * To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`
     */
    maskOrder?: DatePickerProps['mask_order']
    /**
     * To display the placeholder on input. Defaults to `dd/mm/åååå`.
     */
    maskPlaceholder?: DatePickerProps['mask_placeholder']
    /**
     * Defines how the prop dates (`date`, `start_date` and `end_date`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.
     */
    dateFormat?: DatePickerProps['date_format']
    /**
     * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
     */
    returnFormat?: DatePickerProps['return_format']
    /**
     * If set to `true`, the navigation will be hidden. Defaults to `false`.
     */
    hideNavigation?: DatePickerProps['hide_navigation']
    hideNavigationButtons?: DatePickerProps['hide_navigation_buttons']
    /**
     * If set to `true`, the week days will be hidden. Defaults to `false`.
     */
    hideDays?: DatePickerProps['hide_days']
    /**
     * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
     */
    onlyMonth?: DatePickerProps['only_month']
    /**
     * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
     */
    hideLastWeek?: DatePickerProps['hide_last_week']
    /**
     * Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.
     */
    disableAutofocus?: DatePickerProps['disable_autofocus']
    enableKeyboardNav?: DatePickerProps['enable_keyboard_nav']

    /**
     * If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
     */
    showSubmitButton?: DatePickerProps['show_submit_button']
    /**
     * If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
     */
    showCancelButton?: DatePickerProps['show_cancel_button']
    /**
     * If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.
     */
    showResetButton?: DatePickerProps['show_reset_button']
    submitButtonText?: DatePickerProps['submit_button_text']
    cancelButtonText?: DatePickerProps['cancel_button_text']
    resetButtonText?: DatePickerProps['reset_button_text']
    resetDate?: DatePickerProps['reset_date']
    /**
     * To define the first day of the week. Defaults to `monday`.
     */
    firstDay?: DatePickerProps['first_day']

    /**
     * Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.
     */
    link?: DatePickerProps['link']
    /**
     * Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.
     */
    sync?: DatePickerProps['sync']

    /**
     * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
     */
    addonElement?: DatePickerProps['addon_element']
    /**
     * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
     */
    shortcuts?: DatePickerProps['shortcuts']
    /**
     * To open the date-picker by default. Defaults to `false`.
     */
    opened?: boolean
    preventClose?: DatePickerProps['prevent_close']
    noAnimation?: DatePickerProps['no_animation']
    direction?: DatePickerProps['direction']
    /**
     * Use `right` to change the calendar alignment direction. Defaults to `left`.
     */
    alignPicker?: DatePickerProps['align_picker']
    /**
     * Will be called right before every new calendar view gets rendered. See the example above.
     */
    onDaysRender?: DatePickerProps['on_days_render']

    /**
     * Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.
     */
    onType?: DatePickerProps['on_type']
    /**
     * Will be called once date-picker is visible.
     */
    onShow?: DatePickerProps['on_show']
    /**
     * Will be called once date-picker is hidden.
     */
    onHide?: DatePickerProps['on_hide']
    /**
     * Will be called once a user presses the submit button.
     */
    onSubmit?: DatePickerProps['on_submit']
    /**
     * Will be called once a user presses the cancel button.
     */
    onCancel?: DatePickerProps['on_cancel']
    /**
     * Will be called once a user presses the reset button.
     */
    onReset?: DatePickerProps['on_reset']
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
    value: valueProp,
    help,
    hasError,
    disabled,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
    range,
    ...rest
  } = useFieldProps(preparedProps)

  const { value, startDate, endDate } = useMemo(() => {
    if (!range || !valueProp) {
      return { value: valueProp, startDate: undefined, endDate: undefined }
    }

    const [startDate, endDate] = valueProp
      .split('|')
      .map((value) => (/(undefined|null)/.test(value) ? undefined : value))

    return {
      value: undefined,
      startDate,
      endDate,
    }
  }, [range, valueProp])

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
  // Could perhaps destructure all the DatePickerProps manually in useFieldProps
  const datePickerProps = getDatePickerProps(rest)

  return (
    <FieldBlock {...fieldBlockProps}>
      <DatePicker
        id={id}
        date={value}
        disabled={disabled}
        show_input={true}
        show_cancel_button={true}
        show_reset_button={true}
        start_date={startDate}
        end_date={endDate}
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
        {...datePickerProps}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

const datePickerPropKeys = [
  'startDate',
  'endDate',
  'month',
  'startMonth',
  'endMonth',
  'minDate',
  'maxDate',
  'correctInvalidDate',
  'maskOrder',
  'maskPlaceholder',
  'dateFormat',
  'returnFormat',
  'hideNavigation',
  'hideNavigationButtons',
  'hideDays',
  'onlyMonth',
  'hideLastWeek',
  'disableAutofocus',
  'enableKeyboardNav',
  'showSubmitButton',
  'showCancelButton',
  'showResetButton',
  'submitButtonText',
  'cancelButtonText',
  'resetButtonText',
  'resetDate',
  'firstDay',
  'link',
  'sync',
  'addonElement',
  'shortcuts',
  'opened',
  'preventClose',
  'noAnimation',
  'direction',
  'alignPicker',
  'onDaysRender',
  'onType',
  'onShow',
  'onHide',
  'onSubmit',
  'onCancel',
  'onReset',
]

// TODO: Remove when DatePickerProps is converted to camelCase
function getDatePickerProps(props: Props) {
  const datePickerProps = Object.keys(props).reduce(
    (datePickerProps, key) => {
      if (datePickerPropKeys.includes(key)) {
        datePickerProps[key] = props[key]
      }

      return datePickerProps
    },
    {}
  )
  // TODO: Remove convertCamelCaseProps when DatePickerProps is converted to camelCase
  return convertCamelCaseProps(datePickerProps)
}

DateComponent._supportsSpacingProps = true
export default DateComponent
