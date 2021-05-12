/**
 * Web Heading Counter Instance
 *
 */

// import {
//   makeUniqueId
// } from '../../shared/component-helper'
import {
  globalSyncCounter,
  globalHeadingCounter,
  // globalNextLevel,
  // globalResetNextTime
} from './HeadingHelpers'

export const initCounter = (props = null) => {
  if (!globalHeadingCounter.current) {
    globalHeadingCounter.current = new Counter({
      group: 'global',
      isGlobal: true,
    })
  }

  return (props && props.counter) || new Counter(props)
}

export class Counter {
  level = 0
  entry = 0
  _isReady = false
  countHeadings = 0
  _initCount = 0
  isGlobal = false
  isHeading = false
  bypassChecks = false
  contextCounter = null
  reports = []

  constructor(props = null) {
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

  setEntryLevel(level = null) {
    this.entry = parseFloat(level) || 1
  }

  isInContext() {
    return Boolean(this.contextCounter)
  }

  setContextCounter(contextCounter) {
    this.contextCounter = contextCounter
  }

  skipMakeMeReady() {
    this._isReady = true
    this.entry = 1
    this.level = 1
    this.contextCounter.entry = 2
  }

  windup() {
    this.contextCounter.countHeadings++
  }

  teardown() {
    if (this.contextCounter.countHeadings > 0) {
      this.contextCounter.level = this.contextCounter.entry
      // this.contextCounter.rerender()
    }
    this.contextCounter.countHeadings--
    this.contextCounter._initCount--
  }

  makeMeReady() {
    if (!this.hasCorrection()) {
      if (this.contextCounter.level > 1) {
        this.level = this.contextCounter.level
      } else if (this.contextCounter._isReady) {
        if (!this.bypassChecks) {
          this.level = 2
        }
      } else if (!this.contextCounter._isReady) {
        this.contextCounter._isReady = true
        if (!this.bypassChecks) {
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

  setLevel(level, action = 'set') {
    level = parseFloat(level)

    const report = []

    // skip level setting on first heading
    if (
      // !this.bypassChecks &&
      !this._isReady &&
      this.level === 1 &&
      (!globalSyncCounter.current || globalSyncCounter.current.level < 2)

      // !this.bypassChecks &&
      // (this.contextCounter.level === 0 ||
      //   (this.contextCounter.level < 2 &&
      //     this.contextCounter._initCount === 1)) &&
      // (!globalSyncCounter.current || globalSyncCounter.current.level < 2)
    ) {
      return // stop
    }

    if (globalSyncCounter.current?.level > 0) {
      level = this.factorCheck({
        report,
        action,
        level,
        current: globalSyncCounter.current.level,
      })
    }

    // NB: we don't need this anymore, because of the globalSyncCounter check
    // if (
    //   this.contextCounter._initCount === 2 &&
    //   !this.contextCounter.isGlobal
    // ) {
    //   level = this.factorCheck({
    //     action,
    //     level,
    //     current: this.contextCounter.level,
    //     report
    //   })
    // }

    level = this.factorCheck({
      action,
      level,
      current: this.level,
      report,
    })

    if (level > 6) {
      report.push(
        `Can not [${action}] heading level higher than 6! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 6
    } else if (level < 1 && this.level !== -1) {
      report.push(
        `Can not [${action}] heading level lower than 1! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 1
    } else if (!this.bypassChecks && level === 1 && this.level === 1) {
      report.push(
        `Can not set ([${action}]) heading level 1 several times! Got:`,
        level,
        'and had before',
        this.level
      )
      level = 2
    } else if (!this.bypassChecks && level < 2 && this.level === 2) {
      report.push(
        'Can not decrease to heading level 1! Had before',
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
