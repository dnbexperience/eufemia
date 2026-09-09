// @vitest-environment node

import path from 'path'
import fs from 'fs-extra'
import { sync } from 'globby'
import { transform } from 'lebab'

// The published ESM build runs lebab's "commonjs" transform on the plugin
// files (see scripts/postbuild transformFilesToESM). lebab only rewrites
// plain `const x = require('...')` and `module.exports = ...` statements, so a
// `require(...)` used as part of a larger expression is left untouched and
// throws "require is not defined in ES module scope" when imported from ESM.
describe('ESLint and Stylelint plugin ESM build safety', () => {
  const pluginsRoot = path.resolve(__dirname, '..')
  const files = sync(
    ['eslint.js', 'eslint/**/*.js', 'stylelint.js', 'stylelint/**/*.js'],
    { cwd: pluginsRoot, absolute: true }
  )

  it('finds plugin source files to check', () => {
    expect(files.length).toBeGreaterThan(0)
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
