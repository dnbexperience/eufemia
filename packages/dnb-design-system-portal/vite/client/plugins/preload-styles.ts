/**
 * Vite plugin that injects a preload script into index.html to prevent
 * layout flicker when entering fullscreen, focusmode, or visual test mode.
 *
 * The script is read from preload-styles.runtime.ts, compiled with
 * OxC, and injected as an inline <script> in the <body> before
 * the app entry point.
 */

import fs from 'node:fs'
import path from 'node:path'
import { transformWithOxc, minify, type Plugin } from 'vite'

export default function preloadStylesPlugin(): Plugin {
  return {
    name: 'vite-plugin-preload-styles',

    async transformIndexHtml(html) {
      const runtimeFile = path.resolve(
        __dirname,
        'preload-styles.runtime.ts'
      )
      const code = fs.readFileSync(runtimeFile, 'utf-8')
      const transformed = await transformWithOxc(code, runtimeFile, {
        lang: 'ts',
      })
      const minified = await minify(runtimeFile, transformed.code)

      const script = `<script>${minified.code}</script>`

      // Inject right after <body> so it runs before any rendering
      html = html.replace(
        '<body class="dnb-page-background">',
        `<body class="dnb-page-background">\n\t${script}`
      )

      return html
    },
  }
}
