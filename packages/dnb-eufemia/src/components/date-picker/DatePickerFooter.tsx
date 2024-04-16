/**
 * Web DatePicker Component
 *
 */

import React, { useContext } from 'react'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'
import { convertStringToDate } from './DatePickerCalc'
import { useTranslation } from '../../shared'

export type DatePickerFooterProps = React.HTMLProps<HTMLElement> & {
  isRange: boolean
  onSubmit?: (...args: any[]) => void
  onCancel?: (...args: any[]) => void
  onReset?: (...args: any[]) => void
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
  const context = useContext(DatePickerContext)

  const { show_reset_button, show_cancel_button, show_submit_button } =
    context.props

  const {
    submit_button_text: submit_button_text_translation,
    cancel_button_text: cancel_button_text_translation,
    reset_button_text: reset_button_text_translation,
  } = useTranslation().DatePicker
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

  function onSubmitHandler(args) {
    if (onSubmit) {
      onSubmit(args)
    }
  }

  function onCancelHandler(args) {
    const { date_format } = context.props

    const startDate = context.previousDates.startDate
      ? convertStringToDate(String(context.previousDates.startDate), {
          date_format,
        })
      : context.previousDates.date
      ? convertStringToDate(String(context.previousDates.date), {
          date_format,
        })
      : null
    const endDate = context.previousDates.endDate
      ? convertStringToDate(String(context.previousDates.startDate), {
          date_format,
        })
      : startDate

    if (args && args.event) {
      args.event.persist()
    }

    context.updateDates(
      {
        startDate,
        endDate,
      },
      (forward) => {
        if (onCancel) {
          onCancel({ ...args, ...forward })
        }
      }
    )
  }

  function onResetHandler(args) {
    if (args && args.event) {
      args.event.persist()
    }

    context.updateDates(
      {
        date: undefined,
        startDate: undefined,
        endDate: undefined,
      },
      (forward) => {
        if (onReset) {
          onReset({ ...args, ...forward })
        }
      }
    )
  }
}

export default DatePickerFooter
