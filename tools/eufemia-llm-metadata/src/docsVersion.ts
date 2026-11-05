import { exec } from 'node:child_process'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'
import { findRepoRoot } from './convertHelpers.ts'

const execAsync = promisify(exec)
const require = createRequire(import.meta.url)

const DEVELOPMENT_VERSION = '0.0.0-development'

export async function getCommitHash() {
  const repoRoot = findRepoRoot()

  try {
    const { stdout } = await execAsync('git rev-parse --short HEAD', {
      cwd: repoRoot,
    })
    return stdout.trim()
  } catch {
    return ''
  }
}

export async function getDocsVersion() {
  const {
    getNextReleaseVersion,
    getCheckedOutVersion,
  } = require('@dnb/eufemia/scripts/postbuild/getNextReleaseVersion')

  try {
    return (
      (await getNextReleaseVersion()) ||
      getCheckedOutVersion() ||
      DEVELOPMENT_VERSION
    )
  } catch (error) {
    console.warn(
      `Could not determine the Eufemia version of the docs:\n${
        error instanceof Error ? error.message : String(error)
      }`
    )

    return DEVELOPMENT_VERSION
  }
}
