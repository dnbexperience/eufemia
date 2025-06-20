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

jest.mock('../../../postbuild/getNextReleaseVersion', () => {
  return {
    ...jest.requireActual('../../../postbuild/getNextReleaseVersion'),
    getNextReleaseVersion: jest.fn(),
  }
})

jest.mock('fs-extra', () => {
  return {
    ...jest.requireActual('fs-extra'),
    writeFile: jest.fn(),
  }
})

jest.mock('repo-utils', () => {
  return {
    ...jest.requireActual('repo-utils'),
    isCI: true,
  }
})

jest.mock('current-git-branch', () => {
  return jest.fn()
})

jest.mock('child_process', () => ({
  execSync: jest.fn(() => {
    return {
      toString: jest.fn(() => {
        return 'something'
      }),
    }
  }),
}))

beforeEach(() => {
  jest.spyOn(log, 'succeed').mockImplementation(jest.fn())
})
afterEach(() => {
  jest.resetAllMocks()
})

describe('makeReleaseVersion', () => {
  it('should log success', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

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
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)
  })

  it('should run on any branch', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'some-branch')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
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
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
      expect.stringContaining(`123456789`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
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
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => null)

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
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
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(child_process, 'execSync')
      .mockReturnValueOnce('test-sha' as any)

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
      expect.stringContaining(`test-sha`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/build-info/BuildInfoData.js'),
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
})
