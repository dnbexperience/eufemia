/**
 * Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class MyClass extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }
  static defaultProps = {
    children: null
  }
  constructor(props) {
    super(props)
    this.state = { time: this.getTime() }
  }
  getTime() {
    return new Date().toLocaleTimeString()
  }
  setTime() {
    this.setState({ time: this.getTime() })
  }
  componentDidMount() {
    this.myInterval = setInterval(() => this.setTime(), 1e3)
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
  render() {
    const { children } = this.props
    return (
      <Fragment>
        {children}
        <dnb-form-label for_id="form-input">
          My running seconds
        </dnb-form-label>
        <dnb-input id="form-input" value={this.state.time} disabled />
      </Fragment>
    )
  }
}
