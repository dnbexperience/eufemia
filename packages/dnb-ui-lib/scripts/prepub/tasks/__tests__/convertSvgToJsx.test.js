/**
 * Scripts test
 *
 */

import React from 'react'
import path from 'path'
import { shallow, toJson } from '../../../../src/core/jest/jestSetup'
import convertSvgToJsx from '../convertSvgToJsx'

beforeAll(async () => {
  await convertSvgToJsx({
    preventDelete: true,
    srcPath: path.resolve(__dirname, 'test-files/bell.svg'),
    destPath: path.resolve(__dirname, 'test-files/dist')
  })
})

describe('convertSvgToJsx as ES Modules', () => {
  it('has to convert correctly and match snapshot', async () => {
    const {
      default: { bell: Svg }
    } = require('./test-files/dist/es/index.js')
    const ComponentWrap = shallow(<Svg />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

describe('convertSvgToJsx as CJS Modules', () => {
  it('has to convert correctly and match snapshot', async () => {
    const {
      default: { bell: Svg }
    } = require('./test-files/dist/cjs/index.js')
    const ComponentWrap = shallow(<Svg />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})
