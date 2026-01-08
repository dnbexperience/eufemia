/**
 * Web DatePicker Component
 *
 */

import React, { useContext, useCallback } from 'react'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'
import { convertStringToDate } from './DatePickerCalc'
import { useTranslation } from '../../shared'
import type { DatePickerDates } from './hooks/useDates'

type DatePickerFooterEvent = React.MouseEvent<HTMLButtonElement> &
  DatePickerDates & {
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
    previousDateProps,
    startDate,
    endDate,
    submittedDates,
    setSubmittedDates,
    dateFormat,
    props: contextProps,
  } = useContext(DatePickerContext)

  const { showResetButton, showCancelButton, showSubmitButton } =
    contextProps

  const {
    submitButtonText: submitButtonTextTranslation,
    cancelButtonText: cancelButtonTextTranslation,
    resetButtonText: resetButtonTextTranslation,
  } = useTranslation().DatePicker

  const onSubmitHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      onSubmit?.(args)
      setSubmittedDates({ startDate, endDate })
    },
    [onSubmit, startDate, endDate, setSubmittedDates]
  )

  const onCancelHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      if (args && args.event) {
        args.event.persist()
      }

      updateDates(submittedDates, (dates) => {
        onCancel?.({ ...args, ...dates })
      })
    },
    [updateDates, onCancel, submittedDates]
  )

  const onResetHandler = useCallback(
    (args: DatePickerFooterEvent) => {
      if (args && args.event) {
        args.event.persist()
      }

      const startDate = previousDateProps.startDate
        ? convertStringToDate(previousDateProps.startDate, {
            dateFormat,
          })
        : previousDateProps.date
        ? convertStringToDate(previousDateProps.date, {
            dateFormat,
          })
        : undefined

      const endDate = previousDateProps.endDate
        ? convertStringToDate(previousDateProps.endDate, {
            dateFormat,
          })
        : startDate
      updateDates(
        {
          startDate,
          endDate,
        },
        (dates) => {
          onReset?.({ ...args, ...dates })
        }
      )
    },
    [dateFormat, updateDates, previousDateProps, onReset]
  )

  if (
    !isRange &&
    !showSubmitButton &&
    !showCancelButton &&
    !showResetButton
  ) {
    return <></>
  }

  return (
    <div className="dnb-date-picker__footer">
      {((isRange || showSubmitButton) && (
        <Button
          text={submitButtonText || submitButtonTextTranslation}
          onClick={onSubmitHandler}
          data-testid="submit"
        />
      )) || <span />}

      <span>
        {(showResetButton && (
          <Button
            text={resetButtonText || resetButtonTextTranslation}
            icon="reset"
            icon_position="left"
            variant="tertiary"
            onClick={onResetHandler}
            data-testid="reset"
            right="1rem"
          />
        )) || <span />}

        {((isRange || showCancelButton) && (
          <Button
            text={cancelButtonText || cancelButtonTextTranslation}
            icon="close"
            icon_position="left"
            variant="tertiary"
            onClick={onCancelHandler}
            data-testid="cancel"
          />
        )) || <span />}
      </span>
    </div>
  )
}

export default DatePickerFooter
