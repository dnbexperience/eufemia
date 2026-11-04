/**
 * Finds the unit tests that read a changed file from disk instead of
 * importing it. Vitest's `--changed` selection follows imports only, so it
 * cannot see these tests, and a green pull request could turn main red:
 *
 * - A test that compiles a style file with `loadScss` depends on every file
 *   that Sass loads for it.
 * - A test depends on its own snapshot file.
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import ts from 'typescript'

export type TestReadingChangedFile = {
  // Relative to the package root, so it can be given to Vitest as a filter.
  testPath: string
  reason: string
}

const TEST_FILE_PATTERN = /\.test\.(js|jsx|ts|tsx)$/
const SCREENSHOT_TEST_FILE_PATTERN = /\.screenshot\.test\.(js|jsx|ts|tsx)$/
const STYLE_FILE_PATTERN = /\.(scss|sass|css)$/

/**
 * Returns the absolute paths of the files that changed since `baseRef`, in the
 * same way as Vitest's `--changed`: the commits since the merge-base, plus
 * staged, unstaged and untracked files.
 */
export function getChangedFiles({
  baseRef,
  cwd,
}: {
  baseRef: string
  cwd: string
}): string[] {
  // Piping stderr puts Git's message, such as a missing base ref, in the error.
  // Without core.quotePath=false, Git quotes paths with non-ASCII characters.
  const run = (args: string[], dir: string) =>
    execFileSync('git', ['-c', 'core.quotePath=false', ...args], {
      cwd: dir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })

  const gitRoot = run(['rev-parse', '--show-toplevel'], cwd).trim()

  // Git prints the paths relative to the repository root.
  const git = (args: string[]) =>
    run(args, gitRoot)
      .split('\n')
      .filter(Boolean)
      .map((file) => path.resolve(gitRoot, file))

  return Array.from(
    new Set([
      ...git(['diff', '--name-only', `${baseRef}...HEAD`]),
      ...git(['diff', '--cached', '--name-only']),
      ...git(['ls-files', '--other', '--modified', '--exclude-standard']),
    ])
  )
}

/**
 * Returns the test file for a Vitest snapshot file
 * (`__tests__/__snapshots__/Badge.test.tsx.snap` -> `__tests__/Badge.test.tsx`),
 * or null when the file is not a snapshot file.
 */
export function getTestFileOfSnapshot(file: string): string | null {
  const snapshotDir = path.dirname(file)

  if (
    path.extname(file) !== '.snap' ||
    path.basename(snapshotDir) !== '__snapshots__'
  ) {
    return null
  }

  return path.join(path.dirname(snapshotDir), path.basename(file, '.snap'))
}

function readRequireResolvePath(node: ts.Expression | undefined) {
  if (
    node &&
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === 'require' &&
    node.expression.name.text === 'resolve' &&
    node.arguments.length === 1 &&
    ts.isStringLiteralLike(node.arguments[0])
  ) {
    return node.arguments[0].text
  }

  return null
}

/**
 * Returns the absolute paths of the style files that a test file compiles
 * with `loadScss(require.resolve('./relative/path.scss'))`. Returns null when
 * the test uses `loadScss` in any other way (inline Sass, a computed path, an
 * alias), because its style files cannot be read from the source then.
 * Returns an empty list when the test does not use `loadScss`.
 */
export function findLoadScssEntries(
  testFile: string,
  source: string
): string[] | null {
  if (!source.includes('loadScss')) {
    return []
  }

  const entries = new Set<string>()
  let isComputed = false

  const visit = (node: ts.Node) => {
    if (ts.isIdentifier(node) && node.text === 'loadScss') {
      const parent = node.parent

      if (ts.isImportSpecifier(parent) && !parent.propertyName) {
        // `import { loadScss } from '…'`
      } else if (
        ts.isCallExpression(parent) &&
        parent.expression === node
      ) {
        const entry = readRequireResolvePath(parent.arguments[0])

        if (entry?.startsWith('.')) {
          entries.add(path.resolve(path.dirname(testFile), entry))
        } else {
          isComputed = true
        }
      } else {
        isComputed = true
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(
    ts.createSourceFile(testFile, source, ts.ScriptTarget.Latest, true)
  )

  return isComputed ? null : Array.from(entries)
}

function findTestFiles(srcDir: string): string[] {
  // Vitest applies its own include and exclude patterns to the paths it gets,
  // so this only needs to skip the files it can never run.
  return fs
    .readdirSync(srcDir, { recursive: true, encoding: 'utf8' })
    .filter((file) => {
      return (
        TEST_FILE_PATTERN.test(file) &&
        !SCREENSHOT_TEST_FILE_PATTERN.test(file) &&
        !file.split(path.sep).includes('node_modules')
      )
    })
    .map((file) => path.join(srcDir, file))
    .sort()
}

/**
 * Returns the absolute paths of all files that Sass loads to compile `entry`,
 * with the same load paths as `loadScss` in `src/core/test-utils/testSetup.ts`.
 * Throws when the file does not compile.
 */
function getLoadedStyleFiles(entry: string, packageRoot: string) {
  const { loadedUrls } = sass.compile(entry, {
    loadPaths: [
      path.dirname(entry),
      path.join(packageRoot, 'src/style/core'),
    ],
    sourceMap: false,
    logger: sass.Logger.silent,
  })

  return loadedUrls
    .filter((url) => url.protocol === 'file:')
    .map((url) => fileURLToPath(url))
}

/**
 * Returns the unit tests that read one of `changedFiles` (absolute paths) from
 * disk, sorted by path.
 */
export function findTestsReadingChangedFiles({
  packageRoot,
  changedFiles,
}: {
  packageRoot: string
  changedFiles: string[]
}): TestReadingChangedFile[] {
  const srcDir = path.join(packageRoot, 'src')
  const changed = new Set(changedFiles)
  const reasons = new Map<string, string>()
  const addReason = (testFile: string, reason: string) => {
    if (!reasons.has(testFile)) {
      reasons.set(testFile, reason)
    }
  }
  const relative = (file: string) => path.relative(packageRoot, file)

  for (const file of changedFiles) {
    const testFile = getTestFileOfSnapshot(file)

    if (
      testFile?.startsWith(srcDir + path.sep) &&
      fs.existsSync(testFile)
    ) {
      addReason(testFile, `its snapshot ${relative(file)} changed`)
    }
  }

  if (!changedFiles.some((file) => STYLE_FILE_PATTERN.test(file))) {
    return toSortedList(reasons, relative)
  }

  const loadedFilesCache = new Map<string, string[] | null>()
  const getLoadedFiles = (entry: string) => {
    if (!loadedFilesCache.has(entry)) {
      try {
        loadedFilesCache.set(
          entry,
          getLoadedStyleFiles(entry, packageRoot)
        )
      } catch {
        loadedFilesCache.set(entry, null)
      }
    }
    return loadedFilesCache.get(entry)
  }

  for (const testFile of findTestFiles(srcDir)) {
    const entries = findLoadScssEntries(
      testFile,
      fs.readFileSync(testFile, 'utf8')
    )

    if (entries === null) {
      addReason(
        testFile,
        'it uses loadScss without a require.resolve path, so it runs on every style change'
      )
      continue
    }

    for (const entry of entries) {
      const loadedFiles = getLoadedFiles(entry)

      if (loadedFiles === null) {
        addReason(testFile, `${relative(entry)} does not compile`)
        break
      }

      const changedStyleFile = loadedFiles.find((file) =>
        changed.has(file)
      )

      if (changedStyleFile) {
        addReason(
          testFile,
          `${relative(entry)} loads ${relative(changedStyleFile)}`
        )
        break
      }
    }
  }

  return toSortedList(reasons, relative)
}

function toSortedList(
  reasons: Map<string, string>,
  relative: (file: string) => string
): TestReadingChangedFile[] {
  return Array.from(reasons, ([testFile, reason]) => ({
    testPath: relative(testFile),
    reason,
  })).sort((a, b) => a.testPath.localeCompare(b.testPath))
}
