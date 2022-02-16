/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import { isCI } from 'repo-utils'
import getBranchName from 'current-git-branch'
import {
  getNextReleaseVersion,
  releaseBranches,
} from '../../release/getNextReleaseVersion'

export async function makeReleaseVersion() {
  const branchName = getBranchName()

  if (!releaseBranches.includes(branchName)) {
    return // stop here
  }

  const file = require.resolve('@dnb/eufemia/src/shared/Eufemia.js')
  const fileContent = await fs.readFile(file, 'utf-8')
  let version = await getNextReleaseVersion()

  if (!version) {
    if (isCI) {
      version = branchName
    } else {
      version = '__VERSION__'
    }
  }

  // Update the extracted version of package.json with the build version
  await fs.writeFile(file, fileContent.replace(/__VERSION__/g, version))
}
