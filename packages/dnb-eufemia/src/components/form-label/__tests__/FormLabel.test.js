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
import { render } from '@testing-library/react'
import Component from '../FormLabel'
import Input from '../../input/Input'

const props = fakeProps(require.resolve('../FormLabel'), {
  optional: true,
})
props.element = 'label'
props.direction = 'horizontal'
props.label_direction = 'horizontal'

describe('FormLabel component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should forward unlisted attributes like "aria-hidden"', () => {
    const Comp = mount(<Component {...props} for_id="input" aria-hidden />)
    expect(Comp.find('label[aria-hidden]').exists()).toBe(true)
    expect(
      Comp.find('label[aria-hidden]')
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('should support spacing props', () => {
    render(<Component for_id="input" top="large" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-space__top--large',
    ])
  })

  it('should set correct class when sr_only is set', () => {
    render(<Component for_id="input" sr_only />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-sr-only',
    ])
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a label with a input', async () => {
    const LabelComp = mount(<Component {...props} for_id="input" />)
    const InputComp = mount(<Input id="input" value="some value" />)
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})

describe('FormLabel scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-label-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
