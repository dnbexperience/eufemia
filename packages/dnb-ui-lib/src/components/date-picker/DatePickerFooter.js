/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import Button from '../button/Button'

export const propTypes = {
  onSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onCancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

export const defaultProps = {
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
    const { onSubmit, onCancel } = this.props
    if (!onSubmit && !onCancel) {
      return <></>
    }
    return (
      <div className="dnb-date-picker__footer">
        {(onSubmit && (
          <Button
            text="Ok"
            variant="secondary"
            onClick={this.onSubmitHandler}
          />
        )) || <span />}

        {(onCancel && (
          <Button
            text="Cancel"
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
