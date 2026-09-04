/**
 * Prepublish Task
 *
 */

import { execSync } from 'child_process'
import fs from 'fs-extra'
import { isCI } from 'repo-utils'
import simpleGit from 'simple-git'
import {
  getNextReleaseVersion,
  isReleaseBranch,
} from '../../postbuild/getNextReleaseVersion'
import { log } from '../../lib'
import { getStyleScopeHash } from '../../../src/plugins/postcss-isolated-style-scope/plugin-scope-hash.js'

export async function makeReleaseVersion() {
  const branchName = (await simpleGit().branch()).current

  if (branchName.startsWith('icons/')) {
    return // stop here
  }

  let version = null
  let sha = null

  if (isReleaseBranch(branchName)) {
    // A release build has to carry a version, so when the commits do not
    // warrant one it keeps the version the package already has
    version =
      (await getNextReleaseVersion()) ||
      (await getLastReleaseVersion(branchName))
  }

  if (!version && isCI) {
    version = branchName
  }

  if (isCI) {
    sha = execSync('git rev-parse --short HEAD')?.toString().trim()
  }

  const buildDate = new Date().toISOString()

  const replace = (content: string) => {
    return content
      .replace(/__SHA__/g, sha || '__SHA__')
      .replace(/__VERSION__/g, version || '__VERSION__')
      .replace(/__BUILD_DATE__/g, buildDate)
  }

  // JS – for handling Eufemia.version
  {
    const file =
      require.resolve('@dnb/eufemia/src/shared/build-info/BuildInfoData.ts')
    const fileContent = await fs.readFile(file, 'utf-8')

    // Update the extracted version of package.json with the build version
    await fs.writeFile(file, replace(fileContent))
  }

  // CJS – for handling Eufemia.version
  {
    const file =
      require.resolve('@dnb/eufemia/src/shared/build-info/BuildInfoData.cjs')
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

  if (version) {
    const scopeHash = getStyleScopeHash({ version, sha })
    const file = require.resolve('@dnb/eufemia/src/scope-hash.txt')
    await fs.writeFile(file, scopeHash)

    log.succeed(
      `Success on write to scope-hash.txt with scope hash: ${scopeHash}`
    )
  }

  // Restore files locally so they don't show up as dirty in git status.
  // On CI, the modified files are needed for the published build package.
  if (!isCI) {
    const packageRoot = require
      .resolve('@dnb/eufemia/package.json')
      .replace('/package.json', '')

    execSync(
      [
        'git checkout --',
        'src/shared/build-info/BuildInfoData.ts',
        'src/shared/build-info/BuildInfoData.cjs',
        'src/style/core/scopes.scss',
        'src/scope-hash.txt',
      ].join(' '),
      { cwd: packageRoot }
    )
  }
}

/**
 * The version the package already carries on this branch: the newest reachable
 * tag of the channel the branch releases on – the same tag release.yml's
 * checkout comment and the portal footer (version.js) resolve.
 */
async function getLastReleaseVersion(branchName: string) {
  const { all } = await simpleGit().tags([
    '--merged',
    'HEAD',
    '--sort=-version:refname',
  ])

  // The channel has to be matched rather than the newest tag taken, because
  // `-version:refname` ranks `v1.2.0-beta.1` above the stable `v1.2.0`: on
  // `release` that prerelease is not the version the package has, and on `beta`
  // the newest stable is not either. semantic-release names a `prerelease: true`
  // branch's versions after the branch itself – `beta` tagged `v10.0.0-beta.8`,
  // `alpha` tagged `v9.0.0-alpha.1` – so the branch name identifies the channel.
  const isStable = (tag: string) => /^v\d+\.\d+\.\d+$/.test(tag)
  const isOnChannel = (tag: string) =>
    /^v\d+\.\d+\.\d+-/.test(tag) &&
    tag.slice(tag.indexOf('-') + 1).startsWith(`${branchName}.`)

  // A prerelease branch that has not released yet falls back to the stable tag
  return (all.find(isOnChannel) || all.find(isStable))?.replace(/^v/, '')
}
