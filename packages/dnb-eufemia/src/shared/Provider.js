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
    /** Send in an object that gets spread as properties to the Provider */
    value: PropTypes.object, // eslint-disable-line
    /** Define the locale used for every Eufemia components inside this Provider. Defaults to nb-NO */
    locale: PropTypes.string, // eslint-disable-line
    /** Enable skeleton of every Eufemia component inside this Provider */
    skeleton: PropTypes.bool, // eslint-disable-line
    children: PropTypes.node.isRequired
  }

  // NB! Do not provide any default props, because they would overwrite inherited values in nested provider
  static defaultProps = {}

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      const {
        children, // eslint-disable-line
        ...updatedProps
      } = props

      // 1. Set default context to be overwritten by the provider props
      // let newContext = state

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
          state = Object.assign(state, updatedProps)
          state._startupProps = updatedProps
        }
      }

      // 2. The reset will extend the Provider Context
      if (state.FormRow) {
        state.FormRow = {
          ...state.FormRow,
          ...updatedProps.FormRow
        }
        state.FormRow = prepareFormRowContext(state.FormRow)
      }
    }

    state._listenForPropChanges = true

    return prepareContext(state)
  }

  static mergeContext(props, context) {
    const { value, ...rest } = props

    // Make sure we create a copy, because we add some custom methods to it
    const merge = { ...value, ...rest }

    // Merge our new values with an existing context
    let mergedContext = { ...context, ...merge }

    // Because we don't want to deep merge, we merge FormRow additionally
    if (context.FormRow && merge.FormRow) {
      mergedContext.FormRow = { ...context.FormRow, ...merge.FormRow }
    }

    return mergedContext
  }

  constructor(props, context) {
    super(props)

    const {
      children, // eslint-disable-line
      ...startupProps
    } = props

    /**
     * Deprecated!
     *
     * This is only to ensure backwards compatibility, as the docs has showed before year 2021
     */
    if (typeof startupProps.formRow !== 'undefined') {
      startupProps.FormRow = startupProps.formRow
    }

    // NB: Make sure we create a copy, because we add some custom methods to it
    const newContext = Provider.mergeContext(startupProps, context)
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
  }

  // render() {
  //   this.context.updateTranslation(
  //     this.state.locale,
  //     this.state.translation
  //   )

  //   return (
  //     <Context.Provider value={this.state}>
  //       {this.props.children}
  //     </Context.Provider>
  //   )
  // }

  render() {
    let value = this.state

    // this way we update the translation object
    if (!this.state.isRoot) {
      value = {
        ...this.context,
        ...this.state // Use this state here, because our child provider can still update the context          ...this.context
      }

      value = Provider.mergeContext(this.state, this.context)
    }

    this.context.updateTranslation(value.locale, value.translation)

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
