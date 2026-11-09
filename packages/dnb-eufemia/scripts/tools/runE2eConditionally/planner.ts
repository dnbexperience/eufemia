import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { buildReverseDependencyMap } from '../runScreenshotsConditionally/tsDependencyGraph'
import {
  buildScssDependencyMap,
  expandReverseDependencies,
} from '../runScreenshotsConditionally/dependencyMaps'
import {
  selectE2eTests,
  LIBRARY,
  PORTAL,
  type SourceFile,
} from './selection'

export function getChangedFiles(root: string, baseRef: string): string[] {
  const git = (args: string[]) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
      .split('\0')
      .filter(Boolean)
  return Array.from(
    new Set([
      ...git([
        'diff',
        '--name-only',
        '--no-renames',
        '-z',
        baseRef + '...HEAD',
      ]),
      ...git(['diff', '--name-only', '--no-renames', '-z']),
      ...git(['diff', '--cached', '--name-only', '--no-renames', '-z']),
      ...git(['ls-files', '--others', '--exclude-standard', '-z']),
    ])
  ).sort()
}

export function planE2eTests({
  root,
  changedFiles,
  branch,
  forceAll,
}: {
  root: string
  changedFiles: string[]
  branch?: string
  forceAll?: boolean
}) {
  const files = execFileSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean)
  const read = (file: string): SourceFile => ({
    path: file,
    content: readFileSync(path.join(root, file), 'utf8'),
  })
  const tests = files
    .filter(
      (file) =>
        (file.startsWith(LIBRARY + 'src/') &&
          file.endsWith('.e2e.spec.ts')) ||
        (file.startsWith(PORTAL + 'src/e2e/') && file.endsWith('.spec.ts'))
    )
    .map(read)
  if (tests.length === 0) {
    throw new Error('No browser test files were discovered.')
  }
  const initial = selectE2eTests({
    changedFiles,
    tests,
    docs: [],
    branch,
    forceAll,
  })
  if (initial.mode !== 'partial') {
    return initial
  }

  const packageRoot = path.join(root, LIBRARY)
  const configPath = path.join(packageRoot, 'tsconfig.json')
  const config = ts.readConfigFile(configPath, ts.sys.readFile)
  if (config.error) {
    throw new Error('Cannot read the library TypeScript configuration.')
  }
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    packageRoot
  )
  if (parsed.errors.length > 0) {
    throw new Error('Cannot resolve the library TypeScript configuration.')
  }
  const program = ts.createProgram(parsed.fileNames, parsed.options)
  const tsMap = buildReverseDependencyMap(program, packageRoot)
  const scssMap = buildScssDependencyMap(
    files
      .filter(
        (file) =>
          file.startsWith(LIBRARY + 'src/') && file.endsWith('.scss')
      )
      .map((file) => ({
        path: file.slice(LIBRARY.length),
        content: read(file).content,
      }))
  )
  const sourceChanges = changedFiles
    .filter((file) => file.startsWith(LIBRARY + 'src/'))
    .map((file) => file.slice(LIBRARY.length))
  const affectedFiles = Array.from(
    new Set([
      ...expandReverseDependencies(sourceChanges, tsMap),
      ...expandReverseDependencies(sourceChanges, scssMap),
    ])
  )
  const docs = files
    .filter(
      (file) =>
        file.startsWith(PORTAL + 'src/docs/') &&
        /\.(?:mdx|[jt]sx?)$/.test(file)
    )
    .map(read)
  return selectE2eTests({
    changedFiles,
    affectedFiles,
    tests,
    docs,
    branch,
    forceAll,
  })
}
