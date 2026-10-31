// @vitest-environment node

/**
 * Tests for the optional legacy SSE loader.
 *
 * The "not installed" cases use real Node errors: they load
 * `@modelcontextprotocol/server-legacy` from a temporary folder outside the
 * repo, where the package cannot be resolved.
 */

import { execFileSync } from 'child_process'
import fs from 'fs'
import { createRequire } from 'module'
import os from 'os'
import path from 'path'
import { pathToFileURL } from 'url'

import {
  isMissingPackageError,
  loadLegacySse,
  type LegacySse,
} from '../legacy-sse'

const PACKAGE = '@modelcontextprotocol/server-legacy'

let tmpRoot: string

beforeEach(() => {
  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-legacy-sse-'))
})

afterEach(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true })
})

/** Writes `<dir>/entry.mjs`, which re-exports the legacy SSE package. */
function writeEsmEntry(dir: string) {
  const file = path.join(dir, 'entry.mjs')
  fs.writeFileSync(file, `export * from '${PACKAGE}'\n`)
  return file
}

/**
 * Installs a fake `@modelcontextprotocol/server-legacy` in `dir` whose own
 * dependency is missing, like a broken install.
 */
function installBrokenPackage(dir: string, type: 'module' | 'commonjs') {
  const pkgDir = path.join(dir, 'node_modules', PACKAGE)
  fs.mkdirSync(pkgDir, { recursive: true })
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify({ name: PACKAGE, type, main: 'index.js' })
  )
  fs.writeFileSync(
    path.join(pkgDir, 'index.js'),
    type === 'module'
      ? `import '@modelcontextprotocol/core-not-installed'\n`
      : `require('@modelcontextprotocol/core-not-installed')\n`
  )
}

/**
 * Imports `file` in a separate Node process and returns the error that
 * Node's own ES module loader throws, with its real code and message. In
 * this test process `import()` goes through Vite, which also resolves bare
 * names from the repo root, so it would find the installed package even
 * from a folder where Node itself would not.
 */
function nativeImportError(file: string) {
  const output = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `try { await import(process.argv[1]); console.log('null') } catch (e) { console.log(JSON.stringify({ code: e.code, message: e.message })) }`,
      pathToFileURL(file).href,
    ],
    { encoding: 'utf8' }
  ).trim()

  expect(output).not.toBe('null')

  const { code, message } = JSON.parse(output)
  return Object.assign(new Error(message), { code })
}

function importFrom(file: string) {
  const error = nativeImportError(file)
  return async (): Promise<LegacySse> => {
    throw error
  }
}

function requireFrom(dir: string) {
  return async () =>
    createRequire(path.join(dir, 'entry.cjs'))(PACKAGE) as LegacySse
}

describe('loadLegacySse', () => {
  it('returns the SSE transport when the package is installed', async () => {
    const legacySse = await loadLegacySse()

    expect(typeof legacySse?.SSEServerTransport).toBe('function')
    expect(legacySse?.SSEServerTransport.name).toBe('SSEServerTransport')
  })

  it('returns null when an ES module import cannot find the package', async () => {
    const entry = writeEsmEntry(tmpRoot)

    await expect(loadLegacySse(importFrom(entry))).resolves.toBeNull()
  })

  it('returns null when require cannot find the package', async () => {
    await expect(loadLegacySse(requireFrom(tmpRoot))).resolves.toBeNull()
  })

  it('throws when the package is installed but its own ES module dependency is missing', async () => {
    installBrokenPackage(tmpRoot, 'module')
    const entry = writeEsmEntry(tmpRoot)

    await expect(loadLegacySse(importFrom(entry))).rejects.toThrow(
      "Cannot find package '@modelcontextprotocol/core-not-installed'"
    )
  })

  it('throws when the package is installed but its own CommonJS dependency is missing', async () => {
    installBrokenPackage(tmpRoot, 'commonjs')

    await expect(loadLegacySse(requireFrom(tmpRoot))).rejects.toThrow(
      "Cannot find module '@modelcontextprotocol/core-not-installed'"
    )
  })

  it('throws other load errors', async () => {
    await expect(
      loadLegacySse(async () => {
        throw new Error('boom')
      })
    ).rejects.toThrow('boom')
  })
})

describe('isMissingPackageError', () => {
  const withCode = (code: string, message: string) =>
    Object.assign(new Error(message), { code })

  it('matches the CommonJS message for the package', () => {
    expect(
      isMissingPackageError(
        withCode(
          'MODULE_NOT_FOUND',
          "Cannot find module '@modelcontextprotocol/server-legacy'\nRequire stack:\n- /app/server.js"
        ),
        PACKAGE
      )
    ).toBe(true)
  })

  it('matches the ES module message for the package', () => {
    expect(
      isMissingPackageError(
        withCode(
          'ERR_MODULE_NOT_FOUND',
          "Cannot find package '@modelcontextprotocol/server-legacy' imported from /app/server.js"
        ),
        PACKAGE
      )
    ).toBe(true)
  })

  it('does not match a missing dependency imported from inside the package', () => {
    expect(
      isMissingPackageError(
        withCode(
          'ERR_MODULE_NOT_FOUND',
          "Cannot find package '@modelcontextprotocol/core' imported from /app/node_modules/@modelcontextprotocol/server-legacy/dist/index.mjs"
        ),
        PACKAGE
      )
    ).toBe(false)
  })

  it('does not match a package whose name only starts with the same text', () => {
    expect(
      isMissingPackageError(
        withCode(
          'MODULE_NOT_FOUND',
          "Cannot find module '@modelcontextprotocol/server-legacy-extra'"
        ),
        PACKAGE
      )
    ).toBe(false)
  })

  it('does not match other error codes', () => {
    expect(
      isMissingPackageError(
        withCode(
          'ERR_PACKAGE_PATH_NOT_EXPORTED',
          "Cannot find module '@modelcontextprotocol/server-legacy'"
        ),
        PACKAGE
      )
    ).toBe(false)
  })

  it('does not match values that are not errors', () => {
    expect(isMissingPackageError(undefined, PACKAGE)).toBe(false)
    expect(isMissingPackageError('MODULE_NOT_FOUND', PACKAGE)).toBe(false)
  })
})
