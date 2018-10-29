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
import Component from '../Tabs'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-tabs.scss'

const props = fakeProps(require.resolve('../Tabs'), {
  optional: true
})

describe('Tabs component', () => {
  const ComponentWrap = shallow(<Component {...props} />)
  it('have to match snapshot', () => {
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

describe('Tabs scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tabs.scss'))
    expect(scss).toMatchSnapshot()
  })
})
