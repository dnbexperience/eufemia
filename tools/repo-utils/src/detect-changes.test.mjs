import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { posix } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  STANDALONE_TOOLS,
  USED_BY,
  classifyChanges,
  findStandaloneToolDir,
  isComparedWithMain,
  isRunTestsOnlyPath,
  listAffectedWorkspaces,
} from './detect-changes.mjs'

test('unit tests in library and tools are tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'packages/dnb-eufemia/src/mcp/__tests__/docs-source.test.ts',
      'packages/dnb-eufemia/src/components/button/__tests__/Button.test.tsx',
      'packages/dnb-eufemia/src/components/button/__tests__/__snapshots__/Button.test.tsx.snap',
      'tools/mcp-lambda/src/__tests__/lambda-handler.test.ts',
    ]),
    {
      standaloneToolsOnly: false,
      testsOnly: true,
      packagesUnaffected: true,
    }
  )
})

test('unit tests in a standalone tool are standalone and tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'tools/analytics/__tests__/store.test.ts',
      'tools/analytics/dashboard/src/__tests__/App.test.tsx',
    ]),
    {
      standaloneToolsOnly: true,
      testsOnly: true,
      packagesUnaffected: true,
    }
  )
})

test('visual, E2E and build tests, and test helpers, do not count', () => {
  for (const path of [
    'packages/dnb-eufemia/src/components/button/__tests__/Button.screenshot.test.ts',
    'packages/dnb-eufemia/src/components/button/__tests__/__image_snapshots__/button.snap.png',
    'packages/dnb-eufemia/src/components/list/__tests__/ListCustomCells.e2e.spec.ts',
    'packages/dnb-design-system-portal/src/e2e/search.spec.ts',
    'packages/dnb-eufemia/scripts/postbuild/__tests__/postbuild.test.ts',
    'packages/dnb-design-system-portal/scripts/__tests__/portal-hydration.test.ts',
    'packages/dnb-design-system-portal/scripts/og-images/cdn.test.mts',
    'packages/dnb-eufemia/src/style/__tests__/fontTestStyles.ts',
    'packages/dnb-eufemia/vitest.config.mts',
    'tools/repo-utils/src/node-utils.test.js',
  ]) {
    assert.equal(isRunTestsOnlyPath(path), false, path)
  }
})

test('one non-test file runs every job', () => {
  assert.deepEqual(
    classifyChanges([
      'packages/dnb-eufemia/src/components/button/__tests__/Button.test.tsx',
      'packages/dnb-eufemia/src/components/button/Button.tsx',
    ]),
    {
      standaloneToolsOnly: false,
      testsOnly: false,
      packagesUnaffected: false,
    }
  )
})

test('standalone tool source is not tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'tools/analytics/src/store.ts',
      '.github/workflows/analytics-lambda.yml',
    ]),
    {
      standaloneToolsOnly: true,
      testsOnly: false,
      packagesUnaffected: true,
    }
  )
})

test('standalone tool source with a library unit test affects packages', () => {
  assert.deepEqual(
    classifyChanges([
      'tools/analytics/src/store.ts',
      'packages/dnb-eufemia/src/components/button/__tests__/Button.test.tsx',
    ]),
    {
      standaloneToolsOnly: false,
      testsOnly: false,
      packagesUnaffected: false,
    }
  )
})

test('no changes run every job', () => {
  assert.deepEqual(classifyChanges([]), {
    standaloneToolsOnly: false,
    testsOnly: false,
    packagesUnaffected: false,
  })
})

test('feature branch pushes and pull requests to main are compared with main', () => {
  assert.equal(
    isComparedWithMain({
      GITHUB_EVENT_NAME: 'push',
      GITHUB_REF_NAME: 'chore/x',
    }),
    true
  )
  assert.equal(
    isComparedWithMain({
      GITHUB_EVENT_NAME: 'pull_request',
      GITHUB_BASE_REF: 'main',
    }),
    true
  )
})

test('main, release branches and other events are not compared', () => {
  for (const env of [
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'main' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'v11' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'release' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'beta' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'alpha' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: 'next' },
    { GITHUB_EVENT_NAME: 'push', GITHUB_REF_NAME: '10.x' },
    { GITHUB_EVENT_NAME: 'pull_request', GITHUB_BASE_REF: 'release' },
    { GITHUB_EVENT_NAME: 'workflow_dispatch' },
  ]) {
    assert.equal(isComparedWithMain(env), false, JSON.stringify(env))
  }
})

test('a standalone tool affects itself and the tools that use it', () => {
  assert.deepEqual(
    listAffectedWorkspaces([
      'tools/analytics/src/store.ts',
      'tools/analytics/infra/main.tf',
    ]),
    [
      'eufemia-analytics',
      'eufemia-mcp-lambda',
      'eufemia-service-monitoring',
    ]
  )
})

test('the analytics dashboard and analytics do not affect each other', () => {
  assert.deepEqual(
    listAffectedWorkspaces(['tools/analytics/dashboard/src/App.tsx']),
    ['eufemia-analytics-dashboard']
  )
})

test('shared monitoring helpers affect every tool that imports them', () => {
  assert.deepEqual(
    listAffectedWorkspaces(['tools/monitoring/report-incident.ts']),
    [
      'eufemia-analytics',
      'eufemia-assets-hosting',
      'eufemia-mcp-lambda',
      'eufemia-service-monitoring',
    ]
  )
})

test('tools that use a tool indirectly are affected too', () => {
  assert.deepEqual(
    listAffectedWorkspaces(['tools/usage-ingest/src/index.ts']),
    [
      'eufemia-analytics',
      'eufemia-mcp-lambda',
      'eufemia-service-monitoring',
      'eufemia-usage-ingest',
    ]
  )
})

test('a standalone tool workflow affects its tool', () => {
  assert.deepEqual(
    listAffectedWorkspaces([
      '.github/workflows/mcp-legacy-proxy-deploy.yml',
    ]),
    ['@dnb/eufemia-mcp-legacy-proxy']
  )
})

test('shared files, the library and tools it is built from affect every workspace', () => {
  for (const path of [
    'package.json',
    'yarn.lock',
    '.yarnrc.yml',
    '.github/actions/setup/action.yml',
    '.github/workflows/verify.yml',
    'tools/repo-utils/src/detect-changes.mjs',
    'tools/eufemia-css-optimizer/src/index.ts',
    'tools/markdown-tables-utils/src/index.ts',
    'packages/dnb-eufemia/src/components/button/__tests__/Button.test.tsx',
    'packages/dnb-design-system-portal/eslint.config.mjs',
  ]) {
    assert.equal(
      listAffectedWorkspaces(['tools/analytics/src/store.ts', path]),
      null,
      path
    )
  }
  assert.equal(listAffectedWorkspaces([]), null)
})

const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url))
const SKIPPED_DIRS = new Set([
  '.cache',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'out',
  'public',
])
const SOURCE_FILE = /\.([cm]?[jt]sx?|json)$/
// Run by the E2E job, not by Verify
const IGNORED_FILES = new Set([
  'packages/dnb-design-system-portal/scripts/og-images/request.test.mts',
])

function listSourceFiles(dir) {
  return readdirSync(REPO_ROOT + dir, { withFileTypes: true }).flatMap(
    (entry) => {
      const path = posix.join(dir, entry.name)
      if (entry.isDirectory()) {
        return SKIPPED_DIRS.has(entry.name) ? [] : listSourceFiles(path)
      }
      return SOURCE_FILE.test(entry.name) ? [path] : []
    }
  )
}

function readPackageJson(dir) {
  const path = `${REPO_ROOT}${dir}/package.json`
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null
}

test('USED_BY lists every standalone tool that another workspace uses', () => {
  const workspaceDirs = ['packages', 'tools'].flatMap((dir) =>
    readdirSync(REPO_ROOT + dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `${dir}/${entry.name}`)
  )
  const dirsByName = new Map(
    Object.entries(STANDALONE_TOOLS).map(([dir, { name }]) => [name, dir])
  )

  const pathUses = workspaceDirs
    .flatMap(listSourceFiles)
    .filter((file) => !IGNORED_FILES.has(file))
    .flatMap((file) =>
      [
        ...readFileSync(REPO_ROOT + file, 'utf8').matchAll(
          /['"`](\.\.\/[^'"`\s]*)/g
        ),
      ].map(([, relativePath]) => {
        const path = posix.join(posix.dirname(file), relativePath)
        return {
          toolDir:
            findStandaloneToolDir(path) ??
            findStandaloneToolDir(`${path}/`),
          userDir: findStandaloneToolDir(file),
          source: file,
        }
      })
    )

  const dependencyUses = [
    ...workspaceDirs,
    'tools/analytics/dashboard',
  ].flatMap((dir) => {
    const { dependencies, devDependencies, peerDependencies } =
      readPackageJson(dir) ?? {}
    return Object.entries({
      ...dependencies,
      ...devDependencies,
      ...peerDependencies,
    })
      .filter(([, version]) => version.startsWith('workspace:'))
      .map(([name]) => ({
        toolDir: dirsByName.get(name),
        userDir: findStandaloneToolDir(`${dir}/`),
        source: `${dir}/package.json`,
      }))
  })

  const missing = [...pathUses, ...dependencyUses]
    .filter(
      ({ toolDir, userDir }) =>
        toolDir &&
        toolDir !== userDir &&
        !USED_BY[toolDir]?.includes(userDir)
    )
    .map(
      ({ toolDir, userDir, source }) =>
        `${toolDir} is used by ${userDir ?? source}`
    )

  assert.deepEqual([...new Set(missing)], [])
})

test('STANDALONE_TOOLS names match each package.json', () => {
  for (const [dir, { name }] of Object.entries(STANDALONE_TOOLS)) {
    assert.equal(readPackageJson(dir)?.name ?? null, name, dir)
  }
})
