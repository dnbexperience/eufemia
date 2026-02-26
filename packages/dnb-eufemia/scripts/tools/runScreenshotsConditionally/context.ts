import { readFileSync } from 'node:fs'
import path from 'node:path'
import { PORTAL_DOCS_ROOT_SEGMENTS } from './config'
import type { RunnerContext } from './types'

export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '')
}

export function toPascalCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((segment) => {
      return segment.charAt(0).toUpperCase() + segment.slice(1)
    })
    .join('')
}

export function removeEmptyValues(list: string[]): string[] {
  return list.map((file) => file.trim()).filter(Boolean)
}

function readPackageJson(
  packageJsonPath: string
): { scripts?: unknown } | null {
  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  } catch {
    return null
  }
}

function hasScreenshotCiScript(
  packageData: { scripts?: unknown } | null
): boolean {
  if (!packageData || typeof packageData.scripts !== 'object') {
    return false
  }

  return (
    packageData.scripts !== null &&
    'test:screenshots:ci' in packageData.scripts
  )
}

function resolvePackageRoot(): string {
  const cwd = process.cwd()
  const cwdPackageJsonPath = path.join(cwd, 'package.json')

  if (hasScreenshotCiScript(readPackageJson(cwdPackageJsonPath))) {
    return cwd
  }

  const workspacePackageRoot = path.join(cwd, 'packages', 'dnb-eufemia')
  const workspacePackageJsonPath = path.join(
    workspacePackageRoot,
    'package.json'
  )

  if (hasScreenshotCiScript(readPackageJson(workspacePackageJsonPath))) {
    return workspacePackageRoot
  }

  return cwd
}

export function createContext(): RunnerContext {
  const packageRoot = resolvePackageRoot()
  const packageJson = readPackageJson(
    path.join(packageRoot, 'package.json')
  ) as { scripts: Record<string, string> } | null

  return {
    packageRoot,
    packageJson,
    portalDocsRoot: path.join(packageRoot, ...PORTAL_DOCS_ROOT_SEGMENTS),
  }
}
