/**
 * Component Test
 *
 */

import React from 'react'
import {
  shallow,
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Input'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-input.scss'

const props = {
  ...fakeProps(require.resolve('../Input'), {
    optional: true
  }),
  inputElement: null,
  disabled: false
}

describe('Input component', () => {
  // shallow compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = shallow(<Component {...props} type="text" value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('have to match type="search" snapshot', () => {
    const Comp = shallow(
      <Component {...props} type="search" value="test" />
    )
    expect(toJson(Comp)).toMatchSnapshot()
  })

  // then test the state management
  const Comp = mount(
    <Component {...props} type="text" value={null}>
      {null}
    </Component>
  )

  it('has correct state after "focus" trigger', () => {
    Comp.find('input').simulate('focus')
    // Comp.find('input').prop('onFocus')() // call onFocus handler

    expect(Comp.find('.dnb-input__shell').prop('data-input-state')).toBe(
      'focus'
    )
  })

  it('has correct state after "change" trigger', () => {
    expect(Comp.find('.dnb-input__shell').prop('data-has-content')).toBe(
      'false'
    )

    const value = 'new value'
    Comp.find('input').simulate('change', { target: { value } })

    expect(Comp.find('.dnb-input__shell').prop('data-has-content')).toBe(
      'true'
    )

    expect(Comp.state().value).toBe(value)
  })

  // make sure getDerivedStateFromProps works
  it('has correct state after changeing "value" prop (set by getDerivedStateFromProps)', () => {
    const value = 'new prop value'
    Comp.setProps({
      value
    })
    expect(Comp.state().value).toBe(value)

    // get dom node
    // console.log('domNode', Comp.find('input').getDOMNode().value)
  })

  it(`has to to have a prop value like value`, () => {
    const value = 'new value'
    Comp.setProps({
      value
    })
    expect(Comp.find('input').props().value).toBe(value)
  })

  it('has a submit button on prop type="search"', () => {
    const Comp = mount(
      <Component {...props} type="search" value={null}>
        {null}
      </Component>
    )

    const Button = Comp.find('Submit').find('button')
    expect(Button.exists()).toBe(true)

    Button.simulate('focus')
    expect(
      Comp.find('Submit')
        .find('.dnb-input__search-submit')
        .prop('data-input-state')
    ).toBe('focus')
  })
})

describe('Input scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-input.scss'))
    expect(scss).toMatchSnapshot()
  })
})
