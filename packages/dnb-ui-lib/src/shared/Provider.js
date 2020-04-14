/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'

// fill with data
import { prepareFormRowContext } from '../components/form-row/FormRow'

class Provider extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      const {
        children, // eslint-disable-line
        ...providerProps
      } = props

      // 1. Set default context to be overwirtter by the provider props
      const context = { ...state.usedContext, ...providerProps }

      // 2. The reset will extend the Provider Context
      if (context.formRow) {
        context.formRow = prepareFormRowContext(context.formRow)
      }

      state.usedContext = context
    }

    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    // 1. Set default context to be overwirtter by the provider props
    const usedContext = defaultContext(context)

    // general context update
    if (!usedContext.update) {
      usedContext.update = (props) => this.setContext(props)
    }

    // make it posible to change the locale during runtime
    if (!usedContext.setLocale) {
      usedContext.setLocale = (locale) => this.setContext({ locale })
    }

    this.state = {
      usedContext,
      _listenForPropChanges: true
    }
  }

  setContext(props) {
    this.setState({
      usedContext: { ...this.state.usedContext, ...props },
      _listenForPropChanges: false
    })
  }

  render() {
    const { children } = this.props
    return (
      <Context.Provider value={this.state.usedContext}>
        {children}
      </Context.Provider>
    )
  }
}

export default Provider
