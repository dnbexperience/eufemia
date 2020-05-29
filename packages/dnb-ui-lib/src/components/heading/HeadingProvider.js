/**
 * Web Heading Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  // warn,
  isTrue
  // convertJsxToString
} from '../../shared/component-helper'

// import Context from '../../shared/Context'
import HeadingContext from './HeadingContext'
import {
  // Counter,
  initCounter,
  handleCounter
  // globalHeadingCounter,
  // globalResetNextTime,
  // globalNextLevel
} from './HeadingCounter'

const propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  increase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  decrease: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  up: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  down: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // Do not set these! Because we do not smart check the merge!
  //   skip_checks: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //   debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  counter: PropTypes.any,
  reset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text: PropTypes.any,
  children: PropTypes.any
}
const defaultProps = {
  level: null, // like auto
  increase: null, // set increase as the default
  decrease: null,
  up: null, // set increase as the default
  down: null,

  // Do not set these! Because we do not smart check the merge!
  //   skip_checks: null,
  //   debug: null,

  counter: null,
  reset: null,
  text: null,
  children: null
}

export default class HeadingProvider extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = HeadingContext
  //   static contextType = Context// in order to get _providerProps, we use HeadingContext instead

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      // state._providerProps = { ...state._providerProps, ...props }
      // const newLevel = parseFloat(props.level)
      // if (
      //   // state.prevLevel !== props.level &&
      //   newLevel > 0
      // ) {
      //   // && newLevel !== state.level
      //   handleCounter({
      //     isProvider: true,
      //     counter: state.counter,
      //     level: newLevel,
      //     bypassChecks: isTrue(state._providerProps.skip_checks),
      //     source: props.text || props.children,
      //     debug: state._providerProps.debug
      //   })
      //   // NB: This level state is currently not used
      //   // state.level = state.counter.getLevel()
      // }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    const state = {
      _listenForPropChanges: true
    }

    state.counter = initCounter(props.counter, isTrue(props.reset))

    state._providerProps = props
    const hasProvider = context?.heading
    if (hasProvider) {
      state._providerProps = { ...hasProvider, ...props }
    }

    handleCounter({
      isProvider: true,
      counter: state.counter,
      level: state._providerProps.level,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks: isTrue(state._providerProps.skip_checks),
      source: props.text || props.children,
      debug: state._providerProps.debug
    })

    // Set the current level here, and keep it, so a heading, comming later in, will inherit it
    // This will require a new Counter "group" - not the global.
    // We basically start again counting from this one.
    state.level = state.counter.getLevel()
    // state.prevLevel = props.level

    this.state = state
  }

  render() {
    return (
      <HeadingContext.Provider
        value={{
          //   ...this.context,// in case we would send in the global context
          heading: {
            ...this.state._providerProps,
            ...this.state
          }
        }}
      >
        {this.props.children}
      </HeadingContext.Provider>
    )
  }
}
