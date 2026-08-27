/**
 * Conditional unit-test runner for CI.
 *
 * Protected branches run the full suite (a diff against origin/main is empty
 * there). Every other branch runs Vitest's native `--changed` selection plus
 * the guard tests that `--changed` cannot see. Changes to global test infra
 * already fall back to the full suite via `forceRerunTriggers` in
 * `vitest.config.ts`. The base ref must be fetched (CI uses `fetch-depth: 0`);
 * a missing ref fails loudly rather than silently running the wrong set.
 */

import { spawnSync } from 'node:child_process'

import {
  ALWAYS_RUN_TEST_PATHS,
  DEFAULT_BASE_REF,
  isProtectedBranch,
} from './runConditionalUnitTestsLib.ts'

function runVitest(args: string[]): number {
  const { error, status } = spawnSync('yarn', ['vitest', ...args], {
    stdio: 'inherit',
    env: process.env,
  })
  if (error) {
    throw error
  }
  return status ?? 1
}

const branchName = process.env.GITHUB_REF_NAME
const baseRef = process.env.UNIT_TEST_BASE_REF || DEFAULT_BASE_REF

if (isProtectedBranch(branchName)) {
  console.log(`Protected branch "${branchName}": running all unit tests.`)
  process.exit(runVitest(['run']))
}

console.log(`Running unit tests affected since ${baseRef}, plus guards.`)

const changedExit = runVitest([
  'run',
  '--changed',
  baseRef,
  '--passWithNoTests',
])

// Guards scan the file system instead of importing, so `--changed` can never
// select them; run them explicitly.
const guardExit = runVitest([
  'run',
  ...ALWAYS_RUN_TEST_PATHS,
  '--passWithNoTests',
])

process.exit(changedExit || guardExit)
