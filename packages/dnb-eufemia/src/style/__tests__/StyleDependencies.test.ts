// @vitest-environment node

import fs from 'node:fs'
import path from 'node:path'
import { loadScss } from '../../core/test-utils/testSetup'

const sourceRoot = path.resolve(__dirname, '../..')
const styleRoots = ['components', 'extensions', 'fragments']

function findFiles(directory: string, fileName: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        return findFiles(filePath, fileName)
      }

      return entry.name === fileName ? [filePath] : []
    })
}

const styleDependencyManifest = styleRoots
  .flatMap((directory) =>
    findFiles(path.join(sourceRoot, directory), 'deps.scss')
  )
  .map((filePath) => ({
    filePath,
    name: path
      .relative(sourceRoot, path.dirname(path.dirname(filePath)))
      .replaceAll(path.sep, '/'),
    snapshotPath: path.join(
      path.dirname(path.dirname(filePath)),
      '__tests__/__snapshots__/deps.scss.snap'
    ),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const compiledStyles = new Map<string, string>()

function getCompiledStyle(filePath: string): string {
  if (!compiledStyles.has(filePath)) {
    const css = loadScss(filePath)

    if (typeof css !== 'string') {
      throw css
    }

    compiledStyles.set(filePath, css)
  }

  return compiledStyles.get(filePath)
}

describe('Style dependency manifest', () => {
  it.each(styleDependencyManifest)(
    '$name matches compiled CSS',
    async ({ filePath, snapshotPath }) => {
      await expect(getCompiledStyle(filePath)).toMatchFileSnapshot(
        snapshotPath
      )
    }
  )

  it('keeps Table rounded corners when used inside Card', () => {
    const table = styleDependencyManifest.find(
      ({ name }) => name === 'components/table'
    )

    if (!table) {
      throw new Error('Missing Table style dependency entry')
    }

    expect(getCompiledStyle(table.filePath)).toContain(
      '.dnb-card .dnb-table {\n  --table-outline-radius: var(--rounded-corner, var(--token-radius-md));'
    )
  })

  it('has no orphaned snapshots', () => {
    const snapshots = styleRoots
      .flatMap((directory) =>
        findFiles(path.join(sourceRoot, directory), 'deps.scss.snap')
      )
      .sort()
    const expected = styleDependencyManifest
      .map(({ snapshotPath }) => snapshotPath)
      .sort()

    expect(snapshots).toEqual(expected)
  })
})
