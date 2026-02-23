import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { log } from '../../lib'
import {
  SCSS_IMPORT_PATTERN,
  SCSS_REVERSE_DEPENDENCY_EXCLUDED_SOURCES,
} from './config'
import { normalizePath } from './context'
import { collectScssFiles } from './discovery'
import type { DepCruiserModule, RunnerContext } from './types'

export function buildDependencyMap(
  modules: DepCruiserModule[]
): Map<string, string[]> {
  const dependencyMap = new Map<string, string[]>()

  for (const module of modules) {
    dependencyMap.set(
      module.source,
      Array.from(new Set(module.dependents || []))
    )
  }

  return dependencyMap
}

export function loadDependencyMap(
  context: RunnerContext
): Map<string, string[]> {
  try {
    const output = execFileSync(
      'yarn',
      [
        'exec',
        'depcruise',
        '-c',
        '.dependency-cruiser.js',
        '--output-type',
        'json',
        'src',
      ],
      {
        cwd: context.packageRoot,
        encoding: 'utf8',
        maxBuffer: 100 * 1024 * 1024,
      }
    )

    const report = JSON.parse(output)
    return buildDependencyMap(report.modules || [])
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    log.warn(
      `Warning: Could not build dependency map. Falling back to direct file matching. ${details}`
    )
    return new Map<string, string[]>()
  }
}

export function expandReverseDependencies(
  seedFiles: string[],
  dependencyMap: Map<string, string[]>
): Set<string> {
  const visited = new Set<string>()
  const queue = [...seedFiles]

  while (queue.length > 0) {
    const currentFile = queue.shift()

    if (!currentFile || visited.has(currentFile)) {
      continue
    }

    visited.add(currentFile)

    const dependents = dependencyMap.get(currentFile) || []
    for (const dependent of dependents) {
      if (dependent.startsWith('src/') && !visited.has(dependent)) {
        queue.push(dependent)
      }
    }
  }

  return visited
}

function extractScssImportSpecifiers(fileContent: string): string[] {
  const specifiers: string[] = []
  const matches = fileContent.matchAll(SCSS_IMPORT_PATTERN)

  for (const match of Array.from(matches)) {
    const clause = match[2]
    const quotes = clause.matchAll(/['"]([^'"]+)['"]/g)

    for (const quoteMatch of Array.from(quotes)) {
      const specifier = quoteMatch[1]

      if (
        !specifier ||
        specifier.startsWith('sass:') ||
        specifier.startsWith('http://') ||
        specifier.startsWith('https://')
      ) {
        continue
      }

      specifiers.push(specifier)
    }
  }

  return specifiers
}

function resolveScssImportPath(
  sourceFile: string,
  importSpecifier: string,
  knownScssFiles: Set<string>
): string | null {
  const sourceDirectory = path.dirname(sourceFile)
  const candidateBase = normalizePath(
    path.join(sourceDirectory, importSpecifier)
  )
  const baseName = path.basename(candidateBase)
  const dirname = path.dirname(candidateBase)
  const candidates = Array.from(
    new Set([
      candidateBase,
      `${candidateBase}.scss`,
      path.join(candidateBase, 'index.scss'),
      path.join(dirname, `_${baseName}`),
      path.join(dirname, `_${baseName}.scss`),
      path.join(candidateBase, '_index.scss'),
    ])
  ).map(normalizePath)

  const resolvedPath = candidates.find((candidate) => {
    return knownScssFiles.has(candidate)
  })

  return resolvedPath || null
}

export function buildScssDependencyMap(
  scssFilesWithContent: Array<{ path: string; content: string }>
): Map<string, string[]> {
  const scssFiles = new Set(
    scssFilesWithContent.map((entry) => normalizePath(entry.path))
  )
  const reverseDependents = new Map<string, Set<string>>()

  for (const scssFile of scssFilesWithContent) {
    const sourcePath = normalizePath(scssFile.path)

    if (SCSS_REVERSE_DEPENDENCY_EXCLUDED_SOURCES.has(sourcePath)) {
      continue
    }

    const importSpecifiers = extractScssImportSpecifiers(scssFile.content)

    for (const importSpecifier of importSpecifiers) {
      const resolvedPath = resolveScssImportPath(
        sourcePath,
        importSpecifier,
        scssFiles
      )

      if (!resolvedPath) {
        continue
      }

      if (!reverseDependents.has(resolvedPath)) {
        reverseDependents.set(resolvedPath, new Set())
      }

      reverseDependents.get(resolvedPath)?.add(sourcePath)
    }
  }

  const dependencyMap = new Map<string, string[]>()

  reverseDependents.forEach((dependents, sourcePath) => {
    dependencyMap.set(sourcePath, Array.from(dependents))
  })

  return dependencyMap
}

export function loadScssDependencyMap(
  context: RunnerContext
): Map<string, string[]> {
  const scssFiles = collectScssFiles(context)
  const filesWithContent = scssFiles
    .map((scssFilePath) => {
      const absolutePath = path.join(context.packageRoot, scssFilePath)

      try {
        return {
          path: scssFilePath,
          content: readFileSync(absolutePath, 'utf8'),
        }
      } catch {
        return null
      }
    })
    .filter(Boolean) as Array<{ path: string; content: string }>

  return buildScssDependencyMap(filesWithContent)
}
