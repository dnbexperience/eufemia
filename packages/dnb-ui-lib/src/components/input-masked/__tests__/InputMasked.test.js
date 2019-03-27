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
import Component from '../InputMasked'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _input_masked from '../style/_input-masked.scss' // eslint-disable-line
import dnb_input_masked from '../style/dnb-input-masked.scss' // eslint-disable-line

const props = {
  ...fakeProps(require.resolve('../InputMasked'), {
    optional: true
  }),
  disabled: false
}
props.id = 'input-masked'

describe('InputMasked component', () => {
  // compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = mount(<Component {...props} type="text" value="test" />)
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
