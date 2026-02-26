import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import {
  IGNORED_ENTITY_SEGMENTS,
  PORTAL_DOCS_REPO_PREFIX,
  PORTAL_DOCS_PATH_PREFIX,
  PORTAL_FILE_PATTERN,
  SCREENSHOT_FILE_PATTERN,
  SCREENSHOT_URL_PATTERN,
} from './config'
import { normalizePath, toPascalCase } from './context'
import type { RunnerContext } from './types'

export function collectFilesRecursively(
  rootDirectory: string,
  filePattern: RegExp
): string[] {
  const foundFiles: string[] = []

  function walkDirectory(directory: string) {
    let entries: ReturnType<typeof readdirSync>

    try {
      entries = readdirSync(directory, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue
      }

      const absolutePath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        walkDirectory(absolutePath)
        continue
      }

      if (!filePattern.test(entry.name)) {
        continue
      }

      foundFiles.push(absolutePath)
    }
  }

  walkDirectory(rootDirectory)

  return foundFiles
}

export function collectScreenshotTests(context: RunnerContext): string[] {
  const srcPath = path.join(context.packageRoot, 'src')

  const foundTests = collectFilesRecursively(
    srcPath,
    SCREENSHOT_FILE_PATTERN
  )
    .filter((absolutePath) => {
      return !absolutePath.includes(
        `${path.sep}__image_snapshots__${path.sep}`
      )
    })
    .map((absolutePath) => {
      return normalizePath(
        path.relative(context.packageRoot, absolutePath)
      )
    })

  return Array.from(new Set(foundTests)).sort((a, b) => {
    return a.localeCompare(b)
  })
}

export function collectScssFiles(context: RunnerContext): string[] {
  const srcPath = path.join(context.packageRoot, 'src')
  const scssFiles = collectFilesRecursively(srcPath, /\.scss$/).map(
    (absolutePath) => {
      return normalizePath(
        path.relative(context.packageRoot, absolutePath)
      )
    }
  )

  return Array.from(new Set(scssFiles)).sort((a, b) => {
    return a.localeCompare(b)
  })
}

function extractScreenshotUrls(testContent: string): string[] {
  const urls: string[] = []
  const matches = testContent.matchAll(SCREENSHOT_URL_PATTERN)

  for (const match of Array.from(matches)) {
    const url = match[1]?.trim()

    if (url) {
      urls.push(url)
    }
  }

  return urls
}

function toPortalDocsDirectory(
  context: RunnerContext,
  url: string
): string | null {
  if (!url.startsWith(PORTAL_DOCS_PATH_PREFIX)) {
    return null
  }

  const normalizedPath = normalizePath(url).replace(/^\//, '')
  const pathSegments = normalizedPath.split('/').filter(Boolean)

  if (pathSegments.length === 0) {
    return null
  }

  if (pathSegments[pathSegments.length - 1] === 'demos') {
    pathSegments.pop()
  }

  return path.join(context.portalDocsRoot, ...pathSegments)
}

function toPortalDocsAbsolutePath(
  context: RunnerContext,
  repoRelativePath: string
): string | null {
  const normalizedPath = normalizePath(repoRelativePath)

  if (!normalizedPath.startsWith(PORTAL_DOCS_REPO_PREFIX)) {
    return null
  }

  const docsRelativePath = normalizedPath.slice(
    PORTAL_DOCS_REPO_PREFIX.length
  )

  if (!docsRelativePath) {
    return null
  }

  return normalizePath(path.join(context.portalDocsRoot, docsRelativePath))
}

export function collectChangedEntityNames(
  sourceChanges: string[]
): Set<string> {
  const entityNames = new Set<string>()

  for (const sourcePath of sourceChanges) {
    const normalizedPath = normalizePath(sourcePath)
    const pathSegments = normalizedPath.split('/').filter(Boolean)

    if (pathSegments.length < 3 || pathSegments[0] !== 'src') {
      continue
    }

    const meaningfulSegments = pathSegments.slice(2).filter((segment) => {
      return !segment.includes('.')
    })

    if (meaningfulSegments.length === 0) {
      continue
    }

    const baseSegment = meaningfulSegments.find((segment) => {
      return !IGNORED_ENTITY_SEGMENTS.has(segment)
    })

    if (baseSegment) {
      entityNames.add(toPascalCase(baseSegment))
    }

    meaningfulSegments.forEach((segment) => {
      if (IGNORED_ENTITY_SEGMENTS.has(segment)) {
        return
      }

      if (/^[A-Z][A-Za-z0-9]*$/.test(segment)) {
        entityNames.add(segment)
      }
    })
  }

  return entityNames
}

export function findCompositionImpactedTests(
  context: RunnerContext,
  sourceChanges: string[],
  allScreenshotTests: string[]
): string[] {
  if (!existsSync(context.portalDocsRoot)) {
    return []
  }

  const changedEntityNames = collectChangedEntityNames(sourceChanges)
  if (changedEntityNames.size === 0) {
    return []
  }

  const impactedTests = new Set<string>()
  const docsDirectoryCache = new Map<string, string[]>()

  for (const screenshotTest of allScreenshotTests) {
    const absoluteTestPath = path.join(context.packageRoot, screenshotTest)
    let testContent: string

    try {
      testContent = readFileSync(absoluteTestPath, 'utf8')
    } catch {
      continue
    }

    const urls = extractScreenshotUrls(testContent)

    for (const url of urls) {
      const docsDirectory = toPortalDocsDirectory(context, url)

      if (!docsDirectory || !existsSync(docsDirectory)) {
        continue
      }

      if (!docsDirectoryCache.has(docsDirectory)) {
        docsDirectoryCache.set(
          docsDirectory,
          collectFilesRecursively(docsDirectory, PORTAL_FILE_PATTERN)
        )
      }

      const docsFiles = docsDirectoryCache.get(docsDirectory) || []
      let hasCompositionImpact = false

      for (const docsFile of docsFiles) {
        let docsContent: string

        try {
          docsContent = readFileSync(docsFile, 'utf8')
        } catch {
          continue
        }

        changedEntityNames.forEach((entityName) => {
          if (hasCompositionImpact) {
            return
          }

          const entityPattern = new RegExp(`\\b${entityName}\\b`)
          if (entityPattern.test(docsContent)) {
            hasCompositionImpact = true
            impactedTests.add(screenshotTest)
          }
        })

        if (hasCompositionImpact) {
          break
        }
      }

      if (hasCompositionImpact) {
        break
      }
    }
  }

  return Array.from(impactedTests).sort((a, b) => {
    return a.localeCompare(b)
  })
}

export function findPortalDocsImpactedTests(
  context: RunnerContext,
  changedRepoFiles: string[],
  allScreenshotTests: string[]
): string[] {
  if (!existsSync(context.portalDocsRoot)) {
    return []
  }

  const changedDocsPaths = changedRepoFiles
    .map((filePath) => {
      return toPortalDocsAbsolutePath(context, filePath)
    })
    .filter(Boolean) as string[]

  if (changedDocsPaths.length === 0) {
    return []
  }

  const impactedTests = new Set<string>()

  for (const screenshotTest of allScreenshotTests) {
    const absoluteTestPath = path.join(context.packageRoot, screenshotTest)
    let testContent: string

    try {
      testContent = readFileSync(absoluteTestPath, 'utf8')
    } catch {
      continue
    }

    const urls = extractScreenshotUrls(testContent)

    for (const url of urls) {
      const docsDirectory = toPortalDocsDirectory(context, url)

      if (!docsDirectory || !existsSync(docsDirectory)) {
        continue
      }

      const normalizedDocsDirectory = normalizePath(docsDirectory)
      const docsDirectoryPrefix = `${normalizedDocsDirectory}/`

      const hasDocsImpact = changedDocsPaths.some((changedPath) => {
        return (
          changedPath === normalizedDocsDirectory ||
          changedPath.startsWith(docsDirectoryPrefix)
        )
      })

      if (hasDocsImpact) {
        impactedTests.add(screenshotTest)
        break
      }
    }
  }

  return Array.from(impactedTests).sort((a, b) => {
    return a.localeCompare(b)
  })
}
