/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeAllProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Tabs'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-tabs.scss'

const props = fakeAllProps(require.resolve('../Tabs'), {
  optional: true
})
delete props.render

const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' }
]
const exampleContent = {
  first: <h2>First</h2>,
  second: <h2>Second</h2>,
  third: <h2>Third</h2>
}

describe('Tabs component', () => {
  const Comp = mount(
    <Component {...props} data={data} selected_key="second">
      {exampleContent}
    </Component>
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tabs scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tabs.scss'))
    expect(scss).toMatchSnapshot()
  })
})
