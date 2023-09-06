/**
 * Jest Setup for Screenshot testing
 *
 */

const PlaywrightEnvironment =
  require('jest-playwright-preset/lib/PlaywrightEnvironment').default
const chalk = require('chalk')
const { config } = require('./jestSetupScreenshots')
const { slugify } = require('../../shared/component-helper')

class JestEnvironment extends PlaywrightEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()
  }

  async teardown() {
    await super.teardown()
  }

  getCurrentTestName(state) {
    const { currentlyRunningTest } = state
    return getParents(currentlyRunningTest).reverse().join(' ')
  }

  reportedPageUrl = []

  async handleTestEvent(event, state) {
    if (
      this.global.pageUrl &&
      !this.reportedPageUrl.includes(this.global.pageUrl)
    ) {
      this.reportedPageUrl.push(this.global.pageUrl)

      const cliColors = {
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        dim: '\x1b[2m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        hidden: '\x1b[8m',
      }

      const themeName = this.global.themeName
        ? `${cliColors.bold}${this.global.themeName}${cliColors.reset} `
        : ''
      console.log(
        `${cliColors.yellow}URL:`,
        `${cliColors.reset}${themeName}${this.global.pageUrl}`
      )
    }

    if (config.retryTimes > 0) {
      if (event.name === 'test_fn_failure') {
        const currentTestName = this.getCurrentTestName(state)
        const slug = slugify(currentTestName)

        if (typeof global.__EVENT_FAILURE_CACHE__ === 'undefined') {
          global.__EVENT_FAILURE_CACHE__ = {}
        }
        global.__EVENT_FAILURE_CACHE__[slug] = {
          currentTestName,
          failed: true,
        }

        const retryAttempt = state.currentlyRunningTest.invocations
        console.log(
          chalk.yellow(
            `Retry attempt #${retryAttempt}: ${currentTestName}`
          )
        )
      }

      if (event.name === 'test_fn_success') {
        const currentTestName = this.getCurrentTestName(state)

        const slug = slugify(currentTestName)
        if (global.__EVENT_FAILURE_CACHE__[slug]) {
          global.__EVENT_FAILURE_CACHE__[slug].failed = false
        }
      }
    }
  }
}

module.exports = JestEnvironment

function getParents(item) {
  const names = []

  if (item?.name) {
    names.push(item.name)
  }

  for (const key in item) {
    if (item[key]?.name) {
      names.push(item[key].name)
    }
    if (item[key]?.parent) {
      names.push(...getParents(item[key].parent))
    }
  }

  return names.filter(
    (name) => name !== 'ROOT_DESCRIBE_BLOCK' && name !== 'Error'
  )
}
