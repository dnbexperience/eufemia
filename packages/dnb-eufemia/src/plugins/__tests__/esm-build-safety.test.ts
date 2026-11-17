// @vitest-environment node

import path from 'path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import fs from 'fs-extra'
import { sync } from 'globby'
import { transform } from 'lebab'

// The published ESM build runs lebab's "commonjs" transform on the plugin
// files (see scripts/postbuild transformFilesToESM). lebab only rewrites
// plain `const x = require('...')` and `module.exports = ...` statements, so a
// `require(...)` used as part of a larger expression is left untouched and
// throws "require is not defined in ES module scope" when imported from ESM.
describe('plugin ESM build safety', () => {
  const pluginsRoot = path.resolve(__dirname, '..')
  const files = sync(
    [
      'review-rules.js',
      'eslint.js',
      'eslint/**/*.js',
      'stylelint.js',
      'stylelint/**/*.js',
      'postcss-isolated-style-scope/*.js',
      'postcss-font-url-rewrite/*.js',
    ],
    { cwd: pluginsRoot, absolute: true }
  )

  it('finds plugin source files to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it('loads the font URL plugin with its generated manifest after ESM conversion', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'font-plugins-esm-'))
    try {
      fs.writeJsonSync(path.join(dir, 'package.json'), { type: 'module' })
      const require = createRequire(__filename)
      fs.copySync(
        path.dirname(require.resolve('postcss-value-parser/package.json')),
        path.join(dir, 'node_modules/postcss-value-parser')
      )
      for (const file of [
        'postcss-isolated-style-scope/font-revisions.js',
        'postcss-font-url-rewrite/content-addressed-fonts.js',
      ]) {
        const { code } = transform(
          fs.readFileSync(path.join(pluginsRoot, file), 'utf8'),
          ['commonjs']
        )
        fs.outputFileSync(path.join(dir, file), code)
      }
      const url = pathToFileURL(
        path.join(
          dir,
          'postcss-font-url-rewrite/content-addressed-fonts.js'
        )
      ).href
      const result = execFileSync(
        process.execPath,
        [
          '--input-type=module',
          '-e',
          `import rewrite from ${JSON.stringify(url)}; console.log(rewrite('url(../assets/fonts/dnb/DNBSansText-Regular.woff2)'));`,
        ],
        { encoding: 'utf8' }
      )
      expect(result).toContain('https://assets.eufemia.dnb.no/font-files/')
      expect(result).toContain(
        '../assets/fonts/dnb/DNBSansText-Regular.woff2'
      )
    } finally {
      fs.removeSync(dir)
    }
  })

  it.each(files)(
    'transforms %s to ESM without leaving a require() call',
    (file) => {
      const codeIn = fs
        .readFileSync(file, 'utf8')
        .replace(/\.cjs'/g, ".js'")

      const { code } = transform(codeIn, ['commonjs'])

      expect(code).not.toMatch(/\brequire\(/)
    }
  )
})
