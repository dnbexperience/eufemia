import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'

describe('vite.config transform plugins', () => {
  describe('strip-missing-example-imports', () => {
    // Replicate the transform logic from vite.config.ts
    function stripMissingExampleImports(
      code: string,
      filepath: string,
      resolveExamples: (source: string, dir: string) => string | null
    ): string | null {
      if (!filepath.endsWith('.mdx') && !filepath.endsWith('.tsx')) {
        return null
      }

      const importRe =
        /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]*Examples)['"]/g
      let match = importRe.exec(code)
      if (!match) {
        return null
      }

      let transformed = code
      while (match) {
        const [fullImport, specifiers, source] = match
        const dir = path.dirname(filepath)
        const examplesPath = resolveExamples(source, dir)

        if (examplesPath) {
          const exContent = fs.readFileSync(examplesPath, 'utf-8')
          const names = specifiers
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          const valid = names.filter((n) => exContent.includes(n))

          if (valid.length < names.length) {
            if (valid.length === 0) {
              transformed = transformed.replace(
                fullImport,
                '// [vite] removed stale import'
              )
            } else {
              const newImport = `import { ${valid.join(', ')} } from '${source}'`
              transformed = transformed.replace(fullImport, newImport)
            }
          }
        }

        match = importRe.exec(code)
      }

      return transformed !== code ? transformed : null
    }

    let tmpDir: string

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'strip-imports-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('strips imports for nonexistent exports', () => {
      const examplesFile = path.join(tmpDir, 'Examples.tsx')
      fs.writeFileSync(
        examplesFile,
        'export const ExistingExample = () => null'
      )

      const code = `import { ExistingExample, NonExistent } from './Examples'`
      const resolve = (source: string) => examplesFile

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        resolve
      )
      expect(result).toBe(`import { ExistingExample } from './Examples'`)
    })

    it('removes entire import when all specifiers are missing', () => {
      const examplesFile = path.join(tmpDir, 'Examples.tsx')
      fs.writeFileSync(examplesFile, 'export const Other = () => null')

      const code = `import { Missing1, Missing2 } from './Examples'`
      const resolve = (source: string) => examplesFile

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        resolve
      )
      expect(result).toBe('// [vite] removed stale import')
    })

    it('returns null when all specifiers exist', () => {
      const examplesFile = path.join(tmpDir, 'Examples.tsx')
      fs.writeFileSync(
        examplesFile,
        'export const Foo = () => null\nexport const Bar = () => null'
      )

      const code = `import { Foo, Bar } from './Examples'`
      const resolve = (source: string) => examplesFile

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        resolve
      )
      expect(result).toBeNull()
    })

    it('returns null for non-MDX/TSX files', () => {
      const result = stripMissingExampleImports(
        `import { Foo } from './Examples'`,
        'file.js',
        () => null
      )
      expect(result).toBeNull()
    })

    it('returns null when no Examples import exists', () => {
      const result = stripMissingExampleImports(
        `import { Foo } from './utils'`,
        'page.mdx',
        () => null
      )
      expect(result).toBeNull()
    })
  })

  describe('load-js-as-jsx CJS conversion', () => {
    // Replicate the CJS→ESM conversion logic from vite.config.ts
    function convertCjsToEsm(code: string): string | null {
      const isCjs = /\brequire\s*\(/.test(code) || /\bexports\./.test(code)
      if (!isCjs) {
        return null
      }

      let transformed = code

      // require('x') → import x from 'x'
      transformed = transformed.replace(
        /(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*(['"][^'"]+['"])\s*\)/g,
        'import $1 from $2'
      )

      // exports.name = function name(...) { → export function name(...) {
      transformed = transformed.replace(
        /exports\.(\w+)\s*=\s*function\s+\1/g,
        'export function $1'
      )

      // exports.name = expr → export const name = expr
      transformed = transformed.replace(
        /exports\.(\w+)\s*=\s*/g,
        'export const $1 = '
      )

      return transformed !== code ? transformed : null
    }

    it('converts require to import', () => {
      const code = `const path = require('path')`
      const result = convertCjsToEsm(code)
      expect(result).toBe(`import path from 'path'`)
    })

    it('converts exports.name = function', () => {
      const code = `exports.makeSlug = function makeSlug(str) { return str }`
      const result = convertCjsToEsm(code)
      expect(result).toBe(`export function makeSlug(str) { return str }`)
    })

    it('converts exports.name = expression', () => {
      const code = `exports.VALUE = 42`
      const result = convertCjsToEsm(code)
      expect(result).toBe(`export const VALUE = 42`)
    })

    it('handles mixed require and exports', () => {
      const code = `const fs = require('fs')\nexports.read = fs.readFileSync`
      const result = convertCjsToEsm(code)
      expect(result).toContain(`import fs from 'fs'`)
      expect(result).toContain(`export const read = fs.readFileSync`)
    })

    it('returns null for pure ESM code', () => {
      const code = `import foo from 'bar'\nexport const x = 1`
      const result = convertCjsToEsm(code)
      expect(result).toBeNull()
    })
  })
})
