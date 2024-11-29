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
    previousDateProps,
    props: contextProps,
  } = useContext(DatePickerContext)

  const {
    showResetButton,
    showCancelButton,
    showSubmitButton,
    dateFormat,
  } = contextProps

  const {
    submitButtonText: submitButtonTextTranslation,
    cancelButtonText: cancelButtonTextTranslation,
    resetButtonText: resetButtonTextTranslation,
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

      const startDate = previousDateProps.startDate
        ? convertStringToDate(previousDateProps.startDate, {
            dateFormat,
          })
        : previousDateProps.date
        ? convertStringToDate(previousDateProps.date, {
            dateFormat,
          })
        : null

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
          onCancel?.({ ...args, ...dates })
        }
      )
    },
    [dateFormat, updateDates, previousDateProps, onCancel]
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
            right="0.5rem"
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
            right="0.5rem"
          />
        )) || <span />}
      </span>
    </div>
  )
}

export default DatePickerFooter
