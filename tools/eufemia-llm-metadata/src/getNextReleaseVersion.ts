import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { findRepoRoot } from './convertHelpers.ts'

const execAsync = promisify(exec)
const releaseBranches = ['release', 'beta', 'alpha']

async function getBranchName(cwd: string) {
  try {
    const { stdout } = await execAsync('git rev-parse --abbrev-ref HEAD', {
      cwd,
    })
    return stdout.trim()
  } catch {
    return ''
  }
}

export async function getNextReleaseVersion() {
  const repoRoot = findRepoRoot()
  const branchName = await getBranchName(repoRoot)

  if (releaseBranches.includes(branchName)) {
    try {
      const { stdout } = await execAsync(
        'yarn workspace @dnb/eufemia semantic-release --dry-run',
        { cwd: repoRoot }
      )
      const nextVersion = stdout.match(
        /The next release version is ([^\n]*)/
      )?.[1]
      if (nextVersion) {
        return nextVersion
      }
    } catch (error) {
      console.error(error)
    }
  }

  return '0.0.0-development'
}
