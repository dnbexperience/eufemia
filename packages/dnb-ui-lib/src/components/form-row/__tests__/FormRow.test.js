/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../FormRow'
import Input from '../../input/Input'

const props = fakeProps(require.resolve('../FormRow'), {
  optional: true
})
props.id = 'form-row'
props.direction = 'horizontal'
props.label_direction = 'horizontal'

describe('FormRow component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have vertical direction class', () => {
    const Comp = mount(<Component {...props} direction="vertical" />)
    expect(
      Comp.find('.dnb-form-row').hasClass('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should have correct indent class', () => {
    const Comp = mount(<Component {...props} indent="large" />)
    expect(
      Comp.find('.dnb-form-row').hasClass('dnb-form-row__indent--large')
    ).toBe(true)
  })

  it('should have an isolated state on nested FormRows', () => {
    const Comp = mount(
      <Component vertical>
        <Input label="Vertical" />
        <Component vertical="false" label_direction="horizontal">
          <Input label="Horizontal" />
        </Component>
        <Input label="Vertical" />
      </Component>
    )
    expect(
      Comp.find('span.dnb-input').at(0).hasClass('dnb-input--vertical')
    ).toBe(true)
    expect(
      Comp.find('span.dnb-input').at(1).hasClass('dnb-input--horizontal')
    ).toBe(true)
    expect(
      Comp.find('span.dnb-input').at(2).hasClass('dnb-input--vertical')
    ).toBe(true)
  })

  it('should using formset and legend by default', () => {
    expect(Comp.find('fieldset').exists()).toBe(true)
    expect(Comp.find('legend').exists()).toBe(true)
  })

  it('should using formset and legend by default', () => {
    const Comp = mount(<Component {...props} no_fieldset />)
    expect(Comp.find('label').exists()).toBe(true)
    expect(Comp.find('fieldset').exists()).toBe(false)
    expect(Comp.find('legend').exists()).toBe(false)
  })

  it('should react correct on two states in row', () => {
    const Comp = mount(
      <Component {...props} disabled={false}>
        <Input />
      </Component>
    )
    Comp.setProps({ disabled: true })
    expect(Comp.find('input').is('[disabled]')).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormRow scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-form-row.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-row-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
