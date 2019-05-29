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

// just to make sure we re-run the test in watch mode due to changes in theese files
import _textarea from '../style/_textarea.scss' // eslint-disable-line
import dnb_textarea from '../style/dnb-textarea.scss' // eslint-disable-line
import dnb_textarea_theme_ui from '../style/themes/dnb-textarea-theme-ui.scss' // eslint-disable-line

const props = {
  ...fakeProps(require.resolve('../Textarea'), {
    all: true,
    optional: true
  }),
  id: 'textarea',
  label: null,
  status: null, // to make sure we don't get aria-details
  textareaElement: null,
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
  it('has correct state after changeing "value" prop (set by getDerivedStateFromProps)', () => {
    const value = 'new prop value'
    Comp.setProps({
      value
    })
    expect(Comp.state().value).toBe(value)
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
    expect(Comp.find('.dnb-form-status').text()).toBe('status')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('textarea')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
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
