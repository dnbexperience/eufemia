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
    return getParrents(currentlyRunningTest).reverse().join(' ')
  }

  async handleTestEvent(event, state) {
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

function getParrents(item) {
  const names = []

  if (item?.name) {
    names.push(item.name)
  }

  for (const key in item) {
    if (item[key]?.name) {
      names.push(item[key].name)
    }
    if (item[key]?.parent) {
      names.push(...getParrents(item[key].parent))
    }
  }

  return names.filter(
    (name) => name !== 'ROOT_DESCRIBE_BLOCK' && name !== 'Error'
  )
}
