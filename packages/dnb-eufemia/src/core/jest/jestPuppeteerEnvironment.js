/**
 * Jest Setup for Screenshot testing
 *
 */

const NodeEnvironment = require('jest-environment-node')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const puppeteer = require('puppeteer')
const { DIR } = require('./jestSetupScreenshots').config

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    if (typeof global.__EVENT_FAILURE_CACHE__ === 'undefined') {
      global.__EVENT_FAILURE_CACHE__ = []
    }
  }

  async setup() {
    await super.setup()

    // get the wsEndpoint
    const wsEndpoint = await fs.readFile(
      path.join(DIR, 'wsEndpoint'),
      'utf8'
    )
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }

    // connect to puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    })

    this.global.__PAGE__ = await this.global.__BROWSER__.newPage()
  }

  getName(state) {
    const { currentlyRunningTest } = state
    return `${currentlyRunningTest.parent.name} / ${currentlyRunningTest.name}`
  }

  async handleTestEvent(event, state) {
    if (event.name === 'test_fn_failure') {
      this.global.__EVENT_FAILURE__ = true

      const name = this.getName(state)
      if (!global.__EVENT_FAILURE_CACHE__.includes(name)) {
        global.__EVENT_FAILURE_CACHE__.push(name)
      }

      console.log(
        chalk.yellow(
          `Retry attempt #${state.currentlyRunningTest.invocations}: ${name}`
        )
      )
    }

    if (event.name === 'test_fn_success') {
      const name = this.getName(state)
      global.__EVENT_FAILURE_CACHE__ =
        global.__EVENT_FAILURE_CACHE__.filter((n) => n !== name)
    }
  }

  async teardown() {
    await this.global.__PAGE__.close()
    this.global.__PAGE__ = null

    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
