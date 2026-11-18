/**
 * Fails the client build when Portal code imports a package that is not in
 * `dependencies`. The dependency checks read `dependencies` to know what the
 * Portal ships to the browser (docs/vulnerability-management.md).
 */

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import type { Plugin } from 'vite'

type ModuleInfo = {
  importedIds: readonly string[]
  dynamicallyImportedIds: readonly string[]
} | null

const isPackage = (id: string) => id.includes('/node_modules/')

function getPackageName(id: string) {
  const [scope, name] = id
    .slice(id.lastIndexOf('/node_modules/') + '/node_modules/'.length)
    .split('/')
  return scope.startsWith('@') ? `${scope}/${name}` : scope
}

/** The `dependencies` of the Portal and of the workspaces it links there */
export function getProductionDependencies(
  manifest = path.resolve(import.meta.dirname, '../../../package.json')
) {
  const declared = new Set<string>()
  const manifests = [manifest]

  for (const current of manifests) {
    const { dependencies = {} } = JSON.parse(
      fs.readFileSync(current, 'utf-8')
    )
    for (const [name, range] of Object.entries<string>(dependencies)) {
      if (range.startsWith('workspace:') && !declared.has(name)) {
        const linked = createRequire(current)
          .resolve.paths(name)
          ?.map((dir) => path.join(dir, name, 'package.json'))
          .find((file) => fs.existsSync(file))
        if (!linked) {
          throw new Error(`Could not find the workspace ${name}`)
        }
        manifests.push(linked)
      }
      declared.add(name)
    }
  }

  return declared
}

/** Bundled packages that first-party modules import without declaring them */
export function findUndeclaredPackages(
  moduleIds: readonly string[],
  getModuleInfo: (id: string) => ModuleInfo,
  declared: Set<string>
) {
  const bundled = new Set(moduleIds.filter(isPackage).map(getPackageName))
  const undeclared = new Set<string>()

  for (const id of moduleIds.filter((id) => !isPackage(id))) {
    const info = getModuleInfo(id)
    for (const imported of [
      ...(info?.importedIds ?? []),
      ...(info?.dynamicallyImportedIds ?? []),
    ]) {
      const name = isPackage(imported) && getPackageName(imported)
      if (name && bundled.has(name) && !declared.has(name)) {
        undeclared.add(name)
      }
    }
  }

  return [...undeclared].sort()
}

export default function productionDependenciesPlugin(): Plugin {
  return {
    name: 'portal-production-dependencies',
    apply: (_, { command, isSsrBuild }) =>
      command === 'build' && !isSsrBuild,
    generateBundle(_, bundle) {
      const undeclared = findUndeclaredPackages(
        Object.values(bundle).flatMap((output) =>
          output.type === 'chunk' ? output.moduleIds : []
        ),
        (id) => this.getModuleInfo(id),
        getProductionDependencies()
      )

      if (undeclared.length > 0) {
        this.error(
          `The browser bundle includes packages that are not in "dependencies": ${undeclared.join(', ')}. Move them to "dependencies" in packages/dnb-design-system-portal/package.json, so the dependency checks cover them.`
        )
      }
    },
  }
}
