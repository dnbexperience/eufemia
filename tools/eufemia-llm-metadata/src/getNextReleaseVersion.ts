import { exec } from 'node:child_process'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'
import { findRepoRoot } from './convertHelpers.ts'

const execAsync = promisify(exec)
const require = createRequire(import.meta.url)

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

export async function getNextReleaseVersion() {
  const {
    getNextReleaseVersion: resolveVersion,
  } = require('@dnb/eufemia/scripts/postbuild/getNextReleaseVersion')

  try {
    return (await resolveVersion()) || '0.0.0-development'
  } catch (error) {
    console.warn(
      `Could not determine the next release version:\n${error.message}`
    )

    return '0.0.0-development'
  }
}
