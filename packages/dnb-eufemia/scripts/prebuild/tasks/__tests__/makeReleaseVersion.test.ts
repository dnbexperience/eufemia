/**
 * Scripts test
 *
 */

import fs from 'fs-extra'
import { makeReleaseVersion } from '../makeReleaseVersion'
import * as getBranchName from 'current-git-branch'
import * as getNextReleaseVersion from '../../../postbuild/getNextReleaseVersion'
import { log } from '../../../lib'

jest.mock('../../../postbuild/getNextReleaseVersion', () => {
  return {
    ...jest.requireActual('../../../postbuild/getNextReleaseVersion'),
    getNextReleaseVersion: jest.fn().mockResolvedValue(false),
  }
})

jest.mock('fs-extra', () => {
  return {
    ...jest.requireActual('fs-extra'),
    writeFile: jest.fn().mockResolvedValue(false),
  }
})

jest.mock('repo-utils', () => {
  return {
    ...jest.requireActual('repo-utils'),
    isCI: true,
  }
})

jest.mock('current-git-branch', () => {
  return jest.fn().mockReturnValue('release')
})

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

    expect(log.succeed).toHaveBeenCalledTimes(1)
    expect(log.succeed).toHaveBeenCalledWith(
      'Success on write version to CSS and JS sources: 123456789'
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

    expect(fs.writeFile).toHaveBeenCalledTimes(2)
  })

  it('should run on any branch', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'some-branch')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(2)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/Eufemia.ts'),
      expect.stringContaining(`return 'some-branch'`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: 'some-branch';`)
    )
  })

  it('write version in Eufemia file', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(2)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/Eufemia.ts'),
      expect.stringContaining(`return '123456789'`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: '123456789';`)
    )
  })

  it('write branch in Eufemia file', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => null)

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(2)

    // JS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/Eufemia.ts'),
      expect.stringContaining(`return 'release'`)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('src/shared/Eufemia.ts'),
      expect.stringContaining(`export const version = 'release'`)
    )

    // CSS
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('src/style/core/scopes.scss'),
      expect.stringContaining(`--eufemia-version: 'release';`)
    )
  })
})
