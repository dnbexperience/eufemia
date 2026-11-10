import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  classifyChanges,
  isComparedWithMain,
  isRunTestsOnlyPath,
} from './detect-changes.mjs'

test('unit tests in library and tools are tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'packages/dnb-eufemia/src/mcp/__tests__/docs-source.test.ts',
      'packages/dnb-eufemia/src/components/button/__tests__/Button.test.tsx',
      'packages/dnb-eufemia/src/components/button/__tests__/__snapshots__/Button.test.tsx.snap',
      'tools/mcp-lambda/src/__tests__/lambda-handler.test.ts',
    ]),
    { standaloneToolsOnly: false, testsOnly: true }
  )
})

test('unit tests in a standalone tool are standalone and tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'tools/analytics/__tests__/store.test.ts',
      'tools/analytics/dashboard/src/__tests__/App.test.tsx',
    ]),
    { standaloneToolsOnly: true, testsOnly: true }
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
    { standaloneToolsOnly: false, testsOnly: false }
  )
})

test('standalone tool source is not tests only', () => {
  assert.deepEqual(
    classifyChanges([
      'tools/analytics/src/store.ts',
      '.github/workflows/analytics-lambda.yml',
    ]),
    { standaloneToolsOnly: true, testsOnly: false }
  )
})

test('no changes run every job', () => {
  assert.deepEqual(classifyChanges([]), {
    standaloneToolsOnly: false,
    testsOnly: false,
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
    { GITHUB_EVENT_NAME: 'pull_request', GITHUB_BASE_REF: 'release' },
    { GITHUB_EVENT_NAME: 'workflow_dispatch' },
  ]) {
    assert.equal(isComparedWithMain(env), false, JSON.stringify(env))
  }
})
