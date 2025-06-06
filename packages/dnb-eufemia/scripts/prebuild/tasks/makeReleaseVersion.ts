/**
 * Prepublish Task
 *
 */

import { execSync } from 'child_process'
import fs from 'fs-extra'
import { isCI } from 'repo-utils'
import getBranchName from 'current-git-branch'
import {
  getNextReleaseVersion,
  releaseBranches,
} from '../../postbuild/getNextReleaseVersion'
import { log } from '../../lib'

export async function makeReleaseVersion() {
  const branchName = getBranchName()

  if (branchName.startsWith('icons/')) {
    return // stop here
  }

  let version = null
  let sha = null

  if (releaseBranches.includes(branchName)) {
    version = await getNextReleaseVersion()
  }

  if (!version && isCI) {
    version = branchName
  }

  if (isCI) {
    sha = execSync('git rev-parse --short HEAD')?.toString().trim()
  }

  const replace = (content: string) => {
    return content
      .replace(/__SHA__/g, sha || '__SHA__')
      .replace(/__VERSION__/g, version || '__VERSION__')
  }

  // JS – for handling Eufemia.version
  {
    const file = require.resolve('@dnb/eufemia/src/shared/BuildInfo.js')
    const fileContent = await fs.readFile(file, 'utf-8')

    // Update the extracted version of package.json with the build version
    await fs.writeFile(file, replace(fileContent))
  }

  // CSS – for handling --eufemia-version
  {
    const file = require.resolve('@dnb/eufemia/src/style/core/scopes.scss')
    const fileContent = await fs.readFile(file, 'utf-8')

    // Update the extracted version of package.json with the build version
    await fs.writeFile(file, replace(fileContent))
  }

  log.succeed(`Success on write version to CSS and JS sources: ${version}`)
}
