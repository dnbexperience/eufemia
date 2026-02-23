import { resolveCliOptions } from '../runScreenshotsConditionally/runner'

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
