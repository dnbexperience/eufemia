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

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_row from '../style/_form-row.scss' // eslint-disable-line
import dnb_form_row from '../style/dnb-form-row.scss' // eslint-disable-line
import dnb_form_row_theme_ui from '../style/themes/dnb-form-row-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../FormRow'), {
  optional: true
})
props.direction = 'horizontal'

describe('FormRow component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it.skip('should forward unlisted attributes like "aria-hidden"', () => {
    const Comp = mount(<Component {...props} for_id="input" aria-hidden />)
    expect(Comp.find('row[aria-hidden]').exists()).toBe(true)
    expect(
      Comp.find('row[aria-hidden]')
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it.skip('should validate with ARIA rules as a row with a input', async () => {
    const RowComp = mount(<Component {...props} for_id="input" />)
    const InputComp = mount(<Input id="input" value="some value" />)
    expect(await axeComponent(RowComp, InputComp)).toHaveNoViolations()
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
