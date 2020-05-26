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

  counter: PropTypes.any,
  children: PropTypes.any
}
const defaultProps = {
  level: null, // like auto
  increase: true,
  decrease: null,
  up: true,
  down: null,
  reset: null,

  counter: null,
  children: null
}

export const defaultCounter = React.createRef(null)

export class Counter {
  level = 0
  used = 0

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
    if (!this.bypassChecks && parseFloat(level) > 1) {
      this.report('Can not set other than level 1 at startup! Got:', level)
      level = 1
    }

    this._hadFirst = true
    this.level = parseFloat(level) || 1
  }

  setLevel(level, logName = 'set') {
    if (level >= 5 || this.level >= 5) {
      this.report(
        `Can not ${logName} heading level higher than 6! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 6
    }

    if (!this.bypassChecks && level === 1 && this.level === 1) {
      this.report(
        `Can not ${logName} heading level 1 several times! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 2
    }

    if (!this.bypassChecks && Math.abs(this.level - level) > 1) {
      this.report(
        'Heading levels can only increase/decrease by factor one! Got:',
        level,
        'and had before',
        this.level
      )
      level = this.level + 1
    }

    this.level = parseFloat(level)
  }

  getLevel() {
    this.used = this.level
    return this.level
  }

  increment() {
    if (!this.bypassChecks && this.used !== this.level) {
      this.report(
        'Heading level increment is not in sync!',
        this.used,
        'vs',
        this.level
      )
      return // stop!
    }
    this.setLevel(this.level + 1, 'increment')
  }

  decrement() {
    if (!this.bypassChecks && this.level < 3) {
      this.report(
        'Can not decrement to heading level 1! Had before',
        this.level
      )
      return // stop!
    }
    this.setLevel(this.level - 1, 'decrement')
  }
}

export default class HeadingProvider extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = HeadingContext
  //   static contextType = Context// in order to get _providerProps, we use HeadingContext instead

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state._providerProps = { ...state._providerProps, ...props }
    }
    state._listenForPropChanges = true

    return state
  }

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
    bypassChecks = false
  }) => {
    if (bypassChecks) {
      counter.enableBypassChecks()
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
        const str = convertJsxToString(source)
        hasReport.push('\nNB: This warning was triggered by:', str)
      }
      warn(...hasReport)
    }

    if (bypassChecks) {
      counter.disableBypassChecks()
    }

    return counter
  }

  constructor(props, context) {
    super(props)

    let _providerProps = props

    const hasProvider = context?.heading
    if (hasProvider) {
      _providerProps = { ...hasProvider, ...props }
    }

    this.counter = HeadingProvider.initCounter(
      props.counter,
      isTrue(props.reset)
    )

    HeadingProvider.handleCounter({
      isProvider: true,
      level: _providerProps.level,
      counter: this.counter,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      source: props.children,
      bypassChecks: isTrue(_providerProps.bypass_checks)
    })

    // This level state is currently not used
    // const level = this.counter.getLevel()
    this.state = {
      //   level,
      _providerProps
    }
  }

  //   componentDidMount() {
  //     countHeadings++
  //     // this._isMounted = true
  //   }
  //   componentWillUnmount() {
  //     countHeadings--
  //     if (countHeadings === 0) {
  //       defaultCounter.current = null
  //     }
  //     // clearTimeout(this.rerenderTimeout)
  //     // this._isMounted = false
  //   }

  //   setLevel(level) {
  //     this.setState({
  //       level,
  //       _listenForPropChanges: false
  //     })
  //   }

  //   resetLevel() {
  //     this.setLevel(1)
  //   }

  //   increment() {
  //     this.setLevel(this.state.level + 1)
  //   }

  //   decrement() {
  //     this.setLevel(this.state.level - 1)
  //   }

  render() {
    return (
      <HeadingContext.Provider
        value={{
          //   ...this.context,// in case we would send in the global context
          heading: {
            counter: this.counter,
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
