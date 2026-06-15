/**
 * Figma test
 *
 */

import fs from 'fs-extra'
import tar from 'tar'
import { log } from '../../../lib'
import '../../../../src/core/test-utils/testSetup'
import { getFigmaDoc } from '../../helpers/docHelpers'
import cliTools from '../../../tools/cliTools'
import {
  IconsConfig,
  extractIcons,
  formatIconsMetaFile,
} from '../assetsExtractors'

const localFile =
  require.resolve('../../helpers/__tests__/files/FigmaTestDoc.json')
const iconsLockFile =
  require.resolve('../../helpers/__tests__/files/icons-svg.lock')

const bellMediumSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 21.75a2.087 2.087 0 0 0 4.005 0M12 3a7.5 7.5 0 0 1 7.5 7.5c0 7.046 1.5 8.25 1.5 8.25H3s1.5-1.916 1.5-8.25A7.5 7.5 0 0 1 12 3Zm0 0V.75"/></svg>'

const bellSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.756 14.067a1.299 1.299 0 0 0 2.492 0M8 2.4a4.667 4.667 0 0 1 4.667 4.667c0 4.384.933 5.133.933 5.133H2.4s.933-1.192.933-5.133A4.667 4.667 0 0 1 8 2.4Zm0 0V1"/></svg>'

const createOptimizedSvgMatcher = (svg: string) =>
  expect.stringMatching(
    new RegExp(
      `^${svg
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace('Zm0', 'Z?m0')}$`
    )
  )

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('fs', async () => {
  const origFs = await vi.importActual('fs')
  return {
    ...origFs,
    writeFile: vi.fn((file, content, encoding, cb) => {
      cb()
    }),
  }
})

vi.mock('fs-extra', async () => {
  const writeStream = {
    end: () => null,
    close: () => null,
    on: vi.fn((state, cb) => {
      if (state === 'finish') {
        cb()
      }

      return writeStream
    }),
  }
  const actual = (await vi.importActual(
    'fs-extra'
  )) as typeof import('fs-extra')
  const origFs = (
    'default' in actual ? actual.default : actual
  ) as typeof fs
  const mockedFs = {
    ...origFs,
    readFile: vi.fn(async (file, encoding, cb) => {
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

      if (
        file.includes('7174498d6976279f85d53855a1165429') ||
        file.includes('12b63b85ba08cf1588a42fb69cb9654c')
      ) {
        const svg = file.includes('7174498d6976279f85d53855a1165429')
          ? bellMediumSvg
          : bellSvg

        if (typeof cb === 'function') {
          return cb(null, svg)
        }

        return svg
      }

      if (file.endsWith('.svg')) {
        const svg = file.includes('bell_medium') ? bellMediumSvg : bellSvg

        if (typeof cb === 'function') {
          return cb(null, svg)
        }

        return svg
      }

      return 'unknown'
    }),
    writeFile: vi.fn(),
    move: vi.fn(),
    unlink: vi.fn(),
    rmdir: vi.fn(),
    stat: vi.fn((file) => {
      const size = file.includes('eufemia-icons-xml.tgz') ? 100 : 200
      return { size }
    }),
    existsSync: vi.fn(() => {
      return true
    }),
    createWriteStream: vi.fn(() => {
      return writeStream
    }),
  }

  return {
    ...actual,
    ...mockedFs,
    default: mockedFs,
  }
})

vi.mock('tar', () => {
  const tar = {
    create: vi.fn(),
    extract: vi.fn(),
  }

  return {
    default: tar,
    ...tar,
  }
})

vi.mock('https', () => {
  const https = {
    get: vi.fn((url, callback) => {
      callback?.({
        pipe: (stream) => stream,
      })

      return { on: vi.fn() }
    }),
  }

  return {
    default: https,
    ...https,
  }
})

vi.mock('svgo', async () => {
  const svgoConfig = await vi.importActual('../../../../svgo.config')
  return {
    ...(await vi.importActual('svgo')),
    loadConfig: vi.fn().mockResolvedValue(svgoConfig),
  }
})

vi.mock('../../helpers/docHelpers', async () => {
  return {
    ...(await vi.importActual('../../helpers/docHelpers')),
    getFigmaUrlByImageIds: vi.fn().mockResolvedValue({
      '2:63': 'file:./7174498d6976279f85d53855a1165429',
      '41:2': 'file:./12b63b85ba08cf1588a42fb69cb9654c',
    }),
  }
})

vi.mock('../../../tools/cliTools')

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
    expect(config.iconsLockFile).toContain(
      'packages/dnb-eufemia/src/icons/icons-svg.lock'
    )
    expect(config.destDir).toContain('/packages/dnb-eufemia/assets/icons')
  })

  const start = vi.fn()
  const info = vi.fn()
  const succeed = vi.fn()
  const runCommand = vi.fn(async (cmd) => {
    return cmd
  })

  const runMock = async () => {
    vi.spyOn(log, 'start').mockImplementation(start)
    vi.spyOn(log, 'info').mockImplementation(info)
    vi.spyOn(log, 'succeed').mockImplementation(succeed)

    vi.spyOn(cliTools, 'runCommand').mockImplementation(runCommand)

    vi.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime())

    const figmaDoc = await getFigmaDoc({
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })

    const result = await extractIcons({
      figmaDoc,
      iconsLockFile,
    })

    return result
  }

  it('should convert SVG to XML', async () => {
    await runMock()

    expect(fs.rmdir).toHaveBeenCalledTimes(2)
    expect(fs.rmdir).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        '/packages/dnb-eufemia/assets/icons/dnb/objects'
      )
    )

    expect(runCommand).toHaveBeenCalledTimes(1)
    expect(runCommand).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('yarn vd-tool -c -in')
    )
    expect(runCommand).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('/packages/dnb-eufemia/assets/icons/dnb')
    )

    expect(tar.create).toHaveBeenCalledTimes(3)
    expect(tar.create).toHaveBeenNthCalledWith(
      1,
      {
        cwd: expect.stringContaining('/assets/icons'),
        file: expect.stringContaining('/assets/icons/dnb/tmp.tgz'),
        gzip: true,
      },
      ['bell_medium.xml', 'bell.xml']
    )
    expect(tar.create).toHaveBeenNthCalledWith(
      2,
      {
        cwd: expect.stringContaining('/assets/icons'),
        file: expect.stringContaining(
          '/assets/icons/dnb/eufemia-icons-xml.tgz'
        ),
        gzip: true,
      },
      ['bell_medium.xml', 'bell.xml']
    )
    expect(tar.create).toHaveBeenNthCalledWith(
      3,
      {
        cwd: expect.stringContaining('/assets/icons'),
        file: expect.stringContaining(
          '/assets/icons/dnb/eufemia-icons-xml-categorized.tgz'
        ),
        gzip: true,
      },
      ['objects/bell_medium.xml', 'objects/bell.xml']
    )
  })

  it('extractIcons', async () => {
    const result = await runMock()

    expect(start).toHaveBeenCalledTimes(4)
    expect(start).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining(
        'Starting to fetch 2 icons from the "Icons" Canvas'
      )
    )
    expect(info).toHaveBeenCalledTimes(9)
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
      expect.stringContaining('Icon was optimized: bell_medium.svg')
    )
    expect(info).toHaveBeenNthCalledWith(
      5,
      expect.stringContaining('Icon was optimized: bell.svg')
    )
    expect(info).toHaveBeenNthCalledWith(
      6,
      expect.stringContaining('started to create eufemia-icons-xml.tgz')
    )
    expect(info).toHaveBeenNthCalledWith(
      7,
      expect.stringContaining('convert SVG to XML')
    )
    expect(info).toHaveBeenNthCalledWith(
      8,
      expect.stringContaining(
        '/dnb-eufemia/src/icons/dnb/icons-svg.lock file got generated'
      )
    )
    expect(info).toHaveBeenNthCalledWith(
      9,
      expect.stringContaining('icons-meta.json file got generated')
    )
    expect(succeed).toHaveBeenCalledTimes(2)
    expect(succeed).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('Using old Figma document')
    )
    expect(succeed).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('finished to create eufemia-icons-xml.tgz')
    )

    expect(fs.move).toHaveBeenCalledTimes(2)
    expect(fs.move).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('/assets/icons/dnb/bell_medium.xml'),
      expect.stringContaining('/assets/icons/dnb/objects/bell_medium.xml')
    )
    expect(fs.move).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('/assets/icons/dnb/bell.xml'),
      expect.stringContaining('/assets/icons/dnb/objects/bell.xml')
    )

    expect(fs.unlink).toHaveBeenCalledTimes(5)
    expect(fs.unlink).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('/assets/icons/dnb/tmp.tgz')
    )
    expect(fs.unlink).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('/assets/icons/dnb/objects/bell_medium.xml')
    )
    expect(fs.unlink).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('/assets/icons/dnb/objects/bell.xml')
    )
    expect(fs.unlink).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining('/assets/icons/dnb/bell_medium.xml')
    )
    expect(fs.unlink).toHaveBeenNthCalledWith(
      5,
      expect.stringContaining('/assets/icons/dnb/bell.xml')
    )

    expect(fs.readFile).toHaveBeenCalledTimes(8)
    expect(fs.readFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        '/scripts/figma/helpers/__tests__/files/FigmaTestDoc.json'
      )
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining(
        '/scripts/figma/helpers/__tests__/files/icons-svg.lock'
      ),
      'utf-8'
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('/assets/icons/dnb/bell_medium.svg'),
      'utf-8',
      expect.any(Function)
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining('/assets/icons/dnb/bell_medium.svg'),
      'utf-8'
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      5,
      expect.stringContaining('/assets/icons/dnb/bell.svg'),
      'utf-8',
      expect.any(Function)
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      6,
      expect.stringContaining('/assets/icons/dnb/bell.svg'),
      'utf-8'
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      7,
      expect.stringContaining('/assets/icons/dnb/bell_medium.svg'),
      'utf-8'
    )
    expect(fs.readFile).toHaveBeenNthCalledWith(
      8,
      expect.stringContaining('/assets/icons/dnb/bell.svg'),
      'utf-8'
    )

    expect(fs.writeFile).toHaveBeenCalledTimes(4)

    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        '/dnb-eufemia/assets/icons/dnb/bell_medium.svg'
      ),
      createOptimizedSvgMatcher(bellMediumSvg)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('/dnb-eufemia/assets/icons/dnb/bell.svg'),
      createOptimizedSvgMatcher(bellSvg)
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('/dnb-eufemia/src/icons/dnb/icons-svg.lock'),
      expect.stringContaining(
        await formatIconsMetaFile(
          {
            'bell_medium.svg': {
              iconName: 'bell_medium',
              name: 'bell',
              category: 'objects',
              url: 'file:./7174498d6976279f85d53855a1165429',
              id: '2:63',
              slug: 'f791e5e18139b49fe8f0b0a0060fee11',
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
              slug: 'f791e5e18139b49fe8f0b0a0060fee11',
              size: '16',
              variant: 'primary',
              bundleName: 'primary_icons',
              created: 1577836800000,
              updated: 1577836800000,
            },
          },
          'dnb'
        )
      )
    )
    expect(fs.writeFile).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining(
        '/dnb-eufemia/src/icons/dnb/icons-meta.json'
      ),
      expect.stringContaining(
        await formatIconsMetaFile(
          {
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
          },
          'dnb'
        )
      )
    )

    expect(result).toHaveLength(2)
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
          slug: 'f791e5e18139b49fe8f0b0a0060fee11',
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
          slug: 'f791e5e18139b49fe8f0b0a0060fee11',
          updated: 1577836800000,
          url: 'file:./12b63b85ba08cf1588a42fb69cb9654c',
          variant: 'primary',
        },
      ])
    )
  })
})
