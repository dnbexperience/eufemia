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
import Component from '../ProgressIndicator'

const props = fakeProps(require.resolve('../ProgressIndicator'), {
  all: true,
  optional: true
})

describe('Circular ProgressIndicator component', () => {
  const mainLineSelector =
    'svg.dnb-progress-indicator__circular__line.dark[style]'
  const Comp = mount(
    <Component {...props} type="circular" progress={50} />
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a stroke-dashoffset of 44 on 50%', () => {
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('stroke-dashoffset: 44;')
  })

  it('has to have a aria-label with a 50% value', () => {
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe('50%')
  })

  it('has to react to a progress value of 80%', () => {
    Comp.setProps({
      progress: 80
    })
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe('80%')
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('stroke-dashoffset: 17.599999999999994;')
    Comp.setProps({
      progress: 50
    })
  })

  it('should validate with ARIA rules as a svg element', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ProgressIndicator scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-progress-indicator.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve(
        '../style/themes/dnb-progress-indicator-theme-ui.scss'
      )
    )
    expect(scss).toMatchSnapshot()
  })
})
