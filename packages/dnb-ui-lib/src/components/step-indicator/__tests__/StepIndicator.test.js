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
import Component from '../StepIndicator'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-step-indicator.scss'
import '../style/themes/dnb-step-indicator-theme-ui.scss'

const props = fakeProps(require.resolve('../StepIndicator'), {
  // all: true,
  optional: true
})
delete props.render
// props.active_url = '?b'

const active_url = '?b'
const stepIndicatorListData = [
  {
    title: 'Aa',
    url: '?a'
  },
  {
    title: 'Bb',
    url: '?b'
  },
  {
    title: 'Cc',
    url: '?c',
    url_future: ''
  }
]

describe('StepIndicator component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={stepIndicatorListData}
      active_url={active_url}
    />
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have a "active_url" state have to be same as prop from startup', () => {
    expect(Comp.state().active_url).toBe(active_url)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-step-indicator.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-step-indicator-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
