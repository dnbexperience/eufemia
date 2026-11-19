import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  getShardCount,
  resolveCliOptions,
  shouldRunAllByEnvironment,
  writeRunPlan,
} from '../runScreenshotsConditionally/runner'

describe('runScreenshotsConditionally runner cli options', () => {
  it('defaults to auto mode', () => {
    expect(resolveCliOptions([])).toEqual({
      shouldExplain: false,
      isDryRun: false,
      isPlan: false,
      changedFilesMode: 'auto',
    })
  })

  it('supports uncommitted shortcut', () => {
    expect(resolveCliOptions(['--uncommitted']).changedFilesMode).toBe(
      'uncommitted'
    )
  })

  it('supports explicit changes flag using equals syntax', () => {
    expect(resolveCliOptions(['--changes=branch']).changedFilesMode).toBe(
      'branch'
    )
  })

  it('supports explicit changes flag using value syntax', () => {
    expect(
      resolveCliOptions(['--changes', 'uncommitted']).changedFilesMode
    ).toBe('uncommitted')
  })

  it('enables dry-run when explain is used', () => {
    expect(resolveCliOptions(['--explain'])).toEqual({
      shouldExplain: true,
      isDryRun: true,
      isPlan: false,
      changedFilesMode: 'auto',
    })
  })

  it('enables dry-run when plan is used', () => {
    expect(resolveCliOptions(['--plan'])).toEqual({
      shouldExplain: false,
      isDryRun: true,
      isPlan: true,
      changedFilesMode: 'auto',
    })
  })
})

describe('runScreenshotsConditionally runner plan', () => {
  it('writes the selected tests and shards for the CI workflow', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'visual-plan-'))
    const outputFile = path.join(directory, 'output')

    try {
      writeRunPlan(
        2,
        ['src/a.screenshot.test.ts', 'src/b.screenshot.test.ts'],
        outputFile
      )

      expect(readFileSync(outputFile, 'utf8')).toBe(
        'tests=src/a.screenshot.test.ts,src/b.screenshot.test.ts\nshard-total=1\nshards=[1]\n'
      )
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })

  it('writes empty tests to run all of them', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'visual-plan-'))
    const outputFile = path.join(directory, 'output')

    try {
      writeRunPlan(118, [], outputFile)

      expect(readFileSync(outputFile, 'utf8')).toBe(
        'tests=\nshard-total=4\nshards=[1,2,3,4]\n'
      )
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })

  it('adds a shard per 15 test files, up to four', () => {
    expect(getShardCount(0)).toBe(1)
    expect(getShardCount(15)).toBe(1)
    expect(getShardCount(16)).toBe(2)
    expect(getShardCount(45)).toBe(3)
    expect(getShardCount(46)).toBe(4)
    expect(getShardCount(500)).toBe(4)
  })
})

describe('runScreenshotsConditionally runner environment', () => {
  it('runs all tests when CI could not list all changed files', () => {
    expect(
      shouldRunAllByEnvironment({ VISUAL_TEST_RUN_ALL: 'true' })
    ).toBe(true)
  })

  it('selects tests when the run-all flag is missing or not true', () => {
    expect(shouldRunAllByEnvironment({})).toBe(false)
    expect(
      shouldRunAllByEnvironment({ VISUAL_TEST_RUN_ALL: 'false' })
    ).toBe(false)
  })
})
