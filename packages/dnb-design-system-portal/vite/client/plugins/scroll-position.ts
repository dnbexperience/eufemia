/**
 * Vite plugin that persists and restores scroll positions for
 * specified DOM elements across route changes.
 *
 * The runtime code is served via a virtual module (`virtual:scroll-position`)
 * that exports helper functions and a React hook.
 */

import fs from 'node:fs'
import path from 'node:path'
import { transformWithEsbuild } from 'vite'
import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:scroll-position'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export default function scrollPositionPlugin(): Plugin {
  return {
    name: 'vite-plugin-scroll-position',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const runtimeFile = path.resolve(
          __dirname,
          'scroll-position.runtime.ts'
        )
        const code = fs.readFileSync(runtimeFile, 'utf-8')
        const result = await transformWithEsbuild(code, runtimeFile, {
          loader: 'ts',
        })
        return result.code
      }
    },
  }
}
