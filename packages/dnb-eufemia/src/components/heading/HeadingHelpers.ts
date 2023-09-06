/**
 * Web Heading Counter
 *
 */

import {
  HeadingAllProps,
  InternalHeadingLevel,
  HeadingLevelSizeResolutions,
} from './Heading'
import { ThemeNames } from '../../shared'
import { warn, convertJsxToString } from '../../shared/component-helper'
import { DynamicElement } from '../../shared/types'
import { HeadingCounter } from './HeadingCounter'

type GlobalSyncCounter = { current: HeadingCounter }
type GlobalHeadingCounter = { current: HeadingCounter }
export const globalSyncCounter: GlobalSyncCounter = {
  current: null,
}
export const globalHeadingCounter: GlobalHeadingCounter = {
  current: null,
}

const refs: {
  current: Array<{ ref: HeadingAllProps; counter: HeadingCounter }>
} = {
  current: null,
}

type CorrectInternalHeadingLevel = {
  counter: HeadingCounter
  level: InternalHeadingLevel
  ref?: HeadingAllProps
  reset?: HeadingAllProps['reset']
  inherit?: boolean
  increase?: boolean
  decrease?: boolean
  source?: HeadingAllProps['children']
  bypassChecks?: boolean
  isRerender?: boolean
  debug?: HeadingAllProps['debug']
}

export const correctInternalHeadingLevel = ({
  counter,
  level,
  ref = null,
  reset = null,
  inherit = null,
  increase = false,
  decrease = false,
  source = null,
  bypassChecks = false,
  isRerender = false,
  debug = null,
}: CorrectInternalHeadingLevel) => {
  // Do that only to make sure we run the correction only if props has changed
  if (ref && refs.current) {
    const foundRef = refs.current.find((cur) => cur.ref === ref)
    if (foundRef) {
      return foundRef.counter
    }
  }

  if (bypassChecks) {
    counter.enableBypassChecks()
  }

  const update = (level: InternalHeadingLevel) => {
    if (!isRerender) {
      counter.makeMeReady({ level })
    }

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

  let skipUpdateFromProp = false
  const canBeManipulatedNextTime = (overwriteContext: boolean) => {
    return (
      counter.contextCounter.isGlobal ||
      counter.contextCounter.entry === 1 ||
      overwriteContext
    )
  }

  if (globalResetNextTime.current) {
    const { level: resetLevel, overwriteContext } =
      globalResetNextTime.current
    globalResetNextTime.current = null

    if (
      canBeManipulatedNextTime(overwriteContext) ||
      counter.lastResetLevel === resetLevel
    ) {
      counter.makeMeReady()
      counter.reset(resetLevel)
      skipUpdateFromProp = true
    }
  } else if (globalNextLevel.current) {
    const { level: nextLevel, overwriteContext } = globalNextLevel.current
    globalNextLevel.current = null
    if (canBeManipulatedNextTime(overwriteContext)) {
      counter.enableBypassChecks()
      update(nextLevel)
      counter.disableBypassChecks()
      skipUpdateFromProp = true
    }
  }

  if (!skipUpdateFromProp) {
    if (reset === true || parseFloat(String(reset)) > -1) {
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
export const globalResetNextTime: { current: GlobalNextLevel } = {
  current: null,
}
export function resetLevels(
  level: InternalHeadingLevel,
  { overwriteContext = false } = {}
) {
  globalResetNextTime.current = { level, overwriteContext }
}
type GlobalNextLevel = {
  level: InternalHeadingLevel
  overwriteContext: boolean
}
export const globalNextLevel: { current: GlobalNextLevel } = {
  current: null,
}
export function setNextLevel(
  level: InternalHeadingLevel,
  { overwriteContext = false } = {}
) {
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

export const getHeadingSize = (
  theme: ThemeNames
): HeadingLevelSizeResolutions => {
  switch (theme) {
    case 'sbanken':
      return {
        1: 'xx-large',
        2: 'x-large',
        3: 'large',
        4: 'medium',
        5: 'basis',
        6: 'small',
      }
    case 'ui':
    default:
      return {
        1: 'xx-large',
        2: 'large',
        3: 'medium',
        4: 'basis',
        5: 'small',
        6: 'x-small',
      }
  }
}

export const getHeadingElement = (
  level: InternalHeadingLevel
): DynamicElement => {
  switch (level) {
    case 1:
      return 'h1'
    case 2:
      return 'h2'
    case 3:
      return 'h3'
    case 4:
      return 'h4'
    case 5:
      return 'h5'
    case 6:
      return 'h6'
  }
}
