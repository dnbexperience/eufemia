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
      let newContext = state

      // No, it's not sure that props have been updated, so we check that here
      if (state._startupProps !== updatedProps) {
        let hasChanges = false
        for (const i in updatedProps) {
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
          newContext = Object.assign(state, updatedProps)
          state._startupProps = updatedProps
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

    // NB: Make sure we create a copy, because we add some custom methods to it
    const newContext = { ...context, ...startupProps }
    const isRoot = !(newContext && newContext.__providerId)
    newContext.__providerId = makeUniqueId()

    // 1. Set default context to be overwritten by the provider props
    const pC = isRoot ? prepareContext(newContext) : newContext

    // change only current context
    pC.updateCurrent = (props) => this.setNewContext(props)
    pC.setCurrentLocale = (locale) => this.setNewContext({ locale })

    // change both the root and the current context
    pC.update = (props) => {
      // Update the root context
      if (typeof context.update === 'function') {
        context.update(props)
      }

      this.setNewContext(props)
    }
    pC.setLocale = (locale) => {
      // Update the root context
      if (typeof context.update === 'function') {
        context.update({ locale })
      }

      this.setNewContext({ locale })
    }

    this.state = pC
    this.state.isRoot = isRoot
    this.state._listenForPropChanges = true
    this.state._startupProps = startupProps
  }

  setNewContext(__newContext) {
    this.setState({
      _listenForPropChanges: false
    })

    /**
     * While we could send in the new state like this:
     * this.setState(newContext)
     * – as NO object, we do that for now, because;
     * This gives us more control on when and how we want to update the new data.
     *
     * PS: Initial, the reason was the change locale Dropdown in the Portal,
     * which has "refresh" problems, in drawer-list animation was enabled
     */
    this.setState({ __newContext })
    // this.setState(newContext)
  }

  render() {
    const { children } = this.props

    // this way we update the translation object
    const context = !this.state.isRoot
      ? {
          ...this.context,
          ...this.state // Use this state here, because our child provider can still update the context          ...this.context
        }
      : this.state

    return <Context.Provider value={context}>{children}</Context.Provider>
  }
}
