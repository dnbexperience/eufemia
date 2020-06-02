/**
 * Web Heading Counter Instance
 *
 */

// import {
//   makeUniqueId
// } from '../../shared/component-helper'
import { globalSyncCounter, globalHeadingCounter } from './HeadingHelpers'

export class Counter {
  level = 0
  entry = 0
  countHeadings = 0
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

    // if (parseFloat(props.level) > 0) {
    //   this.setLevel(props.level)
    // }
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

  getLevel() {
    return this.level
  }

  hasEntryLevel() {
    return this.entry > 0
  }

  getEntryLevel() {
    return this.entry
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
    this.entry = 1
    this.level = 1
    this.contextCounter.entry = 2
  }

  makeMeReady() {
    if (!this.hasEntryLevel()) {
      if (this.contextCounter.level > 1) {
        this.entry = this.contextCounter.entry
        this.level = this.contextCounter.level
      } else if (this.contextCounter.entry === 1) {
        if (!this.bypassChecks) {
          this.level = 2
        }
      } else if (this.contextCounter.entry === 0) {
        this.contextCounter.entry = 1
        if (!this.bypassChecks) {
          this.level = 1
        }
      }
    }

    if (this.isHeading) {
      this.contextCounter.countHeadings++
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
      this.entry === 0 &&
      this.level === 1 &&
      (!globalSyncCounter.current || globalSyncCounter.current.level < 2)

      // !this.bypassChecks &&
      // (this.contextCounter.level === 0 ||
      //   (this.contextCounter.level < 2 &&
      //     this.contextCounter.countHeadings === 1)) &&
      // (!globalSyncCounter.current || globalSyncCounter.current.level < 2)
    ) {
      return // stop
    }

    if (globalSyncCounter.current?.level > 0) {
      level = this.factorCheck({
        report,
        action,
        level,
        current: globalSyncCounter.current.level
      })
    }

    // if (
    //   this.contextCounter.countHeadings === 2 &&
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
      report
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
    this.contextCounter.level = level
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
    this.level = toLevel
    this.entry = 0

    if (
      toLevel === 1 &&
      !this.isInContext() &&
      !globalHeadingCounter.current?.hasEntryLevel()
    ) {
      globalHeadingCounter.current?.setEntryLevel()
    }
  }
}
