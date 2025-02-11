/**
 * Web Heading Counter Instance
 *
 */

import { HeadingAllProps, InternalHeadingLevel } from './Heading'
import { globalSyncCounter, globalHeadingCounter } from './HeadingHelpers'

export type HeadingCounter = Counter
export type HeadingDebugCounter = boolean | (() => void)
export type ContextCounter = {
  level: InternalHeadingLevel
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
    if (
      !(
        typeof process !== 'undefined' &&
        process.env.NODE_ENV === 'production'
      )
    ) {
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

  makeMeReady({ level }: { level?: InternalHeadingLevel } = {}) {
    if (!this.hasCorrection()) {
      if (this.contextCounter.level > 1) {
        this.level = this.contextCounter.level
      } else if (this.contextCounter._isReady) {
        if (!this.bypassChecks) {
          this.level = 2
        }
      } else if (!this.contextCounter._isReady) {
        this.contextCounter._isReady = true
        if (!this.bypassChecks && !level) {
          this.level = 1
        }
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
    level = parseFloat(String(level))

    const report = []

    if (globalSyncCounter.current?.level > 0) {
      level = this.factorCheck({
        action,
        level,
        current: globalSyncCounter.current.level,
        report,
      })
    }

    level = this.factorCheck({
      action,
      level,
      current: this.level,
      report,
    })

    if (level > 6) {
      report.push(
        `Cannot [${action}] heading level higher than 6! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 6
    } else if (level < 1 && this.level !== -1) {
      report.push(
        `Cannot [${action}] heading level lower than 1! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 1
    } else if (!this.bypassChecks && level === 1 && this.level === 1) {
      report.push(
        `Cannot set ([${action}]) heading level 1 several times! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 2
    } else if (!this.bypassChecks && level < 2 && this.level === 2) {
      report.push(
        'Cannot decrease to heading level 1! Had before',
        this.level
      )
      level = this.level
    }

    if (report.length > 0) {
      report.push('- The new level is', level)
      this.report(...report)
    }

    this.level = level

    if (this.isHeading) {
      // update the context to the last level
      this.contextCounter.level = level
    } else {
      // if it is a context, update only the entry to the latest
      this.entry = level
    }
  }

  increment() {
    this.setLevel(this.level + 1, 'increment')
  }

  decrement() {
    this.setLevel(this.level - 1, 'decrement')
  }

  force(level = 1) {
    this.bypassChecks = true
    this.setLevel(level)
    this.bypassChecks = false
  }

  reset(toLevel = null) {
    toLevel = parseFloat(toLevel) || 2

    this.level = this.entry = this.lastResetLevel = toLevel

    if (this.contextCounter) {
      this.contextCounter.level = this.contextCounter.entry
    }

    if (toLevel === 1 && globalHeadingCounter.current) {
      globalHeadingCounter.current.level = 2
    }
  }
}
