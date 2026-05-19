/**
 * Scripts test
 *
 */

import fs from 'fs-extra'
import { makeReleaseVersion } from '../makeReleaseVersion'
import * as child_process from 'child_process'
import * as getBranchName from 'current-git-branch'
import * as getNextReleaseVersion from '../../../postbuild/getNextReleaseVersion'
import { log } from '../../../lib'

vi.mock('../../../postbuild/getNextReleaseVersion', async () => {
  return {
    ...(await vi.importActual<
      typeof import('../../../postbuild/getNextReleaseVersion')
    >('../../../postbuild/getNextReleaseVersion')),
    getNextReleaseVersion: vi.fn(),
  }
})

vi.mock('fs-extra', async () => {
  const actual =
    await vi.importActual<typeof import('fs-extra')>('fs-extra')
  const actualFs = (
    'default' in actual ? actual.default : actual
  ) as typeof fs
  const mockedFs = {
    ...actualFs,
    readFile: vi.fn(async (file) => {
      if (String(file).endsWith('BuildInfoData.ts')) {
        return [
          "export const version = '__VERSION__'",
          "export const sha = '__SHA__'",
          "export const buildDate = '__BUILD_DATE__'",
          '',
        ].join('\n')
      }

      if (String(file).endsWith('BuildInfoData.cjs')) {
        return [
          "exports.version = '__VERSION__'",
          "exports.sha = '__SHA__'",
          "exports.buildDate = '__BUILD_DATE__'",
          '',
        ].join('\n')
      }

      if (String(file).endsWith('scopes.scss')) {
        return "--eufemia-version: '__VERSION__';\n"
      }

      return actualFs.readFile(file, 'utf-8')
    }),
    writeFile: vi.fn(),
  }

  return {
    ...actual,
    ...mockedFs,
    default: mockedFs,
  }
})

vi.mock('repo-utils', async () => {
  return {
    ...(await vi.importActual<typeof import('repo-utils')>('repo-utils')),
    isCI: true,
  }
})

vi.mock('current-git-branch', () => ({
  default: vi.fn(),
}))

vi.mock('child_process', () => ({
  execSync: vi.fn(() => {
    return {
      toString: vi.fn(() => {
        return 'something'
      }),
    }
  }),
}))

beforeEach(() => {
  vi.spyOn(log, 'succeed').mockImplementation(vi.fn())
})
afterEach(() => {
  vi.resetAllMocks()
})

describe('makeReleaseVersion', () => {
  it('should log success', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(log.succeed).toHaveBeenCalledTimes(2)
    expect(log.succeed).toHaveBeenNthCalledWith(
      1,
      'Success on write version to CSS and JS sources: 123456789'
    )
    expect(log.succeed).toHaveBeenNthCalledWith(
      2,
      'Success on write to scope-hash.txt with scope hash: eufemia-scope--123456789'
    )
  })

  it('should only run when on release branches', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)
  })

  it('should run on any branch', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'some-branch'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`some-branch`)
    )

    // CJS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`some-branch`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: 'some-branch';`)
    )
  })

  it('write version in file', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`123456789`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`export const version = '123456789'`)
    )

    // CJS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`123456789`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`exports.version = '123456789'`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: '123456789';`)
    )
  })

  it('write branch in file', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => null)

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`release`)
    )

    // CJS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`release`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: 'release';`)
    )
  })

  it('write sha in file', async () => {
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(child_process, 'execSync').mockReturnValueOnce(
      'test-sha' as any
    )

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`test-sha`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.ts'),
      expect.stringContaining(`export const sha = 'test-sha'`)
    )

    // CJS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`test-sha`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/shared/build-info/BuildInfoData.cjs'),
      expect.stringContaining(`exports.sha = 'test-sha'`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.not.stringContaining(`test-sha`)
    )
  })

  it('write buildDate (ISO) in BuildInfoData files', async () => {
    const beforeCall = Date.now()
    vi.spyOn(getBranchName, 'default').mockImplementationOnce(
      () => 'release'
    )
    vi.spyOn(
      getNextReleaseVersion,
      'getNextReleaseVersion'
    ).mockImplementationOnce(async () => '1.0.0')

    await makeReleaseVersion()

    const afterCall = Date.now()

    const jsCall = (
      fs.writeFile as unknown as import('vitest').Mock
    ).mock.calls.find(
      (call) =>
        call[0].includes('BuildInfoData.ts') &&
        call[1].includes('buildDate')
    )
    expect(jsCall).toBeDefined()
    const jsContent = jsCall[1]
    const buildDateMatch = jsContent.match(/buildDate = '([^']+)'/)
    expect(buildDateMatch).toBeDefined()
    const buildDate = buildDateMatch[1]
    expect(buildDate).not.toBe('__BUILD_DATE__')
    const buildDateMs = new Date(buildDate).getTime()
    expect(buildDateMs).toBeGreaterThanOrEqual(beforeCall - 1000)
    expect(buildDateMs).toBeLessThanOrEqual(afterCall + 1000)

    const cjsCall = (
      fs.writeFile as unknown as import('vitest').Mock
    ).mock.calls.find(
      (call) =>
        call[0].includes('BuildInfoData.cjs') &&
        call[1].includes('buildDate')
    )
    expect(cjsCall).toBeDefined()
    expect(cjsCall[1]).toContain(`exports.buildDate = '${buildDate}'`)
  })
})
