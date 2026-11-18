/**
 * Fails the client build when it includes a package outside the production
 * dependency tree of the Portal. The dependency checks only read that tree,
 * so they would miss such a package (docs/vulnerability-management.md).
 */

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import type { Plugin } from 'vite'

const NODE_MODULES = '/node_modules/'

function getPackageDirectory(id: string) {
  const start = id.lastIndexOf(NODE_MODULES) + NODE_MODULES.length
  const [scope, name] = id.slice(start).split('/')
  return (
    id.slice(0, start) +
    (scope.startsWith('@') ? `${scope}/${name}` : scope)
  )
}

/** The packages that `dependencies` bring in, also through linked workspaces */
export function getProductionPackageDirectories(
  root = path.resolve(import.meta.dirname, '../../..')
) {
  const directories = new Set<string>()
  const queue = [root]

  for (const current of queue) {
    const manifest = path.join(current, 'package.json')
    const { dependencies = {}, optionalDependencies = {} } = JSON.parse(
      fs.readFileSync(manifest, 'utf-8')
    )
    for (const name of Object.keys({
      ...dependencies,
      ...optionalDependencies,
    })) {
      const directory = createRequire(manifest)
        .resolve.paths(name)
        ?.map((dir) => path.join(dir, name))
        .find((dir) => fs.existsSync(path.join(dir, 'package.json')))

      // An optional dependency may not be installed
      const real = directory && fs.realpathSync(directory)
      if (real && !directories.has(real)) {
        directories.add(real)
        queue.push(real)
      }
    }
  }

  return directories
}

/** Names of the bundled packages that are not in the production dependency tree */
export function findUndeclaredPackages(
  moduleIds: readonly string[],
  production: Set<string>
) {
  const undeclared = new Set<string>()

  for (const id of moduleIds) {
    if (id.includes(NODE_MODULES)) {
      const directory = getPackageDirectory(id)
      if (!production.has(directory)) {
        undeclared.add(
          directory.slice(
            directory.lastIndexOf(NODE_MODULES) + NODE_MODULES.length
          )
        )
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
          output.type === 'chunk'
            ? Object.entries(output.modules)
                .filter(([, module]) => module.renderedLength > 0)
                .map(([id]) => id)
            : []
        ),
        getProductionPackageDirectories()
      )

      if (undeclared.length > 0) {
        this.error(
          `The browser bundle includes packages that "dependencies" do not bring in: ${undeclared.join(', ')}. Add them, or the package that imports them, to "dependencies" in packages/dnb-design-system-portal/package.json, so the dependency checks cover them.`
        )
      }
    },
  }
}
