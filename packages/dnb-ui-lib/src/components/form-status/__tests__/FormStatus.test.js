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
import Component from '../FormStatus'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-form-status.scss'
import '../style/themes/dnb-form-status-theme-ui.scss'

const props = fakeProps(require.resolve('../FormStatus'), {
  optional: true
})
props.status = 'error'
props.hidden = false
props.icon = 'exclamation'

describe('FormStatus component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should have correact attributes once the "hidden" prop changes', async () => {
    const Comp = mount(<Component {...props} hidden />)
    expect(Comp.exists('[aria-hidden]')).toBe(true)
    expect(Comp.exists('[aria-live="assertive"]')).toBe(false)
    Comp.setProps({
      hidden: false
    })
    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to to have a text value as defined in the prop', () => {
    expect(Comp.find('.dnb-form-status--text').text()).toBe('text')
  })
})

describe('FormStatus scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-form-status.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-status-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
