import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { log } from '../../lib'
import {
  CI_ALWAYS_RUN_BRANCHES,
  PORTAL_DOCS_REPO_PREFIX,
  RUN_ALL_COMMIT_FLAG,
} from './config'
import { createContext } from './context'
import { loadDependencyMap, loadScssDependencyMap } from './dependencyMaps'
import {
  findCompositionImpactedTests,
  findPortalDocsImpactedTests,
  collectScreenshotTests,
} from './discovery'
import {
  getChangedFiles,
  getLatestCommitMessage,
  type ChangedFilesMode,
  shouldRunAll,
} from './git'
import {
  analyzeSelection,
  getGlobalImpactCauses,
  toPackageRelativePath,
} from './selection'

type CliOptions = {
  shouldExplain: boolean
  isDryRun: boolean
  changedFilesMode: ChangedFilesMode
}

const VISUAL_LOG_LABEL =
  '\x1b[1m\x1b[38;2;253;187;49mVisual Regression Tests\x1b[0m'

function logWithLabel(message: string): string {
  return `${VISUAL_LOG_LABEL} ${message}`
}

function getCiBranchName(): string | null {
  const refName = process.env.GITHUB_REF_NAME
  if (refName) {
    return refName
  }

  const ref = process.env.GITHUB_REF
  if (!ref) {
    return null
  }

  const prefix = 'refs/heads/'
  if (ref.startsWith(prefix)) {
    return ref.slice(prefix.length)
  }

  return null
}

function shouldRunAllByBranch(): boolean {
  const branchName = getCiBranchName()
  return branchName ? CI_ALWAYS_RUN_BRANCHES.includes(branchName) : false
}

export function resolveCliOptions(argv: string[]): CliOptions {
  let changedFilesMode: ChangedFilesMode = 'auto'
  const shouldExplain = argv.includes('--explain')
  const isDryRun = argv.includes('--dry-run') || shouldExplain

  for (let i = 0; i < argv.length; i += 1) {
    const argument = argv[i]

    if (argument === '--uncommitted') {
      changedFilesMode = 'uncommitted'
      continue
    }

    if (argument === '--branch') {
      changedFilesMode = 'branch'
      continue
    }

    if (argument.startsWith('--changes=')) {
      const mode = argument.replace('--changes=', '')
      if (mode === 'auto' || mode === 'branch' || mode === 'uncommitted') {
        changedFilesMode = mode
      }
      continue
    }

    if (argument === '--changes') {
      const mode = argv[i + 1]
      if (mode === 'auto' || mode === 'branch' || mode === 'uncommitted') {
        changedFilesMode = mode
        i += 1
      }
    }
  }

  return {
    shouldExplain,
    isDryRun,
    changedFilesMode,
  }
}

function getBaseCommandTokens(
  packageJson: { scripts: Record<string, string> } | null,
  packageRoot: string,
  runAllWithoutBail: boolean
): string[] {
  const baseCommand = packageJson?.scripts?.['test:screenshots:ci']

  if (!baseCommand) {
    throw new Error(
      `Missing script "test:screenshots:ci" in ${path.join(
        packageRoot,
        'package.json'
      )}`
    )
  }

  const tokens = baseCommand.split(' ').filter(Boolean)

  if (!runAllWithoutBail) {
    return tokens
  }

  return tokens.filter((token) => token !== '--bail')
}

function runCommand(packageRoot: string, commandTokens: string[]) {
  const [command, ...args] = commandTokens

  log.info(
    logWithLabel(`Running command: ${[command, ...args].join(' ')}`)
  )

  execFileSync(command, args, {
    stdio: 'inherit',
    cwd: packageRoot,
  })
}

function printExplainOutput(
  changedFilesMode: ChangedFilesMode,
  changedFiles: string[],
  selectedTests: string[],
  testCauses: Record<string, string[]>
) {
  log.info(logWithLabel(`Change scope: ${changedFilesMode}`))
  log.info(logWithLabel('Changed files:'))
  changedFiles.forEach((filePath) => {
    log.info(`- ${filePath}`)
  })

  log.info(logWithLabel('Impacted tests and causes:'))
  selectedTests.forEach((testPath) => {
    const causes = testCauses[testPath] || ['Unknown']
    log.info(`- ${testPath}`)
    causes.forEach((cause) => {
      log.info(`  - ${cause}`)
    })
  })

  if (selectedTests.length === 0) {
    log.info('- none')
  }
}

function printGlobalImpactCauses(
  causes: Array<{ filePath: string; reason: string }>
) {
  if (causes.length === 0) {
    return
  }

  log.info(logWithLabel('Global impact triggers:'))
  causes.forEach((cause) => {
    log.info(`- ${cause.filePath}`)
    log.info(`  - ${cause.reason}`)
  })
}

export async function runScreenshotsTests() {
  const context = createContext()
  const cliOptions = resolveCliOptions(process.argv.slice(2))
  const { changedFilesMode, shouldExplain, isDryRun } = cliOptions

  const commitMessage = await getLatestCommitMessage(context)
  const runAllFromCommit = shouldRunAll(commitMessage)
  const runAllFromBranch = shouldRunAllByBranch()
  const commandTokens = getBaseCommandTokens(
    context.packageJson,
    context.packageRoot,
    runAllFromCommit || runAllFromBranch
  )

  if (runAllFromCommit || runAllFromBranch) {
    const reason = runAllFromCommit
      ? `because ${RUN_ALL_COMMIT_FLAG} was found in the commit message`
      : `because branch "${getCiBranchName()}" always runs all screenshot tests`

    log.info(
      logWithLabel(
        `Running all screenshot tests without --bail ${reason}.`
      )
    )
    if (!isDryRun) {
      runCommand(context.packageRoot, commandTokens)
    }
    return
  }

  const changedFiles = await getChangedFiles(context, changedFilesMode)

  if (changedFiles.length === 0) {
    log.info(
      logWithLabel('No changed files resolved. Skipping screenshot tests.')
    )

    if (shouldExplain) {
      printExplainOutput(changedFilesMode, [], [], {})
    }

    return
  }

  const packageRelativeEntries = changedFiles
    .map((repoPath) => {
      return {
        repoPath,
        packagePath: toPackageRelativePath(repoPath),
      }
    })
    .filter((entry) => entry.packagePath !== null)
    .map((entry) => {
      return {
        repoPath: entry.repoPath,
        packagePath: entry.packagePath as string,
      }
    })

  const sourceChanges = packageRelativeEntries
    .map((entry) => entry.packagePath)
    .filter((packagePath) => packagePath.startsWith('src/'))
  const hasPortalDocsChanges = changedFiles.some((filePath) => {
    return filePath.startsWith(PORTAL_DOCS_REPO_PREFIX)
  })

  const globalImpactCauses = getGlobalImpactCauses(changedFiles)
  const hasGlobalImpact = globalImpactCauses.length > 0

  if (hasGlobalImpact) {
    log.info(
      logWithLabel(
        `Global visual impact detected (${
          globalImpactCauses.length
        } trigger${
          globalImpactCauses.length === 1 ? '' : 's'
        }). Running all screenshot tests.`
      )
    )

    printGlobalImpactCauses(globalImpactCauses)

    if (shouldExplain) {
      printExplainOutput(changedFilesMode, changedFiles, [], {})
    }

    if (isDryRun) {
      return
    }

    runCommand(context.packageRoot, commandTokens)
    return
  }

  if (sourceChanges.length === 0 && !hasPortalDocsChanges) {
    log.info(
      logWithLabel(
        'No visual source changes detected. Skipping screenshot tests.'
      )
    )

    if (shouldExplain) {
      printExplainOutput(changedFilesMode, changedFiles, [], {})
    }

    return
  }

  const allScreenshotTests = collectScreenshotTests(context)
  const portalDocsImpactedTests = hasPortalDocsChanges
    ? findPortalDocsImpactedTests(
        context,
        changedFiles,
        allScreenshotTests
      )
    : []

  if (sourceChanges.length === 0 && portalDocsImpactedTests.length === 0) {
    log.info(
      logWithLabel(
        'No visual source changes detected. Skipping screenshot tests.'
      )
    )

    if (shouldExplain) {
      printExplainOutput(changedFilesMode, changedFiles, [], {})
    }

    return
  }

  const hasScssSourceChanges = sourceChanges.some((filePath) => {
    return filePath.endsWith('.scss')
  })
  const hasCodeSourceChanges = sourceChanges.some((filePath) => {
    return !filePath.endsWith('.scss')
  })

  const dependencyMap = hasCodeSourceChanges
    ? loadDependencyMap(context)
    : new Map<string, string[]>()
  const scssDependencyMap = hasScssSourceChanges
    ? loadScssDependencyMap(context)
    : new Map<string, string[]>()
  const compositionImpactedTests = findCompositionImpactedTests(
    context,
    sourceChanges,
    allScreenshotTests
  )

  const analysis = analyzeSelection({
    changedRepoFiles: changedFiles,
    allScreenshotTests,
    dependencyMap,
    scssDependencyMap,
    compositionImpactedTests,
    portalDocsImpactedTests,
  })

  const { selection, details } = analysis

  log.info(logWithLabel(selection.reason))

  if (shouldExplain) {
    printExplainOutput(
      changedFilesMode,
      details.changedFiles,
      selection.tests,
      details.testCauses
    )
  }

  if (isDryRun || selection.mode === 'skip') {
    return
  }

  if (selection.mode === 'all') {
    runCommand(context.packageRoot, commandTokens)
    return
  }

  runCommand(context.packageRoot, [
    ...commandTokens,
    '--runTestsByPath',
    ...selection.tests,
  ])
}

export async function runScreenshotsCli() {
  try {
    await runScreenshotsTests()
  } catch (error) {
    const details =
      error instanceof Error ? error.stack || error.message : String(error)
    log.fail(logWithLabel(`Screenshot tests failed\n${details}`))
    process.exit(1)
  }
}
