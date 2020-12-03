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
import Component from '../Textarea'

const props = {
  ...fakeProps(require.resolve('../Textarea'), {
    all: true,
    optional: true
  }),
  id: 'textarea',
  label: null,
  status: null, // to make sure we don't get aria-details
  textarea_element: null,
  disabled: false
}

describe('Textarea component', () => {
  // compare the snapshot
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  // then test the state management
  const Comp = mount(
    <Component {...props} value={null}>
      {null}
    </Component>
  )

  it('has correct state after "focus" trigger', () => {
    Comp.find('textarea').simulate('focus')

    expect(
      Comp.find('.dnb-textarea').hasClass('dnb-textarea--focus')
    ).toBe(true)
  })

  it('has correct state after "change" trigger', () => {
    expect(
      Comp.find('.dnb-textarea').hasClass('dnb-textarea--has-content')
    ).toBe(false)

    const value = 'new value'
    Comp.find('textarea').simulate('change', { target: { value } })

    expect(
      Comp.find('.dnb-textarea').hasClass('dnb-textarea--has-content')
    ).toBe(true)

    expect(Comp.state().value).toBe(value)
  })

  // // make sure getDerivedStateFromProps works
  it('has correct state after changing "value" prop (set by getDerivedStateFromProps)', () => {
    const initValue = 'new prop value'
    const emptyValue = null

    Comp.setProps({
      value: initValue
    })
    expect(Comp.state().value).toBe(initValue)

    Comp.setProps({ value: emptyValue })
    expect(Comp.state().value).toBe(emptyValue)
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
    expect(Comp.find('textarea').instance().value).toBe(String(zeroValue))
  })

  it('uses children as the value', () => {
    const Comp = mount(<Component>children</Component>)
    expect(Comp.find('textarea').props().value).toBe('children')
  })

  it('has correct size attribute (chars length) on textarea by using textarea_attributes', () => {
    const Comp = mount(<Component textarea_attributes={{ size: 2 }} />)
    expect(Comp.find('textarea').instance().getAttribute('size')).toBe('2')
  })

  it('has to to have a prop value like value', () => {
    const value = 'new value'
    Comp.setProps({
      value
    })
    expect(Comp.find('textarea').props().value).toBe(value)
  })

  it('has to to have a label value as defined in the prop', () => {
    const Comp = mount(<Component {...props} label="label" />)
    expect(Comp.find('label').text()).toBe('label')
  })

  it('has to to have a status value as defined in the prop', () => {
    const Comp = mount(
      <Component {...props} status="status" status_state="error" />
    )
    expect(Comp.find('.dnb-form-status__text').text()).toBe('status')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(Comp.find('textarea').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should validate with ARIA rules as a textarea with a label', async () => {
    const LabelComp = mount(<label htmlFor="textarea">text</label>)
    const TextareaComp = mount(
      <Component {...props} id="textarea" value="some value" />
    )
    expect(
      await axeComponent(LabelComp, TextareaComp)
    ).toHaveNoViolations()
  })
})

describe('Textarea scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-textarea.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-textarea-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
