/**
 * Jest Setup for Screenshot testing
 *
 */

const PlaywrightEnvironment =
  require('jest-playwright-preset/lib/PlaywrightEnvironment').default
const chalk = require('chalk')
const { config } = require('./jestSetupScreenshots')

class JestEnvironment extends PlaywrightEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()

    // jest-playwright exposes these on the global
    const browser = this.global.browser
    const browserName = this.global.browserName || 'firefox'

    if (browser && typeof browser.version === 'function') {
      const version = browser.version() // e.g. "129.0"
      // One neat line before your test output:
      console.log(`\n▶ Using ${browserName} ${version}\n`)
    }
  }

  async teardown() {
    await super.teardown()
  }

  setRetryAttempt(retryAttempt) {
    this.global.retryAttempt = retryAttempt
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
      // Reset retry attempt at the start of each test
      if (event.name === 'test_start') {
        this.setRetryAttempt(0)
      }

      if (event.name === 'test_fn_failure') {
        const currentTestName = this.getCurrentTestName(state)
        const retryAttempt = state.currentlyRunningTest.invocations
        this.setRetryAttempt(retryAttempt)

        // Set a marker on the page to indicate this is a retry
        if (this.global.page) {
          this.global.page
            .evaluate(() => {
              window.__VISUAL_TEST_RETRY__ = true
            })
            .catch(() => {
              // Ignore errors if page is not available
            })
        }

        console.log(
          chalk.yellow(
            `Retry attempt #${retryAttempt}: ${currentTestName}`
          )
        )
      }

      if (event.name === 'test_fn_success') {
        // Reset retry attempt on success
        this.setRetryAttempt(0)
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
