/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent
} from '../../../core/jest/jestSetup'
import Component from '../InputPassword'

const snapshotProps = {
  ...fakeProps(require.resolve('../InputPassword'), {
    all: true,
    optional: true
  }),
  input_element: null,
  disabled: false
}
snapshotProps.id = 'input'
snapshotProps.autocomplete = 'off'

describe('InputPassword component', () => {
  // compare the snapshot
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  // then test the state management
  const Comp = mount(<Component />)

  it('has correct type by default', () => {
    expect(Comp.find('.dnb-input__input').prop('type')).toBe('password')
  })

  it('has correct state after "focus" trigger', () => {
    Comp.find('input').simulate('focus')
    expect(Comp.find('.dnb-input__shell').prop('data-input-state')).toBe(
      'focus'
    )
  })

  it('has a submit button which gets focus', () => {
    const Comp = mount(<Component />)

    const Button = Comp.find('InputSubmitButton').find('button')
    expect(Button.exists()).toBe(true)

    Button.simulate('focus')
    expect(
      Comp.find('InputSubmitButton')
        .find('.dnb-input__submit-button')
        .prop('data-input-state')
    ).toBe('focus')
  })

  it('can change the visibility of the password', () => {
    const Comp = mount(<Component />)

    const Button = Comp.find('InputSubmitButton').find('button')
    expect(Button.exists()).toBe(true)

    Button.simulate('click')
    expect(Comp.find('.dnb-input__input').prop('type')).toBe('text')

    Button.simulate('click')
    expect(Comp.find('.dnb-input__input').prop('type')).toBe('password')

    expect(
      Comp.find('InputSubmitButton')
        .find('.dnb-input__submit-button')
        .prop('data-input-state')
    ).not.toBe('focus')
  })

  it('events gets triggered', () => {
    const on_show_password = jest.fn()
    const on_hide_password = jest.fn()
    const Comp = mount(
      <Component
        on_show_password={on_show_password}
        on_hide_password={on_hide_password}
      />
    )

    const Button = Comp.find('InputSubmitButton').find('button')

    Button.simulate('click')
    expect(on_show_password).toBeCalledTimes(1)
    expect(on_hide_password).not.toBeCalled()

    Button.simulate('click')
    expect(on_show_password).toBeCalledTimes(1)
    expect(on_hide_password).toBeCalledTimes(1)

    Button.simulate('click')
    expect(on_show_password).toBeCalledTimes(2)
    expect(on_hide_password).toBeCalledTimes(1)
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const InputPasswordComp = mount(
      <Component id="input" label="label" value="some value" />
    )
    expect(await axeComponent(InputPasswordComp)).toHaveNoViolations()
  })
})
