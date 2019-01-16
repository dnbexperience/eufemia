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
  axeComponent,
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
props.autocomplete = 'off'
props.label = null
props.status = null
props.type = 'text'

describe('Input component', () => {
  // shallow compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = shallow(<Component {...props} value="test" />)
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
    <Component {...props} value={null}>
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

  it('has to to have a prop value like value', () => {
    const value = 'new value'
    Comp.setProps({
      value
    })
    expect(Comp.find('input').props().value).toBe(value)
  })

  it('has to to have a label value as defined in the prop', () => {
    const Comp = mount(<Component {...props} label="label" />)
    expect(Comp.find('label').text()).toBe('label')
  })

  it('has to to have a status value as defined in the prop', () => {
    const Comp = mount(
      <Component {...props} status="status" status_state="error" />
    )
    expect(Comp.find('.dnb-form-status').text()).toBe('status')
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

  it('should validate with ARIA rules as a input with a label', async () => {
    const LabelComp = mount(<label htmlFor="input">text</label>)
    const InputComp = mount(
      <Component {...props} id="input" value="some value" />
    )
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})

describe('Input scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-input.scss'))
    expect(scss).toMatchSnapshot()
  })
})
