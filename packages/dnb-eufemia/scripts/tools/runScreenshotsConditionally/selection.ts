import path from 'node:path'
import {
  DEFAULT_IMPACTED_THRESHOLD,
  GLOBAL_VISUAL_FILES,
  GLOBAL_VISUAL_PATH_PREFIXES,
  PACKAGE_PREFIX,
} from './config'
import { normalizePath } from './context'
import { expandReverseDependencies } from './dependencyMaps'
import type { SelectionAnalysis, SelectionInput } from './types'

export type GlobalImpactCause = {
  filePath: string
  reason: string
}

export function toPackageRelativePath(
  repoRelativePath: string
): string | null {
  const normalizedPath = normalizePath(repoRelativePath)

  if (normalizedPath.startsWith(PACKAGE_PREFIX)) {
    return normalizedPath.slice(PACKAGE_PREFIX.length)
  }

  if (
    normalizedPath.startsWith('src/') ||
    normalizedPath.startsWith('scripts/') ||
    normalizedPath === 'package.json' ||
    normalizedPath === 'jest.config.screenshots.js' ||
    normalizedPath === 'playwright.config'
  ) {
    return normalizedPath
  }

  return null
}

export function isGlobalVisualImpact(
  repoRelativePath: string,
  packageRelativePath: string | null
): boolean {
  if (!packageRelativePath) {
    return false
  }

  if (GLOBAL_VISUAL_FILES.has(packageRelativePath)) {
    return true
  }

  return GLOBAL_VISUAL_PATH_PREFIXES.some((prefix) => {
    return packageRelativePath.startsWith(prefix)
  })
}

export function getGlobalImpactCauses(
  changedRepoFiles: string[]
): GlobalImpactCause[] {
  const causes: GlobalImpactCause[] = []

  changedRepoFiles.forEach((repoPath) => {
    const packagePath = toPackageRelativePath(repoPath)
    const normalizedRepoPath = normalizePath(repoPath)

    if (!packagePath) {
      return
    }

    if (
      GLOBAL_VISUAL_FILES.has(packagePath) &&
      isGlobalVisualImpact(repoPath, packagePath)
    ) {
      causes.push({
        filePath: normalizedRepoPath,
        reason: 'Global visual configuration file changed',
      })
      return
    }

    const matchingPrefix = GLOBAL_VISUAL_PATH_PREFIXES.find((prefix) => {
      return packagePath.startsWith(prefix)
    })

    if (matchingPrefix && isGlobalVisualImpact(repoPath, packagePath)) {
      causes.push({
        filePath: normalizedRepoPath,
        reason: `Global visual path changed (${matchingPrefix})`,
      })
    }
  })

  return causes
}

export function getOwningDirectory(testPath: string): string {
  const normalizedPath = normalizePath(testPath)
  const testsMarker = '/__tests__/'
  const markerIndex = normalizedPath.indexOf(testsMarker)

  if (markerIndex >= 0) {
    return normalizedPath.slice(0, markerIndex)
  }

  return normalizePath(path.dirname(normalizedPath))
}

export function findMatchingScreenshotTests(
  affectedFiles: Set<string>,
  allScreenshotTests: string[]
): string[] {
  const impactedTests = new Set<string>()

  for (const testPath of allScreenshotTests) {
    const ownerDirectory = getOwningDirectory(testPath)

    if (affectedFiles.has(testPath)) {
      impactedTests.add(testPath)
      continue
    }

    let hasImpactInOwnerDirectory = false

    affectedFiles.forEach((affectedPath) => {
      if (
        hasImpactInOwnerDirectory ||
        (affectedPath !== ownerDirectory &&
          !affectedPath.startsWith(`${ownerDirectory}/`))
      ) {
        return
      }

      hasImpactInOwnerDirectory = true
      impactedTests.add(testPath)
    })
  }

  return Array.from(impactedTests).sort((a, b) => {
    return a.localeCompare(b)
  })
}

function addTestCause(
  testCauses: Record<string, string[]>,
  testPath: string,
  cause: string
) {
  if (!testCauses[testPath]) {
    testCauses[testPath] = []
  }

  if (!testCauses[testPath].includes(cause)) {
    testCauses[testPath].push(cause)
  }
}

function collectDirectSourceFileDetails(
  selectedTests: string[],
  sourceChanges: string[]
): Record<string, string[]> {
  const directSourceDetails: Record<string, string[]> = {}

  selectedTests.forEach((testPath) => {
    const ownerDirectory = getOwningDirectory(testPath)
    const directSources = sourceChanges.filter((sourcePath) => {
      return (
        sourcePath === ownerDirectory ||
        sourcePath.startsWith(`${ownerDirectory}/`)
      )
    })

    if (directSources.length > 0) {
      directSourceDetails[testPath] = directSources.map((sourcePath) => {
        return `Direct source change: ${sourcePath}`
      })
    }
  })

  return directSourceDetails
}

function prioritizeTestCauses(
  testCauses: Record<string, string[]>,
  selectedTests: string[],
  directSourceDetails: Record<string, string[]>
) {
  const priorityByCause: Record<string, number> = {
    'SCSS dependency impact': 0,
    'TS/JS dependency impact': 1,
    'Portal docs/demo impact': 2,
    'Component usage in demo/examples': 3,
  }

  selectedTests.forEach((testPath) => {
    const causes = testCauses[testPath] || []
    const prioritized = causes.sort((a, b) => {
      const aPriority = priorityByCause[a] ?? 999
      const bPriority = priorityByCause[b] ?? 999
      return aPriority - bPriority
    })

    const primaryCause = prioritized[0]
    const details = directSourceDetails[testPath] || []

    testCauses[testPath] = primaryCause
      ? [primaryCause, ...details]
      : details
  })
}

export function analyzeSelection({
  changedRepoFiles,
  allScreenshotTests,
  dependencyMap,
  scssDependencyMap = new Map<string, string[]>(),
  compositionImpactedTests = [],
  portalDocsImpactedTests = [],
  impactedThreshold = DEFAULT_IMPACTED_THRESHOLD,
}: SelectionInput): SelectionAnalysis {
  const normalizedChangedFiles = Array.from(
    new Set(changedRepoFiles.map(normalizePath))
  )
  const testCauses: Record<string, string[]> = {}

  if (normalizedChangedFiles.length === 0) {
    return {
      selection: {
        mode: 'all',
        reason: 'No changed files found. Running all screenshot tests.',
        tests: [],
      },
      details: {
        changedFiles: normalizedChangedFiles,
        sourceChanges: [],
        affectedTsFiles: [],
        affectedScssFiles: [],
        impactedTestsByTs: [],
        impactedTestsByScss: [],
        impactedTestsByComposition: [],
        impactedTestsByPortalDocs: [],
        testCauses,
      },
    }
  }

  const packageRelativeFiles = normalizedChangedFiles
    .map((filePath) => {
      return {
        repoPath: filePath,
        packagePath: toPackageRelativePath(filePath),
      }
    })
    .filter((entry) => entry.packagePath !== null)
    .map((entry) => {
      return {
        repoPath: entry.repoPath,
        packagePath: entry.packagePath as string,
      }
    })

  const globalImpactCauses = getGlobalImpactCauses(normalizedChangedFiles)
  const hasGlobalImpact = globalImpactCauses.length > 0

  if (hasGlobalImpact) {
    const reasonSummary = globalImpactCauses
      .slice(0, 3)
      .map((cause) => {
        return `${cause.filePath} (${cause.reason})`
      })
      .join(', ')

    return {
      selection: {
        mode: 'all',
        reason: `Global visual impact detected (${
          globalImpactCauses.length
        } trigger${
          globalImpactCauses.length === 1 ? '' : 's'
        }). Running all screenshot tests.${
          reasonSummary ? ` Triggers: ${reasonSummary}` : ''
        }`,
        tests: [],
      },
      details: {
        changedFiles: normalizedChangedFiles,
        sourceChanges: [],
        affectedTsFiles: [],
        affectedScssFiles: [],
        impactedTestsByTs: [],
        impactedTestsByScss: [],
        impactedTestsByComposition: [],
        impactedTestsByPortalDocs: [],
        testCauses,
      },
    }
  }

  const sourceChanges = packageRelativeFiles
    .map((entry) => entry.packagePath)
    .filter((packagePath) => packagePath.startsWith('src/'))

  if (sourceChanges.length === 0 && portalDocsImpactedTests.length === 0) {
    return {
      selection: {
        mode: 'skip',
        reason:
          'No visual source changes detected. Skipping screenshot tests.',
        tests: [],
      },
      details: {
        changedFiles: normalizedChangedFiles,
        sourceChanges: [],
        affectedTsFiles: [],
        affectedScssFiles: [],
        impactedTestsByTs: [],
        impactedTestsByScss: [],
        impactedTestsByComposition: [],
        impactedTestsByPortalDocs: [],
        testCauses,
      },
    }
  }

  const affectedTsFiles = expandReverseDependencies(
    sourceChanges,
    dependencyMap
  )

  const scssSourceChanges = sourceChanges.filter((packagePath) => {
    return packagePath.endsWith('.scss')
  })
  const affectedScssFiles = expandReverseDependencies(
    scssSourceChanges,
    scssDependencyMap
  )

  const combinedAffectedFiles = new Set<string>()
  affectedTsFiles.forEach((filePath) => {
    combinedAffectedFiles.add(filePath)
  })
  affectedScssFiles.forEach((filePath) => {
    combinedAffectedFiles.add(filePath)
  })

  const impactedTestsByTs = findMatchingScreenshotTests(
    affectedTsFiles,
    allScreenshotTests
  )
  const impactedTestsByScss = findMatchingScreenshotTests(
    affectedScssFiles,
    allScreenshotTests
  )
  const impactedTests = findMatchingScreenshotTests(
    combinedAffectedFiles,
    allScreenshotTests
  )

  const combinedImpactedTests = new Set<string>(impactedTests)

  impactedTestsByTs.forEach((testPath) => {
    addTestCause(testCauses, testPath, 'TS/JS dependency impact')
  })

  impactedTestsByScss.forEach((testPath) => {
    addTestCause(testCauses, testPath, 'SCSS dependency impact')
  })

  compositionImpactedTests.forEach((testPath) => {
    if (allScreenshotTests.includes(testPath)) {
      combinedImpactedTests.add(testPath)
      addTestCause(
        testCauses,
        testPath,
        'Component usage in demo/examples'
      )
    }
  })

  portalDocsImpactedTests.forEach((testPath) => {
    if (allScreenshotTests.includes(testPath)) {
      combinedImpactedTests.add(testPath)
      addTestCause(testCauses, testPath, 'Portal docs/demo impact')
    }
  })

  const selectedTests = Array.from(combinedImpactedTests).sort((a, b) => {
    return a.localeCompare(b)
  })

  const directSourceDetails = collectDirectSourceFileDetails(
    selectedTests,
    sourceChanges
  )
  prioritizeTestCauses(testCauses, selectedTests, directSourceDetails)

  const commonDetails = {
    changedFiles: normalizedChangedFiles,
    sourceChanges,
    affectedTsFiles: Array.from(affectedTsFiles).sort((a, b) => {
      return a.localeCompare(b)
    }),
    affectedScssFiles: Array.from(affectedScssFiles).sort((a, b) => {
      return a.localeCompare(b)
    }),
    impactedTestsByTs,
    impactedTestsByScss,
    impactedTestsByComposition: compositionImpactedTests.filter(
      (testPath) => {
        return allScreenshotTests.includes(testPath)
      }
    ),
    impactedTestsByPortalDocs: portalDocsImpactedTests.filter(
      (testPath) => {
        return allScreenshotTests.includes(testPath)
      }
    ),
    testCauses,
  }

  if (selectedTests.length === 0) {
    return {
      selection: {
        mode: 'all',
        reason:
          'Source changes were detected, but no impacted screenshot tests were mapped. Running all tests for safety.',
        tests: [],
      },
      details: commonDetails,
    }
  }

  const impactRatio = selectedTests.length / allScreenshotTests.length
  if (impactRatio >= impactedThreshold) {
    return {
      selection: {
        mode: 'all',
        reason: `Large impact detected (${selectedTests.length}/${allScreenshotTests.length}). Running all screenshot tests.`,
        tests: [],
      },
      details: commonDetails,
    }
  }

  return {
    selection: {
      mode: 'partial',
      reason: `Running ${selectedTests.length}/${allScreenshotTests.length} impacted screenshot test files.`,
      tests: selectedTests,
    },
    details: commonDetails,
  }
}
