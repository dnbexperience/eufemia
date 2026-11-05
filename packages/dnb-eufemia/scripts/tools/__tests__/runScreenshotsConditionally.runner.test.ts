import {
  resolveCliOptions,
  shouldRunAllByEnvironment,
} from '../runScreenshotsConditionally/runner'

describe('runScreenshotsConditionally runner cli options', () => {
  it('defaults to auto mode', () => {
    expect(resolveCliOptions([])).toEqual({
      shouldExplain: false,
      isDryRun: false,
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
      changedFilesMode: 'auto',
    })
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
