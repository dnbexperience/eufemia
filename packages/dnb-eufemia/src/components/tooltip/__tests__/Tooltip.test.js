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

global.ResizeObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

const defaultProps = {
  target_ref: null,
  id: 'tooltip'
}

describe('Tooltip component with target_ref', () => {
  const Component = (props = {}) => (
    <Tooltip
      // {...snapshotProps}
      {...defaultProps}
      {...props}
      target_ref={<button>Button</button>}
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

  // This snapshot gets too large – there is happening someone strange
  // it.skip('have to match default tooltip snapshot', () => {
  //   const Comp = mount(<Component />)
  //   expect(toJson(Comp)).toMatchSnapshot()
  // })

  it('should validate with ARIA rules as a tooltip', async () => {
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
