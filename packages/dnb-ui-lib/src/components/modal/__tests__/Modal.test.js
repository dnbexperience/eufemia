/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeAllProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'

import Component from '../Modal'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-modal.scss'

const props = fakeAllProps(require.resolve('../Modal'), {
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
