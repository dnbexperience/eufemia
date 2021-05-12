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
import Component from '../StepIndicator'

const props = fakeProps(require.resolve('../StepIndicator'), {
  optional: true,
})
delete props.render
props.on_item_render = null

describe('StepIndicator component with urls', () => {
  const active_url = '?b'
  const stepIndicatorListData = [
    {
      title: 'Aa',
      url: '?a',
    },
    {
      title: 'Bb',
      url: '?b',
    },
    {
      title: 'Cc',
      url: '?c',
      url_future: '',
    },
  ]
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
    expect(Comp.state().activeUrl).toBe(active_url)
  })

  it('has a "aria-current" attribute on correct item', () => {
    expect(
      Comp.find('li.dnb-step-indicator--active')
        // .find('a')
        .instance()
        .getAttribute('aria-current')
    ).toBe('step')
  })

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(Comp)
      // We had this as the axeComponent option util v5
      // Can be removed in later versions
      // , {
      //   rules: {
      //     // because of the role="text", we disable this rule for now
      //     'aria-roles': { enabled: false }
      //   }
      // }
    ).toHaveNoViolations()
  })
})

describe('StepIndicator component with buttons', () => {
  const stepIndicatorListData = [
    {
      title: 'Aa',
    },
    {
      title: 'Bb',
    },
    {
      title: 'Cc',
    },
  ]
  const Comp = mount(
    <Component
      use_navigation
      active_item={1}
      data={stepIndicatorListData}
    />
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has a "aria-current" attribute on correct item', () => {
    expect(
      Comp.find('li').at(1).hasClass('dnb-step-indicator--active')
    ).toBe(true)
  })

  it('has a "aria-disabled" attribute on correct item', () => {
    expect(Comp.find('li').last().find('[aria-disabled]').exists()).toBe(
      true
    )
  })

  it('has a "aria-current" attribute on correct item', () => {
    expect(
      Comp.find('li.dnb-step-indicator--active')
        // .find('button')
        .instance()
        .getAttribute('aria-current')
    ).toBe('step')
  })

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(Comp)
      // We had this as the axeComponent option util v5
      // Can be removed in later versions
      // rules: {
      //   // because of the role="text", we disable this rule for now
      //   'aria-roles': { enabled: false }
      // }
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
