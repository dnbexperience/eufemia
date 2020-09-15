/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  // fakeProps,
  toJson,
  axeComponent,
  loadScss
} from '../../../core/jest/jestSetup'
import Tooltip from '../Tooltip'

// const snapshotProps = fakeProps(require.resolve('../Tooltip'), {
//   optional: true
// })

const defaultProps = {
  component: null,
  id: 'tooltip'
}

describe('Tooltip component with component', () => {
  const Component = (props = {}) => (
    <Tooltip
      // {...snapshotProps}
      {...defaultProps}
      {...props}
      component={<button>Button</button>}
    >
      Text
    </Tooltip>
  )
  it('have to match default tooltip snapshot', () => {
    const Comp = mount(<Component />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tooltip component with target', () => {
  const Component = (props = {}) => (
    <>
      <button id="button">Button</button>
      <Tooltip
        // {...snapshotProps}
        {...defaultProps}
        {...props}
        target="#button"
      >
        Text
      </Tooltip>
    </>
  )
  it('have to match default tooltip snapshot', () => {
    const Comp = mount(<Component />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component />)
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
