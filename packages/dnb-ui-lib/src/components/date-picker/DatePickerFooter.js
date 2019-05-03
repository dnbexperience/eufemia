/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import Button from '../button/Button'

export const propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export const defaultProps = {
  // events
  onSubmit: null,
  onCancel: null
}

export default class DatePickerFooter extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  onSubmitHandler = () => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit()
    }
  }

  onCancelHandler = () => {
    const { onCancel } = this.props
    if (onCancel) {
      onCancel()
    }
  }

  render() {
    return (
      <div className="dnb-date-picker__footer">
        <Button
          text="Ok"
          variant="secondary"
          onClick={this.onSubmitHandler}
        />
        <Button
          text="Cancel"
          icon="close"
          icon_position="left"
          variant="tertiary"
          onClick={this.onCancelHandler}
        />
      </div>
    )
  }
}
