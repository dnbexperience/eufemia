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
import Component from '../Logo'

const props = fakeProps(require.resolve('../Logo'), {
  optional: true
})
props.height = 80

describe('Logo component', () => {
  it('have to match default logo snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
})

describe('Logo scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-logo.scss'))
    expect(scss).toMatchSnapshot()
  })
})
