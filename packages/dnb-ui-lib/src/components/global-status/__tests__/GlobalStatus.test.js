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
import Component from '../GlobalStatus'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_status from '../style/_global-status.scss' // eslint-disable-line
import dnb_form_status from '../style/dnb-global-status.scss' // eslint-disable-line
import dnb_form_status_theme_ui from '../style/themes/dnb-global-status-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../GlobalStatus'), {
  optional: true
})
props.state = 'error'
props.status = null
props.hidden = false
props.icon = 'exclamation'

describe('GlobalStatus component', () => {
  const Comp = mount(<Component {...props} />)

  it.skip('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it.skip('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it.skip('should have correact attributes once the "hidden" prop changes', async () => {
    const Comp = mount(<Component {...props} hidden />)
    expect(Comp.exists('[aria-hidden]')).toBe(true)
    expect(Comp.exists('[aria-live="assertive"]')).toBe(false)
    Comp.setProps({
      hidden: false
    })
    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it.skip('has to to have a text value as defined in the prop', () => {
    expect(Comp.find('.dnb-global-status--text').text()).toBe('text')
  })
})

describe('GlobalStatus scss', () => {
  it.skip('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-global-status.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it.skip('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-global-status-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
