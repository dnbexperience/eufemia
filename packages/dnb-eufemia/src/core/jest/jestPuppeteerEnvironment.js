/**
 * Jest Setup for Screenshot testing
 *
 */

const NodeEnvironment = require('jest-environment-node')
const fs = require('fs-extra')
const path = require('path')
const puppeteer = require('puppeteer')
const { DIR } = require('./jestSetupScreenshots').config

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
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
      browserWSEndpoint: wsEndpoint
    })

    this.global.__PAGE__ = await this.global.__BROWSER__.newPage()
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
