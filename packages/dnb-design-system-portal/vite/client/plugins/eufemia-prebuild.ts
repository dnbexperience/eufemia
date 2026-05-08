/**
 * Vite plugin that redirects `@dnb/eufemia` imports to
 * `@dnb/eufemia/build...` when a pre-built package exists.
 *
 * During production builds, if `@dnb/eufemia` has been pre-compiled
 * (a `build/index.js` file exists), imports referencing
 * `@dnb/eufemia`, `@dnb/eufemia/src/...`, and public package subpaths
 * are rewritten to use the compiled output from
 * `@dnb/eufemia/build/` instead.
 *
 * This speeds up production builds by avoiding on-the-fly
 * transpilation of the entire Eufemia source tree.
 *
 * The check runs once at plugin init. In dev mode the plugin is
 * a no-op — sources are always used for fast HMR.
 */

import { type Plugin, type ResolvedConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const EUFEMIA_PACKAGE_NAME = '@dnb/eufemia'
const EXPLICIT_PREBUILD_TARGETS = new Set([
  'build',
  'cjs',
  'es',
  'esm',
  'src',
  'umd',
])

/**
 * Check whether the pre-built `@dnb/eufemia` package exists.
 *
 * Returns `true` when `@dnb/eufemia/build/index.js` is present on disk.
 * An optional `eufemiaRoot` parameter can override the resolved package
 * root (used by tests).
 */
export function hasPrebuild(eufemiaRoot?: string): boolean {
  const root = eufemiaRoot ?? path.dirname(require.resolve('@dnb/eufemia'))
  const buildIndex = path.resolve(root, 'build', 'index.js')
  return fs.existsSync(buildIndex)
}

const PREBUILD_WARN_KEY = '__eufemia_prebuild_warn_scheduled__'

let prebuildLogger: ResolvedConfig['logger'] | undefined

export function logPrebuildWarning() {
  prebuildLogger?.warn(
    '\n😱 There is a "/packages/dnb-eufemia/build" in your local repo. ' +
      'It is used during your Portal build!\n' +
      'Keep in mind, the code from "dnb-eufemia/build" may be outdated.\n\n' +
      '👉 You can remove the build with: "yarn workspace @dnb/eufemia build:clean"\n'
  )
}

export function rewriteToPrebuild(source: string): string | null {
  if (source === EUFEMIA_PACKAGE_NAME) {
    return `${EUFEMIA_PACKAGE_NAME}/build`
  }

  if (!source.startsWith(`${EUFEMIA_PACKAGE_NAME}/`)) {
    return null
  }

  const subpath = source.slice(EUFEMIA_PACKAGE_NAME.length + 1)
  const [topLevelSegment] = subpath.split('/')

  if (EXPLICIT_PREBUILD_TARGETS.has(topLevelSegment)) {
    if (topLevelSegment === 'src') {
      return `${EUFEMIA_PACKAGE_NAME}/build/${subpath.slice('src/'.length)}`
    }

    return null
  }

  return `${EUFEMIA_PACKAGE_NAME}/build/${subpath}`
}

export default function eufemiaPrebuildPlugin(): Plugin {
  let isBuild = false
  let prebuildAvailable = false

  return {
    name: 'eufemia-prebuild',

    configResolved(config: ResolvedConfig) {
      isBuild = config.command === 'build'

      if (isBuild) {
        prebuildAvailable = hasPrebuild()
        if (prebuildAvailable) {
          prebuildLogger = config.logger
        }
      }
    },

    closeBundle() {
      if (!prebuildAvailable) {
        return
      }

      const isCI = Boolean(process.env.CI)
      if (
        !isCI &&
        !(globalThis as Record<string, unknown>)[PREBUILD_WARN_KEY]
      ) {
        ;(globalThis as Record<string, unknown>)[PREBUILD_WARN_KEY] = true

        // Print after all other build output has finished
        process.once('beforeExit', logPrebuildWarning)
      }
    },

    resolveId(source, importer, options) {
      if (!isBuild || !prebuildAvailable) {
        return null
      }

      const rewritten = rewriteToPrebuild(source)

      if (!rewritten) {
        return null
      }

      // Let Vite resolve the rewritten path normally
      return this.resolve(rewritten, importer, {
        ...options,
        skipSelf: true,
      })
    },
  }
}
