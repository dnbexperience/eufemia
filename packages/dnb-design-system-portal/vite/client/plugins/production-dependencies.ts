/**
 * Fails the client build when it includes a package outside the production
 * dependency tree of the Portal. The dependency checks only read that tree,
 * so they would miss such a package (docs/vulnerability-management.md).
 */

import fs from 'node:fs'
import path from 'node:path'
import { normalizePath, type Plugin } from 'vite'

const NODE_MODULES = '/node_modules/'

function getPackageDirectory(id: string) {
  const start = id.lastIndexOf(NODE_MODULES) + NODE_MODULES.length
  const [scope, name] = id.slice(start).split('/')
  return (
    id.slice(0, start) +
    (scope.startsWith('@') ? `${scope}/${name}` : scope)
  )
}

// Not `require.resolve.paths()`, which returns null for names like `punycode` or `buffer`
function findPackageDirectory(name: string, from: string) {
  for (let dir = from; ; dir = path.dirname(dir)) {
    const directory = path.join(dir, 'node_modules', name)
    if (fs.existsSync(path.join(directory, 'package.json'))) {
      return normalizePath(fs.realpathSync(directory))
    }
    if (dir === path.dirname(dir)) {
      return null
    }
  }
}

/** The packages that `dependencies` bring in, also through linked workspaces */
export function getProductionPackageDirectories(
  root = path.resolve(import.meta.dirname, '../../..')
) {
  const directories = new Set<string>()
  const queue = [root]

  for (const current of queue) {
    const { dependencies = {}, optionalDependencies = {} } = JSON.parse(
      fs.readFileSync(path.join(current, 'package.json'), 'utf-8')
    )
    for (const name of Object.keys({
      ...dependencies,
      ...optionalDependencies,
    })) {
      // An optional dependency may not be installed
      const directory = findPackageDirectory(name, current)
      if (directory && !directories.has(directory)) {
        directories.add(directory)
        queue.push(directory)
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
