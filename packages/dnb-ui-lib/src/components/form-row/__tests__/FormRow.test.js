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

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_row from '../style/_form-row.scss' // eslint-disable-line
import dnb_form_row from '../style/dnb-form-row.scss' // eslint-disable-line
import dnb_form_row_theme_ui from '../style/themes/dnb-form-row-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../FormRow'), {
  optional: true
})
props.id = 'form-row'
props.direction = 'horizontal'

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

  it('should have correct size class', () => {
    const Comp = mount(<Component {...props} size="large" />)
    expect(
      Comp.find('.dnb-form-row').hasClass('dnb-form-row__size--large')
    ).toBe(true)
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
