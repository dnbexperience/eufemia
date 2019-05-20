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
import Component from '../Progress'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _progress from '../style/_progress.scss' // eslint-disable-line
import dnb_progress from '../style/dnb-progress.scss' // eslint-disable-line
import dnb_progress_theme_ui from '../style/themes/dnb-progress-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Progress'), {
  all: true,
  optional: true
})

describe('Circular Progress component', () => {
  const Comp = mount(
    <Component {...props} type="circular" progress={50} />
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a stroke-dashoffset of -44 on 50%', () => {
    expect(
      Comp.find('svg.dnb-progress__circular__line.light[style]')
        .instance()
        .getAttribute('style')
    ).toBe('stroke-dashoffset: -44;')
  })

  it('has to have a aria-label with a 50% value', () => {
    expect(
      Comp.find('.dnb-progress__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe('50%')
  })

  it('should validate with ARIA rules as a svg element', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Progress scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-progress.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-progress-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
