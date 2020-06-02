/**
 * Web Heading Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { isTrue } from '../../shared/component-helper'

// import Context from '../../shared/Context'
import HeadingContext from './HeadingContext'
import {
  globalSyncCounter,
  globalHeadingCounter,
  initCounter,
  correctHeadingLevel,
  windUpHeadings,
  tearDownHeadings
} from './HeadingHelpers'

const propTypes = {
  group: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  increase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  decrease: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  up: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  down: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inherit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // Do not set these! Because we do not smart check the merge!
  //   skip_correction: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //   debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  counter: PropTypes.any,
  reset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool
  ]),
  text: PropTypes.any,
  children: PropTypes.any
}
const defaultProps = {
  group: null,
  level: null, // like auto
  increase: null, // set increase as the default
  decrease: null,
  up: null, // set increase as the default
  down: null,
  inherit: null,

  // Do not set these! Because we do not smart check the merge!
  //   skip_correction: null,
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
  //   static contextType = Context// in order to get newProps, we use HeadingContext instead

  // static getDerivedStateFromProps(props, state) {
  //   if (state._listenForPropChanges) {
  //   }
  //   state._listenForPropChanges = true

  //   return state
  // }

  constructor(props, context) {
    super(props)

    const state = {
      _listenForPropChanges: true
    }

    const existingContext = context.heading

    // Here we create a new counter, but use the last global level
    state.counter = initCounter(props) // in here we use isContext prop

    // merge props with prev context
    state.newProps = props
    if (existingContext) {
      state.newProps = { ...existingContext, ...props }
    }

    // yes, there was a prev context, but there is not level prop
    if (existingContext) {
      state.counter.setContextCounter(existingContext.counter)
    } else {
      state.counter.setContextCounter(globalHeadingCounter.current)
    }

    const { level: newLevel } = correctHeadingLevel({
      counter: state.counter,
      level: parseFloat(props.level),
      inherit: isTrue(props.inherit),
      reset: props.reset,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks: isTrue(state.newProps.skip_correction),
      source: props.text || props.children,
      debug: state.newProps.debug
    })

    globalSyncCounter.current = state.counter

    // Set the current level here, and keep it, so a heading, comming later in, will inherit it
    // This will require a new Counter "group" - not the global.
    // We basically start again counting from this one.
    state.level = newLevel
    state.initLevel = state.newProps.level || newLevel
    this.state = state
  }

  componentDidMount() {
    windUpHeadings()
  }
  componentWillUnmount() {
    tearDownHeadings()
  }

  render() {
    return (
      <HeadingContext.Provider
        value={{
          //   ...this.context,// in case we would send in the global context
          heading: {
            ...this.state.newProps,
            ...this.state
          }
        }}
      >
        {this.props.children}
      </HeadingContext.Provider>
    )
  }
}
