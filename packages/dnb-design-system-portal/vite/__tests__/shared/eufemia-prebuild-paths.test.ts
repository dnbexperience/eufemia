import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import prebuildPaths from '../../shared/eufemia-prebuild-paths.cjs'

const { hasResolvablePrebuildTarget, resolveConfigTimeEufemiaPath } =
  prebuildPaths as {
    hasResolvablePrebuildTarget: (
      source: string,
      eufemiaRoot?: string
    ) => boolean
    resolveConfigTimeEufemiaPath: (
      source: string,
      eufemiaRoot?: string
    ) => string
  }

describe('eufemia-prebuild-paths', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'eufemia-prebuild-paths-test-')
    )
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('prefers the build path when the rewritten target exists', () => {
    fs.mkdirSync(path.join(tmpDir, 'build', 'plugins'), {
      recursive: true,
    })
    fs.writeFileSync(path.join(tmpDir, 'build', 'index.js'), '')
    fs.writeFileSync(
      path.join(tmpDir, 'build', 'plugins', 'postcss-font-url-rewrite.js'),
      ''
    )

    expect(
      resolveConfigTimeEufemiaPath(
        '@dnb/eufemia/src/plugins/postcss-font-url-rewrite',
        tmpDir
      )
    ).toBe('@dnb/eufemia/build/plugins/postcss-font-url-rewrite')
  })

  it('falls back to the source path when the build target is missing', () => {
    fs.mkdirSync(path.join(tmpDir, 'build'), { recursive: true })
    fs.writeFileSync(path.join(tmpDir, 'build', 'index.js'), '')

    expect(
      resolveConfigTimeEufemiaPath(
        '@dnb/eufemia/src/plugins/postcss-isolated-style-scope',
        tmpDir
      )
    ).toBe('@dnb/eufemia/src/plugins/postcss-isolated-style-scope')
  })

  it('detects cjs entrypoints as valid build targets', () => {
    fs.mkdirSync(path.join(tmpDir, 'build', 'plugins'), {
      recursive: true,
    })
    fs.writeFileSync(path.join(tmpDir, 'build', 'index.js'), '')
    fs.writeFileSync(
      path.join(tmpDir, 'build', 'plugins', 'plugin-scope-hash.cjs'),
      ''
    )

    expect(
      hasResolvablePrebuildTarget(
        '@dnb/eufemia/src/plugins/plugin-scope-hash.cjs',
        tmpDir
      )
    ).toBe(true)
  })

  it('keeps source scss paths when the build has no matching scss entry file', () => {
    fs.mkdirSync(path.join(tmpDir, 'build', 'style', 'core'), {
      recursive: true,
    })
    fs.writeFileSync(path.join(tmpDir, 'build', 'index.js'), '')

    expect(
      resolveConfigTimeEufemiaPath(
        '@dnb/eufemia/src/style/dnb-ui-core.scss',
        tmpDir
      )
    ).toBe('@dnb/eufemia/src/style/dnb-ui-core.scss')
  })
})
