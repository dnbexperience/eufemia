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
import Component from '../InputMasked'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-input-masked.scss'

const props = {
  ...fakeProps(require.resolve('../InputMasked'), {
    optional: true
  }),
  disabled: false
}

describe('InputMasked component', () => {
  // shallow compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = shallow(<Component {...props} type="text" value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
})

describe('InputMasked scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-input-masked.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
