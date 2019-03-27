/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../ViewTitle'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _view_title from '../style/_view-title.scss' // eslint-disable-line
import dnb_view_title from '../style/dnb-view-title.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../ViewTitle'), {
  optional: true
})
props.tag = 'h1'

describe('ViewTitle component', () => {
  const ComponentWrap = mount(<Component {...props} />)
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
