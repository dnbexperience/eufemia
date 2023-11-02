/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'
import { isTrue } from '../../shared/component-helper'
import { convertStringToDate } from './DatePickerCalc'

export default class DatePickerFooter extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    isRange: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    onReset: PropTypes.func,

    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    resetButtonText: PropTypes.string,
  }

  static defaultProps = {
    onSubmit: null,
    onCancel: null,
    onReset: null,
    submitButtonText: null,
    cancelButtonText: null,
    resetButtonText: null,
  }

  onSubmitHandler = (args) => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(args)
    }
  }

  onCancelHandler = (args) => {
    const { date_format } = this.context.props

    const startDate = this.context._startDate
      ? convertStringToDate(this.context._startDate, {
          date_format,
        })
      : null
    const endDate = this.context._endDate
      ? convertStringToDate(this.context._endDate, {
          date_format,
        })
      : startDate

    if (args && args.event) {
      args.event.persist()
    }

    this.context.updateState(
      {
        startDate,
        endDate,
      },
      () => {
        const { onCancel } = this.props
        if (onCancel) {
          onCancel(args)
        }
      }
    )
  }

  onResetHandler = (args) => {
    if (args && args.event) {
      args.event.persist()
    }

    this.context.updateState(
      {
        date: undefined,
        startDate: undefined,
        endDate: undefined,
      },
      () => {
        const { onReset } = this.props
        if (onReset) {
          onReset(args)
        }
      }
    )
  }

  render() {
    const {
      isRange,
      resetButtonText,
      submitButtonText,
      cancelButtonText,
    } = this.props

    const { show_reset_button, show_cancel_button, show_submit_button } =
      this.context.props

    if (
      !isRange &&
      !isTrue(show_submit_button) &&
      !isTrue(show_cancel_button) &&
      !isTrue(show_reset_button)
    ) {
      return <></>
    }

    const {
      submit_button_text: submit_button_text_translation,
      cancel_button_text: cancel_button_text_translation,
      reset_button_text: reset_button_text_translation,
    } = this.context.translation.DatePicker

    return (
      <div className="dnb-date-picker__footer">
        {((isRange || isTrue(show_submit_button)) && (
          <Button
            text={submitButtonText || submit_button_text_translation}
            onClick={this.onSubmitHandler}
            data-testid="submit"
          />
        )) || <span />}

        <span>
          {(isTrue(show_reset_button) && (
            <Button
              text={resetButtonText || reset_button_text_translation}
              icon="reset"
              icon_position="left"
              variant="tertiary"
              onClick={this.onResetHandler}
              data-testid="reset"
              right="0.5rem"
            />
          )) || <span />}

          {((isRange || isTrue(show_cancel_button)) && (
            <Button
              text={cancelButtonText || cancel_button_text_translation}
              icon="close"
              icon_position="left"
              variant="tertiary"
              onClick={this.onCancelHandler}
              data-testid="cancel"
              right="0.5rem"
            />
          )) || <span />}
        </span>
      </div>
    )
  }
}
