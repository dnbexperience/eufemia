/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const propTypes = {
  renderElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

export const defaultProps = {
  renderElement: null
}

export default class DatePickerAddon extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { renderElement } = this.props
    if (!renderElement) {
      return <></>
    }
    return <div className="dnb-date-picker__addon">{renderElement}</div>
  }
}
