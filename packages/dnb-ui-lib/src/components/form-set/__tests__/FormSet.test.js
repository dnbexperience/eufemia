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
import Component from '../FormSet'
import FormRow from '../../form-row/FormRow'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_row from '../style/_form-set.scss' // eslint-disable-line
import dnb_form_row from '../style/dnb-form-set.scss' // eslint-disable-line
import dnb_form_row_theme_ui from '../style/themes/dnb-form-set-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../FormSet'), {
  optional: true
})
props.direction = 'horizontal'

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
      Comp.find('.dnb-form-row').hasClass('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should have working provider have correct size classs on form-row', () => {
    const Comp = mount(
      <Component {...props} size="large">
        <FormRow />
      </Component>
    )
    expect(
      Comp.find('.dnb-form-row').hasClass('dnb-form-row__size--large')
    ).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormSet scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-form-set.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-set-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
