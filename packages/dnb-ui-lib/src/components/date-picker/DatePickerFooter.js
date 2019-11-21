/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'

const propTypes = {
  submit_button_text: PropTypes.string,
  cancel_button_text: PropTypes.string,
  reset_button_text: PropTypes.string,
  onSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onCancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onReset: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

const defaultProps = {
  submit_button_text: null,
  cancel_button_text: null,
  reset_button_text: null,

  // events
  onSubmit: null,
  onCancel: null,
  onReset: null
}

export default class DatePickerFooter extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  onSubmitHandler = args => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(args)
    }
  }

  onCancelHandler = args => {
    const { onCancel } = this.props
    if (onCancel) {
      onCancel(args)
    }
  }

  onResetHandler = args => {
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
      submit_button_text,
      cancel_button_text,
      reset_button_text
    } = this.props
    if (!onSubmit && !onCancel) {
      return <></>
    }
    return (
      <div className="dnb-date-picker__footer">
        {(onSubmit && (
          <Button
            text={submit_button_text}
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
