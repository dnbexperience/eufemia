/**
 * Web Heading Counter Instance
 *
 */

import type { HeadingAllProps, InternalHeadingLevel } from './Heading'
import { globalSyncCounter, globalHeadingCounter } from './HeadingHelpers'

export type HeadingCounter = Counter
export type HeadingDebugCounter = boolean | (() => void)
export type ContextCounter = {
  level: InternalHeadingLevel
  lastHeadingLevel: InternalHeadingLevel
  entry: InternalHeadingLevel
  countHeadings: number
  _initCount: number
  _isReady: boolean
  isGlobal?: boolean
}

export const initCounter = (props: CounterProps = null): Counter => {
  if (!globalHeadingCounter.current) {
    globalHeadingCounter.current = new Counter({
      group: 'global',
      isGlobal: true,
    })
  }

  if (props?.counter) {
    return props.counter as Counter
  }

  return new Counter(props)
}

export type CounterGroup = HeadingAllProps['group']
export type CounterChildren = HeadingAllProps['children']

export type CounterProps = {
  isGlobal?: boolean
  group?: CounterGroup
  children?: CounterChildren
  counter?: CounterProps
}

export class Counter {
  level: InternalHeadingLevel = 0
  lastHeadingLevel: InternalHeadingLevel = 0
  entryHeadingLevel: InternalHeadingLevel = 0
  entry: InternalHeadingLevel = 0
  lastResetLevel: InternalHeadingLevel = null
  _isReady = false
  countHeadings = 0
  _initCount = 0
  isGlobal = false
  isHeading = false
  bypassChecks = false
  contextCounter: ContextCounter = null
  reports = []
  group: CounterGroup = null
  children: CounterChildren = null

  constructor(props: CounterProps = null) {
    props = props || {}

    // not required for now
    if (props.group) {
      this.group = props.group // || makeUniqueId()
    }

    if (props.isGlobal) {
      this.isGlobal = true
    }

    this.children = props.children
  }

  report(...str) {
    // Do not check "typeof process" here. Bundlers replace
    // process.env.NODE_ENV, but browsers have no process global.
    if (process.env.NODE_ENV !== 'production') {
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

  getLevel() {
    return this.level
  }

  hasEntryLevel() {
    return this.entry > 0
  }

  hasCorrection() {
    return this._isReady
  }

  setEntryLevel(level: InternalHeadingLevel = null) {
    this.entry = parseFloat(String(level)) || 1
  }

  isInContext() {
    return Boolean(this.contextCounter)
  }

  setContextCounter(contextCounter: ContextCounter) {
    this.contextCounter = contextCounter
  }

  windup() {
    this.contextCounter.countHeadings++
  }

  teardown() {
    if (this.contextCounter.countHeadings > 0) {
      this.contextCounter.level = this.contextCounter.entry
    }
    this.contextCounter.countHeadings--
    this.contextCounter._initCount--
  }

  makeMeReady() {
    if (!this.hasCorrection()) {
      const contextLevel = this.contextCounter.level
      this.level =
        contextLevel > 1 || this.contextCounter._isReady ? contextLevel : 0

      if (this.bypassChecks) {
        this.level = Math.max(1, this.level)
      }

      if (this.isHeading) {
        this.contextCounter._isReady = true
      } else {
        this._isReady = this.contextCounter._isReady
      }

      if (this.entry === 0) {
        this.entry = this.level

        if (this.isHeading) {
          this.contextCounter._initCount++
        }
      }
    }
  }

  factorCheck({ action, level, current, report }) {
    if (!this.bypassChecks && level - current > 1) {
      report &&
        report.push(
          `Heading levels can only be changed by factor one! Got:`,
          level,
          'and had before',
          current
        )

      if (level > current) {
        action = 'increment'
      }

      switch (action) {
        case 'increment':
          level = current + 1
          break

        case 'decrement':
          level = current - 1
          break

        default:
          level = current === 0 ? 1 : current
          break
      }
    }

    return level
  }

  setLevel(level: InternalHeadingLevel, action = 'set') {
    level = Math.trunc(parseFloat(String(level)))

    const report = []

    // Providers change the baseline without adding a heading to the outline.
    const previousLevel =
      globalSyncCounter.current?.lastHeadingLevel ??
      this.contextCounter.lastHeadingLevel
    level = this.factorCheck({
      action,
      level,
      current: previousLevel,
      report,
    })

    if (level > 6) {
      if (!this.bypassChecks) {
        report.push(
          `Cannot [${action}] heading level higher than 6! Got:`,
          level,
          'and had before',
          previousLevel
        )
      }
      level = 6
    } else if (level < 1 && this.level !== -1) {
      if (!this.bypassChecks) {
        report.push(
          `Cannot [${action}] heading level lower than 1! Got:`,
          level,
          'and had before',
          previousLevel
        )
      }
      level = 1
    } else if (!this.bypassChecks && level === 1 && previousLevel === 1) {
      report.push(
        `Cannot set ([${action}]) heading level 1 several times! Got:`,
        level,
        'and had before',
        previousLevel
      )
      level = 2
    } else if (!this.bypassChecks && level < 2 && previousLevel >= 2) {
      report.push(
        'Cannot decrease to heading level 1! Had before',
        previousLevel
      )
      level = 2
    }

    if (report.length > 0) {
      report.push('- The new level is', level)
      this.report(...report)
    }

    this.level = level
    this.lastHeadingLevel =
      this.isHeading || this.bypassChecks ? level : previousLevel

    if (this.isHeading) {
      // update the context to the last level
      this.contextCounter.level = level
      this.contextCounter.lastHeadingLevel = level
    } else {
      // if it is a context, update only the entry to the latest
      this.entry = level
      this.entryHeadingLevel = this.lastHeadingLevel
    }
  }

  increment() {
    this.setLevel(this.level + 1, 'increment')
  }

  decrement() {
    this.setLevel(this.level - 1, 'decrement')
  }

  restart() {
    this.level = 0
  }

  restartContext() {
    this.level = this.entry
    this.lastHeadingLevel = this.entryHeadingLevel
    this._isReady = false
  }

  force(level = 1) {
    this.bypassChecks = true
    this.setLevel(level)
    this.bypassChecks = false
  }

  reset(toLevel = null) {
    toLevel = Math.max(
      1,
      Math.min(6, Math.trunc(parseFloat(toLevel) || 2))
    )

    this.level = this.entry = this.lastResetLevel = toLevel
    this.lastHeadingLevel = this.entryHeadingLevel =
      this.isHeading || toLevel > 1 ? toLevel : 0

    if (this.contextCounter) {
      this.contextCounter.level = this.contextCounter.entry
      if (this.isHeading) {
        this.contextCounter.level = toLevel
        this.contextCounter.lastHeadingLevel = toLevel
        this.contextCounter._isReady = true
      }
    }

    if (toLevel === 1 && globalHeadingCounter.current) {
      globalHeadingCounter.current.level = 2
    }
  }
}
