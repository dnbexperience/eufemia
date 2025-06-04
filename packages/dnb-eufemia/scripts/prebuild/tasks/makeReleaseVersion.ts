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

  if (releaseBranches.includes(branchName)) {
    version = await getNextReleaseVersion()
  }

  if (!version) {
    if (isCI) {
      version = branchName
    } else {
      version = '__VERSION__'
    }
  }

  const sha = execSync('git rev-parse --short HEAD')?.toString().trim()
  const replace = (content: string) => {
    return content
      .replace(/__SHA__/g, sha)
      .replace(/__VERSION__/g, version)
  }

  // JS – for handling Eufemia.version
  {
    const file = require.resolve('@dnb/eufemia/src/shared/Eufemia.ts')
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
