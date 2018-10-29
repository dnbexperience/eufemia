/**
 * Component Test
 *
 */

import React from 'react'
import {
  shallow,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../ViewTitle'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-view-title.scss'

const props = fakeProps(require.resolve('../ViewTitle'), {
  optional: true
})

describe('ViewTitle component', () => {
  const ComponentWrap = shallow(<Component {...props} />)
  it('have to match snapshot', () => {
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

describe('ViewTitle scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-view-title.scss'))
    expect(scss).toMatchSnapshot()
  })
})
