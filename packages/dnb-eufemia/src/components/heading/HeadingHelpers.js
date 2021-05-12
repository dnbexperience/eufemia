/**
 * Web Heading Counter
 *
 */

import React from 'react'
import { warn, convertJsxToString } from '../../shared/component-helper'

export const globalSyncCounter = React.createRef()
export const globalHeadingCounter = React.createRef(null)

const refs = React.createRef()

export const correctHeadingLevel = ({
  counter,
  level,
  ref = null,
  reset = null,
  inherit = null,
  increase = false,
  decrease = false,
  source = null,
  bypassChecks = false,
  debug = null,
}) => {
  // Do that only to make sure we run the correction only if props has changed
  if (ref && refs.current) {
    const foundRef = refs.current.find((cur) => cur.ref === ref)
    if (foundRef) {
      // double check, if level is provided
      // if (ref.level && ref.level !== foundRef.ref.level) {
      // } else {
      // }
      return foundRef.counter
    }
  }

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

  let skipThisTime = false
  const canBeManipulatedNextTime = (overwriteContext) => {
    return (
      counter.contextCounter.isGlobal ||
      counter.contextCounter.entry === 1 ||
      overwriteContext
    )
  }

  if (globalResetNextTime.current) {
    const {
      level: resetLevel,
      overwriteContext,
    } = globalResetNextTime.current
    globalResetNextTime.current = null
    if (
      canBeManipulatedNextTime(overwriteContext) ||
      counter.lastResetLevel === resetLevel
    ) {
      counter.makeMeReady()
      counter.reset(resetLevel)
      skipThisTime = true
    }
  } else if (globalNextLevel.current) {
    const { level: nextLevel, overwriteContext } = globalNextLevel.current
    globalNextLevel.current = null
    if (canBeManipulatedNextTime(overwriteContext)) {
      counter.enableBypassChecks()
      update(nextLevel)
      counter.disableBypassChecks()
      skipThisTime = true
    }
  }

  if (!skipThisTime) {
    if (reset === true || reset === 'true' || parseFloat(reset) > -1) {
      counter.reset(reset)
    } else {
      update(level)
    }
  }

  const hasReport = counter.useLastReport()
  if (hasReport) {
    report(debug, source, ...hasReport)
  }

  if (bypassChecks) {
    counter.disableBypassChecks()
  }

  // Do that only to make sure we run the correction only if props has changed
  if (ref) {
    refs.current = refs.current || []
    refs.current.push({ ref, counter })
  }

  return counter
}

function report(debug, source, ...reports) {
  if (source) {
    const props = source.props || {}
    const identifiers = [props.id, props['class'], props.className].filter(
      Boolean
    )

    reports.push(
      '\nNB: This warning was triggered by:',
      identifiers.length > 0 ? identifiers.join(', ') : '',
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
export function resetAllLevels() {
  countHeadings = 0
  resetLevels(1, { overwriteContext: false })
  teardownHeadings()
}
export const globalResetNextTime = React.createRef(false)
export function resetLevels(level, { overwriteContext = false } = {}) {
  globalResetNextTime.current = { level, overwriteContext }
}
export const globalNextLevel = React.createRef(null)
export function setNextLevel(level, { overwriteContext = false } = {}) {
  globalNextLevel.current = {
    level,
    overwriteContext,
  }
}

let countHeadings = 0
export function windupHeadings() {
  countHeadings++
  // reset the sync counter, as this will distract correct assembling
  globalSyncCounter.current = null
}
export function teardownHeadings() {
  countHeadings--
  if (countHeadings === 0) {
    globalHeadingCounter.current = null
    globalSyncCounter.current = null
    globalResetNextTime.current = null
    globalNextLevel.current = null
  }
}

export function debugCounter(counter) {
  return JSON.stringify(
    {
      group: counter.group || counter.contextCounter.group,
      level: counter.level,
      entry: counter.entry,
      contextLevel: counter.contextCounter.level,
      contextLEntry: counter.contextCounter.entry,
    },
    null,
    2
  )
}
