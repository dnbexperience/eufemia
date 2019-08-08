/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'

export const propTypes = {
  footer_button_ok: PropTypes.string,
  footer_button_cancel: PropTypes.string,
  onSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onCancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

export const defaultProps = {
  footer_button_ok: 'Ok',
  footer_button_cancel: 'Cancel',

  // events
  onSubmit: null,
  onCancel: null
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

  render() {
    const {
      onSubmit,
      onCancel,
      footer_button_cancel,
      footer_button_ok
    } = this.props
    if (!onSubmit && !onCancel) {
      return <></>
    }
    return (
      <div className="dnb-date-picker__footer">
        {(onSubmit && (
          <Button
            text={footer_button_ok}
            variant="secondary"
            onClick={this.onSubmitHandler}
          />
        )) || <span />}

        {(onCancel && (
          <Button
            text={footer_button_cancel}
            icon="close"
            icon_position="left"
            variant="tertiary"
            onClick={this.onCancelHandler}
          />
        )) || <span />}
      </div>
    )
  }
}
