/**
 * Scripts test
 *
 */

import { runPrepublishTasks } from '../index'
import { makeReleaseVersion } from '../tasks/makeReleaseVersion'
import { prepareTemplates } from '../tasks/prepareTemplates'
import { runStyleFactory } from '../tasks/styleFactory'
import { runThemeFactory } from '../tasks/themeFactory'
import convertSvgToJsx from '../tasks/convertSvgToJsx'
import makeLibStyles from '../tasks/makeLibStyles'
import makeMainStyle from '../tasks/makeMainStyle'
import makePropertiesFile from '../tasks/makePropertiesFile'
import makeSidebarMenuFirstPaintCss from '../tasks/makeSidebarMenuFirstPaintCss'
import { log } from '../../lib'

vi.mock('../tasks/makeReleaseVersion', () => ({
  makeReleaseVersion: vi.fn(),
}))
vi.mock('../tasks/prepareTemplates', () => ({
  prepareTemplates: vi.fn(),
}))
vi.mock('../tasks/styleFactory', () => ({ runStyleFactory: vi.fn() }))
vi.mock('../tasks/themeFactory', () => ({ runThemeFactory: vi.fn() }))
vi.mock('../tasks/convertSvgToJsx', () => ({ default: vi.fn() }))
vi.mock('../tasks/makeLibStyles', () => ({ default: vi.fn() }))
vi.mock('../tasks/makeMainStyle', () => ({ default: vi.fn() }))
vi.mock('../tasks/makePropertiesFile', () => ({ default: vi.fn() }))
vi.mock('../tasks/makeSidebarMenuFirstPaintCss', () => ({
  default: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(log, 'start').mockImplementation(vi.fn())
  vi.spyOn(log, 'succeed').mockImplementation(vi.fn())
  vi.spyOn(log, 'fail').mockImplementation(vi.fn())
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('runPrepublishTasks', () => {
  it('runs every task and reports success', async () => {
    await expect(runPrepublishTasks()).resolves.toBe(true)

    expect(convertSvgToJsx).toHaveBeenCalledTimes(1)
    expect(makeReleaseVersion).toHaveBeenCalledTimes(1)
    expect(runStyleFactory).toHaveBeenCalledTimes(1)
    expect(runThemeFactory).toHaveBeenCalledTimes(1)
    expect(makeLibStyles).toHaveBeenCalledTimes(1)
    expect(makeMainStyle).toHaveBeenCalledTimes(1)
    expect(makePropertiesFile).toHaveBeenCalledTimes(1)
    expect(makeSidebarMenuFirstPaintCss).toHaveBeenCalledTimes(1)
    expect(makeSidebarMenuFirstPaintCss).toHaveBeenCalledBefore(
      vi.mocked(makeMainStyle)
    )
    expect(makePropertiesFile).toHaveBeenCalledBefore(
      vi.mocked(runThemeFactory)
    )
    expect(makePropertiesFile).toHaveBeenCalledBefore(
      vi.mocked(makeMainStyle)
    )
    expect(prepareTemplates).toHaveBeenCalledTimes(1)
    expect(log.succeed).toHaveBeenCalledWith(
      'Prepublishing has Succeeded!'
    )
  })

  it('rejects when a task fails, so the build cannot continue', async () => {
    vi.mocked(makeReleaseVersion).mockRejectedValueOnce(
      new Error('Could not determine the next release version')
    )

    await expect(runPrepublishTasks()).rejects.toThrow(
      'Could not determine the next release version'
    )

    expect(log.fail).toHaveBeenCalledWith('Failed to run prepublish!')
    expect(log.succeed).not.toHaveBeenCalled()

    // The tasks after the failing one write what the build reads
    expect(runStyleFactory).not.toHaveBeenCalled()
    expect(prepareTemplates).not.toHaveBeenCalled()
  })

  it('stops the build if first-paint CSS generation fails', async () => {
    vi.mocked(makeSidebarMenuFirstPaintCss).mockRejectedValueOnce(
      new Error('Unable to compile first-paint CSS')
    )
    await expect(runPrepublishTasks()).rejects.toThrow(
      'Unable to compile first-paint CSS'
    )
    expect(makeMainStyle).not.toHaveBeenCalled()
  })
})
