/**
 * Scripts test
 *
 */

import fs from 'fs-extra'
import { makeReleaseVersion } from '../makeReleaseVersion'
import * as getBranchName from 'current-git-branch'
import * as getNextReleaseVersion from '../../../postbuild/getNextReleaseVersion'

jest.mock('../../../postbuild/getNextReleaseVersion', () => {
  return {
    ...jest.requireActual('../../../postbuild/getNextReleaseVersion'),
    getNextReleaseVersion: jest.fn().mockResolvedValue(),
  }
})

jest.mock('fs-extra', () => {
  return {
    ...jest.requireActual('fs-extra'),
    writeFile: jest.fn().mockResolvedValue(),
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
  jest.resetAllMocks()
})

describe('makeReleaseVersion', () => {
  it('should only run when on release branches', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(1)
  })

  it('should not run when not on release branches', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'not-valid')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(0)
  })

  it('write version in Eufemia file', async () => {
    jest
      .spyOn(getBranchName, 'default')
      .mockImplementationOnce(() => 'release')
    jest
      .spyOn(getNextReleaseVersion, 'getNextReleaseVersion')
      .mockImplementationOnce(async () => '123456789')

    await makeReleaseVersion()

    expect(fs.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.writeFile).toHaveBeenLastCalledWith(
      expect.stringContaining('src/shared/Eufemia.js'),
      expect.stringContaining(`return '123456789'`)
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

    expect(fs.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.writeFile).toHaveBeenLastCalledWith(
      expect.stringContaining('src/shared/Eufemia.js'),
      expect.stringContaining(`return 'release'`)
    )
  })
})
