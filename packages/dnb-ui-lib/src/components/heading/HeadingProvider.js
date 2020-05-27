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
  increase: true, // set increase as the default
  decrease: null,
  up: true, // set increase as the default
  down: null,

  // Do not set these! Because we do not smart check the merge!
  //   skip_checks: null,
  //   debug: null,

  counter: null,
  reset: null,
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
    if (!(process && process.env.NODE_ENV === 'production')) {
      this.reports.push(str)
    }
  }

  useLastReport() {
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
      this.report(
        'Can not set other than level 1 at startup! Got:',
        level,
        '- The new level is',
        1
      )
      level = 1
    }

    this._hadFirst = true
    this.level = level || 1
  }

  setLevel(level, action = 'set') {
    level = parseFloat(level)

    const report = []

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
      report.push(
        `Heading levels can only be ${action} by factor one! Got:`,
        level,
        'and had before',
        this.level
      )

      if (level > this.level) {
        action = 'increment'
      }

      switch (action) {
        case 'increment':
          level = this.level + 1
          break

        case 'decrement':
          level = this.level - 1
          break

        default:
          level = this.level === 0 ? 1 : this.level
          break
      }
    }

    if (level > 6) {
      report.push(
        `Can not ${action} heading level higher than 6! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 6
    } else if (level < 1) {
      report.push(
        `Can not ${action} heading level lower than 1! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 1
    } else if (!this.bypassChecks && level === 1 && this.level === 1) {
      report.push(
        `Can not ${action} heading level 1 several times! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 2
    } else if (!this.bypassChecks && level < 2 && this.level === 2) {
      report.push(
        'Can not decrement to heading level 1! Had before',
        this.level
      )
      level = this.level
    }

    if (report.length > 0) {
      report.push('- The new level is', level)
      this.report(...report)
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
    if (!defaultCounter.current || reset || globalResetNextTime.current) {
      defaultCounter.current = counter || new Counter()
      globalResetNextTime.current = false
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

    const update = (level) => {
      if (parseFloat(level) < 1) {
        level = 1
      } else if (parseFloat(level) > 6) {
        level = 6
      }

      if (!isProvider && !counter._hadFirst) {
        counter.setFirst(level)

        if (decrease) {
          counter.decrement()
        } else if (increase) {
          counter.increment()
        }
      } else {
        if (level === null) {
          if (decrease) {
            counter.decrement()
          } else if (counter.level === 1 || increase) {
            counter.increment()
          }
        } else if (parseFloat(level) >= 1) {
          counter.setLevel(level)

          // In case we want allow to jump from 1 to 3 or so
          // if (parseFloat(level) > 1) {
          //   return { ...counter, level: parseFloat(level) }
          // }
        } else {
          if (decrease) {
            counter.decrement()
          } else if (increase) {
            counter.increment()
          }
        }
      }
    }

    if (globalNextLevel.current > 0) {
      level = globalNextLevel.current
      globalNextLevel.current = null
      counter.enableBypassChecks()
      update(level)
      counter.disableBypassChecks()
    } else {
      update(level)
    }

    const hasReport = counter.useLastReport()
    if (hasReport) {
      if (source) {
        const props = source.props || {}
        const ideintifiers = [
          props.id,
          props['class'],
          props.className
        ].filter(Boolean)

        hasReport.push(
          '\nNB: This warning was triggered by:',
          ideintifiers.length > 0 ? ideintifiers.join(', ') : '',
          convertJsxToString(source)
        )
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
      if (
        // state.prevLevel !== props.level &&
        newLevel > 0
      ) {
        // && newLevel !== state.level
        HeadingProvider.handleCounter({
          isProvider: true,
          counter: state.counter,
          level: newLevel,
          bypassChecks: isTrue(state._providerProps.skip_checks),
          source: props.text || props.children,
          debug: state._providerProps.debug
        })
        // NB: This level state is currently not used
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
      counter: state.counter,
      level: state._providerProps.level,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks: isTrue(state._providerProps.skip_checks),
      source: props.text || props.children,
      debug: state._providerProps.debug
    })

    // NB: This level state is currently not used
    // state.level = state.counter.getLevel()
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

// Interceptor to reset leveling -
const globalResetNextTime = React.createRef(false)
export function resetLevels() {
  globalResetNextTime.current = true
}
const globalNextLevel = React.createRef(null)
export function setNextLevel(level) {
  globalNextLevel.current = parseFloat(level)
}
