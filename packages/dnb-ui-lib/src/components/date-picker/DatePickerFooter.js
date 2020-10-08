/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'

export default class DatePickerFooter extends React.PureComponent {
  static propTypes = {
    submit_button_text: PropTypes.string,
    cancel_button_text: PropTypes.string,
    reset_button_text: PropTypes.string,
    selectedDateTitle: PropTypes.string,
    onSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onCancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onReset: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }

  static defaultProps = {
    submit_button_text: null,
    cancel_button_text: null,
    reset_button_text: null,
    selectedDateTitle: null,

    // events
    onSubmit: null,
    onCancel: null,
    onReset: null
  }

  onSubmitHandler = (args) => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(args)
    }
  }

  onCancelHandler = (args) => {
    const { onCancel } = this.props
    if (onCancel) {
      onCancel(args)
    }
  }

  onResetHandler = (args) => {
    const { onReset } = this.props
    if (onReset) {
      onReset(args)
    }
  }

  render() {
    const {
      onSubmit,
      onCancel,
      onReset,
      selectedDateTitle,
      submit_button_text,
      cancel_button_text,
      reset_button_text
    } = this.props
    if (!onSubmit && !onCancel) {
      return <></>
    }
    return (
      <div className="dnb-date-picker__footer">
        <p className="dnb-sr-only" aria-live="assertive">
          {selectedDateTitle}
        </p>

        {(onSubmit && (
          <Button
            text={submit_button_text}
            // aria-label={
            // selectedDateTitle
            // ? `${submit_button_text}, ${selectedDateTitle}`
            // : submit_button_text
            // }
            onClick={this.onSubmitHandler}
          />
        )) || <span />}

        <span>
          {(onReset && (
            <Button
              text={reset_button_text}
              icon="reset"
              icon_position="left"
              variant="tertiary"
              onClick={this.onResetHandler}
            />
          )) || <span />}

          {(onCancel && (
            <Button
              text={cancel_button_text}
              icon="close"
              icon_position="left"
              variant="tertiary"
              onClick={this.onCancelHandler}
            />
          )) || <span />}
        </span>
      </div>
    )
  }
}
