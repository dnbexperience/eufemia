/**
 * Component Test
 *
 */

import React from 'react'
import {
  shallow,
  // mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Slider'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-slider.scss'

const props = fakeProps(require.resolve('../Slider'), {
  optional: true
})

describe('Slider component', () => {
  // shallow compare the snapshot
  it('have to match snapshot', () => {
    const ComponentWrap = shallow(<Component {...props} href={null} />)
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })

  // then test the state management
  // const Comp = mount(<Component {...props} href={null} />)

  // it('has correct state after "change" trigger', () => {
  //   // default value value has to be false
  //   expect(Comp.state().value).toBe(false)
  //
  //   Comp.find('input').simulate('change') // we could send inn the event data structure like this: , { target: { value: true } }
  //   expect(Comp.state().value).toBe(true)
  //
  //   Comp.find('input').simulate('change')
  //   expect(Comp.state().value).toBe(false)
  //
  //   // also check if getDerivedStateFromProps sets the state as expected
  //   Comp.setProps({ value: true })
  //   expect(Comp.state().value).toBe(true)
  //
  //   const value = 'new value'
  //   Comp.setProps({ value })
  //   expect(Comp.find('input').props().value).toBe(value)
  // })
})

describe('Slider scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-slider.scss'))
    expect(scss).toMatchSnapshot()
  })
})
