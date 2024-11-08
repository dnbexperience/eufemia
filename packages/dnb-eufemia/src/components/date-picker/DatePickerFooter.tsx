/**
 * Web DatePicker Component
 *
 */

import React, { useContext, useCallback } from 'react'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'
import { convertStringToDate } from './DatePickerCalc'
import { useTranslation } from '../../shared'
import { DatePickerInputDates } from './hooks/useDates'

type DatePickerFooterEvent = React.MouseEvent<HTMLButtonElement> &
  DatePickerInputDates & {
    event: React.MouseEvent<HTMLButtonElement>
  }

export type DatePickerFooterProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onSubmit' | 'onCancel' | 'onReset'
> & {
  isRange: boolean
  onSubmit?: (event: DatePickerFooterEvent) => void
  onCancel?: (event: DatePickerFooterEvent) => void
  onReset?: (event: DatePickerFooterEvent) => void
  submitButtonText?: string
  cancelButtonText?: string
  resetButtonText?: string
}

function DatePickerFooter({
  isRange,
  submitButtonText,
  cancelButtonText,
  resetButtonText,
  onSubmit,
  onCancel,
  onReset,
}: DatePickerFooterProps) {
  const {
    updateDates,
    previousDates,
    props: contextProps,
  } = useContext(DatePickerContext)

  const {
    show_reset_button,
    show_cancel_button,
    show_submit_button,
    date_format,
  } = contextProps

  const {
    submit_button_text: submit_button_text_translation,
    cancel_button_text: cancel_button_text_translation,
    reset_button_text: reset_button_text_translation,
  } = useTranslation().DatePicker

  const onSubmitHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      onSubmit?.(args)
    },
    [onSubmit]
  )

  const onCancelHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      if (args && args.event) {
        args.event.persist()
      }

      const startDate = previousDates.startDate
        ? convertStringToDate(previousDates.startDate, {
            date_format,
          })
        : previousDates.date
        ? convertStringToDate(previousDates.date, {
            date_format,
          })
        : null

      const endDate = previousDates.endDate
        ? convertStringToDate(previousDates.endDate, {
            date_format,
          })
        : startDate

      updateDates(
        {
          startDate,
          endDate,
        },
        (dates) => {
          onCancel?.({ ...args, ...dates })
        }
      )
    },
    [date_format, updateDates, previousDates, onCancel]
  )

  const onResetHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      if (args && args.event) {
        args.event.persist()
      }

      updateDates(
        {
          date: undefined,
          startDate: undefined,
          endDate: undefined,
        },
        (dates) => {
          onReset?.({ ...args, ...dates })
        }
      )
    },
    [updateDates, onReset]
  )

  if (
    !isRange &&
    !show_submit_button &&
    !show_cancel_button &&
    !show_reset_button
  ) {
    return <></>
  }

  return (
    <div className="dnb-date-picker__footer">
      {((isRange || show_submit_button) && (
        <Button
          text={submitButtonText || submit_button_text_translation}
          onClick={onSubmitHandler}
          data-testid="submit"
        />
      )) || <span />}

      <span>
        {(show_reset_button && (
          <Button
            text={resetButtonText || reset_button_text_translation}
            icon="reset"
            icon_position="left"
            variant="tertiary"
            onClick={onResetHandler}
            data-testid="reset"
            right="0.5rem"
          />
        )) || <span />}

        {((isRange || show_cancel_button) && (
          <Button
            text={cancelButtonText || cancel_button_text_translation}
            icon="close"
            icon_position="left"
            variant="tertiary"
            onClick={onCancelHandler}
            data-testid="cancel"
            right="0.5rem"
          />
        )) || <span />}
      </span>
    </div>
  )
}

export default DatePickerFooter
