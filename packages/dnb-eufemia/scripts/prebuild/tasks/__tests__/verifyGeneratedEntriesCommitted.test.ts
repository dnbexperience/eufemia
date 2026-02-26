/**
 * Scripts test
 *
 */

import * as child_process from 'child_process'
import {
  GENERATED_ENTRY_FILE_PATTERNS,
  verifyGeneratedEntriesCommitted,
} from '../verifyGeneratedEntriesCommitted'

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}))

describe('verifyGeneratedEntriesCommitted', () => {
  it('does not throw when there are no generated entry changes', () => {
    jest.spyOn(child_process, 'execSync').mockReturnValueOnce('' as any)

    expect(() => verifyGeneratedEntriesCommitted()).not.toThrow()
  })

  it('throws when generated entries changed during build', () => {
    jest
      .spyOn(child_process, 'execSync')
      .mockReturnValueOnce(
        [
          ' M src/shared/build-info/BuildInfoData.js',
          ' M src/components/index.ts',
          ' M src/style/dnb-ui-components.scss',
        ].join('\n') as any
      )

    expect(() => verifyGeneratedEntriesCommitted()).toThrow(
      'Generated entry files changed during CI prebuild'
    )
  })

  it('checks all changed files and filters by generated entry patterns', () => {
    jest.spyOn(child_process, 'execSync').mockReturnValueOnce('' as any)

    verifyGeneratedEntriesCommitted()

    expect(child_process.execSync).toHaveBeenCalledWith(
      'git status --porcelain --untracked-files=no',
      expect.objectContaining({
        cwd: expect.stringContaining('/packages/dnb-eufemia'),
        encoding: 'utf-8',
      })
    )

    expect(
      GENERATED_ENTRY_FILE_PATTERNS.some((pattern) =>
        pattern.test('src/components/index.ts')
      )
    ).toBe(true)
    expect(
      GENERATED_ENTRY_FILE_PATTERNS.some((pattern) =>
        pattern.test('src/elements/H1.ts')
      )
    ).toBe(true)
    expect(
      GENERATED_ENTRY_FILE_PATTERNS.some((pattern) =>
        pattern.test('src/extensions/lib.js')
      )
    ).toBe(true)
    expect(
      GENERATED_ENTRY_FILE_PATTERNS.some((pattern) =>
        pattern.test('src/shared/build-info/BuildInfoData.js')
      )
    ).toBe(false)
  })
})
