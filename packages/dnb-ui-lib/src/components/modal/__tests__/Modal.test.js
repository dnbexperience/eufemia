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

import Component from '../Modal'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _modal from '../style/_modal.scss' // eslint-disable-line
import dnb_modal from '../style/dnb-modal.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Modal'), {
  all: true,
  optional: true
})

describe('Modal component', () => {
  const ComponentWrap = mount(
    <Component
      {...props}
      modal_content="modal_content"
      preventSetTriggerRef={true} // we set preventSetTriggerRef to true, cause jest gives us an error
    />
  )
  ComponentWrap.setState({
    modalActive: true
  })
  it('have to match snapshot', () => {
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

describe('Modal scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-modal.scss'))
    expect(scss).toMatchSnapshot()
  })
})
