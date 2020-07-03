/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context, { prepareContext } from './Context'
import { makeUniqueId } from './component-helper'

// fill with data
import { prepareFormRowContext } from '../components/form-row/FormRow'

export default class Provider extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      const {
        children, // eslint-disable-line
        ...updatedProps
      } = props

      // 1. Set default context to be overwritten by the provider props
      // const newContext = { ...state, ...updatedProps }
      let newContext = state

      // No, it's not sure that props have been updated, so we check that here
      if (state._startupProps !== updatedProps) {
        let hasChanges = false
        for (const i in state._startupProps) {
          if (
            state._startupProps[i] !== updatedProps[i] ||
            typeof updatedProps[i] === 'boolean'
          ) {
            hasChanges = true
            break
          }
        }

        // and if so, update these props
        if (hasChanges) {
          newContext = { ...state, ...updatedProps }
        }
      }

      // 2. The reset will extend the Provider Context
      if (newContext.formRow) {
        newContext.formRow = prepareFormRowContext(newContext.formRow)
      }

      state = newContext
    }

    state._listenForPropChanges = true

    return prepareContext(state)
  }

  constructor(props, context) {
    super(props)

    const {
      children, // eslint-disable-line
      ...startupProps
    } = props

    const newContext = { ...context, ...startupProps }
    const isRoot = !(newContext && newContext.__providerId)
    newContext.__providerId = makeUniqueId()

    // 1. Set default context to be overwirtter by the provider props
    const pC = isRoot ? prepareContext(newContext) : newContext

    // change only current context
    pC.updateCurrent = (props) => this.setContext(props)
    pC.setCurrentLocale = (locale) => this.setContext({ locale })

    // change both the root and the current context
    pC.update = (props) => {
      if (typeof context.update === 'function') {
        context.update(props)
      }
      this.setContext(props)
    }
    pC.setLocale = (locale) => {
      if (typeof context.update === 'function') {
        context.update({ locale })
      }
      // make it posible to change the locale during runtime
      this.setContext({ locale })
    }

    this.state = pC
    this.state.isRoot = isRoot
    this.state._listenForPropChanges = true
    this.state._startupProps = startupProps
  }

  setContext(newContext) {
    this.setState({
      _listenForPropChanges: false
    })
    this.setState(newContext)
  }

  render() {
    const { children } = this.props

    // this way we update the translation object
    const context = !this.state.isRoot
      ? {
          ...this.context,
          ...this.state // use this state here, because our child provider can still update the context          ...this.context
        }
      : this.state

    return <Context.Provider value={context}>{children}</Context.Provider>
  }
}
