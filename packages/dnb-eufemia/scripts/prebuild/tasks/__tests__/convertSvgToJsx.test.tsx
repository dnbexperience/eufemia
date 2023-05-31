/**
 * Scripts test
 *
 */

import React from 'react'
import path from 'path'
import del from 'del'
import { mount, toJson } from '../../../../src/core/jest/jestSetup'
import convertSvgToJsx from '../convertSvgToJsx'

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }))
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
})

afterAll(async () => {
  await del(path.resolve(__dirname, `./test-files/dist`))
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
      path.resolve(__dirname, 'test-files/dist/dnb/primary_icons.ts')
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

  it('has to match bell JSX snapshot', async () => {
    const { default: Svg } = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/bell.tsx')
    )

    const ComponentWrap = mount(<Svg />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })

  it('has to convert match bell_medium JSX snapshot', async () => {
    const { default: Svg } = await import(
      path.resolve(__dirname, 'test-files/dist/dnb/bell_medium.tsx')
    )

    const ComponentWrap = mount(<Svg />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})
