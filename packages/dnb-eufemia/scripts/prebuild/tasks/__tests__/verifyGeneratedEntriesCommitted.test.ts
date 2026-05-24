/**
 * Scripts test
 *
 */

import * as child_process from 'child_process'
import { verifyGeneratedEntriesCommitted } from '../verifyGeneratedEntriesCommitted'

vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

describe('verifyGeneratedEntriesCommitted', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not throw when there are no changes', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce('' as any)

    expect(() => verifyGeneratedEntriesCommitted()).not.toThrow()
  })

  it('ignores files written by makeReleaseVersion', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce(
      [
        ' M src/shared/build-info/BuildInfoData.ts',
        ' M src/shared/build-info/BuildInfoData.cjs',
        ' M src/style/core/scopes.scss',
        ' M src/scope-hash.txt',
      ].join('\n') as any
    )

    expect(() => verifyGeneratedEntriesCommitted()).not.toThrow()
  })

  it('throws when tracked files changed during build', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce(
      [
        ' M src/components/index.ts',
        ' M src/style/dnb-ui-components.scss',
      ].join('\n') as any
    )

    expect(() => verifyGeneratedEntriesCommitted()).toThrow(
      'Generated files changed during CI prebuild'
    )
  })

  it('normalizes monorepo-root relative paths', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce(
      ' M packages/dnb-eufemia/src/components/index.ts' as any
    )

    expect(() => verifyGeneratedEntriesCommitted()).toThrow(
      'src/components/index.ts'
    )
  })

  it('lists changed files in the error message', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce(
      [
        ' M src/components/index.ts',
        ' M src/style/themes/ui/properties.ts',
      ].join('\n') as any
    )

    try {
      verifyGeneratedEntriesCommitted()
    } catch (e) {
      const message = (e as Error).message
      expect(message).toContain('- src/components/index.ts')
      expect(message).toContain('- src/style/themes/ui/properties.ts')
    }
  })

  it('runs git status with correct options', () => {
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce('' as any)

    verifyGeneratedEntriesCommitted()

    expect(child_process.execSync).toHaveBeenCalledWith(
      'git status --porcelain --untracked-files=no',
      expect.objectContaining({
        cwd: expect.stringContaining('/packages/dnb-eufemia'),
        encoding: 'utf-8',
      })
    )
  })
})
