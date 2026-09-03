/**
 * Scripts test
 *
 */

import path from 'path'
import fs from 'fs-extra'
import convertSvgToJsx from '../convertSvgToJsx'

vi.mock('ora', () => {
  return {
    default: vi.fn(() => ({
      start: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      succeed: vi.fn(),
      fail: vi.fn(),
    })),
  }
})

beforeAll(async () => {
  await convertSvgToJsx({
    preventDelete: true,
    srcPath: path.resolve(__dirname, './test-files/**/*.svg'),
    destPath: path.resolve(__dirname, './test-files/dist'),
    customIconsLockFilePath: path.resolve(
      __dirname,
      './test-files/dnb/icons-svg.lock'
    ),
  })
  vi.useFakeTimers()
})

afterAll(async () => {
  await fs.remove(path.resolve(__dirname, `./test-files/dist`))
  vi.useRealTimers()
})

describe('run convertSvgToJsx to convert ES6 to ES5', () => {
  it('has to have a index file inside subfolder', async () => {
    const index = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/index.ts')
    )
    expect(index).toMatchSnapshot()
  })

  it('has to have a fallback index file', async () => {
    const index = await import(
      path.resolve(__dirname, 'test-files/dist/index.ts')
    )
    expect(index).toMatchSnapshot()
  })

  it('has to have a primary_icons file', async () => {
    const index = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/primary_icons')
    )
    expect(index).toMatchSnapshot()
  })

  it('has to have a primary_icons_medium file', async () => {
    const index = await import(
      path.resolve(
        __dirname,
        'test-files/dist/dnb/primary_icons_medium.ts'
      )
    )
    expect(index).toMatchSnapshot()
  })

  it('has to generate icon size metadata', async () => {
    const { default: bell } = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/bell.tsx')
    )
    const { default: bellMedium } = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/bell_medium.tsx')
    )

    expect(bell.__iconSize).toBeUndefined()
    expect(bellMedium.__iconSize).toBe(24)
  })

  it('has to keep generated icon metadata after production minification', async () => {
    const { build } = require('vite')
    const entryPath = path.resolve(
      __dirname,
      'test-files/dist/icon-build-entry.ts'
    )
    await fs.writeFile(
      entryPath,
      `export { bell_medium } from './dnb/index'`
    )

    const result = await build({
      configFile: false,
      logLevel: 'silent',
      build: {
        write: false,
        minify: true,
        lib: {
          entry: entryPath,
          formats: ['es'],
          fileName: () => 'icon.mjs',
        },
        rollupOptions: {
          external: ['react', 'react/jsx-runtime'],
        },
      },
    })
    const output = Array.isArray(result) ? result[0] : result
    const code = output.output.find(({ type }) => type === 'chunk')?.code

    expect(code).toMatch(/__iconSize:\s*24/)
    expect(code).not.toContain('M6.756 14.067')
  })

  it('has to have a bell file', async () => {
    const index = await import(
      path.resolve(__dirname, 'test-files/dist/bell.ts')
    )
    expect(index).toMatchSnapshot()
  })

  it('has to have a bell_medium file', async () => {
    const index = await import(
      path.resolve(__dirname, 'test-files/dist/bell_medium.ts')
    )
    expect(index).toMatchSnapshot()
  })
})
