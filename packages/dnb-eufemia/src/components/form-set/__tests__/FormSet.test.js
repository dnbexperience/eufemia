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
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../FormSet'
import FormRow from '../../form-row/FormRow'
import Input from '../../input/Input'
import NumberFormat from '../../number-format/NumberFormat'
import Provider from '../../../shared/Provider'

const props = fakeProps(require.resolve('../FormSet'), {
  optional: true,
})
props.direction = 'horizontal'
props.element = 'form'

describe('FormSet component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have .dnb-form-set class', () => {
    expect(Comp.find('.dnb-form-set').exists()).toBe(true)
  })

  it('should have working provider with vertical direction class on form-row', () => {
    const Comp = mount(
      <Component {...props} direction="vertical">
        <FormRow />
      </Component>
    )
    expect(
      Comp.find('.dnb-form-row').last().hasClass('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should disable nested components', () => {
    const Comp = mount(
      <Component {...props} disabled>
        <FormRow>
          <Input />
        </FormRow>
      </Component>
    )

    expect(Comp.find('input.dnb-input__input').prop('disabled')).toBe(true)

    Comp.setProps({ disabled: false })
    expect(Comp.find('input.dnb-input__input').prop('disabled')).toBe(
      false
    )

    Comp.setProps({ disabled: true })
    expect(Comp.find('input.dnb-input__input').prop('disabled')).toBe(true)

    const CompBypassDisabled = mount(
      <Component {...props} disabled>
        <FormRow disabled={false}>
          <Input />
        </FormRow>
      </Component>
    )

    expect(
      CompBypassDisabled.find('input.dnb-input__input').prop('disabled')
    ).toBe(false)
  })

  it('should have working provider have correct indent classes on form-row', () => {
    const Comp = mount(
      <Component {...props} indent="large">
        <FormRow />
      </Component>
    )
    expect(
      Comp.find('.dnb-form-row')
        .last()
        .hasClass('dnb-form-row__indent--large')
    ).toBe(true)
  })

  it('should support locale context forwarding', () => {
    const Comp = mount(
      <Component>
        <NumberFormat currency>1234</NumberFormat>
      </Component>
    )

    expect(Comp.find('.dnb-number-format').find('span').at(1).text()).toBe(
      '1 234,00 kr'
    )

    Comp.setProps({
      locale: 'en-GB',
    })

    expect(Comp.find('.dnb-number-format').find('span').at(1).text()).toBe(
      'NOK 1 234.00'
    )
  })

  it('should not overwrite locale from provider when not set', () => {
    const Comp = mount(
      <Provider locale="en-GB">
        <Component>
          <NumberFormat currency>1234</NumberFormat>
        </Component>
      </Provider>
    )

    expect(Comp.find('.dnb-number-format').find('span').at(1).text()).toBe(
      'NOK 1 234.00'
    )
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormSet scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-set-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
