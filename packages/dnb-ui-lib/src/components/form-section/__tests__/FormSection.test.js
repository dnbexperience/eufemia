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
import Component from '../FormSection'
import Input from '../../input/Input'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_section from '../style/_form-section.scss' // eslint-disable-line
import dnb_form_section from '../style/dnb-form-section.scss' // eslint-disable-line
import dnb_form_section_theme_ui from '../style/themes/dnb-form-section-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../FormSection'), {
  optional: true
})
props.direction = 'horizontal'

describe('FormSection component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should forward unlisted attributes like "aria-hidden"', () => {
    const Comp = mount(<Component {...props} for_id="input" aria-hidden />)
    expect(Comp.find('section[aria-hidden]').exists()).toBe(true)
    expect(
      Comp.find('section[aria-hidden]')
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it.skip('should validate with ARIA rules as a section with a input', async () => {
    const SectionComp = mount(<Component {...props} for_id="input" />)
    const InputComp = mount(<Input id="input" value="some value" />)
    expect(await axeComponent(SectionComp, InputComp)).toHaveNoViolations()
  })
})

describe('FormSection scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-form-section.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-section-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
