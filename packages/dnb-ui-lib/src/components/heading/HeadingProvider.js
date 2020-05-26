/**
 * Web Heading Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import {
  warn,
  isTrue
  //   dispatchCustomElementEvent
} from '../../shared/component-helper'
// import {
//   ContentObject
//   // , detectScrollDirection // NB: We do currently not use scroll direction handling
// } from './PaginationHelpers'

import HeadingContext from './HeadingContext'

// const randomID = Math.random()
// const cache = {
// }

const propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  //   startup_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  //   current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  //   page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  //   set_content_handler: PropTypes.func,
  //   reset_content_handler: PropTypes.func,
  //   reset_heading_handler: PropTypes.func,
  up: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  down: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  increase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  decrease: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //   rerender: PropTypes.object,
  //   store: PropTypes.object,
  //   useMarkerOnly: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ])
}
const defaultProps = {
  level: 'auto',
  increase: true,
  decrease: null,
  up: true,
  down: null,
  //   current_page: null,
  //   page_count: null,
  //   set_content_handler: null,
  //   reset_content_handler: null,
  //   reset_heading_handler: null,
  //   end_infinity_handler: null,
  //   rerender: null,
  //   store: null,
  //   useMarkerOnly: null,
  children: null
}

// let countHeadings = 0
export const defaultCounter = React.createRef(null)
// let globalLevel = 0

// class HeadingInstance {
// 	constructor(){
// 		globalLevel=0
// 	}
// }

export class Counter {
  level = 0
  used = 0

  constructor({ level }) {
    if (parseFloat(level) >= 1) {
      this.level = 1
    }
  }

  setFirst() {
    this._hadFirst = true
    this.level = 1
  }

  setLevel(level) {
    if (level === 1 && this.level === 1) {
      warn(
        'Can not set heading level 1 several times! Had before ',
        this.level
      )
      this.level = 2
      return // stop!
    }

    if (Math.abs(this.level - level) > 1) {
      warn(
        'Heading levels can only increase/decrease by factor one! Got:',
        level,
        ' and had before ',
        this.level
      )
      return this.increment() // stop!
    }

    this.level = parseFloat(level)
  }

  getLevel() {
    this.used = this.level
    return this.level
  }

  increment() {
    if (this.used !== this.level) {
      warn(
        'Heading level increment is not in sync!',
        this.used,
        this.level
      )
      return // stop!
    }
    this.setLevel(this.level + 1)
  }

  decrement() {
    if (this.level < 3) {
      warn('Can not decrement to heading level 1! Had before', this.level)
      return // stop!
    }
    if (this.level >= 3) {
      this.setLevel(this.level - 1)
    }
  }
}

export default class HeadingProvider extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  constructor(props) {
    super(props)

    this.counter = this.initCounter(props)

    const { level } = this.handleCounter({
      isProvider: true,
      props,
      counter: this.counter
    })

    // this.counter.getLevel()
    this.state = {
      level
    }
  }

  initCounter = (props) => {
    if (!defaultCounter.current) {
      defaultCounter.current = new Counter(props)
    }

    return props.counter || defaultCounter.current
  }

  handleCounter = ({ isProvider = false, counter, props }) => {
    if (!isProvider && !counter._hadFirst) {
      counter.setFirst()
    } else {
      if (props.level === 'auto') {
        if (counter.level === 1) {
          counter.increment()
        }
      } else if (parseFloat(props.level) >= 1) {
        counter.setLevel(props.level)

        // In case we want allow to jump from 1 to 3 or so
        // if (parseFloat(props.level) > 1) {
        //   return { ...counter, level: parseFloat(props.level) }
        // }
      }

      if (isTrue(props.decrease)) {
        counter.decrement()
      } else if (isTrue(props.increase)) {
        counter.increment()
      }
    }

    return counter
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

  setLevel(level) {
    this.setState({
      level,
      _listenForPropChanges: false
    })
  }

  resetLevel() {
    this.setLevel(1)
  }

  increment() {
    this.setLevel(this.state.level + 1)
  }

  decrement() {
    this.setLevel(this.state.level - 1)
  }

  render() {
    const { children } = this.props

    return (
      <HeadingContext.Provider
        value={{
          ...this.context,
          heading: {
            counter: this.counter,
            initCounter: this.initCounter,
            handleCounter: this.handleCounter,
            ...this.props,
            ...this.state
          }
        }}
      >
        {children}
      </HeadingContext.Provider>
    )
  }
}
