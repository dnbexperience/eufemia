/**
 * Vite plugin that redirects `@dnb/eufemia/src/...` imports to
 * `@dnb/eufemia/build/...` when a pre-built package exists.
 *
 * Replaces the Gatsby `normalModuleReplacement` approach in
 * `gatsby-node.js`. During production builds, if `@dnb/eufemia`
 * has been pre-compiled (a `build/index.js` file exists), all
 * imports referencing `@dnb/eufemia/src/` are rewritten to use
 * the compiled output from `@dnb/eufemia/build/` instead.
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

      // Only rewrite @dnb/eufemia/src/... imports
      if (!source.startsWith('@dnb/eufemia/src')) {
        return null
      }

      const rewritten = source.replace(
        /^@dnb\/eufemia\/src(.*)/,
        '@dnb/eufemia/build$1'
      )

      // Let Vite resolve the rewritten path normally
      return this.resolve(rewritten, importer, {
        ...options,
        skipSelf: true,
      })
    },
  }
}
