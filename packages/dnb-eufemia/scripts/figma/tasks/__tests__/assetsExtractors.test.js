/**
 * Figma test
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../../lib'
import prettier from 'prettier'
import '../../../../src/core/jest/jestSetup'
import { getFigmaDoc } from '../../helpers/docHelpers'
import { IconsConfig, extractIconsAsSVG } from '../assetsExtractors'

const localFile = require.resolve('./files/FigmaTestDoc.json')
const iconsLockFile = require.resolve('./files/icons-svg.lock')
const prettierrc = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../../.prettierrc'),
    'utf-8'
  )
)

jest.mock('fs-extra', () => {
  return {
    ...jest.requireActual('fs-extra'),
    writeFile: jest.fn().mockResolvedValue(),
    unlink: jest.fn().mockResolvedValue(),
  }
})

jest.mock('https', () => {
  return {
    get: jest.fn(() => {
      return { on: jest.fn() }
    }),
  }
})

describe('assetsExtractors', () => {
  it('IconsConfig', () => {
    const config = IconsConfig()

    expect(config).toHaveProperty('canvasNameSelector')
    expect(config).toHaveProperty('frameNameSelector')
    expect(config).toHaveProperty('iconsLockFile')
    expect(config).toHaveProperty('iconPrimaryList')
    expect(config).toHaveProperty('iconRenameList')
    expect(config).toHaveProperty('iconCloneList')
    expect(config).toHaveProperty('iconSelector')
    expect(config).toHaveProperty('iconNameCleaner')
    expect(config).toHaveProperty('imageUrlExpireAfterDays')
    expect(config).toHaveProperty('destDir')
    expect(config).toHaveProperty('getCategoryFromIconName')
    expect(config.iconsLockFile).toContain(
      'packages/dnb-eufemia/src/icons/icons-svg.lock'
    )
    expect(config.destDir).toContain('/packages/dnb-eufemia/assets/icons')
  })

  it('extractIconsAsSVG with existing lock file', async () => {
    const start = jest.fn()
    jest.spyOn(log, 'start').mockImplementation(start)
    const info = jest.fn()
    jest.spyOn(log, 'info').mockImplementation(info)
    const succeed = jest.fn()
    jest.spyOn(log, 'succeed').mockImplementation(succeed)

    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    const figmaFile = process.env.FIGMA_ICONS_FILE
    const figmaDoc = await getFigmaDoc({
      figmaFile,
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })

    const result = await extractIconsAsSVG({
      figmaFile,
      figmaDoc,
      iconsLockFile,
    })

    expect(start).toHaveBeenCalledTimes(4)
    expect(start).toHaveBeenNthCalledWith(
      3,
      '> Figma: Starting to fetch 0 icons from the "Icons" Canvas'
    )
    expect(info).toHaveBeenCalledTimes(4)
    expect(info).toHaveBeenNthCalledWith(
      3,
      '> Figma: finished fetching SVGs icons by using frameIconsFactory. Processed 2 files along with 0 new files.'
    )
    expect(succeed).toHaveBeenCalledTimes(1)
    expect(succeed).toHaveBeenCalledWith(
      '> Figma: Using old Figma document'
    )

    expect(writeFile).toHaveBeenCalledTimes(2)
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        '/packages/dnb-eufemia/src/icons/icons-svg.lock'
      ),
      expect.stringContaining(
        JSON.stringify({
          'bell_medium.svg': {
            iconName: 'bell_medium',
            name: 'bell',
            category: 'objects',
            url: 'file:./7174498d6976279f85d53855a1165429',
            id: '2:63',
            slug: '878548076e6ef92a3736f0e3597fb7be',
            size: '24',
            variant: 'primary',
            bundleName: 'primary_icons_medium',
            created: 1646679727764,
            updated: 1646679727764,
          },
          'bell.svg': {
            iconName: 'bell',
            name: 'bell',
            category: 'objects',
            url: 'file:./12b63b85ba08cf1588a42fb69cb9654c',
            id: '41:2',
            slug: '878548076e6ef92a3736f0e3597fb7be',
            size: '16',
            variant: 'primary',
            bundleName: 'primary_icons',
            created: 1646679728573,
            updated: 1646679728573,
          },
        })
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining(
        '/packages/dnb-eufemia/src/icons/icons-meta.json'
      ),
      expect.stringContaining(
        prettier.format(
          JSON.stringify({
            bell_medium: {
              tags: ['notification'],
              created: 1646679727764,
              name: 'bell',
              variant: 'primary',
              category: 'objects',
            },
            bell: {
              tags: ['notification'],
              created: 1646679728573,
              name: 'bell',
              variant: 'primary',
              category: 'objects',
            },
          }),
          {
            ...prettierrc,
            filepath: 'icons-meta.json',
          }
        )
      )
    )

    expect(result).toEqual(
      expect.arrayContaining([
        {
          iconName: 'bell_medium',
          iconFile: 'bell_medium.svg',
          name: 'bell',
          category: 'objects',
          url: 'file:./7174498d6976279f85d53855a1165429',
          id: '2:63',
          slug: '878548076e6ef92a3736f0e3597fb7be',
          size: '24',
          variant: 'primary',
          bundleName: 'primary_icons_medium',
          created: 1646679727764,
          updated: 1646679727764,
        },
        {
          iconName: 'bell',
          iconFile: 'bell.svg',
          name: 'bell',
          category: 'objects',
          url: 'file:./12b63b85ba08cf1588a42fb69cb9654c',
          id: '41:2',
          slug: '878548076e6ef92a3736f0e3597fb7be',
          size: '16',
          variant: 'primary',
          bundleName: 'primary_icons',
          created: 1646679728573,
          updated: 1646679728573,
        },
      ])
    )
  })
})
