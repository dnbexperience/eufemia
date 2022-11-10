/**
 * Figma test
 *
 */

import fs from 'fs-extra'
import { log } from '../../../lib'
import '../../../../src/core/jest/jestSetup'
import { getFigmaDoc } from '../../helpers/docHelpers'
import {
  IconsConfig,
  extractIconsAsSVG,
  formatIconsMetaFile,
} from '../assetsExtractors'

const localFile = require.resolve('./files/FigmaTestDoc.json')
const iconsLockFile = require.resolve('./files/icons-svg.lock')

jest.mock('fs-extra', () => {
  const writeStream = {
    end: () => {},
    close: () => {},
    on: jest.fn((state, cb) => {
      if (state === 'finish') {
        cb()
      }

      return writeStream
    }),
  }
  const origFs = jest.requireActual('fs-extra')
  return {
    ...origFs,
    readFile: jest.fn(async (file, encoding, cb) => {
      if (file.endsWith('FigmaTestDoc.json')) {
        return origFs.readFileSync(file, encoding)
      }

      if (file.endsWith('icons-svg.lock')) {
        return JSON.stringify({
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
            created: 1577836800000,
            updated: 1577836800000,
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
            created: 1577836800000,
            updated: 1577836800000,
          },
        })
      }

      if (file.endsWith('.svg')) {
        if (typeof cb === 'function') {
          return cb(null, origFs.readFileSync(file, encoding))
        }

        return origFs.readFileSync(file, encoding)
      }

      return 'unknown'
    }),
    unlink: jest.fn().mockResolvedValue(),
    createWriteStream: jest.fn(() => {
      return writeStream
    }),
  }
})

jest.mock('https', () => {
  return {
    get: jest.fn(() => {
      return { on: jest.fn() }
    }),
  }
})

jest.mock('svgo', () => {
  return {
    ...jest.requireActual('svgo'),
    loadConfig: jest
      .fn()
      .mockResolvedValue(require('../../../../svgo.config')),
  }
})

jest.mock('../../helpers/docHelpers', () => {
  return {
    ...jest.requireActual('../../helpers/docHelpers'),
    getFigmaUrlByImageIds: jest.fn().mockResolvedValue({
      '2:63': 'file:./7174498d6976279f85d53855a1165429',
      '41:2': 'file:./12b63b85ba08cf1588a42fb69cb9654c',
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

  it('extractIconsAsSVG', async () => {
    const start = jest.fn()
    jest.spyOn(log, 'start').mockImplementation(start)
    const info = jest.fn()
    jest.spyOn(log, 'info').mockImplementation(info)
    const succeed = jest.fn()
    jest.spyOn(log, 'succeed').mockImplementation(succeed)

    const writeFile = jest.fn()
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile)

    const figmaDoc = await getFigmaDoc({
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime())

    const result = await extractIconsAsSVG({
      figmaDoc,
      iconsLockFile,
    })

    expect(start).toHaveBeenCalledTimes(4)
    expect(start).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining(
        'Starting to fetch 2 icons from the "Icons" Canvas'
      )
    )
    expect(info).toHaveBeenCalledTimes(6)
    expect(info).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        'Saved file bell_medium.svg (ID=2:63, CREATED=1577836800000)'
      )
    )
    expect(info).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining(
        'Saved file bell.svg (ID=41:2, CREATED=1577836800000)'
      )
    )
    expect(info).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining(
        'finished fetching SVGs icons by using frameIconsFactory. Processed 2 files along with 2 new files.'
      )
    )
    expect(info).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining(
        '/dnb-eufemia/src/icons/icons-svg.lock file got generated'
      )
    )
    expect(info).toHaveBeenNthCalledWith(
      5,
      expect.stringContaining('Icon was optimized: bell_medium.svg')
    )
    expect(info).toHaveBeenNthCalledWith(
      6,
      expect.stringContaining('Icon was optimized: bell.svg')
    )
    expect(succeed).toHaveBeenCalledTimes(1)
    expect(succeed).toHaveBeenCalledWith(
      expect.stringContaining('Using old Figma document')
    )

    expect(writeFile).toHaveBeenCalledTimes(4)
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('/dnb-eufemia/src/icons/icons-svg.lock'),
      expect.stringContaining(
        formatIconsMetaFile({
          'bell_medium.svg': {
            iconName: 'bell_medium',
            name: 'bell',
            category: 'objects',
            url: 'file:./7174498d6976279f85d53855a1165429',
            id: '2:63',
            slug: 'a497bb7914b4ef4168e016f3b21562c5',
            size: '24',
            variant: 'primary',
            bundleName: 'primary_icons_medium',
            created: 1577836800000,
            updated: 1577836800000,
          },
          'bell.svg': {
            iconName: 'bell',
            name: 'bell',
            category: 'objects',
            url: 'file:./12b63b85ba08cf1588a42fb69cb9654c',
            id: '41:2',
            slug: 'a497bb7914b4ef4168e016f3b21562c5',
            size: '16',
            variant: 'primary',
            bundleName: 'primary_icons',
            created: 1577836800000,
            updated: 1577836800000,
          },
        })
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('/dnb-eufemia/assets/icons/bell_medium.svg'),
      expect.stringContaining(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 21.75a2.087 2.087 0 0 0 4.005 0M12 3a7.5 7.5 0 0 1 7.5 7.5c0 7.046 1.5 8.25 1.5 8.25H3s1.5-1.916 1.5-8.25A7.5 7.5 0 0 1 12 3Zm0 0V.75"/></svg>`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('/dnb-eufemia/assets/icons/bell.svg'),
      expect.stringContaining(
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.756 14.067a1.299 1.299 0 0 0 2.492 0M8 2.4a4.667 4.667 0 0 1 4.667 4.667c0 4.384.933 5.133.933 5.133H2.4s.933-1.192.933-5.133A4.667 4.667 0 0 1 8 2.4Zm0 0V1"/></svg>`
      )
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining('/dnb-eufemia/src/icons/icons-meta.json'),
      expect.stringContaining(
        formatIconsMetaFile({
          bell_medium: {
            tags: [
              'component-tag-24',
              'component-tag-2',
              'component-tag-3',
              'set-tag-1',
              'set-tag-2',
              'set-tag-3',
            ],
            created: 1577836800000,
            name: 'bell',
            variant: 'primary',
            category: 'objects',
          },
          bell: {
            tags: [
              'component-tag-16',
              'component-tag-2',
              'component-tag-3',
              'set-tag-1',
              'set-tag-2',
              'set-tag-3',
            ],
            created: 1577836800000,
            name: 'bell',
            variant: 'primary',
            category: 'objects',
          },
        })
      )
    )

    expect(result).toEqual(
      expect.arrayContaining([
        {
          bundleName: 'primary_icons_medium',
          category: 'objects',
          created: 1577836800000,
          iconFile: 'bell_medium.svg',
          iconName: 'bell_medium',
          id: '2:63',
          name: 'bell',
          size: '24',
          slug: 'a497bb7914b4ef4168e016f3b21562c5',
          updated: 1577836800000,
          url: 'file:./7174498d6976279f85d53855a1165429',
          variant: 'primary',
        },
        {
          bundleName: 'primary_icons',
          category: 'objects',
          created: 1577836800000,
          iconFile: 'bell.svg',
          iconName: 'bell',
          id: '41:2',
          name: 'bell',
          size: '16',
          slug: 'a497bb7914b4ef4168e016f3b21562c5',
          updated: 1577836800000,
          url: 'file:./12b63b85ba08cf1588a42fb69cb9654c',
          variant: 'primary',
        },
      ])
    )
  })
})
