import { isCI } from 'repo-utils'
import simpleGit, { type SimpleGit } from 'simple-git'
import { log } from '../../lib'
import {
  BASE_REF_ENV_VAR,
  CHANGED_FILES_ENV_VAR,
  DEFAULT_BRANCH_BASE_REFS,
  RUN_ALL_COMMIT_FLAG,
  VERSION_BRANCH_REF_PATTERN,
} from './config'
import { normalizePath, removeEmptyValues } from './context'
import type { RunnerContext } from './types'

export type ChangedFilesMode = 'auto' | 'branch' | 'uncommitted'

function parseFilesOutput(output: string): string[] {
  return removeEmptyValues(output.split('\n')).map(normalizePath)
}

function createGitClient(context: RunnerContext): SimpleGit {
  return simpleGit({ baseDir: context.packageRoot })
}

async function runGitCommand(
  context: RunnerContext,
  args: string[]
): Promise<string> {
  const git = createGitClient(context)
  const output = await git.raw(args)
  return output.trim()
}

async function tryRunGitCommand(
  context: RunnerContext,
  args: string[]
): Promise<string | null> {
  try {
    return await runGitCommand(context, args)
  } catch {
    return null
  }
}

async function getVersionBranchRefs(
  context: RunnerContext
): Promise<string[]> {
  try {
    const output = await runGitCommand(context, [
      'for-each-ref',
      '--format=%(refname:short)',
      'refs/heads',
      'refs/remotes/origin',
    ])

    return removeEmptyValues(output.split('\n')).filter((refName) => {
      return VERSION_BRANCH_REF_PATTERN.test(refName)
    })
  } catch {
    return []
  }
}

async function getCommitTimestamp(
  context: RunnerContext,
  commitRef: string
): Promise<number | null> {
  const output = await tryRunGitCommand(context, [
    'show',
    '-s',
    '--format=%ct',
    commitRef,
  ])

  if (!output) {
    return null
  }

  const timestamp = Number(output)
  return Number.isFinite(timestamp) ? timestamp : null
}

export async function getLatestCommitMessage(
  context: RunnerContext
): Promise<string> {
  try {
    return await runGitCommand(context, ['log', '-1', '--pretty=%B'])
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    log.warn(`Warning: Could not get git commit message: ${details}`)
    return ''
  }
}

export function shouldRunAll(commitMessage: string): boolean {
  return commitMessage.includes(RUN_ALL_COMMIT_FLAG)
}

async function getChangedFilesFromRange(
  context: RunnerContext,
  rangeExpression: string
): Promise<string[]> {
  try {
    return parseFilesOutput(
      await runGitCommand(context, [
        'diff',
        '--name-only',
        rangeExpression,
      ])
    )
  } catch {
    return []
  }
}

async function getChangedFilesFromUncommitted(
  context: RunnerContext
): Promise<string[]> {
  const commands = [
    ['diff', '--name-only'],
    ['diff', '--name-only', '--cached'],
    ['ls-files', '--others', '--exclude-standard'],
  ]
  const files = new Set<string>()

  for (const command of commands) {
    try {
      parseFilesOutput(await runGitCommand(context, command)).forEach(
        (filePath) => {
          files.add(filePath)
        }
      )
    } catch {
      // Continue with other commands.
    }
  }

  return Array.from(files).sort((a, b) => {
    return a.localeCompare(b)
  })
}

async function getChangedFilesFromBranchBase(
  context: RunnerContext
): Promise<string[]> {
  const versionRefs = await getVersionBranchRefs(context)
  const explicitBaseRef = process.env[BASE_REF_ENV_VAR]
  const githubBaseRefs = [
    process.env.GITHUB_BASE_REF
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : null,
    process.env.GITHUB_BASE_REF || null,
  ]

  if (explicitBaseRef) {
    const explicitRefs = Array.from(
      new Set(
        [
          explicitBaseRef,
          explicitBaseRef.startsWith('origin/')
            ? explicitBaseRef.slice('origin/'.length)
            : `origin/${explicitBaseRef}`,
        ].filter(Boolean) as string[]
      )
    )

    for (const refName of explicitRefs) {
      const mergeBase = await tryRunGitCommand(context, [
        'merge-base',
        refName,
        'HEAD',
      ])
      if (!mergeBase) {
        continue
      }

      return getChangedFilesFromRange(context, `${mergeBase}...HEAD`)
    }

    return []
  }

  const refs = Array.from(
    new Set(
      [
        ...githubBaseRefs,
        ...versionRefs,
        ...DEFAULT_BRANCH_BASE_REFS,
      ].filter(Boolean) as string[]
    )
  )

  let bestMergeBase: string | null = null
  let bestMergeBaseTimestamp = -1

  for (const refName of refs) {
    const mergeBase = await tryRunGitCommand(context, [
      'merge-base',
      refName,
      'HEAD',
    ])
    if (!mergeBase) {
      continue
    }

    const timestamp = await getCommitTimestamp(context, mergeBase)
    if (timestamp === null) {
      continue
    }

    if (timestamp > bestMergeBaseTimestamp) {
      bestMergeBase = mergeBase
      bestMergeBaseTimestamp = timestamp
    }
  }

  if (!bestMergeBase) {
    return []
  }

  return getChangedFilesFromRange(context, `${bestMergeBase}...HEAD`)
}

function getChangedFilesFromEnvironment(): string[] {
  const raw = process.env[CHANGED_FILES_ENV_VAR]

  if (!raw) {
    return []
  }

  if (!raw.trim()) {
    return []
  }

  return Array.from(
    new Set(removeEmptyValues(raw.split('\n')).map(normalizePath))
  ).sort((a, b) => {
    return a.localeCompare(b)
  })
}

export async function getChangedFiles(
  context: RunnerContext,
  mode: ChangedFilesMode = 'auto'
): Promise<string[]> {
  if (mode === 'uncommitted') {
    return getChangedFilesFromUncommitted(context)
  }

  if (isCI) {
    const filesFromEnvironment = getChangedFilesFromEnvironment()
    if (filesFromEnvironment.length > 0) {
      return filesFromEnvironment
    }

    log.warn(
      `Warning: ${CHANGED_FILES_ENV_VAR} is not set in CI. No changed files resolved.`
    )
    return []
  }

  if (mode === 'branch') {
    return getChangedFilesFromBranchBase(context)
  }

  const filesFromUncommitted =
    await getChangedFilesFromUncommitted(context)
  const filesFromBranchBase = await getChangedFilesFromBranchBase(context)

  return Array.from(
    new Set([...filesFromUncommitted, ...filesFromBranchBase])
  ).sort((a, b) => {
    return a.localeCompare(b)
  })
}
