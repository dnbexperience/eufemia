/**
 * Web Heading Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { isTrue } from '../../shared/component-helper'
// import { makeUniqueId } from '../../shared/component-helper'

// import Context from '../../shared/Context'
import HeadingContext from './HeadingContext'
import {
  globalSyncCounter,
  globalHeadingCounter,
  correctHeadingLevel,
  windupHeadings,
  teardownHeadings,
  debugCounter
} from './HeadingHelpers'
import { initCounter } from './HeadingCounter'

export default class HeadingProvider extends React.PureComponent {
  static contextType = HeadingContext

  static propTypes = {
    id: PropTypes.string,
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

  static defaultProps = {
    id: null,
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

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      const level = parseFloat(props.level)
      if (
        (state.prevLevel !== props.level &&
          level > 0 &&
          level !== state.level) ||
        props.relevel
      ) {
        // Because we do not want to run MakeMeReady to set "this.level = 2"
        // state.counter.skipMakeMeReady()

        // Run this again here, so we can get a recalculated "useLevel" from the counter
        const { level: newLevel } = correctHeadingLevel({
          counter: state.counter,
          level,
          // reset: props.reset,
          bypassChecks:
            isTrue(props.skip_correction) ||
            isTrue(state.context.heading?.skip_correction),
          source: props.text || props.children, // only for debuging
          debug: props.debug || state.context.heading?.debug
        })
        state.level = state.prevLevel = newLevel
      }
      state._listenForPropChanges = true

      return state
    }
  }

  constructor(props, context) {
    super(props)

    const state = {
      context,
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

    state.counter = correctHeadingLevel({
      ref: props,
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
    state.level = state.counter.level
    state.prevLevel = state.newProps.level || state.counter.level
    this.state = state
  }

  componentDidMount() {
    windupHeadings()
  }
  componentWillUnmount() {
    teardownHeadings()
  }

  // rerender = () => {
  //   this.setState({
  //     force: makeUniqueId()
  //   })
  // }

  render() {
    return (
      <HeadingContext.Provider
        // key={this._id}
        value={{
          //   ...this.context,// in case we would send in the global context
          heading: {
            ...this.state.newProps,
            ...this.state
          }
        }}
      >
        {(this.state.newProps.debug_counter && (
          <span className="dnb-heading__context">
            <span className="dnb-heading__debug">
              Context:{' '}
              <span className="dnb-code">
                {debugCounter(this.state.counter)}
              </span>
            </span>
            {this.props.children}
          </span>
        )) ||
          this.props.children}
      </HeadingContext.Provider>
    )
  }
}
