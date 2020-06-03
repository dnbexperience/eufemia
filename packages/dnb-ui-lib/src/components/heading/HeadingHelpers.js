/**
 * Web Heading Counter
 *
 */

import React from 'react'
import {
  warn,
  // makeUniqueId,
  convertJsxToString
} from '../../shared/component-helper'

export const globalSyncCounter = React.createRef()
export const globalHeadingCounter = React.createRef(null)

export const correctHeadingLevel = ({
  counter,
  level,
  reset = null,
  inherit = null,
  increase = false,
  decrease = false,
  source = null,
  bypassChecks = false,
  debug = null
}) => {
  if (bypassChecks) {
    counter.enableBypassChecks()
  }

  const update = (level) => {
    counter.makeMeReady()

    if (inherit) {
      if (globalSyncCounter.current) {
        counter.entry = globalSyncCounter.current.contextCounter.entry
        counter.level = globalSyncCounter.current.level
      } else {
        report(
          debug,
          source,
          'Heading got inherit, but there was noting to inherit.'
        )
      }
    }

    if (level >= 1) {
      counter.setLevel(level)
    } else if (decrease) {
      counter.decrement()
    } else if (increase) {
      counter.increment()
    }

    if (
      counter.level > 0 &&
      !globalHeadingCounter.current?.hasEntryLevel()
    ) {
      globalHeadingCounter.current?.setEntryLevel()
    }
  }

  if (globalNextLevel.current > 0) {
    level = globalNextLevel.current
    globalNextLevel.current = null
    counter.enableBypassChecks()
    update(level)
    counter.disableBypassChecks()
  } else if (globalResetNextTime.current > 0) {
    level = globalResetNextTime.current
    globalResetNextTime.current = null
    counter.reset(level)
  } else if (
    reset === true ||
    reset === 'true' ||
    parseFloat(reset) > -1
  ) {
    counter.reset(reset)
  } else {
    update(level)
  }

  const hasReport = counter.useLastReport()
  if (hasReport) {
    report(debug, source, ...hasReport)
  }

  if (bypassChecks) {
    counter.disableBypassChecks()
  }

  return counter
}

function report(debug, source, ...reports) {
  if (source) {
    const props = source.props || {}
    const ideintifiers = [
      props.id,
      props['class'],
      props.className
    ].filter(Boolean)

    reports.push(
      '\nNB: This warning was triggered by:',
      ideintifiers.length > 0 ? ideintifiers.join(', ') : '',
      convertJsxToString(source)
    )
  }

  if (typeof debug === 'function') {
    debug(...reports)
  } else {
    warn(...reports)
  }
}

// Interceptor to reset leveling -
export const globalResetNextTime = React.createRef(false)
export function resetLevels(level = 1) {
  globalResetNextTime.current = level
}
export const globalNextLevel = React.createRef(null)
export function setNextLevel(level) {
  globalNextLevel.current = parseFloat(level)
}

let countHeadings = 0
export function windUpHeadings() {
  countHeadings++
}
export function tearDownHeadings() {
  countHeadings--
  console.log('countHeadings', countHeadings)
  if (countHeadings === 0) {
    globalHeadingCounter.current = null
    globalSyncCounter.current = null
    globalResetNextTime.current = null
    globalNextLevel.current = null
  }
}
