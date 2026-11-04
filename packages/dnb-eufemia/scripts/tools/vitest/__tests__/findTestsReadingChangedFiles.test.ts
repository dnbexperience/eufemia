import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {
  findLoadScssEntries,
  findTestsReadingChangedFiles,
  getChangedFiles,
  getTestFileOfSnapshot,
} from '../findTestsReadingChangedFiles'

const packageRoot = path.resolve(__dirname, '../../../..')

function writeFiles(root: string, files: Record<string, string>) {
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), content)
  }
}

describe('getTestFileOfSnapshot', () => {
  it('returns the test file of a snapshot file', () => {
    expect(
      getTestFileOfSnapshot(
        '/repo/src/badge/__tests__/__snapshots__/Badge.test.tsx.snap'
      )
    ).toBe('/repo/src/badge/__tests__/Badge.test.tsx')
  })

  it('returns null for other files', () => {
    expect(
      getTestFileOfSnapshot(
        '/repo/src/badge/__tests__/__image_snapshots__/Badge-1.png'
      )
    ).toBeNull()
    expect(
      getTestFileOfSnapshot(
        '/repo/src/badge/__tests__/Badge.test.tsx.snap'
      )
    ).toBeNull()
    expect(
      getTestFileOfSnapshot('/repo/src/badge/style/dnb-badge.scss')
    ).toBeNull()
  })
})

describe('findLoadScssEntries', () => {
  const testFile = '/repo/src/badge/__tests__/Badge.test.tsx'

  it('returns the require.resolve paths, relative to the test file', () => {
    const source = `
      import { axeComponent, loadScss } from '../../core/test-utils/testSetup'

      const css = loadScss(require.resolve('../style/deps.scss'))
      const theme = loadScss(
        require.resolve('../style/themes/dnb-badge-theme-ui.scss')
      )
    `

    expect(findLoadScssEntries(testFile, source)).toEqual([
      '/repo/src/badge/style/deps.scss',
      '/repo/src/badge/style/themes/dnb-badge-theme-ui.scss',
    ])
  })

  it('returns an empty list when the test does not use loadScss', () => {
    expect(
      findLoadScssEntries(testFile, `import { render } from 'x'`)
    ).toEqual([])
  })

  it.each([
    ['inline Sass', `loadScss(null, { data: "@use 'utilities.scss';" })`],
    [
      'a computed path',
      `['../style/deps.scss'].map((file) => loadScss(require.resolve(file)))`,
    ],
    [
      'a path that is not relative to the test file',
      `loadScss(require.resolve('@dnb/eufemia/style/deps.scss'))`,
    ],
    [
      'an alias',
      `import { loadScss as compile } from '../../core/test-utils/testSetup'
       compile(require.resolve('../style/deps.scss'))`,
    ],
    [
      'loadScss passed on as a function',
      `['../style/deps.scss'].map(require.resolve).map(loadScss)`,
    ],
  ])('returns null for %s', (_, source) => {
    expect(findLoadScssEntries(testFile, source)).toBeNull()
  })
})

describe('findTestsReadingChangedFiles', () => {
  let root: string
  const file = (relativePath: string) => path.join(root, relativePath)
  const find = (changedFiles: string[]) =>
    findTestsReadingChangedFiles({
      packageRoot: root,
      changedFiles: changedFiles.map(file),
    })

  beforeAll(() => {
    // The real path, as macOS links the temporary directory to /private.
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'tests-reading-files-'))
    )

    writeFiles(root, {
      // Found through the `src/style/core` load path of loadScss.
      'src/style/core/utilities.scss': '@mixin focus { outline: 0; }',
      'src/a/style/_colors.scss': '$color: red;',
      'src/a/style/dnb-a.scss': `
        @use 'colors';
        @use 'utilities';
        .a { color: colors.$color; @include utilities.focus; }
      `,
      'src/a/style/deps.scss': "@forward './dnb-a.scss';",
      'src/a/__tests__/A.test.tsx': `
        import { loadScss } from '../../core/test-utils/testSetup'
        loadScss(require.resolve('../style/deps.scss'))
      `,
      'src/a/__tests__/A.screenshot.test.ts':
        "loadScss(require.resolve('../style/deps.scss'))",
      'src/b/style/deps.scss': '.b { color: blue; }',
      'src/b/__tests__/B.test.tsx':
        "loadScss(require.resolve('../style/deps.scss'))",
      'src/b/__tests__/__snapshots__/B.test.tsx.snap': '',
      'src/c/__tests__/C.test.ts': `loadScss(null, { data: '.c {}' })`,
      'src/d/style/deps.scss': "@use 'missing';",
      'src/d/__tests__/D.test.tsx':
        "loadScss(require.resolve('../style/deps.scss'))",
      'src/e/E.tsx': 'export {}',
    })
  })

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it('selects the tests whose styles load a changed style file', () => {
    expect(find(['src/a/style/_colors.scss'])).toEqual([
      {
        testPath: 'src/a/__tests__/A.test.tsx',
        reason: 'src/a/style/deps.scss loads src/a/style/_colors.scss',
      },
      {
        testPath: 'src/c/__tests__/C.test.ts',
        reason:
          'it uses loadScss without a require.resolve path, so it runs on every style change',
      },
      {
        testPath: 'src/d/__tests__/D.test.tsx',
        reason: 'src/d/style/deps.scss does not compile',
      },
    ])
  })

  it('follows the load paths of loadScss', () => {
    expect(find(['src/style/core/utilities.scss'])).toEqual([
      {
        testPath: 'src/a/__tests__/A.test.tsx',
        reason:
          'src/a/style/deps.scss loads src/style/core/utilities.scss',
      },
      {
        testPath: 'src/c/__tests__/C.test.ts',
        reason:
          'it uses loadScss without a require.resolve path, so it runs on every style change',
      },
      {
        testPath: 'src/d/__tests__/D.test.tsx',
        reason: 'src/d/style/deps.scss does not compile',
      },
    ])
  })

  it('selects the test of a changed snapshot', () => {
    expect(
      find(['src/b/__tests__/__snapshots__/B.test.tsx.snap'])
    ).toEqual([
      {
        testPath: 'src/b/__tests__/B.test.tsx',
        reason:
          'its snapshot src/b/__tests__/__snapshots__/B.test.tsx.snap changed',
      },
    ])
  })

  it('selects nothing when no style or snapshot file changed', () => {
    expect(find(['src/e/E.tsx'])).toEqual([])
    expect(
      find(['src/e/__tests__/__snapshots__/Deleted.test.tsx.snap'])
    ).toEqual([])
  })

  it('selects the style tests of this package', () => {
    const tests = findTestsReadingChangedFiles({
      packageRoot,
      changedFiles: [
        path.join(
          packageRoot,
          'src/components/badge/style/dnb-badge.scss'
        ),
      ],
    })

    expect(tests).toContainEqual({
      testPath: 'src/components/badge/__tests__/Badge.test.tsx',
      reason:
        'src/components/badge/style/deps.scss loads src/components/badge/style/dnb-badge.scss',
    })
    expect(tests.map(({ testPath }) => testPath)).not.toContain(
      'src/components/button/__tests__/Button.test.tsx'
    )
  }, 60_000)
})

describe('getChangedFiles', () => {
  let root: string
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' })

  beforeAll(() => {
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'changed-files-'))
    )
    git('init', '--quiet', '--initial-branch=main')
    git('config', 'user.email', 'test@example.com')
    git('config', 'user.name', 'Test')
    git('config', 'commit.gpgsign', 'false')

    // Each file has its own content, so Git does not see a rename.
    writeFiles(root, { 'pkg/base.ts': 'base', 'pkg/staged.ts': 'staged' })
    git('add', '.')
    git('commit', '--quiet', '-m', 'base')

    git('checkout', '--quiet', '-b', 'feature')
    writeFiles(root, { 'pkg/committed.scss': 'committed' })
    git('add', '.')
    git('commit', '--quiet', '-m', 'feature')

    // A later commit on main is not part of the branch.
    git('checkout', '--quiet', 'main')
    writeFiles(root, { 'pkg/main-only.ts': 'main-only' })
    git('add', '.')
    git('commit', '--quiet', '-m', 'main')
    git('checkout', '--quiet', 'feature')

    writeFiles(root, { 'pkg/staged.ts': 'staged, changed' })
    git('add', 'pkg/staged.ts')
    writeFiles(root, {
      'pkg/base.ts': 'base, changed',
      'pkg/untracked.ts': 'untracked',
    })
  })

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it('returns the committed, staged, unstaged and untracked files', () => {
    expect(
      getChangedFiles({ baseRef: 'main', cwd: path.join(root, 'pkg') })
        .map((file) => path.relative(root, file))
        .sort()
    ).toEqual([
      'pkg/base.ts',
      'pkg/committed.scss',
      'pkg/staged.ts',
      'pkg/untracked.ts',
    ])
  })

  it('throws when the base ref is missing', () => {
    expect(() =>
      getChangedFiles({ baseRef: 'origin/missing', cwd: root })
    ).toThrow()
  })
})
