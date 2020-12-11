/**
 * Scripts test
 *
 */

import React from 'react'
import path from 'path'
import del from 'del'
import { mount, toJson } from '../../../../src/core/jest/jestSetup'
import convertSvgToJsx from '../convertSvgToJsx'

beforeAll(async () => {
  await convertSvgToJsx({
    preventDelete: true,
    srcPath: path.resolve(__dirname, './test-files/bell.svg'),
    destPath: path.resolve(__dirname, './test-files/dist')
  })
})

describe('run convertSvgToJsx to convert ES6 to ES5', () => {
  it('has to convert correctly and match snapshot', async () => {
    const { default: Svg } = await import(
      path.resolve(__dirname, 'test-files/dist/bell.js')
    )
    const ComponentWrap = mount(<Svg />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

afterAll(async () => {
  await del(path.resolve(__dirname, `./test-files/dist`))
})
