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
