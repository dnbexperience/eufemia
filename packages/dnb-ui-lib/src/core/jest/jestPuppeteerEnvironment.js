/**
 * Jest Setup for Screenshot testing
 *
 */

const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
const fs = require('fs')
const isCI = require('is-ci')
const path = require('path')
const puppeteer = require('puppeteer')
const { DIR } = require('./jestSetupScreenshots').config

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    if (isCI) {
      console.log(chalk.yellow('Setup Test Environment.'))
    }
    await super.setup()

    // get the wsEndpoint
    const wsEndpoint = fs.readFileSync(
      path.join(DIR, 'wsEndpoint'),
      'utf8'
    )
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }

    // connect to puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint
    })
  }

  async teardown() {
    if (isCI) {
      console.log(chalk.yellow('Teardown Test Environment.'))
    }
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
