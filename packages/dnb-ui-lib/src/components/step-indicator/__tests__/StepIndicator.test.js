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

// just to make sure we re-run the test in watch mode due to changes in theese files
import _step_indicator from '../style/_step-indicator.scss' // eslint-disable-line
import dnb_step_indicator from '../style/dnb-step-indicator.scss' // eslint-disable-line
import dnb_step_indicator_theme_ui from '../style/themes/dnb-step-indicator-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../StepIndicator'), {
  optional: true
})
delete props.render

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
    expect(
      await axeComponent(Comp, {
        rules: {
          // because of the role="text", we disable this rule for now
          'aria-roles': { enabled: false }
        }
      })
    ).toHaveNoViolations()
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
