/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss
} from '../../../core/jest/jestSetup'
import Tooltip from '../Tooltip'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _tooltip from '../style/_tooltip.scss' // eslint-disable-line
import dnb_tooltip from '../style/dnb-tooltip.scss' // eslint-disable-line
import dnb_tooltiptheme_ui from '../style/themes/dnb-tooltip-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Tooltip'), {
  optional: true
})

describe('Tooltip component with component', () => {
  const Component = () => (
    <Tooltip component={<button id="button">Button</button>}>Text</Tooltip>
  )
  it('have to match default tooltip snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tooltip component with target', () => {
  const Component = () => (
    <>
      <button id="button">Button</button>
      <Tooltip target="#button">Text</Tooltip>
    </>
  )
  it('have to match default tooltip snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tooltip scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tooltip.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-tooltip-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
