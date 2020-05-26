/**
 * Web Heading Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  warn,
  isTrue,
  convertJsxToString
} from '../../shared/component-helper'

// import Context from '../../shared/Context'
import HeadingContext from './HeadingContext'

const propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  increase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  decrease: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  up: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  down: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  reset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // Do not set these! Because we do not smart check the merge!
  //   skip_checks: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //   debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  counter: PropTypes.any,
  text: PropTypes.any,
  children: PropTypes.any
}
const defaultProps = {
  level: null, // like auto
  increase: true, // set increase as the default
  decrease: null,
  up: true, // set increase as the default
  down: null,
  reset: null,

  // Do not set these! Because we do not smart check the merge!
  //   skip_checks: null,
  //   debug: null,

  counter: null,
  text: null,
  children: null
}

export const defaultCounter = React.createRef(null)

export class Counter {
  level = 0

  constructor() {
    this.bypassChecks = false
    this.reports = []
  }

  report(...str) {
    this.reports.push(str)
  }

  emptyReports() {
    return this.reports.shift()
  }

  enableBypassChecks() {
    this.bypassChecks = true
  }
  disableBypassChecks() {
    this.bypassChecks = false
  }

  setFirst(level = 1) {
    level = parseFloat(level)

    if (!this.bypassChecks && level > 1) {
      this.report('Can not set other than level 1 at startup! Got:', level)
      level = 1
    }

    this._hadFirst = true
    this.level = level || 1
  }

  setLevel(level, action = 'set') {
    level = parseFloat(level)

    // NB: We may considder to use this "used" check later on
    // if (!this.bypassChecks && this.used !== this.level) {
    // this.report(
    // 'Heading level increment is not in sync!',
    // this.used,
    // 'vs',
    // this.level
    // )
    // level = this.level
    // }

    if (!this.bypassChecks && Math.abs(this.level - level) > 1) {
      this.report(
        'Heading levels can only increase/decrease by factor one! Got:',
        level,
        'and had before',
        this.level
      )

      switch (action) {
        case 'increment':
          level = this.level + 1
          break

        case 'decrement':
          level = this.level - 1
          break

        default:
          level = this.level
          break
      }
    }

    if (level > 6) {
      this.report(
        `Can not ${action} heading level higher than 6! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 6
    } else if (level < 1) {
      this.report(
        `Can not ${action} heading level lower than 1! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 1
    } else if (!this.bypassChecks && level === 1 && this.level === 1) {
      this.report(
        `Can not ${action} heading level 1 several times! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 2
    } else if (!this.bypassChecks && level < 2 && this.level === 2) {
      this.report(
        'Can not decrement to heading level 1! Had before',
        this.level
      )
      level = this.level
    }

    this.level = level
  }

  getLevel() {
    // this.used = this.level
    return this.level
  }

  increment() {
    this.setLevel(this.level + 1, 'increment')
  }

  decrement() {
    this.setLevel(this.level - 1, 'decrement')
  }
}

export default class HeadingProvider extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = HeadingContext
  //   static contextType = Context// in order to get _providerProps, we use HeadingContext instead

  static initCounter = (counter = null, reset = false) => {
    if (!defaultCounter.current || reset) {
      defaultCounter.current = counter || new Counter()
    }

    return counter || defaultCounter.current
  }

  static handleCounter = ({
    counter,
    level,
    increase = false,
    decrease = false,
    isProvider = false,
    source = null,
    bypassChecks = false,
    debug = null
  }) => {
    if (bypassChecks) {
      counter.enableBypassChecks()
    }

    if (parseFloat(level) < 1) {
      level = 1
    } else if (parseFloat(level) > 6) {
      level = 6
    }

    if (!isProvider && !counter._hadFirst) {
      counter.setFirst(level)
    } else {
      if (decrease) {
        counter.decrement()
      } else if (increase) {
        counter.increment()
      } else if (level === null) {
        if (counter.level === 1) {
          counter.increment()
        }
      } else if (parseFloat(level) >= 1) {
        counter.setLevel(level)

        // In case we want allow to jump from 1 to 3 or so
        // if (parseFloat(level) > 1) {
        //   return { ...counter, level: parseFloat(level) }
        // }
      }
    }

    const hasReport = counter.emptyReports()
    if (hasReport) {
      if (source) {
        // console.log('source', source)
        const str = convertJsxToString(source)
        hasReport.push('\nNB: This warning was triggered by:', str)
      }
      if (typeof debug === 'function') {
        debug(...hasReport)
      } else {
        warn(...hasReport)
      }
    }

    if (bypassChecks) {
      counter.disableBypassChecks()
    }

    return counter
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state._providerProps = { ...state._providerProps, ...props }

      const newLevel = parseFloat(props.level)
      if (newLevel > 0) {
        // && newLevel !== state.level
        HeadingProvider.handleCounter({
          isProvider: true,
          level: newLevel,
          counter: state.counter,
          //   increase: isTrue(props.increase) || isTrue(props.up),
          //   decrease: isTrue(props.decrease) || isTrue(props.down),
          source: props.text || props.children,
          bypassChecks: isTrue(state._providerProps.skip_checks),
          debug: state._providerProps.debug
        })
        // state.level = state.counter.getLevel()
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    const state = {
      _listenForPropChanges: true
    }

    state.counter = HeadingProvider.initCounter(
      props.counter,
      isTrue(props.reset)
    )

    state._providerProps = props
    const hasProvider = context?.heading
    if (hasProvider) {
      state._providerProps = { ...hasProvider, ...props }
    }

    HeadingProvider.handleCounter({
      isProvider: true,
      level: state._providerProps.level,
      counter: state.counter,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      source: props.text || props.children,
      bypassChecks: isTrue(state._providerProps.skip_checks),
      debug: state._providerProps.debug
    })
    // state.level = state.counter.getLevel()

    // This level state is currently not used
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
