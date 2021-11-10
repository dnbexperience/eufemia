/**
 * Jest Setup for Screenshot testing
 *
 */

const fs = require('fs-extra')
const packpath = require('packpath')
const path = require('path')
const { create } = require('tar')
const chalk = require('chalk')
const { exec } = require('child_process')
const isCI = require('is-ci')
import {
  commitToBranch,
  getCurrentBranchName,
} from '../../../scripts/prepub/commitToBranch'
const { DIR, testScreenshotOnPort } =
  require('./jestSetupScreenshots').config

module.exports = async function () {
  await global.__ENDPOINT__.close()
  global.__ENDPOINT__ = null

  // Do not wait for exec to end
  if (global.startedGatsbyServe) {
    exec(
      `lsof -t -i tcp:${testScreenshotOnPort} | xargs kill -9 `,
      (error, stdout, stderr) => {
        if (error) {
          throw new Error(error)
        }
        if (stderr) {
          throw new Error(stderr)
        }
      }
    )
  }

  // commit a tar of the reports if we are on a CI
  if (isCI) {
    console.log(
      chalk.yellow('Will commit "jest-screenshot-report" to git.')
    )
    const reportPath = path.resolve(
      packpath.self(),
      './jest-screenshot-report'
    )
    if (fs.existsSync(reportPath)) {
      const branchName = await getCurrentBranchName()
      const file = `${branchName.replace(
        /\//g,
        '-'
      )}-jest-screenshot-report.tgz`
      const filePath = path.resolve(packpath.self(), `./reports/${file}`)
      await create(
        {
          gzip: true,
          file: filePath,
        },
        ['./jest-screenshot-report']
      )
      const newBranchName = `${branchName}--visual-reports`
      await commitToBranch({
        skipCI: true,
        isFeature: false,
        requiredBranch: branchName,
        newBranch: newBranchName,
        what: 'reports',
        filePathsIncludelist: [file],
      })
    } else {
      console.log(
        chalk.yellow(
          `Skipping commit phase. No reports found: ${reportPath}`
        )
      )
    }
  }

  // clean-up the wsEndpoint file
  fs.emptyDir(DIR)
}
