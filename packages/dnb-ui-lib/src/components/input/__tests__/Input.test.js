/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Input'

const props = {
  ...fakeProps(require.resolve('../Input'), {
    all: true,
    optional: true
  }),
  input_element: null,
  disabled: false
}
props.id = 'input'
props.autocomplete = 'off'
props.label = null
props.submit_button_variant = 'secondary'
props.status = null // to make sure we don't get aria-details
props.suffix = null // to make sure we don't get aria-details
props.type = 'text'

describe('Input component', () => {
  // compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = mount(<Component {...props} value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('have to match type="search" snapshot', () => {
    const Comp = mount(<Component {...props} type="search" value="test" />)
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

    const newValue = 'new value'
    Comp.find('input').simulate('change', { target: { value: newValue } })

    expect(Comp.find('.dnb-input__shell').prop('data-has-content')).toBe(
      'true'
    )

    expect(Comp.state().value).toBe(newValue)
  })

  it('events gets emmited correctly: "on_change" and "onKeyDown"', () => {
    const initValue = 'init value'
    const newValue = 'new value'
    const emptyValue = null // gets emmited also on values as null

    const on_change = jest.fn()
    const onKeyDown = jest.fn() // additional native event test

    const Comp = mount(
      <Component
        {...props}
        value={initValue}
        on_change={on_change}
        onKeyDown={onKeyDown} // additional native event test
      />
    )

    expect(Comp.state().value).toBe(initValue)

    Comp.find('input').simulate('change', {
      target: { value: newValue }
    })
    expect(on_change.mock.calls.length).toBe(1)
    expect(Comp.find('input').instance().value).toBe(newValue)

    Comp.find('input').simulate('change', {
      target: { value: emptyValue }
    })
    expect(on_change.mock.calls.length).toBe(2)
    expect(Comp.state().value).toBe(emptyValue)

    // additional native event test
    Comp.find('input').simulate('keydown', { key: 'Space', keyCode: 84 }) // space
    expect(onKeyDown.mock.calls.length).toBe(1)
  })

  // make sure getDerivedStateFromProps works
  it('has correct state after changing "value" prop (set by getDerivedStateFromProps)', () => {
    const initValue = 'new prop value'
    const emptyValue = null

    Comp.setProps({
      value: initValue
    })
    expect(Comp.state().value).toBe(initValue)

    Comp.setProps({ value: emptyValue })
    expect(Comp.state().value).toBe(emptyValue)

    // get dom node
    // console.log('domNode', Comp.find('input').getDOMNode().value)
  })

  it('has correct state after setting "value" prop using placeholder (set by getDerivedStateFromProps)', () => {
    const Comp = mount(<Component placeholder="Placeholder" />)

    const newValue = 'new value'
    const emptyValue = null
    const zeroValue = 0

    Comp.setProps({
      value: newValue
    })
    expect(Comp.state().value).toBe(newValue)

    Comp.setProps({ value: emptyValue })
    expect(Comp.state().value).toBe(emptyValue)

    Comp.setProps({ value: zeroValue })
    expect(Comp.find('input').instance().getAttribute('value')).toBe(
      String(zeroValue)
    )
  })

  it('has correct medium input size', () => {
    const Comp = mount(<Component size="medium" />)
    expect(Comp.find('.dnb-input--medium').exists()).toBe(true)
  })

  it('uses children as the value', () => {
    const Comp = mount(<Component>children</Component>)
    expect(Comp.find('input').instance().getAttribute('value')).toBe(
      'children'
    )
  })

  it('has correct size attribute (chars length) on input by int number', () => {
    const Comp = mount(<Component size={2} />)
    expect(Comp.find('input').instance().getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes', () => {
    const Comp = mount(<Component input_attributes={{ size: 2 }} />)
    expect(Comp.find('input').instance().getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes and a JSON object', () => {
    const Comp = mount(<Component input_attributes='{"size": "2"}' />)
    expect(Comp.find('input').instance().getAttribute('size')).toBe('2')
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
    expect(Comp.find('.dnb-form-status--text').text()).toBe('status')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('has a submit button on prop type="search"', () => {
    const Comp = mount(
      <Component {...props} type="search" value={null}>
        {null}
      </Component>
    )

    const Button = Comp.find('InputSubmitButton').find('button')
    expect(Button.exists()).toBe(true)

    Button.simulate('focus')
    expect(
      Comp.find('InputSubmitButton')
        .find('.dnb-input__submit-button')
        .prop('data-input-state')
    ).toBe('focus')
  })

  it('should validate with ARIA rules as a search input with a label', async () => {
    const LabelComp = mount(<label htmlFor="input">text</label>)
    const InputComp = mount(
      <Component
        {...props}
        id="input"
        type="search"
        autocomplete="off"
        value="some value"
      />
    )
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
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

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-input-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
