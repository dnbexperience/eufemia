/**
 * Lib Provider
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'

// fill with data
import { prepareFormRowContext } from '../components/form-row/FormRow'

class Provider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props)

    const {
      children, // eslint-disable-line
      ...providerProps
    } = this.props

    // 1. Set default context to be overwirtter by the provider props
    const context = defaultContext(providerProps)

    this.state = { usedContext: context }
  }

  setContext(state) {
    this.setState({ usedContext: defaultContext(state) })
  }

  render() {
    const { children, ...providerProps } = this.props

    // 1. Set default context to be overwirtter by the provider props
    const context = defaultContext(providerProps)

    // 2. The reset will extend the Provider Context

    // chore preparation
    if (context.formRow) {
      context.formRow = prepareFormRowContext(context.formRow)
    }

    // general context update
    if (!context.update) {
      context.update = props => this.setContext(props)
    }

    // make it posible to change the locale during runtime
    if (!context.setLocale) {
      context.setLocale = locale => this.setContext({ locale })
    }

    return (
      <Context.Provider value={this.state.usedContext}>
        {children}
      </Context.Provider>
    )
  }
}

export default Provider
