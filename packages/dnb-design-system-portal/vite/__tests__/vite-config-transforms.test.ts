import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import {
  resolveExamplesPath,
  stripMissingExampleImports,
} from '../client/plugins/strip-missing-example-imports'
import { convertCjsToEsm } from '../client/plugins/load-js-as-jsx'

describe('vite.config transform plugins', () => {
  describe('strip-missing-example-imports', () => {
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

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        { portalRoot: tmpDir }
      )
      expect(result).toBe(`import { ExistingExample } from './Examples'`)
    })

    it('removes entire import when all specifiers are missing', () => {
      const examplesFile = path.join(tmpDir, 'Examples.tsx')
      fs.writeFileSync(examplesFile, 'export const Other = () => null')

      const code = `import { Missing1, Missing2 } from './Examples'`

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        { portalRoot: tmpDir }
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

      const result = stripMissingExampleImports(
        code,
        path.join(tmpDir, 'page.mdx'),
        { portalRoot: tmpDir }
      )
      expect(result).toBeNull()
    })

    it('returns null for non-MDX/TSX files', () => {
      const result = stripMissingExampleImports(
        `import { Foo } from './Examples'`,
        'file.js',
        { portalRoot: tmpDir }
      )
      expect(result).toBeNull()
    })

    it('returns null when no Examples import exists', () => {
      const result = stripMissingExampleImports(
        `import { Foo } from './utils'`,
        'page.mdx',
        { portalRoot: tmpDir }
      )
      expect(result).toBeNull()
    })

    it('prefers the first matching Examples extension', () => {
      const examplesTsxFile = path.join(tmpDir, 'Examples.tsx')
      const examplesJsFile = path.join(tmpDir, 'Examples.js')

      fs.writeFileSync(examplesTsxFile, 'export const Foo = () => null')
      fs.writeFileSync(examplesJsFile, 'export const Bar = () => null')

      expect(
        resolveExamplesPath('./Examples', path.join(tmpDir, 'page.mdx'), {
          portalRoot: tmpDir,
        })
      ).toBe(examplesTsxFile)

      const result = stripMissingExampleImports(
        `import { Foo, Bar } from './Examples'`,
        path.join(tmpDir, 'page.mdx'),
        { portalRoot: tmpDir }
      )

      expect(result).toBe(`import { Foo } from './Examples'`)
    })
  })

  describe('load-js-as-jsx CJS conversion', () => {
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
