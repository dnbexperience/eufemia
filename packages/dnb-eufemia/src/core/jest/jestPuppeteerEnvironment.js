/**
 * Jest Setup for Screenshot testing
 *
 */

const NodeEnvironment = require('jest-environment-node').default
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const puppeteer = require('puppeteer')
const packpath = require('packpath')
const { config } = require('./jestSetupScreenshots')
const { slugify } = require('../../shared/component-helper')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor({ globalConfig, projectConfig }, context) {
    super({ globalConfig, projectConfig }, context)

    if (typeof global.__EVENT_FAILURE_CACHE__ === 'undefined') {
      global.__EVENT_FAILURE_CACHE__ = {}
    }
  }

  async setup() {
    await super.setup()

    // get the wsEndpoint
    const wsEndpoint = await fs.readFile(
      path.join(config.DIR, 'wsEndpoint'),
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

  getCurrentTestName(state) {
    const { currentlyRunningTest } = state
    return `${currentlyRunningTest.parent.name} ${currentlyRunningTest.name}`
  }

  async removeUnwantedSnapshots() {
    const list = Object.values(global.__EVENT_FAILURE_CACHE__)
    for await (const entry of list) {
      const { currentTestName, failed } = entry
      if (failed === false) {
        await this.deleteSnapshots(currentTestName)
      }
    }
  }

  async deleteSnapshots(currentTestName) {
    const reportsPath = path.resolve(
      packpath.self(),
      './jest-screenshot-report/reports'
    )

    if (fs.existsSync(reportsPath)) {
      const slug = slugify(currentTestName)
      const dirs = await fs.readdir(reportsPath)

      for await (const dir of dirs) {
        if (dir.includes(slug)) {
          const dirPath = path.resolve(reportsPath, dir)
          await fs.rm(dirPath, { recursive: true, force: true })
        }
      }
    }
  }

  async handleTestEvent(event, state) {
    if (config.retryTimes > 0) {
      if (event.name === 'test_fn_failure') {
        this.global.__EVENT_FAILURE__ = true

        const currentTestName = this.getCurrentTestName(state)
        const slug = slugify(currentTestName)

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

  async teardown() {
    await this.global.__PAGE__.close()
    this.global.__PAGE__ = null

    await this.removeUnwantedSnapshots()

    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
