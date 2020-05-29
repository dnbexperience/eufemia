/**
 * Web Heading Counter
 *
 */

import React from 'react'
import {
  warn,
  // isTrue,
  convertJsxToString
} from '../../shared/component-helper'

export const globalHeadingCounter = React.createRef(null)

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

    if (!this.bypassChecks && level - this.level > 1) {
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

export const initCounter = (counter = null, reset = false) => {
  if (
    !globalHeadingCounter.current ||
    reset ||
    globalResetNextTime.current
  ) {
    globalHeadingCounter.current = counter || new Counter()
    globalResetNextTime.current = false
  }

  return counter || globalHeadingCounter.current
}

export const handleCounter = ({
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

// Interceptor to reset leveling -
export const globalResetNextTime = React.createRef(false)
export function resetLevels() {
  globalResetNextTime.current = true
}
export const globalNextLevel = React.createRef(null)
export function setNextLevel(level) {
  globalNextLevel.current = parseFloat(level)
}
