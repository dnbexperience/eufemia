/**
 * Jest Setup for Screenshot testing
 *
 */

const fs = require('fs-extra')
const packpath = require('packpath')
const path = require('path')
const tar = require('tar')
const chalk = require('chalk')
const rimraf = require('rimraf')
const isCi = require('is-ci')
const liveServer = require('live-server')
import { commitToBranch } from '../../../scripts/prepub/commitToBranch'
const { DIR } = require('./jestSetupScreenshots')

module.exports = async function() {
  if (isCi) {
    console.log(chalk.yellow('Teardown Puppeteer.'))
  }

  // close the browser instance
  await global.__BROWSER_GLOBAL__.close()

  // clean-up the wsEndpoint file
  rimraf.sync(DIR)

  if (liveServer.shutdown) {
    liveServer.shutdown()
  }

  // commit a tar of the reports if we are on a CI
  if (isCi) {
    const reportPath = path.resolve(
      packpath.self(),
      './jest-screenshot-report'
    )
    if (fs.existsSync(reportPath)) {
      await tar.create(
        {
          gzip: true,
          file: './reports/jest-screenshot-report.tgz'
        },
        ['./jest-screenshot-report']
      )
      await commitToBranch({
        requiredBranch: 'develop',
        what: 'reports',
        filePathsWhitelist: ['jest-screenshot-report.tgz'],
        isNotAFeature: ['jest-screenshot-report.tgz']
      })
    }
  }
}
