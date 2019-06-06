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

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_section from '../style/_form-section.scss' // eslint-disable-line
import dnb_form_section from '../style/dnb-form-section.scss' // eslint-disable-line
import dnb_form_section_theme_ui from '../style/themes/dnb-form-section-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../FormSection'), {
  optional: true
})

describe('FormSection component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct styles', () => {
    const Comp = mount(<Component {...props} style="divider" />)
    expect(
      Comp.find('.dnb-form-section').hasClass('dnb-form-section--divider')
    ).toBe(true)
  })

  it('should have correct spacing', () => {
    const Comp = mount(<Component {...props} spacing="large" />)
    expect(
      Comp.find('.dnb-form-section').hasClass(
        'dnb-form-section--spacing-large'
      )
    ).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
